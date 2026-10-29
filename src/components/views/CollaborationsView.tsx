import React, { useState } from 'react';
import {
  Briefcase,
  Plus,
  Kanban,
  Table as TableIcon,
  Search,
  Filter,
  ArrowUpDown,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Clock,
  ExternalLink,
  Edit2,
  Trash2,
  DollarSign,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Collaboration, CollaborationStatus, CampaignType } from '../../types';

export const CollaborationsView: React.FC = () => {
  const {
    collaborations,
    addCollaboration,
    updateCollaboration,
    deleteCollaboration,
    currency,
  } = useApp();

  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showModal, setShowModal] = useState(false);
  const [editingCollab, setEditingCollab] = useState<Collaboration | null>(null);

  // Form states
  const [formBrand, setFormBrand] = useState('');
  const [formCategory, setFormCategory] = useState('Beauty & Makeup');
  const [formContactPerson, setFormContactPerson] = useState('');
  const [formContactInfo, setFormContactInfo] = useState('');
  const [formChannel, setFormChannel] = useState<'Email' | 'Instagram DM' | 'PR Agency' | 'Website Form'>('Email');
  const [formCampaignType, setFormCampaignType] = useState<CampaignType>('paid');
  const [formProposedAmount, setFormProposedAmount] = useState('180000');
  const [formFinalAmount, setFormFinalAmount] = useState('0');
  const [formPitchDate, setFormPitchDate] = useState(new Date().toISOString().split('T')[0]);
  const [formFollowUpDate, setFormFollowUpDate] = useState(
    new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0]
  );
  const [formDeadline, setFormDeadline] = useState(
    new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0]
  );
  const [formDeliverables, setFormDeliverables] = useState('1x Dedicated Reel, 3x Stories');
  const [formStatus, setFormStatus] = useState<CollaborationStatus>('Lead');
  const [formNotes, setFormNotes] = useState('');
  const [formLinks, setFormLinks] = useState('');

  // Statuses list
  const statuses: CollaborationStatus[] = [
    'Lead',
    'To Pitch',
    'Pitched',
    'Follow-up',
    'Negotiating',
    'Confirmed',
    'In Production',
    'Awaiting Approval',
    'Published',
    'Paid / Completed',
    'Declined',
  ];

  // Pipeline summary calculations using actual entered records
  const totalPotentialDealValue = collaborations.reduce(
    (sum, c) => sum + (c.status !== 'Declined' ? (c.finalAmount > 0 ? c.finalAmount : c.proposedAmount) : 0),
    0
  );

  const confirmedDealValue = collaborations
    .filter(c => ['Confirmed', 'In Production', 'Awaiting Approval', 'Published', 'Paid / Completed'].includes(c.status))
    .reduce((sum, c) => sum + (c.finalAmount > 0 ? c.finalAmount : c.proposedAmount), 0);

  const pendingPayments = collaborations
    .filter(c => ['Awaiting Approval', 'Published'].includes(c.status))
    .reduce((sum, c) => sum + (c.finalAmount > 0 ? c.finalAmount : c.proposedAmount), 0);

  const upcomingDeliverablesCount = collaborations.filter(c =>
    ['Confirmed', 'In Production', 'Awaiting Approval'].includes(c.status)
  ).length;

  const todayStr = new Date().toISOString().split('T')[0];
  const followUpsDueCount = collaborations.filter(
    c => (c.status === 'Pitched' || c.status === 'Follow-up' || c.status === 'Negotiating') && c.followUpDate <= todayStr
  ).length;

  // Filtered collaborations
  const filtered = collaborations.filter(c => {
    const matchesSearch =
      c.brandName.toLowerCase().includes(search.toLowerCase()) ||
      c.contactPerson.toLowerCase().includes(search.toLowerCase()) ||
      c.brandCategory.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === 'all' || c.campaignType === filterType;
    const matchesStatus = filterStatus === 'all' || c.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const openCreateModal = () => {
    setEditingCollab(null);
    setFormBrand('');
    setFormCategory('Beauty & Makeup');
    setFormContactPerson('');
    setFormContactInfo('');
    setFormChannel('Email');
    setFormCampaignType('paid');
    setFormProposedAmount('180000');
    setFormFinalAmount('0');
    setFormPitchDate(new Date().toISOString().split('T')[0]);
    setFormFollowUpDate(new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0]);
    setFormDeadline(new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0]);
    setFormDeliverables('1x Dedicated Reel, 3x Stories');
    setFormStatus('Lead');
    setFormNotes('');
    setFormLinks('');
    setShowModal(true);
  };

  const openEditModal = (collab: Collaboration) => {
    setEditingCollab(collab);
    setFormBrand(collab.brandName);
    setFormCategory(collab.brandCategory);
    setFormContactPerson(collab.contactPerson);
    setFormContactInfo(collab.contactInfo);
    setFormChannel(collab.channel);
    setFormCampaignType(collab.campaignType);
    setFormProposedAmount(collab.proposedAmount.toString());
    setFormFinalAmount(collab.finalAmount.toString());
    setFormPitchDate(collab.pitchDate);
    setFormFollowUpDate(collab.followUpDate);
    setFormDeadline(collab.deadline);
    setFormDeliverables(collab.deliverables.join(', '));
    setFormStatus(collab.status);
    setFormNotes(collab.notes);
    setFormLinks(collab.links);
    setShowModal(true);
  };

  const handleSaveCollaboration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formBrand.trim()) return;

    const deliverablesArray = formDeliverables
      .split(',')
      .map(d => d.trim())
      .filter(Boolean);

    if (editingCollab) {
      updateCollaboration(editingCollab.id, {
        brandName: formBrand,
        brandCategory: formCategory,
        contactPerson: formContactPerson,
        contactInfo: formContactInfo,
        channel: formChannel,
        campaignType: formCampaignType,
        proposedAmount: parseInt(formProposedAmount) || 0,
        finalAmount: parseInt(formFinalAmount) || 0,
        pitchDate: formPitchDate,
        followUpDate: formFollowUpDate,
        deadline: formDeadline,
        deliverables: deliverablesArray,
        status: formStatus,
        notes: formNotes,
        links: formLinks,
      });
    } else {
      addCollaboration({
        brandName: formBrand,
        brandCategory: formCategory,
        contactPerson: formContactPerson,
        contactInfo: formContactInfo,
        channel: formChannel,
        campaignType: formCampaignType,
        proposedAmount: parseInt(formProposedAmount) || 0,
        finalAmount: parseInt(formFinalAmount) || 0,
        currency: currency,
        pitchDate: formPitchDate,
        followUpDate: formFollowUpDate,
        deadline: formDeadline,
        deliverables: deliverablesArray,
        status: formStatus,
        notes: formNotes,
        links: formLinks,
      });
    }

    setShowModal(false);
  };

  const formatAmount = (amt: number) => {
    if (currency === 'INR') {
      return `₹${amt.toLocaleString()}`;
    }
    return `$${Math.round(amt / 82).toLocaleString()}`;
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* CRM Header */}
      <div className="bg-white rounded-2xl border border-[#E9DDE8] p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display font-bold text-2xl text-[#400849]">
              Brand Collaborations CRM
            </h1>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#E7B0DE]/40 text-[#400849] uppercase tracking-wider">
              {collaborations.length} Active Records
            </span>
          </div>
          <p className="text-xs text-[#806785] mt-0.5">
            Manage your deal pipeline from initial lead to paid completion.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Switcher */}
          <div className="bg-[#F5E8F5] p-1 rounded-lg border border-[#E9DDE8] flex items-center text-xs font-semibold">
            <button
              onClick={() => setViewMode('kanban')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                viewMode === 'kanban'
                  ? 'bg-[#400849] text-white shadow-xs'
                  : 'text-[#400849] hover:text-[#400849]/70'
              }`}
            >
              <Kanban className="w-3.5 h-3.5" />
              <span>Pipeline</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                viewMode === 'table'
                  ? 'bg-[#400849] text-white shadow-xs'
                  : 'text-[#400849] hover:text-[#400849]/70'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>
          </div>

          <button
            onClick={openCreateModal}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#FF5A0A] hover:bg-[#e04e05] text-white text-xs font-semibold transition-all shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>New Collaboration</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="p-4 rounded-xl bg-white border border-[#E9DDE8] shadow-xs">
          <span className="text-[10px] font-semibold text-[#806785] uppercase tracking-wider block">
            Potential Pipeline Value
          </span>
          <p className="font-display font-bold text-xl sm:text-2xl text-[#400849] mt-1 tabular-nums">
            {formatAmount(totalPotentialDealValue)}
          </p>
          <span className="text-[10px] text-[#806785]">{collaborations.length} total pitches & leads</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#E9DDE8] shadow-xs">
          <span className="text-[10px] font-semibold text-[#806785] uppercase tracking-wider block">
            Confirmed Revenue
          </span>
          <p className="font-display font-bold text-xl sm:text-2xl text-[#400849] mt-1 tabular-nums">
            {formatAmount(confirmedDealValue)}
          </p>
          <span className="text-[10px] text-[#400849] font-medium">Locked contracts</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#E9DDE8] shadow-xs">
          <span className="text-[10px] font-semibold text-[#806785] uppercase tracking-wider block">
            Pending Payments
          </span>
          <p className="font-display font-bold text-xl sm:text-2xl text-[#FF5A0A] mt-1 tabular-nums">
            {formatAmount(pendingPayments)}
          </p>
          <span className="text-[10px] text-[#806785]">Awaiting invoice settlement</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#E9DDE8] shadow-xs">
          <span className="text-[10px] font-semibold text-[#806785] uppercase tracking-wider block">
            Active Deliverables
          </span>
          <p className="font-display font-bold text-xl sm:text-2xl text-[#400849] mt-1 tabular-nums">
            {upcomingDeliverablesCount}
          </p>
          <span className="text-[10px] text-[#806785]">Currently in production</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#E9DDE8] shadow-xs">
          <span className="text-[10px] font-semibold text-[#806785] uppercase tracking-wider block">
            Follow-Ups Due
          </span>
          <div className="flex items-center gap-2 mt-1">
            <span className="font-display font-bold text-xl sm:text-2xl text-[#FF5A0A] tabular-nums">
              {followUpsDueCount}
            </span>
            {followUpsDueCount > 0 && (
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#FF5A0A] text-white">
                Urgent
              </span>
            )}
          </div>
          <span className="text-[10px] text-[#806785]">Check outreach status</span>
        </div>
      </div>

      {/* Filters & Search Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-[#E9DDE8]">
        <div className="flex items-center gap-2 flex-1 max-w-sm">
          <Search className="w-4 h-4 text-[#806785]" />
          <input
            type="text"
            placeholder="Search by brand, category, or contact..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full text-xs text-[#400849] placeholder-[#806785] focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5 text-xs">
          <select
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
            className="p-1.5 rounded-lg border border-[#E9DDE8] bg-[#FFF9F5] text-[#400849] focus:outline-none"
          >
            <option value="all">All Campaign Types</option>
            <option value="paid">Paid</option>
            <option value="hosted">Hosted Experience</option>
            <option value="gifting">PR Gifting</option>
            <option value="affiliate">Affiliate</option>
          </select>

          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="p-1.5 rounded-lg border border-[#E9DDE8] bg-[#FFF9F5] text-[#400849] focus:outline-none"
          >
            <option value="all">All Pipeline Stages</option>
            {statuses.map(s => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* VIEW 1: KANBAN BOARD */}
      {viewMode === 'kanban' && (
        <div className="flex gap-4 overflow-x-auto pb-6 pt-2">
          {statuses.map(stage => {
            const stageCollabs = filtered.filter(c => c.status === stage);
            const isFollowUpStage = stage === 'Follow-up' || stage === 'Pitched';
            const isConfirmedStage = stage === 'Confirmed' || stage === 'Paid / Completed';

            return (
              <div
                key={stage}
                className="w-72 shrink-0 bg-[#F5E8F5]/60 rounded-xl border border-[#E9DDE8] p-3 flex flex-col max-h-[750px]"
              >
                {/* Stage Header */}
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E9DDE8]">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isFollowUpStage
                          ? 'bg-[#FF5A0A]'
                          : isConfirmedStage
                          ? 'bg-[#400849]'
                          : 'bg-[#E7B0DE]'
                      }`}
                    />
                    <h3 className="font-display font-semibold text-xs text-[#400849] truncate">
                      {stage}
                    </h3>
                  </div>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-white text-[#400849] border border-[#E9DDE8]">
                    {stageCollabs.length}
                  </span>
                </div>

                {/* Cards Container */}
                <div className="space-y-2.5 overflow-y-auto flex-1 pr-1">
                  {stageCollabs.length === 0 ? (
                    <div className="text-center py-6 text-[11px] text-[#806785]">
                      No deals in {stage}
                    </div>
                  ) : (
                    stageCollabs.map(collab => {
                      const isOverdueFollowUp =
                        collab.followUpDate <= todayStr && stage === 'Follow-up';

                      return (
                        <div
                          key={collab.id}
                          className={`p-3.5 rounded-lg border bg-white hover:shadow-md transition-all space-y-2.5 text-xs ${
                            isOverdueFollowUp
                              ? 'border-[#FF5A0A] bg-[#FFE4D5]/20'
                              : 'border-[#E9DDE8] hover:border-[#E7B0DE]'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h4 className="font-semibold text-[#400849] leading-tight">
                                {collab.brandName}
                              </h4>
                              <p className="text-[11px] text-[#806785]">{collab.brandCategory}</p>
                            </div>

                            <span
                              className={`text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded ${
                                collab.campaignType === 'paid'
                                  ? 'bg-[#E7B0DE]/40 text-[#400849]'
                                  : collab.campaignType === 'hosted'
                                  ? 'bg-[#FFE4D5] text-[#FF5A0A]'
                                  : 'bg-neutral-100 text-neutral-700'
                              }`}
                            >
                              {collab.campaignType}
                            </span>
                          </div>

                          {/* Deliverables snippet */}
                          <div className="text-[11px] text-[#806785] bg-[#FFF9F5] p-1.5 rounded border border-[#E9DDE8] line-clamp-2">
                            {collab.deliverables.join(' · ')}
                          </div>

                          {/* Amount & Follow-up Date */}
                          <div className="flex items-center justify-between pt-1 border-t border-[#E9DDE8] text-[11px]">
                            <span className="font-display font-bold text-[#400849] tabular-nums">
                              {formatAmount(
                                collab.finalAmount > 0 ? collab.finalAmount : collab.proposedAmount
                              )}
                            </span>

                            <div className="flex items-center gap-1 text-[#806785]">
                              {isOverdueFollowUp && (
                                <AlertCircle className="w-3 h-3 text-[#FF5A0A]" />
                              )}
                              <span>Due {collab.deadline.slice(5)}</span>
                            </div>
                          </div>

                          {/* Quick Stage Mover & Edit */}
                          <div className="flex items-center justify-between pt-1 text-[10px]">
                            <select
                              value={collab.status}
                              onChange={e =>
                                updateCollaboration(collab.id, {
                                  status: e.target.value as CollaborationStatus,
                                })
                              }
                              className="text-[10px] p-1 rounded bg-[#F5E8F5] border border-[#E9DDE8] text-[#400849]"
                            >
                              {statuses.map(s => (
                                <option key={s} value={s}>
                                  {s}
                                </option>
                              ))}
                            </select>

                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => openEditModal(collab)}
                                className="text-[#806785] hover:text-[#400849] p-1"
                                title="Edit Deal"
                              >
                                <Edit2 className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => deleteCollaboration(collab.id)}
                                className="text-[#806785] hover:text-[#FF5A0A] p-1"
                                title="Delete Deal"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW 2: TABLE VIEW */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-2xl border border-[#E9DDE8] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FFF9F5] border-b border-[#E9DDE8] text-[#806785] font-semibold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Brand</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Deliverables</th>
                  <th className="py-3 px-4 text-right">Fee</th>
                  <th className="py-3 px-4">Deadline</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E9DDE8]">
                {filtered.map(c => (
                  <tr key={c.id} className="hover:bg-[#FFF9F5]/50 transition-colors">
                    <td className="py-3 px-4">
                      <p className="font-semibold text-[#400849]">{c.brandName}</p>
                      <p className="text-[11px] text-[#806785]">{c.contactPerson}</p>
                    </td>
                    <td className="py-3 px-4 text-[#806785]">{c.brandCategory}</td>
                    <td className="py-3 px-4">
                      <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-[#F5E8F5] text-[#400849]">
                        {c.campaignType}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[#400849] max-w-xs truncate">
                      {c.deliverables.join(', ')}
                    </td>
                    <td className="py-3 px-4 text-right font-display font-semibold text-[#400849] tabular-nums">
                      {formatAmount(c.finalAmount > 0 ? c.finalAmount : c.proposedAmount)}
                    </td>
                    <td className="py-3 px-4 text-[#806785]">{c.deadline}</td>
                    <td className="py-3 px-4">
                      <select
                        value={c.status}
                        onChange={e =>
                          updateCollaboration(c.id, {
                            status: e.target.value as CollaborationStatus,
                          })
                        }
                        className="text-xs p-1 rounded bg-[#FFF9F5] border border-[#E9DDE8] text-[#400849]"
                      >
                        {statuses.map(s => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(c)}
                          className="text-[#806785] hover:text-[#400849] p-1"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteCollaboration(c.id)}
                          className="text-[#806785] hover:text-[#FF5A0A] p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* NEW / EDIT COLLABORATION MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-[#400849]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-[#E9DDE8]">
            <div className="flex items-center justify-between pb-3 border-b border-[#E9DDE8]">
              <h3 className="font-display font-semibold text-base text-[#400849]">
                {editingCollab ? 'Edit Collaboration Record' : 'Create New Collaboration Deal'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-sm text-[#806785] hover:text-[#400849]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveCollaboration} className="mt-4 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-[#400849] block mb-1">Brand Name *</label>
                  <input
                    type="text"
                    required
                    value={formBrand}
                    onChange={e => setFormBrand(e.target.value)}
                    placeholder="e.g. Sabyasachi / Forest Essentials"
                    className="w-full p-2 border border-[#E9DDE8] rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#400849] block mb-1">Brand Category</label>
                  <input
                    type="text"
                    value={formCategory}
                    onChange={e => setFormCategory(e.target.value)}
                    placeholder="e.g. Luxury Beauty / Fashion Couture"
                    className="w-full p-2 border border-[#E9DDE8] rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-[#400849] block mb-1">Contact Person</label>
                  <input
                    type="text"
                    value={formContactPerson}
                    onChange={e => setFormContactPerson(e.target.value)}
                    placeholder="PR Director name"
                    className="w-full p-2 border border-[#E9DDE8] rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#400849] block mb-1">
                    Contact Email / IG
                  </label>
                  <input
                    type="text"
                    value={formContactInfo}
                    onChange={e => setFormContactInfo(e.target.value)}
                    placeholder="contact@brand.com"
                    className="w-full p-2 border border-[#E9DDE8] rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#400849] block mb-1">Channel</label>
                  <select
                    value={formChannel}
                    onChange={e => setFormChannel(e.target.value as any)}
                    className="w-full p-2 border border-[#E9DDE8] rounded-lg bg-white"
                  >
                    <option>Email</option>
                    <option>Instagram DM</option>
                    <option>PR Agency</option>
                    <option>Website Form</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-[#400849] block mb-1">Campaign Type</label>
                  <select
                    value={formCampaignType}
                    onChange={e => setFormCampaignType(e.target.value as CampaignType)}
                    className="w-full p-2 border border-[#E9DDE8] rounded-lg bg-white"
                  >
                    <option value="paid">Paid</option>
                    <option value="hosted">Hosted Trip</option>
                    <option value="gifting">PR Gifting</option>
                    <option value="affiliate">Affiliate</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-[#400849] block mb-1">
                    Proposed Fee (₹)
                  </label>
                  <input
                    type="number"
                    value={formProposedAmount}
                    onChange={e => setFormProposedAmount(e.target.value)}
                    className="w-full p-2 border border-[#E9DDE8] rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#400849] block mb-1">
                    Final Negotiated Fee (₹)
                  </label>
                  <input
                    type="number"
                    value={formFinalAmount}
                    onChange={e => setFormFinalAmount(e.target.value)}
                    className="w-full p-2 border border-[#E9DDE8] rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-[#400849] block mb-1">
                  Deliverables (comma separated)
                </label>
                <input
                  type="text"
                  value={formDeliverables}
                  onChange={e => setFormDeliverables(e.target.value)}
                  placeholder="1x 4K Reel, 3x Stories with link, 30-day whitelisting"
                  className="w-full p-2 border border-[#E9DDE8] rounded-lg"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-[#400849] block mb-1">Pipeline Stage</label>
                  <select
                    value={formStatus}
                    onChange={e => setFormStatus(e.target.value as CollaborationStatus)}
                    className="w-full p-2 border border-[#E9DDE8] rounded-lg bg-white"
                  >
                    {statuses.map(s => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-[#400849] block mb-1">Follow-up Date</label>
                  <input
                    type="date"
                    value={formFollowUpDate}
                    onChange={e => setFormFollowUpDate(e.target.value)}
                    className="w-full p-2 border border-[#E9DDE8] rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#400849] block mb-1">Campaign Deadline</label>
                  <input
                    type="date"
                    value={formDeadline}
                    onChange={e => setFormDeadline(e.target.value)}
                    className="w-full p-2 border border-[#E9DDE8] rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-[#400849] block mb-1">Creative Notes</label>
                <textarea
                  rows={2}
                  value={formNotes}
                  onChange={e => setFormNotes(e.target.value)}
                  placeholder="Specific styling requirements, shade names, sound cues..."
                  className="w-full p-2 border border-[#E9DDE8] rounded-lg"
                />
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
                  Save Deal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
