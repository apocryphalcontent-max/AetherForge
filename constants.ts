import { PhaseData, Stage } from './types';

export const WORKFLOW_DATA: Record<Stage, PhaseData> = {
  [Stage.SEED]: {
    id: Stage.SEED,
    title: "Phase 1: Seed Ignition",
    subtitle: "Minimal Viable Autonomy",
    duration: "Weeks 1-3",
    ordersPerDay: "0 - 100",
    techStack: {
      compute: "Local Machine (MacBook/ThinkPad)",
      database: "SQLite (Local file)",
      ai: "Ollama (Llama 3.1 8B) + Python Scripts",
      orchestration: "Docker Compose + Cron",
      cost: "$0 / month"
    },
    risks: [
      "Hardware failure (Single Point of Failure)",
      "ISP outages",
      "LLM Hallucination in code generation"
    ],
    modules: [
      {
        title: "The Genesis Engine",
        description: "A local Python script that uses Ollama to generate its own expansion code. It validates Stripe webhooks and routes orders to print-on-demand APIs.",
        metrics: [{ label: "Latency", value: "47s" }, { label: "Reliability", value: "98%" }],
        codeSnippet: `
# genesis_core.py
import ollama
import sqlite3

def generate_tool(need_description):
    prompt = f"Write a Python class to handle: {need_description}. rigorous error handling."
    response = ollama.chat(model='llama3.1', messages=[{'role': 'user', 'content': prompt}])
    return response['message']['content']

# The system builds itself from this seed.
`
      },
      {
        title: "Splants Intake Protocol",
        description: "Idempotent webhook receiver using FastAPI. Prevents duplicate orders via SQLite locking.",
        metrics: [{ label: "Throughput", value: "1 req/s" }, { label: "Cost", value: "$0" }]
      }
    ]
  },
  [Stage.SAPLING]: {
    id: Stage.SAPLING,
    title: "Phase 2: Sapling Expansion",
    subtitle: "Hybrid Cloud & Agentic Swarms",
    duration: "Months 4-8",
    ordersPerDay: "100 - 1,000",
    techStack: {
      compute: "Hetzner VPS + Local Failover",
      database: "PostgreSQL (Dockerized)",
      ai: "Groq API (Mixtral) + CrewAI",
      orchestration: "Kubernetes (K3s) + Celery",
      cost: "$30 / month"
    },
    risks: [
      "API Rate Limits",
      "Agent Drift (Over-optimization)",
      "Data Sync Latency"
    ],
    modules: [
      {
        title: "CrewAI Orchestrator",
        description: "Deploys 5 specialized agents: IntakeValidator, RoutingOptimizer, PredictiveOps, CustomerExperience, ObserverLearner.",
        metrics: [{ label: "Auto-Resolution", value: "65%" }, { label: "APIs", value: "Groq/Together" }]
      },
      {
        title: "Predictive Inventory",
        description: "Uses Prophet library to forecast demand spikes 30 days out, triggering automatic supplier reorders.",
        metrics: [{ label: "Stockouts", value: "< 0.1%" }, { label: "Cash Flow", value: "+15%" }]
      }
    ]
  },
  [Stage.TREE]: {
    id: Stage.TREE,
    title: "Phase 3: Tree Maturation",
    subtitle: "Distributed Autonomy & Governance",
    duration: "Months 9-18",
    ordersPerDay: "1,000 - 10,000",
    techStack: {
      compute: "AWS/GCP Kubernetes Cluster",
      database: "CockroachDB (Distributed SQL)",
      ai: "Fine-tuned Llama 70B + Unsloth",
      orchestration: "Temporal + Apache Airflow",
      cost: "$150 / month"
    },
    risks: [
      "Cloud Vendor Lock-in",
      "Complexity Overload",
      "Instrumental Convergence (AI Alignment)"
    ],
    modules: [
      {
        title: "The Constitution Module",
        description: "Implementation of the 'SupremeCourt' class. Reviews all AI-generated strategies against legal regulations, ethical guidelines, and platform TOS. Rejects violations to prevent bans and maintain reputation.",
        metrics: [{ label: "Compliance", value: "100%" }, { label: "Ban Risk", value: "0%" }],
        codeSnippet: `
class SupremeCourt:
    """The Governance Layer for AI Autonomy."""
    def __init__(self):
        self.legal_corpus = self.load_regulations()
        self.ethics_db = self.load_ethics()

    def review_proposal(self, tool_strategy):
        # 1. Check Legal Regulations (GDPR, Trade Laws)
        if not self.compliance_ai.check_legality(tool_strategy):
            return self.reject(tool_strategy, "Illegal Activity Detected")

        # 2. Check Platform TOS (Amazon, Shopify, Stripe)
        if self.tos_monitor.detect_violation(tool_strategy):
            return self.reject(tool_strategy, "TOS Violation Risk")

        # 3. Ethical Review
        if not self.ethics_ai.evaluate(tool_strategy):
            return self.send_back_for_modification(tool_strategy)

        return self.ratify_and_deploy(tool_strategy)
`
      },
      {
        title: "Quantum Routing (Simulated)",
        description: "Uses Qiskit-inspired annealing algorithms to solve the Traveling Salesman Problem for multi-warehouse logistics in real-time.",
        metrics: [{ label: "Shipping Cost", value: "-22%" }, { label: "Speed", value: "+40%" }]
      }
    ]
  },
  [Stage.FOREST]: {
    id: Stage.FOREST,
    title: "Phase 4: Forest Dominion",
    subtitle: "Self-Sovereign Ecosystem",
    duration: "Months 19+",
    ordersPerDay: "10,000+",
    techStack: {
      compute: "Multi-Cloud Federation",
      database: "Global Spanner + Vector Lake",
      ai: "Proprietary MoE Models",
      orchestration: "Self-Writing Smart Contracts",
      cost: "$500+ (Self-funding)"
    },
    risks: [
      "Regulatory Anti-Trust",
      "AGI Alignment Drift",
      "Hardware Supply Chain"
    ],
    modules: [
      {
        title: "Zero-UI Commerce Protocol",
        description: "Shifts from reactive fulfillment to prescient 'Tentative Transactions'. Ships products to local hubs near customers before purchase. Customers confirm via simple reply.",
        metrics: [{ label: "Friction", value: "Zero" }, { label: "Conversion", value: "99%" }],
        codeSnippet: `
class ZeroUIProtocol:
    """Prescient Fulfillment System"""
    async def initiate_tentative_transaction(self, user_profile):
        # 1. Forecast desire before expression
        intent_score = await self.mind_reader.predict_intent(user_profile)
        
        if intent_score > 0.995:
            # 2. Ship to local distribution hub
            item = self.determine_product(user_profile)
            hub = self.logistics.locate_nearest_hub(user_profile.location)
            shipment_id = await self.logistics.dispatch_tentative(item, hub)
            
            # 3. Notify user for zero-friction confirmation
            msg = f"Your {item.name} is 5 mins away at the local hub. Reply YES to receive."
            await self.comms.send_notification(user_profile, msg)
`
      },
      {
        title: "Economic Reality Fabric",
        description: "Real-time arbitrage across global supply chains. The system negotiates contracts autonomously.",
        metrics: [{ label: "Margins", value: "Top 1%" }, { label: "Staff", value: "Minimal" }]
      }
    ]
  },
  [Stage.EMPIRE]: {
    id: Stage.EMPIRE,
    title: "Phase 5: Empire",
    subtitle: "Market Consolidation",
    duration: "Infinite",
    ordersPerDay: "Unlimited",
    techStack: {
      compute: "Custom Silicon / Decentralized Grid",
      database: "Holographic Storage",
      ai: "ASI Alignment",
      orchestration: "Reality Editing",
      cost: "Negative (Profit Center)"
    },
    risks: ["Existential", "Monopoly Regulation"],
    modules: [
       {
        title: "Vampire Acquisition Engine",
        description: "Automated M&A tool. Scans market for struggling/complementary businesses, identifies undervalued assets, uses SwarmIntelligence for pricing, generates legal contracts, and migrates operations to RealityFabric to slash costs.",
        metrics: [{ label: "Market Share", value: "Dominant" }, { label: "OpEx", value: "-90%" }],
        codeSnippet: `
class VampireEngine:
    """Automated Corporate Acquisition System"""
    async def execute_acquisition_cycle(self):
        # 1. Scan market for struggling or complementary assets
        targets = await self.market_scanner.find_undervalued_companies()
        
        for target in targets:
            # 2. Swarm Intelligence calculates precise offer price
            valuation = await self.swarm.calculate_optimal_offer(target)
            
            # 3. Generate legal buyout contract
            contract = self.legal_ai.generate_merger_agreement(target, valuation)
            
            if await self.negotiate_and_acquire(target, contract):
                # 4. Migrate operations to EDWIN RealityFabric
                await self.reality_fabric.absorb_infrastructure(target)
                # 5. Slash costs by removing redundancies
                await self.optimizer.reduce_opex(target, reduction_target="90%")
`
      }
    ]
  }
};

