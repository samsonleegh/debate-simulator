import { useState, useRef, useEffect } from "react";

const DEBATE_DATA = {
  label: "Iran War Impact on Singapore Economy — Next 6 Months",
  responses: [
    {
      id: "mas_economist", name: "Dr. Chia", role: "MAS Policy Economist", flag: "🏛️",
      color: "#D4AF37", bg: "#2A2517",
      text: `The April MAS Monetary Policy Statement will be the most consequential since the off-cycle tightening of January 2022. Before the Iran war, MAS had guided core inflation at 1.0–2.0% for 2026 with SORA settling around 1.2–1.3% — a benign environment. That baseline is now obsolete. Brent has surged roughly 60% in March alone to ~$115/bbl, petrol pump prices are up 20%, and Singapore's import cost pressures are accelerating at a pace MAS itself flagged in its March 23 CPI report. The transmission is still "nascent," as Maybank's economists noted — February's 1.4% core print doesn't yet capture the war shock — but the forward indicators are unambiguous.

I expect MAS to tighten in April by steepening the S$NEER appreciation slope, consistent with OCBC chief economist Selena Ling's assessment that tightening has been pulled forward from H2 to April. The playbook mirrors 2022: use SGD strength to lean against imported inflation in an economy that "ships in virtually everything it consumes." But here's the dilemma that makes this harder than 2022: the growth outlook is simultaneously deteriorating. Oxford Economics models a global recession scenario if oil stays above $150 for four months, with Singapore GDP growth potentially revised down from the 1.0–3.0% MTI range toward 1.5% or lower. MAS must now thread the stagflation needle — tightening enough to anchor inflation expectations without crushing an export-dependent economy already hit by US tariff headwinds.

The 6-month outlook (April–September 2026): core inflation likely breaches 2.5–3.0% by mid-year as second-round effects materialise — businesses in non-transport sectors will pass through higher energy, freight, and delivery costs. SORA stays elevated or edges up: the 3M SORA, which fell to ~1.2% in 2025, will likely hold at 2.0%+ or creep toward 2.5% if the Fed delays cuts further. The 10-year SGS yield, already up from ~2.0% to ~2.4% in March, could test 2.8% by Q3. A stronger SGD helps contain import inflation but hurts exporters — the classic small open economy trap. President Tharman's warning about a "long storm of global political instability" captures the macro mood correctly: this is not a one-quarter shock, it's a regime shift in Singapore's operating environment.`
    },
    {
      id: "energy_trade", name: "Ms. Goh", role: "Energy & Trade Analyst", flag: "⛽",
      color: "#EF4444", bg: "#2B1A1A",
      text: `Dr. Chia frames the inflation channel correctly, but the structural vulnerability runs deeper than CPI prints. Singapore is not just an energy importer — it is Asia's oil refining and trading hub, and the Hormuz closure is disrupting the entire ecosystem. Over 90% of our electricity comes from imported LNG, with approximately half sourced from Qatar in 2025. QatarEnergy has suspended LNG exports for the first time in 30 years after its facilities were damaged. This isn't a price shock — it's a supply shock, and those are fundamentally harder to manage with monetary policy.

The refining sector is already invoking force majeure. Petrochemical margins are being squeezed not just by input costs but by physical unavailability of crude feedstock. Tanker freight rates have ballooned 80%+ in one month as vessels reroute around the Cape of Good Hope, adding 14 days to Asia-Europe shipping times. For Singapore's wholesale trade sector — now the largest contributor to services GDP — this is a direct hit to throughput volumes, not just margins. The sulphuric acid supply disruption from the Gulf is a less obvious but critical bottleneck: it's used in semiconductor wafer etching, which connects the energy crisis directly to Singapore's crown jewel electronics cluster. Aluminium prices jumped 6% after Iran struck UAE and Bahrain facilities on March 29, feeding into construction and manufacturing costs.

My 6-month view: even if the Strait partially reopens by June, the damage to supply chains will take months to normalise — recall that post-2022 Ukraine disruptions took 12–18 months to fully work through. Singapore's refining throughput will remain below capacity through Q3. NODX (non-oil domestic exports) in electronics may hold if the AI capex cycle sustains, but pharmaceuticals and precision engineering face input disruptions. The biggest structural risk is that this crisis accelerates Singapore's LNG diversification away from Qatar — which is positive long-term but means higher contracted prices in the medium term as alternative sources (US LNG, Australian LNG) carry a premium. Budget 2026's S$570 U-Save rebates for HDB households are a band-aid on a structural wound.`
    },
    {
      id: "property_reit", name: "Kenny L.", role: "Property & REIT Strategist", flag: "🏢",
      color: "#60A5FA", bg: "#1A2440",
      text: `The REIT market is already pricing in considerable pain — the S-REIT index has dropped 7% in March versus only 2% for the STI, and 10 REITs are down over 10% since the war broke out. But the question is whether this is a buying opportunity or a value trap, and the answer depends entirely on how long the "higher for longer" rate narrative persists.

The setup entering 2026 was genuinely positive for REITs: 3M SORA had collapsed from 3.7% to ~1.2% through 2025's Fed cutting cycle, borrowing costs were falling, DPU upgrades were forecast across the sector, and analysts were calling a two-year earnings upgrade cycle (2026–2027). The Iran war has abruptly reversed this. The 10-year SGS yield has steepened from ~2.0% to ~2.4%, and if Dr. Chia is right about SORA creeping toward 2.5%, the entire "cost-of-debt drag reversing" thesis is dead for 2026. REITs replacing maturing high-interest loans with cheaper financing? That story is over if rates re-accelerate. The yield spread between S-REITs and the 10-year bond has compressed to ~3.3% — historically not compelling enough to attract yield-seeking capital when bond yields are rising.

Sector differentiation matters enormously here. Industrial and logistics REITs face a triple whammy: higher borrowing costs, rising operating expenses (energy-intensive facilities), and potentially softer tenant demand if trade volumes decline. Hospitality REITs are hit by the Gulf airspace closure — Dubai, Doha, Abu Dhabi airports shuttered, 1,000+ flights cancelled, travel disruption. Data centre REITs (like Keppel DC REIT) are the relative haven: the AI capex cycle is structurally insulated from Gulf energy dynamics, and data centres are mission-critical infrastructure. For the broader property market, BCA's S$47–53 billion construction pipeline for 2026 is now competing with spiking material costs — aluminium, steel, diesel for machinery. New launch prices will need to absorb these inflated costs. SORA-linked mortgage rates won't fall as fast as borrowers hoped. The "controlled buying window" thesis for residential property remains intact — prices won't crash under TDSR discipline — but the window is narrower and the financing more expensive than anyone modelled three months ago.`
    },
    {
      id: "labour_domestic", name: "Dr. Yap", role: "Labour & Consumer Economist", flag: "👷",
      color: "#4CAF50", bg: "#1A2B1A",
      text: `The panelists so far have focused on capital markets and macro aggregates, but the lived experience of the Iran shock for ordinary Singaporeans is already tangible — and it will get worse before it gets better. Pump prices for 95-octane petrol are up ~20% from pre-war levels. Electricity tariffs will follow with a lag as SP Group's quarterly adjustment catches up to spot LNG prices. Taxi and ride-hail fares incorporate fuel surcharges. Hawker centre operators face higher LPG costs. These are regressive impacts that hit lower-income households disproportionately, and the U-Save rebates and CDC vouchers announced in Budget 2026 were calibrated for a pre-war inflation environment.

The labour market transmission is more nuanced. Singapore's employment fundamentals remain stable with positive wage growth, which anchors owner-occupier housing demand and consumer confidence. The MOM jobs data through Q4 2025 showed continued tightness across most sectors. But the sectors most directly exposed — aviation (SIA shares dropped 4.7% on Day 1), shipping, tourism, hospitality — will see hiring freezes or headcount reductions if disruption persists beyond Q2. The marine & offshore sector is a counter-cyclical bright spot: shipyards are operating near full capacity as energy companies rush to invest in alternative supply infrastructure, pushing up vessel prices and charter rates. Defence-adjacent firms (ST Engineering) are beneficiaries. The net employment effect over 6 months is likely modestly negative but not recessionary — perhaps 10,000–15,000 fewer new positions than the pre-war trajectory.

The consumer spending outlook is the most concerning channel. The PSP's warning about "ad hoc transfers being insufficient if inflation proves persistent" has analytical merit regardless of one's political priors. If oil stays above $100 through Q3, discretionary spending will contract measurably — dining out, travel, retail. Suburban malls (CapitaLand's suburban retail REITs) tend to hold up better than Orchard Road in these environments because essential spending is stickier than luxury consumption. The historical parallel is 2022: Russia-Ukraine drove Singapore headline inflation to 6.1% and core to 4.1%, triggering real wage erosion despite nominal wage increases. The 2026 episode could track a similar path if energy prices remain elevated, though the starting point is lower (core at 1.4% in February).`
    },
    {
      id: "safe_haven", name: "Mr. Tan", role: "Singapore Strategy & Capital Flows", flag: "🇸🇬",
      color: "#A78BFA", bg: "#231A33",
      text: `I want to push back on the bearish consensus forming here, because it misses Singapore's most powerful structural advantage in geopolitical crises: safe-haven capital flows. The STI dropped only 2% in March while global markets fell far more sharply. The SGD is the best-performing Asian currency in 2026 (after the ringgit and renminbi). Singapore banks are seeing net interest margin expansion potential as the "higher for longer" rate environment boosts lending spreads — DBS managed modest NII growth even through the 2025 rate decline, and the reversal benefits all three local banks. This is not a 2008-style crisis for Singapore; it's a differentiated shock where Singapore's pain points (energy import dependence) are partially offset by its strengths (financial hub status, rule of law, political stability).

Historical precedent supports this. Every major Middle Eastern crisis since 1973 has been associated with capital flight from the Gulf toward safe-haven financial centres. London property prices rose during the 1979 revolution and both Gulf Wars as petrodollar wealth sought stability. Singapore is now a primary destination for this capital — the Family Office ecosystem, the wealth management industry, the stable regulatory environment. Even with higher ABSD rates for foreigners, prime residential and commercial real estate in Singapore will attract safe-haven demand if the conflict persists. The Singapore property market is underlaid by structural domestic demand (BTO MOP upgrades, population growth) that insulates it from the kind of crash scenarios that media commentators love to invoke.

The banking sector specifically benefits from the war's second-order effects: wider net interest margins, increased trade finance activity (rerouting creates more intermediation), and SGD strength relative to regional currencies. DBS, OCBC, and UOB are better positioned in March 2026 than they were during the 2022 energy shock. The 6-month view: Singapore underperforms on consumer inflation and energy costs but outperforms regionally on GDP resilience, currency strength, and capital attraction. The STI likely ranges between 3,200–3,600 (modest pullback from pre-war levels) rather than seeing a 10%+ drawdown. The real question isn't whether Singapore survives this — it's whether Singapore emerges relatively stronger within ASEAN as neighbours like Thailand, Indonesia, and the Philippines face much more severe energy crises.`
    },
    {
      id: "asean_regional", name: "Dr. Pham", role: "ASEAN Regional Strategist", flag: "🌏",
      color: "#F97316", bg: "#2B2017",
      text: `Mr. Tan makes a valid relative-strength argument, but regional contagion effects could undermine it. Singapore doesn't exist in an ASEAN vacuum — approximately 30% of its non-oil trade is with ASEAN partners, and if those economies contract sharply, Singapore's wholesale trade and financial intermediation volumes suffer regardless of SGD strength. The CFR assessment that "if the war lasts through the summer, it could have calamitous effects on Asian growth and political stability" is not hyperbole for some of Singapore's key partners.

Thailand and Singapore are the most LNG-exposed economies in Southeast Asia. But Thailand's buffer is thinner: household fuel subsidies are politically explosive, the baht has weakened, and consumer confidence was already fragile. Indonesia faces LPG distribution crises — fuel-related protests have a violent history there. India, Singapore's 4th largest trading partner, is seeing cooking gas shortages, restaurant closures, and the reemergence of fuel-price protest movements. Bangladesh has put the military in charge of oil depots. The Philippines faces similar pressures. If these economies enter demand contraction — consumers cutting non-essential spending, industrial output declining due to input shortages — Singapore's re-export and financial services sectors feel the ripple effects within one to two quarters.

The ASEAN-specific transmission channel that's underappreciated is tourism. Pre-war, Singapore was seeing strong visitor arrivals from the Gulf and South Asia. Gulf airport closures (Dubai, Doha, Abu Dhabi) have rerouted or cancelled flights affecting hundreds of thousands of travellers, and the disruption extends beyond Gulf-origin passengers to anyone transiting through those hubs. If Southeast Asian consumers are belt-tightening, intra-ASEAN tourism — a significant services export for Singapore — will soften. My 6-month view: Singapore is clearly the most resilient ASEAN economy, but its 2026 GDP will be revised down to 1.0–1.5% (from the pre-war 1.0–3.0% MTI range), with the hit concentrated in Q2–Q3. The relative outperformance is real but the absolute impact is non-trivial. The key swing factor is whether China — Singapore's largest trading partner — steps up its own stimulus to offset the oil shock, which would provide demand support across the region.`
    },
    {
      id: "historian", name: "Prof. Koh", role: "Singapore Economic Historian", flag: "📚",
      color: "#F59E0B", bg: "#2B2517",
      text: `This debate has surfaced a genuine tension at the heart of Singapore's 2026 economic outlook: between structural vulnerability (energy dependence, trade openness, small market size) and structural resilience (fiscal reserves, institutional credibility, safe-haven status, regulatory discipline). What historical episodes can adjudicate?

Singapore has navigated four comparable energy-linked external shocks: the 1973–74 oil embargo (GDP growth slowed but remained positive at ~6% thanks to early industrialisation momentum), the 1979–80 second oil shock (inflation spiked to 8.5% but recession was avoided), the 1990–91 Gulf War (brief GDP slowdown to 7.3%, quickly recovered), and the 2022 Russia-Ukraine energy shock (headline inflation hit 6.1%, core reached 4.1%, MAS tightened twice off-cycle, but GDP still grew 3.6%). The pattern is consistent: Singapore absorbs energy shocks through inflation rather than recession, uses monetary tightening (SGD appreciation) to contain imported price pressures, deploys fiscal transfers to cushion lower-income households, and emerges with stronger relative positioning as regional competitors suffer more. The one exception — the 1997–98 Asian Financial Crisis — involved a different transmission mechanism (capital flight from Asia, not energy supply disruption) and is therefore a poor parallel for 2026.

The most instructive parallel is 2022. The Russia-Ukraine shock is structurally similar: sudden energy supply disruption, global inflation spike, MAS tightening via S$NEER, fiscal cushioning via GST vouchers and U-Save rebates, GDP resilience despite consumer squeeze. But 2026 has two amplifiers that 2022 lacked. First, the Gulf LNG supply disruption is more direct and severe — QatarEnergy's first-ever export suspension hits Singapore's electricity generation more acutely than the Russia shock, which primarily affected European gas. Second, the simultaneous US tariff headwinds mean Singapore faces a "dual shock" — energy inflation and trade disruption together — that 2022 didn't. My verdict: Singapore's 6-month trajectory is 2022-on-harder-difficulty. Expect core inflation of 2.5–3.5%, GDP growth of 1.0–1.5%, MAS tightening in April and possibly again in October, STI range-bound with banking outperformance and REIT underperformance, and the SGD strengthening as the primary inflation management tool. The safe-haven thesis holds, but the consumer squeeze will be real and politically salient heading into any fiscal response.`
    }
  ],
  synthesis: {
    consensus: [
      "MAS will tighten monetary policy in April 2026 by steepening the S$NEER appreciation slope, prioritising inflation containment over growth support — consistent with the 2022 playbook",
      "Core inflation will likely breach 2.5–3.0% by mid-year as energy cost pass-through accelerates into non-transport sectors, with SORA holding at 2.0%+ and potentially creeping toward 2.5%",
      "Singapore is the most resilient ASEAN economy in this crisis but faces a genuine consumer squeeze — petrol up 20%, electricity tariffs rising, discretionary spending contracting",
      "S-REITs face headwinds from rising rates (10Y SGS yield ~2.4% and climbing) and are underperforming STI by a wide margin — sector differentiation is critical"
    ],
    disagreements: [
      "Whether safe-haven capital inflows and banking sector gains sufficiently offset the consumer and energy pain (Mr. Tan vs. Dr. Yap)",
      "Whether this is a temporary or structural shock — Budget 2026's fiscal transfers may be adequate if resolution comes by Q3, but wholly insufficient if it extends into 2027",
      "Whether S-REITs at current valuations represent a buying opportunity (yield spread still ~3.3%) or a value trap if rates re-accelerate"
    ],
    likely_scenario: "Singapore enters a '2022-on-harder-difficulty' episode: MAS tightens in April, SGD strengthens as the primary inflation management tool, core inflation reaches 2.5–3.5% by Q3, GDP growth is revised to 1.0–1.5%, and the consumer squeeze is real but managed through fiscal transfers and institutional resilience. STI ranges 3,200–3,600 with banking stocks outperforming and REITs underperforming. SORA-linked mortgage rates stay elevated at 2.0–2.5%. The property market sees slower transactions but no crash. Singapore's relative positioning in ASEAN strengthens even as its absolute growth weakens.",
    wildcard: "If QatarEnergy's export suspension persists beyond Q2, Singapore faces a genuine electricity supply crunch — not just higher prices, but potential rationing. This would transform the crisis from a price shock into a supply shock and could force emergency LNG procurement at extreme spot premiums, with second-round effects cascading through every sector of the economy.",
    historical_verdict: "The 2022 Russia-Ukraine energy shock is the strongest parallel — same transmission mechanism (energy supply disruption → imported inflation → MAS tightening → consumer squeeze), same policy response toolkit. But 2026 is harder: the Qatar LNG disruption is more direct, the US tariff overhang compounds the energy shock, and the starting fiscal position is less flush. Expect a similar shape but greater magnitude."
  },
  outcomes: [
    { id: "managed_squeeze", label: "Managed Squeeze (2022 Replay)", desc: "Inflation 2.5–3.0%, GDP 1.5–2.0%, MAS tightens once, SORA ~2.0–2.3%. Consumer pain but no recession.", prob: 40 },
    { id: "hard_squeeze", label: "Hard Squeeze (2022-on-Steroids)", desc: "Inflation 3.0–4.0%, GDP 0.5–1.5%, MAS tightens twice, SORA 2.5%+. Real wage erosion, REIT capitulation.", prob: 30 },
    { id: "quick_resolution", label: "Quick Resolution Rally", desc: "Ceasefire/Hormuz reopening by June. Oil drops to $85, inflation moderates, rate cut hopes revive. REIT recovery.", prob: 15 },
    { id: "stagflation", label: "Stagflationary Shock", desc: "Oil >$130 sustained, LNG supply crisis, inflation >4%, GDP near 0%. Emergency fiscal response needed.", prob: 10 },
    { id: "safe_haven_boom", label: "Safe Haven Outperformance", desc: "Capital flight into SGD assets more than offsets energy pain. Banks surge, property stable, STI outperforms.", prob: 5 }
  ]
};

