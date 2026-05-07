const layers = [
  {
    id: "regulatory",
    code: "L1",
    label: "Regulatory Foundation",
    color: "#C8A84B",
    desc: "Map every applicable obligation before technology is built. Non-compliance here creates downstream risk.",
    controls: [
      ["FinCEN BSA Program", "Written AML policy, BSA Officer, independent audit, training, and board-level oversight.", "MANDATORY"],
      ["OFAC Sanctions Screening", "Screen customers, wallets, counterparties, and beneficial owners before onboarding and transactions.", "MANDATORY"],
      ["Travel Rule", "Transmit originator and beneficiary information for covered virtual asset transfers.", "MANDATORY"],
      ["State MSB Licensing", "Track state-by-state licensing requirements, renewals, thresholds, and examination readiness.", "MANDATORY"]
    ],
    ai: [
      ["Regulatory Change Intelligence", "Monitor FinCEN, OFAC, FATF, SEC, and state releases. Summarize policy impact automatically.", "LLM + RAG"],
      ["Policy Q&A Assistant", "Internal assistant trained on AML policy and regulatory guidance for staff support.", "LLM"]
    ]
  },
  {
    id: "kyc",
    code: "L2",
    label: "KYC / CDD / EDD",
    color: "#4B8FC8",
    desc: "The onboarding gate. Risk-tier every customer at intake with clear CDD and EDD workflows.",
    controls: [
      ["Identity Verification", "Collect and validate government ID using document checks and trusted verification providers.", "HIGH"],
      ["Liveness Detection", "Match selfie to ID and prevent spoofing or deepfake onboarding attempts.", "HIGH"],
      ["Beneficial Ownership", "Collect and verify UBO and control-person data for legal entities.", "MANDATORY"],
      ["PEP & Adverse Media", "Screen customers and owners against PEP, sanctions, and adverse media databases.", "HIGH"]
    ],
    ai: [
      ["Document Intelligence", "Use OCR and vision models to extract, validate, and flag document inconsistencies.", "OCR + Vision"],
      ["Dynamic Risk Scoring", "Score customers using geography, source of funds, industry, entity type, and behavior.", "ML Model"],
      ["Adverse Media Mining", "Use entity recognition and relevance scoring to detect customer-linked negative news.", "NLP"]
    ]
  },
  {
    id: "txn",
    code: "L3",
    label: "Transaction Monitoring",
    color: "#C84B4B",
    desc: "Every transaction is screened, scored, cleared, flagged, or blocked through a documented workflow.",
    controls: [
      ["Blockchain Analytics", "Use Chainalysis, Elliptic, TRM Labs, or similar tools for wallet and exposure risk.", "MANDATORY"],
      ["Rule-Based Alert Engine", "Detect structuring, velocity spikes, high-risk jurisdictions, and unusual behavior.", "MANDATORY"],
      ["Real-Time OFAC Screening", "Block confirmed sanctions hits before settlement.", "MANDATORY"],
      ["Case Management", "Route alerts to analysts with full audit trail and documented decisions.", "HIGH"]
    ],
    ai: [
      ["Behavioral Anomaly Detection", "Detect deviations from normal customer transaction patterns.", "Unsupervised ML"],
      ["Graph Analysis", "Identify layering rings, circular flows, and connected suspicious networks.", "Graph ML"],
      ["SAR Narrative Drafting", "Draft SAR narratives from alert data and analyst notes for human approval.", "LLM"]
    ]
  },
  {
    id: "blockchain",
    code: "L4",
    label: "On-Chain Intelligence",
    color: "#4BC84B",
    desc: "Digital asset-specific controls for wallets, chains, mixers, bridges, DeFi, NFTs, and token activity.",
    controls: [
      ["Address Labeling", "Maintain labeled wallet data across major chains and risk categories.", "HIGH"],
      ["DeFi Risk Registry", "Classify protocols by KYC posture, audit status, sanctions exposure, and bridge risk.", "MEDIUM"],
      ["NFT & Token Layering", "Monitor round-trip trades, wash trading, swaps, bridges, and rapid token movement.", "MEDIUM"],
      ["Wallet Governance", "Document hot/cold wallet segregation, signing controls, and sweep protocols.", "HIGH"]
    ],
    ai: [
      ["Mixer Detection", "Detect CoinJoin, peel chains, tumblers, and chain-hopping patterns.", "Graph ML"],
      ["Smart Contract Risk Review", "Flag admin-key, mint, pause, proxy, and rug-pull risks.", "Static Analysis + LLM"],
      ["Cross-Chain Tracing", "Correlate bridge timing, amounts, and wallet clusters across chains.", "ML Pipeline"]
    ]
  },
  {
    id: "reporting",
    code: "L5",
    label: "Reporting & Filing",
    color: "#9B4BC8",
    desc: "Accurate SAR, CTR, retention, audit, and examination workflows with clear ownership and deadlines.",
    controls: [
      ["BSA E-Filing", "Prepare SAR and CTR workflows aligned to current FinCEN form requirements.", "MANDATORY"],
      ["SAR Decision Audit Trail", "Document who reviewed alerts, what was found, and why each decision was made.", "MANDATORY"],
      ["Record Retention", "Retain KYC, transaction, SAR, CTR, and correspondence records for required periods.", "MANDATORY"],
      ["Examiner Readiness", "Maintain risk assessments, policies, training records, filings, and audit reports.", "HIGH"]
    ],
    ai: [
      ["Auto-SAR Drafting", "Generate structured SAR narratives for BSA Officer review.", "LLM"],
      ["CTR Auto-Population", "Populate CTR fields from customer and transaction records.", "Automation"],
      ["Compliance Dashboard", "Surface alert trends, case aging, false positives, and filing anomalies.", "Analytics"]
    ]
  },
  {
    id: "governance",
    code: "L6",
    label: "Governance",
    color: "#C87A4B",
    desc: "The oversight layer: independent audit, model validation, staff training, and continuous improvement.",
    controls: [
      ["Independent AML Audit", "Test policy, controls, systems, alerts, documentation, and operating effectiveness.", "MANDATORY"],
      ["BSA Officer Accountability", "Define authority, escalation paths, board access, and transaction halt rights.", "MANDATORY"],
      ["Staff Training", "Provide annual and role-specific AML training with completion records.", "MANDATORY"],
      ["Risk Assessment", "Maintain written enterprise-wide risk assessment and update on material change.", "MANDATORY"]
    ],
    ai: [
      ["Model Risk Management", "Validate, document, monitor, and version-control AI models used in compliance.", "MLOps"],
      ["Training Simulations", "Generate red-flag scenarios for staff training and surveillance testing.", "Synthetic Data"],
      ["Feedback Loop", "Feed analyst decisions back into model and rule tuning.", "Active Learning"]
    ]
  }
];

