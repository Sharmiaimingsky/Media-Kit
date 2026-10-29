export type ContentCategory = 
  | 'Beauty & Makeup'
  | 'Skincare & Haircare'
  | 'Fashion & Styling'
  | 'Luxury Lifestyle'
  | 'Travel & Hotels'
  | 'Daily Vlogs & Opinions';

export interface CreatorProfile {
  name: string;
  handle: string;
  title: string;
  location: string;
  niche: string[];
  bio: string;
  languages: string[];
  positioning: string;
  avatarUrl: string;
  heroImageUrl: string;
  businessEmail: string;
  instagramUrl: string;
  portfolioUrl: string;
  // Metrics (authentic / user provided)
  followers: number;
  followersDisplay: string; // e.g. "40,000+"
  followersVerified: boolean;
  avgReelViews: number;
  avgReelViewsDisplay: string; // e.g. "311,000"
  avgReelViewsVerified: boolean;
  engagementRate: number; // e.g. 4.8
  engagementRateVerified: boolean; // default false / unverified
  monthlyReach: number; // e.g. 1250000
  monthlyReachVerified: boolean; // default false / unverified
  monthlyImpressions: number;
  avgStoryViews: number;
  activeCollaborationsCount: number;
}

export type CollaborationStatus =
  | 'Lead'
  | 'To Pitch'
  | 'Pitched'
  | 'Follow-up'
  | 'Negotiating'
  | 'Confirmed'
  | 'In Production'
  | 'Awaiting Approval'
  | 'Published'
  | 'Paid / Completed'
  | 'Declined';

export type CampaignType = 'paid' | 'gifting' | 'hosted' | 'affiliate';

export interface Collaboration {
  id: string;
  brandName: string;
  brandCategory: string;
  contactPerson: string;
  contactInfo: string;
  channel: 'Email' | 'Instagram DM' | 'PR Agency' | 'Website Form';
  campaignType: CampaignType;
  proposedAmount: number;
  finalAmount: number;
  currency: 'INR' | 'USD';
  pitchDate: string;
  followUpDate: string;
  deadline: string;
  deliverables: string[];
  status: CollaborationStatus;
  notes: string;
  links: string;
}

export interface PitchTemplate {
  id: string;
  name: string;
  category: string;
  subject: string;
  opportunity: string;
  proposedDeliverables: string;
  content: string;
  followUp: string;
}

export interface PitchRecord {
  id: string;
  brandName: string;
  brandCategory: string;
  contactEmail: string;
  pitchChannel: 'Email' | 'Instagram DM' | 'PR Portal';
  campaignOpportunity: string;
  pitchObjective: string;
  proposedDeliverables: string;
  quotedFee: number;
  currency: 'INR' | 'USD';
  personalizationNotes: string;
  draftPitch: string;
  followUpMessage: string;
  status: 'Draft' | 'Ready' | 'Sent' | 'Archived';
  sendDate: string;
  templateId?: string;
}

export interface RateItem {
  id: string;
  title: string;
  category: 'Video' | 'Stories' | 'Static' | 'UGC' | 'Usage Rights' | 'Experience' | 'Package';
  description: string;
  basePriceINR: number;
  basePriceUSD: number;
  packageDiscountPercent?: number;
  turnaroundDays: number;
  includes: string[];
  notes: string;
  isPublicInKit: boolean;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: ContentCategory;
  brand: string;
  views: number;
  reach: number;
  engagement: string;
  reelUrl: string;
  thumbnailUrl: string;
  isFeatured: boolean;
  caseStudySummary: string;
  publishedDate: string;
  accentColor?: string;
}

export type DeliverableStepStatus = 'Not Started' | 'In Progress' | 'Drafting' | 'Pending' | 'Under Review' | 'Approved' | 'Completed';

export interface DeliverableTask {
  id: string;
  deliverableName: string;
  brand: string;
  dueDate: string;
  contentFormat: 'Reel' | 'Story Set' | 'Carousel' | 'UGC Video' | 'Hosted Trip Coverage';
  scriptStatus: DeliverableStepStatus;
  shootStatus: DeliverableStepStatus;
  editingStatus: DeliverableStepStatus;
  approvalStatus: DeliverableStepStatus;
  publishingDate: string;
  liveUrl: string;
  invoiceStatus: 'Unbilled' | 'Invoiced' | 'Paid';
  isOverdue?: boolean;
  notes?: string;
}

export interface MediaKitSectionConfig {
  id: string;
  title: string;
  enabled: boolean;
  order: number;
}
