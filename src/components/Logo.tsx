import React, { useState } from 'react';

interface LogoProps {
  className?: string;
  imgClassName?: string;
  variant?: 'header' | 'footer' | 'hero';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  imgClassName = '',
  variant = 'header',
}) => {
  const [imgError, setImgError] = useState(false);

  // Height sizing based on variant
  const sizeClasses = {
    header: 'h-11 sm:h-12 max-h-[48px]',
    footer: 'h-12 sm:h-14 max-h-[52px]',
    hero: 'h-16 sm:h-20 md:h-24 max-h-[96px]',
  }[variant];

  if (imgError) {
    return (
      <div className={`flex flex-col select-none ${className}`}>
        <span className="font-serif font-extrabold text-amber-50 tracking-wide leading-none text-xl sm:text-2xl">
          SANARA <span className="text-orange-500 font-sans text-sm sm:text-base uppercase font-bold tracking-wider">GRILL</span>
        </span>
        <span className="text-[10px] text-amber-200/70 tracking-widest font-medium uppercase mt-0.5">
          Mbezi • Dar es Salaam
        </span>
      </div>
    );
  }

  return (
    <div className={`flex items-center shrink-0 ${className}`}>
      <img
        src="/images/sanara-logo.png"
        alt="Sanara Grill Logo"
        onError={() => setImgError(true)}
        className={`w-auto object-contain ${sizeClasses} ${imgClassName}`}
      />
    </div>
  );
};
