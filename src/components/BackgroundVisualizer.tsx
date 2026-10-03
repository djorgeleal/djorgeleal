import React, { useEffect, useRef, useState } from 'react';
import { audioEngine } from '../utils/audioEngine';
import { Upload, Image as ImageIcon, RotateCcw, X, Check } from 'lucide-react';

interface BackgroundVisualizerProps {
  customImageUrl?: string;
  onUpdateImage: (url: string) => void;
  showSettingsModal: boolean;
  onCloseSettingsModal: () => void;
}

export const BackgroundVisualizer: React.FC<BackgroundVisualizerProps> = ({
  customImageUrl,
  onUpdateImage,
  showSettingsModal,
  onCloseSettingsModal,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewNotice, setPreviewNotice] = useState<string | null>(null);

  const activeImage = customImageUrl || 'https://djorgeleal.github.io/imagenes-/corto.webp';

  // Real-time canvas for audio-reactive spotlights, laser pulses and floating sparks
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle system
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      color: string;
    }

    const particles: Particle[] = [];
    for (let i = 0; i < 45; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4 + 0.1,
        vy: -Math.random() * 0.6 - 0.2,
        size: Math.random() * 2.5 + 0.8,
        alpha: Math.random() * 0.6 + 0.2,
        color: Math.random() > 0.4 ? '#ff2a4b' : '#ffffff',
      });
    }

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Check audio state
      const playback = audioEngine.getPlaybackState();
      const freqs = audioEngine.getFrequencyData();
      
      // Calculate bass power (low frequencies)
      let bassSum = 0;
      for (let i = 0; i < 6; i++) {
        bassSum += freqs[i] || 0;
      }
      const bassEnergy = bassSum / (6 * 255); // 0 to 1
      const activePulse = playback.isPlaying ? bassEnergy : 0.05;

      time += 0.02 + activePulse * 0.04;

      // 1. Volumetric spotlight cone sweep from upper left
      const beamGrad = ctx.createLinearGradient(0, 0, width * 0.75, height);
      beamGrad.addColorStop(0, `rgba(255, 255, 255, ${0.15 + activePulse * 0.2})`);
      beamGrad.addColorStop(0.3, `rgba(255, 30, 60, ${0.12 + activePulse * 0.18})`);
      beamGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.save();
      ctx.beginPath();
      const beamAngleOffset = Math.sin(time * 0.6) * 40;
      ctx.moveTo(-50, -50);
      ctx.lineTo(width * 0.4 + beamAngleOffset, 0);
      ctx.lineTo(width * 0.85 + beamAngleOffset * 2, height);
      ctx.lineTo(width * 0.2, height);
      ctx.closePath();
      ctx.fillStyle = beamGrad;
      ctx.fill();
      ctx.restore();

      // 2. Center Stage Bass Strobe / Shockwave ring when kick hits
      if (activePulse > 0.45) {
        ctx.save();
        ctx.beginPath();
        const shockRadius = (activePulse - 0.45) * 600 + 80;
        ctx.arc(width * 0.5, height * 0.45, shockRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 0, 50, ${(activePulse - 0.45) * 0.8})`;
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.restore();
      }

      // 3. Floating atmospheric dust and glowing red embers
      particles.forEach((p) => {
        p.x += p.vx * (1 + activePulse * 2);
        p.y += p.vy * (1 + activePulse * 3);

        if (p.y < 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x > width) p.x = 0;
        if (p.x < 0) p.x = width;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1 + activePulse * 0.8), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * (0.6 + activePulse * 0.8);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona un archivo de imagen válido (PNG, JPG, WebP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const resultUrl = event.target.result as string;
        onUpdateImage(resultUrl);
        setPreviewNotice('¡Imagen de fondo actualizada con éxito!');
        setTimeout(() => setPreviewNotice(null), 3500);
      }
    };
    reader.readAsDataURL(file);
  };

  const resetToDefault = () => {
    onUpdateImage('https://djorgeleal.github.io/imagenes-/corto.webp');
    setPreviewNotice('Restablecido a la Foto Oficial de DJ Jorge Leal');
    setTimeout(() => setPreviewNotice(null), 3000);
  };

  return (
    <>
      {/* Main Crisp Background Image Container */}
      <div
        className="fixed inset-0 z-0 dj-bg-framed bg-no-repeat transition-all duration-700 pointer-events-none overflow-hidden"
        style={{
          backgroundImage: `url(${activeImage})`,
          filter: 'contrast(1.08) brightness(0.98)',
        }}
      >
        {/* Soft atmospheric gradient keeping the face crisp, well-lit and clearly visible */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/85 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center_10%,transparent_45%,rgba(0,0,0,0.6)_85%)] lg:bg-[radial-gradient(ellipse_at_34%_4%,transparent_48%,rgba(0,0,0,0.6)_85%)] pointer-events-none" />
        {/* Subtle noise grain simulation */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ff0033_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      </div>

      {/* Dynamic Audio Reactive Spotlight & Canvas FX */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-1 pointer-events-none"
      />

      {/* Drag & Drop Overlay Zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleFileDrop}
        className={`fixed inset-0 z-30 transition-all pointer-events-none ${
          isDragOver
            ? 'pointer-events-auto bg-red-950/80 backdrop-blur-md border-4 border-dashed border-red-500 flex flex-col items-center justify-center'
            : ''
        }`}
      >
        {isDragOver && (
          <div className="flex flex-col items-center text-center p-8 bg-black/80 rounded-3xl border border-red-500 shadow-2xl">
            <Upload className="w-16 h-16 text-red-500 animate-bounce mb-4" />
            <h3 className="text-2xl font-bold font-display text-white">SUELTA AQUÍ TU IMAGEN 1</h3>
            <p className="text-neutral-400 text-sm mt-1">Se configurará como el fondo principal inmediatamente.</p>
          </div>
        )}
      </div>

      {/* Success Notification Toast */}
      {previewNotice && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-600/90 text-white font-medium text-xs shadow-2xl border border-red-400 backdrop-blur-md animate-in fade-in slide-in-from-top-3 duration-300">
          <Check className="w-4 h-4" />
          <span>{previewNotice}</span>
        </div>
      )}

      {/* Image Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-md apple-glass-card rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2 text-white font-bold font-display text-lg">
                <ImageIcon className="w-5 h-5 text-red-500" />
                <span>Imagen de Fondo</span>
              </div>
              <button
                onClick={onCloseSettingsModal}
                className="p-1 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-5 space-y-4">
              <div className="relative aspect-[3/4] max-h-56 mx-auto rounded-2xl overflow-hidden border border-white/15 shadow-xl bg-neutral-900">
                <img
                  src={activeImage}
                  alt="Vista previa fondo"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute bottom-2 left-2 right-2 px-2.5 py-1 rounded-lg bg-black/75 text-[11px] text-neutral-300 text-center backdrop-blur-sm">
                  Fondo activo actualmente
                </div>
              </div>

              <div className="flex flex-col gap-2.5 pt-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileInput}
                  accept="image/*"
                  className="hidden"
                />

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-3 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-red-900/40 cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  <span>Subir archivo de imagen (PNG / JPG)</span>
                </button>

                <button
                  onClick={resetToDefault}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 font-medium text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer border border-white/10"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restablecer a Imagen 1 Oficial</span>
                </button>
              </div>

              <p className="text-[11px] text-neutral-500 text-center leading-relaxed">
                Tip: También puedes arrastrar y soltar cualquier imagen directamente sobre la pantalla en cualquier momento.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