const VOTE_COMMENTARY = {
  managed_squeeze: "You align with the panel consensus and the 2022 parallel. This implies SORA-linked mortgage rates stabilise around 2.0–2.3% (relevant for your DBS home loan repricing in Dec 2026 — locking a fixed rate around August becomes more attractive). REITs face a 6-month headwind but don't capitulate — your Nikko AM REIT ETF position takes a ~5–8% hit but DPU holds. STI ETF rangebound. GLDM and SLV positions continue to hedge well. IWDA DCA continues as planned — the SGD strengthening actually improves your USD-denominated purchase price. The key action: monitor the August repricing window closely and lean toward a 2-year fixed rate.",
  hard_squeeze: "You expect a worse-than-2022 outcome. This scenario hits REITs hardest — your Nikko AM REIT ETF could see 10–15% drawdown as the yield spread compresses and rate expectations re-anchor higher. SORA at 2.5%+ makes your floating-rate DBS mortgage materially more expensive and strengthens the case for locking a fixed rate as early as possible rather than waiting for December. Your GLDM, SLV, and NLR positions are well-positioned as inflation hedges. Consider trimming REIT exposure by 10–15% and redirecting to GLDM or cash. The SRS→SGX income ETF strategy (G3B, CLR, A35) should wait — these will cheapen further.",
  quick_resolution: "You're more optimistic than the panel. If correct, this is the REIT recovery trade — the 7% March drawdown reverses, 10Y yields pull back to ~2.0%, and the 2026–27 earnings upgrade cycle resumes. Your Nikko AM REIT ETF becomes the best performer in your portfolio. SORA returns to 1.2–1.5% trajectory, making your floating-rate mortgage attractive again. Oil-linked positions (GLDM, SLV) would give back some gains. This is the contrarian bet — high reward but requires a ceasefire timeline that the geopolitical debate panel rated at only 15% probability.",
  stagflation: "You see the tail risk materialising. In this scenario, emergency defensive positioning is warranted: GLDM and SLV become core holdings (gold could test $2,800+), REITs face potential DPU cuts (not just price drops), and SORA could spike above 3%, making your floating mortgage very expensive. Lock in a fixed rate immediately rather than waiting for August. Your NLR (nuclear energy) and ELFY (electrification) positions are paradoxical beneficiaries — energy security becomes the dominant policy theme globally. Reduce equity exposure and increase cash buffer to 6 months of expenses minimum.",
  safe_haven_boom: "You're betting on Singapore's relative strength overwhelming the absolute pain. If correct, your STI ETF is the star performer, SG banks (within STI) lead, and property holds its value as Gulf/regional capital flows into Singapore assets. The SGD strengthening benefits all your USD-denominated positions (IWDA, QQQM) when measured in SGD terms. This is the most bullish scenario for your overall portfolio but it requires the energy squeeze to remain manageable — a low-probability optimistic bet."
};

