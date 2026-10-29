import React, { useState } from 'react';
import {
  Tag,
  Plus,
  Edit2,
  Trash2,
  Download,
  Eye,
  CheckCircle2,
  DollarSign,
  Percent,
  Clock,
  Shield,
  Layers,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { RateItem } from '../../types';

export const RateCardView: React.FC = () => {
  const { rates, addRate, updateRate, deleteRate, currency, setCurrency } = useApp();

  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [showModal, setShowModal] = useState(false);
  const [editingRate, setEditingRate] = useState<RateItem | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<RateItem['category']>('Video');
  const [description, setDescription] = useState('');
  const [basePriceINR, setBasePriceINR] = useState('150000');
  const [basePriceUSD, setBasePriceUSD] = useState('1850');
  const [packageDiscountPercent, setPackageDiscountPercent] = useState('0');
  const [turnaroundDays, setTurnaroundDays] = useState('7');
  const [includesText, setIncludesText] = useState('Concept pitch, 4K filming, 1 revision');
  const [notes, setNotes] = useState('');
  const [isPublicInKit, setIsPublicInKit] = useState(true);

  const categories = [
    'all',
    'Video',
    'Stories',
    'Static',
    'UGC',
    'Usage Rights',
    'Experience',
    'Package',
  ];

  const filteredRates = rates.filter(
    r => filterCategory === 'all' || r.category === filterCategory
  );

  const openCreateModal = () => {
    setEditingRate(null);
    setTitle('');
    setCategory('Video');
    setDescription('');
    setBasePriceINR('150000');
    setBasePriceUSD('1850');
    setPackageDiscountPercent('0');
    setTurnaroundDays('7');
    setIncludesText('Concept pitch, 4K HDR production, 1 revision');
    setNotes('Standard organic in-feed permanence.');
    setIsPublicInKit(true);
    setShowModal(true);
  };

  const openEditModal = (r: RateItem) => {
    setEditingRate(r);
    setTitle(r.title);
    setCategory(r.category);
    setDescription(r.description);
    setBasePriceINR(r.basePriceINR.toString());
    setBasePriceUSD(r.basePriceUSD.toString());
    setPackageDiscountPercent((r.packageDiscountPercent || 0).toString());
    setTurnaroundDays(r.turnaroundDays.toString());
    setIncludesText(r.includes.join(', '));
    setNotes(r.notes);
    setIsPublicInKit(r.isPublicInKit);
    setShowModal(true);
  };

  const handleSaveRate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const includesArr = includesText
      .split(',')
      .map(i => i.trim())
      .filter(Boolean);

    if (editingRate) {
      updateRate(editingRate.id, {
        title,
        category,
        description,
        basePriceINR: parseInt(basePriceINR) || 0,
        basePriceUSD: parseInt(basePriceUSD) || 0,
        packageDiscountPercent: parseInt(packageDiscountPercent) || undefined,
        turnaroundDays: parseInt(turnaroundDays) || 5,
        includes: includesArr,
        notes,
        isPublicInKit,
      });
    } else {
      addRate({
        title,
        category,
        description,
        basePriceINR: parseInt(basePriceINR) || 0,
        basePriceUSD: parseInt(basePriceUSD) || 0,
        packageDiscountPercent: parseInt(packageDiscountPercent) || undefined,
        turnaroundDays: parseInt(turnaroundDays) || 5,
        includes: includesArr,
        notes,
        isPublicInKit,
      });
    }

    setShowModal(false);
  };

  const formatPrice = (r: RateItem) => {
    if (currency === 'INR') {
      return `₹${r.basePriceINR.toLocaleString()}`;
    }
    return `$${r.basePriceUSD.toLocaleString()}`;
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-[#E9DDE8] p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display font-bold text-2xl text-[#400849]">
              Rate Card & Deliverables Pricing
            </h1>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#E7B0DE]/40 text-[#400849] uppercase tracking-wider">
              {rates.length} Services Configured
            </span>
          </div>
          <p className="text-xs text-[#806785] mt-0.5">
            Configure private agency benchmarks and toggle which rates appear on your public media
            kit.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Currency Switcher */}
          <div className="bg-[#F5E8F5] p-1 rounded-lg border border-[#E9DDE8] flex items-center text-xs font-semibold">
            <button
              onClick={() => setCurrency('INR')}
              className={`px-3 py-1 rounded-md transition-all ${
                currency === 'INR'
                  ? 'bg-[#400849] text-white shadow-xs'
                  : 'text-[#400849] hover:text-[#400849]/70'
              }`}
            >
              ₹ INR
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-3 py-1 rounded-md transition-all ${
                currency === 'USD'
                  ? 'bg-[#400849] text-white shadow-xs'
                  : 'text-[#400849] hover:text-[#400849]/70'
              }`}
            >
              $ USD
            </button>
          </div>

          <button
            onClick={() => setShowPreviewModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E9DDE8] bg-[#FFF9F5] hover:bg-white text-xs font-semibold text-[#400849] transition-all"
          >
            <Eye className="w-3.5 h-3.5 text-[#FF5A0A]" />
            <span>Preview Rate Card Sheet</span>
          </button>

          <button
            onClick={openCreateModal}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#FF5A0A] hover:bg-[#e04e05] text-white text-xs font-semibold transition-all shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add Rate Item</span>
          </button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 text-xs">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full capitalize whitespace-nowrap transition-all ${
              filterCategory === cat
                ? 'bg-[#400849] text-white font-semibold shadow-xs'
                : 'bg-white border border-[#E9DDE8] text-[#806785] hover:text-[#400849]'
            }`}
          >
            {cat === 'all' ? 'All Formats' : cat}
          </button>
        ))}
      </div>

      {/* Rates Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredRates.map(item => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-[#E9DDE8] p-5 shadow-xs hover:border-[#E7B0DE] transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF5A0A]">
                    {item.category}
                  </span>
                  <h3 className="font-serif italic text-lg font-medium text-[#400849] leading-snug mt-0.5">
                    {item.title}
                  </h3>
                </div>

                <div className="flex flex-col items-end gap-1">
                  {item.packageDiscountPercent && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FF5A0A] text-white">
                      Save {item.packageDiscountPercent}%
                    </span>
                  )}
                  <span
                    className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                      item.isPublicInKit
                        ? 'bg-green-100 text-green-800'
                        : 'bg-neutral-100 text-neutral-600'
                    }`}
                  >
                    {item.isPublicInKit ? 'Public on Kit' : 'Private Rate'}
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#806785] leading-relaxed">{item.description}</p>

              {/* Inclusions list */}
              {item.includes && item.includes.length > 0 && (
                <div className="pt-2 border-t border-[#E9DDE8] space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#400849]/70">
                    Includes:
                  </p>
                  <ul className="space-y-1 text-xs text-[#400849]/90">
                    {item.includes.map((inc, i) => (
                      <li key={i} className="flex items-center gap-1.5 text-[11px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E7B0DE]" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-[#E9DDE8] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#806785] uppercase block">
                  {item.turnaroundDays} Days Turnaround
                </span>
                <span className="font-display font-bold text-xl text-[#400849] tabular-nums">
                  {formatPrice(item)}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => openEditModal(item)}
                  className="p-1.5 rounded-lg hover:bg-[#F5E8F5] text-[#806785] hover:text-[#400849]"
                  title="Edit Rate"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteRate(item.id)}
                  className="p-1.5 rounded-lg hover:bg-red-50 text-[#806785] hover:text-[#FF5A0A]"
                  title="Delete Rate"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE / EDIT RATE ITEM MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-[#400849]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-[#E9DDE8]">
            <div className="flex items-center justify-between pb-3 border-b border-[#E9DDE8]">
              <h3 className="font-display font-semibold text-base text-[#400849]">
                {editingRate ? 'Edit Deliverable Rate' : 'Add New Deliverable / Package'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-sm text-[#806785] hover:text-[#400849]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveRate} className="mt-4 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-[#400849] block mb-1">Service Title *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="e.g. 1x Dedicated 4K Reel"
                    className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#400849] block mb-1">Category</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as any)}
                    className="w-full p-2 border border-[#E9DDE8] rounded-lg bg-white text-xs"
                  >
                    <option value="Video">Video</option>
                    <option value="Stories">Stories</option>
                    <option value="Static">Static / Carousel</option>
                    <option value="UGC">UGC Ad Creative</option>
                    <option value="Usage Rights">Usage Rights / Whitelisting</option>
                    <option value="Experience">Experience / Hospitality</option>
                    <option value="Package">Signature Package</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-[#400849] block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Scope, style, and production details..."
                  className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-[#400849] block mb-1">Base Price (₹ INR)</label>
                  <input
                    type="number"
                    value={basePriceINR}
                    onChange={e => setBasePriceINR(e.target.value)}
                    className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#400849] block mb-1">Base Price ($ USD)</label>
                  <input
                    type="number"
                    value={basePriceUSD}
                    onChange={e => setBasePriceUSD(e.target.value)}
                    className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#400849] block mb-1">Turnaround Days</label>
                  <input
                    type="number"
                    value={turnaroundDays}
                    onChange={e => setTurnaroundDays(e.target.value)}
                    className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-[#400849] block mb-1">
                  Deliverable Inclusions (comma separated)
                </label>
                <input
                  type="text"
                  value={includesText}
                  onChange={e => setIncludesText(e.target.value)}
                  placeholder="Concept storyboard, 4K production, 1 revision round"
                  className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="publicCheck"
                  checked={isPublicInKit}
                  onChange={e => setIsPublicInKit(e.target.checked)}
                  className="w-4 h-4 rounded text-[#400849] focus:ring-[#E7B0DE]"
                />
                <label htmlFor="publicCheck" className="text-xs text-[#400849] font-medium">
                  Display this rate on public media kit for inbound brand inquiries
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E9DDE8]">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-3.5 py-1.5 rounded-lg border border-[#E9DDE8] text-[#806785]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-[#400849] text-white font-semibold"
                >
                  Save Rate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PREVIEW RATE CARD SHEET MODAL */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 bg-[#400849]/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8 shadow-2xl border border-[#E9DDE8]">
            <div className="flex items-center justify-between pb-4 border-b border-[#E9DDE8]">
              <div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#FF5A0A]">
                  COUTUREFLOSS Studio
                </span>
                <h3 className="font-serif italic text-2xl text-[#400849]">
                  Official Collaboration Rate Card
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded-lg bg-[#400849] text-white text-xs font-semibold flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Print / Export PDF</span>
                </button>
                <button
                  onClick={() => setShowPreviewModal(false)}
                  className="text-sm text-[#806785] hover:text-[#400849] p-1"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="mt-6 space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-[#FFF9F5] border border-[#E9DDE8] flex items-center justify-between">
                <div>
                  <p className="font-bold text-[#400849]">Creator: Sharmistha (@couturefloss)</p>
                  <p className="text-[#806785]">311,000 Average Reel Views · 40,000+ Followers</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-[#FF5A0A]">Currency: {currency}</span>
                </div>
              </div>

              <div className="divide-y divide-[#E9DDE8]">
                {rates.map(r => (
                  <div key={r.id} className="py-3.5 flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-serif italic font-semibold text-sm text-[#400849]">
                          {r.title}
                        </span>
                        <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-[#F5E8F5] text-[#400849]">
                          {r.category}
                        </span>
                      </div>
                      <p className="text-[#806785]">{r.description}</p>
                      <p className="text-[11px] text-[#400849]">
                        Turnaround: {r.turnaroundDays} days · Includes: {r.includes.join(', ')}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-display font-bold text-base text-[#400849] tabular-nums">
                        {formatPrice(r)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-[#F5E8F5] text-[#400849] text-[11px] space-y-1">
                <p className="font-bold">Standard Commercial Terms:</p>
                <p>
                  • 50% advance invoice required to lock shoot dates; remaining 50% upon final video
                  delivery prior to publishing.
                </p>
                <p>
                  • Rates include one round of creator-side revisions. Exclusivity, paid
                  whitelisting, and raw footage rights are quoted separately.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
