import React, { useState, useCallback } from 'react';
import { AnimatedSeagull } from './components/AnimatedSeagull';
import { Cloud } from './components/Cloud';
import { CloudSize, BirdThought } from './types';
import { generateBirdThought } from './services/geminiService';
import { Loader2, MessageCircle, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [thought, setThought] = useState<BirdThought | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);

  // In a real app, we might check for API key presence differently.
  // Here we assume process.env.API_KEY is available as per instructions.
  // If not, we handle gracefully.
  const hasApiKey = !!process.env.API_KEY;

  const handleGenerateThought = useCallback(async () => {
    if (!hasApiKey) {
        // Fallback for demo if no key is present in env
        setThought({ thought: "I wish I had an API key...", mood: "philosophical" });
        return;
    }
    
    setIsLoading(true);
    setThought(null);
    
    try {
      const result = await generateBirdThought();
      setThought(result);
    } catch (error) {
      console.error(error);
      setThought({ thought: "My mind is cloudy today.", mood: "philosophical" });
    } finally {
      setIsLoading(false);
    }
  }, [hasApiKey]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-sky-300 via-sky-200 to-blue-100">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <Cloud size={CloudSize.LARGE} top="10%" delay="0s" opacity={0.8} />
        <Cloud size={CloudSize.MEDIUM} top="30%" delay="-20s" opacity={0.6} />
        <Cloud size={CloudSize.SMALL} top="60%" delay="-10s" opacity={0.4} />
        <Cloud size={CloudSize.LARGE} top="15%" delay="-45s" opacity={0.7} />
      </div>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center h-full w-full">
        
        {/* Thought Bubble */}
        <div className="min-h-[120px] flex items-end justify-center mb-4 px-4">
          {(thought || isLoading) && (
            <div className="animate-bounce relative max-w-xs md:max-w-md bg-white rounded-2xl p-6 shadow-lg border-2 border-sky-100 text-center">
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2 text-sky-600">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Thinking...</span>
                  </div>
                ) : (
                  <>
                    <p className="text-gray-800 font-medium text-lg italic">"{thought?.thought}"</p>
                    {/* Bubble Tail */}
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white border-b-2 border-r-2 border-sky-100 transform rotate-45"></div>
                  </>
                )}
            </div>
          )}
        </div>

        {/* The Bird */}
        <AnimatedSeagull />

        {/* Controls */}
        <div className="mt-12 flex flex-col items-center gap-4">
          <button
            onClick={handleGenerateThought}
            disabled={isLoading}
            className="group relative overflow-hidden rounded-full bg-white/90 px-8 py-4 shadow-xl transition-all hover:scale-105 hover:bg-white hover:shadow-2xl disabled:opacity-70 disabled:hover:scale-100 active:scale-95"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-sky-400/20 to-blue-500/20 opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="flex items-center gap-3 relative z-10">
                {isLoading ? (
                    <Loader2 className="w-6 h-6 text-sky-600 animate-spin" />
                ) : (
                    <Sparkles className="w-6 h-6 text-amber-500" />
                )}
              <span className="text-lg font-bold text-slate-700">
                What is it thinking?
              </span>
            </div>
          </button>
          
          {!hasApiKey && (
             <p className="text-xs text-slate-500 bg-white/50 px-3 py-1 rounded-full">
                API Key missing. Using demo mode.
             </p>
          )}
        </div>
      </main>

      {/* Ocean Footer */}
      <div className="absolute bottom-0 w-full h-32 bg-blue-600 opacity-20 blur-3xl transform translate-y-1/2"></div>
    </div>
  );
};

export default App;
