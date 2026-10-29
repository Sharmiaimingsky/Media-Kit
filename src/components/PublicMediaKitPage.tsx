import React, { useState } from 'react';
import {
  ArrowLeft,
  Download,
  Mail,
  Instagram,
  MapPin,
  CheckCircle2,
  Sparkles,
  Send,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CreatorAvatar, EditorialCoverArtwork, EditorialCardIllustration } from './EditorialVisuals';

export const PublicMediaKitPage: React.FC = () => {
  const {
    profile,
    rates,
    portfolio,
    addCollaboration,
    currency,
    setActiveTab,
  } = useApp();

  const [inquiryBrand, setInquiryBrand] = useState('');
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryDeliverables, setInquiryDeliverables] = useState('1x Dedicated Instagram Reel');
  const [inquiryBudget, setInquiryBudget] = useState('150000');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryBrand || !inquiryEmail) return;

    // Add to CRM pipeline as new Lead!
    addCollaboration({
      brandName: inquiryBrand,
      brandCategory: 'Luxury Brand Inbound',
      contactPerson: inquiryName || 'PR Manager',
      contactInfo: inquiryEmail,
      channel: 'Website Form',
      campaignType: 'paid',
      proposedAmount: parseInt(inquiryBudget) || 150000,
      finalAmount: 0,
      currency: currency,
      pitchDate: new Date().toISOString().split('T')[0],
      followUpDate: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0],
      deadline: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      deliverables: [inquiryDeliverables],
      status: 'Lead',
      notes: `Inbound inquiry from Public Media Kit. Message: "${inquiryMessage}"`,
      links: '',
    });

    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FFF9F5] text-[#400849] font-sans antialiased">
      {/* Editorial Floating Bar for Creator Studio Switcher */}
      <div className="no-print sticky top-0 z-50 bg-[#400849]/95 backdrop-blur-md text-white py-2.5 px-4 sm:px-8 border-b border-white/10 flex items-center justify-between text-xs">
        <button
          onClick={() => setActiveTab('overview')}
          className="flex items-center gap-1.5 font-semibold text-[#E7B0DE] hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit to Creator Studio Dashboard</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-white/70">
            Public View Preview · @couturefloss
          </span>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#FF5A0A] hover:bg-[#e04e05] text-white font-semibold transition-all shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* Main Luxury Magazine Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-16">
        {/* HERO / VOGUE EDITORIAL COVER */}
        <section className="relative rounded-3xl overflow-hidden bg-[#400849] text-white p-8 sm:p-16 shadow-2xl border border-[#400849]/40">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#E7B0DE]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FF5A0A]/20 rounded-full blur-3xl" />

          <div className="relative z-10 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-[#E7B0DE] text-xs font-semibold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A0A]" />
              Official Brand Partnership Portfolio
            </div>

            <h1 className="font-serif italic text-4xl sm:text-7xl font-normal tracking-tight text-white leading-none">
              COUTUREFLOSS
            </h1>

            <p className="font-display text-sm sm:text-lg tracking-[0.25em] uppercase text-[#E7B0DE] font-semibold">
              Sharmistha · High-Fashion, Beauty & Experiential Travel
            </p>

            <p className="font-serif italic text-xl sm:text-2xl text-[#FFE4D5] max-w-2xl mx-auto font-light leading-relaxed">
              “Beauty, style & stories that move culture.”
            </p>

            {/* Quick stats strip */}
            <div className="pt-6 border-t border-white/15 grid grid-cols-3 max-w-xl mx-auto gap-4 text-center">
              <div>
                <p className="font-display font-bold text-2xl sm:text-3xl text-[#E7B0DE] tabular-nums">
                  {profile.followersDisplay}
                </p>
                <p className="text-[11px] text-white/70 uppercase tracking-wider mt-0.5">
                  Followers
                </p>
              </div>
              <div>
                <p className="font-display font-bold text-2xl sm:text-3xl text-[#FF5A0A] tabular-nums">
                  {profile.avgReelViewsDisplay}
                </p>
                <p className="text-[11px] text-white/70 uppercase tracking-wider mt-0.5">
                  Avg Reel Views
                </p>
              </div>
              <div>
                <p className="font-display font-bold text-2xl sm:text-3xl text-white tabular-nums">
                  {profile.engagementRate}%
                </p>
                <p className="text-[11px] text-white/70 uppercase tracking-wider mt-0.5">
                  Engagement
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 1: ABOUT SHARMISTHA */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-2xl border border-[#E9DDE8] p-6 sm:p-12 shadow-xs">
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
            <a
              href={profile.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5E8F5] text-[#400849] text-xs font-semibold hover:bg-[#E7B0DE]/40 transition-colors"
            >
              <Instagram className="w-3.5 h-3.5 text-[#FF5A0A]" />
              <span>Visit Instagram</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>

          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs font-display font-semibold tracking-widest text-[#FF5A0A] uppercase">
              The Creative Direction
            </span>
            <h2 className="font-serif italic text-2xl sm:text-3xl text-[#400849] leading-snug">
              Bridging avant-garde runway aesthetics with wearable glamour.
            </h2>
            <p className="text-sm text-[#400849]/90 leading-relaxed">{profile.bio}</p>
            <div className="p-4 rounded-xl bg-[#FFF9F5] border border-[#E9DDE8] text-xs space-y-1">
              <p className="font-bold text-[#400849]">Audience Value Proposition:</p>
              <p className="text-[#806785] leading-relaxed">{profile.positioning}</p>
            </div>
          </div>
        </section>

        {/* SECTION 2: AUDIENCE DEMOGRAPHICS & BENCHMARKS */}
        <section className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-display font-semibold tracking-widest text-[#FF5A0A] uppercase">
              Audience Analysis
            </span>
            <h2 className="font-serif italic text-3xl text-[#400849] mt-1">
              Cosmopolitan & High Disposable Income
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-[#E9DDE8] text-center shadow-xs">
              <p className="text-[11px] font-semibold text-[#806785] uppercase tracking-wider">
                Total Community
              </p>
              <p className="font-display font-bold text-2xl sm:text-3xl text-[#400849] mt-1 tabular-nums">
                {profile.followersDisplay}
              </p>
              <p className="text-[11px] text-[#400849] font-medium mt-1">Authentic Followers</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FFE4D5]/30 border border-[#FF5A0A]/30 text-center shadow-xs">
              <p className="text-[11px] font-semibold text-[#806785] uppercase tracking-wider">
                Average Reel Views
              </p>
              <p className="font-display font-bold text-2xl sm:text-3xl text-[#FF5A0A] mt-1 tabular-nums">
                {profile.avgReelViewsDisplay}
              </p>
              <p className="text-[11px] text-[#400849] font-medium mt-1">Verified Benchmark</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#E9DDE8] text-center shadow-xs">
              <p className="text-[11px] font-semibold text-[#806785] uppercase tracking-wider">
                Monthly Impressions
              </p>
              <p className="font-display font-bold text-2xl sm:text-3xl text-[#400849] mt-1 tabular-nums">
                {(profile.monthlyImpressions / 1000000).toFixed(1)}M
              </p>
              <p className="text-[11px] text-[#806785] mt-1">Estimated Reach</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#E9DDE8] text-center shadow-xs">
              <p className="text-[11px] font-semibold text-[#806785] uppercase tracking-wider">
                Core Gender
              </p>
              <p className="font-display font-bold text-2xl sm:text-3xl text-[#400849] mt-1 tabular-nums">
                78%
              </p>
              <p className="text-[11px] text-[#806785] mt-1">Women (Ages 22-38)</p>
            </div>
          </div>
        </section>

        {/* SECTION 3: EDITORIAL PILLARS */}
        <section className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-display font-semibold tracking-widest text-[#FF5A0A] uppercase">
              Curated Content Verticals
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

        {/* SECTION 4: SELECTED PREVIOUS PARTNERSHIPS */}
        <section className="bg-white rounded-2xl border border-[#E9DDE8] p-8 sm:p-12 shadow-xs space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-display font-semibold tracking-widest text-[#FF5A0A] uppercase">
              Selected Collaborations
            </span>
            <h2 className="font-serif italic text-3xl text-[#400849] mt-1">
              Trusted by Premier Brands
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 items-center text-center">
            {['Estée Lauder', 'The Oberoi Hotels', 'Nicobar', 'Kama Ayurveda', 'Fenty Beauty'].map(
              brand => (
                <div
                  key={brand}
                  className="p-4 rounded-xl bg-[#FFF9F5] border border-[#E9DDE8] font-serif italic text-sm sm:text-base font-semibold text-[#400849]"
                >
                  {brand}
                </div>
              )
            )}
          </div>

          {/* Case Studies */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4">
            {portfolio.slice(0, 3).map(item => (
              <div
                key={item.id}
                className="p-5 rounded-xl border border-[#E9DDE8] bg-[#FFF9F5] flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-[#400849]">{item.brand}</span>
                    <span className="text-[#806785]">{item.category}</span>
                  </div>
                  <h4 className="font-serif italic text-base font-medium text-[#400849] leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#806785] mt-2 line-clamp-3">
                    {item.caseStudySummary}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E9DDE8] flex items-center justify-between text-xs font-display">
                  <div>
                    <span className="text-[10px] text-[#806785] uppercase block">Views</span>
                    <span className="font-bold text-[#FF5A0A] text-sm tabular-nums">
                      {item.views.toLocaleString()}
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

        {/* SECTION 5: CURATED RATES */}
        <section className="space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-xs font-display font-semibold tracking-widest text-[#FF5A0A] uppercase">
                Investment Structure
              </span>
              <h2 className="font-serif italic text-3xl text-[#400849] mt-1">
                Standard Collaboration Rates
              </h2>
            </div>
            <span className="text-xs text-[#806785]">
              Base rates include 4K production and standard in-feed permanence.
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

        {/* SECTION 6: DIRECT INQUIRY & BOOKING FORM */}
        <section id="inquiry" className="bg-[#400849] text-white rounded-3xl p-8 sm:p-14 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-display font-semibold tracking-widest text-[#E7B0DE] uppercase">
                Reserve Collaboration Slot
              </span>
              <h2 className="font-serif italic text-3xl sm:text-4xl text-white font-medium leading-snug">
                Let’s create something unforgettable.
              </h2>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-normal">
                Submissions are reviewed directly by Sharmistha and our studio brand team within 24
                business hours.
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
              {submitted ? (
                <div className="text-center py-10 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#E7B0DE]/40 text-[#400849] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6 text-[#FF5A0A]" />
                  </div>
                  <h3 className="font-serif italic text-2xl font-semibold text-[#400849]">
                    Inquiry Received
                  </h3>
                  <p className="text-xs text-[#806785] max-w-sm mx-auto leading-relaxed">
                    Thank you! Your campaign proposal has been added directly to our creator
                    pipeline. Sharmistha will respond with a tailored moodboard.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-4 py-2 rounded-lg bg-[#400849] text-white text-xs font-semibold"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-semibold text-[#400849] block mb-1">Brand Name *</label>
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
                        value={inquiryDeliverables}
                        onChange={e => setInquiryDeliverables(e.target.value)}
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
                      Campaign Brief & Timeline
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Share details on your product launch, desired aesthetic, or upcoming key dates..."
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
        </section>

        {/* Footer */}
        <footer className="text-center py-8 border-t border-[#E9DDE8] text-xs text-[#806785]">
          <p>© 2026 COUTUREFLOSS Studio. Curated by Sharmistha. All rights reserved.</p>
          <p className="mt-1 text-[11px] text-[#806785]/80">
            Instagram: @couturefloss · 311,000 Avg Reel Views
          </p>
        </footer>
      </main>
    </div>
  );
};
