import React from 'react';
import { ExternalLink } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

interface SocialItem {
  id: string;
  name: string;
  url: string;
  handle: string;
  themeColor: string;
  glowColor: string;
  borderHover: string;
  bgGradient: string;
  icon: (props: { className?: string }) => React.JSX.Element;
}

const MAIN_SOCIAL_LINKS: SocialItem[] = [
  {
    id: 'tiktok',
    name: 'TikTok',
    handle: '@djorgeleal',
    url: 'https://www.tiktok.com/@djorgeleal',
    themeColor: 'text-[#00f2fe]',
    glowColor: 'rgba(0, 242, 254, 0.45)',
    borderHover: 'hover:border-[#00f2fe]/80',
    bgGradient: 'hover:from-[#00f2fe]/20 hover:to-[#fe0979]/20',
    icon: ({ className = 'w-4 h-4' }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298 0 .591.045.87.134V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.27 6.27 0 0 0 1.96-4.48V8.69a8.18 8.18 0 0 0 4.81 1.56V6.8a4.87 4.87 0 0 1-1-.11z" />
      </svg>
    ),
  },
  {
    id: 'instagram',
    name: 'Instagram',
    handle: '@djorgeleal',
    url: 'https://www.instagram.com/djorgeleal',
    themeColor: 'text-[#e1306c]',
    glowColor: 'rgba(225, 48, 108, 0.5)',
    borderHover: 'hover:border-[#e1306c]/80',
    bgGradient: 'hover:from-[#f58529]/20 hover:via-[#dd2a7b]/20 hover:to-[#8134af]/20',
    icon: ({ className = 'w-4 h-4' }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    id: 'soundcloud',
    name: 'SoundCloud',
    handle: '@djorgeleal',
    url: 'https://soundcloud.com/djorgeleal',
    themeColor: 'text-[#ff5500]',
    glowColor: 'rgba(255, 85, 0, 0.5)',
    borderHover: 'hover:border-[#ff5500]/80',
    bgGradient: 'hover:from-[#ff5500]/25 hover:to-[#ff2200]/20',
    icon: ({ className = 'w-4 h-4' }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.175 12.225c-.053 0-.098.043-.105.097l-.234 2.871.234 2.836c.007.056.052.096.105.096.054 0 .098-.04.103-.096l.27-2.836-.27-2.871c-.005-.054-.05-.097-.103-.097zm1.192-.68c-.067 0-.12.052-.128.118l-.248 3.551.248 3.498c.008.067.061.12.128.12.067 0 .12-.053.125-.12l.288-3.498-.288-3.551c-.005-.066-.058-.118-.125-.118zm1.265-.678c-.08 0-.144.064-.15.143l-.224 4.23.224 4.153c.006.08.07.143.15.143.082 0 .146-.064.15-.143l.27-4.153-.27-4.23c-.004-.08-.068-.143-.15-.143zm1.32-.422c-.093 0-.168.075-.173.167l-.203 4.652.203 4.544c.005.092.08.167.173.167s.168-.075.17-.167l.255-4.544-.255-4.652c-.002-.092-.077-.167-.17-.167zm1.353-.284c-.105 0-.19.085-.194.19l-.178 4.936.178 4.793c.004.106.09.19.194.19.106 0 .19-.084.193-.19l.236-4.793-.236-4.936c-.003-.105-.087-.19-.193-.19zm1.385-.297c-.117 0-.213.094-.216.21l-.15 5.233.15 5.064c.003.116.1.21.216.21.117 0 .21-.094.213-.21l.21-5.064-.21-5.233c-.003-.116-.096-.21-.213-.21zm1.408-.094c-.13 0-.234.105-.236.235l-.123 5.328.123 5.15c.002.13.107.235.236.235.13 0 .235-.105.235-.235l.182-5.15-.182-5.328c0-.13-.105-.235-.235-.235zm1.419-.144c-.14 0-.255.114-.255.255l-.093 5.472.093 5.275c0 .14.114.255.255.255.14 0 .254-.114.254-.255l.15-5.275-.15-5.472c0-.141-.114-.255-.254-.255zm1.441.13c-.15 0-.273.123-.273.274l-.066 5.342.066 5.154c0 .15.122.274.273.274s.273-.123.273-.274l.117-5.154-.117-5.342c0-.15-.122-.274-.273-.274zm1.442.27c-.163 0-.294.133-.294.295l-.037 5.072.037 4.908c0 .162.132.295.294.295.163 0 .295-.133.295-.295l.088-4.908-.088-5.072c0-.162-.132-.295-.295-.295zm1.458.124c-.174 0-.314.142-.314.316l-.007 4.948.007 4.802c0 .175.14.316.314.316.174 0 .315-.141.315-.316l.058-4.802-.058-4.948c0-.174-.14-.316-.315-.316zm1.758-2.658c-.146 0-.285.032-.415.084-.117.047-.193.156-.196.282l-.022 7.24.022 4.92c.002.185.152.334.337.334h7.03c2.072 0 3.75-1.68 3.75-3.75 0-1.89-1.394-3.456-3.218-3.712-.34-2.884-2.772-5.132-5.748-5.132-.51 0-1.002.067-1.472.193-.024-.006-.048-.014-.068-.014v-.445z" />
      </svg>
    ),
  },
  {
    id: 'facebook',
    name: 'Facebook',
    handle: 'Jorge Leal',
    url: 'https://www.facebook.com/share/1C1w4HDUew/',
    themeColor: 'text-[#1877f2]',
    glowColor: 'rgba(24, 119, 242, 0.45)',
    borderHover: 'hover:border-[#1877f2]/80',
    bgGradient: 'hover:from-[#1877f2]/25 hover:to-[#00d2ff]/20',
    icon: ({ className = 'w-4 h-4' }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
];

const WHATSAPP_ITEM: SocialItem = {
  id: 'whatsapp',
  name: 'WhatsApp',
  handle: '',
  url: 'https://wa.me/573188614010',
  themeColor: 'text-[#25d366]',
  glowColor: 'rgba(37, 211, 102, 0.45)',
  borderHover: 'hover:border-[#25d366]/80',
  bgGradient: 'hover:from-[#25d366]/20 hover:to-[#128c7e]/20',
  icon: ({ className = 'w-4 h-4' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.587 1.761.884 2.79.885h.002c3.18 0 5.767-2.587 5.768-5.766.001-3.18-2.586-5.771-5.769-5.771zm3.374 8.214c-.146.415-.85.76-1.18.802-.32.041-.741.066-2.404-.627-1.996-.832-3.267-2.859-3.366-2.991-.1-.133-.807-1.074-.807-2.049 0-.974.512-1.453.693-1.65.182-.197.396-.247.528-.247.132 0 .265.003.38.008.121.006.284-.046.444.339.165.396.561 1.37.61 1.47.05.1.082.217.016.35-.066.133-.1.216-.198.332-.099.116-.208.26-.297.35-.1.1-.204.208-.088.406.115.198.513.847 1.101 1.371.758.675 1.397.884 1.595.983.198.099.314.083.43-.05.115-.133.496-.579.628-.778.132-.198.264-.165.446-.099.182.066 1.157.545 1.355.644.198.1.33.149.38.232.05.083.05.479-.096.894zM12.029 2C6.49 2 2 6.488 2 12.028c0 1.999.587 3.86 1.603 5.432L2.063 22l4.698-1.503c1.513.939 3.284 1.531 5.268 1.531 5.539 0 10.029-4.488 10.029-10.028C22.058 6.488 17.568 2 12.029 2zm0 18.05c-1.748 0-3.37-.506-4.747-1.379l-.341-.215-2.784.891.898-2.715-.236-.363a8.04 8.04 0 0 1-1.341-4.256c0-4.439 3.612-8.051 8.051-8.051 4.438 0 8.05 3.612 8.05 8.051 0 4.439-3.612 8.051-8.05 8.051z" />
    </svg>
  ),
};

interface SocialButtonProps {
  item: SocialItem;
  idx: number;
  isPlaying: boolean;
  onClick: () => void;
  className?: string;
}

const SocialButton: React.FC<SocialButtonProps> = ({
  item,
  idx,
  isPlaying,
  onClick,
  className = '',
}) => {
  const Icon = item.icon;
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className={`group relative overflow-hidden rounded-xl p-2 sm:p-2.5 bg-neutral-950/80 backdrop-blur-xl border border-white/10 ${item.borderHover} bg-gradient-to-b from-white/[0.04] to-transparent ${item.bgGradient} transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] flex items-center justify-between shadow-[0_4px_20px_rgba(0,0,0,0.5)] cursor-pointer w-full ${className}`}
      style={{
        boxShadow: `0 0 0 1px rgba(255, 255, 255, 0.05)`,
      }}
    >
      {/* Pulsing Bass Glow on Hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl"
        style={{
          background: `radial-gradient(circle at center, ${item.glowColor} 0%, transparent 70%)`,
        }}
      />

      {/* Platform Icon & Text */}
      <div className="relative z-10 flex items-center gap-2 min-w-0">
        <div
          className={`p-1.5 rounded-lg bg-black/60 border border-white/10 ${item.themeColor} shadow-[0_0_10px_rgba(0,0,0,0.5)] group-hover:scale-105 group-hover:shadow-[0_0_15px_currentColor] transition-all duration-300 shrink-0`}
        >
          <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </div>
        <div className="flex flex-col text-left truncate justify-center">
          <span className="text-[11px] sm:text-[12px] font-bold tracking-wide text-white group-hover:text-white transition-colors flex items-center gap-1 leading-tight">
            {item.name}
            <ExternalLink className="w-2 h-2 opacity-0 -translate-x-1 group-hover:opacity-70 group-hover:translate-x-0 transition-all text-neutral-300 shrink-0" />
          </span>
          {item.handle ? (
            <span className="text-[9px] font-mono text-neutral-400 group-hover:text-neutral-200 transition-colors leading-tight truncate">
              {item.handle}
            </span>
          ) : null}
        </div>
      </div>

      {/* Dynamic Sound Equalizer Wave Bars */}
      <div className="relative z-10 flex items-end gap-[1.5px] h-3 opacity-60 group-hover:opacity-100 transition-opacity shrink-0 ml-1.5">
        <span
          className={`w-[2px] rounded-full bg-current ${item.themeColor} ${
            isPlaying ? 'animate-wave-1' : 'h-1'
          }`}
          style={{ animationDelay: `${idx * 0.15}s` }}
        />
        <span
          className={`w-[2px] rounded-full bg-current ${item.themeColor} ${
            isPlaying ? 'animate-wave-2' : 'h-2.5'
          }`}
          style={{ animationDelay: `${idx * 0.2}s` }}
        />
        <span
          className={`w-[2px] rounded-full bg-current ${item.themeColor} ${
            isPlaying ? 'animate-wave-3' : 'h-1.5'
          }`}
          style={{ animationDelay: `${idx * 0.25}s` }}
        />
        <span
          className={`w-[2px] rounded-full bg-current ${item.themeColor} ${
            isPlaying ? 'animate-wave-4' : 'h-3'
          }`}
          style={{ animationDelay: `${idx * 0.1}s` }}
        />
      </div>
    </a>
  );
};

interface SocialMusicButtonsProps {
  isPlaying: boolean;
}

export const SocialMusicButtons: React.FC<SocialMusicButtonsProps> = ({ isPlaying }) => {
  const handleButtonClick = () => {
    try {
      audioEngine.playTitleBeatTick();
    } catch {
      // Audio fallback
    }
  };

  return (
    <div className="relative z-10 w-full max-w-2xl px-4 mt-2 sm:mt-1 md:-mt-1 lg:-mt-3 mb-1 flex flex-col items-center">
      {/* Prominent Audio Reactive Track Header */}
      <div className="flex items-center gap-2.5 sm:gap-3.5 mb-2.5 sm:mb-3">
        <span className="w-8 sm:w-12 h-[1.5px] bg-gradient-to-r from-transparent via-red-500/70 to-red-500" />
        <span className="text-xs sm:text-sm font-mono font-extrabold tracking-[0.22em] uppercase text-white drop-shadow-[0_0_12px_rgba(255,0,50,0.6)] flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 shadow-[0_0_10px_#ef4444]" />
          </span>
          REDES SOCIALES & CONTACTO
        </span>
        <span className="w-8 sm:w-12 h-[1.5px] bg-gradient-to-l from-transparent via-red-500/70 to-red-500" />
      </div>

      {/* Grid of Compact Independent Music-Styled Buttons (2 columns for perfect symmetry on all screens) */}
      <div className="grid grid-cols-2 gap-2 sm:gap-2.5 w-full max-w-md sm:max-w-lg">
        {MAIN_SOCIAL_LINKS.map((item, idx) => (
          <SocialButton
            key={item.id}
            item={item}
            idx={idx}
            isPlaying={isPlaying}
            onClick={handleButtonClick}
          />
        ))}

        {/* Centered WhatsApp Button under SoundCloud and Facebook with identical button width */}
        <div className="col-span-2 flex justify-center mt-0.5">
          <div className="w-[calc(50%-4px)] sm:w-[calc(50%-5px)] flex">
            <SocialButton
              item={WHATSAPP_ITEM}
              idx={4}
              isPlaying={isPlaying}
              onClick={handleButtonClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