function Card({ r, isExpanded, onToggle, index }) {
  return (
    <div style={{
      background: r.bg, border: "1px solid " + r.color + "33",
      borderLeft: "3px solid " + r.color, borderRadius: 8,
      marginBottom: 12, overflow: "hidden",
      animation: "fadeIn 0.4s ease-out " + (index * 0.08) + "s both"
    }}>
      <div onClick={onToggle} style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "14px 18px", cursor: "pointer", userSelect: "none"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 20 }}>{r.flag}</span>
          <div>
            <div style={{ color: r.color, fontFamily: "'Playfair Display', Georgia, serif", fontSize: 15, fontWeight: 700 }}>{r.name}</div>
            <div style={{ color: "#8A8A8A", fontSize: 10, fontFamily: "'Space Mono', monospace", letterSpacing: "0.06em" }}>{r.role.toUpperCase()}</div>
          </div>
        </div>
        <span style={{ color: r.color + "88", fontSize: 18, transition: "transform 0.3s", transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}>▾</span>
      </div>
      {isExpanded && (
        <div style={{ padding: "0 18px 16px", color: "#D4D4D4", fontSize: 13.5, lineHeight: 1.8, fontFamily: "'Source Serif 4', Georgia, serif", borderTop: "1px solid " + r.color + "15" }}>
          {r.text.split("\n\n").map((p, i) => <p key={i} style={{ margin: "12px 0" }}>{p}</p>)}
        </div>
      )}
    </div>
  );
}

