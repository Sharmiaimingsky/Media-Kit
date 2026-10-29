import React, { useState } from 'react';
import {
  Settings,
  User,
  Instagram,
  Mail,
  DollarSign,
  Download,
  Upload,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Globe,
  Shield,
  FileText,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SettingsView: React.FC = () => {
  const {
    profile,
    updateProfile,
    currency,
    setCurrency,
    exportAllData,
    importAllData,
    resetAllData,
    setActiveTab,
  } = useApp();

  const [name, setName] = useState(profile.name);
  const [handle, setHandle] = useState(profile.handle);
  const [title, setTitle] = useState(profile.title);
  const [location, setLocation] = useState(profile.location);
  const [businessEmail, setBusinessEmail] = useState(profile.businessEmail);
  const [instagramUrl, setInstagramUrl] = useState(profile.instagramUrl);
  const [portfolioUrl, setPortfolioUrl] = useState(profile.portfolioUrl);
  const [bio, setBio] = useState(profile.bio);
  const [positioning, setPositioning] = useState(profile.positioning);

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [importText, setImportText] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const handleSaveProfileSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      handle,
      title,
      location,
      businessEmail,
      instagramUrl,
      portfolioUrl,
      bio,
      positioning,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleDownloadBackup = () => {
    const jsonStr = exportAllData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `couturefloss_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportSubmit = () => {
    if (!importText.trim()) return;
    const success = importAllData(importText);
    if (success) {
      setImportStatus('Data successfully restored!');
      setTimeout(() => {
        setImportStatus(null);
        setImportText('');
      }, 2500);
    } else {
      setImportStatus('Invalid JSON format. Please verify the backup file.');
    }
  };

  const handleResetData = () => {
    if (
      window.confirm(
        'Are you sure you want to restore default initial creator data? Any unsaved edits will be reset to default.'
      )
    ) {
      resetAllData();
      alert('Data reset to default COUTUREFLOSS initial state.');
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-[#E9DDE8] p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display font-bold text-2xl text-[#400849]">
              Settings & Creator Data Management
            </h1>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#E7B0DE]/40 text-[#400849] uppercase tracking-wider">
              Autonomous & Persistent
            </span>
          </div>
          <p className="text-xs text-[#806785] mt-0.5">
            Configure profile identifiers, export complete JSON archives, and manage currency
            defaults.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('public-kit')}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#FF5A0A] text-white text-xs font-semibold hover:bg-[#e04e05] transition-all shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>View Public Kit</span>
        </button>
      </div>

      {/* Creator Profile Form */}
      <div className="bg-white rounded-2xl border border-[#E9DDE8] p-6 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-[#E9DDE8]">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-[#400849]" />
            <h3 className="font-display font-semibold text-base text-[#400849]">
              Creator Identity & Positioning
            </h3>
          </div>
          {savedSuccess && (
            <span className="text-xs text-green-700 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              Settings Saved!
            </span>
          )}
        </div>

        <form onSubmit={handleSaveProfileSettings} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-[#400849] block mb-1">Creator Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full p-2.5 border border-[#E9DDE8] rounded-lg text-xs"
                required
              />
            </div>
            <div>
              <label className="font-semibold text-[#400849] block mb-1">Instagram Handle</label>
              <input
                type="text"
                value={handle}
                onChange={e => setHandle(e.target.value)}
                className="w-full p-2.5 border border-[#E9DDE8] rounded-lg text-xs"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-[#400849] block mb-1">
                Headline / Editorial Title
              </label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full p-2.5 border border-[#E9DDE8] rounded-lg text-xs"
                required
              />
            </div>
            <div>
              <label className="font-semibold text-[#400849] block mb-1">Primary Base / Location</label>
              <input
                type="text"
                value={location}
                onChange={e => setLocation(e.target.value)}
                className="w-full p-2.5 border border-[#E9DDE8] rounded-lg text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="font-semibold text-[#400849] block mb-1">
                Business Inquiry Email
              </label>
              <input
                type="email"
                value={businessEmail}
                onChange={e => setBusinessEmail(e.target.value)}
                className="w-full p-2.5 border border-[#E9DDE8] rounded-lg text-xs"
                required
              />
            </div>
            <div>
              <label className="font-semibold text-[#400849] block mb-1">Instagram Web URL</label>
              <input
                type="url"
                value={instagramUrl}
                onChange={e => setInstagramUrl(e.target.value)}
                className="w-full p-2.5 border border-[#E9DDE8] rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="font-semibold text-[#400849] block mb-1">Portfolio Studio URL</label>
              <input
                type="url"
                value={portfolioUrl}
                onChange={e => setPortfolioUrl(e.target.value)}
                className="w-full p-2.5 border border-[#E9DDE8] rounded-lg text-xs"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-[#400849] block mb-1">
              Editorial Biography (Vogue Voice)
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={e => setBio(e.target.value)}
              className="w-full p-2.5 border border-[#E9DDE8] rounded-lg text-xs leading-relaxed"
            />
          </div>

          <div>
            <label className="font-semibold text-[#400849] block mb-1">
              Audience Positioning & Commercial Value
            </label>
            <textarea
              rows={2}
              value={positioning}
              onChange={e => setPositioning(e.target.value)}
              className="w-full p-2.5 border border-[#E9DDE8] rounded-lg text-xs leading-relaxed"
            />
          </div>

          <div className="flex items-center justify-end pt-2">
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-[#400849] hover:bg-[#2b0431] text-white font-semibold text-xs shadow-xs"
            >
              Save Profile Changes
            </button>
          </div>
        </form>
      </div>

      {/* Currency & Financial Preferences */}
      <div className="bg-white rounded-2xl border border-[#E9DDE8] p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-[#E9DDE8]">
          <DollarSign className="w-4 h-4 text-[#400849]" />
          <h3 className="font-display font-semibold text-base text-[#400849]">
            Currency & Commercial Preferences
          </h3>
        </div>

        <div className="flex items-center justify-between text-xs">
          <div>
            <p className="font-semibold text-[#400849]">Default Display Currency</p>
            <p className="text-[#806785]">Choose whether fees default to Indian Rupee (₹) or US Dollar ($).</p>
          </div>

          <div className="bg-[#F5E8F5] p-1 rounded-lg border border-[#E9DDE8] flex items-center font-semibold">
            <button
              onClick={() => setCurrency('INR')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                currency === 'INR'
                  ? 'bg-[#400849] text-white shadow-xs'
                  : 'text-[#400849] hover:text-[#400849]/70'
              }`}
            >
              ₹ INR (Indian Rupee)
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                currency === 'USD'
                  ? 'bg-[#400849] text-white shadow-xs'
                  : 'text-[#400849] hover:text-[#400849]/70'
              }`}
            >
              $ USD (US Dollar)
            </button>
          </div>
        </div>
      </div>

      {/* Complete Data Backup, Export & Restore */}
      <div className="bg-white rounded-2xl border border-[#E9DDE8] p-6 shadow-xs space-y-6">
        <div className="flex items-center gap-2 pb-3 border-b border-[#E9DDE8]">
          <Download className="w-4 h-4 text-[#400849]" />
          <h3 className="font-display font-semibold text-base text-[#400849]">
            Data Backup, Export & Restore
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          {/* Download JSON */}
          <div className="p-4 rounded-xl bg-[#FFF9F5] border border-[#E9DDE8] space-y-3">
            <h4 className="font-bold text-[#400849] text-sm">Download Complete Archive</h4>
            <p className="text-[#806785] leading-relaxed">
              Export all your campaigns, pipeline deals, pitch proposals, custom rates, and media kit
              configurations into a single JSON file.
            </p>
            <button
              onClick={handleDownloadBackup}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#400849] text-white font-semibold text-xs hover:bg-[#2b0431] transition-all"
            >
              <Download className="w-3.5 h-3.5 text-[#E7B0DE]" />
              <span>Export JSON Backup</span>
            </button>
          </div>

          {/* Restore JSON */}
          <div className="p-4 rounded-xl bg-[#FFF9F5] border border-[#E9DDE8] space-y-3">
            <h4 className="font-bold text-[#400849] text-sm">Restore from Backup</h4>
            <p className="text-[#806785] leading-relaxed">
              Paste a previously exported JSON backup below to restore your exact workspace.
            </p>
            <textarea
              rows={3}
              value={importText}
              onChange={e => setImportText(e.target.value)}
              placeholder="Paste JSON content here..."
              className="w-full p-2 border border-[#E9DDE8] rounded-lg font-mono text-[11px]"
            />
            {importStatus && (
              <p
                className={`text-xs font-semibold ${
                  importStatus.includes('success') ? 'text-green-700' : 'text-red-600'
                }`}
              >
                {importStatus}
              </p>
            )}
            <button
              onClick={handleImportSubmit}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FF5A0A] text-white font-semibold text-xs hover:bg-[#e04e05] transition-all"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Restore Workspace</span>
            </button>
          </div>
        </div>

        {/* Reset */}
        <div className="pt-4 border-t border-[#E9DDE8] flex items-center justify-between text-xs">
          <div>
            <p className="font-semibold text-red-600">Reset to Initial Seed Data</p>
            <p className="text-[#806785]">Restore all original COUTUREFLOSS samples and rates.</p>
          </div>
          <button
            onClick={handleResetData}
            className="px-4 py-2 rounded-lg border border-red-300 text-red-600 hover:bg-red-50 font-semibold"
          >
            Reset All
          </button>
        </div>
      </div>
    </div>
  );
};
