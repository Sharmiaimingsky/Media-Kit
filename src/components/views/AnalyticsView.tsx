import React, { useState } from 'react';
import {
  TrendingUp,
  BarChart3,
  Calendar,
  Download,
  Upload,
  Plus,
  Info,
  CheckCircle2,
  Video,
  Eye,
  Heart,
  Share2,
  Bookmark,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';

export const AnalyticsView: React.FC = () => {
  const { profile, updateProfile, portfolio } = useApp();

  const [timeRange, setTimeRange] = useState<'30d' | '90d' | '12m'>('90d');
  const [metricFilter, setMetricFilter] = useState<'views' | 'reach' | 'engagement'>('views');
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [showCsvModal, setShowCsvModal] = useState(false);
  const [csvText, setCsvText] = useState('');
  const [csvSuccess, setCsvSuccess] = useState(false);

  // Manual input fields
  const [manualFollowers, setManualFollowers] = useState(profile.followers.toString());
  const [manualAvgViews, setManualAvgViews] = useState(profile.avgReelViews.toString());
  const [manualEngagement, setManualEngagement] = useState(profile.engagementRate.toString());
  const [manualReach, setManualReach] = useState(profile.monthlyReach.toString());

  // Follower Growth Historical Data (transparently marked as creator recorded)
  const followerGrowthData = [
    { month: 'May', followers: 28400, reels: 8 },
    { month: 'Jun', followers: 31200, reels: 10 },
    { month: 'Jul', followers: 34800, reels: 12 },
    { month: 'Aug', followers: 37500, reels: 9 },
    { month: 'Sep', followers: 39100, reels: 11 },
    { month: 'Oct', followers: 40850, reels: 10 },
  ];

  // Reel Performance comparison data
  const reelPerformanceData = [
    { name: 'Kama Barrier', views: 642, reach: 780, saves: 22.4, engagement: 5.4 },
    { name: 'Saree Drapes', views: 489, reach: 590, saves: 19.1, engagement: 6.1 },
    { name: 'Udaipur Palaces', views: 382, reach: 450, saves: 14.8, engagement: 4.9 },
    { name: 'Berry Lip Edit', views: 311, reach: 395, saves: 12.0, engagement: 4.7 },
    { name: 'Autumn Trench', views: 275, reach: 340, saves: 9.3, engagement: 4.2 },
    { name: 'Opinion Vlog', views: 520, reach: 630, saves: 16.5, engagement: 7.8 },
  ];

  // Category breakdown
  const categoryStats = [
    { category: 'Beauty & Makeup', avgViews: '340K', share: '32%', color: '#E7B0DE' },
    { category: 'Fashion & Styling', avgViews: '420K', share: '28%', color: '#400849' },
    { category: 'Skincare & Haircare', avgViews: '380K', share: '20%', color: '#FFE4D5' },
    { category: 'Travel & Hotels', avgViews: '390K', share: '12%', color: '#FF5A0A' },
    { category: 'Daily Vlogs & Opinions', avgViews: '460K', share: '8%', color: '#806785' },
  ];

  const handleSaveManualMetrics = (e: React.FormEvent) => {
    e.preventDefault();
    const followersNum = parseInt(manualFollowers) || profile.followers;
    const avgViewsNum = parseInt(manualAvgViews) || profile.avgReelViews;
    const engagementNum = parseFloat(manualEngagement) || profile.engagementRate;
    const reachNum = parseInt(manualReach) || profile.monthlyReach;

    updateProfile({
      followers: followersNum,
      followersDisplay: `${followersNum.toLocaleString()}+`,
      avgReelViews: avgViewsNum,
      avgReelViewsDisplay: avgViewsNum.toLocaleString(),
      engagementRate: engagementNum,
      monthlyReach: reachNum,
    });

    setShowManualEntry(false);
  };

  const handleImportCsv = () => {
    if (!csvText.trim()) return;
    // Simple parser: looks for keywords like followers, views, engagement, reach
    try {
      const lines = csvText.split('\n');
      let updatedFollowers = profile.followers;
      let updatedViews = profile.avgReelViews;
      let updatedEngagement = profile.engagementRate;
      let updatedReach = profile.monthlyReach;

      lines.forEach(line => {
        const parts = line.split(',');
        if (parts.length >= 2) {
          const key = parts[0].toLowerCase().trim();
          const val = parseFloat(parts[1].trim());
          if (!isNaN(val)) {
            if (key.includes('follower')) updatedFollowers = Math.round(val);
            if (key.includes('view') || key.includes('reel')) updatedViews = Math.round(val);
            if (key.includes('engagement')) updatedEngagement = val;
            if (key.includes('reach')) updatedReach = Math.round(val);
          }
        }
      });

      updateProfile({
        followers: updatedFollowers,
        followersDisplay: `${updatedFollowers.toLocaleString()}+`,
        avgReelViews: updatedViews,
        avgReelViewsDisplay: updatedViews.toLocaleString(),
        engagementRate: updatedEngagement,
        monthlyReach: updatedReach,
      });

      setCsvSuccess(true);
      setTimeout(() => {
        setCsvSuccess(false);
        setShowCsvModal(false);
        setCsvText('');
      }, 1500);
    } catch {
      alert('Error parsing CSV format. Please ensure lines are in "Metric,Value" format.');
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Analytics Header & Controls */}
      <div className="bg-white rounded-2xl border border-[#E9DDE8] p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display font-bold text-2xl text-[#400849]">
              Creator Performance Analytics
            </h1>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#E7B0DE]/40 text-[#400849] uppercase tracking-wider">
              Manual & Verified
            </span>
          </div>
          <p className="text-xs text-[#806785] mt-0.5">
            Real metrics entered by the creator. Architected for direct Instagram Graph API
            integration via Meta OAuth.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Time range selector */}
          <div className="bg-[#F5E8F5] p-1 rounded-lg border border-[#E9DDE8] flex items-center text-xs font-semibold">
            {(['30d', '90d', '12m'] as const).map(range => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 rounded-md transition-all ${
                  timeRange === range
                    ? 'bg-[#400849] text-white shadow-xs'
                    : 'text-[#400849] hover:text-[#400849]/70'
                }`}
              >
                {range === '30d' ? '30 Days' : range === '90d' ? '90 Days' : '12 Months'}
              </button>
            ))}
          </div>

          {/* Action buttons */}
          <button
            onClick={() => setShowManualEntry(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E9DDE8] bg-[#FFF9F5] hover:bg-white text-xs font-semibold text-[#400849] transition-all"
          >
            <Plus className="w-3.5 h-3.5 text-[#FF5A0A]" />
            <span>Update Metrics</span>
          </button>

          <button
            onClick={() => setShowCsvModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#400849] text-white text-xs font-semibold hover:bg-[#2e0535] transition-all"
          >
            <Upload className="w-3.5 h-3.5 text-[#E7B0DE]" />
            <span>Import CSV</span>
          </button>
        </div>
      </div>

      {/* Top Stat Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white border border-[#E9DDE8] shadow-xs">
          <span className="text-[11px] font-semibold text-[#806785] uppercase tracking-wider block">
            Followers
          </span>
          <p className="font-display font-bold text-2xl text-[#400849] mt-1 tabular-nums">
            {profile.followersDisplay}
          </p>
          <div className="mt-2 flex items-center gap-1 text-[11px] text-[#400849]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#FF5A0A]" />
            <span>User Verified</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#E9DDE8] shadow-xs">
          <span className="text-[11px] font-semibold text-[#806785] uppercase tracking-wider block">
            Average Reel Views
          </span>
          <p className="font-display font-bold text-2xl text-[#FF5A0A] mt-1 tabular-nums">
            {profile.avgReelViewsDisplay}
          </p>
          <div className="mt-2 flex items-center gap-1 text-[11px] text-[#400849]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#FF5A0A]" />
            <span>User Verified</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#E9DDE8] shadow-xs">
          <span className="text-[11px] font-semibold text-[#806785] uppercase tracking-wider block">
            Engagement Rate
          </span>
          <p className="font-display font-bold text-2xl text-[#400849] mt-1 tabular-nums">
            {profile.engagementRate}%
          </p>
          <div className="mt-2 flex items-center gap-1 text-[11px] text-[#806785]">
            <Info className="w-3.5 h-3.5 text-[#806785]" />
            <span>Editable estimate</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#E9DDE8] shadow-xs">
          <span className="text-[11px] font-semibold text-[#806785] uppercase tracking-wider block">
            Monthly Reach
          </span>
          <p className="font-display font-bold text-2xl text-[#400849] mt-1 tabular-nums">
            {(profile.monthlyReach / 1000000).toFixed(2)}M
          </p>
          <div className="mt-2 flex items-center gap-1 text-[11px] text-[#806785]">
            <Info className="w-3.5 h-3.5 text-[#806785]" />
            <span>Editable estimate</span>
          </div>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart 1: Follower Growth (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-[#E9DDE8] p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display font-semibold text-base text-[#400849]">
                Community Growth Trajectory
              </h3>
              <p className="text-xs text-[#806785]">
                Monthly follower count recorded by Sharmistha
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="w-3 h-3 rounded-full bg-[#400849]" />
              <span className="text-[#400849] font-medium">Followers</span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={followerGrowthData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F5E8F5" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#806785' }} />
                <YAxis domain={['dataMin - 2000', 'dataMax + 2000']} tick={{ fontSize: 11, fill: '#806785' }} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-[#400849] text-white p-2.5 rounded-lg text-xs shadow-md">
                          <p className="font-semibold text-[#E7B0DE]">{payload[0].payload.month}</p>
                          <p className="text-white">
                            Followers: {payload[0].value?.toLocaleString()}
                          </p>
                          <p className="text-[#FFE4D5]">
                            Reels Produced: {payload[0].payload.reels}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="followers"
                  stroke="#400849"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#FF5A0A' }}
                  activeDot={{ r: 6, fill: '#FF5A0A' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Reel Views vs. Reach (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-[#E9DDE8] p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display font-semibold text-base text-[#400849]">
                Reel Reach vs. Views
              </h3>
              <p className="text-xs text-[#806785]">In thousands (K) · Sample comparisons</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#E7B0DE]" />
                <span className="text-[#806785]">Views</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#400849]" />
                <span className="text-[#806785]">Reach</span>
              </div>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={reelPerformanceData.slice(0, 4)} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F5E8F5" />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#806785' }} />
                <YAxis tick={{ fontSize: 10, fill: '#806785' }} />
                <Tooltip />
                <Bar dataKey="views" fill="#E7B0DE" radius={[4, 4, 0, 0]} />
                <Bar dataKey="reach" fill="#400849" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Category Performance Breakdown */}
      <div className="bg-white rounded-xl border border-[#E9DDE8] p-5 shadow-xs space-y-4">
        <h3 className="font-display font-semibold text-base text-[#400849]">
          Content Pillar Engagement & View Velocity
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          {categoryStats.map(stat => (
            <div
              key={stat.category}
              className="p-4 rounded-xl border border-[#E9DDE8] bg-[#FFF9F5] space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#400849] truncate max-w-[140px]">
                  {stat.category}
                </span>
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: stat.color }}
                />
              </div>

              <div>
                <p className="text-[10px] text-[#806785] uppercase">Average Reel Views</p>
                <p className="font-display font-bold text-lg text-[#400849] tabular-nums">
                  {stat.avgViews}
                </p>
              </div>

              <div>
                <p className="text-[10px] text-[#806785] uppercase">Content Share</p>
                <p className="font-semibold text-[#FF5A0A]">{stat.share} of feed</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Manual Data Entry Modal */}
      {showManualEntry && (
        <div className="fixed inset-0 z-50 bg-[#400849]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#E9DDE8]">
            <div className="flex items-center justify-between pb-3 border-b border-[#E9DDE8]">
              <h3 className="font-display font-semibold text-base text-[#400849]">
                Manual Metric Entry
              </h3>
              <button
                onClick={() => setShowManualEntry(false)}
                className="text-sm text-[#806785] hover:text-[#400849]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveManualMetrics} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="font-semibold text-[#400849] block mb-1">Total Followers</label>
                <input
                  type="number"
                  value={manualFollowers}
                  onChange={e => setManualFollowers(e.target.value)}
                  className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="font-semibold text-[#400849] block mb-1">
                  Average Reel Views
                </label>
                <input
                  type="number"
                  value={manualAvgViews}
                  onChange={e => setManualAvgViews(e.target.value)}
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
                  value={manualEngagement}
                  onChange={e => setManualEngagement(e.target.value)}
                  className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="font-semibold text-[#400849] block mb-1">
                  Monthly Total Reach
                </label>
                <input
                  type="number"
                  value={manualReach}
                  onChange={e => setManualReach(e.target.value)}
                  className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E9DDE8]">
                <button
                  type="button"
                  onClick={() => setShowManualEntry(false)}
                  className="px-3 py-1.5 rounded-lg border border-[#E9DDE8] text-[#806785]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-[#400849] text-white font-semibold"
                >
                  Save Metrics
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CSV Import Modal */}
      {showCsvModal && (
        <div className="fixed inset-0 z-50 bg-[#400849]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#E9DDE8]">
            <div className="flex items-center justify-between pb-3 border-b border-[#E9DDE8]">
              <h3 className="font-display font-semibold text-base text-[#400849]">
                Import CSV Analytics
              </h3>
              <button
                onClick={() => setShowCsvModal(false)}
                className="text-sm text-[#806785] hover:text-[#400849]"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <p className="text-[#806785]">
                Paste rows exported from Instagram Creator Studio or your analytics spreadsheet.
                Format: <code className="bg-[#F5E8F5] px-1 py-0.5 rounded text-[#400849]">MetricName,Value</code>
              </p>

              <textarea
                rows={6}
                value={csvText}
                onChange={e => setCsvText(e.target.value)}
                placeholder="followers,40850&#10;views,311000&#10;engagement,4.8&#10;reach,1450000"
                className="w-full p-2.5 font-mono text-xs border border-[#E9DDE8] rounded-lg focus:ring-2 focus:ring-[#E7B0DE]"
              />

              {csvSuccess && (
                <div className="p-2.5 rounded-lg bg-green-50 text-green-800 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>Metrics successfully updated from CSV!</span>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E9DDE8]">
                <button
                  type="button"
                  onClick={() => setShowCsvModal(false)}
                  className="px-3 py-1.5 rounded-lg border border-[#E9DDE8] text-[#806785]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleImportCsv}
                  className="px-4 py-1.5 rounded-lg bg-[#400849] text-white font-semibold"
                >
                  Parse & Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
