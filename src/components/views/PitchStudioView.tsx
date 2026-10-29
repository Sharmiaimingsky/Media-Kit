import React, { useState } from 'react';
import {
  Send,
  Copy,
  Check,
  Sparkles,
  FileText,
  Mail,
  Instagram,
  Clock,
  Plus,
  Trash2,
  Edit2,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { pitchTemplates } from '../../data/initialData';
import { PitchRecord, PitchTemplate } from '../../types';

export const PitchStudioView: React.FC = () => {
  const { pitches, addPitch, updatePitch, deletePitch, currency } = useApp();

  const [selectedTemplate, setSelectedTemplate] = useState<PitchTemplate>(pitchTemplates[0]);
  const [activeDraft, setActiveDraft] = useState<PitchRecord | null>(pitches[0] || null);

  // Composer form states
  const [brandName, setBrandName] = useState(activeDraft?.brandName || '');
  const [brandCategory, setBrandCategory] = useState(
    activeDraft?.brandCategory || selectedTemplate.category
  );
  const [contactEmail, setContactEmail] = useState(activeDraft?.contactEmail || '');
  const [pitchChannel, setPitchChannel] = useState<'Email' | 'Instagram DM' | 'PR Portal'>(
    activeDraft?.pitchChannel || 'Email'
  );
  const [campaignOpportunity, setCampaignOpportunity] = useState(
    activeDraft?.campaignOpportunity || selectedTemplate.opportunity
  );
  const [pitchObjective, setPitchObjective] = useState(activeDraft?.pitchObjective || '');
  const [proposedDeliverables, setProposedDeliverables] = useState(
    activeDraft?.proposedDeliverables || selectedTemplate.proposedDeliverables
  );
  const [quotedFee, setQuotedFee] = useState(activeDraft?.quotedFee?.toString() || '180000');
  const [personalizationNotes, setPersonalizationNotes] = useState(
    activeDraft?.personalizationNotes || ''
  );
  const [draftContent, setDraftContent] = useState(
    activeDraft?.draftPitch || selectedTemplate.content
  );
  const [followUpContent, setFollowUpContent] = useState(
    activeDraft?.followUpMessage || selectedTemplate.followUp
  );
  const [pitchStatus, setPitchStatus] = useState<'Draft' | 'Ready' | 'Sent' | 'Archived'>(
    activeDraft?.status || 'Draft'
  );

  const [copiedPitch, setCopiedPitch] = useState(false);
  const [copiedFollowUp, setCopiedFollowUp] = useState(false);

  // When a template is clicked
  const handleApplyTemplate = (tmpl: PitchTemplate) => {
    setSelectedTemplate(tmpl);
    setBrandCategory(tmpl.category);
    setCampaignOpportunity(tmpl.opportunity);
    setProposedDeliverables(tmpl.proposedDeliverables);

    // Replace brand placeholders if brand is entered
    let populated = tmpl.content;
    if (brandName.trim()) {
      populated = populated.replace(/\[Brand Name\]/g, brandName);
    }
    setDraftContent(populated);
    setFollowUpContent(tmpl.followUp.replace(/\[Brand Name\]/g, brandName || '[Brand Name]'));
  };

  const handleSelectDraft = (p: PitchRecord) => {
    setActiveDraft(p);
    setBrandName(p.brandName);
    setBrandCategory(p.brandCategory);
    setContactEmail(p.contactEmail);
    setPitchChannel(p.pitchChannel);
    setCampaignOpportunity(p.campaignOpportunity);
    setPitchObjective(p.pitchObjective);
    setProposedDeliverables(p.proposedDeliverables);
    setQuotedFee(p.quotedFee.toString());
    setPersonalizationNotes(p.personalizationNotes);
    setDraftContent(p.draftPitch);
    setFollowUpContent(p.followUpMessage);
    setPitchStatus(p.status);
  };

  const handleSaveDraft = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandName.trim()) {
      alert('Please enter a Brand Name');
      return;
    }

    if (activeDraft) {
      updatePitch(activeDraft.id, {
        brandName,
        brandCategory,
        contactEmail,
        pitchChannel,
        campaignOpportunity,
        pitchObjective,
        proposedDeliverables,
        quotedFee: parseInt(quotedFee) || 0,
        personalizationNotes,
        draftPitch: draftContent,
        followUpMessage: followUpContent,
        status: pitchStatus,
        sendDate: pitchStatus === 'Sent' ? new Date().toISOString().split('T')[0] : '',
      });
    } else {
      addPitch({
        brandName,
        brandCategory,
        contactEmail,
        pitchChannel,
        campaignOpportunity,
        pitchObjective,
        proposedDeliverables,
        quotedFee: parseInt(quotedFee) || 0,
        currency: currency,
        personalizationNotes,
        draftPitch: draftContent,
        followUpMessage: followUpContent,
        status: pitchStatus,
        sendDate: pitchStatus === 'Sent' ? new Date().toISOString().split('T')[0] : '',
        templateId: selectedTemplate.id,
      });
    }
  };

  const handleNewPitch = () => {
    setActiveDraft(null);
    setBrandName('');
    setContactEmail('');
    setPitchObjective('');
    setPersonalizationNotes('');
    setQuotedFee('180000');
    setPitchStatus('Draft');
    handleApplyTemplate(pitchTemplates[0]);
  };

  const handleCopyPitch = () => {
    navigator.clipboard.writeText(draftContent);
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 2000);
  };

  const handleCopyFollowUp = () => {
    navigator.clipboard.writeText(followUpContent);
    setCopiedFollowUp(true);
    setTimeout(() => setCopiedFollowUp(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-[#E9DDE8] p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display font-bold text-2xl text-[#400849]">
              Pitch Studio & Outreach Workspace
            </h1>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#E7B0DE]/40 text-[#400849] uppercase tracking-wider">
              10 Luxury Templates
            </span>
          </div>
          <p className="text-xs text-[#806785] mt-0.5">
            Craft tailored editorial proposals for beauty labels, fashion houses, and luxury hotels.
          </p>
        </div>

        <button
          onClick={handleNewPitch}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#FF5A0A] hover:bg-[#e04e05] text-white text-xs font-semibold transition-all shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>New Pitch Proposal</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Templates & Saved Pitches (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Template Selector */}
          <div className="bg-white rounded-2xl border border-[#E9DDE8] p-4 shadow-xs space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-[#E9DDE8]">
              <BookOpen className="w-4 h-4 text-[#FF5A0A]" />
              <h3 className="font-display font-semibold text-xs text-[#400849] uppercase tracking-wider">
                Luxury Pitch Frameworks
              </h3>
            </div>

            <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
              {pitchTemplates.map(tmpl => (
                <button
                  key={tmpl.id}
                  onClick={() => handleApplyTemplate(tmpl)}
                  className={`w-full text-left p-2.5 rounded-lg border text-xs transition-all ${
                    selectedTemplate.id === tmpl.id
                      ? 'border-[#400849] bg-[#F5E8F5] text-[#400849] font-semibold'
                      : 'border-[#E9DDE8] hover:border-[#E7B0DE] bg-[#FFF9F5]/40 text-[#806785]'
                  }`}
                >
                  <p className="text-xs font-medium truncate">{tmpl.name}</p>
                  <p className="text-[10px] text-[#806785] truncate">{tmpl.category}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Saved Pitches Queue */}
          <div className="bg-white rounded-2xl border border-[#E9DDE8] p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#E9DDE8]">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#400849]" />
                <h3 className="font-display font-semibold text-xs text-[#400849] uppercase tracking-wider">
                  Outreach Queue ({pitches.length})
                </h3>
              </div>
            </div>

            <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
              {pitches.map(p => (
                <div
                  key={p.id}
                  onClick={() => handleSelectDraft(p)}
                  className={`p-3 rounded-xl border cursor-pointer text-xs transition-all flex items-center justify-between ${
                    activeDraft?.id === p.id
                      ? 'border-[#400849] bg-[#FFF9F5] shadow-xs'
                      : 'border-[#E9DDE8] hover:border-[#E7B0DE] bg-white'
                  }`}
                >
                  <div>
                    <h4 className="font-semibold text-[#400849]">{p.brandName}</h4>
                    <p className="text-[11px] text-[#806785] truncate max-w-[150px]">
                      {p.campaignOpportunity}
                    </p>
                  </div>

                  <div className="text-right">
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                        p.status === 'Sent'
                          ? 'bg-green-100 text-green-800'
                          : p.status === 'Ready'
                          ? 'bg-[#E7B0DE]/40 text-[#400849]'
                          : 'bg-[#F5E8F5] text-[#806785]'
                      }`}
                    >
                      {p.status}
                    </span>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        deletePitch(p.id);
                      }}
                      className="block text-[10px] text-[#806785] hover:text-[#FF5A0A] mt-1 ml-auto"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Pitch Editor & Composer (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-[#E9DDE8] p-6 shadow-xs space-y-6">
          <form onSubmit={handleSaveDraft} className="space-y-5 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#E9DDE8]">
              <div>
                <h3 className="font-display font-semibold text-base text-[#400849]">
                  {activeDraft ? `Pitch for ${brandName || 'Brand'}` : 'Compose Brand Pitch'}
                </h3>
                <p className="text-xs text-[#806785]">
                  Personalize with verified 311K avg views and specific product angles.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={pitchStatus}
                  onChange={e => setPitchStatus(e.target.value as any)}
                  className="p-1.5 rounded-lg border border-[#E9DDE8] bg-[#F5E8F5] text-[#400849] font-semibold text-xs"
                >
                  <option value="Draft">Draft</option>
                  <option value="Ready">Ready to Send</option>
                  <option value="Sent">Sent</option>
                  <option value="Archived">Archived</option>
                </select>

                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#400849] hover:bg-[#2e0535] text-white font-semibold text-xs"
                >
                  Save to Queue
                </button>
              </div>
            </div>

            {/* Form Fields Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="font-semibold text-[#400849] block mb-1">Target Brand Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dior Beauty"
                  value={brandName}
                  onChange={e => setBrandName(e.target.value)}
                  className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="font-semibold text-[#400849] block mb-1">Category</label>
                <input
                  type="text"
                  value={brandCategory}
                  onChange={e => setBrandCategory(e.target.value)}
                  className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="font-semibold text-[#400849] block mb-1">Contact Email</label>
                <input
                  type="email"
                  placeholder="pr@dior.com"
                  value={contactEmail}
                  onChange={e => setContactEmail(e.target.value)}
                  className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="font-semibold text-[#400849] block mb-1">Pitch Channel</label>
                <select
                  value={pitchChannel}
                  onChange={e => setPitchChannel(e.target.value as any)}
                  className="w-full p-2 border border-[#E9DDE8] rounded-lg bg-white text-xs"
                >
                  <option>Email</option>
                  <option>Instagram DM</option>
                  <option>PR Portal</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-[#400849] block mb-1">
                  Quoted Baseline Fee (₹)
                </label>
                <input
                  type="number"
                  value={quotedFee}
                  onChange={e => setQuotedFee(e.target.value)}
                  className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="font-semibold text-[#400849] block mb-1">
                  Deliverables Scope
                </label>
                <input
                  type="text"
                  value={proposedDeliverables}
                  onChange={e => setProposedDeliverables(e.target.value)}
                  className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-[#400849] block mb-1">
                Campaign Opportunity Hook
              </label>
              <input
                type="text"
                value={campaignOpportunity}
                onChange={e => setCampaignOpportunity(e.target.value)}
                placeholder="e.g. New Seasonal Collection Drop / Resort Reopening"
                className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs"
              />
            </div>

            {/* Pitch Body & Copy Button */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="font-semibold text-[#400849]">
                  Editorial Pitch Body (Copy to send via your email client / DM)
                </label>
                <button
                  type="button"
                  onClick={handleCopyPitch}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#FFF9F5] border border-[#E9DDE8] hover:bg-white text-[#400849] font-semibold text-xs"
                >
                  {copiedPitch ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-600" />
                      <span className="text-green-700">Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#FF5A0A]" />
                      <span>Copy Pitch Message</span>
                    </>
                  )}
                </button>
              </div>

              <textarea
                rows={11}
                value={draftContent}
                onChange={e => setDraftContent(e.target.value)}
                className="w-full p-3 font-mono text-xs border border-[#E9DDE8] rounded-xl focus:ring-2 focus:ring-[#E7B0DE] leading-relaxed bg-[#FFF9F5]/40"
              />
            </div>

            {/* Follow-up Note & Copy */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="font-semibold text-[#400849]">
                  Prepared 5-Day Follow-Up Message
                </label>
                <button
                  type="button"
                  onClick={handleCopyFollowUp}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#FFF9F5] border border-[#E9DDE8] hover:bg-white text-[#400849] font-semibold text-xs"
                >
                  {copiedFollowUp ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-600" />
                      <span className="text-green-700">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#FF5A0A]" />
                      <span>Copy Follow-Up</span>
                    </>
                  )}
                </button>
              </div>

              <textarea
                rows={4}
                value={followUpContent}
                onChange={e => setFollowUpContent(e.target.value)}
                className="w-full p-3 font-mono text-xs border border-[#E9DDE8] rounded-xl focus:ring-2 focus:ring-[#E7B0DE] leading-relaxed bg-[#FFF9F5]/40"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
