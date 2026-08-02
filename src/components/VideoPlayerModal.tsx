import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';

const videoCache: Record<string, string> = {};

export const SecureVideo: React.FC<React.VideoHTMLAttributes<HTMLVideoElement> & { src: string }> = ({
  src,
  onTimeUpdate,
  className,
  ...props
}) => {
  const [blobUrl, setBlobUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!src) return;
    if (videoCache[src]) {
      setBlobUrl(videoCache[src]);
      setLoading(false);
      return;
    }

    let isMounted = true;
    fetch(src)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load video asset');
        return res.blob();
      })
      .then((blob) => {
        if (isMounted) {
          const url = URL.createObjectURL(blob);
          videoCache[src] = url;
          setBlobUrl(url);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Error playing secure video:', err);
        if (isMounted) {
          setBlobUrl(src);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [src]);

  if (loading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gray-950/30">
        <div className="w-5 h-5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return <video src={blobUrl} className={className} onTimeUpdate={onTimeUpdate} {...props} />;
};

interface VideoPlayerModalProps {
  src: string;
  onClose: () => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({ src, onClose }) => {
  const [isMini, setIsMini] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [controlsVisible, setControlsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [currentSrc, setCurrentSrc] = useState(src);

  const videoRef = useRef<HTMLVideoElement>(null);
  const dragRef = useRef({
    isDragging: false,
    startX: 0,
    startY: 0,
    initialX: 0,
    initialY: 0,
  });
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setCurrentSrc(src);
  }, [src]);

  useEffect(() => {
    return () => {
      if (currentSrc.startsWith('blob:')) {
        URL.revokeObjectURL(currentSrc);
      }
    };
  }, [currentSrc]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (currentSrc.startsWith('blob:')) {
        URL.revokeObjectURL(currentSrc);
      }
      const newUrl = URL.createObjectURL(file);
      setCurrentSrc(newUrl);
      setIsPlaying(true);
      if (videoRef.current) {
        videoRef.current.load();
        videoRef.current.play().catch(() => {});
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (currentSrc.includes('instagram.com')) {
        setIsMini(false);
        return;
      }
      setIsMini(window.scrollY > 250);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentSrc]);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!isMini || (e.target as HTMLElement).closest('.no-drag')) return;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    dragRef.current = {
      isDragging: true,
      startX: e.clientX,
      startY: e.clientY,
      initialX: position.x,
      initialY: position.y,
    };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current.isDragging) return;
    const deltaX = e.clientX - dragRef.current.startX;
    const deltaY = e.clientY - dragRef.current.startY;
    setPosition({
      x: dragRef.current.initialX + deltaX,
      y: dragRef.current.initialY + deltaY,
    });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (dragRef.current.isDragging) {
      dragRef.current.isDragging = false;
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {}
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    if (videoRef.current && videoRef.current.duration) {
      videoRef.current.currentTime = pos * videoRef.current.duration;
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showControlsTemporarily = (vis: boolean) => {
    setControlsVisible(vis);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    if (vis && isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => setControlsVisible(false), 2500);
    }
  };

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const isInstagram = currentSrc.includes('instagram.com');

  const getInstagramEmbedUrl = (url: string) => {
    let cleanUrl = url.split('?')[0];
    if (!cleanUrl.endsWith('/')) cleanUrl += '/';
    return `${cleanUrl}embed/captioned/`;
  };

  const miniStyles: React.CSSProperties = isMini
    ? {
        width: isMobile ? '100%' : '320px',
        height: isMobile ? 'auto' : '180px',
        top: isMobile ? 'auto' : `calc(100vh - 180px - 24px + ${position.y}px)`,
        left: isMobile ? '0' : `calc(100vw - 320px - 24px + ${position.x}px)`,
        bottom: isMobile ? '0' : 'auto',
        borderRadius: isMobile ? '16px 16px 0 0' : '16px',
        backgroundColor: '#0e0e0e',
      }
    : {
        width: '100vw',
        height: '100vh',
        top: '0px',
        left: '0px',
        borderRadius: '0px',
        backgroundColor: 'rgba(10, 9, 8, 0.96)',
      };

  const transitionClass = dragRef.current.isDragging
    ? ''
    : 'transition-all duration-[400ms] ease-[cubic-bezier(0.25,1,0.5,1)]';

  return (
    <div
      className={`fixed z-[9999] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl flex items-center justify-center select-none ${transitionClass}`}
      style={{
        ...miniStyles,
        touchAction: isMini ? 'none' : 'auto',
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onMouseEnter={() => showControlsTemporarily(true)}
      onMouseLeave={() => showControlsTemporarily(false)}
      onMouseMove={() => showControlsTemporarily(true)}
    >
      {!isMini && <div className="absolute inset-0 z-0 cursor-pointer" onClick={onClose} />}

      {isInstagram ? (
        <div
          className={`relative z-10 flex items-center justify-center transition-all duration-[400ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${
            isMini
              ? 'w-full h-full'
              : 'w-[92%] sm:w-[350px] md:w-[380px] h-[78vh] sm:h-[82vh] md:h-[85vh] max-h-[780px] rounded-[16px] overflow-hidden shadow-[0_0_80px_rgba(193,39,45,0.25)] border border-white/10 bg-[#121212]'
          }`}
        >
          <iframe
            src={getInstagramEmbedUrl(currentSrc)}
            className="w-full h-full border-0 rounded-[16px]"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
            title="Instagram Reel Video"
          />
        </div>
      ) : (
        <video
          ref={videoRef}
          src={currentSrc}
          className={`relative z-10 w-full object-cover transition-all duration-[400ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${
            isMini
              ? 'h-full'
              : 'max-w-[900px] w-[90%] max-h-[80vh] rounded-[8px] shadow-[0_0_80px_rgba(220,38,38,0.2)] border border-white/10'
          }`}
          autoPlay
          playsInline
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
          onClick={togglePlay}
        />
      )}

      {/* Control Overlay */}
      <div
        className={`absolute inset-0 z-20 flex flex-col justify-between p-4 pointer-events-none transition-opacity duration-300 no-drag ${
          controlsVisible || !isPlaying || !isMini ? 'opacity-100' : 'opacity-0'
        }`}
        style={
          isMini
            ? {
                background:
                  'linear-gradient(to top, rgba(14,14,14,0.9) 0%, transparent 40%, rgba(14,14,14,0.4) 100%)',
              }
            : {}
        }
      >
        <div className={`flex items-center justify-end gap-3 pointer-events-auto ${isMini ? '' : 'absolute top-6 right-6'}`}>
          {!isMini && !isInstagram && (
            <label className="h-8 flex items-center justify-center rounded-[4px] bg-[#dc2626] text-white hover:bg-[#b91c1c] transition-all cursor-pointer px-4 border border-[#dc2626] hover:border-[#b91c1c] uppercase text-[11px] font-sans font-bold tracking-wider gap-2 shadow-md">
              <svg width="12" height="12" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" fill="none">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
              </svg>
              <span>Play Custom Video</span>
              <input type="file" accept="video/*" onChange={handleFileUpload} className="hidden" />
            </label>
          )}

          {isMini && (
            <button
              onClick={scrollToTop}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-white/20 transition-all hover:scale-110 cursor-pointer"
            >
              <Maximize2 size={14} />
            </button>
          )}

          <button
            onClick={onClose}
            className={`w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-white/20 transition-all hover:scale-110 cursor-pointer ${
              isMini ? '' : 'text-white/60 bg-transparent w-auto px-2 uppercase text-[12px] tracking-widest gap-2'
            }`}
          >
            <X size={16} />
            {!isMini && 'Close'}
          </button>
        </div>

        {!isInstagram && (
          <div className={`flex flex-col gap-3 pointer-events-auto ${isMini ? '' : 'absolute bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-[800px]'}`}>
            <div
              className="w-full h-1.5 bg-white/20 rounded-full cursor-pointer relative overflow-hidden group"
              onClick={handleSeek}
            >
              <div
                className="absolute top-0 left-0 h-full bg-[#dc2626] transition-all duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex items-center justify-between px-1 pb-1">
              <button onClick={togglePlay} className="text-white hover:text-[#dc2626] transition-colors drop-shadow-md cursor-pointer">
                {isPlaying ? <Pause size={22} /> : <Play size={22} />}
              </button>

              {!isMini && (
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#dc2626] rounded-full" />
                  <span className="font-sans text-[11px] text-white/50 uppercase tracking-widest font-bold">
                    Good Choice Restaurant
                  </span>
                </div>
              )}

              <button onClick={toggleMute} className="text-white hover:text-[#dc2626] transition-colors drop-shadow-md cursor-pointer">
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
