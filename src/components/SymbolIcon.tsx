import React from 'react';

interface SymbolIconProps {
  symbol: string;
  size?: number;
  cl?: string;
}

const SYMBOL_PATHS: Record<string, string[]> = {
  "🍚": ["M4 11h16a8 8 0 0 1-16 0z", "M12 2v3", "M8 3v2", "M16 3v2", "M4 11c0-4 3-7 8-7s8 3 8 7"],
  "🍛": ["M3 15h18", "M5 15a7 7 0 0 0 14 0", "M6 15c0-3 2-5 6-5s6 2 6 5", "M17 9l4 4"],
  "🥣": ["M3 9h18c0 4.5-3.5 8-8 8s-8-3.5-8-8z", "M9 17v2a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-2", "M7 9c0-3 2-5 5-5s5 2 5 5"],
  "🥩": ["M5 17c0-4.5 3-8 8-8s8 2 8 6.5s-3 6.5-8 6.5s-8-2.5-8-5z", "M10 14a2 2 0 1 0 4 0a2 2 0 0 0-4 0", "M12 9v3", "M12 16v2"],
  "🥥": ["M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0-18", "M6 12a6 6 0 0 0 12 0", "M10 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2", "M14 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2"],
  "🐟": ["M2 12c4-8 15-8 18 0c-3 8-14 8-18 0z", "M18 12l4 4v-8z", "M10 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2", "M6 12c1-2 3-2 4 0"],
  "🫕": ["M2 15h20", "M4 15a8 8 0 0 0 16 0", "M12 7V4", "M11 4h2", "M7 15l-1-4h12l-1 4"],
  "🍽️": ["M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0-18", "M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5s5-2.24 5-5s-2.24-5-5-5", "M8 9v3a1 1 0 0 0 2 0v-3", "M9 12v3", "M16 9v6", "M15 9h2"],
  "🌙": ["M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a7 7 0 1 1-7.54-7.54c.44-.06.9-.1 1.36-.1z", "M18 4l1 2l2 .5l-2 1.5l.5 2.5l-2.5-2l-2.5 2l.5-2.5l-2-1.5l2-.5z"],
  "🫓": ["M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0-18", "M8 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2", "M15 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3", "M10 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2", "M14 16a1 1 0 1 0 0-2 1 1 0 0 0 0 2"],
  "🥟": ["M12 4l9 14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z", "M12 4v16", "M6 14c3-1 9-1 12 0"],
  "🥤": ["M6 6h12l-2 13a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2z", "M9 6v3h2l2 2", "M6 9h12"],
  "🍹": ["M7 4h7l2 14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z", "M14 4h4v6h-4", "M6 8h10", "M11 4v-2h2", "M16 12l3-3"],
  "🧃": ["M8 4h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2 2V6a2 2 0 0 1 2-2z", "M6 8h12", "M12 4v3h2", "M10 12h4"],
  "📱": ["M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z", "M12 18h.01"],
  "💳": ["M3 6h18a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z", "M1 10h22", "M4 14h3"],
  "🚗": ["M3 11l3-4h12l3 4v5h-2v2a2 2 0 1 1-4 0v-2H9v2a2 2 0 1 1-4 0v-2H3v-5z", "M6 11h12V8H6z"],
  "👥": ["M9 7a4 4 0 1 0-8 0a4 4 0 0 0 8 0z", "M3 15v2a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2", "M18 7a3 3 0 1 0-6 0a3 3 0 0 0 6 0z", "M12 14v1a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-1"],
  "📸": ["M3 8h4l2-3h6l2 3h4a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2z", "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"],
  "🌟": ["M12 2l3 6.5l7 .5l-5 4.5l1.5 7L12 17l-6.5 3.5l1.5-7l-5-4.5l7-.5z"],
  "📅": ["M4 7h16v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2 2V7z", "M8 3v4", "M16 3v4", "M4 10h16"],
  "👨‍🍳": ["M6 19h12v1a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-1z", "M6 19c-3-3 0-8 6-8s9 5 6 8"],
  "🔥": ["M8 18c0-3.5 2-6.5 4-9c1.5 2 4 4.5 4 7c0 2.2-1.8 4-4 4s-4-1.8-4-4z", "M10 16c0-1.5 1-2.5 2-3.5c1 1 2 2 2 3.5c0 1.1-.9 2-2 2s-2-.9-2-2z"],
  "👑": ["M4 18l2-11l4 5l2-8l2 8l4-5l2 11H4z", "M12 21a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"],
  "📩": ["M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z", "M3 7l9 6l9-6", "M12 13v6M9 16l3 3l3-3"],
  "🎉": ["M3 19h18", "M5 19a7 7 0 0 1 14 0", "M12 12a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3", "M4 11l1-2l1 2h-2", "M19 11l1-2l1 2h-2"],
  "🛵": ["M6 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4", "M18 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4", "M8 18h8", "M18 16V9l-4-3H9v6", "M12 12V9h-3", "M10 6h4", "M3 10h4v4H3z"],
  "🔍": ["M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0", "M21 21l-6-6"],
  "🏢": ["M3 21h18", "M5 21V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v18", "M9 6h2v2H9zm4 0h2v2h-2zm-4 4h2v2H9zm4 0h2v2h-2zm-4 4h2v2H9zm4 0h2v2h-2z"],
  "🕌": ["M12 3a9 9 0 0 0-9 9h18a9 9 0 0 0-9-9z", "M12 3V1", "M6 12v6h12v-6"],
  "👨‍👩‍👧‍👦": ["M6 7a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 8c-3.3 0-6 2.2-6 5v1h12v-1c0-2.8-2.7-5-6-5zm12-3a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm0 6c-2.2 0-4 1.8-4 4v1h8v-1c0-2.2-1.8-4-4-4z"]
};

export const SymbolIcon: React.FC<SymbolIconProps> = ({ symbol, size = 24, cl = '' }) => {
  const paths = SYMBOL_PATHS[symbol] || ["M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"];
  return (
    <svg
      className={cl}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      {paths.map((p, idx) => (
        <path key={idx} d={p} />
      ))}
    </svg>
  );
};

export const StarRating: React.FC<{ n?: number }> = ({ n = 5 }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: n }).map((_, i) => (
      <svg
        key={i}
        width={13}
        height={13}
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        fill="currentColor"
        className="text-ochre2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" />
      </svg>
    ))}
  </div>
);

export const ZigzagDivider: React.FC<{ flip?: boolean; className?: string }> = ({ flip = false, className = '' }) => (
  <div
    className={`w-full h-3 bg-repeat-x opacity-90 ${className}`}
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='12' viewBox='0 0 24 12'%3E%3Cpath d='M0 ${
        flip ? 0 : 12
      } L12 ${flip ? 12 : 0} L24 ${flip ? 0 : 12} Z' fill='%23C1272D'/%3E%3Ccircle cx='12' cy='${
        flip ? 4 : 8
      }' r='1.8' fill='%23FFFFFF'/%3E%3C/svg%3E")`,
      backgroundSize: '24px 12px',
    }}
  />
);

export const DecorativeOrnament: React.FC = () => (
  <div className="flex justify-center items-center gap-3 my-12 text-[#C1272D]/20 select-none">
    <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#C1272D]" />
    <span className="text-base font-serif italic text-[#C1272D]/40">❦ Good Choice ❦</span>
    <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#C1272D]" />
  </div>
);
