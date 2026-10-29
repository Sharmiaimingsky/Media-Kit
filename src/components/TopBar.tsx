import React, { useState } from 'react';
import {
  Search,
  Bell,
  Download,
  Eye,
  Menu,
  Instagram,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CreatorAvatar } from './EditorialVisuals';

interface TopBarProps {
  onToggleSidebar: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onToggleSidebar }) => {
  const {
    profile,
    setActiveTab,
    currency,
    setCurrency,
    searchQuery,
    setSearchQuery,
    notifications,
    markNotificationAsRead,
    clearAllNotifications,
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleExportPdf = () => {
    // If not already in media kit or public kit, switch to media kit preview before printing
    window.print();
  };

  return (
    <header className="sticky top-0 z-30 bg-[#FFF9F5]/90 backdrop-blur-md border-b border-[#E9DDE8] px-4 lg:px-8 py-3.5 flex items-center justify-between gap-4">
      {/* Left: Mobile Menu + Search */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <button
          onClick={onToggleSidebar}
          aria-label="Toggle navigation menu"
          className="lg:hidden p-2 rounded-lg text-[#400849] hover:bg-[#E7B0DE]/20"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#806785]" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search campaigns, pitches, rates..."
            className="w-full pl-9 pr-4 py-1.5 bg-white border border-[#E9DDE8] rounded-lg text-sm text-[#400849] placeholder-[#806785]/70 focus:outline-none focus:ring-2 focus:ring-[#E7B0DE] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#806785] hover:text-[#400849]"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
        {/* Currency Switcher */}
        <div className="hidden sm:flex items-center bg-[#F5E8F5] p-1 rounded-lg border border-[#E9DDE8] text-xs font-semibold">
          <button
            onClick={() => setCurrency('INR')}
            className={`px-2.5 py-1 rounded-md transition-all ${
              currency === 'INR'
                ? 'bg-[#400849] text-white shadow-xs'
                : 'text-[#400849] hover:text-[#400849]/80'
            }`}
          >
            ₹ INR
          </button>
          <button
            onClick={() => setCurrency('USD')}
            className={`px-2.5 py-1 rounded-md transition-all ${
              currency === 'USD'
                ? 'bg-[#400849] text-white shadow-xs'
                : 'text-[#400849] hover:text-[#400849]/80'
            }`}
          >
            $ USD
          </button>
        </div>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="View notifications"
            className="relative p-2 rounded-lg text-[#400849] hover:bg-[#E7B0DE]/20 transition-colors"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#FF5A0A] ring-2 ring-[#FFF9F5]" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-[#E9DDE8] p-4 z-50">
              <div className="flex items-center justify-between pb-3 border-b border-[#E9DDE8]">
                <div className="flex items-center gap-2">
                  <h4 className="font-display font-semibold text-sm text-[#400849]">
                    Creator Alerts
                  </h4>
                  {unreadCount > 0 && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FF5A0A]/10 text-[#FF5A0A] font-bold">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {notifications.length > 0 && (
                  <button
                    onClick={clearAllNotifications}
                    className="text-xs text-[#806785] hover:text-[#400849]"
                  >
                    Clear all
                  </button>
                )}
              </div>

              <div className="mt-3 space-y-2.5 max-h-72 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="text-xs text-center py-6 text-[#806785]">No notifications right now.</p>
                ) : (
                  notifications.map(n => (
                    <div
                      key={n.id}
                      onClick={() => {
                        markNotificationAsRead(n.id);
                        if (n.actionTab) {
                          setActiveTab(n.actionTab);
                          setShowNotifications(false);
                        }
                      }}
                      className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                        n.read
                          ? 'bg-neutral-50/60 border-neutral-200 text-neutral-600'
                          : 'bg-[#FFF9F5] border-[#E7B0DE] text-[#400849]'
                      } hover:border-[#400849]/30`}
                    >
                      <div className="flex items-start gap-2">
                        {n.type === 'urgent' ? (
                          <AlertCircle className="w-4 h-4 text-[#FF5A0A] shrink-0 mt-0.5" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4 text-[#806785] shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-[#400849] truncate">{n.title}</p>
                          <p className="text-[11px] text-[#806785] line-clamp-2 mt-0.5">
                            {n.description}
                          </p>
                          <p className="text-[10px] text-[#806785]/80 mt-1">{n.timestamp}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Instagram Account Label & Profile Avatar */}
        <div
          onClick={() => setActiveTab('settings')}
          className="flex items-center gap-2.5 pl-2 sm:pl-3 border-l border-[#E9DDE8] cursor-pointer group"
          title="Creator Profile Settings"
        >
          <CreatorAvatar src={profile.avatarUrl} alt={profile.name} size="sm" />
          <div className="hidden md:block text-left">
            <p className="text-xs font-semibold text-[#400849] group-hover:text-[#FF5A0A] transition-colors leading-tight">
              {profile.name}
            </p>
            <div className="flex items-center gap-1 text-[11px] text-[#806785]">
              <Instagram className="w-3 h-3 text-[#FF5A0A]" />
              <span>{profile.handle}</span>
            </div>
          </div>
        </div>

        {/* Action: Preview Media Kit */}
        <button
          onClick={() => setActiveTab('public-kit')}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#400849] text-xs font-semibold text-[#400849] hover:bg-[#E7B0DE]/20 transition-all tracking-wide whitespace-nowrap"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Preview Media Kit</span>
        </button>

        {/* Primary Action: Export PDF */}
        <button
          onClick={handleExportPdf}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#400849] text-white text-xs font-semibold hover:bg-[#2b0431] transition-all tracking-wide shadow-sm whitespace-nowrap"
          title="Export high-resolution editorial Media Kit PDF"
        >
          <Download className="w-3.5 h-3.5 text-[#E7B0DE]" />
          <span>Export PDF</span>
        </button>
      </div>
    </header>
  );
};