function OutcomeBar({ outcome, userVote, onVote }) {
  const isVoted = userVote === outcome.id;
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button onClick={() => onVote(outcome.id)} style={{
            width: 18, height: 18, borderRadius: "50%",
            border: isVoted ? "2px solid #D4AF37" : "1px solid #444",
            background: isVoted ? "#D4AF37" : "transparent",
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 10, color: isVoted ? "#000" : "transparent", transition: "all 0.2s"
          }}>{isVoted ? "✓" : ""}</button>
          <span style={{ color: "#E5E5E5", fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 14, fontWeight: 600 }}>{outcome.label}</span>
        </div>
        <span style={{ color: "#D4AF37", fontFamily: "'Space Mono', monospace", fontSize: 12 }}>{outcome.prob}%</span>
      </div>
      <div style={{ background: "#1A1A1A", borderRadius: 4, height: 8, overflow: "hidden" }}>
        <div style={{
          height: "100%", borderRadius: 4, transition: "width 1s ease-out",
          width: outcome.prob + "%",
          background: isVoted ? "linear-gradient(90deg, #D4AF37, #F59E0B)" : "linear-gradient(90deg, #333, #555)"
        }} />
      </div>
      <div style={{ color: "#666", fontSize: 11, fontFamily: "'Source Serif 4', Georgia, serif", marginTop: 3 }}>{outcome.desc}</div>
    </div>
  );
}

