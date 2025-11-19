import React, { useState } from 'react';
import { WORKFLOW_DATA } from './constants';
import { Stage } from './types';
import { PhaseCard } from './components/PhaseCard';
import { OracleChat } from './components/OracleChat';
import { Sprout, TreeDeciduous, Trees, Globe, ShieldCheck, ChevronRight } from 'lucide-react';

const App: React.FC = () => {
  const [currentStage, setCurrentStage] = useState<Stage>(Stage.SEED);
  const [activeTab, setActiveTab] = useState<'guide' | 'oracle'>('guide');

  const stages = [
    { id: Stage.SEED, icon: Sprout, label: 'Seed' },
    { id: Stage.SAPLING, icon: TreeDeciduous, label: 'Sapling' },
    { id: Stage.TREE, icon: Trees, label: 'Tree' },
    { id: Stage.FOREST, icon: Globe, label: 'Forest' },
    { id: Stage.EMPIRE, icon: ShieldCheck, label: 'Empire' },
  ];

  return (
    <div className="min-h-screen bg-void text-slate-200 font-sans selection:bg-neon-green selection:text-black">
      {/* Navbar */}
      <header className="fixed top-0 w-full bg-void-light/80 backdrop-blur-md border-b border-slate-800 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-neon-green to-blue-600 rounded-lg flex items-center justify-center text-black font-bold">
              A
            </div>
            <span className="text-xl font-bold tracking-tight text-white">AetherForge <span className="text-slate-500 font-light">Codex</span></span>
          </div>
          <div className="flex space-x-1 bg-slate-800 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('guide')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'guide' ? 'bg-slate-700 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              Workflow Guide
            </button>
            <button
              onClick={() => setActiveTab('oracle')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'oracle' ? 'bg-neon-purple/20 text-neon-purple shadow-lg border border-neon-purple/30' : 'text-slate-400 hover:text-white'}`}
            >
              Oracle AI
            </button>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-12 px-4 max-w-7xl mx-auto">
        {activeTab === 'guide' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar Navigation (Timeline) */}
            <div className="lg:col-span-3 space-y-2 sticky top-24 h-fit">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 px-2">Evolution Timeline</h3>
              {stages.map((stage) => {
                const Icon = stage.icon;
                const isActive = currentStage === stage.id;
                return (
                  <button
                    key={stage.id}
                    onClick={() => setCurrentStage(stage.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-300 group ${
                      isActive 
                        ? 'bg-slate-800 border-l-4 border-neon-green text-white shadow-lg' 
                        : 'hover:bg-slate-800/50 text-slate-400 border-l-4 border-transparent'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className={`w-5 h-5 ${isActive ? 'text-neon-green' : 'text-slate-500 group-hover:text-slate-300'}`} />
                      <span className="font-mono font-medium">{stage.label}</span>
                    </div>
                    {isActive && <ChevronRight className="w-4 h-4 text-neon-green" />}
                  </button>
                );
              })}

              <div className="mt-8 p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-400">
                <p className="font-bold text-slate-300 mb-2">System Status</p>
                <div className="flex justify-between mb-1">
                  <span>Autopoiesis</span>
                  <span className="text-neon-green">Active</span>
                </div>
                <div className="flex justify-between">
                  <span>Evolution Rate</span>
                  <span className="text-neon-blue">Exponential</span>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-9">
              <PhaseCard data={WORKFLOW_DATA[currentStage]} />
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold text-white mb-4 glow-text">The AetherForge Oracle</h1>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Access the collective intelligence of the guide. Use <span className="text-neon-purple font-bold">Strategic Mode</span> to simulate future scenarios or complex scaling issues using Deep Thinking models.
              </p>
            </div>
            <OracleChat />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
