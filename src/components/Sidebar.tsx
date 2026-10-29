import React from 'react';
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  Briefcase,
  Send,
  Tag,
  Grid,
  CheckSquare,
  Settings,
  ExternalLink,
  Instagram,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen = true, onClose }) => {
  const { activeTab, setActiveTab, collaborations, deliverables } = useApp();

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'media-kit', label: 'My Media Kit', icon: FileText, badge: 'Core' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    {
      id: 'collaborations',
      label: 'Brand Collaborations',
      icon: Briefcase,
      count: collaborations.length,
    },
    { id: 'pitch-studio', label: 'Pitch Studio', icon: Send },
    { id: 'rate-card', label: 'Rate Card', icon: Tag },
    { id: 'portfolio', label: 'Portfolio', icon: Grid },
    {
      id: 'deliverables',
      label: 'Deliverables',
      icon: CheckSquare,
      alert: deliverables.some(d => d.isOverdue),
    },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside
      className={`fixed lg:static top-0 bottom-0 left-0 z-40 w-64 bg-[#400849] text-white flex flex-col justify-between transition-transform duration-200 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } border-r border-[#400849]/50 shadow-xl lg:shadow-none select-none`}
    >
      <div>
        {/* Brand Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold tracking-[0.2em] text-lg text-white">
                COUTUREFLOSS
              </span>
            </div>
            <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#E7B0DE] font-semibold mt-0.5">
              Creator Studio
            </p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              aria-label="Close navigation sidebar"
              className="lg:hidden text-white/70 hover:text-white p-1"
            >
              ✕
            </button>
          )}
        </div>

        {/* Creator Identity Strip */}
        <div className="px-6 py-4 bg-white/5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#E7B0DE] text-[#400849] font-serif font-bold italic flex items-center justify-center text-sm">
              S
            </div>
            <div>
              <p className="text-xs font-semibold text-white leading-tight">Sharmistha</p>
              <div className="flex items-center gap-1 text-[11px] text-[#E7B0DE]">
                <Instagram className="w-3 h-3 text-[#FF5A0A]" />
                <span>@couturefloss</span>
              </div>
            </div>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-[#FF5A0A]/20 text-[#FF5A0A] font-semibold tracking-wider uppercase">
            PRO
          </span>
        </div>

        {/* Navigation List */}
        <nav className="p-3 space-y-1 mt-2">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (onClose) onClose();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#E7B0DE] text-[#400849] font-semibold shadow-sm'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#400849]' : 'text-[#E7B0DE]'}`} />
                  <span className="truncate">{item.label}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {item.badge && (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#400849]/20 text-[#400849]">
                      {item.badge}
                    </span>
                  )}
                  {item.count !== undefined && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        isActive ? 'bg-[#400849] text-white' : 'bg-white/10 text-white/90'
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                  {item.alert && (
                    <span
                      className="w-2 h-2 rounded-full bg-[#FF5A0A] ring-2 ring-[#400849]"
                      title="Urgent action required"
                    />
                  )}
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-white/10 space-y-2">
        <button
          onClick={() => {
            setActiveTab('public-kit');
            if (onClose) onClose();
          }}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-[#FF5A0A] text-white text-xs font-semibold hover:bg-[#e04e05] transition-all shadow-md tracking-wide uppercase"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Live Public Kit</span>
          <ExternalLink className="w-3 h-3 ml-0.5" />
        </button>

        <div className="pt-2 text-center">
          <p className="text-[11px] text-white/50 tracking-wider">
            311,000 Avg Reel Views · 40K+
          </p>
        </div>
      </div>
    </aside>
  );
};
