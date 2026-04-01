import os, json, asyncio
from dotenv import load_dotenv
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, StreamingResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from openai import AsyncOpenAI

load_dotenv()

app = FastAPI()
client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))
DEFAULT_MODEL = "gpt-5.4-mini"
AVAILABLE_MODELS = [
    "gpt-5.4",
    "gpt-5.4-mini",
    "gpt-5.4-nano",
]

# Pricing per 1M tokens (USD)
MODEL_PRICING = {
    "gpt-5.4":      {"input": 2.50,  "output": 15.00},
    "gpt-5.4-mini": {"input": 0.75,  "output": 4.50},
    "gpt-5.4-nano": {"input": 0.20,  "output": 1.25},
}


def calc_cost(model: str, input_tokens: int, output_tokens: int) -> float:
    pricing = MODEL_PRICING.get(model, MODEL_PRICING.get(DEFAULT_MODEL))
    return (input_tokens * pricing["input"] + output_tokens * pricing["output"]) / 1_000_000

app.mount("/static", StaticFiles(directory="static"), name="static")


def sse_event(event_type: str, data: dict) -> str:
    return f"event: {event_type}\ndata: {json.dumps(data)}\n\n"


async def call_ai(system: str, user: str, json_mode: bool = True, model: str = DEFAULT_MODEL) -> tuple[str, dict]:
    """Returns (content, usage_dict) where usage_dict has input_tokens, output_tokens, cost."""
    kwargs = dict(
        model=model,
        messages=[{"role": "system", "content": system}, {"role": "user", "content": user}],
        temperature=0.8,
    )
    if json_mode:
        kwargs["response_format"] = {"type": "json_object"}
    resp = await client.chat.completions.create(**kwargs)
    usage = resp.usage
    input_tokens = usage.prompt_tokens if usage else 0
    output_tokens = usage.completion_tokens if usage else 0
    cost = calc_cost(model, input_tokens, output_tokens)
    return resp.choices[0].message.content, {
        "input_tokens": input_tokens,
        "output_tokens": output_tokens,
        "cost": cost,
    }


@app.get("/api/models")
async def list_models():
    return JSONResponse({"models": AVAILABLE_MODELS, "default": DEFAULT_MODEL})


async def generate_personas(topic: str, guiding_questions: list[str], num_personas: int, model: str = DEFAULT_MODEL) -> tuple[list[dict], dict]:
    system = """You are a debate panel designer. Given a topic, generate diverse expert personas who would have meaningfully different perspectives. Each persona needs:
- id (snake_case, unique)
- name (realistic full or partial name)
- role (specific professional title, 3-6 words)
- flag (single emoji representing their domain)
- color (hex color from this palette: #D4AF37, #EF4444, #60A5FA, #4CAF50, #A78BFA, #F97316, #F59E0B, #EC4899, #06B6D4)
- bg (dark background hex that complements the color, e.g. "#2A2517")
- perspective_brief (1 sentence: what angle they'll argue from)

Ensure diversity: include optimists, pessimists, domain specialists, and systemic thinkers. Return JSON: {"personas": [...]}"""
    user = f"Topic: {topic}\nNumber of personas: {num_personas}"
    if guiding_questions:
        user += "\nGuiding questions:\n" + "\n".join(f"- {q}" for q in guiding_questions)
    raw, usage = await call_ai(system, user, model=model)
    return json.loads(raw)["personas"], usage


async def generate_debate_response(persona: dict, topic: str, guiding_questions: list[str], all_personas: list[dict], model: str = DEFAULT_MODEL) -> tuple[dict, dict]:
    others = "\n".join(f"- {p['name']} ({p['role']}): {p['perspective_brief']}" for p in all_personas if p['id'] != persona['id'])
    system = f"""You are {persona['name']}, {persona['role']}. You are participating in an expert panel debate. Write a detailed, analytical response (400-600 words) from your professional perspective. Reference specific data, frameworks, or historical parallels where relevant. Engage with what other panelists might argue. Write in first person with authority and specificity.
Your angle: {persona['perspective_brief']}
Other panelists on this panel:
{others}"""
    user = f"Topic: {topic}"
    if guiding_questions:
        user += "\nKey questions to address:\n" + "\n".join(f"- {q}" for q in guiding_questions)
    text, usage = await call_ai(system, user, json_mode=False, model=model)
    return {"persona_id": persona["id"], "text": text.strip()}, usage


async def generate_synthesis(topic: str, personas: list[dict], responses: list[dict], model: str = DEFAULT_MODEL) -> tuple[dict, dict]:
    panel_text = "\n\n".join(
        f"**{next(p['name'] for p in personas if p['id'] == r['persona_id'])} ({next(p['role'] for p in personas if p['id'] == r['persona_id'])})**:\n{r['text']}"
        for r in responses
    )
    system = """You are a senior analyst synthesizing a multi-expert debate panel. Produce a structured synthesis in JSON with:
- consensus: array of 3-5 points all panelists broadly agree on (each a string, 1-2 sentences)
- disagreements: array of 2-4 key tensions, citing which panelists disagree (each a string)
- likely_scenario: 1 paragraph describing the most probable outcome
- wildcard: 1 paragraph describing a low-probability high-impact risk
- historical_verdict: 1 paragraph connecting to historical precedent

Return JSON: {"consensus": [...], "disagreements": [...], "likely_scenario": "...", "wildcard": "...", "historical_verdict": "..."}"""
    raw, usage = await call_ai(system, f"Topic: {topic}\n\nPanel responses:\n{panel_text}", model=model)
    return json.loads(raw), usage


