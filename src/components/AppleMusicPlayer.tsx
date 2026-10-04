import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Shuffle,
  Repeat,
  Quote,
  ListMusic,
  Maximize2,
  Minimize2,
  Heart,
  Radio,
  Sliders,
  Sparkles
} from 'lucide-react';
import { audioEngine, DJ_TRACKS, TrackInfo } from '../utils/audioEngine';

interface AppleMusicPlayerProps {
  customCoverUrl?: string;
  onOpenImageSettings: () => void;
}

export const AppleMusicPlayer: React.FC<AppleMusicPlayerProps> = ({
  customCoverUrl,
  onOpenImageSettings,
}) => {
  const [playback, setPlayback] = useState(audioEngine.getPlaybackState());
  const [isLiked, setIsLiked] = useState(true);
  const isShuffle = playback.isShuffle ?? false;
  const repeatMode = playback.repeatMode ?? 'all';
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const [showQueue, setShowQueue] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [audioFreqs, setAudioFreqs] = useState<number[]>(new Array(16).fill(0));

  const animFrameRef = useRef<number | null>(null);

  // Sync state with audioEngine
  useEffect(() => {
    const unsub = audioEngine.subscribe(() => {
      setPlayback(audioEngine.getPlaybackState());
    });
    return unsub;
  }, []);

  // Update frequency visualizer bars
  useEffect(() => {
    const updateFreqs = () => {
      if (playback.isPlaying) {
        const raw = audioEngine.getFrequencyData();
        const sampled: number[] = [];
        const step = Math.floor(raw.length / 16);
        for (let i = 0; i < 16; i++) {
          sampled.push(raw[i * step] || 0);
        }
        setAudioFreqs(sampled);
      } else {
        setAudioFreqs(new Array(16).fill(0));
      }
      animFrameRef.current = requestAnimationFrame(updateFreqs);
    };

    animFrameRef.current = requestAnimationFrame(updateFreqs);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [playback.isPlaying]);

  const formatTime = (secs: number) => {
    const s = Math.floor(secs);
    const m = Math.floor(s / 60);
    const rem = s % 60;
    return `${m}:${rem < 10 ? '0' : ''}${rem}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    audioEngine.seek(val);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    setIsMuted(val === 0);
    audioEngine.setVolume(val);
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      audioEngine.setVolume(volume || 0.8);
    } else {
      setIsMuted(true);
      audioEngine.setVolume(0);
    }
  };

  const cover = customCoverUrl || 'https://www.djorgeleal.com/1.png';
  const remaining = Math.max(0, playback.duration - playback.currentTime);
  const progressPercent = playback.duration > 0 ? (playback.currentTime / playback.duration) * 100 : 0;

  // Active lyric calculation based on progress
  const currentLyrics = playback.track.lyrics;
  const lyricIndex = Math.min(
    currentLyrics.length - 1,
    Math.floor((playback.currentTime / (playback.duration || 1)) * currentLyrics.length)
  );

  return (
    <>
      {/* Floating Apple-Style Docked Player at bottom */}
      <footer className="fixed bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl z-40">
        <div className="apple-glass rounded-2xl px-3 sm:px-5 py-2.5 sm:py-3 shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            
            {/* 1. Track Info & Artwork (Left) */}
            <div className="flex items-center gap-3 min-w-0 max-w-[28%] sm:max-w-[30%]">
              <div 
                onClick={() => setIsExpanded(true)}
                className="relative group cursor-pointer w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-xl overflow-hidden bg-neutral-800 shadow-md ring-1 ring-white/15 transition-transform duration-200 group-hover:scale-105"
              >
                <img
                  src={cover}
                  alt={playback.track.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                />
                {/* Playing Equalizer Overlay on Hover */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="w-1 bg-red-500 rounded-full animate-wave-1" />
                  <span className="w-1 bg-white rounded-full animate-wave-2" />
                  <span className="w-1 bg-red-500 rounded-full animate-wave-3" />
                </div>
              </div>

              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-white text-xs sm:text-sm font-semibold truncate hover:underline cursor-pointer" onClick={() => setIsExpanded(true)}>
                    {playback.track.title}
                  </span>
                  {/* Apple Lossless / Hi-Res Indicator */}
                  <span className="hidden md:inline-block px-1.5 py-0.2 text-[9px] font-bold tracking-wider uppercase rounded bg-white/10 text-neutral-300 border border-white/10">
                    Lossless
                  </span>
                </div>
                <span className="text-neutral-400 text-[11px] sm:text-xs truncate">
                  {playback.track.artist}
                </span>
              </div>

              {/* Like / Heart button */}
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="hidden lg:flex p-1.5 text-neutral-400 hover:text-red-500 transition-colors cursor-pointer"
                title="Marcar como favorito"
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
              </button>
            </div>

            {/* 2. Apple Transport & Timeline Controls (Center) */}
            <div className="flex flex-col items-center flex-1 max-w-md">
              {/* Transport Buttons */}
              <div className="flex items-center gap-2 sm:gap-5 mb-1">
                <button
                  onClick={() => audioEngine.setShuffle(!isShuffle)}
                  className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                    isShuffle ? 'text-red-500' : 'text-neutral-400 hover:text-white'
                  }`}
                  title="Aleatorio"
                >
                  <Shuffle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>

                <button
                  onClick={() => audioEngine.prevTrack()}
                  className="p-1 text-neutral-300 hover:text-white transition-transform active:scale-90 cursor-pointer"
                  title="Anterior"
                >
                  <SkipBack className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                </button>

                {/* Big Apple Music Play/Pause Button */}
                <button
                  onClick={() => audioEngine.togglePlay()}
                  className="relative p-2.5 sm:p-3 rounded-full bg-white text-black hover:bg-neutral-200 transition-all active:scale-95 shadow-lg shadow-white/10 cursor-pointer group"
                  title={playback.isPlaying ? 'Pausar' : 'Reproducir'}
                >
                  {playback.isPlaying ? (
                    <Pause className="w-4 h-4 sm:w-5 sm:h-5 fill-black" />
                  ) : (
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-black translate-x-0.5" />
                  )}
                </button>

                <button
                  onClick={() => audioEngine.nextTrack()}
                  className="p-1 text-neutral-300 hover:text-white transition-transform active:scale-90 cursor-pointer"
                  title="Siguiente"
                >
                  <SkipForward className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                </button>

                <button
                  onClick={() => {
                    const modes: ('off' | 'all' | 'one')[] = ['off', 'all', 'one'];
                    const next = modes[(modes.indexOf(repeatMode) + 1) % modes.length];
                    audioEngine.setRepeatMode(next);
                  }}
                  className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                    repeatMode !== 'off' ? 'text-red-500' : 'text-neutral-400 hover:text-white'
                  }`}
                  title={`Repetir: ${repeatMode}`}
                >
                  <Repeat className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>

              {/* Scrubber Timeline */}
              <div className="w-full flex items-center gap-2 group px-1">
                <span className="text-[10px] text-neutral-400 font-mono w-7 sm:w-9 text-right tabular-nums">
                  {formatTime(playback.currentTime)}
                </span>

                <div className="relative flex-1 flex items-center h-4">
                  <div className="absolute left-0 right-0 h-1 bg-white/20 rounded-full overflow-hidden pointer-events-none">
                    <div
                      className="h-full bg-red-500 transition-all duration-150"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={playback.duration || 100}
                    step="0.5"
                    value={playback.currentTime}
                    onChange={handleSeek}
                    className="relative z-10 w-full opacity-0 hover:opacity-100 transition-opacity"
                  />
                </div>

                <span className="text-[10px] text-neutral-400 font-mono w-8 sm:w-10 text-left tabular-nums">
                  -{formatTime(remaining)}
                </span>
              </div>
            </div>

            {/* 3. Audio & Apple UI Extras (Right) */}
            <div className="flex items-center justify-end gap-1.5 sm:gap-3 min-w-0 max-w-[28%] sm:max-w-[30%]">
              {/* Lyrics Button */}
              <button
                onClick={() => setShowLyrics(!showLyrics)}
                className={`p-2 rounded-lg transition-colors cursor-pointer ${
                  showLyrics ? 'bg-red-500/20 text-red-400' : 'text-neutral-400 hover:text-white'
                }`}
                title="Letras en tiempo real"
              >
                <Quote className="w-4 h-4" />
              </button>

              {/* Queue / Tracklist Button */}
              <button
                onClick={() => setShowQueue(!showQueue)}
                className={`p-2 rounded-lg transition-colors cursor-pointer ${
                  showQueue ? 'bg-red-500/20 text-red-400' : 'text-neutral-400 hover:text-white'
                }`}
                title="Lista de temas"
              >
                <ListMusic className="w-4 h-4" />
              </button>

              {/* Volume Slider with Icon */}
              <div className="hidden md:flex items-center gap-2 group w-24 lg:w-32">
                <button
                  onClick={toggleMute}
                  className="text-neutral-400 hover:text-white cursor-pointer"
                  title={isMuted ? 'Activar sonido' : 'Silenciar'}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4 text-neutral-500" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-full accent-white"
                />
              </div>

              {/* Expand Fullscreen / Now Playing */}
              <button
                onClick={() => setIsExpanded(true)}
                className="p-2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                title="Modo pantalla completa"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </footer>

      {/* Floating Synced Lyrics Flyout (Apple Music Style) */}
      {showLyrics && (
        <div className="fixed bottom-24 right-4 sm:right-8 z-40 w-80 max-w-[90vw] apple-glass-card rounded-2xl p-4 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-300 tracking-wider uppercase">
              <Quote className="w-3.5 h-3.5 text-red-500" />
              <span>Letras en Vivo</span>
            </div>
            <button
              onClick={() => setShowLyrics(false)}
              className="text-neutral-500 hover:text-white text-xs cursor-pointer"
            >
              Cerrar
            </button>
          </div>

          <div className="space-y-3 py-1 max-h-60 overflow-y-auto pr-1">
            {currentLyrics.map((line, idx) => (
              <p
                key={idx}
                className={`text-sm sm:text-base font-display transition-all duration-300 ${
                  idx === lyricIndex
                    ? 'text-white font-bold scale-105 text-subtle-glow pl-2 border-l-2 border-red-500'
                    : 'text-neutral-500'
                }`}
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Up Next / Playlist Queue Flyout */}
      {showQueue && (
        <div className="fixed bottom-24 right-4 sm:right-8 z-40 w-88 max-w-[92vw] apple-glass-card rounded-2xl p-4 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-300 tracking-wider uppercase">
              <ListMusic className="w-3.5 h-3.5 text-red-500" />
              <span>A Continuación · Setlist</span>
            </div>
            <button
              onClick={() => setShowQueue(false)}
              className="text-neutral-500 hover:text-white text-xs cursor-pointer"
            >
              Cerrar
            </button>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto">
            {DJ_TRACKS.map((t, idx) => {
              const isCurrent = idx === playback.trackIndex;
              return (
                <div
                  key={t.id}
                  onClick={() => audioEngine.selectTrack(idx)}
                  className={`flex items-center justify-between p-2 rounded-xl cursor-pointer transition-colors ${
                    isCurrent
                      ? 'bg-red-500/20 border border-red-500/40 text-white'
                      : 'hover:bg-white/5 text-neutral-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xs font-mono text-neutral-500 w-4 text-center">
                      {isCurrent && playback.isPlaying ? '▶' : idx + 1}
                    </span>
                    <div className="truncate">
                      <p className={`text-xs font-medium truncate ${isCurrent ? 'text-red-400 font-bold' : ''}`}>
                        {t.title}
                      </p>
                      <p className="text-[10px] text-neutral-500 truncate">{t.genre} · {t.bpm} BPM</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-500 shrink-0">
                    {formatTime(t.duration)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Fullscreen Apple Music Now Playing View (Modal) */}
      {isExpanded && (
        <div className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-3xl animate-in fade-in zoom-in-95 duration-300">
          {/* Ambient blurred backdrop aura */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-25 blur-3xl pointer-events-none scale-125"
            style={{ backgroundImage: `url(${cover})` }}
          />

          {/* Top Bar */}
          <div className="relative z-10 flex items-center justify-between px-6 py-5 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
              <span className="text-xs font-mono font-semibold tracking-widest uppercase text-neutral-400">
                APPLE MUSIC · REPRODUCTOR OFICIAL
              </span>
            </div>

            <button
              onClick={() => setIsExpanded(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-transform active:scale-95 cursor-pointer"
            >
              <Minimize2 className="w-5 h-5" />
            </button>
          </div>

          {/* Main Fullscreen Grid */}
          <div className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 px-6 py-8 max-w-6xl mx-auto w-full overflow-y-auto">
            
            {/* Left: Giant Album Art with Real Audio Waveform */}
            <div className="flex flex-col items-center max-w-sm sm:max-w-md w-full">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(255,0,50,0.35)] ring-1 ring-white/20 transition-all duration-500">
                <img
                  src={cover}
                  alt={playback.track.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                {/* Audio visualizer spectrum overlay at bottom of cover */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-center gap-1.5 h-12">
                  {audioFreqs.map((f, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-red-600 to-rose-400 rounded-t-sm transition-all duration-75"
                      style={{
                        height: `${Math.max(4, (f / 255) * 44)}px`,
                        opacity: playback.isPlaying ? 0.9 : 0.25,
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-6 text-center w-full">
                <h3 className="text-xl sm:text-2xl font-bold font-display text-white truncate">
                  {playback.track.title}
                </h3>
                <p className="text-red-400 font-medium text-sm sm:text-base mt-1">
                  {playback.track.artist}
                </p>
                <p className="text-xs text-neutral-500 mt-1">
                  {playback.track.album} · {playback.track.genre}
                </p>
              </div>

              {/* Fullscreen Scrubber */}
              <div className="w-full mt-6">
                <div className="relative flex items-center h-4 group">
                  <div className="absolute left-0 right-0 h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-red-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={playback.duration || 100}
                    step="0.5"
                    value={playback.currentTime}
                    onChange={handleSeek}
                    className="relative z-10 w-full opacity-0 hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="flex justify-between text-xs font-mono text-neutral-400 mt-1">
                  <span>{formatTime(playback.currentTime)}</span>
                  <span>-{formatTime(remaining)}</span>
                </div>
              </div>

              {/* Fullscreen Big Controls */}
              <div className="flex items-center justify-center gap-6 mt-4">
                <button
                  onClick={() => audioEngine.prevTrack()}
                  className="p-3 text-neutral-300 hover:text-white transition-transform active:scale-90 cursor-pointer"
                >
                  <SkipBack className="w-7 h-7 fill-current" />
                </button>
                <button
                  onClick={() => audioEngine.togglePlay()}
                  className="p-5 rounded-full bg-white text-black hover:bg-neutral-200 transition-transform active:scale-95 shadow-xl cursor-pointer"
                >
                  {playback.isPlaying ? (
                    <Pause className="w-8 h-8 fill-black" />
                  ) : (
                    <Play className="w-8 h-8 fill-black translate-x-1" />
                  )}
                </button>
                <button
                  onClick={() => audioEngine.nextTrack()}
                  className="p-3 text-neutral-300 hover:text-white transition-transform active:scale-90 cursor-pointer"
                >
                  <SkipForward className="w-7 h-7 fill-current" />
                </button>
              </div>
            </div>

            {/* Right: Synced Lyrics View (Apple Style) */}
            <div className="flex-1 max-w-lg w-full flex flex-col justify-center space-y-6 text-left py-6">
              <div className="flex items-center gap-2 text-xs font-bold text-red-500 uppercase tracking-widest">
                <Sparkles className="w-4 h-4" />
                <span>LETRAS DINÁMICAS EN VIVO</span>
              </div>

              <div className="space-y-4">
                {currentLyrics.map((line, idx) => {
                  const isActive = idx === lyricIndex;
                  return (
                    <p
                      key={idx}
                      className={`text-2xl sm:text-3xl font-display font-extrabold transition-all duration-500 cursor-pointer ${
                        isActive
                          ? 'text-white scale-105 origin-left text-neon-impact'
                          : 'text-neutral-600 hover:text-neutral-400 opacity-60'
                      }`}
                      onClick={() => {
                        const targetTime = (idx / currentLyrics.length) * playback.duration;
                        audioEngine.seek(targetTime);
                      }}
                    >
                      {line}
                    </p>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
                <span>Audio Espacial · Dolby Atmos Compatible</span>
                <button
                  onClick={onOpenImageSettings}
                  className="text-red-400 hover:underline cursor-pointer"
                >
                  Personalizar Portada
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
