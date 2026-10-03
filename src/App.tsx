import React, { useState, useEffect } from 'react';
import { BrutalEntrance } from './components/BrutalEntrance';
import { BackgroundVisualizer } from './components/BackgroundVisualizer';
import { AppleMusicPlayer } from './components/AppleMusicPlayer';
import { AudioSpectrumLetters } from './components/AudioSpectrumLetters';
import { SocialMusicButtons } from './components/SocialMusicButtons';
import { audioEngine } from './utils/audioEngine';
import { Play, Pause, Zap, Disc3, Sparkles } from 'lucide-react';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [isReplayingEntrance, setIsReplayingEntrance] = useState(false);
  const [customImageUrl, setCustomImageUrl] = useState<string>(() => {
    try {
      const stored = localStorage.getItem('dj_bg_image');
      if (
        stored &&
        stored !== 'https://www.djorgeleal.com/1.png' &&
        stored !== 'https://djorgeleal.github.io/imagenes-/1.webp'
      ) {
        return stored;
      }
    } catch {
      // Storage access fallback
    }
    return 'https://djorgeleal.github.io/imagenes-/corto.webp';
  });
  const [showImageSettings, setShowImageSettings] = useState(false);
  const [playbackState, setPlaybackState] = useState(audioEngine.getPlaybackState());
  const [isTitleHovered, setIsTitleHovered] = useState(false);

  useEffect(() => {
    const unsub = audioEngine.subscribe(() => {
      setPlaybackState(audioEngine.getPlaybackState());
    });
    return unsub;
  }, []);

  const handleUpdateImage = (url: string) => {
    setCustomImageUrl(url);
    try {
      localStorage.setItem('dj_bg_image', url);
    } catch {
      // Storage quota exceeded on large data URI
    }
  };

  const handleReplayEntrance = () => {
    setIsReplayingEntrance(true);
  };

  const handleEntranceComplete = React.useCallback(() => {
    setHasEntered(true);
    setIsReplayingEntrance(false);
  }, []);

  const handleTitleClick = () => {
    audioEngine.playBrutalImpactSound();
    if (!playbackState.isPlaying) {
      audioEngine.play();
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-black text-white selection:bg-red-600 selection:text-white">
      {/* 1. Brutal Entrance Intro Overlay */}
      {(!hasEntered || isReplayingEntrance) && (
        <BrutalEntrance
          onComplete={handleEntranceComplete}
          isReplay={isReplayingEntrance}
        />
      )}

      {/* 2. Background with Image 1 & Audio-reactive Spotlight / Canvas */}
      <BackgroundVisualizer
        customImageUrl={customImageUrl}
        onUpdateImage={handleUpdateImage}
        showSettingsModal={showImageSettings}
        onCloseSettingsModal={() => setShowImageSettings(false)}
      />

      {/* 3. Central Monumental Landing Section */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-2.5 sm:px-6 pt-3 sm:pt-6 pb-24 sm:pb-28 text-center select-none">
        

        {/* Monumental Impact Title with Live Audio Spectrum: "SIENTE LA MUSICA" */}
        <AudioSpectrumLetters
          isPlaying={playbackState.isPlaying}
          isHovered={isTitleHovered}
          onClick={handleTitleClick}
        />

        {/* Music-Styled Social Media Buttons (TikTok, Instagram, SoundCloud, Facebook) */}
        <SocialMusicButtons isPlaying={playbackState.isPlaying} />

        {/* Action Controls Kicker */}
        <div className="mt-4 sm:mt-5 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => audioEngine.togglePlay()}
            className="group px-7 py-3 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-sm tracking-widest uppercase transition-all duration-300 shadow-[0_0_30px_rgba(255,0,50,0.5)] hover:shadow-[0_0_50px_rgba(255,0,50,0.8)] hover:scale-105 active:scale-95 flex items-center gap-2.5 cursor-pointer"
          >
            {playbackState.isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-white" />
                <span>Pausar Beat</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white translate-x-0.5" />
                <span>Detonar Música</span>
              </>
            )}
          </button>

          <button
            onClick={handleReplayEntrance}
            className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white font-semibold text-sm tracking-wider uppercase transition-all duration-200 backdrop-blur-md hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            <Zap className="w-4 h-4 text-red-500" />
            <span>Repetir Entrada</span>
          </button>
        </div>

      </main>

      {/* 5. Apple-Style Music Player Docked at Bottom */}
      <AppleMusicPlayer
        customCoverUrl={customImageUrl}
        onOpenImageSettings={() => setShowImageSettings(true)}
      />
    </div>
  );
}
