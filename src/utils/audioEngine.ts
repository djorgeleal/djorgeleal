/**
 * Web Audio API DJ Synthesizer & Track Engine
 * Provides streaming playback for DJ tracks, frequency analyzer, and explosive impact sound FX.
 */

export interface TrackInfo {
  id: string;
  title: string;
  artist: string;
  album: string;
  bpm: number;
  duration: number; // in seconds
  coverUrl: string;
  genre: string;
  lyrics: string[];
  audioUrl: string;
}

export const DJ_TRACKS: TrackInfo[] = [
  {
    id: 'secuencia',
    title: 'Secuencia',
    artist: 'DJ Jorge Leal',
    album: 'Hard Fusion Sessions',
    bpm: 140,
    duration: 180,
    coverUrl: '/1.png',
    genre: 'Hard Fusion',
    lyrics: [
      'Iniciando secuencia de audio...',
      'Frecuencias sincronizadas a 140 BPM...',
      'Siente el pulso en cada latido...',
      'Secuencia detonada... ¡Siente la música!'
    ],
    audioUrl: 'https://djorgeleal.github.io/musicas/Secuencia-djorgeleal(HardFusion).mp3'
  },
  {
    id: 'hey-boy-hey-girl-remix',
    title: 'Hey Boy Hey Girl Remix',
    artist: 'DJ Jorge Leal',
    album: 'Hard Fusion Sessions',
    bpm: 140,
    duration: 210,
    coverUrl: '/1.png',
    genre: 'Hard Fusion',
    lyrics: [
      'Here we go...',
      'Hey girls, B-boys...',
      'Superstar DJs, here we go!',
      '¡DJ Jorge Leal con el drop a 140 BPM!'
    ],
    audioUrl: 'https://djorgeleal.github.io/musicas/Hey-boy-Hey-girl-Remix-djorgeleal(HARDFUSION.mp3'
  },
  {
    id: 'alucinando',
    title: 'Alucinando',
    artist: 'DJ Jorge Leal',
    album: 'Hard Fusion Sessions',
    bpm: 140,
    duration: 195,
    coverUrl: '/1.png',
    genre: 'Hard Fusion',
    lyrics: [
      'Entrando en estado hipnótico...',
      'Luces estroboscópicas al máximo...',
      'Alucinando con el bajo subterráneo...',
      '¡Siente la música!'
    ],
    audioUrl: 'https://djorgeleal.github.io/musicas/Alucinando-djorgeleal-(HardFusion).mp3'
  },
  {
    id: 'prendelo-pinguino',
    title: 'Prendelo Pingüino',
    artist: 'DJ Jorge Leal',
    album: 'Hard Fusion Sessions',
    bpm: 140,
    duration: 200,
    coverUrl: '/1.png',
    genre: 'Hard Fusion',
    lyrics: [
      '¡Préndelo, préndelo!',
      'Sube la pista, revienta el sound...',
      'Prendelo Pingüino en la mezcla...',
      '¡Rompe el suelo a 140 BPM!'
    ],
    audioUrl: 'https://djorgeleal.github.io/musicas/Prendelo-Pinguino-Remix-djorgeleal.mp3'
  },
  {
    id: 'one-shot',
    title: 'One Shot',
    artist: 'DJ Jorge Leal',
    album: 'Hard Fusion Sessions',
    bpm: 140,
    duration: 190,
    coverUrl: '/1.png',
    genre: 'Hard Fusion',
    lyrics: [
      'Un solo tiro...',
      'One Shot para romper la noche...',
      'Impacto directo al pecho...',
      '¡Fuego en la pista a 140 BPM!'
    ],
    audioUrl: 'https://djorgeleal.github.io/musicas/One-Shot-djorgeleal(HardFusion).mp3'
  },
  {
    id: 'stutter',
    title: 'Stutter',
    artist: 'DJ Jorge Leal',
    album: 'Hard Fusion Sessions',
    bpm: 140,
    duration: 185,
    coverUrl: '/1.png',
    genre: 'Hard Fusion',
    lyrics: [
      'St-st-stutter beat...',
      'Corte de fase y modulación...',
      'El bajo entra sin piedad...',
      '¡Siente la música a 140 BPM!'
    ],
    audioUrl: 'https://djorgeleal.github.io/musicas/Stutter-djorgeleal(HardFusion).mp3'
  },
  {
    id: 'breack-to-house',
    title: 'Breack To House',
    artist: 'DJ Jorge Leal',
    album: 'Hard Fusion Sessions',
    bpm: 140,
    duration: 205,
    coverUrl: '/1.png',
    genre: 'Hard Fusion',
    lyrics: [
      'Del breakbeat directo al house...',
      'Groove imparable...',
      'Siente la transición en tu cuerpo...',
      '¡Subiendo la energía!'
    ],
    audioUrl: 'https://djorgeleal.github.io/musicas/Breack-to-house(HardFusion).mp3'
  },
  {
    id: 'hard-start',
    title: 'Hard start',
    artist: 'DJ Jorge Leal',
    album: 'Hard Fusion Sessions',
    bpm: 140,
    duration: 190,
    coverUrl: '/1.png',
    genre: 'Hard Fusion',
    lyrics: [
      'Arranque violento...',
      'Sin introducción suave, directo al impacto...',
      'Hard start en el sistema de sonido...',
      '¡Detonación total a 140 BPM!'
    ],
    audioUrl: 'https://djorgeleal.github.io/musicas/Hard-Start.mp3'
  },
  {
    id: 'hard-sound',
    title: 'Hard Sound',
    artist: 'DJ Jorge Leal',
    album: 'Hard Fusion Sessions',
    bpm: 140,
    duration: 215,
    coverUrl: '/1.png',
    genre: 'Hard Fusion',
    lyrics: [
      'Puro sonido pesado...',
      'Presión sonora al 100%...',
      'Bajos que estremecen el escenario...',
      '¡Hard sound en tu mente!'
    ],
    audioUrl: 'https://djorgeleal.github.io/musicas/HardSound.mp3'
  },
  {
    id: 'subsonscios',
    title: 'Subsonscios',
    artist: 'DJ Jorge Leal',
    album: 'Hard Fusion Sessions',
    bpm: 140,
    duration: 210,
    coverUrl: '/1.png',
    genre: 'Hard Fusion',
    lyrics: [
      'Frecuencias que no se escuchan, se sienten...',
      'Vibración subsónica directa a los huesos...',
      'Conexión subconsciente...',
      '¡Siente la música a 140 BPM!'
    ],
    audioUrl: 'https://djorgeleal.github.io/musicas/Subsonscios.mp3'
  },
  {
    id: 'tac-tic-tuc',
    title: 'Tac - Tic - tuc',
    artist: 'DJ Jorge Leal',
    album: 'Hard Fusion Sessions',
    bpm: 140,
    duration: 195,
    coverUrl: '/1.png',
    genre: 'Hard Fusion',
    lyrics: [
      'Tac... Tic... Tuc...',
      'El reloj de la fiesta marca la hora cero...',
      'Micro-ritmos y bajo punzante a 140 BPM...',
      '¡No pares de bailar!'
    ],
    audioUrl: 'https://djorgeleal.github.io/musicas/Tac-Tic-Tuc.mp3'
  },
  {
    id: 'alarma',
    title: 'Alarma',
    artist: 'DJ Jorge Leal',
    album: 'Hard Fusion Sessions',
    bpm: 140,
    duration: 185,
    coverUrl: '/1.png',
    genre: 'Hard Fusion',
    lyrics: [
      '¡Sirena activada!',
      'Alarma de evacuación en la pista...',
      'Peligro: exceso de bajos a 140 BPM...',
      '¡Alarma, fiesta descontrolada!'
    ],
    audioUrl: 'https://djorgeleal.github.io/musicas/Alarma.mp3'
  },
  {
    id: 'rumore-quimico',
    title: 'Rumore Quimico',
    artist: 'DJ Jorge Leal',
    album: 'Hard Fusion Sessions',
    bpm: 140,
    duration: 220,
    coverUrl: '/1.png',
    genre: 'Hard Fusion',
    lyrics: [
      'Reacción química en cadena...',
      'Rumor en la oscuridad...',
      'Sintetizadores ácidos y percusión metálica...',
      '¡Explosión química en la cabina!'
    ],
    audioUrl: 'https://djorgeleal.github.io/musicas/Rumore-Quimico.mp3'
  },
  {
    id: 'extasis',
    title: 'Extasis',
    artist: 'DJ Jorge Leal',
    album: 'Hard Fusion Sessions',
    bpm: 140,
    duration: 210,
    coverUrl: '/1.png',
    genre: 'Hard Fusion',
    lyrics: [
      'Entrando en la dimensión del éxtasis...',
      'Euforia en cada sintetizador...',
      'Bajo arrollador que eleva tus sentidos a 140 BPM...',
      '¡Éxtasis total en la pista... Siente la música!'
    ],
    audioUrl: 'https://djorgeleal.github.io/musicas/Extasis.mp3'
  },
  {
    id: 'check-out',
    title: 'Check Out',
    artist: 'DJ Jorge Leal',
    album: 'Hard Fusion Sessions',
    bpm: 140,
    duration: 200,
    coverUrl: '/1.png',
    genre: 'Hard Fusion',
    lyrics: [
      'Check out the rhythm...',
      'Check out the sound...',
      'Frecuencias extremas a 140 BPM...',
      '¡DJ Jorge Leal... Siente la música!'
    ],
    audioUrl: 'https://djorgeleal.github.io/musicas/Check-Out.mp3'
  }
];

class DJAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private isPlaying = false;
  private currentTrackIdx = 0;
  private playbackTime = 0;
  private timerId: number | null = null;
  private loopIntervalId: number | null = null;
  private repeatMode: 'off' | 'all' | 'one' = 'all';
  private isShuffle = false;

  private audioElement: HTMLAudioElement | null = null;
  private mediaSource: MediaElementAudioSourceNode | null = null;
  private isAudioConnected = false;

  private listeners: Set<() => void> = new Set();

  private initContext() {
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.85, this.ctx.currentTime);

      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;
      this.analyser.smoothingTimeConstant = 0.8;

      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private initAudio() {
    this.initContext();
    if (!this.audioElement) {
      this.audioElement = new Audio();
      this.audioElement.preload = 'auto';
      this.audioElement.crossOrigin = 'anonymous';

      this.audioElement.addEventListener('timeupdate', () => {
        if (this.audioElement) {
          this.playbackTime = this.audioElement.currentTime;
          this.notify();
        }
      });

      this.audioElement.addEventListener('loadedmetadata', () => {
        if (this.audioElement && this.audioElement.duration && !isNaN(this.audioElement.duration)) {
          DJ_TRACKS[this.currentTrackIdx].duration = this.audioElement.duration;
        }
        this.notify();
      });

      this.audioElement.addEventListener('ended', () => {
        this.handleTrackEnded();
      });

      this.audioElement.addEventListener('play', () => {
        this.isPlaying = true;
        this.notify();
      });

      this.audioElement.addEventListener('pause', () => {
        // Do not register pause if the track just ended, since handleTrackEnded handles the next track
        if (this.audioElement && this.audioElement.ended) {
          return;
        }
        this.isPlaying = false;
        this.notify();
      });

      this.audioElement.addEventListener('error', (e) => {
        console.warn('Audio streaming encountered issue, falling back to synth loop:', e);
        if (this.isPlaying) {
          this.startSynthLoop();
        }
      });

      try {
        if (this.ctx && this.masterGain && !this.isAudioConnected) {
          this.mediaSource = this.ctx.createMediaElementSource(this.audioElement);
          this.mediaSource.connect(this.masterGain);
          this.isAudioConnected = true;
        }
      } catch (err) {
        console.warn('Could not connect MediaElementSource to AudioContext:', err);
      }
    }
  }

  public subscribe(cb: () => void) {
    this.listeners.add(cb);
    return () => {
      this.listeners.delete(cb);
    };
  }

  private notify() {
    this.listeners.forEach((cb) => cb());
  }

  public setRepeatMode(mode: 'off' | 'all' | 'one') {
    this.repeatMode = mode;
    this.notify();
  }

  public getRepeatMode(): 'off' | 'all' | 'one' {
    return this.repeatMode;
  }

  public setShuffle(shuffle: boolean) {
    this.isShuffle = shuffle;
    this.notify();
  }

  public getShuffle(): boolean {
    return this.isShuffle;
  }

  public handleTrackEnded() {
    if (this.repeatMode === 'one') {
      this.seek(0);
      this.play();
      return;
    }

    if (this.isShuffle) {
      if (DJ_TRACKS.length > 1) {
        let nextIdx = Math.floor(Math.random() * DJ_TRACKS.length);
        while (nextIdx === this.currentTrackIdx) {
          nextIdx = Math.floor(Math.random() * DJ_TRACKS.length);
        }
        this.selectTrack(nextIdx);
      } else {
        this.seek(0);
        this.play();
      }
      return;
    }

    const isLastTrack = this.currentTrackIdx === DJ_TRACKS.length - 1;
    if (this.repeatMode === 'off' && isLastTrack) {
      this.isPlaying = false;
      this.seek(0);
      this.notify();
      return;
    }

    // Automatically transition to the next track and keep playing!
    this.nextTrack(true);
  }

  public getPlaybackState() {
    const curTrack = DJ_TRACKS[this.currentTrackIdx];
    const duration =
      this.audioElement && this.audioElement.duration && !isNaN(this.audioElement.duration)
        ? this.audioElement.duration
        : curTrack.duration;

    return {
      isPlaying: this.isPlaying,
      track: curTrack,
      trackIndex: this.currentTrackIdx,
      currentTime: this.audioElement ? this.audioElement.currentTime : this.playbackTime,
      duration: duration || 180,
      volume: this.masterGain ? this.masterGain.gain.value : 0.85,
      repeatMode: this.repeatMode,
      isShuffle: this.isShuffle,
    };
  }

  /**
   * Sound effect for the BRUTAL entrance
   * Heavy 808 sub-drop boom + white noise sweep + resonant punch
   */
  public playBrutalImpactSound() {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;
      const t = this.ctx.currentTime;

      // 1. Sub Bass Dive (808 Boom)
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(180, t);
      osc.frequency.exponentialRampToValueAtTime(32, t + 1.2);

      oscGain.gain.setValueAtTime(1.0, t);
      oscGain.gain.exponentialRampToValueAtTime(0.001, t + 1.8);

      osc.connect(oscGain);
      oscGain.connect(this.masterGain);
      osc.start(t);
      osc.stop(t + 1.8);

      // 2. Punch Transient (Kick click)
      const punch = this.ctx.createOscillator();
      const punchGain = this.ctx.createGain();
      punch.type = 'triangle';
      punch.frequency.setValueAtTime(350, t);
      punch.frequency.exponentialRampToValueAtTime(50, t + 0.08);

      punchGain.gain.setValueAtTime(0.8, t);
      punchGain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);

      punch.connect(punchGain);
      punchGain.connect(this.masterGain);
      punch.start(t);
      punch.stop(t + 0.12);

      // 3. Noise Whoosh & Strobe Explosion
      const bufferSize = this.ctx.sampleRate * 1.5;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'lowpass';
      noiseFilter.frequency.setValueAtTime(8000, t);
      noiseFilter.frequency.exponentialRampToValueAtTime(200, t + 1.4);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.6, t);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 1.4);

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.masterGain);
      noise.start(t);
      noise.stop(t + 1.5);
    } catch (e) {
      console.warn('Audio FX could not be played:', e);
    }
  }

  public playTitleBeatTick() {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, t);
      osc.frequency.exponentialRampToValueAtTime(120, t + 0.06);

      gain.gain.setValueAtTime(0.4, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t);
      osc.stop(t + 0.08);
    } catch {
      // Audio safe fallback
    }
  }

  /**
   * Fallback synthesizes continuous DJ club music sequence (Kick, Bass, Hats, Chords)
   */
  private startSynthLoop() {
    this.stopSynthLoop();
    this.initContext();

    const track = DJ_TRACKS[this.currentTrackIdx];
    const bpm = track.bpm;
    const stepDuration = 60 / bpm / 4; // 16th note in seconds
    let step = 0;

    const playStep = () => {
      if (!this.isPlaying || !this.ctx || !this.masterGain) return;
      const t = this.ctx.currentTime;
      const beat = Math.floor(step / 4) % 4; // 0, 1, 2, 3
      const isQuarter = step % 4 === 0;
      const isOffbeat = step % 4 === 2;

      // 1. Kick on every quarter note (4-on-the-floor)
      if (isQuarter) {
        const kickOsc = this.ctx.createOscillator();
        const kickGain = this.ctx.createGain();
        kickOsc.type = 'sine';
        kickOsc.frequency.setValueAtTime(140, t);
        kickOsc.frequency.exponentialRampToValueAtTime(38, t + 0.12);

        kickGain.gain.setValueAtTime(0.9, t);
        kickGain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);

        kickOsc.connect(kickGain);
        kickGain.connect(this.masterGain);
        kickOsc.start(t);
        kickOsc.stop(t + 0.25);
      }

      // 2. Open Hi-Hat on the offbeats (classic tech house groove)
      if (isOffbeat) {
        this.triggerHiHat(t, 0.08, 0.35);
      } else if (step % 2 === 0) {
        // Closed hi-hat
        this.triggerHiHat(t, 0.03, 0.18);
      }

      // 3. Clap on beats 2 and 4 (beat index 1 and 3)
      if (isQuarter && (beat === 1 || beat === 3)) {
        this.triggerClap(t);
      }

      // 4. Rolling Bassline (Sawtooth filtered bass notes)
      const bassNotes = [43.65, 43.65, 51.91, 48.99, 43.65, 58.27, 51.91, 43.65];
      const currentBassNote = bassNotes[(step / 2) % bassNotes.length];
      if (step % 2 === 1) {
        const bassOsc = this.ctx.createOscillator();
        const bassGain = this.ctx.createGain();
        const bassFilter = this.ctx.createBiquadFilter();

        bassOsc.type = this.currentTrackIdx === 1 ? 'sawtooth' : 'triangle';
        bassOsc.frequency.setValueAtTime(currentBassNote, t);

        bassFilter.type = 'lowpass';
        bassFilter.frequency.setValueAtTime(380, t);
        bassFilter.Q.setValueAtTime(4, t);

        bassGain.gain.setValueAtTime(0.55, t);
        bassGain.gain.exponentialRampToValueAtTime(0.001, t + stepDuration * 1.5);

        bassOsc.connect(bassFilter);
        bassFilter.connect(bassGain);
        bassGain.connect(this.masterGain);

        bassOsc.start(t);
        bassOsc.stop(t + stepDuration * 1.6);
      }

      // 5. Synth Stabs / Chords every 8 steps
      if (step % 8 === 0) {
        const chordFrequencies = [174.61, 207.65, 261.63];
        chordFrequencies.forEach((freq) => {
          if (!this.ctx || !this.masterGain) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          const filter = this.ctx.createBiquadFilter();

          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, t);

          filter.type = 'bandpass';
          filter.frequency.setValueAtTime(1200 + Math.sin(step) * 400, t);

          gain.gain.setValueAtTime(0.2, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(this.masterGain);

          osc.start(t);
          osc.stop(t + 0.36);
        });
      }

      step = (step + 1) % 32;
    };

    const intervalMs = stepDuration * 1000;
    this.loopIntervalId = window.setInterval(playStep, intervalMs);
  }

  private triggerHiHat(t: number, duration: number, volume: number) {
    if (!this.ctx || !this.masterGain) return;
    const bufSize = Math.floor(this.ctx.sampleRate * duration);
    const buf = this.ctx.createBuffer(1, bufSize, this.ctx.sampleRate);
    const output = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buf;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(7000, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(t);
    noise.stop(t + duration);
  }

  private triggerClap(t: number) {
    if (!this.ctx || !this.masterGain) return;
    const duration = 0.18;
    const bufSize = Math.floor(this.ctx.sampleRate * duration);
    const buf = this.ctx.createBuffer(1, bufSize, this.ctx.sampleRate);
    const output = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buf;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1400, t);
    filter.Q.setValueAtTime(2.5, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.5, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(t);
    noise.stop(t + duration);
  }

  private stopSynthLoop() {
    if (this.loopIntervalId !== null) {
      clearInterval(this.loopIntervalId);
      this.loopIntervalId = null;
    }
  }

  public play() {
    this.initAudio();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const currentTrack = DJ_TRACKS[this.currentTrackIdx];
    if (this.audioElement) {
      const targetSrc = currentTrack.audioUrl;
      if (!this.audioElement.src || !this.audioElement.src.includes(encodeURI(targetSrc)) && this.audioElement.src !== targetSrc) {
        this.audioElement.src = targetSrc;
        this.audioElement.currentTime = this.playbackTime;
      }
      this.audioElement.volume = this.masterGain ? this.masterGain.gain.value : 0.85;

      const playPromise = this.audioElement.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.isPlaying = true;
            this.notify();
          })
          .catch((err) => {
            console.warn('Auto-play prevented or stream wait:', err);
            this.isPlaying = true;
            this.startSynthLoop();
            this.notify();
          });
      }
    } else {
      this.isPlaying = true;
      this.startSynthLoop();
      this.notify();
    }
  }

  public pause() {
    this.isPlaying = false;
    this.stopSynthLoop();
    if (this.audioElement) {
      this.audioElement.pause();
    }
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    this.notify();
  }

  public togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  public seek(seconds: number) {
    this.playbackTime = Math.max(0, seconds);
    if (this.audioElement) {
      this.audioElement.currentTime = this.playbackTime;
    }
    this.notify();
  }

  public setVolume(val: number) {
    this.initContext();
    const clamped = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(clamped, this.ctx.currentTime);
    }
    if (this.audioElement) {
      this.audioElement.volume = clamped;
    }
    this.notify();
  }

  public nextTrack(forcePlay = false) {
    this.stopSynthLoop();
    if (this.isShuffle && DJ_TRACKS.length > 1) {
      let nextIdx = Math.floor(Math.random() * DJ_TRACKS.length);
      while (nextIdx === this.currentTrackIdx) {
        nextIdx = Math.floor(Math.random() * DJ_TRACKS.length);
      }
      this.currentTrackIdx = nextIdx;
    } else {
      this.currentTrackIdx = (this.currentTrackIdx + 1) % DJ_TRACKS.length;
    }
    this.playbackTime = 0;
    if (this.audioElement) {
      this.audioElement.currentTime = 0;
      this.audioElement.src = DJ_TRACKS[this.currentTrackIdx].audioUrl;
    }
    if (forcePlay || this.isPlaying) {
      this.play();
    } else {
      this.notify();
    }
  }

  public prevTrack(forcePlay = false) {
    this.stopSynthLoop();
    if (this.playbackTime > 4) {
      this.seek(0);
    } else {
      this.currentTrackIdx = (this.currentTrackIdx - 1 + DJ_TRACKS.length) % DJ_TRACKS.length;
      this.playbackTime = 0;
      if (this.audioElement) {
        this.audioElement.currentTime = 0;
        this.audioElement.src = DJ_TRACKS[this.currentTrackIdx].audioUrl;
      }
    }
    if (forcePlay || this.isPlaying) {
      this.play();
    } else {
      this.notify();
    }
  }

  public selectTrack(index: number) {
    if (index >= 0 && index < DJ_TRACKS.length) {
      this.stopSynthLoop();
      this.currentTrackIdx = index;
      this.playbackTime = 0;
      if (this.audioElement) {
        this.audioElement.currentTime = 0;
        this.audioElement.src = DJ_TRACKS[this.currentTrackIdx].audioUrl;
      }
      this.play();
    }
  }

  public getFrequencyData(): Uint8Array<ArrayBuffer> {
    if (!this.analyser) {
      return new Uint8Array(32);
    }
    const data = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(data);

    // If audio is playing and analyser is blank (e.g., initial buffering or CORS protection on cross-origin stream),
    // synthesize reactive pulse so visualizers maintain lively energy
    if (this.isPlaying) {
      let sum = 0;
      for (let i = 0; i < data.length; i++) sum += data[i];
      if (sum === 0) {
        const time = performance.now() * 0.008;
        for (let i = 0; i < data.length; i++) {
          const bassBoost = Math.max(0, 1 - i / 10);
          const beat = Math.sin(time * 2) > 0.4 ? 1 : 0.3;
          data[i] = Math.min(
            255,
            Math.floor((Math.sin(time + i * 0.4) * 0.5 + 0.5) * 160 * beat + bassBoost * 80)
          );
        }
      }
    }

    return data;
  }

  public loadCustomFile(file: File) {
    this.initAudio();
    const url = URL.createObjectURL(file);
    if (this.audioElement) {
      this.audioElement.src = url;
    }
    DJ_TRACKS[this.currentTrackIdx].title = file.name.replace(/\.[^/.]+$/, '');
    this.playbackTime = 0;
    this.play();
  }
}

export const audioEngine = new DJAudioEngine();