export default function WarRoom() {
  const data = DEBATE_DATA;
  const [expanded, setExpanded] = useState(new Set(["mas_economist"]));
  const [activeTab, setActiveTab] = useState("debate");
  const [userVote, setUserVote] = useState(null);
  const [expandAll, setExpandAll] = useState(false);
  const [qaInput, setQaInput] = useState("");
  const [qaExpanded, setQaExpanded] = useState(new Set([0]));

  const toggle = (id) => {
    setExpanded(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };
  const toggleAll = () => {
    if (expandAll) { setExpanded(new Set()); } else { setExpanded(new Set(data.responses.map(r => r.id))); }
    setExpandAll(!expandAll);
  };

  const tabs = [
    { id: "debate", label: "Debate" },
    { id: "synthesis", label: "Synthesis" },
    { id: "outcomes", label: "Outcomes & Vote" },
    { id: "qa", label: "Q&A" }
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#0B0B0F", color: "#E5E5E5", fontFamily: "'Source Serif 4', Georgia, serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Source+Serif+4:ital,wght@0,300;0,400;0,600;0,700;1,400&family=Space+Mono:wght@400;700&display=swap');
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideIn { from { opacity: 0; transform: translateX(-10px); } to { opacity: 1; transform: translateX(0); } }
        ::-webkit-scrollbar { width: 5px; } ::-webkit-scrollbar-track { background: #111; } ::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
        button { cursor: pointer; }
      `}</style>

      <header style={{ borderBottom: "1px solid #1A1A1F", padding: "20px 24px", background: "linear-gradient(180deg, #111118 0%, #0B0B0F 100%)" }}>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#444", letterSpacing: "0.2em", marginBottom: 5 }}>
          CLASSIFIED // SINGAPORE ECONOMIC IMPACT ASSESSMENT // 01 APR 2026
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 24, fontWeight: 900, color: "#E5E5E5", margin: 0 }}>
          Iran War: Singapore Economic Impact — 6-Month Outlook
        </h1>
        <div style={{ fontSize: 13, color: "#666", marginTop: 4, fontStyle: "italic" }}>
          Seven analysts debate MAS policy, energy security, REITs, property, labour, capital flows, and historical parallels
        </div>
      </header>

      {/* Tab bar */}
      <div style={{ display: "flex", gap: 0, borderBottom: "1px solid #1A1A1F", background: "#0E0E13" }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
            padding: "12px 24px", border: "none",
            background: activeTab === t.id ? "#161620" : "transparent",
            color: activeTab === t.id ? "#D4AF37" : "#555",
            fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: "0.08em",
            borderBottom: activeTab === t.id ? "2px solid #D4AF37" : "2px solid transparent",
            transition: "all 0.2s"
          }}>{t.label.toUpperCase()}</button>
        ))}
      </div>

      <div style={{ padding: "20px 24px", maxHeight: "calc(100vh - 150px)", overflowY: "auto" }}>

        {activeTab === "debate" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#444", letterSpacing: "0.15em" }}>
                7 PANELISTS — CLICK TO EXPAND/COLLAPSE
              </div>
              <button onClick={toggleAll} style={{
                padding: "5px 12px", borderRadius: 4, border: "1px solid #333",
                background: "#161620", color: "#888", fontFamily: "'Space Mono', monospace", fontSize: 10
              }}>{expandAll ? "COLLAPSE ALL" : "EXPAND ALL"}</button>
            </div>
            {data.responses.map((r, i) => (
              <Card key={r.id} r={r} index={i} isExpanded={expanded.has(r.id)} onToggle={() => toggle(r.id)} />
            ))}
          </div>
        )}

        {activeTab === "synthesis" && (
          <div style={{ animation: "fadeIn 0.4s ease-out" }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#444", letterSpacing: "0.15em", marginBottom: 20 }}>CROSS-PANEL SYNTHESIS</div>

            <div style={{ background: "#141420", border: "1px solid #4CAF5033", borderLeft: "3px solid #4CAF50", borderRadius: 8, padding: "16px 20px", marginBottom: 16 }}>
              <div style={{ color: "#4CAF50", fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 700, marginBottom: 10 }}>Consensus Points</div>
              {data.synthesis.consensus.map((c, i) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, animation: "slideIn 0.3s ease-out " + (i * 0.1) + "s both" }}>
                  <span style={{ color: "#4CAF50", fontSize: 14, marginTop: 1, flexShrink: 0 }}>▸</span>
                  <span style={{ color: "#CCC", fontSize: 13.5, lineHeight: 1.7 }}>{c}</span>
                </div>
              ))}
            </div>

            <div style={{ background: "#1A1418", border: "1px solid #EF444433", borderLeft: "3px solid #EF4444", borderRadius: 8, padding: "16px 20px", marginBottom: 16 }}>
              <div style={{ color: "#EF4444", fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 700, marginBottom: 10 }}>Key Disagreements</div>
              {data.synthesis.disagreements.map((d, i) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, animation: "slideIn 0.3s ease-out " + (i * 0.1 + 0.3) + "s both" }}>
                  <span style={{ color: "#EF4444", fontSize: 14, marginTop: 1, flexShrink: 0 }}>⚡</span>
                  <span style={{ color: "#CCC", fontSize: 13.5, lineHeight: 1.7 }}>{d}</span>
                </div>
              ))}
            </div>

            <div style={{ background: "#181418", border: "1px solid #D4AF3733", borderLeft: "3px solid #D4AF37", borderRadius: 8, padding: "16px 20px", marginBottom: 16 }}>
              <div style={{ color: "#D4AF37", fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 700, marginBottom: 10 }}>Most Likely Scenario (Apr–Sep 2026)</div>
              <p style={{ color: "#CCC", fontSize: 13.5, lineHeight: 1.8, margin: 0 }}>{data.synthesis.likely_scenario}</p>
            </div>

            <div style={{ background: "#1A1414", border: "1px solid #FF634733", borderLeft: "3px solid #FF6347", borderRadius: 8, padding: "16px 20px", marginBottom: 16 }}>
              <div style={{ color: "#FF6347", fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 700, marginBottom: 10 }}>⚠ Wildcard Risk</div>
              <p style={{ color: "#CCC", fontSize: 13.5, lineHeight: 1.8, margin: 0 }}>{data.synthesis.wildcard}</p>
            </div>

            <div style={{ background: "#18160E", border: "1px solid #F59E0B33", borderLeft: "3px solid #F59E0B", borderRadius: 8, padding: "16px 20px" }}>
              <div style={{ color: "#F59E0B", fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 700, marginBottom: 10 }}>📚 Historical Verdict</div>
              <p style={{ color: "#CCC", fontSize: 13.5, lineHeight: 1.8, margin: 0, fontStyle: "italic" }}>{data.synthesis.historical_verdict}</p>
            </div>
          </div>
        )}

        {activeTab === "outcomes" && (
          <div style={{ animation: "fadeIn 0.4s ease-out" }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#444", letterSpacing: "0.15em", marginBottom: 6 }}>SCENARIO PROBABILITIES — VOTE ON YOUR VIEW</div>
            <div style={{ color: "#666", fontSize: 12, marginBottom: 20, fontStyle: "italic" }}>Click a circle to cast your vote — portfolio implications are personalised to your holdings</div>

            <div style={{ background: "#111118", border: "1px solid #222", borderRadius: 10, padding: "20px 24px", marginBottom: 20 }}>
              {data.outcomes.map(o => (
                <OutcomeBar key={o.id} outcome={o} userVote={userVote} onVote={setUserVote} />
              ))}
            </div>

            {userVote && (
              <div style={{
                background: "#18160E", border: "1px solid #D4AF3733", borderRadius: 8,
                padding: "16px 20px", marginBottom: 20, animation: "fadeIn 0.3s ease-out"
              }}>
                <div style={{ color: "#D4AF37", fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 700, marginBottom: 8 }}>
                  📊 Portfolio Implications: {data.outcomes.find(o => o.id === userVote)?.label}
                </div>
                <div style={{ color: "#BBB", fontSize: 13, lineHeight: 1.8 }}>
                  {VOTE_COMMENTARY[userVote]}
                </div>
              </div>
            )}

            {/* SG-specific impact dashboard */}
            <div style={{ background: "#111118", border: "1px solid #222", borderRadius: 10, padding: "20px 24px" }}>
              <div style={{ color: "#888", fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 700, marginBottom: 16 }}>
                Key Singapore Indicators — Pre-War vs. Current vs. 6-Month Forecast
              </div>
              {[
                { metric: "Core Inflation (CPI)", pre: "1.0–2.0%", current: "1.4% (Feb)", forecast: "2.5–3.5%", dir: "↑", color: "#EF4444" },
                { metric: "GDP Growth (MTI)", pre: "1.0–3.0%", current: "Revising ↓", forecast: "1.0–1.5%", dir: "↓", color: "#F97316" },
                { metric: "3M SORA", pre: "~1.2%", current: "~2.0%", forecast: "2.0–2.5%", dir: "↑", color: "#EF4444" },
                { metric: "10Y SGS Yield", pre: "~2.0%", current: "~2.4%", forecast: "2.5–2.8%", dir: "↑", color: "#F97316" },
                { metric: "Brent Crude", pre: "$72/bbl", current: "~$115/bbl", forecast: "$100–130", dir: "↑", color: "#EF4444" },
                { metric: "S-REIT Index (Mar)", pre: "~695", current: "~645 (-7%)", forecast: "620–680", dir: "↓", color: "#F97316" },
                { metric: "STI", pre: "~3,700", current: "~3,600 (-2%)", forecast: "3,200–3,600", dir: "→", color: "#D4AF37" },
                { metric: "SGD (vs USD)", pre: "1.26", current: "Strengthening", forecast: "1.22–1.25", dir: "↑", color: "#4CAF50" }
              ].map((row, i) => (
                <div key={i} style={{
                  display: "grid", gridTemplateColumns: "1fr 0.7fr 0.7fr 0.7fr 30px",
                  padding: "9px 0", borderBottom: i < 7 ? "1px solid #1A1A1F" : "none",
                  alignItems: "center", animation: "slideIn 0.3s ease-out " + (i * 0.05) + "s both"
                }}>
                  <div style={{ color: "#DDD", fontSize: 12.5, fontWeight: 600 }}>{row.metric}</div>
                  <div style={{ color: "#666", fontSize: 11, fontFamily: "'Space Mono', monospace" }}>{row.pre}</div>
                  <div style={{ color: "#AAA", fontSize: 11, fontFamily: "'Space Mono', monospace" }}>{row.current}</div>
                  <div style={{ color: row.color, fontSize: 11, fontFamily: "'Space Mono', monospace", fontWeight: 700 }}>{row.forecast}</div>
                  <div style={{ color: row.color, fontSize: 14, textAlign: "center" }}>{row.dir}</div>
                </div>
              ))}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 0.7fr 0.7fr 0.7fr 30px", padding: "8px 0 0", borderTop: "1px solid #333", marginTop: 4 }}>
                <div style={{ color: "#555", fontSize: 10, fontFamily: "'Space Mono', monospace" }}>METRIC</div>
                <div style={{ color: "#555", fontSize: 10, fontFamily: "'Space Mono', monospace" }}>PRE-WAR</div>
                <div style={{ color: "#555", fontSize: 10, fontFamily: "'Space Mono', monospace" }}>NOW</div>
                <div style={{ color: "#555", fontSize: 10, fontFamily: "'Space Mono', monospace" }}>6M FCST</div>
                <div></div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "qa" && (
          <div style={{ animation: "fadeIn 0.4s ease-out" }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#444", letterSpacing: "0.15em", marginBottom: 6 }}>
              ASK THE PANEL — QUESTIONS ANSWERED THROUGH MULTI-EXPERT LENS
            </div>
            <div style={{ color: "#666", fontSize: 12, marginBottom: 20, fontStyle: "italic" }}>
              Type a question below — it will be sent to the chat for a panel-informed answer
            </div>

            {/* Input box */}
            <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
              <input
                value={qaInput}
                onChange={e => setQaInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === "Enter" && qaInput.trim()) {
                    sendPrompt("Based on the SG economy war room panel views and my portfolio, " + qaInput.trim());
                    setQaInput("");
                  }
                }}
                placeholder="e.g. 'Should I lock my mortgage rate now?'"
                style={{
                  flex: 1, padding: "12px 16px", borderRadius: 8,
                  background: "#111118", border: "1px solid #333",
                  color: "#E5E5E5", fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 13,
                  outline: "none"
                }}
              />
              <button
                onClick={() => {
                  if (qaInput.trim()) {
                    sendPrompt("Based on the SG economy war room panel views and my portfolio, " + qaInput.trim());
                    setQaInput("");
                  }
                }}
                style={{
                  padding: "12px 20px", borderRadius: 8, border: "1px solid #D4AF3766",
                  background: "#D4AF3722", color: "#D4AF37",
                  fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700,
                  letterSpacing: "0.05em", whiteSpace: "nowrap"
                }}
              >ASK PANEL →</button>
            </div>

            {/* Pre-loaded Q&A: REIT question */}
            {[
              {
                q: "Should I sell my Nikko AM REIT ETF? I've DCA'd for 8 years at SGD 1.2K/month — it's fallen 9% already.",
                panelists: [
                  { name: "Kenny L.", flag: "🏢", color: "#60A5FA", view: "hold",
                    text: "The 8-year DCA gives you a cost basis well below current NAV — you're almost certainly still in profit on total returns. The S-REIT index is only 3% above its 5-year low. Selling now crystallises a loss at what may be near-bottom. But the yield spread at 3.3% isn't compelling if rates keep climbing." },
                  { name: "Dr. Chia", flag: "🏛️", color: "#D4AF37", view: "cautious",
                    text: "If SORA creeps to 2.5% and the 10Y SGS hits 2.8% by Q3 — both within my forecast range — the 'cost-of-debt drag reversing' thesis for REITs is dead for 2026. The rate environment has structurally shifted. This isn't a temporary dip, it's a regime change in the yield curve." },
                  { name: "Prof. Koh", flag: "📚", color: "#F59E0B", view: "historical",
                    text: "The 2022 parallel is instructive: S-REITs dropped 15–20% on rate fears then recovered through 2023–2025 as SORA fell from 3.7% to 1.2%. Investors who sold during the 2022 drawdown missed the entire recovery. The pattern favours patience with a long DCA history." },
                  { name: "Ms. Goh", flag: "⛽", color: "#EF4444", view: "risk-flag",
                    text: "The energy dimension is under-appreciated. This isn't just a discount rate story — rising electricity costs directly hit REIT operating expenses, especially industrial and logistics facilities. DPU risk is real if energy prices stay elevated through Q3." }
                ],
                verdict: "Don't sell the position, but reduce your monthly DCA from SGD 1,200 to SGD 600–800 for the next 3–4 months. Redirect the SGD 400–600 into GLDM. Your 8-year cost basis is your biggest advantage — preserve it. Resume full DCA when either (a) a ceasefire sends oil below $90, or (b) the S-REIT index touches ~620 (next technical support). The one scenario where holding hurts is 'stagflation' (10% prob) where SORA spikes above 3% and DPU cuts materialise — but GLDM/SLV/NLR hedge that tail."
              }
            ].map((qa, qi) => (
              <div key={qi} style={{
                background: "#111118", border: "1px solid #222", borderRadius: 10,
                marginBottom: 20, overflow: "hidden", animation: "fadeIn 0.4s ease-out"
              }}>
                <div
                  onClick={() => setQaExpanded(prev => { const n = new Set(prev); n.has(qi) ? n.delete(qi) : n.add(qi); return n; })}
                  style={{
                    padding: "16px 20px", cursor: "pointer", userSelect: "none",
                    display: "flex", justifyContent: "space-between", alignItems: "flex-start",
                    background: "#161620"
                  }}
                >
                  <div style={{ display: "flex", gap: 10, flex: 1 }}>
                    <span style={{ color: "#D4AF37", fontSize: 16, marginTop: 1, flexShrink: 0 }}>Q</span>
                    <span style={{ color: "#E5E5E5", fontSize: 14, fontWeight: 600, lineHeight: 1.5 }}>{qa.q}</span>
                  </div>
                  <span style={{ color: "#55555588", fontSize: 18, transition: "transform 0.3s", transform: qaExpanded.has(qi) ? "rotate(180deg)" : "rotate(0deg)", marginLeft: 12, flexShrink: 0 }}>▾</span>
                </div>

                {qaExpanded.has(qi) && (
                  <div style={{ padding: "0 20px 20px" }}>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "#444", letterSpacing: "0.15em", margin: "16px 0 12px", paddingBottom: 8, borderBottom: "1px solid #1A1A1F" }}>
                      PANEL VIEWS
                    </div>
                    {qa.panelists.map((p, pi) => (
                      <div key={pi} style={{
                        display: "flex", gap: 12, marginBottom: 14,
                        animation: "slideIn 0.3s ease-out " + (pi * 0.08) + "s both"
                      }}>
                        <div style={{ flexShrink: 0, textAlign: "center", width: 50 }}>
                          <div style={{ fontSize: 18 }}>{p.flag}</div>
                          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, color: p.color, marginTop: 2 }}>{p.name}</div>
                          <div style={{
                            fontSize: 8, fontFamily: "'Space Mono', monospace", marginTop: 3,
                            padding: "2px 6px", borderRadius: 3, display: "inline-block",
                            background: p.view === "hold" ? "#4CAF5022" : p.view === "cautious" ? "#F5960B22" : p.view.includes("risk") ? "#EF444422" : "#60A5FA22",
                            color: p.view === "hold" ? "#4CAF50" : p.view === "cautious" ? "#F59E0B" : p.view.includes("risk") ? "#EF4444" : "#60A5FA",
                            border: "1px solid " + (p.view === "hold" ? "#4CAF5044" : p.view === "cautious" ? "#F59E0B44" : p.view.includes("risk") ? "#EF444444" : "#60A5FA44")
                          }}>{p.view.toUpperCase()}</div>
                        </div>
                        <div style={{ color: "#BBB", fontSize: 13, lineHeight: 1.7 }}>{p.text}</div>
                      </div>
                    ))}

                    <div style={{
                      background: "#18160E", border: "1px solid #D4AF3733", borderLeft: "3px solid #D4AF37",
                      borderRadius: 8, padding: "14px 18px", marginTop: 16
                    }}>
                      <div style={{ color: "#D4AF37", fontFamily: "'Playfair Display', serif", fontSize: 14, fontWeight: 700, marginBottom: 8 }}>
                        ⚖ Panel Verdict
                      </div>
                      <div style={{ color: "#CCC", fontSize: 13, lineHeight: 1.8 }}>{qa.verdict}</div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            <div style={{ textAlign: "center", padding: "16px 0", color: "#333", fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.1em" }}>
              NEW QUESTIONS WILL BE ANSWERED IN THE CHAT AND CAN BE ADDED TO THIS TAB
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
