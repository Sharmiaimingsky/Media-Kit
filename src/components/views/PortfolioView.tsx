import React, { useState } from 'react';
import {
  Grid,
  Plus,
  ExternalLink,
  Instagram,
  Eye,
  TrendingUp,
  Heart,
  Star,
  Edit2,
  Trash2,
  Bookmark,
  Share2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PortfolioItem, ContentCategory } from '../../types';
import { EditorialCardIllustration } from '../EditorialVisuals';

export const PortfolioView: React.FC = () => {
  const { portfolio, addPortfolioItem, updatePortfolioItem, deletePortfolioItem } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [lightboxItem, setLightboxItem] = useState<PortfolioItem | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ContentCategory>('Beauty & Makeup');
  const [brand, setBrand] = useState('');
  const [views, setViews] = useState('311000');
  const [reach, setReach] = useState('395000');
  const [engagement, setEngagement] = useState('4.8%');
  const [reelUrl, setReelUrl] = useState('https://www.instagram.com/couturefloss/');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [isFeatured, setIsFeatured] = useState(true);
  const [caseStudySummary, setCaseStudySummary] = useState('');

  const categories: (ContentCategory | 'all')[] = [
    'all',
    'Beauty & Makeup',
    'Skincare & Haircare',
    'Fashion & Styling',
    'Luxury Lifestyle',
    'Travel & Hotels',
    'Daily Vlogs & Opinions',
  ];

  const filtered = portfolio.filter(
    item => activeCategory === 'all' || item.category === activeCategory
  );

  const openCreateModal = () => {
    setEditingItem(null);
    setTitle('');
    setCategory('Beauty & Makeup');
    setBrand('');
    setViews('311000');
    setReach('395000');
    setEngagement('4.8%');
    setReelUrl('https://www.instagram.com/couturefloss/');
    setThumbnailUrl('');
    setIsFeatured(true);
    setCaseStudySummary('');
    setShowAddModal(true);
  };

  const openEditModal = (item: PortfolioItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setCategory(item.category);
    setBrand(item.brand);
    setViews(item.views.toString());
    setReach(item.reach.toString());
    setEngagement(item.engagement);
    setReelUrl(item.reelUrl);
    setThumbnailUrl(item.thumbnailUrl);
    setIsFeatured(item.isFeatured);
    setCaseStudySummary(item.caseStudySummary);
    setShowAddModal(true);
  };

  const handleSavePortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingItem) {
      updatePortfolioItem(editingItem.id, {
        title,
        category,
        brand: brand.trim() || 'COUTUREFLOSS Editorial',
        views: parseInt(views) || 0,
        reach: parseInt(reach) || 0,
        engagement,
        reelUrl,
        thumbnailUrl,
        isFeatured,
        caseStudySummary,
      });
    } else {
      addPortfolioItem({
        title,
        category,
        brand: brand.trim() || 'COUTUREFLOSS Editorial',
        views: parseInt(views) || 0,
        reach: parseInt(reach) || 0,
        engagement,
        reelUrl,
        thumbnailUrl,
        isFeatured,
        caseStudySummary,
        publishedDate: new Date().toISOString().split('T')[0],
      });
    }

    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-[#E9DDE8] p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display font-bold text-2xl text-[#400849]">
              Editorial Portfolio & Content Showcase
            </h1>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#E7B0DE]/40 text-[#400849] uppercase tracking-wider">
              {portfolio.length} High-Impact Pieces
            </span>
          </div>
          <p className="text-xs text-[#806785] mt-0.5">
            Asymmetrical magazine-style lookbook showcasing campaign results, saves, and Reel reach.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#FF5A0A] hover:bg-[#e04e05] text-white text-xs font-semibold transition-all shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add Reel / Content</span>
        </button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 text-xs">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full capitalize whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'bg-[#400849] text-white font-semibold shadow-xs'
                : 'bg-white border border-[#E9DDE8] text-[#806785] hover:text-[#400849]'
            }`}
          >
            {cat === 'all' ? 'All Content' : cat}
          </button>
        ))}
      </div>

      {/* Asymmetric Magazine-Style Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item, index) => {
          const isLarge = index % 5 === 0;

          return (
            <div
              key={item.id}
              className={`group bg-white rounded-2xl border border-[#E9DDE8] overflow-hidden shadow-xs hover:shadow-md hover:border-[#E7B0DE] transition-all flex flex-col justify-between ${
                isLarge ? 'md:col-span-2' : ''
              }`}
            >
              {/* Media Container / Editorial Card */}
              <div
                onClick={() => setLightboxItem(item)}
                className="relative cursor-pointer overflow-hidden"
              >
                {item.thumbnailUrl && item.thumbnailUrl.trim() !== '' ? (
                  <img
                    src={item.thumbnailUrl}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <EditorialCardIllustration
                    category={item.category}
                    className={`w-full ${isLarge ? 'h-64' : 'h-52'}`}
                  />
                )}

                {/* Badges on top */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-[#400849] shadow-xs">
                    {item.brand}
                  </span>
                  {item.isFeatured && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FF5A0A] text-white flex items-center gap-1 shadow-xs">
                      <Star className="w-2.5 h-2.5 fill-white" />
                      Featured
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-[#400849]/90 text-white backdrop-blur-sm flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    <span>View Case Study</span>
                  </span>
                </div>
              </div>

              {/* Text Info */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#806785] mb-1">
                    <span>{item.category}</span>
                    <span>{item.publishedDate}</span>
                  </div>

                  <h3
                    onClick={() => setLightboxItem(item)}
                    className="font-serif italic text-base sm:text-lg font-medium text-[#400849] leading-snug cursor-pointer hover:text-[#FF5A0A] transition-colors"
                  >
                    {item.title}
                  </h3>

                  {item.caseStudySummary && (
                    <p className="text-xs text-[#806785] line-clamp-2 mt-2 leading-relaxed">
                      {item.caseStudySummary}
                    </p>
                  )}
                </div>

                {/* Metrics ribbon */}
                <div className="pt-3 border-t border-[#E9DDE8] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-4">
                    <div>
                      <span className="text-[10px] text-[#806785] uppercase block">Views</span>
                      <span className="font-display font-bold text-sm text-[#FF5A0A] tabular-nums">
                        {item.views.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#806785] uppercase block">Reach</span>
                      <span className="font-display font-bold text-sm text-[#400849] tabular-nums">
                        {item.reach.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#806785] uppercase block">Engage</span>
                      <span className="font-display font-bold text-sm text-[#400849]">
                        {item.engagement}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    <a
                      href={item.reelUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg hover:bg-[#F5E8F5] text-[#806785] hover:text-[#400849]"
                      title="Open Instagram Reel"
                    >
                      <Instagram className="w-4 h-4 text-[#FF5A0A]" />
                    </a>
                    <button
                      onClick={() => openEditModal(item)}
                      className="p-1.5 rounded-lg hover:bg-[#F5E8F5] text-[#806785] hover:text-[#400849]"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deletePortfolioItem(item.id)}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-[#806785] hover:text-[#FF5A0A]"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* LIGHTBOX / FULL CASE STUDY MODAL */}
      {lightboxItem && (
        <div className="fixed inset-0 z-50 bg-[#400849]/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-[#E9DDE8] space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#E9DDE8]">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#E7B0DE]/40 text-[#400849]">
                  {lightboxItem.brand}
                </span>
                <span className="text-xs text-[#806785]">{lightboxItem.category}</span>
              </div>
              <button
                onClick={() => setLightboxItem(null)}
                className="text-sm text-[#806785] hover:text-[#400849]"
              >
                ✕
              </button>
            </div>

            <EditorialCardIllustration
              category={lightboxItem.category}
              className="w-full h-64 rounded-2xl"
            />

            <div>
              <h2 className="font-serif italic text-2xl text-[#400849] font-medium leading-snug">
                {lightboxItem.title}
              </h2>
              <p className="text-xs text-[#806785] mt-1">Published on {lightboxItem.publishedDate}</p>
            </div>

            <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-[#FFF9F5] border border-[#E9DDE8] text-center">
              <div>
                <span className="text-[10px] text-[#806785] uppercase block">Total Views</span>
                <span className="font-display font-bold text-xl text-[#FF5A0A] tabular-nums">
                  {lightboxItem.views.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#806785] uppercase block">Audience Reach</span>
                <span className="font-display font-bold text-xl text-[#400849] tabular-nums">
                  {lightboxItem.reach.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#806785] uppercase block">
                  Engagement Rate
                </span>
                <span className="font-display font-bold text-xl text-[#400849]">
                  {lightboxItem.engagement}
                </span>
              </div>
            </div>

            <div>
              <h4 className="font-display font-semibold text-xs text-[#400849] uppercase tracking-wider mb-2">
                Campaign Case Study & Takeaways
              </h4>
              <p className="text-xs text-[#400849]/90 leading-relaxed bg-[#F5E8F5]/50 p-4 rounded-xl border border-[#E9DDE8]">
                {lightboxItem.caseStudySummary || 'High viral conversion driven by high-energy fashion sound design, macro makeup textures, and authentic storytelling.'}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#E9DDE8]">
              <a
                href={lightboxItem.reelUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FF5A0A] text-white text-xs font-semibold hover:bg-[#e04e05] transition-all shadow-xs"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>Open Live Reel on Instagram</span>
                <ExternalLink className="w-3 h-3 ml-0.5" />
              </a>

              <button
                onClick={() => setLightboxItem(null)}
                className="px-4 py-2 rounded-xl border border-[#E9DDE8] text-xs font-semibold text-[#806785] hover:text-[#400849]"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD / EDIT ITEM MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-[#400849]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-[#E9DDE8]">
            <div className="flex items-center justify-between pb-3 border-b border-[#E9DDE8]">
              <h3 className="font-display font-semibold text-base text-[#400849]">
                {editingItem ? 'Edit Portfolio Highlight' : 'Add New Content Highlight'}
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-sm text-[#806785] hover:text-[#400849]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSavePortfolio} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="font-semibold text-[#400849] block mb-1">Content Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Sabyasachi Festive Styling Masterclass"
                  className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-[#400849] block mb-1">Category</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as ContentCategory)}
                    className="w-full p-2 border border-[#E9DDE8] rounded-lg bg-white text-xs"
                  >
                    {categories
                      .filter(c => c !== 'all')
                      .map(cat => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-[#400849] block mb-1">Partner Brand</label>
                  <input
                    type="text"
                    value={brand}
                    onChange={e => setBrand(e.target.value)}
                    placeholder="e.g. Kama Ayurveda / Self-Produced"
                    className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-[#400849] block mb-1">Views</label>
                  <input
                    type="number"
                    value={views}
                    onChange={e => setViews(e.target.value)}
                    className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#400849] block mb-1">Reach</label>
                  <input
                    type="number"
                    value={reach}
                    onChange={e => setReach(e.target.value)}
                    className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#400849] block mb-1">Engagement</label>
                  <input
                    type="text"
                    value={engagement}
                    onChange={e => setEngagement(e.target.value)}
                    placeholder="e.g. 5.2%"
                    className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-[#400849] block mb-1">
                  Instagram Reel / Post URL
                </label>
                <input
                  type="url"
                  value={reelUrl}
                  onChange={e => setReelUrl(e.target.value)}
                  placeholder="https://www.instagram.com/reel/..."
                  className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="font-semibold text-[#400849] block mb-1">
                  Custom Thumbnail URL (optional)
                </label>
                <input
                  type="url"
                  value={thumbnailUrl}
                  onChange={e => setThumbnailUrl(e.target.value)}
                  placeholder="Leave empty to use high-fashion editorial styling artwork"
                  className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="font-semibold text-[#400849] block mb-1">
                  Campaign Case Study & Conversion Results
                </label>
                <textarea
                  rows={2}
                  value={caseStudySummary}
                  onChange={e => setCaseStudySummary(e.target.value)}
                  placeholder="Highlight saves, link clicks, and audience reactions..."
                  className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featCheck"
                  checked={isFeatured}
                  onChange={e => setIsFeatured(e.target.checked)}
                  className="w-4 h-4 rounded text-[#400849] focus:ring-[#E7B0DE]"
                />
                <label htmlFor="featCheck" className="text-xs text-[#400849] font-medium">
                  Feature this piece in primary media kit cover highlights
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E9DDE8]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3.5 py-1.5 rounded-lg border border-[#E9DDE8] text-[#806785]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-[#400849] text-white font-semibold"
                >
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
