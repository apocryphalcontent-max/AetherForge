export enum Stage {
  SEED = 'SEED',
  SAPLING = 'SAPLING',
  TREE = 'TREE',
  FOREST = 'FOREST',
  EMPIRE = 'EMPIRE'
}

export interface TechStack {
  compute: string;
  database: string;
  ai: string;
  orchestration: string;
  cost: string;
}

export interface Module {
  title: string;
  description: string;
  codeSnippet?: string;
  metrics: { label: string; value: string }[];
}

export interface PhaseData {
  id: Stage;
  title: string;
  subtitle: string;
  duration: string;
  ordersPerDay: string;
  techStack: TechStack;
  modules: Module[];
  risks: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  isThinking?: boolean;
  timestamp: number;
  sources?: { uri: string; title: string }[];
}

export interface SimulationResult {
  scenario: string;
  outcome: string;
  survivalProbability: number;
  recommendedActions: string[];
}
