import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { generateStandardResponse, generateDeepThoughtResponse } from '../services/gemini';
import { Send, Cpu, BrainCircuit, Link } from 'lucide-react';

export const OracleChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      id: 'init', 
      role: 'model', 
      content: "I am the Oracle of AetherForge. Select a mode: Standard for guide queries, or Strategic for deep simulation.", 
      timestamp: Date.now() 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<'standard' | 'thinking'>('standard');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      let responseText = '';
      let sources: { uri: string, title: string }[] | undefined;

      if (mode === 'standard') {
        // Format history for Gemini (GoogleGenAI SDK style)
        const history = messages.map(m => ({
          role: m.role,
          parts: [{ text: m.content }]
        }));
        const result = await generateStandardResponse(input, history);
        responseText = result.text || "No response generated.";
        sources = result.sources;
      } else {
        const result = await generateDeepThoughtResponse(input);
        responseText = result.text || "Simulation failed.";
      }

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: responseText,
        isThinking: mode === 'thinking',
        timestamp: Date.now(),
        sources
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        content: "Error: Connection to Aether severed. Check API key.",
        timestamp: Date.now()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-void-light rounded-xl border border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-slate-900/50">
        <div className="flex items-center space-x-2">
          <BrainCircuit className={`w-5 h-5 ${mode === 'thinking' ? 'text-neon-purple' : 'text-neon-green'}`} />
          <span className="font-bold text-white">Oracle Interface</span>
        </div>
        <div className="flex bg-slate-800 rounded-lg p-1">
          <button
            onClick={() => setMode('standard')}
            className={`px-3 py-1 rounded-md text-xs font-mono transition-colors ${mode === 'standard' ? 'bg-neon-green text-black' : 'text-slate-400 hover:text-white'}`}
          >
            Standard
          </button>
          <button
            onClick={() => setMode('thinking')}
            className={`px-3 py-1 rounded-md text-xs font-mono transition-colors ${mode === 'thinking' ? 'bg-neon-purple text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Strategic
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-lg p-3 ${
              msg.role === 'user' 
                ? 'bg-slate-700 text-white' 
                : msg.isThinking 
                  ? 'bg-purple-900/30 border border-purple-500/30 text-purple-100'
                  : 'bg-slate-800 border border-slate-700 text-slate-200'
            }`}>
              <p className="whitespace-pre-wrap text-sm">{msg.content}</p>
              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-3 pt-2 border-t border-slate-600">
                  <p className="text-xs text-slate-400 mb-1">Grounding Sources:</p>
                  <div className="flex flex-wrap gap-2">
                    {msg.sources.map((src, idx) => (
                      <a key={idx} href={src.uri} target="_blank" rel="noreferrer" className="flex items-center space-x-1 text-xs text-neon-blue hover:underline">
                        <Link className="w-3 h-3" />
                        <span>{src.title || 'Source'}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-slate-700 bg-slate-900/50">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={mode === 'thinking' ? "Describe a complex scenario for simulation..." : "Ask about the workflow..."}
            className="w-full bg-slate-800 text-white rounded-lg pl-4 pr-12 py-3 focus:outline-none focus:ring-1 focus:ring-neon-green placeholder-slate-500"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="absolute right-2 top-2 p-1.5 bg-neon-green text-black rounded-md hover:bg-green-400 transition-colors disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