const stack = [
  ["Blockchain Analytics", "Chainalysis, Elliptic, TRM Labs, Merkle Science"],
  ["Identity / KYC", "Persona, Onfido, Jumio, Stripe Identity"],
  ["Sanctions & PEP", "Refinitiv World-Check, Dow Jones Risk, LexisNexis"],
  ["Travel Rule", "Notabene, Sygna, VerifyVASP, TRISA"],
  ["Case Management", "Actimize, Quantexa, ComplyAdvantage"],
  ["AI / ML", "AWS SageMaker, Vertex AI, Azure ML, MLflow"]
];

const workflow = [
  ["01", "Customer onboarding", "KYC, OFAC, PEP, and risk scoring trigger."],
  ["02", "Risk-tier decision", "Customer is approved, rejected, or routed to EDD."],
  ["03", "Transaction initiation", "Wallet, counterparty, sanctions, and Travel Rule checks run."],
  ["04", "Pre-settlement gate", "Clean transactions pass; high-risk activity is held or blocked."],
  ["05", "Monitoring update", "Behavior profile and anomaly score update after activity."],
  ["06", "Case review", "Analyst reviews alert and documents close, escalate, or file decision."],
  ["07", "Regulatory filing", "SAR or CTR is drafted, reviewed, approved, and filed."]
];

let activeLayer = layers[0];
let view = "controls";

const tabs = document.getElementById("layerTabs");
const head = document.getElementById("layerHead");
const items = document.getElementById("items");

function renderTabs() {
  tabs.innerHTML = "";
  layers.forEach(layer => {
    const btn = document.createElement("button");
    btn.textContent = `${layer.code} · ${layer.label}`;
    btn.style.setProperty("--color", layer.color);
    btn.className = layer.id === activeLayer.id ? "active" : "";
    btn.onclick = () => {
      activeLayer = layer;
      render();
    };
    tabs.appendChild(btn);
  });
}

function renderLayer() {
  head.style.setProperty("--color", activeLayer.color);
  head.innerHTML = `
    <div class="layer-title">
      <span class="code">${activeLayer.code}</span>
      <h2>${activeLayer.label}</h2>
    </div>
    <p class="desc">${activeLayer.desc}</p>
  `;
}

function renderItems() {
  const data = view === "controls" ? activeLayer.controls : activeLayer.ai;
  items.innerHTML = data.map(([name, detail, tag]) => `
    <article class="card" style="--color:${activeLayer.color}">
      <div class="card-head">
        <h3>${name}</h3>
        <span class="badge">${tag}</span>
      </div>
      <p>${detail}</p>
    </article>
  `).join("");
}

function renderStack() {
  document.getElementById("stack").innerHTML = stack.map(([title, tools]) => `
    <article class="stack-card">
      <h3>${title}</h3>
      <span class="pill">${tools}</span>
    </article>
  `).join("");
}

function renderWorkflow() {
  document.getElementById("workflow").innerHTML = workflow.map(([num, title, detail]) => `
    <div class="flow-step" style="--color:#C8A84B">
      <div class="num">${num}</div>
      <div>
        <h3>${title}</h3>
        <p>${detail}</p>
      </div>
    </div>
  `).join("");
}

document.querySelectorAll("[data-view]").forEach(btn => {
  btn.onclick = () => {
    view = btn.dataset.view;
    document.querySelectorAll("[data-view]").forEach(b => b.classList.toggle("active", b === btn));
    renderItems();
  };
});

function render() {
  renderTabs();
  renderLayer();
  renderItems();
}

render();
renderStack();
renderWorkflow();
