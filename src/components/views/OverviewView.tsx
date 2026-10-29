import React, { useState } from 'react';
import {
  Users,
  Video,
  Activity,
  Briefcase,
  TrendingUp,
  Edit3,
  Calendar,
  ArrowRight,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Info,
  Clock,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CreatorAvatar, EditorialCoverArtwork } from '../EditorialVisuals';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export const OverviewView: React.FC = () => {
  const {
    profile,
    updateProfile,
    collaborations,
    deliverables,
    setActiveTab,
    currency,
  } = useApp();

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({ ...profile });

  // Filter deals and deliverables
  const activeCollabs = collaborations.filter(
    c => c.status !== 'Paid / Completed' && c.status !== 'Declined'
  );
  const pendingDeliverables = deliverables.filter(d => d.approvalStatus !== 'Approved');

  // Illustrative Reel performance sample data (clearly labeled)
  const recentReelData = [
    { title: 'Kama Barrier', views: 642, reach: 780, saves: 22 },
    { title: 'Saree Draping', views: 489, reach: 590, saves: 19 },
    { title: 'Udaipur Palace', views: 382, reach: 450, saves: 14 },
    { title: 'Bold Autumn Lips', views: 311, reach: 395, saves: 12 },
    { title: 'Trench Lookbook', views: 275, reach: 340, saves: 9 },
    { title: 'Opinion Vlog', views: 520, reach: 630, saves: 16 },
  ];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(profileForm);
    setIsEditingProfile(false);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Editorial Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-[#400849] text-white border border-[#400849]/30 shadow-lg">
        {/* Soft background glow accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E7B0DE]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-[#FF5A0A]/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10">
          {/* Typographic Story */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E7B0DE]/20 text-[#E7B0DE] text-xs font-semibold tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A0A]" />
              COUTUREFLOSS · Creator Studio
            </div>

            <h1 className="font-serif italic text-3xl sm:text-5xl lg:text-6xl text-white font-medium tracking-tight leading-[1.08] text-balance">
              Your influence. <br />
              <span className="text-[#E7B0DE] font-normal not-italic font-display">
                Your next era.
              </span>
            </h1>

            <p className="font-sans text-sm sm:text-base text-white/80 max-w-xl font-normal leading-relaxed">
              Your creator business, beautifully in focus. Manage your luxury media kit, campaign
              deliverables, brand rate cards, and bespoke outreach in one editorial workspace.
            </p>

            {/* Profile Identity Bar */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs">
              <div className="flex items-center gap-2">
                <CreatorAvatar src={profile.avatarUrl} alt={profile.name} size="sm" />
                <div>
                  <p className="font-semibold text-white">{profile.name}</p>
                  <p className="text-[#E7B0DE]">{profile.handle}</p>
                </div>
              </div>

              <span className="text-white/30 hidden sm:inline">|</span>

              <div className="text-white/70">
                <span className="text-white font-medium">{profile.location}</span>
                <span className="mx-2 text-white/40">·</span>
                <span>Beauty • Fashion • Lifestyle • Travel</span>
              </div>

              <button
                onClick={() => {
                  setProfileForm({ ...profile });
                  setIsEditingProfile(true);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-all"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#E7B0DE]" />
                <span>Edit Profile</span>
              </button>
            </div>
          </div>

          {/* Editorial Visual Artwork Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-xl overflow-hidden border border-white/20 shadow-2xl h-64 sm:h-72">
              <EditorialCoverArtwork className="h-full w-full" />
              <div className="absolute bottom-3 left-3 right-3 p-3 bg-[#400849]/80 backdrop-blur-md rounded-lg text-white border border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-[#E7B0DE] font-semibold">
                    Current Milestone
                  </p>
                  <p className="text-xs font-serif italic text-white">
                    311,000 Avg Views / Reel
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('media-kit')}
                  className="px-2.5 py-1 rounded bg-[#FF5A0A] hover:bg-[#e04e05] text-white text-[11px] font-semibold flex items-center gap-1 transition-colors"
                >
                  <span>Edit Kit</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5 KPI CARDS with Editable & Authenticity Indicators */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-display font-semibold text-lg text-[#400849]">
              Creator Performance Core
            </h2>
            <p className="text-xs text-[#806785]">
              Metrics are user-controlled and transparently labeled.
            </p>
          </div>
          <button
            onClick={() => {
              setProfileForm({ ...profile });
              setIsEditingProfile(true);
            }}
            className="text-xs font-semibold text-[#FF5A0A] hover:underline flex items-center gap-1"
          >
            <span>Update Metrics</span>
            <Edit3 className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Card 1: Instagram Followers (40,000+) */}
          <div className="p-4 rounded-xl bg-white border border-[#E9DDE8] shadow-xs hover:border-[#E7B0DE] transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold tracking-wider uppercase text-[#806785]">
                Instagram Followers
              </span>
              <div className="p-1.5 rounded-lg bg-[#E7B0DE]/20 text-[#400849]">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-display font-bold text-2xl text-[#400849] tabular-nums">
                {profile.followersDisplay || `${profile.followers.toLocaleString()}+`}
              </span>
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-[11px] text-[#400849] font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#FF5A0A]" />
              <span>User-provided baseline</span>
            </div>
          </div>

          {/* Card 2: Average Reel Views (311,000) */}
          <div className="p-4 rounded-xl bg-white border border-[#E9DDE8] shadow-xs hover:border-[#E7B0DE] transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold tracking-wider uppercase text-[#806785]">
                Avg Reel Views
              </span>
              <div className="p-1.5 rounded-lg bg-[#FF5A0A]/10 text-[#FF5A0A]">
                <Video className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-display font-bold text-2xl text-[#400849] tabular-nums">
                {profile.avgReelViewsDisplay || profile.avgReelViews.toLocaleString()}
              </span>
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-[11px] text-[#400849] font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#FF5A0A]" />
              <span>User-provided baseline</span>
            </div>
          </div>

          {/* Card 3: Engagement Rate (Editable / Unverified) */}
          <div className="p-4 rounded-xl bg-white border border-[#E9DDE8] shadow-xs hover:border-[#E7B0DE] transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold tracking-wider uppercase text-[#806785]">
                Engagement Rate
              </span>
              <div className="p-1.5 rounded-lg bg-[#E7B0DE]/20 text-[#400849]">
                <Activity className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-display font-bold text-2xl text-[#400849] tabular-nums">
                {profile.engagementRate}%
              </span>
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-[11px] text-[#806785]">
              <Info className="w-3.5 h-3.5 text-[#806785]" />
              <span>Editable · Unverified</span>
            </div>
          </div>

          {/* Card 4: Active Collaborations */}
          <div className="p-4 rounded-xl bg-white border border-[#E9DDE8] shadow-xs hover:border-[#E7B0DE] transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold tracking-wider uppercase text-[#806785]">
                Active Collabs
              </span>
              <div className="p-1.5 rounded-lg bg-[#F5E8F5] text-[#400849]">
                <Briefcase className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-display font-bold text-2xl text-[#400849] tabular-nums">
                {activeCollabs.length}
              </span>
              <span className="text-xs text-[#806785]">deals</span>
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-[11px] text-[#400849] font-medium">
              <span className="w-2 h-2 rounded-full bg-[#E7B0DE]" />
              <span>Live CRM pipeline</span>
            </div>
          </div>

          {/* Card 5: Monthly Reach */}
          <div className="p-4 rounded-xl bg-white border border-[#E9DDE8] shadow-xs hover:border-[#E7B0DE] transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold tracking-wider uppercase text-[#806785]">
                Monthly Reach
              </span>
              <div className="p-1.5 rounded-lg bg-[#FFE4D5] text-[#FF5A0A]">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-display font-bold text-2xl text-[#400849] tabular-nums">
                {(profile.monthlyReach / 1000000).toFixed(2)}M
              </span>
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-[11px] text-[#806785]">
              <Info className="w-3.5 h-3.5 text-[#806785]" />
              <span>Editable · Unverified</span>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Visualization & Recent Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Recent Reel Performance Visualizer (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-[#E9DDE8] p-5 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-semibold text-base text-[#400849]">
                  Recent Reel Reach & Velocity
                </h3>
                <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-[#F5E8F5] text-[#400849] border border-[#E9DDE8]">
                  Illustrative Sample Data
                </span>
              </div>
              <p className="text-xs text-[#806785] mt-0.5">
                Views in thousands (K). Connect Meta Insights via API in Settings when ready.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('analytics')}
              className="text-xs font-semibold text-[#400849] hover:text-[#FF5A0A] flex items-center gap-1"
            >
              <span>Full Analytics</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={recentReelData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="reelGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E7B0DE" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#E7B0DE" stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient id="reachGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF5A0A" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#FF5A0A" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="title" tick={{ fontSize: 11, fill: '#806785' }} />
                <YAxis tick={{ fontSize: 11, fill: '#806785' }} unit="k" />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-[#400849] text-white p-2.5 rounded-lg text-xs shadow-lg">
                          <p className="font-semibold text-[#E7B0DE]">{payload[0].payload.title}</p>
                          <p className="text-white">
                            Views: {payload[0].payload.views.toLocaleString()}K
                          </p>
                          <p className="text-[#FFE4D5]">
                            Reach: {payload[0].payload.reach.toLocaleString()}K
                          </p>
                          <p className="text-white/70">
                            Saves: {payload[0].payload.saves.toLocaleString()}K
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="views"
                  stroke="#400849"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#reelGradient)"
                />
                <Area
                  type="monotone"
                  dataKey="reach"
                  stroke="#FF5A0A"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  fillOpacity={1}
                  fill="url(#reachGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-center gap-6 mt-2 pt-3 border-t border-[#E9DDE8] text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#E7B0DE] border border-[#400849]" />
              <span className="text-[#400849] font-medium">Views (K)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-1 bg-[#FF5A0A]" />
              <span className="text-[#400849] font-medium">Total Reach (K)</span>
            </div>
          </div>
        </div>

        {/* Right: Urgent Action Center (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Active Campaigns Card */}
          <div className="bg-white rounded-xl border border-[#E9DDE8] p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display font-semibold text-base text-[#400849]">
                Campaign Pipeline
              </h3>
              <button
                onClick={() => setActiveTab('collaborations')}
                className="text-xs font-semibold text-[#FF5A0A] hover:underline"
              >
                View All ({collaborations.length})
              </button>
            </div>

            <div className="space-y-2.5">
              {activeCollabs.slice(0, 3).map(c => (
                <div
                  key={c.id}
                  onClick={() => setActiveTab('collaborations')}
                  className="p-3 rounded-lg border border-[#E9DDE8] hover:border-[#E7B0DE] bg-[#FFF9F5]/40 hover:bg-[#FFF9F5] cursor-pointer transition-all flex items-center justify-between"
                >
                  <div>
                    <p className="text-xs font-semibold text-[#400849]">{c.brandName}</p>
                    <p className="text-[11px] text-[#806785] truncate max-w-[180px]">
                      {c.deliverables.join(' · ')}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        c.status === 'In Production'
                          ? 'bg-[#E7B0DE]/40 text-[#400849]'
                          : c.status === 'Confirmed'
                          ? 'bg-[#400849] text-white'
                          : 'bg-[#FFE4D5] text-[#FF5A0A]'
                      }`}
                    >
                      {c.status}
                    </span>
                    <p className="text-xs font-semibold text-[#400849] mt-0.5 tabular-nums">
                      {currency === 'INR' ? `₹${c.proposedAmount.toLocaleString()}` : `$${Math.round(c.proposedAmount / 82).toLocaleString()}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Deliverables Card */}
          <div className="bg-white rounded-xl border border-[#E9DDE8] p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display font-semibold text-base text-[#400849]">
                Pending Deliverables
              </h3>
              <button
                onClick={() => setActiveTab('deliverables')}
                className="text-xs font-semibold text-[#400849] hover:underline"
              >
                Calendar
              </button>
            </div>

            <div className="space-y-2.5">
              {pendingDeliverables.slice(0, 3).map(d => (
                <div
                  key={d.id}
                  onClick={() => setActiveTab('deliverables')}
                  className={`p-3 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${
                    d.isOverdue
                      ? 'border-[#FF5A0A] bg-[#FFE4D5]/20'
                      : 'border-[#E9DDE8] hover:border-[#E7B0DE] bg-white'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    {d.isOverdue ? (
                      <Clock className="w-4 h-4 text-[#FF5A0A] shrink-0 mt-0.5" />
                    ) : (
                      <Calendar className="w-4 h-4 text-[#806785] shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="text-xs font-semibold text-[#400849]">{d.deliverableName}</p>
                      <p className="text-[11px] text-[#806785]">
                        {d.brand} · Due {d.dueDate}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                      d.isOverdue ? 'bg-[#FF5A0A] text-white' : 'bg-[#F5E8F5] text-[#400849]'
                    }`}
                  >
                    {d.isOverdue ? 'Action Needed' : d.editingStatus}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditingProfile && (
        <div className="fixed inset-0 z-50 bg-[#400849]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-[#E9DDE8]">
            <div className="flex items-center justify-between pb-4 border-b border-[#E9DDE8]">
              <div>
                <h3 className="font-display font-semibold text-lg text-[#400849]">
                  Edit Creator Profile
                </h3>
                <p className="text-xs text-[#806785]">
                  Update your public media kit details and performance benchmarks.
                </p>
              </div>
              <button
                onClick={() => setIsEditingProfile(false)}
                className="text-[#806785] hover:text-[#400849] text-sm p-1"
              >
                ✕
              </button>
            </div>

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
                  <label className="font-semibold text-[#400849] block mb-1">Instagram Handle</label>
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
                <label className="font-semibold text-[#400849] block mb-1">Title / Headline</label>
                <input
                  type="text"
                  value={profileForm.title}
                  onChange={e => setProfileForm({ ...profileForm, title: e.target.value })}
                  className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-[#400849] block mb-1">Bio / Editorial Summary</label>
                <textarea
                  rows={3}
                  value={profileForm.bio}
                  onChange={e => setProfileForm({ ...profileForm, bio: e.target.value })}
                  className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs"
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
                    onChange={e => setProfileForm({ ...profileForm, businessEmail: e.target.value })}
                    className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs"
                    required
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-[#E9DDE8]">
                <h4 className="font-semibold text-[#400849] mb-2">Metrics & Benchmarks</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="font-medium text-[#806785] block mb-1">
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
                    <label className="font-medium text-[#806785] block mb-1">
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
                    <label className="font-medium text-[#806785] block mb-1">
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
              </div>

              <div>
                <label className="font-semibold text-[#400849] block mb-1">
                  Custom Profile Avatar URL (optional)
                </label>
                <input
                  type="url"
                  placeholder="https://... or leave empty for luxury monogram"
                  value={profileForm.avatarUrl}
                  onChange={e => setProfileForm({ ...profileForm, avatarUrl: e.target.value })}
                  className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E9DDE8]">
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(false)}
                  className="px-4 py-2 rounded-lg border border-[#E9DDE8] text-xs font-semibold text-[#806785] hover:text-[#400849]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#400849] text-white text-xs font-semibold hover:bg-[#2e0535] shadow-xs"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
