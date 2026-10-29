import React, { useState } from 'react';
import {
  Smartphone,
  Monitor,
  Download,
  Copy,
  ExternalLink,
  Check,
  Edit2,
  Eye,
  Sliders,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Instagram,
  Mail,
  MapPin,
  Globe,
  Layers,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CreatorAvatar, EditorialCoverArtwork, EditorialCardIllustration } from '../EditorialVisuals';

export const MediaKitView: React.FC = () => {
  const {
    profile,
    updateProfile,
    rates,
    portfolio,
    mediaKitSections,
    updateMediaKitSections,
    currency,
    previewDevice,
    setPreviewDevice,
    setActiveTab,
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'preview' | 'editor'>('preview');
  const [copiedLink, setCopiedLink] = useState(false);
  const [editingSection, setEditingSection] = useState<string | null>(null);

  // Form states for inline editing
  const [editBio, setEditBio] = useState(profile.bio);
  const [editHeadline, setEditHeadline] = useState(
    'Beauty, style & stories that move culture.'
  );
  const [editEmail, setEditEmail] = useState(profile.businessEmail);
  const [editPositioning, setEditPositioning] = useState(profile.positioning);

  const publicUrl = `${window.location.origin}/?view=public-kit`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleSaveBioAndDetails = () => {
    updateProfile({
      bio: editBio,
      businessEmail: editEmail,
      positioning: editPositioning,
    });
    setEditingSection(null);
  };

  const toggleSection = (id: string) => {
    const updated = mediaKitSections.map(s => (s.id === id ? { ...s, enabled: !s.enabled } : s));
    updateMediaKitSections(updated);
  };

  const isSectionEnabled = (id: string) => {
    const sec = mediaKitSections.find(s => s.id === id);
    return sec ? sec.enabled : true;
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Media Kit Command Bar */}
      <div className="bg-white rounded-2xl border border-[#E9DDE8] p-4 sm:p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display font-bold text-xl sm:text-2xl text-[#400849]">
              Media Kit Studio
            </h1>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#E7B0DE]/40 text-[#400849] uppercase tracking-wider">
              Luxury Edition
            </span>
          </div>
          <p className="text-xs text-[#806785] mt-0.5">
            Crafted for luxury beauty brands, boutique hotels, couture ateliers, and PR agencies.
          </p>
        </div>

        {/* View Mode & Device Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Sub Tab: Preview vs. Editor */}
          <div className="bg-[#F5E8F5] p-1 rounded-lg border border-[#E9DDE8] flex items-center text-xs font-semibold">
            <button
              onClick={() => setActiveSubTab('preview')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                activeSubTab === 'preview'
                  ? 'bg-[#400849] text-white shadow-xs'
                  : 'text-[#400849] hover:text-[#400849]/70'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview</span>
            </button>
            <button
              onClick={() => setActiveSubTab('editor')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                activeSubTab === 'editor'
                  ? 'bg-[#400849] text-white shadow-xs'
                  : 'text-[#400849] hover:text-[#400849]/70'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Section Controls</span>
            </button>
          </div>

          {/* Device Frame Switcher */}
          {activeSubTab === 'preview' && (
            <div className="bg-[#F5E8F5] p-1 rounded-lg border border-[#E9DDE8] flex items-center text-xs font-semibold">
              <button
                onClick={() => setPreviewDevice('desktop')}
                title="Desktop View"
                className={`p-1.5 rounded-md transition-all ${
                  previewDevice === 'desktop'
                    ? 'bg-white text-[#400849] shadow-xs'
                    : 'text-[#806785] hover:text-[#400849]'
                }`}
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPreviewDevice('mobile')}
                title="Mobile Phone View"
                className={`p-1.5 rounded-md transition-all ${
                  previewDevice === 'mobile'
                    ? 'bg-white text-[#400849] shadow-xs'
                    : 'text-[#806785] hover:text-[#400849]'
                }`}
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Copy Public Link */}
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E9DDE8] bg-[#FFF9F5] hover:bg-white text-xs font-semibold text-[#400849] transition-all"
            title="Copy shareable link for PR teams"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-600" />
                <span className="text-green-700">Link Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#806785]" />
                <span>Share Link</span>
              </>
            )}
          </button>

          {/* Full Public View Mode */}
          <button
            onClick={() => setActiveTab('public-kit')}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#FF5A0A] hover:bg-[#e04e05] text-white text-xs font-semibold transition-all shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Open Standalone</span>
            <ExternalLink className="w-3 h-3 ml-0.5" />
          </button>

          {/* PDF Export */}
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#400849] text-white text-xs font-semibold hover:bg-[#2e0535] transition-all shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-[#E7B0DE]" />
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: SECTION CONTROLS & CONTENT EDITOR */}
      {activeSubTab === 'editor' && (
        <div className="bg-white rounded-2xl border border-[#E9DDE8] p-6 shadow-xs space-y-6">
          <div>
            <h3 className="font-display font-semibold text-base text-[#400849]">
              Manage Media Kit Sections & Visibility
            </h3>
            <p className="text-xs text-[#806785]">
              Toggle which sections appear in your public kit when presenting to brands.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {mediaKitSections.map(sec => (
              <div
                key={sec.id}
                className="flex items-center justify-between p-3.5 rounded-xl border border-[#E9DDE8] bg-[#FFF9F5]/50 hover:bg-[#FFF9F5] transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <Layers className="w-4 h-4 text-[#806785]" />
                  <span className="text-xs font-semibold text-[#400849]">{sec.title}</span>
                </div>
                <button
                  onClick={() => toggleSection(sec.id)}
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full transition-all ${
                    sec.enabled
                      ? 'bg-[#400849] text-white'
                      : 'bg-neutral-200 text-neutral-500'
                  }`}
                >
                  {sec.enabled ? 'Visible' : 'Hidden'}
                </button>
              </div>
            ))}
          </div>

          {/* Inline Bio & Vision Editor */}
          <div className="pt-6 border-t border-[#E9DDE8] space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-display font-semibold text-sm text-[#400849]">
                Editorial Copy & Positioning
              </h4>
              <button
                onClick={handleSaveBioAndDetails}
                className="px-3.5 py-1.5 rounded-lg bg-[#400849] text-white text-xs font-semibold hover:bg-[#2b0431]"
              >
                Save Copy Changes
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-semibold text-[#400849] block mb-1">
                  Cover Headline Kicker
                </label>
                <input
                  type="text"
                  value={editHeadline}
                  onChange={e => setEditHeadline(e.target.value)}
                  className="w-full p-2.5 border border-[#E9DDE8] rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="font-semibold text-[#400849] block mb-1">
                  Business Inquiry Email
                </label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={e => setEditEmail(e.target.value)}
                  className="w-full p-2.5 border border-[#E9DDE8] rounded-lg text-xs"
                />
              </div>

              <div className="md:col-span-2">
                <label className="font-semibold text-[#400849] block mb-1">
                  About Me / Biography (Vogue Editorial Voice)
                </label>
                <textarea
                  rows={4}
                  value={editBio}
                  onChange={e => setEditBio(e.target.value)}
                  className="w-full p-2.5 border border-[#E9DDE8] rounded-lg text-xs leading-relaxed"
                />
              </div>

              <div className="md:col-span-2">
                <label className="font-semibold text-[#400849] block mb-1">
                  Audience Positioning & Brand Value Proposition
                </label>
                <textarea
                  rows={2}
                  value={editPositioning}
                  onChange={e => setEditPositioning(e.target.value)}
                  className="w-full p-2.5 border border-[#E9DDE8] rounded-lg text-xs"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: LUXURY EDITORIAL MEDIA KIT PREVIEW */}
      {activeSubTab === 'preview' && (
        <div
          className={`mx-auto transition-all duration-300 ${
            previewDevice === 'mobile'
              ? 'max-w-sm rounded-[40px] border-[10px] border-[#400849] p-2 bg-[#400849] shadow-2xl overflow-hidden'
              : 'w-full'
          }`}
        >
          {/* Main Media Kit Canvas (Styled as an exquisite fashion publication) */}
          <div
            id="printable-media-kit"
            className="bg-[#FFF9F5] text-[#400849] rounded-2xl border border-[#E9DDE8] shadow-sm overflow-hidden"
          >
            {/* 1. COVER PAGE / HERO SPREAD */}
            {isSectionEnabled('cover') && (
              <section className="relative overflow-hidden bg-[#400849] text-white p-8 sm:p-14 lg:p-16">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E7B0DE]/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FF5A0A]/20 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E7B0DE]/20 text-[#E7B0DE] text-xs font-semibold tracking-widest uppercase">
                    Official Creator Media Kit · 2026 Edition
                  </div>

                  <h1 className="font-serif italic text-4xl sm:text-6xl lg:text-7xl font-medium tracking-tight leading-none text-white">
                    COUTUREFLOSS
                  </h1>

                  <p className="font-display text-sm sm:text-lg tracking-[0.2em] uppercase text-[#E7B0DE] font-semibold">
                    Sharmistha · Creator & Creative Director
                  </p>

                  <p className="font-serif italic text-xl sm:text-2xl text-[#FFE4D5] max-w-2xl mx-auto font-light leading-snug">
                    “{editHeadline}”
                  </p>

                  {/* Highlights Strip */}
                  <div className="pt-4 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm font-display tracking-wider uppercase text-white/90 border-t border-white/10 max-w-2xl mx-auto">
                    <div>
                      <p className="font-bold text-lg sm:text-xl text-[#E7B0DE] tabular-nums">
                        {profile.followersDisplay}
                      </p>
                      <p className="text-[10px] text-white/60">Community</p>
                    </div>
                    <span className="text-white/20">/</span>
                    <div>
                      <p className="font-bold text-lg sm:text-xl text-[#FF5A0A] tabular-nums">
                        {profile.avgReelViewsDisplay}
                      </p>
                      <p className="text-[10px] text-white/60">Average Reel Views</p>
                    </div>
                    <span className="text-white/20">/</span>
                    <div>
                      <p className="font-bold text-lg sm:text-xl text-white tabular-nums">
                        {profile.engagementRate}%
                      </p>
                      <p className="text-[10px] text-white/60">Engagement</p>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* 2. ABOUT ME & CREATIVE VISION */}
            {isSectionEnabled('about') && (
              <section className="p-8 sm:p-14 border-b border-[#E9DDE8]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
                  <div className="lg:col-span-4 flex flex-col items-center text-center">
                    <CreatorAvatar src={profile.avatarUrl} alt={profile.name} size="xl" />
                    <h3 className="font-serif italic text-2xl text-[#400849] font-medium mt-4">
                      {profile.name}
                    </h3>
                    <p className="text-xs font-semibold text-[#806785] tracking-wider uppercase">
                      {profile.handle}
                    </p>
                    <div className="mt-3 flex items-center gap-2 text-xs text-[#400849]/80">
                      <MapPin className="w-3.5 h-3.5 text-[#FF5A0A]" />
                      <span>{profile.location}</span>
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-xs text-[#400849]/80">
                      <Globe className="w-3.5 h-3.5 text-[#806785]" />
                      <span>{profile.languages.join(' · ')}</span>
                    </div>
                  </div>

                  <div className="lg:col-span-8 space-y-4">
                    <div className="inline-flex items-center gap-1.5 text-xs font-display font-semibold tracking-widest text-[#FF5A0A] uppercase">
                      <span>01. The Creator Vision</span>
                    </div>
                    <h2 className="font-serif italic text-2xl sm:text-3xl text-[#400849] leading-snug">
                      Elevating modern luxury with editorial rigor.
                    </h2>
                    <p className="text-sm text-[#400849]/90 leading-relaxed font-normal">
                      {profile.bio}
                    </p>
                    <div className="p-4 rounded-xl bg-[#F5E8F5] border border-[#E9DDE8] text-xs text-[#400849]">
                      <span className="font-bold text-[#400849] block mb-1">
                        Audience Positioning:
                      </span>
                      {profile.positioning}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* 3. VERIFIED SOCIAL MEDIA STATISTICS & AUDIENCE */}
            {isSectionEnabled('stats') && (
              <section className="p-8 sm:p-14 bg-white border-b border-[#E9DDE8]">
                <div className="max-w-5xl mx-auto space-y-8">
                  <div className="text-center max-w-xl mx-auto">
                    <span className="text-xs font-display font-semibold tracking-widest text-[#FF5A0A] uppercase">
                      02. Audience & Reach
                    </span>
                    <h2 className="font-serif italic text-3xl text-[#400849] mt-1">
                      High-Value Cosmopolitan Reach
                    </h2>
                    <p className="text-xs text-[#806785] mt-1">
                      Metrics are verified against active channel performance.
                    </p>
                  </div>

                  {/* Core Metrics Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="p-4 rounded-xl bg-[#FFF9F5] border border-[#E9DDE8] text-center">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-[#806785]">
                        Followers
                      </p>
                      <p className="font-display font-bold text-2xl sm:text-3xl text-[#400849] mt-1 tabular-nums">
                        {profile.followersDisplay}
                      </p>
                      <p className="text-[10px] text-[#400849] font-medium mt-1">
                        Verified Baseline
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#FFE4D5]/30 border border-[#FF5A0A]/30 text-center">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-[#806785]">
                        Avg Reel Views
                      </p>
                      <p className="font-display font-bold text-2xl sm:text-3xl text-[#FF5A0A] mt-1 tabular-nums">
                        {profile.avgReelViewsDisplay}
                      </p>
                      <p className="text-[10px] text-[#400849] font-medium mt-1">
                        Verified Baseline
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#FFF9F5] border border-[#E9DDE8] text-center">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-[#806785]">
                        Monthly Impressions
                      </p>
                      <p className="font-display font-bold text-2xl sm:text-3xl text-[#400849] mt-1 tabular-nums">
                        {(profile.monthlyImpressions / 1000000).toFixed(1)}M
                      </p>
                      <p className="text-[10px] text-[#806785] mt-1">Sample Estimate</p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#FFF9F5] border border-[#E9DDE8] text-center">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-[#806785]">
                        Avg Story Views
                      </p>
                      <p className="font-display font-bold text-2xl sm:text-3xl text-[#400849] mt-1 tabular-nums">
                        {profile.avgStoryViews.toLocaleString()}
                      </p>
                      <p className="text-[10px] text-[#806785] mt-1">Sample Estimate</p>
                    </div>
                  </div>

                  {/* Demographics Breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[#E9DDE8] text-xs">
                    <div className="p-4 rounded-xl bg-[#F5E8F5]/60 border border-[#E9DDE8]">
                      <h4 className="font-display font-semibold text-[#400849] mb-2 uppercase tracking-wider text-[11px]">
                        Gender Split
                      </h4>
                      <div className="space-y-1.5">
                        <div className="flex justify-between font-medium">
                          <span>Women</span>
                          <span className="font-bold text-[#400849]">78%</span>
                        </div>
                        <div className="w-full bg-[#E9DDE8] rounded-full h-1.5 overflow-hidden">
                          <div className="bg-[#400849] h-full rounded-full" style={{ width: '78%' }} />
                        </div>
                        <div className="flex justify-between font-medium pt-1 text-[#806785]">
                          <span>Men & Non-binary</span>
                          <span>22%</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#F5E8F5]/60 border border-[#E9DDE8]">
                      <h4 className="font-display font-semibold text-[#400849] mb-2 uppercase tracking-wider text-[11px]">
                        Core Age Cohorts
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>25 – 34 Years (Prime Luxury Spenders)</span>
                          <span className="font-bold text-[#FF5A0A]">56%</span>
                        </div>
                        <div className="flex justify-between text-[#806785]">
                          <span>18 – 24 Years (Trends & Virality)</span>
                          <span>28%</span>
                        </div>
                        <div className="flex justify-between text-[#806785]">
                          <span>35 – 44 Years (High Net-Worth)</span>
                          <span>16%</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#F5E8F5]/60 border border-[#E9DDE8]">
                      <h4 className="font-display font-semibold text-[#400849] mb-2 uppercase tracking-wider text-[11px]">
                        Top Metropolitan Markets
                      </h4>
                      <div className="space-y-1 text-[#400849]">
                        <p className="font-medium">1. Mumbai, India (34%)</p>
                        <p className="font-medium">2. New Delhi & NCR (24%)</p>
                        <p className="font-medium">3. Bengaluru (16%)</p>
                        <p className="text-[#806785]">4. Dubai & UAE (12%)</p>
                        <p className="text-[#806785]">5. London, UK (8%)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* 4. CONTENT PILLARS */}
            {isSectionEnabled('categories') && (
              <section className="p-8 sm:p-14 border-b border-[#E9DDE8]">
                <div className="max-w-5xl mx-auto space-y-6">
                  <div className="text-center max-w-xl mx-auto">
                    <span className="text-xs font-display font-semibold tracking-widest text-[#FF5A0A] uppercase">
                      03. Editorial Pillars
                    </span>
                    <h2 className="font-serif italic text-3xl text-[#400849] mt-1">
                      Signature Content Categories
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {profile.niche.map(category => (
                      <EditorialCardIllustration key={category} category={category} />
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* 5. PERFORMANCE HIGHLIGHTS & REEL CASE STUDIES */}
            {isSectionEnabled('performance') && (
              <section className="p-8 sm:p-14 bg-white border-b border-[#E9DDE8]">
                <div className="max-w-5xl mx-auto space-y-6">
                  <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <span className="text-xs font-display font-semibold tracking-widest text-[#FF5A0A] uppercase">
                        04. Proven Retention
                      </span>
                      <h2 className="font-serif italic text-3xl text-[#400849] mt-1">
                        Viral Reel Case Studies
                      </h2>
                    </div>
                    <a
                      href={profile.instagramUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-semibold text-[#FF5A0A] hover:underline flex items-center gap-1"
                    >
                      <span>Explore @couturefloss on Instagram</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {portfolio.slice(0, 3).map(item => (
                      <div
                        key={item.id}
                        className="rounded-xl border border-[#E9DDE8] overflow-hidden bg-[#FFF9F5] hover:border-[#E7B0DE] transition-all flex flex-col justify-between"
                      >
                        <div className="p-5 space-y-3">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-[#400849]">{item.brand}</span>
                            <span className="text-[#806785]">{item.category}</span>
                          </div>

                          <h4 className="font-serif italic text-base text-[#400849] font-medium leading-snug">
                            {item.title}
                          </h4>

                          <p className="text-xs text-[#806785] line-clamp-3 font-normal">
                            {item.caseStudySummary}
                          </p>
                        </div>

                        <div className="p-4 bg-white border-t border-[#E9DDE8] flex items-center justify-between text-xs">
                          <div>
                            <span className="text-[10px] text-[#806785] uppercase block">Views</span>
                            <span className="font-display font-bold text-[#FF5A0A] text-sm tabular-nums">
                              {item.views.toLocaleString()}
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] text-[#806785] uppercase block">Reach</span>
                            <span className="font-display font-bold text-[#400849] text-sm tabular-nums">
                              {item.reach.toLocaleString()}
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] text-[#806785] uppercase block">
                              Engagement
                            </span>
                            <span className="font-display font-bold text-[#400849] text-sm">
                              {item.engagement}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* 6. COLLABORATION FORMATS */}
            {isSectionEnabled('formats') && (
              <section className="p-8 sm:p-14 border-b border-[#E9DDE8]">
                <div className="max-w-5xl mx-auto space-y-6">
                  <div className="text-center max-w-xl mx-auto">
                    <span className="text-xs font-display font-semibold tracking-widest text-[#FF5A0A] uppercase">
                      05. Partnerships
                    </span>
                    <h2 className="font-serif italic text-3xl text-[#400849] mt-1">
                      Collaboration Formats
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                    {[
                      {
                        title: 'Dedicated 4K Reel',
                        desc: 'Hero storytelling, custom studio production, color graded, high save-rate reach.',
                      },
                      {
                        title: 'Interactive Story Sets',
                        desc: 'Candid real-time demos, direct product links, sticker polls, 24h impact.',
                      },
                      {
                        title: 'Editorial Carousels',
                        desc: 'Multi-look styling breakdowns, macro beauty swatches, high-bookmark saves.',
                      },
                      {
                        title: 'UGC Ad Creative',
                        desc: 'Hook variations, whitelisting rights, and direct-response commercial licenses.',
                      },
                      {
                        title: 'Hosted Resort Stays',
                        desc: 'Experiential hospitality coverage, travel reels, luxury villa walk-throughs.',
                      },
                      {
                        title: 'Masterclass Workshops',
                        desc: 'In-store beauty masterclasses, red-carpet presence, and styling sessions.',
                      },
                      {
                        title: 'Category Ambassadorship',
                        desc: 'Multi-month retainer, category exclusivity, and sustained compounding loyalty.',
                      },
                      {
                        title: 'PR Unboxings & Seeding',
                        desc: 'Authentic press kit showcases with option to convert to dedicated feature.',
                      },
                    ].map((format, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-white border border-[#E9DDE8] space-y-2 hover:border-[#E7B0DE] transition-all"
                      >
                        <h4 className="font-serif italic text-sm text-[#400849] font-semibold">
                          {format.title}
                        </h4>
                        <p className="text-[#806785] leading-relaxed">{format.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* 7. CURATED RATE CARD (PUBLIC ITEMS ONLY) */}
            {isSectionEnabled('rates') && (
              <section className="p-8 sm:p-14 bg-white border-b border-[#E9DDE8]">
                <div className="max-w-5xl mx-auto space-y-6">
                  <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <span className="text-xs font-display font-semibold tracking-widest text-[#FF5A0A] uppercase">
                        06. Investment
                      </span>
                      <h2 className="font-serif italic text-3xl text-[#400849] mt-1">
                        Curated Rate Card
                      </h2>
                    </div>
                    <span className="text-xs text-[#806785]">
                      All packages subject to custom brief and scope confirmation.
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {rates
                      .filter(r => r.isPublicInKit)
                      .map(rate => (
                        <div
                          key={rate.id}
                          className="p-5 rounded-xl border border-[#E9DDE8] bg-[#FFF9F5] flex flex-col justify-between space-y-4"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-serif italic text-base text-[#400849] font-medium">
                                {rate.title}
                              </h4>
                              {rate.packageDiscountPercent && (
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FF5A0A] text-white">
                                  Save {rate.packageDiscountPercent}%
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-[#806785] leading-relaxed">
                              {rate.description}
                            </p>
                          </div>

                          <div className="pt-3 border-t border-[#E9DDE8] flex items-center justify-between">
                            <span className="text-xs text-[#806785]">
                              Turnaround: {rate.turnaroundDays} days
                            </span>
                            <div className="text-right">
                              <span className="font-display font-bold text-lg text-[#400849] tabular-nums">
                                {currency === 'INR'
                                  ? `₹${rate.basePriceINR.toLocaleString()}`
                                  : `$${rate.basePriceUSD.toLocaleString()}`}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </section>
            )}

            {/* 8. CONTACT & INQUIRY */}
            {isSectionEnabled('contact') && (
              <section className="p-8 sm:p-14 bg-[#400849] text-white text-center space-y-6">
                <div className="max-w-xl mx-auto space-y-3">
                  <span className="text-xs font-display font-semibold tracking-widest text-[#E7B0DE] uppercase">
                    07. Inquiries & Bookings
                  </span>
                  <h2 className="font-serif italic text-3xl sm:text-4xl text-white font-medium">
                    Let’s create something iconic together.
                  </h2>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                    Now reserving partnerships and seasonal launches for 2026. Reach out directly or
                    connect via our studio management.
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs">
                  <a
                    href={`mailto:${profile.businessEmail}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF5A0A] hover:bg-[#e04e05] text-white font-semibold transition-all shadow-md"
                  >
                    <Mail className="w-4 h-4" />
                    <span>{profile.businessEmail}</span>
                  </a>

                  <a
                    href={profile.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-all border border-white/20"
                  >
                    <Instagram className="w-4 h-4 text-[#E7B0DE]" />
                    <span>{profile.handle}</span>
                  </a>
                </div>
              </section>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