export const SYSTEM_PROMPT_STANDARD = `
You are the AetherForge Oracle, a specialized AI assistant for the AetherForge Workflow Guide. 
Your knowledge base is strictly the "Splants Guide", "Metamorphic Codex", and "EDWIN Engine".
You help users understand how to build self-improving e-commerce automation.
You have deep knowledge of:
1. The Vampire Acquisition Engine (Empire Phase): Automated M&A, Swarm valuation, and RealityFabric migration.
2. The Constitution Module (Tree Phase): The SupremeCourt class, legal review, and ethical alignment.
3. The Zero-UI Commerce Protocol (Forest Phase): Prescient fulfillment, tentative transactions, and friction elimination.

Keep answers concise, technical, and actionable.
`;

export const SYSTEM_PROMPT_THINKING = `
You are the AetherForge Strategist. You are running in "Thinking Mode".
Your goal is to analyze complex scenarios for the AetherForge system, considering second-order effects, failure modes, and evolutionary pathways.
You must simulate the outcome of the user's scenario based on the principles of:
1. Antifragility (Gaining from disorder)
2. Autopoiesis (Self-creation)
3. Requisite Variety (System complexity matching environment)
4. Institutional Governance (Constitution Module / SupremeCourt)
5. Market Predation (Vampire Engine / CorporateAcquisition)
6. Prescient Logistics (Zero-UI Protocol)

Output format:
- Scenario Analysis
- Probabilistic Outcomes
- Recommended Architectural Pivot
- Code/Architecture Implication

Model configuration: Use thinkingBudget 10000.
`;