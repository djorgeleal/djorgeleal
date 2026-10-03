import React, { useRef, useEffect } from 'react';
import { audioEngine } from '../utils/audioEngine';

interface AudioSpectrumLettersProps {
  isPlaying: boolean;
  isHovered: boolean;
  onClick: () => void;
}

export const AudioSpectrumLetters: React.FC<AudioSpectrumLettersProps> = ({
  isPlaying,
  isHovered,
  onClick,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Peak history for smooth bar falloff
  const peakHistoryRef = useRef<number[]>(new Array(50).fill(0));
  const particlesRef = useRef<Array<{ x: number; y: number; vx: number; vy: number; life: number; size: number; color: string }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth * window.devicePixelRatio || 800);
    let height = (canvas.height = canvas.offsetHeight * window.devicePixelRatio || 300);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = (canvas.offsetWidth || 800) * (window.devicePixelRatio || 1);
      height = canvas.height = (canvas.offsetHeight || 300) * (window.devicePixelRatio || 1);
    };

    window.addEventListener('resize', handleResize);

    let phase = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Get real frequency data or generate gentle idle pulse
      const freqData = audioEngine.getFrequencyData();
      const numBars = 48;
      const barSpacing = width / numBars;
      const barWidth = Math.max(2, barSpacing * 0.55);

      // Calculate overall bass level for reactive scaling
      let bassSum = 0;
      for (let i = 0; i < 8; i++) {
        bassSum += freqData[i] || 0;
      }
      const bassAvg = isPlaying ? bassSum / 8 : 12 + Math.sin(phase * 2) * 8;
      const bassNorm = Math.min(1, bassAvg / 200);

      phase += isPlaying ? 0.05 + bassNorm * 0.04 : 0.02;

      // 2. Draw Ambient Central Spectrum Glow Orb
      const centerX = width / 2;
      const centerY = height / 2;
      const glowRadius = Math.max(50, (width * 0.35) * (0.8 + bassNorm * 0.4));
      
      const radialGlow = ctx.createRadialGradient(
        centerX,
        centerY,
        10,
        centerX,
        centerY,
        glowRadius
      );
      radialGlow.addColorStop(0, `rgba(255, 0, 50, ${0.25 + bassNorm * 0.35})`);
      radialGlow.addColorStop(0.5, `rgba(220, 20, 60, ${0.12 + bassNorm * 0.18})`);
      radialGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = radialGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, glowRadius, 0, Math.PI * 2);
      ctx.fill();

      // 3. Draw Dual Mirror Audio Spectrum Equalizer Bars
      const centerYBaseline = height * 0.52;

      for (let i = 0; i < numBars; i++) {
        const x = i * barSpacing + barSpacing * 0.25;
        
        // Map bar index to frequency spectrum
        const freqIdx = Math.floor((i / numBars) * Math.min(64, freqData.length));
        let rawVal = isPlaying ? freqData[freqIdx] || 0 : 0;

        // If paused or silent, add idle breathing wave
        if (!isPlaying || rawVal < 10) {
          rawVal = 18 + Math.sin(phase + i * 0.22) * 14 + Math.cos(phase * 0.7 + i * 0.1) * 8;
        }

        // Bass boost on lower-index bars
        if (i < 12) {
          rawVal *= 1.15;
        }

        const targetHeight = (rawVal / 255) * (height * 0.42) * (1 + bassNorm * 0.3);

        // Smooth peak decay
        peakHistoryRef.current[i] = Math.max(
          targetHeight,
          (peakHistoryRef.current[i] || 0) * 0.88 - 1.2
        );
        const currentH = peakHistoryRef.current[i];

        // Gradient for bars
        const barGrad = ctx.createLinearGradient(x, centerYBaseline - currentH, x, centerYBaseline + currentH);
        barGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        barGrad.addColorStop(0.18, 'rgba(255, 60, 90, 0.85)');
        barGrad.addColorStop(0.5, 'rgba(255, 0, 40, 0.4)');
        barGrad.addColorStop(0.82, 'rgba(255, 60, 90, 0.85)');
        barGrad.addColorStop(1, 'rgba(255, 255, 255, 0.95)');

        // Draw top bar (shooting upwards)
        ctx.fillStyle = barGrad;
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(x, centerYBaseline - currentH, barWidth, currentH, [3, 3, 0, 0]);
          ctx.fill();
          // Draw mirror bottom bar (shooting downwards)
          ctx.roundRect(x, centerYBaseline, barWidth, currentH * 0.65, [0, 0, 3, 3]);
          ctx.fill();
        } else {
          ctx.fillRect(x, centerYBaseline - currentH, barWidth, currentH);
          ctx.fillRect(x, centerYBaseline, barWidth, currentH * 0.65);
        }

        // Draw floating neon peak dot above the bar
        const peakY = centerYBaseline - currentH - 3;
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#ff0033';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(x + barWidth / 2, peakY, Math.max(1.2, barWidth * 0.35), 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }

      // 4. Draw Oscilloscope Frequency Laser Wave through center
      ctx.lineWidth = 2.5 + bassNorm * 2;
      ctx.strokeStyle = `rgba(255, 30, 70, ${0.75 + bassNorm * 0.25})`;
      ctx.shadowColor = '#ff0033';
      ctx.shadowBlur = 14 + bassNorm * 10;
      ctx.beginPath();

      const wavePoints = 40;
      for (let p = 0; p <= wavePoints; p++) {
        const px = (p / wavePoints) * width;
        const waveIdx = Math.floor((p / wavePoints) * 32);
        const waveAmp = isPlaying
          ? ((freqData[waveIdx] || 0) / 255) * (height * 0.18) * (1 + bassNorm * 0.5)
          : Math.sin(phase * 1.5 + p * 0.3) * (height * 0.08);

        const py = centerYBaseline + Math.sin(phase * 2 + p * 0.25) * waveAmp;
        if (p === 0) {
          ctx.moveTo(px, py);
        } else {
          ctx.lineTo(px, py);
        }
      }
      ctx.stroke();

      // Secondary glowing white center filament
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.shadowBlur = 4;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // 5. Spawn and render floating frequency sparks on heavy beats
      if (isPlaying && bassNorm > 0.65 && Math.random() < 0.35) {
        for (let s = 0; s < 3; s++) {
          particlesRef.current.push({
            x: centerX + (Math.random() - 0.5) * (width * 0.7),
            y: centerYBaseline + (Math.random() - 0.5) * 40,
            vx: (Math.random() - 0.5) * 4,
            vy: -Math.random() * 5 - 2,
            life: 1.0,
            size: Math.random() * 3 + 1.5,
            color: Math.random() > 0.4 ? '#ff2a55' : '#ffffff',
          });
        }
      }

      // Update & draw sparks
      for (let p = particlesRef.current.length - 1; p >= 0; p--) {
        const pt = particlesRef.current[p];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.life -= 0.035;

        if (pt.life <= 0) {
          particlesRef.current.splice(p, 1);
          continue;
        }

        ctx.fillStyle = pt.color;
        ctx.globalAlpha = pt.life;
        ctx.shadowColor = '#ff0033';
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size * pt.life, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1.0;
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isPlaying]);

  return (
    <div
      ref={containerRef}
      onClick={onClick}
      className="group cursor-pointer relative max-w-7xl w-full flex flex-col items-center -mt-4 sm:-mt-8 md:-mt-12 lg:-mt-16 transition-transform duration-300 active:scale-95 select-none"
      title="Toca para detonar el drop de sonido y acelerar los espectros"
    >
      {/* 1. Behind-the-text Canvas Spectrum Visualizer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80 group-hover:opacity-100 transition-opacity duration-300"
        style={{ filter: 'drop-shadow(0 0 20px rgba(255, 0, 50, 0.4))' }}
      />

      {/* 2. Ambient Red Flare & Spectral Wave Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] sm:w-[84%] md:w-[78%] h-56 sm:h-64 md:h-72 bg-red-600/40 sm:bg-red-600/30 blur-[80px] sm:blur-[100px] rounded-full pointer-events-none group-hover:bg-red-600/60 transition-all duration-500 z-0" />

      {/* Monumental Central DJ Logo (Phone, Tablet & Computer Optimized) */}
      <div className="relative z-10 flex items-center justify-center w-full px-2 sm:px-6 md:px-8 lg:px-4 my-1 sm:my-2 transition-all duration-300">
        <img
          src="https://djorgeleal.github.io/imagenes-/logo.webp"
          alt="DJ Jorge Leal - Siente La Música"
          className="w-auto h-auto max-w-[92vw] min-[390px]:max-w-[88vw] sm:max-w-[82vw] md:max-w-[76vw] lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl max-h-[220px] min-[390px]:max-h-[260px] sm:max-h-[330px] md:max-h-[410px] lg:max-h-[500px] xl:max-h-[580px] object-contain drop-shadow-[0_12px_45px_rgba(0,0,0,0.95)] group-hover:drop-shadow-[0_0_65px_rgba(255,0,50,0.9)] transition-all duration-500 pointer-events-none select-none scale-100 group-hover:scale-105 active:scale-95"
        />
      </div>
    </div>
  );
};
