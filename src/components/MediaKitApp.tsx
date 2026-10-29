import React, { useState } from 'react';
import {
  Download,
  Share2,
  Copy,
  Check,
  Edit3,
  Smartphone,
  Monitor,
  Instagram,
  Mail,
  MapPin,
  Globe,
  ArrowUpRight,
  Sparkles,
  Send,
  Plus,
  Trash2,
  CheckCircle2,
  Star,
  Info,
  Layers,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CreatorAvatar, EditorialCoverArtwork, EditorialCardIllustration } from './EditorialVisuals';
import { ContentCategory } from '../types';

export const MediaKitApp: React.FC = () => {
  const {
    profile,
    updateProfile,
    rates,
    updateRate,
    addRate,
    deleteRate,
    portfolio,
    addPortfolioItem,
    updatePortfolioItem,
    deletePortfolioItem,
    currency,
    setCurrency,
  } = useApp();

  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTab, setEditTab] = useState<'profile' | 'metrics' | 'rates' | 'content'>('profile');
  const [copiedLink, setCopiedLink] = useState(false);

  // Profile edit state
  const [profileForm, setProfileForm] = useState({ ...profile });
  const [headline, setHeadline] = useState('Beauty, style & stories that move culture.');

  // Inquiry form states
  const [inquiryBrand, setInquiryBrand] = useState('');
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryDeliverable, setInquiryDeliverable] = useState('1x Dedicated Instagram Reel');
  const [inquiryBudget, setInquiryBudget] = useState('150000');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [inquirySent, setInquirySent] = useState(false);

  // Add rate item state
  const [newRateTitle, setNewRateTitle] = useState('');
  const [newRateCategory, setNewRateCategory] = useState<any>('Video');
  const [newRateINR, setNewRateINR] = useState('150000');
  const [newRateUSD, setNewRateUSD] = useState('1850');
  const [newRateDesc, setNewRateDesc] = useState('');
  const [newRateDays, setNewRateDays] = useState('7');

  // Add portfolio state
  const [newPortTitle, setNewPortTitle] = useState('');
  const [newPortBrand, setNewPortBrand] = useState('');
  const [newPortCat, setNewPortCat] = useState<ContentCategory>('Beauty & Makeup');
  const [newPortViews, setNewPortViews] = useState('350000');
  const [newPortReach, setNewPortReach] = useState('420000');
  const [newPortEngage, setNewPortEngage] = useState('5.1%');
  const [newPortReelUrl, setNewPortReelUrl] = useState('https://www.instagram.com/couturefloss/');
  const [newPortSummary, setNewPortSummary] = useState('');

  const handleCopyShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(profileForm);
    setShowEditModal(false);
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryBrand || !inquiryEmail) return;
    setInquirySent(true);
  };

  const handleCreateRate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRateTitle) return;
    addRate({
      title: newRateTitle,
      category: newRateCategory,
      description: newRateDesc,
      basePriceINR: parseInt(newRateINR) || 0,
      basePriceUSD: parseInt(newRateUSD) || 0,
      turnaroundDays: parseInt(newRateDays) || 5,
      includes: ['Concept & storyboard', '4K HDR filming', '1 round of revision'],
      notes: 'Organic in-feed permanence',
      isPublicInKit: true,
    });
    setNewRateTitle('');
    setNewRateDesc('');
  };

  const handleCreatePortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPortTitle) return;
    addPortfolioItem({
      title: newPortTitle,
      brand: newPortBrand || 'Editorial Spotlight',
      category: newPortCat,
      views: parseInt(newPortViews) || 0,
      reach: parseInt(newPortReach) || 0,
      engagement: newPortEngage,
      reelUrl: newPortReelUrl,
      thumbnailUrl: '',
      isFeatured: true,
      caseStudySummary: newPortSummary,
      publishedDate: new Date().toISOString().split('T')[0],
    });
    setNewPortTitle('');
    setNewPortBrand('');
    setNewPortSummary('');
  };

  return (
    <div className="min-h-screen bg-[#FFF9F5] text-[#400849] font-sans antialiased selection:bg-[#E7B0DE] selection:text-[#400849]">
      {/* LUXURY CONTROL & NAVIGATION BAR */}
      <header className="no-print sticky top-0 z-50 bg-[#FFF9F5]/90 backdrop-blur-md border-b border-[#E9DDE8] px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Lockup */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#400849] text-[#E7B0DE] font-serif font-bold italic flex items-center justify-center text-sm shadow-xs">
            CF
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold tracking-[0.2em] text-sm text-[#400849]">
                COUTUREFLOSS
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#E7B0DE]/40 text-[#400849] uppercase tracking-wider hidden sm:inline">
                Media Kit 2026
              </span>
            </div>
            <p className="text-[11px] text-[#806785]">
              Sharmistha · <span className="text-[#FF5A0A] font-semibold">@couturefloss</span>
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Currency Toggle */}
          <div className="hidden sm:flex items-center bg-[#F5E8F5] p-1 rounded-lg border border-[#E9DDE8] text-xs font-semibold">
            <button
              onClick={() => setCurrency('INR')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                currency === 'INR'
                  ? 'bg-[#400849] text-white shadow-xs'
                  : 'text-[#400849] hover:text-[#400849]/70'
              }`}
            >
              ₹ INR
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                currency === 'USD'
                  ? 'bg-[#400849] text-white shadow-xs'
                  : 'text-[#400849] hover:text-[#400849]/70'
              }`}
            >
              $ USD
            </button>
          </div>

          {/* Device Frame Switcher */}
          <div className="hidden md:flex items-center bg-[#F5E8F5] p-1 rounded-lg border border-[#E9DDE8] text-xs">
            <button
              onClick={() => setPreviewDevice('desktop')}
              title="Desktop Spread"
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
              title="Mobile Device Frame"
              className={`p-1.5 rounded-md transition-all ${
                previewDevice === 'mobile'
                  ? 'bg-white text-[#400849] shadow-xs'
                  : 'text-[#806785] hover:text-[#400849]'
              }`}
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>

          {/* Edit Kit Button */}
          <button
            onClick={() => {
              setProfileForm({ ...profile });
              setShowEditModal(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#400849] text-[#400849] hover:bg-[#E7B0DE]/20 text-xs font-semibold transition-all whitespace-nowrap"
          >
            <Edit3 className="w-3.5 h-3.5 text-[#FF5A0A]" />
            <span>Customize Kit</span>
          </button>

          {/* Share Link */}
          <button
            onClick={handleCopyShareLink}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E9DDE8] bg-white hover:bg-[#FFF9F5] text-xs font-semibold text-[#400849] transition-all"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-600" />
                <span className="text-green-700">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#806785]" />
                <span>Share Link</span>
              </>
            )}
          </button>

          {/* Export PDF */}
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#400849] text-white text-xs font-semibold hover:bg-[#2b0431] transition-all shadow-xs whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5 text-[#E7B0DE]" />
            <span>Export PDF</span>
          </button>
        </div>
      </header>

      {/* MEDIA KIT VIEWPORT CONTAINER */}
      <div
        className={`mx-auto transition-all duration-300 py-6 sm:py-10 px-4 ${
          previewDevice === 'mobile'
            ? 'max-w-sm rounded-[44px] border-[12px] border-[#400849] p-2 bg-[#400849] shadow-2xl my-6'
            : 'max-w-5xl'
        }`}
      >
        <div className="bg-[#FFF9F5] text-[#400849] rounded-3xl border border-[#E9DDE8] shadow-sm overflow-hidden space-y-16 pb-16">
          {/* SECTION 1: EDITORIAL COVER SPREAD */}
          <section className="relative overflow-hidden bg-[#400849] text-white p-8 sm:p-16 lg:p-20 text-center">
            {/* Ambient gradients */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E7B0DE]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-[#FF5A0A]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-[#E7B0DE] text-xs font-semibold tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A0A]" />
                Official Creator Media Kit · 2026
              </div>

              <h1 className="font-serif italic text-4xl sm:text-7xl lg:text-8xl font-normal tracking-tight text-white leading-none">
                COUTUREFLOSS
              </h1>

              <p className="font-display text-sm sm:text-lg tracking-[0.25em] uppercase text-[#E7B0DE] font-semibold">
                Sharmistha · Fashion, Beauty & Experiential Travel
              </p>

              <p className="font-serif italic text-xl sm:text-2xl text-[#FFE4D5] max-w-xl mx-auto font-light leading-snug">
                “{headline}”
              </p>

              {/* Verified Audience Highlights */}
              <div className="pt-6 border-t border-white/15 grid grid-cols-3 max-w-lg mx-auto gap-4 text-center">
                <div>
                  <p className="font-display font-bold text-2xl sm:text-4xl text-[#E7B0DE] tabular-nums">
                    {profile.followersDisplay}
                  </p>
                  <p className="text-[10px] sm:text-xs text-white/70 uppercase tracking-wider mt-1">
                    Followers
                  </p>
                </div>
                <div>
                  <p className="font-display font-bold text-2xl sm:text-4xl text-[#FF5A0A] tabular-nums">
                    {profile.avgReelViewsDisplay}
                  </p>
                  <p className="text-[10px] sm:text-xs text-white/70 uppercase tracking-wider mt-1">
                    Avg Reel Views
                  </p>
                </div>
                <div>
                  <p className="font-display font-bold text-2xl sm:text-4xl text-white tabular-nums">
                    {profile.engagementRate}%
                  </p>
                  <p className="text-[10px] sm:text-xs text-white/70 uppercase tracking-wider mt-1">
                    Engagement
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 2: ABOUT SHARMISTHA & CREATIVE VISION */}
          <section className="px-6 sm:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-2xl border border-[#E9DDE8] p-6 sm:p-10 shadow-xs">
              <div className="lg:col-span-4 flex flex-col items-center text-center space-y-3">
                <CreatorAvatar src={profile.avatarUrl} alt={profile.name} size="xl" />
                <div>
                  <h3 className="font-serif italic text-2xl text-[#400849] font-medium">
                    {profile.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#806785] tracking-wider uppercase">
                    {profile.handle}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-[#400849]/80">
                  <MapPin className="w-3.5 h-3.5 text-[#FF5A0A]" />
                  <span>{profile.location}</span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-[#400849]/80">
                  <Globe className="w-3.5 h-3.5 text-[#806785]" />
                  <span>{profile.languages.join(' · ')}</span>
                </div>

                <a
                  href={profile.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F5E8F5] text-[#400849] text-xs font-semibold hover:bg-[#E7B0DE]/40 transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5 text-[#FF5A0A]" />
                  <span>View Instagram</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>

              <div className="lg:col-span-8 space-y-4">
                <span className="text-xs font-display font-semibold tracking-widest text-[#FF5A0A] uppercase">
                  01. The Creative Vision
                </span>
                <h2 className="font-serif italic text-2xl sm:text-3xl text-[#400849] leading-snug">
                  Bridging avant-garde runway aesthetics with wearable everyday glamour.
                </h2>
                <p className="text-sm text-[#400849]/90 leading-relaxed font-normal">
                  {profile.bio}
                </p>

                <div className="p-4 rounded-xl bg-[#FFF9F5] border border-[#E9DDE8] text-xs space-y-1">
                  <span className="font-bold text-[#400849] block">Audience Positioning:</span>
                  <p className="text-[#806785] leading-relaxed">{profile.positioning}</p>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 3: SOCIAL MEDIA AUDIENCE & DEMOGRAPHICS */}
          <section className="px-6 sm:px-12 lg:px-16 space-y-6">
            <div className="text-center max-w-xl mx-auto">
              <span className="text-xs font-display font-semibold tracking-widest text-[#FF5A0A] uppercase">
                02. Verified Reach
              </span>
              <h2 className="font-serif italic text-3xl text-[#400849] mt-1">
                Audience & Performance Benchmarks
              </h2>
            </div>

            {/* 4 Stat Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-[#E9DDE8] text-center shadow-xs">
                <p className="text-[10px] font-semibold text-[#806785] uppercase tracking-wider">
                  Instagram Followers
                </p>
                <p className="font-display font-bold text-2xl sm:text-3xl text-[#400849] mt-1 tabular-nums">
                  {profile.followersDisplay}
                </p>
                <div className="mt-1 flex items-center justify-center gap-1 text-[11px] text-[#400849] font-medium">
                  <CheckCircle2 className="w-3 h-3 text-[#FF5A0A]" />
                  <span>Verified Baseline</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#FFE4D5]/30 border border-[#FF5A0A]/30 text-center shadow-xs">
                <p className="text-[10px] font-semibold text-[#806785] uppercase tracking-wider">
                  Average Reel Views
                </p>
                <p className="font-display font-bold text-2xl sm:text-3xl text-[#FF5A0A] mt-1 tabular-nums">
                  {profile.avgReelViewsDisplay}
                </p>
                <div className="mt-1 flex items-center justify-center gap-1 text-[11px] text-[#400849] font-medium">
                  <CheckCircle2 className="w-3 h-3 text-[#FF5A0A]" />
                  <span>Verified Baseline</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#E9DDE8] text-center shadow-xs">
                <p className="text-[10px] font-semibold text-[#806785] uppercase tracking-wider">
                  Monthly Impressions
                </p>
                <p className="font-display font-bold text-2xl sm:text-3xl text-[#400849] mt-1 tabular-nums">
                  {(profile.monthlyImpressions / 1000000).toFixed(1)}M
                </p>
                <p className="text-[10px] text-[#806785] mt-1">Estimated Reach</p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#E9DDE8] text-center shadow-xs">
                <p className="text-[10px] font-semibold text-[#806785] uppercase tracking-wider">
                  Core Audience
                </p>
                <p className="font-display font-bold text-2xl sm:text-3xl text-[#400849] mt-1 tabular-nums">
                  78%
                </p>
                <p className="text-[10px] text-[#806785] mt-1">Women (Ages 22-38)</p>
              </div>
            </div>

            {/* Demographics Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs">
              <div className="p-4 rounded-xl bg-white border border-[#E9DDE8]">
                <h4 className="font-display font-semibold text-[#400849] mb-2 uppercase tracking-wider text-[11px]">
                  Gender Distribution
                </h4>
                <div className="space-y-1.5">
                  <div className="flex justify-between font-medium">
                    <span>Women</span>
                    <span className="font-bold text-[#400849]">78%</span>
                  </div>
                  <div className="w-full bg-[#E9DDE8] rounded-full h-1.5 overflow-hidden">
                    <div className="bg-[#400849] h-full rounded-full" style={{ width: '78%' }} />
                  </div>
                  <div className="flex justify-between font-medium text-[#806785] pt-1">
                    <span>Men & Non-binary</span>
                    <span>22%</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#E9DDE8]">
                <h4 className="font-display font-semibold text-[#400849] mb-2 uppercase tracking-wider text-[11px]">
                  Age Cohorts
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>25 – 34 Years (Prime Luxury Buyers)</span>
                    <span className="font-bold text-[#FF5A0A]">56%</span>
                  </div>
                  <div className="flex justify-between text-[#806785]">
                    <span>18 – 24 Years (High Engagement)</span>
                    <span>28%</span>
                  </div>
                  <div className="flex justify-between text-[#806785]">
                    <span>35 – 44 Years (High Net Worth)</span>
                    <span>16%</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#E9DDE8]">
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
          </section>

          {/* SECTION 4: CONTENT PILLARS */}
          <section className="px-6 sm:px-12 lg:px-16 space-y-6">
            <div className="text-center max-w-xl mx-auto">
              <span className="text-xs font-display font-semibold tracking-widest text-[#FF5A0A] uppercase">
                03. Editorial Verticals
              </span>
              <h2 className="font-serif italic text-3xl text-[#400849] mt-1">
                Content Pillars & Artistry
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {profile.niche.map(cat => (
                <EditorialCardIllustration key={cat} category={cat} />
              ))}
            </div>
          </section>

          {/* SECTION 5: VIRAL REEL HIGHLIGHTS & CASE STUDIES */}
          <section className="px-6 sm:px-12 lg:px-16 space-y-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="text-xs font-display font-semibold tracking-widest text-[#FF5A0A] uppercase">
                  04. Proven Velocity
                </span>
                <h2 className="font-serif italic text-3xl text-[#400849] mt-1">
                  High-Retention Reel Case Studies
                </h2>
              </div>
              <a
                href={profile.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-[#FF5A0A] hover:underline flex items-center gap-1"
              >
                <span>Explore @couturefloss feed</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {portfolio.map(item => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-[#E9DDE8] bg-white overflow-hidden shadow-xs hover:border-[#E7B0DE] transition-all flex flex-col justify-between"
                >
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#400849]">{item.brand}</span>
                      <span className="text-[#806785]">{item.category}</span>
                    </div>

                    <h4 className="font-serif italic text-base text-[#400849] font-medium leading-snug">
                      {item.title}
                    </h4>

                    {item.caseStudySummary && (
                      <p className="text-xs text-[#806785] line-clamp-3 font-normal leading-relaxed">
                        {item.caseStudySummary}
                      </p>
                    )}
                  </div>

                  <div className="p-4 bg-[#FFF9F5] border-t border-[#E9DDE8] flex items-center justify-between text-xs font-display">
                    <div>
                      <span className="text-[10px] text-[#806785] uppercase block">Views</span>
                      <span className="font-bold text-[#FF5A0A] text-sm tabular-nums">
                        {item.views.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#806785] uppercase block">Reach</span>
                      <span className="font-bold text-[#400849] text-sm tabular-nums">
                        {item.reach.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#806785] uppercase block">Engagement</span>
                      <span className="font-bold text-[#400849] text-sm">{item.engagement}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 6: SELECTED PREVIOUS PARTNERSHIPS */}
          <section className="px-6 sm:px-12 lg:px-16">
            <div className="bg-white rounded-2xl border border-[#E9DDE8] p-8 sm:p-12 shadow-xs space-y-8 text-center">
              <div>
                <span className="text-xs font-display font-semibold tracking-widest text-[#FF5A0A] uppercase">
                  05. Collaborators
                </span>
                <h2 className="font-serif italic text-3xl text-[#400849] mt-1">
                  Trusted by Premier Beauty & Luxury Labels
                </h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 items-center">
                {['Estée Lauder', 'The Oberoi Hotels', 'Nicobar', 'Kama Ayurveda', 'Fenty Beauty'].map(
                  b => (
                    <div
                      key={b}
                      className="p-4 rounded-xl bg-[#FFF9F5] border border-[#E9DDE8] font-serif italic text-sm sm:text-base font-semibold text-[#400849]"
                    >
                      {b}
                    </div>
                  )
                )}
              </div>
            </div>
          </section>

          {/* SECTION 7: COLLABORATION FORMATS */}
          <section className="px-6 sm:px-12 lg:px-16 space-y-6">
            <div className="text-center max-w-xl mx-auto">
              <span className="text-xs font-display font-semibold tracking-widest text-[#FF5A0A] uppercase">
                06. Deliverables Scope
              </span>
              <h2 className="font-serif italic text-3xl text-[#400849] mt-1">
                Collaboration Formats
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              {[
                {
                  title: 'Dedicated 4K Reel',
                  desc: 'Studio production in 4K HDR, creative storyboard, professional color grading, in-feed permanence.',
                },
                {
                  title: 'Interactive Story Suite',
                  desc: 'Real-time candid texture demo, direct-to-shop sticker links, polls, and 24h immediate impact.',
                },
                {
                  title: 'Editorial Carousels',
                  desc: 'Multi-look styling breakdown, macro beauty swatches, high-bookmark save rates.',
                },
                {
                  title: 'UGC Video Assets',
                  desc: 'Hook variations, whitelisting rights, and direct-response commercial licenses for brand Meta ads.',
                },
                {
                  title: 'Hosted Resort Stays',
                  desc: 'Experiential hospitality coverage, travel reels, luxury villa walk-throughs, and still photo suite.',
                },
                {
                  title: 'Masterclass & VIP Events',
                  desc: 'In-store beauty masterclasses, red-carpet presence, and boutique launch coverage.',
                },
                {
                  title: 'Category Ambassadorship',
                  desc: 'Multi-month retainer, category exclusivity, and sustained compounding brand advocacy.',
                },
                {
                  title: 'PR Gifting & Unboxing',
                  desc: 'Curated press kit showcases with option to upgrade to dedicated feed placement.',
                },
              ].map((fmt, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white border border-[#E9DDE8] space-y-2 hover:border-[#E7B0DE] transition-all"
                >
                  <h4 className="font-serif italic text-sm text-[#400849] font-semibold">
                    {fmt.title}
                  </h4>
                  <p className="text-[#806785] leading-relaxed">{fmt.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 8: CURATED RATE CARD */}
          <section className="px-6 sm:px-12 lg:px-16 space-y-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="text-xs font-display font-semibold tracking-widest text-[#FF5A0A] uppercase">
                  07. Investment Structure
                </span>
                <h2 className="font-serif italic text-3xl text-[#400849] mt-1">
                  Curated Rate Card
                </h2>
              </div>
              <span className="text-xs text-[#806785]">
                Base rates include 4K production and standard organic in-feed permanence.
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {rates
                .filter(r => r.isPublicInKit)
                .map(rate => (
                  <div
                    key={rate.id}
                    className="p-5 rounded-2xl bg-white border border-[#E9DDE8] shadow-xs flex flex-col justify-between space-y-3 hover:border-[#E7B0DE] transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-serif italic text-base font-medium text-[#400849]">
                          {rate.title}
                        </h4>
                        {rate.packageDiscountPercent && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FF5A0A] text-white">
                            -{rate.packageDiscountPercent}%
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#806785] leading-relaxed line-clamp-2">
                        {rate.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#E9DDE8] flex items-center justify-between">
                      <span className="text-xs text-[#806785]">{rate.turnaroundDays}d turnaround</span>
                      <span className="font-display font-bold text-lg text-[#400849] tabular-nums">
                        {currency === 'INR'
                          ? `₹${rate.basePriceINR.toLocaleString()}`
                          : `$${rate.basePriceUSD.toLocaleString()}`}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </section>

          {/* SECTION 9: DIRECT BRAND INQUIRY & BOOKING */}
          <section className="px-6 sm:px-12 lg:px-16">
            <div className="bg-[#400849] text-white rounded-3xl p-8 sm:p-14 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-5 space-y-4">
                  <span className="text-xs font-display font-semibold tracking-widest text-[#E7B0DE] uppercase">
                    08. Contact & Reservations
                  </span>
                  <h2 className="font-serif italic text-3xl sm:text-4xl text-white font-medium leading-snug">
                    Let’s create something iconic together.
                  </h2>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-normal">
                    Now reserving partnerships and seasonal launches for 2026. Reach out directly or
                    connect via our studio management.
                  </p>

                  <div className="pt-4 space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-white/90">
                      <Mail className="w-4 h-4 text-[#FF5A0A]" />
                      <span>{profile.businessEmail}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/90">
                      <Instagram className="w-4 h-4 text-[#E7B0DE]" />
                      <span>{profile.handle} · 311,000 Avg Reel Views</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 bg-white text-[#400849] p-6 sm:p-8 rounded-2xl shadow-xl">
                  {inquirySent ? (
                    <div className="text-center py-10 space-y-3">
                      <div className="w-12 h-12 rounded-full bg-[#E7B0DE]/40 text-[#400849] flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-6 h-6 text-[#FF5A0A]" />
                      </div>
                      <h3 className="font-serif italic text-2xl font-semibold text-[#400849]">
                        Inquiry Received
                      </h3>
                      <p className="text-xs text-[#806785] max-w-sm mx-auto leading-relaxed">
                        Thank you! Your campaign proposal has been delivered to Sharmistha and the
                        COUTUREFLOSS studio team.
                      </p>
                      <button
                        onClick={() => setInquirySent(false)}
                        className="mt-4 px-4 py-2 rounded-lg bg-[#400849] text-white text-xs font-semibold"
                      >
                        Submit Another Inquiry
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleInquirySubmit} className="space-y-4 text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="font-semibold text-[#400849] block mb-1">
                            Brand Name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Dior / Forest Essentials"
                            value={inquiryBrand}
                            onChange={e => setInquiryBrand(e.target.value)}
                            className="w-full p-2.5 border border-[#E9DDE8] rounded-lg text-xs focus:ring-2 focus:ring-[#E7B0DE] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="font-semibold text-[#400849] block mb-1">
                            Contact Person
                          </label>
                          <input
                            type="text"
                            placeholder="Your name & title"
                            value={inquiryName}
                            onChange={e => setInquiryName(e.target.value)}
                            className="w-full p-2.5 border border-[#E9DDE8] rounded-lg text-xs focus:ring-2 focus:ring-[#E7B0DE] focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="font-semibold text-[#400849] block mb-1">
                            Business Email *
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="pr@brand.com"
                            value={inquiryEmail}
                            onChange={e => setInquiryEmail(e.target.value)}
                            className="w-full p-2.5 border border-[#E9DDE8] rounded-lg text-xs focus:ring-2 focus:ring-[#E7B0DE] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="font-semibold text-[#400849] block mb-1">
                            Desired Deliverable
                          </label>
                          <select
                            value={inquiryDeliverable}
                            onChange={e => setInquiryDeliverable(e.target.value)}
                            className="w-full p-2.5 border border-[#E9DDE8] rounded-lg text-xs bg-white focus:ring-2 focus:ring-[#E7B0DE] focus:outline-none"
                          >
                            <option>1x Dedicated Instagram Reel</option>
                            <option>Signature Reel + 3x Story Suite</option>
                            <option>3x Instagram Story Set</option>
                            <option>Editorial Carousel Post</option>
                            <option>UGC Video Asset</option>
                            <option>Hosted Luxury Stay Coverage</option>
                            <option>Long-Term Category Ambassadorship</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="font-semibold text-[#400849] block mb-1">
                          Campaign Brief & Key Dates
                        </label>
                        <textarea
                          rows={3}
                          placeholder="Tell us about the launch, desired styling, or timeline..."
                          value={inquiryMessage}
                          onChange={e => setInquiryMessage(e.target.value)}
                          className="w-full p-2.5 border border-[#E9DDE8] rounded-lg text-xs focus:ring-2 focus:ring-[#E7B0DE] focus:outline-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-[#FF5A0A] hover:bg-[#e04e05] text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Collaboration Inquiry</span>
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="text-center pt-8 border-t border-[#E9DDE8] text-xs text-[#806785]">
            <p>© 2026 COUTUREFLOSS Studio. Curated by Sharmistha. All rights reserved.</p>
            <p className="mt-1 text-[11px] text-[#806785]/80">
              Instagram: @couturefloss · 311,000 Avg Reel Views
            </p>
          </footer>
        </div>
      </div>

      {/* CUSTOMIZE KIT MODAL */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 bg-[#400849]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-[#E9DDE8]">
            <div className="flex items-center justify-between pb-4 border-b border-[#E9DDE8]">
              <div>
                <h3 className="font-display font-semibold text-lg text-[#400849]">
                  Customize Media Kit
                </h3>
                <p className="text-xs text-[#806785]">
                  Instant live updates to your verified metrics, bio, rates, and highlights.
                </p>
              </div>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-sm text-[#806785] hover:text-[#400849]"
              >
                ✕
              </button>
            </div>

            {/* Sub-tabs inside modal */}
            <div className="flex border-b border-[#E9DDE8] mt-3 text-xs font-semibold">
              <button
                onClick={() => setEditTab('profile')}
                className={`py-2 px-3 border-b-2 transition-all ${
                  editTab === 'profile'
                    ? 'border-[#400849] text-[#400849]'
                    : 'border-transparent text-[#806785]'
                }`}
              >
                Bio & Vision
              </button>
              <button
                onClick={() => setEditTab('metrics')}
                className={`py-2 px-3 border-b-2 transition-all ${
                  editTab === 'metrics'
                    ? 'border-[#400849] text-[#400849]'
                    : 'border-transparent text-[#806785]'
                }`}
              >
                Audience Metrics
              </button>
              <button
                onClick={() => setEditTab('rates')}
                className={`py-2 px-3 border-b-2 transition-all ${
                  editTab === 'rates'
                    ? 'border-[#400849] text-[#400849]'
                    : 'border-transparent text-[#806785]'
                }`}
              >
                Rates & Pricing
              </button>
              <button
                onClick={() => setEditTab('content')}
                className={`py-2 px-3 border-b-2 transition-all ${
                  editTab === 'content'
                    ? 'border-[#400849] text-[#400849]'
                    : 'border-transparent text-[#806785]'
                }`}
              >
                Add Highlight
              </button>
            </div>

            {/* TAB 1: PROFILE */}
            {editTab === 'profile' && (
              <form onSubmit={handleSaveProfile} className="mt-4 space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-[#400849] block mb-1">Creator Name</label>
                    <input
                      type="text"
                      value={profileForm.name}
                      onChange={e => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs"
                      required
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-[#400849] block mb-1">
                      Instagram Handle
                    </label>
                    <input
                      type="text"
                      value={profileForm.handle}
                      onChange={e => setProfileForm({ ...profileForm, handle: e.target.value })}
                      className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-[#400849] block mb-1">Cover Headline</label>
                  <input
                    type="text"
                    value={headline}
                    onChange={e => setHeadline(e.target.value)}
                    className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#400849] block mb-1">
                    Editorial Biography
                  </label>
                  <textarea
                    rows={4}
                    value={profileForm.bio}
                    onChange={e => setProfileForm({ ...profileForm, bio: e.target.value })}
                    className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-[#400849] block mb-1">Location</label>
                    <input
                      type="text"
                      value={profileForm.location}
                      onChange={e => setProfileForm({ ...profileForm, location: e.target.value })}
                      className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-[#400849] block mb-1">Business Email</label>
                    <input
                      type="email"
                      value={profileForm.businessEmail}
                      onChange={e =>
                        setProfileForm({ ...profileForm, businessEmail: e.target.value })
                      }
                      className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E9DDE8]">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="px-3.5 py-1.5 rounded-lg border border-[#E9DDE8] text-[#806785]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-[#400849] text-white font-semibold"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            )}

            {/* TAB 2: METRICS */}
            {editTab === 'metrics' && (
              <form onSubmit={handleSaveProfile} className="mt-4 space-y-4 text-xs">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="font-semibold text-[#400849] block mb-1">
                      Followers (Display)
                    </label>
                    <input
                      type="text"
                      value={profileForm.followersDisplay}
                      onChange={e =>
                        setProfileForm({ ...profileForm, followersDisplay: e.target.value })
                      }
                      className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-[#400849] block mb-1">
                      Avg Reel Views (Display)
                    </label>
                    <input
                      type="text"
                      value={profileForm.avgReelViewsDisplay}
                      onChange={e =>
                        setProfileForm({ ...profileForm, avgReelViewsDisplay: e.target.value })
                      }
                      className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-[#400849] block mb-1">
                      Engagement Rate (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={profileForm.engagementRate}
                      onChange={e =>
                        setProfileForm({
                          ...profileForm,
                          engagementRate: parseFloat(e.target.value) || 0,
                        })
                      }
                      className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-[#400849] block mb-1">
                      Monthly Impressions
                    </label>
                    <input
                      type="number"
                      value={profileForm.monthlyImpressions}
                      onChange={e =>
                        setProfileForm({
                          ...profileForm,
                          monthlyImpressions: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-[#400849] block mb-1">
                      Average Story Views
                    </label>
                    <input
                      type="number"
                      value={profileForm.avgStoryViews}
                      onChange={e =>
                        setProfileForm({
                          ...profileForm,
                          avgStoryViews: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E9DDE8]">
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-[#400849] text-white font-semibold"
                  >
                    Save Metrics
                  </button>
                </div>
              </form>
            )}

            {/* TAB 3: RATES & PRICING */}
            {editTab === 'rates' && (
              <div className="mt-4 space-y-4 text-xs">
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {rates.map(rate => (
                    <div
                      key={rate.id}
                      className="p-3 rounded-lg border border-[#E9DDE8] bg-[#FFF9F5] flex items-center justify-between"
                    >
                      <div>
                        <p className="font-semibold text-[#400849]">{rate.title}</p>
                        <p className="text-[#806785]">
                          ₹{rate.basePriceINR.toLocaleString()} · ${rate.basePriceUSD.toLocaleString()}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateRate(rate.id, { isPublicInKit: !rate.isPublicInKit })
                          }
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            rate.isPublicInKit
                              ? 'bg-green-100 text-green-800'
                              : 'bg-neutral-100 text-neutral-500'
                          }`}
                        >
                          {rate.isPublicInKit ? 'Public on Kit' : 'Hidden'}
                        </button>
                        <button
                          onClick={() => deleteRate(rate.id)}
                          className="text-[#806785] hover:text-[#FF5A0A]"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add new rate item */}
                <form
                  onSubmit={handleCreateRate}
                  className="pt-3 border-t border-[#E9DDE8] space-y-3"
                >
                  <p className="font-semibold text-[#400849]">Add Service to Rate Card</p>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Service title (e.g. 1x Dedicated Reel)"
                      value={newRateTitle}
                      onChange={e => setNewRateTitle(e.target.value)}
                      className="p-2 border border-[#E9DDE8] rounded-lg text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Short description"
                      value={newRateDesc}
                      onChange={e => setNewRateDesc(e.target.value)}
                      className="p-2 border border-[#E9DDE8] rounded-lg text-xs"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="number"
                      placeholder="Price in INR (₹)"
                      value={newRateINR}
                      onChange={e => setNewRateINR(e.target.value)}
                      className="p-2 border border-[#E9DDE8] rounded-lg text-xs"
                    />
                    <input
                      type="number"
                      placeholder="Price in USD ($)"
                      value={newRateUSD}
                      onChange={e => setNewRateUSD(e.target.value)}
                      className="p-2 border border-[#E9DDE8] rounded-lg text-xs"
                    />
                    <button
                      type="submit"
                      className="p-2 rounded-lg bg-[#400849] text-white font-semibold"
                    >
                      Add Rate
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB 4: ADD PORTFOLIO HIGHLIGHT */}
            {editTab === 'content' && (
              <form onSubmit={handleCreatePortfolio} className="mt-4 space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-[#400849] block mb-1">
                    Content / Campaign Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Glass Skin Barrier Care Masterclass"
                    value={newPortTitle}
                    onChange={e => setNewPortTitle(e.target.value)}
                    className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-semibold text-[#400849] block mb-1">Partner Brand</label>
                    <input
                      type="text"
                      placeholder="e.g. Kama Ayurveda"
                      value={newPortBrand}
                      onChange={e => setNewPortBrand(e.target.value)}
                      className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-[#400849] block mb-1">Category</label>
                    <select
                      value={newPortCat}
                      onChange={e => setNewPortCat(e.target.value as any)}
                      className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs bg-white"
                    >
                      <option>Beauty & Makeup</option>
                      <option>Skincare & Haircare</option>
                      <option>Fashion & Styling</option>
                      <option>Luxury Lifestyle</option>
                      <option>Travel & Hotels</option>
                      <option>Daily Vlogs & Opinions</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="font-semibold text-[#400849] block mb-1">Views</label>
                    <input
                      type="number"
                      value={newPortViews}
                      onChange={e => setNewPortViews(e.target.value)}
                      className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-[#400849] block mb-1">Reach</label>
                    <input
                      type="number"
                      value={newPortReach}
                      onChange={e => setNewPortReach(e.target.value)}
                      className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-[#400849] block mb-1">Engagement</label>
                    <input
                      type="text"
                      value={newPortEngage}
                      onChange={e => setNewPortEngage(e.target.value)}
                      className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-[#400849] block mb-1">
                    Instagram Reel URL
                  </label>
                  <input
                    type="url"
                    value={newPortReelUrl}
                    onChange={e => setNewPortReelUrl(e.target.value)}
                    className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#400849] block mb-1">
                    Case Study Summary & Saves
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Highlight conversion, saves, or trending audio results..."
                    value={newPortSummary}
                    onChange={e => setNewPortSummary(e.target.value)}
                    className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E9DDE8]">
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-[#400849] text-white font-semibold"
                  >
                    Add Highlight to Kit
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
