import React, { useState, useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';

interface BrutalEntranceProps {
  onComplete: () => void;
  isReplay?: boolean;
}

export const BrutalEntrance: React.FC<BrutalEntranceProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<'detonating' | 'impact' | 'fading'>('detonating');
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {

    const tImpact = setTimeout(() => {
      setStage('impact');
    }, 150);

    const tFading = setTimeout(() => {
      setStage('fading');
    }, 1200);

    const tComplete = setTimeout(() => {
      onCompleteRef.current();
    }, 1700);

    return () => {
      clearTimeout(tImpact);
      clearTimeout(tFading);
      clearTimeout(tComplete);
    };
  }, []); // Run strictly once on mount

  const handleDismiss = () => {
    onCompleteRef.current();
  };

  return (
    <div
      onClick={handleDismiss}
      className={`fixed inset-0 z-50 overflow-hidden transition-opacity duration-500 cursor-pointer ${
        stage === 'fading' ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
      }`}
    >
      {/* 1. Strobe Lightning Flash */}
      <div className="absolute inset-0 animate-brutal-strobe pointer-events-none" />

      {/* 2. Expanding Red Shockwave Ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-4 border-red-500 animate-ping opacity-75 duration-1000 scale-[25]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-2 border-white animate-ping opacity-60 duration-700 scale-[35]" />

      {/* 3. Center Slamming Monumental Title */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
        <div className="animate-brutal-shake flex flex-col items-center">
          <div className="flex items-center gap-3 text-red-500 font-bold tracking-[0.5em] text-sm uppercase mb-2 animate-pulse">
            <Sparkles className="w-4 h-4" />
            <span>DJORGELEAL PRESENTA</span>
            <Sparkles className="w-4 h-4" />
          </div>

          <h1 className="text-6xl sm:text-8xl md:text-9xl font-black font-display tracking-tighter uppercase text-center text-white text-glitch-impact">
            SIENTE LA <span className="bg-gradient-to-b from-white via-red-500 to-red-600 bg-clip-text text-transparent">MÚSICA</span>
          </h1>

          <div className="mt-4 px-5 py-1.5 rounded-full bg-red-600/30 border border-red-500/50 backdrop-blur-md text-red-300 font-mono text-xs tracking-widest uppercase">
            ⚡ FRECUENCIA DETONADA · 128 BPM
          </div>
        </div>
      </div>

      {/* 4. Blood-red Corner Splashes Overlay during impact */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-red-600/30 via-transparent to-transparent mix-blend-screen pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent mix-blend-overlay pointer-events-none" />
    </div>
  );
};
