import React from 'react';
import { PhaseData, Module } from '../types';
import { Terminal, ShieldAlert, Cpu, Database, Network, DollarSign } from 'lucide-react';

interface Props {
  data: PhaseData;
}

const TechItem = ({ icon: Icon, label, value }: { icon: any, label: string, value: string }) => (
  <div className="flex items-center space-x-3 p-3 bg-void-light rounded-lg border border-slate-700">
    <Icon className="w-5 h-5 text-neon-blue" />
    <div>
      <p className="text-xs text-slate-400 uppercase tracking-wider">{label}</p>
      <p className="text-sm font-mono text-white">{value}</p>
    </div>
  </div>
);

export const PhaseCard: React.FC<Props> = ({ data }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-white glow-text">{data.title}</h2>
        <p className="text-neon-green font-mono text-lg">{data.subtitle}</p>
        <div className="flex items-center space-x-4 text-slate-400 text-sm">
          <span>⏱ {data.duration}</span>
          <span>📦 {data.ordersPerDay} Orders/Day</span>
        </div>
      </div>

      {/* Tech Stack Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <TechItem icon={Cpu} label="Compute" value={data.techStack.compute} />
        <TechItem icon={Database} label="Database" value={data.techStack.database} />
        <TechItem icon={Network} label="Orchestration" value={data.techStack.orchestration} />
        <TechItem icon={Terminal} label="AI Engine" value={data.techStack.ai} />
        <TechItem icon={DollarSign} label="Est. Cost" value={data.techStack.cost} />
      </div>

      {/* Modules */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white border-b border-slate-700 pb-2">Active Modules</h3>
        <div className="grid grid-cols-1 gap-6">
          {data.modules.map((mod, idx) => (
            <div key={idx} className="bg-void-light/50 p-6 rounded-xl border border-slate-700 hover:border-neon-green transition-colors group">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-lg font-bold text-white group-hover:text-neon-green">{mod.title}</h4>
                <div className="flex space-x-2">
                  {mod.metrics.map((m, i) => (
                    <span key={i} className="px-2 py-1 bg-slate-800 rounded text-xs font-mono text-neon-blue">
                      {m.label}: {m.value}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-slate-300 mb-4">{mod.description}</p>
              {mod.codeSnippet && (
                <div className="bg-black/50 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto border border-slate-800">
                  <pre>{mod.codeSnippet}</pre>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Risks */}
      <div className="bg-red-900/10 p-6 rounded-xl border border-red-900/30">
        <div className="flex items-center space-x-2 mb-4 text-red-400">
          <ShieldAlert className="w-5 h-5" />
          <h3 className="text-lg font-bold">Critical Risks</h3>
        </div>
        <ul className="list-disc list-inside space-y-2 text-red-200/70">
          {data.risks.map((risk, idx) => (
            <li key={idx}>{risk}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