async def generate_outcomes(topic: str, synthesis: dict, model: str = DEFAULT_MODEL) -> tuple[list[dict], dict]:
    system = """Based on this debate synthesis, generate 4-5 probability-weighted outcome scenarios. Each needs:
- id (snake_case)
- label (short name, 3-6 words)
- desc (1-2 sentence description)
- prob (integer percentage, MUST sum to exactly 100)

Order from most to least probable. Return JSON: {"outcomes": [...]}"""
    raw, usage = await call_ai(system, f"Topic: {topic}\n\nSynthesis:\n{json.dumps(synthesis)}", model=model)
    return json.loads(raw)["outcomes"], usage


def merge_usage(total: dict, new: dict) -> dict:
    total["input_tokens"] += new["input_tokens"]
    total["output_tokens"] += new["output_tokens"]
    total["cost"] += new["cost"]
    total["calls"] += 1
    return total


@app.post("/api/generate")
async def generate_debate(request: Request):
    body = await request.json()
    topic = body["topic"]
    guiding_questions = [q.strip() for q in body.get("guiding_questions", "").split("\n") if q.strip()]
    num_personas = body.get("num_personas", 5)
    model = body.get("model", DEFAULT_MODEL)

    async def stream():
        total_usage = {"input_tokens": 0, "output_tokens": 0, "cost": 0.0, "calls": 0, "model": model}

        yield sse_event("status", {"stage": "personas", "message": "Assembling expert panel..."})
        personas, usage = await generate_personas(topic, guiding_questions, num_personas, model=model)
        merge_usage(total_usage, usage)
        yield sse_event("personas", {"personas": personas})
        yield sse_event("usage", total_usage)

        yield sse_event("status", {"stage": "debate", "message": "Panelists are debating..."})
        tasks = [generate_debate_response(p, topic, guiding_questions, personas, model=model) for p in personas]
        responses = []
        for coro in asyncio.as_completed(tasks):
            result, usage = await coro
            merge_usage(total_usage, usage)
            responses.append(result)
            yield sse_event("debate", result)
            yield sse_event("usage", total_usage)

        yield sse_event("status", {"stage": "synthesis", "message": "Synthesizing panel views..."})
        synthesis, usage = await generate_synthesis(topic, personas, responses, model=model)
        merge_usage(total_usage, usage)
        yield sse_event("synthesis", synthesis)
        yield sse_event("usage", total_usage)

        yield sse_event("status", {"stage": "outcomes", "message": "Generating outcome scenarios..."})
        outcomes, usage = await generate_outcomes(topic, synthesis, model=model)
        merge_usage(total_usage, usage)
        yield sse_event("outcomes", {"outcomes": outcomes})
        yield sse_event("usage", total_usage)

        yield sse_event("done", {})

    return StreamingResponse(stream(), media_type="text/event-stream")


@app.post("/api/vote")
async def vote_commentary(request: Request):
    body = await request.json()
    outcome = body["outcome"]
    topic = body["topic"]
    personas_summary = body.get("personas_summary", "")
    synthesis_summary = body.get("synthesis_summary", "")

    model = body.get("model", DEFAULT_MODEL)
    system = """You are a senior analyst. The user voted for a specific outcome scenario from a debate panel. Generate a 150-200 word commentary explaining the implications of this view. Be specific about what this means practically. Address trade-offs, what to watch for, and potential actions. Write in second person ("You...")."""
    user = f"Topic: {topic}\n\nVoted outcome: {outcome['label']} — {outcome['desc']} ({outcome['prob']}% probability)\n\nPanel context:\n{personas_summary}\n\nSynthesis:\n{synthesis_summary}"
    text, usage = await call_ai(system, user, json_mode=False, model=model)
    return JSONResponse({"commentary": text.strip(), "usage": usage})


@app.post("/api/qa")
async def qa_panel(request: Request):
    body = await request.json()
    question = body["question"]
    topic = body["topic"]
    personas = body["personas"]
    synthesis = body.get("synthesis", {})

    personas_desc = "\n".join(f"- {p['name']} ({p['role']}, id={p['id']}, flag={p['flag']}, color={p['color']}): {p.get('perspective_brief','')}" for p in personas)
    system = f"""You are moderating an expert panel Q&A. The user asks a question. Select 3-4 of the most relevant panelists to respond.

Available panelists:
{personas_desc}

Return JSON: {{
  "panel_views": [
    {{"persona_id": "...", "name": "...", "flag": "...", "color": "...", "view": "one-word stance like bullish/cautious/risk-flag/hold/bearish/optimistic", "text": "2-3 sentence response in character"}}
  ],
  "verdict": "A synthesized paragraph of actionable guidance based on the panel's views"
}}"""
    model = body.get("model", DEFAULT_MODEL)
    user = f"Topic: {topic}\nDebate synthesis: {json.dumps(synthesis)}\n\nUser question: {question}"
    raw, usage = await call_ai(system, user, model=model)
    result = json.loads(raw)
    result["usage"] = usage
    return JSONResponse(result)


@app.get("/")
async def root():
    with open("static/index.html") as f:
        return HTMLResponse(f.read())


if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 3000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
