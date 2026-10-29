import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  List,
  Plus,
  AlertCircle,
  CheckCircle2,
  Clock,
  ExternalLink,
  Edit2,
  Trash2,
  Video,
  FileCheck,
  CreditCard,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DeliverableTask, DeliverableStepStatus } from '../../types';

export const DeliverablesView: React.FC = () => {
  const { deliverables, addDeliverable, updateDeliverable, deleteDeliverable } = useApp();

  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('list');
  const [filterBrand, setFilterBrand] = useState('all');
  const [filterInvoice, setFilterInvoice] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState<DeliverableTask | null>(null);

  // Form states
  const [deliverableName, setDeliverableName] = useState('');
  const [brand, setBrand] = useState('');
  const [dueDate, setDueDate] = useState(
    new Date(Date.now() + 10 * 86400000).toISOString().split('T')[0]
  );
  const [contentFormat, setContentFormat] = useState<DeliverableTask['contentFormat']>('Reel');
  const [scriptStatus, setScriptStatus] = useState<DeliverableStepStatus>('In Progress');
  const [shootStatus, setShootStatus] = useState<DeliverableStepStatus>('Not Started');
  const [editingStatus, setEditingStatus] = useState<DeliverableStepStatus>('Not Started');
  const [approvalStatus, setApprovalStatus] = useState<DeliverableStepStatus>('Pending');
  const [publishingDate, setPublishingDate] = useState(
    new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0]
  );
  const [liveUrl, setLiveUrl] = useState('');
  const [invoiceStatus, setInvoiceStatus] = useState<'Unbilled' | 'Invoiced' | 'Paid'>('Unbilled');
  const [notes, setNotes] = useState('');

  const stepOptions: DeliverableStepStatus[] = [
    'Not Started',
    'In Progress',
    'Drafting',
    'Pending',
    'Under Review',
    'Approved',
    'Completed',
  ];

  // Distinct brand names for filter
  const brandList = Array.from(new Set(deliverables.map(d => d.brand)));

  const filtered = deliverables.filter(d => {
    const matchesBrand = filterBrand === 'all' || d.brand === filterBrand;
    const matchesInvoice = filterInvoice === 'all' || d.invoiceStatus === filterInvoice;
    return matchesBrand && matchesInvoice;
  });

  const openCreateModal = () => {
    setEditingTask(null);
    setDeliverableName('');
    setBrand('');
    setDueDate(new Date(Date.now() + 10 * 86400000).toISOString().split('T')[0]);
    setContentFormat('Reel');
    setScriptStatus('In Progress');
    setShootStatus('Not Started');
    setEditingStatus('Not Started');
    setApprovalStatus('Pending');
    setPublishingDate(new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0]);
    setLiveUrl('');
    setInvoiceStatus('Unbilled');
    setNotes('');
    setShowModal(true);
  };

  const openEditModal = (task: DeliverableTask) => {
    setEditingTask(task);
    setDeliverableName(task.deliverableName);
    setBrand(task.brand);
    setDueDate(task.dueDate);
    setContentFormat(task.contentFormat);
    setScriptStatus(task.scriptStatus);
    setShootStatus(task.shootStatus);
    setEditingStatus(task.editingStatus);
    setApprovalStatus(task.approvalStatus);
    setPublishingDate(task.publishingDate);
    setLiveUrl(task.liveUrl);
    setInvoiceStatus(task.invoiceStatus);
    setNotes(task.notes || '');
    setShowModal(true);
  };

  const handleSaveDeliverable = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deliverableName.trim() || !brand.trim()) return;

    const todayStr = new Date().toISOString().split('T')[0];
    const isOverdue = dueDate < todayStr && approvalStatus !== 'Approved';

    if (editingTask) {
      updateDeliverable(editingTask.id, {
        deliverableName,
        brand,
        dueDate,
        contentFormat,
        scriptStatus,
        shootStatus,
        editingStatus,
        approvalStatus,
        publishingDate,
        liveUrl,
        invoiceStatus,
        isOverdue,
        notes,
      });
    } else {
      addDeliverable({
        deliverableName,
        brand,
        dueDate,
        contentFormat,
        scriptStatus,
        shootStatus,
        editingStatus,
        approvalStatus,
        publishingDate,
        liveUrl,
        invoiceStatus,
        isOverdue,
        notes,
      });
    }

    setShowModal(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-[#E9DDE8] p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display font-bold text-2xl text-[#400849]">
              Campaign Deliverables & Content Calendar
            </h1>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#E7B0DE]/40 text-[#400849] uppercase tracking-wider">
              {deliverables.length} Active Tasks
            </span>
          </div>
          <p className="text-xs text-[#806785] mt-0.5">
            Track scripts, production, client review cycles, live URLs, and invoice status.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View mode switcher */}
          <div className="bg-[#F5E8F5] p-1 rounded-lg border border-[#E9DDE8] flex items-center text-xs font-semibold">
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                viewMode === 'list'
                  ? 'bg-[#400849] text-white shadow-xs'
                  : 'text-[#400849] hover:text-[#400849]/70'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>List View</span>
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                viewMode === 'calendar'
                  ? 'bg-[#400849] text-white shadow-xs'
                  : 'text-[#400849] hover:text-[#400849]/70'
              }`}
            >
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>Calendar</span>
            </button>
          </div>

          <button
            onClick={openCreateModal}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#FF5A0A] hover:bg-[#e04e05] text-white text-xs font-semibold transition-all shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add Deliverable</span>
          </button>
        </div>
      </div>

      {/* Filter Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-[#E9DDE8] text-xs">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-[#400849]">Filters:</span>
          <select
            value={filterBrand}
            onChange={e => setFilterBrand(e.target.value)}
            className="p-1.5 rounded-lg border border-[#E9DDE8] bg-[#FFF9F5] text-[#400849]"
          >
            <option value="all">All Brands</option>
            {brandList.map(b => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>

          <select
            value={filterInvoice}
            onChange={e => setFilterInvoice(e.target.value)}
            className="p-1.5 rounded-lg border border-[#E9DDE8] bg-[#FFF9F5] text-[#400849]"
          >
            <option value="all">All Invoice Statuses</option>
            <option value="Unbilled">Unbilled</option>
            <option value="Invoiced">Invoiced</option>
            <option value="Paid">Paid</option>
          </select>
        </div>

        <div className="text-[#806785]">
          Showing <span className="font-bold text-[#400849]">{filtered.length}</span> deliverables
        </div>
      </div>

      {/* LIST VIEW */}
      {viewMode === 'list' && (
        <div className="space-y-3">
          {filtered.map(d => (
            <div
              key={d.id}
              className={`p-4 sm:p-5 rounded-2xl border bg-white shadow-xs transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4 ${
                d.isOverdue
                  ? 'border-[#FF5A0A] bg-[#FFE4D5]/15'
                  : 'border-[#E9DDE8] hover:border-[#E7B0DE]'
              }`}
            >
              {/* Task Details */}
              <div className="space-y-1.5 max-w-md">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#F5E8F5] text-[#400849]">
                    {d.contentFormat}
                  </span>
                  <span className="font-semibold text-xs text-[#806785]">{d.brand}</span>
                  {d.isOverdue && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FF5A0A] text-white flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      Attention Due
                    </span>
                  )}
                </div>

                <h3 className="font-serif italic text-base font-medium text-[#400849]">
                  {d.deliverableName}
                </h3>

                {d.notes && <p className="text-xs text-[#806785]">{d.notes}</p>}
              </div>

              {/* Progress Milestones */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                <div className="p-2 rounded-lg bg-[#FFF9F5] border border-[#E9DDE8]">
                  <span className="text-[9px] text-[#806785] uppercase block">Script</span>
                  <span className="font-semibold text-[#400849] text-[11px]">
                    {d.scriptStatus}
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-[#FFF9F5] border border-[#E9DDE8]">
                  <span className="text-[9px] text-[#806785] uppercase block">Shoot</span>
                  <span className="font-semibold text-[#400849] text-[11px]">
                    {d.shootStatus}
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-[#FFF9F5] border border-[#E9DDE8]">
                  <span className="text-[9px] text-[#806785] uppercase block">Editing</span>
                  <span className="font-semibold text-[#400849] text-[11px]">
                    {d.editingStatus}
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-[#FFF9F5] border border-[#E9DDE8]">
                  <span className="text-[9px] text-[#806785] uppercase block">Approval</span>
                  <span className="font-semibold text-[#400849] text-[11px]">
                    {d.approvalStatus}
                  </span>
                </div>
              </div>

              {/* Due Date & Invoice */}
              <div className="flex items-center justify-between lg:justify-end gap-4 text-xs pt-3 lg:pt-0 border-t lg:border-t-0 border-[#E9DDE8]">
                <div className="text-left lg:text-right">
                  <p className="text-[10px] text-[#806785] uppercase">Target Date</p>
                  <p className="font-semibold text-[#400849]">{d.dueDate}</p>
                </div>

                <div>
                  <span
                    className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider ${
                      d.invoiceStatus === 'Paid'
                        ? 'bg-green-100 text-green-800'
                        : d.invoiceStatus === 'Invoiced'
                        ? 'bg-[#E7B0DE]/40 text-[#400849]'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {d.invoiceStatus}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => openEditModal(d)}
                    className="p-1.5 rounded-lg hover:bg-[#F5E8F5] text-[#806785] hover:text-[#400849]"
                    title="Edit Task"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteDeliverable(d.id)}
                    className="p-1.5 rounded-lg hover:bg-red-50 text-[#806785] hover:text-[#FF5A0A]"
                    title="Delete Task"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CALENDAR VIEW */}
      {viewMode === 'calendar' && (
        <div className="bg-white rounded-2xl border border-[#E9DDE8] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E9DDE8]">
            <h3 className="font-display font-semibold text-base text-[#400849]">
              Campaign Timeline (Next 30 Days)
            </h3>
            <span className="text-xs text-[#806785]">
              Deliverables placed chronologically by target due date
            </span>
          </div>

          <div className="space-y-4">
            {deliverables
              .slice()
              .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
              .map(task => (
                <div
                  key={task.id}
                  className="flex items-start gap-4 p-3.5 rounded-xl border border-[#E9DDE8] bg-[#FFF9F5]/40 hover:bg-[#FFF9F5] transition-all text-xs"
                >
                  <div className="w-24 shrink-0 text-center p-2 rounded-lg bg-[#400849] text-white">
                    <p className="font-display font-bold text-sm">
                      {new Date(task.dueDate).getDate()}
                    </p>
                    <p className="text-[10px] uppercase tracking-wider text-[#E7B0DE]">
                      {new Date(task.dueDate).toLocaleString('default', { month: 'short' })}
                    </p>
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#400849]">{task.brand}</span>
                      <span className="text-[#806785]">· {task.contentFormat}</span>
                      {task.isOverdue && (
                        <span className="text-[10px] font-bold text-[#FF5A0A]">Overdue</span>
                      )}
                    </div>
                    <p className="font-serif italic text-sm text-[#400849] font-medium">
                      {task.deliverableName}
                    </p>
                    <p className="text-[11px] text-[#806785]">
                      Workflow: Script ({task.scriptStatus}) → Shoot ({task.shootStatus}) → Edit (
                      {task.editingStatus}) → Client Approval ({task.approvalStatus})
                    </p>
                  </div>

                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                      task.invoiceStatus === 'Paid'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-[#F5E8F5] text-[#400849]'
                    }`}
                  >
                    {task.invoiceStatus}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* CREATE / EDIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-[#400849]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-[#E9DDE8]">
            <div className="flex items-center justify-between pb-3 border-b border-[#E9DDE8]">
              <h3 className="font-display font-semibold text-base text-[#400849]">
                {editingTask ? 'Edit Deliverable Task' : 'Add Campaign Deliverable'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-sm text-[#806785] hover:text-[#400849]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveDeliverable} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="font-semibold text-[#400849] block mb-1">
                  Deliverable Name *
                </label>
                <input
                  type="text"
                  required
                  value={deliverableName}
                  onChange={e => setDeliverableName(e.target.value)}
                  placeholder="e.g. Dior Lipstick Shade 999 4K Macro Reel"
                  className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-[#400849] block mb-1">Partner Brand *</label>
                  <input
                    type="text"
                    required
                    value={brand}
                    onChange={e => setBrand(e.target.value)}
                    placeholder="e.g. Estée Lauder"
                    className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#400849] block mb-1">Content Format</label>
                  <select
                    value={contentFormat}
                    onChange={e => setContentFormat(e.target.value as any)}
                    className="w-full p-2 border border-[#E9DDE8] rounded-lg bg-white text-xs"
                  >
                    <option>Reel</option>
                    <option>Story Set</option>
                    <option>Carousel</option>
                    <option>UGC Video</option>
                    <option>Hosted Trip Coverage</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-[#400849] block mb-1">Target Due Date</label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={e => setDueDate(e.target.value)}
                    className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#400849] block mb-1">
                    Scheduled Publish Date
                  </label>
                  <input
                    type="date"
                    value={publishingDate}
                    onChange={e => setPublishingDate(e.target.value)}
                    className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs"
                  />
                </div>
              </div>

              {/* Step Statuses */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-[#E9DDE8]">
                <div>
                  <label className="font-medium text-[#806785] block mb-1">Script</label>
                  <select
                    value={scriptStatus}
                    onChange={e => setScriptStatus(e.target.value as any)}
                    className="w-full p-1.5 border border-[#E9DDE8] rounded text-xs bg-white"
                  >
                    {stepOptions.map(o => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-medium text-[#806785] block mb-1">Shoot</label>
                  <select
                    value={shootStatus}
                    onChange={e => setShootStatus(e.target.value as any)}
                    className="w-full p-1.5 border border-[#E9DDE8] rounded text-xs bg-white"
                  >
                    {stepOptions.map(o => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-medium text-[#806785] block mb-1">Edit</label>
                  <select
                    value={editingStatus}
                    onChange={e => setEditingStatus(e.target.value as any)}
                    className="w-full p-1.5 border border-[#E9DDE8] rounded text-xs bg-white"
                  >
                    {stepOptions.map(o => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-medium text-[#806785] block mb-1">Approval</label>
                  <select
                    value={approvalStatus}
                    onChange={e => setApprovalStatus(e.target.value as any)}
                    className="w-full p-1.5 border border-[#E9DDE8] rounded text-xs bg-white"
                  >
                    {stepOptions.map(o => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="font-semibold text-[#400849] block mb-1">Invoice Status</label>
                  <select
                    value={invoiceStatus}
                    onChange={e => setInvoiceStatus(e.target.value as any)}
                    className="w-full p-2 border border-[#E9DDE8] rounded-lg bg-white text-xs"
                  >
                    <option value="Unbilled">Unbilled</option>
                    <option value="Invoiced">Invoiced</option>
                    <option value="Paid">Paid</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-[#400849] block mb-1">
                    Live Reel URL (after publishing)
                  </label>
                  <input
                    type="url"
                    value={liveUrl}
                    onChange={e => setLiveUrl(e.target.value)}
                    placeholder="https://instagram.com/reel/..."
                    className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-[#400849] block mb-1">Production Notes</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Wardrobe details, sound design, brand mentions..."
                  className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs"
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
                  Save Deliverable
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
