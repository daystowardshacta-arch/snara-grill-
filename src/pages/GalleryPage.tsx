import React, { useState, useEffect, useRef } from 'react';
import { GALLERY_POSTS, VIMEO_REELS, SANARA_INFO } from '../data/menuData';
import { GalleryPost, VimeoReel } from '../types';
import {
  Instagram,
  Heart,
  Sparkles,
  X,
  Camera,
  Film,
  Flame,
  ArrowUpRight,
  Volume2,
  VolumeX,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Smartphone,
  Play
} from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const [activePhotoTab, setActivePhotoTab] = useState<string>('all');
  const [photos, setPhotos] = useState<GalleryPost[]>(GALLERY_POSTS);
  const [vimeoReels, setVimeoReels] = useState<VimeoReel[]>(VIMEO_REELS);

  // Gallery View Mode: Default to 'grid'
  const [viewMode, setViewMode] = useState<'grid' | 'reel'>('grid');
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const feedRef = useRef<HTMLDivElement>(null);

  // Photo Lightbox state (index based for Prev / Next navigation)
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  useEffect(() => {
    const scriptId = 'vimeo-player-api';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://player.vimeo.com/api/player.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Keyboard navigation for Video Reel Feed (Up/Down)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhotoIndex !== null) return; // Lightbox active
      if (viewMode !== 'reel') return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (activeIndex < vimeoReels.length - 1) {
          scrollToReel(activeIndex + 1);
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (activeIndex > 0) {
          scrollToReel(activeIndex - 1);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, viewMode, vimeoReels.length, selectedPhotoIndex]);

  // Keyboard navigation for Lightbox (Left/Right/Esc)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === 'ArrowLeft') {
        setSelectedPhotoIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : photos.length - 1));
      } else if (e.key === 'ArrowRight') {
        setSelectedPhotoIndex((prev) => (prev !== null && prev < photos.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'Escape') {
        setSelectedPhotoIndex(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex, photos.length]);

  const scrollToReel = (index: number) => {
    if (feedRef.current) {
      const container = feedRef.current;
      const targetScroll = index * container.clientHeight;
      container.scrollTo({ top: targetScroll, behavior: 'smooth' });
      setActiveIndex(index);
    }
  };

  const handleFeedScroll = () => {
    if (feedRef.current) {
      const container = feedRef.current;
      const index = Math.round(container.scrollTop / container.clientHeight);
      if (index >= 0 && index < vimeoReels.length && index !== activeIndex) {
        setActiveIndex(index);
      }
    }
  };

  const switchToReelView = (reelIndex: number) => {
    setViewMode('reel');
    setActiveIndex(reelIndex);
    setTimeout(() => {
      scrollToReel(reelIndex);
    }, 100);
  };

  const photoTabs = [
    { id: 'all', label: 'All Photos & Reels' },
    { id: 'seafood_grill', label: 'Seafood & Flame BBQ' },
    { id: 'biryani', label: 'Biryani & Mains' },
    { id: 'ambiance', label: 'Rooftop & Ambiance' },
    { id: 'cocktails', label: 'Cocktails & Drinks' },
  ];

  const handlePhotoLike = (id?: string) => {
    if (!id) return;
    setPhotos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p))
    );
  };

  const handleVimeoLike = (id: string) => {
    setVimeoReels((prev) =>
      prev.map((v) => (v.id === id ? { ...v, likes: (v.likes || 0) + 1 } : v))
    );
  };

  const getVimeoEmbedUrl = (src: string, muted: boolean) => {
    const hasParams = src.includes('?');
    return `${src}${hasParams ? '&' : '?'}muted=${muted ? 1 : 0}&autopause=0`;
  };

  // Filter photos according to selected photo tab
  const filteredPhotos = photos.filter((post) =>
    activePhotoTab === 'all' ? true : post.category === activePhotoTab
  );

  // Combine photos & video reels into a mixed grid list when in Grid View
  // We interleave video reels into the photos grid so both photos and videos are mixed seamlessly
  const getMixedGridItems = () => {
    const items: Array<
      | { type: 'photo'; photo: GalleryPost; photoIndex: number }
      | { type: 'video'; reel: VimeoReel; reelIndex: number }
    > = [];

    const photoList = filteredPhotos.map((p, idx) => ({
      type: 'photo' as const,
      photo: p,
      photoIndex: photos.findIndex((item) => item.id === p.id),
    }));

    const videoList = vimeoReels.map((r, idx) => ({
      type: 'video' as const,
      reel: r,
      reelIndex: idx,
    }));

    if (activePhotoTab !== 'all') {
      // If a specific category tab is selected, show category photos first then video reels
      return [...photoList, ...videoList];
    }

    // Interleave photos & video reels evenly: 2 photos, 1 video reel...
    let pIdx = 0;
    let vIdx = 0;
    while (pIdx < photoList.length || vIdx < videoList.length) {
      if (pIdx < photoList.length) items.push(photoList[pIdx++]);
      if (pIdx < photoList.length) items.push(photoList[pIdx++]);
      if (vIdx < videoList.length) items.push(videoList[vIdx++]);
    }
    return items;
  };

  const mixedItems = getMixedGridItems();

  return (
    <div className="min-h-screen bg-[#141414] text-stone-200 pt-24 pb-24 px-4 md:px-12">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-stone-900 via-orange-950/40 to-stone-900 border border-stone-800 p-8 md:p-12 rounded-3xl text-center relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-950/80 border border-orange-700/50 text-orange-400 text-xs font-bold uppercase tracking-widest mb-3">
            <Sparkles size={14} /> Official Visual Gallery
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-amber-50">
            Life at Sanara Grill
          </h1>
          <p className="mt-2 text-stone-300 font-sans text-sm md:text-base max-w-xl mx-auto">
            Experience our flame-grilled seafood, Friday Biryani specials, and vibrant rooftop atmosphere in Mbezi.
          </p>

          <div className="mt-6 flex flex-wrap justify-center items-center gap-4">
            <a
              href={SANARA_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-900/40 to-pink-900/40 border border-pink-700/40 text-pink-300 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
            >
              <Instagram size={15} /> {SANARA_INFO.instagram} <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        {/* TOP GALLERY VIEW TOGGLE BAR */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-stone-800 pb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-amber-50 flex items-center gap-2">
              {viewMode === 'grid' ? <LayoutGrid size={26} className="text-orange-500" /> : <Smartphone size={26} className="text-orange-500" />}
              <span>{viewMode === 'grid' ? 'Gallery Grid View' : 'Vertical Video Reel Feed'}</span>
            </h2>
            <p className="text-xs text-stone-400 mt-1">
              {viewMode === 'grid'
                ? 'Browse photos and video reels together. Click any photo for Lightbox, or click a video to watch in Reel view.'
                : 'Swipe or scroll through our 8 vertical 9:16 highlight reels.'}
            </p>
          </div>

          {/* Pill-shaped View Toggle Control */}
          <div className="inline-flex items-center p-1.5 rounded-full bg-stone-900 border border-stone-800 shadow-inner shrink-0">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-orange-600 text-white shadow-md'
                  : 'border border-stone-800 text-stone-300 hover:text-white hover:border-stone-700 bg-transparent'
              }`}
            >
              <LayoutGrid size={15} /> Grid View
            </button>
            <button
              onClick={() => setViewMode('reel')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                viewMode === 'reel'
                  ? 'bg-orange-600 text-white shadow-md'
                  : 'border border-stone-800 text-stone-300 hover:text-white hover:border-stone-700 bg-transparent'
              }`}
            >
              <Smartphone size={15} /> Reel View
            </button>
          </div>
        </div>

        {/* VIEW 1: GRID VIEW (Default - Responsive 4 Columns with Mixed Photos & Video Thumbnails) */}
        {viewMode === 'grid' && (
          <div className="space-y-6">
            {/* Category Filter Tabs */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
                {photoTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActivePhotoTab(tab.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                      activePhotoTab === tab.id
                        ? 'bg-orange-600 text-white shadow-md'
                        : 'bg-stone-900 text-stone-300 border border-stone-800 hover:border-stone-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="text-xs text-stone-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                <span>Showing {mixedItems.length} media items ({filteredPhotos.length} photos, {vimeoReels.length} reels)</span>
              </div>
            </div>

            {/* Responsive 4-Column Grid Mixing Photos and Video Thumbnails */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {mixedItems.map((item, index) => {
                if (item.type === 'photo') {
                  const post = item.photo;
                  return (
                    <div
                      key={`photo-${post.id}-${index}`}
                      className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden hover:border-orange-500/50 transition-all group flex flex-col justify-between shadow-lg"
                    >
                      {/* Photo Thumbnail */}
                      <div
                        className="relative h-60 overflow-hidden cursor-pointer bg-stone-950"
                        onClick={() => setSelectedPhotoIndex(item.photoIndex)}
                      >
                        <img
                          src={post.mediaUrl}
                          alt={post.caption}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-3 left-3 bg-stone-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-bold text-amber-100 flex items-center gap-1 border border-stone-800">
                          <span>{post.emoji}</span>
                          <span className="capitalize">{post.category.replace('_', ' ')}</span>
                        </div>
                        <div className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="px-3.5 py-2 rounded-xl bg-stone-900/90 text-amber-100 text-xs font-bold border border-stone-700 flex items-center gap-1.5 shadow-xl">
                            <Camera size={14} /> Expand Photo
                          </span>
                        </div>
                      </div>

                      {/* Photo Caption & Likes */}
                      <div className="p-4 space-y-3">
                        <p className="text-xs text-stone-300 leading-relaxed font-sans line-clamp-2">
                          {post.caption}
                        </p>

                        <div className="pt-2 border-t border-stone-800 flex items-center justify-between">
                          <button
                            onClick={() => handlePhotoLike(post.id)}
                            className="flex items-center gap-1.5 text-xs font-bold text-stone-400 hover:text-orange-400 transition-colors"
                          >
                            <Heart size={15} className="fill-orange-500/20 text-orange-500" />
                            <span>{post.likes} Likes</span>
                          </button>

                          <button
                            onClick={() => setSelectedPhotoIndex(item.photoIndex)}
                            className="text-xs text-orange-400 font-semibold hover:underline flex items-center gap-1"
                          >
                            View <ArrowUpRight size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  // Video Reel Card
                  const reel = item.reel;
                  return (
                    <div
                      key={`reel-${reel.id}-${index}`}
                      onClick={() => switchToReelView(item.reelIndex)}
                      className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-xl hover:border-orange-500/80 transition-all flex flex-col justify-between group cursor-pointer"
                    >
                      {/* Video Header Badge */}
                      <div className="p-3 bg-stone-950/90 border-b border-stone-800/80 flex items-center justify-between gap-2">
                        <span className="text-xs font-serif font-bold text-amber-100 truncate flex items-center gap-1.5">
                          <Flame size={14} className="text-orange-500 shrink-0" /> {reel.title}
                        </span>
                        <span className="bg-orange-600 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shrink-0 shadow-sm flex items-center gap-1">
                          <Film size={11} /> {reel.tag}
                        </span>
                      </div>

                      {/* Vertical Video Embed / Thumbnail with Corner Play Badge */}
                      <div className="relative w-full aspect-[9/16] bg-stone-950 overflow-hidden">
                        <iframe
                          src={getVimeoEmbedUrl(reel.vimeoSrc, true)}
                          className="absolute inset-0 w-full h-full border-0 pointer-events-none"
                          frameBorder="0"
                          title={`sanara_grill_preview_${reel.id}`}
                        />
                        {/* Dark Gradient Overlay */}
                        <div className="absolute inset-0 bg-stone-950/30 group-hover:bg-stone-950/10 transition-all" />

                        {/* Corner Play-Icon Badge Overlay to distinguish video from photos */}
                        <div className="absolute top-3 right-3 bg-orange-600/95 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1 uppercase tracking-wider border border-white/20 z-10">
                          <Play size={12} className="fill-white" /> Reel
                        </div>

                        {/* Center Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-14 h-14 rounded-full bg-orange-600/90 text-white flex items-center justify-center shadow-2xl border border-white/30 group-hover:scale-110 group-hover:bg-orange-500 transition-all">
                            <Play size={22} className="fill-white ml-0.5" />
                          </div>
                        </div>

                        {/* Click to Watch Reel Label */}
                        <div className="absolute bottom-3 left-3 right-3 text-center">
                          <span className="inline-block bg-stone-950/85 backdrop-blur-md text-amber-200 text-[11px] font-bold px-3 py-1 rounded-full border border-stone-800 shadow">
                            Tap to play in Reel view &rarr;
                          </span>
                        </div>
                      </div>

                      {/* Reel Caption & Like */}
                      <div className="p-3.5 bg-stone-900 text-stone-300 space-y-2">
                        <p className="text-xs text-stone-300 font-sans leading-relaxed line-clamp-2">
                          {reel.caption}
                        </p>

                        <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between text-[11px] text-stone-400">
                          <span className="flex items-center gap-1 font-semibold text-orange-400">
                            <Play size={12} className="fill-orange-400" /> Reel #{item.reelIndex + 1}
                          </span>
                          <span className="flex items-center gap-1 font-bold text-stone-300">
                            <Heart size={13} className="fill-rose-500/20 text-rose-500" /> {reel.likes}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        )}

        {/* VIEW 2: REEL VIEW (Full-width 9:16 Vertical Video Feed with Swipe & Navigation) */}
        {viewMode === 'reel' && (
          <div className="space-y-6 py-2">
            {/* Top Toolbar in Reel View */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-stone-900/90 border border-stone-800 p-4 rounded-2xl shadow-lg">
              <button
                onClick={() => setViewMode('grid')}
                className="px-4 py-2 rounded-full bg-stone-950 hover:bg-stone-800 border border-stone-700 text-amber-200 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
              >
                <LayoutGrid size={15} className="text-orange-400" /> &larr; Back to Grid View
              </button>

              <div className="flex items-center gap-3 text-xs text-stone-300 font-semibold">
                <span>Reel {activeIndex + 1} of {vimeoReels.length}</span>
                <span className="text-stone-600">•</span>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all border cursor-pointer ${
                    isMuted
                      ? 'bg-amber-950/60 border-amber-700/50 text-amber-300'
                      : 'bg-orange-600 border-orange-500 text-white'
                  }`}
                >
                  {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                  <span>{isMuted ? 'Muted (Tap to Unmute)' : 'Sound On'}</span>
                </button>
              </div>
            </div>

            {/* Smartphone 9:16 Vertical Feed Container */}
            <div className="relative py-2">
              <div className="max-w-[400px] h-[720px] sm:h-[760px] mx-auto relative rounded-3xl border border-stone-800 bg-stone-950 shadow-2xl shadow-orange-950/30 overflow-hidden">
                {/* Scrollable Container with Snap Y */}
                <div
                  ref={feedRef}
                  onScroll={handleFeedScroll}
                  className="w-full h-full overflow-y-scroll snap-y snap-mandatory scrollbar-none scroll-smooth bg-stone-950"
                >
                  {vimeoReels.map((reel, idx) => (
                    <div
                      key={reel.id}
                      className="w-full h-full snap-start snap-always relative flex flex-col justify-between shrink-0 bg-stone-950 overflow-hidden"
                    >
                      {/* Vertical 9:16 Vimeo Video Embed */}
                      <iframe
                        src={getVimeoEmbedUrl(reel.vimeoSrc, isMuted)}
                        className="absolute inset-0 w-full h-full border-0 object-cover"
                        frameBorder="0"
                        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        title={reel.title}
                      />

                      {/* Top Header Overlay inside Reel */}
                      <div className="relative z-10 p-4 bg-gradient-to-b from-stone-950/90 via-stone-950/40 to-transparent flex items-center justify-between pointer-events-auto">
                        <div className="flex items-center gap-2 bg-stone-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-stone-800">
                          <Instagram size={14} className="text-pink-400" />
                          <span className="text-[11px] font-bold text-amber-100">@sanara_grill_restaurant</span>
                        </div>

                        <button
                          onClick={() => setIsMuted(!isMuted)}
                          className="bg-stone-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-stone-800 text-[11px] font-bold text-amber-200 flex items-center gap-1.5 hover:text-orange-400 transition-colors cursor-pointer"
                        >
                          {isMuted ? <VolumeX size={14} className="text-orange-400" /> : <Volume2 size={14} className="text-amber-400" />}
                          <span>{isMuted ? 'Unmute' : 'Mute'}</span>
                        </button>
                      </div>

                      {/* Right Side Actions Column Overlay */}
                      <div className="relative z-10 p-4 self-end space-y-4 flex flex-col items-center pointer-events-auto">
                        <button
                          onClick={() => handleVimeoLike(reel.id)}
                          className="w-12 h-12 rounded-full bg-stone-950/85 backdrop-blur-md border border-stone-800 text-stone-200 hover:text-rose-400 flex flex-col items-center justify-center shadow-lg transition-transform active:scale-90 cursor-pointer"
                        >
                          <Heart size={20} className="fill-rose-500/30 text-rose-500" />
                          <span className="text-[9px] font-bold text-stone-300 mt-0.5">{reel.likes}</span>
                        </button>

                        <button
                          onClick={() => setIsMuted(!isMuted)}
                          className="w-10 h-10 rounded-full bg-stone-950/85 backdrop-blur-md border border-stone-800 text-orange-400 flex items-center justify-center shadow-lg cursor-pointer"
                          title="Toggle Audio"
                        >
                          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                        </button>

                        {/* Desktop Up / Down Arrows */}
                        <div className="flex flex-col gap-1 pt-2">
                          <button
                            onClick={() => scrollToReel(Math.max(0, activeIndex - 1))}
                            disabled={activeIndex === 0}
                            className={`w-9 h-9 rounded-full bg-stone-950/85 backdrop-blur-md border border-stone-800 flex items-center justify-center text-amber-100 transition-opacity cursor-pointer ${
                              activeIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-orange-600 hover:text-white'
                            }`}
                            title="Previous Reel"
                          >
                            <ChevronUp size={18} />
                          </button>
                          <button
                            onClick={() => scrollToReel(Math.min(vimeoReels.length - 1, activeIndex + 1))}
                            disabled={activeIndex === vimeoReels.length - 1}
                            className={`w-9 h-9 rounded-full bg-stone-950/85 backdrop-blur-md border border-stone-800 flex items-center justify-center text-amber-100 transition-opacity cursor-pointer ${
                              activeIndex === vimeoReels.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-orange-600 hover:text-white'
                            }`}
                            title="Next Reel"
                          >
                            <ChevronDown size={18} />
                          </button>
                        </div>
                      </div>

                      {/* Bottom Caption Overlay inside Reel */}
                      <div className="relative z-10 p-5 bg-gradient-to-t from-stone-950 via-stone-950/85 to-transparent space-y-2 pointer-events-auto">
                        <div className="flex items-center gap-2">
                          <span className="bg-orange-600 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow">
                            <Flame size={12} /> {reel.tag}
                          </span>
                          <span className="text-[11px] font-mono text-amber-200/80">
                            Reel {idx + 1} of {vimeoReels.length}
                          </span>
                        </div>

                        <h3 className="font-serif font-bold text-amber-50 text-base leading-snug">
                          {reel.title}
                        </h3>

                        <p className="text-xs text-stone-300 font-sans leading-relaxed line-clamp-2">
                          {reel.caption}
                        </p>

                        {/* Pagination Dots */}
                        <div className="pt-2 flex items-center gap-1.5 justify-center">
                          {vimeoReels.map((_, dotIdx) => (
                            <button
                              key={dotIdx}
                              onClick={() => scrollToReel(dotIdx)}
                              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                                activeIndex === dotIdx ? 'w-6 bg-orange-500' : 'w-1.5 bg-stone-700 hover:bg-stone-500'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center mt-3 text-xs text-stone-400 flex items-center justify-center gap-2">
                <span>Swipe up/down on mobile or use mouse wheel / arrow keys on desktop</span>
              </div>
            </div>
          </div>
        )}

        {/* Instagram CTA Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-stone-900 via-stone-900 to-purple-950/40 border border-stone-800 text-center space-y-4 mt-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white mx-auto shadow-lg">
            <Instagram size={30} />
          </div>
          <div>
            <h3 className="font-serif font-bold text-amber-50 text-xl md:text-2xl">
              Love Our Kitchen Reels?
            </h3>
            <p className="text-xs md:text-sm text-stone-300 max-w-lg mx-auto mt-1">
              Get daily behind-the-scenes videos of seafood prep, live charcoal grill sessions, and rooftop events.
            </p>
          </div>
          <a
            href={SANARA_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-rose-600 via-purple-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-xl hover:scale-105"
          >
            <Instagram size={18} /> Follow us on Instagram ({SANARA_INFO.instagram}) <ArrowUpRight size={16} />
          </a>
        </div>
      </div>

      {/* PHOTO LIGHTBOX MODAL WITH PREV / NEXT NAVIGATION */}
      {selectedPhotoIndex !== null && photos[selectedPhotoIndex] && (
        <div
          className="fixed inset-0 z-50 bg-stone-950/92 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedPhotoIndex(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPhotoIndex(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-stone-950/80 text-stone-300 hover:text-white flex items-center justify-center border border-stone-800 cursor-pointer shadow-lg"
              title="Close Lightbox (Esc)"
            >
              <X size={20} />
            </button>

            {/* Left Navigation Arrow */}
            <button
              onClick={() =>
                setSelectedPhotoIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : photos.length - 1))
              }
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-stone-950/80 hover:bg-orange-600 text-white flex items-center justify-center border border-stone-800 cursor-pointer shadow-xl transition-all"
              title="Previous Photo (Left Arrow)"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Right Navigation Arrow */}
            <button
              onClick={() =>
                setSelectedPhotoIndex((prev) => (prev !== null && prev < photos.length - 1 ? prev + 1 : 0))
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-stone-950/80 hover:bg-orange-600 text-white flex items-center justify-center border border-stone-800 cursor-pointer shadow-xl transition-all"
              title="Next Photo (Right Arrow)"
            >
              <ChevronRight size={24} />
            </button>

            {/* Image Container */}
            <div className="w-full md:w-2/3 h-[380px] md:h-[540px] bg-stone-950 relative overflow-hidden flex items-center justify-center">
              <img
                src={photos[selectedPhotoIndex].mediaUrl}
                alt={photos[selectedPhotoIndex].caption}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-stone-950/85 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-amber-100 border border-stone-800">
                Photo {selectedPhotoIndex + 1} of {photos.length}
              </div>
            </div>

            {/* Details Panel */}
            <div className="w-full md:w-1/3 p-6 flex flex-col justify-between bg-stone-900 border-t md:border-t-0 md:border-l border-stone-800">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 bg-orange-950/80 border border-orange-700/50 text-orange-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  <span>{photos[selectedPhotoIndex].emoji}</span>
                  <span className="capitalize">{photos[selectedPhotoIndex].category.replace('_', ' ')}</span>
                </div>

                <p className="text-sm text-stone-200 font-sans leading-relaxed">
                  {photos[selectedPhotoIndex].caption}
                </p>
              </div>

              <div className="pt-6 border-t border-stone-800 flex items-center justify-between">
                <span className="text-xs text-stone-400 font-serif">Sanara Grill Mbezi</span>
                <button
                  onClick={() => handlePhotoLike(photos[selectedPhotoIndex].id)}
                  className="flex items-center gap-1.5 font-bold text-orange-400 hover:text-orange-300 transition-colors cursor-pointer"
                >
                  <Heart size={18} className="fill-orange-500 text-orange-500" />
                  <span>{photos[selectedPhotoIndex].likes} Likes</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
