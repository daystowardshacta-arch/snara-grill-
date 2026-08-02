import React, { useState } from 'react';
import { GALLERY_POSTS, SANARA_INFO } from '../data/menuData';
import { GalleryPost } from '../types';
import { Instagram, Heart, Sparkles, X, Flame, Camera } from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [posts, setPosts] = useState<GalleryPost[]>(GALLERY_POSTS);
  const [selectedImage, setSelectedImage] = useState<GalleryPost | null>(null);

  const tabs = [
    { id: 'all', label: 'All Photos' },
    { id: 'seafood_grill', label: 'Seafood & Flame BBQ' },
    { id: 'ambiance', label: 'Rooftop & Ambiance' },
    { id: 'cocktails', label: 'Cocktails & Drinks' },
  ];

  const handleLike = (id?: string) => {
    if (!id) return;
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p))
    );
  };

  const filteredPosts = posts.filter((post) =>
    activeTab === 'all' ? true : post.category === activeTab
  );

  return (
    <div className="min-h-screen bg-[#141414] text-stone-200 pt-24 pb-24 px-4 md:px-12">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-stone-900 via-orange-950/40 to-stone-900 border border-stone-800 p-8 md:p-12 rounded-3xl text-center relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-950/80 border border-orange-700/50 text-orange-400 text-xs font-bold uppercase tracking-widest mb-3">
            <Camera size={14} /> Photo & Ambiance Gallery
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-amber-50">
            Life at Sanara Grill
          </h1>
          <p className="mt-2 text-stone-300 font-sans text-sm md:text-base max-w-xl mx-auto">
            Explore our mouthwatering dishes, vibrant rooftop sunset views, and warm atmosphere in Mbezi.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 text-xs text-amber-200 bg-stone-900 px-4 py-2 rounded-xl border border-stone-800">
            <Instagram size={16} className="text-orange-400" />
            <span>Follow us on Instagram: </span>
            <a
              href={SANARA_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold underline text-orange-400"
            >
              {SANARA_INFO.instagram}
            </a>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-orange-600 text-white shadow-md'
                  : 'bg-stone-900 text-stone-300 border border-stone-800 hover:border-stone-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden hover:border-orange-500/40 transition-all group flex flex-col justify-between"
            >
              <div
                className="relative h-64 overflow-hidden cursor-pointer"
                onClick={() => setSelectedImage(post)}
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
              </div>

              <div className="p-5">
                <p className="text-xs text-stone-300 leading-relaxed font-sans">{post.caption}</p>

                <div className="mt-4 pt-3 border-t border-stone-800 flex items-center justify-between">
                  <button
                    onClick={() => handleLike(post.id)}
                    className="flex items-center gap-1.5 text-xs font-bold text-stone-400 hover:text-orange-400 transition-colors"
                  >
                    <Heart size={16} className="fill-orange-500/20 text-orange-500" />
                    <span>{post.likes} Likes</span>
                  </button>

                  <button
                    onClick={() => setSelectedImage(post)}
                    className="text-xs text-orange-400 font-semibold hover:underline"
                  >
                    Expand Photo
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-stone-950/80 text-stone-300 hover:text-white flex items-center justify-center border border-stone-800"
            >
              <X size={20} />
            </button>

            <img
              src={selectedImage.mediaUrl}
              alt={selectedImage.caption}
              className="w-full h-[400px] md:h-[500px] object-cover"
            />

            <div className="p-6">
              <p className="text-sm text-stone-200">{selectedImage.caption}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-stone-400">
                <span>Sanara Grill Mbezi • {selectedImage.emoji}</span>
                <button
                  onClick={() => handleLike(selectedImage.id)}
                  className="flex items-center gap-1.5 font-bold text-orange-400"
                >
                  <Heart size={16} className="fill-orange-500 text-orange-500" />
                  <span>{selectedImage.likes} Likes</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
