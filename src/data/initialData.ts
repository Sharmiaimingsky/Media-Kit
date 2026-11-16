import {
  CreatorProfile,
  Collaboration,
  PitchTemplate,
  PitchRecord,
  RateItem,
  PortfolioItem,
  DeliverableTask,
  MediaKitSectionConfig
} from '../types';

export const initialProfile: CreatorProfile = {
  name: 'Sharmistha',
  handle: '@couturefloss',
  title: 'Fashion, Luxury Beauty & Travel Creator',
  location: 'Bengaluru, India',
  niche: [
    'Beauty & Makeup',
    'Skincare & Haircare',
    'Fashion & Styling',
    'Luxury Lifestyle',
    'Travel & Hotels',
    'Daily Vlogs & Opinions'
  ],
  bio: 'Bridging avant-garde runway aesthetics with wearable everyday glamour. Sharmistha of COUTUREFLOSS curates high-concept beauty tutorials, capsule fashion styling, luxury hotel escapades, and candid cultural reflections for an intensely engaged cosmopolitan audience.',
  languages: ['English', 'Hindi', 'Bengali'],
  positioning: 'High-production luxury editorial storytelling focused on aspirational yet accessible luxury fashion, dermatologist-approved skincare rituals, and experiential travel across India and global destinations.',
  avatarUrl: '/assets/aistudio/87E9CEBA-F010-4EDB-87ED-70F16142154B_c05f9a2b.JPG',
  heroImageUrl: '/assets/aistudio/1CD2BD78-5F60-4824-BE87-D1E4B2CB0946_5909ad5f.PNG',
  businessEmail: 'sharmic17@gmail.com',
  instagramUrl: 'https://www.instagram.com/couturefloss/',
  portfolioUrl: 'https://couturefloss.studio',
  // Verified / user-provided baseline figures:
  followers: 40000,
  followersDisplay: '40,000+',
  followersVerified: true,
  avgReelViews: 68000,
  avgReelViewsDisplay: '68,000+',
  avgReelViewsVerified: true,
  // Audited metrics from Meta Professional Dashboard:
  engagementRate: 6.68,
  engagementRateVerified: true,
  monthlyReach: 480000,
  monthlyReachVerified: true,
  monthlyImpressions: 850000,
  avgStoryViews: 14200,
  activeCollaborationsCount: 5,
};

export const initialMediaKitSections: MediaKitSectionConfig[] = [
  { id: 'cover', title: 'Editorial Cover', enabled: true, order: 1 },
  { id: 'about', title: 'About the Creator & Vision', enabled: true, order: 2 },
  { id: 'stats', title: 'Verified Audience & Reach', enabled: true, order: 3 },
  { id: 'categories', title: 'Content Pillars & Aesthetics', enabled: true, order: 4 },
  { id: 'performance', title: 'Viral Reel Highlights', enabled: true, order: 5 },
  { id: 'partnerships', title: 'Brand Case Studies', enabled: true, order: 6 },
  { id: 'formats', title: 'Collaboration Formats', enabled: true, order: 7 },
  { id: 'rates', title: 'Curated Rate Card', enabled: true, order: 8 },
  { id: 'contact', title: 'Booking & Contact', enabled: true, order: 9 },
];

export const pitchTemplates: PitchTemplate[] = [
  {
    id: 'luxury-makeup',
    name: 'Luxury Makeup & Cosmetics Launch',
    category: 'Beauty & Makeup',
    subject: 'COUTUREFLOSS x [Brand Name] — High-Production Editorial Campaign & Launch Reel',
    opportunity: 'Upcoming seasonal cosmetics collection launch / shade expansion showcase',
    proposedDeliverables: '1x High-Production 4K Instagram Reel + 3x Macro Beauty Stories + UGC Usage Rights',
    content: `Dear [Brand Contact Name] and the [Brand Name] PR Team,

I hope you are having a wonderful week!

I'm Sharmistha, creator behind @couturefloss (40K+ dedicated beauty & luxury fashion community with 311,000 average Reel views). My community turns to COUTUREFLOSS for uncompromising makeup craftsmanship, close-up shade swatches, and high-fashion editorial application techniques.

I have long admired [Brand Name]'s commitment to [mention product detail, e.g. skin-first pigment formulations / luminous editorial finishes]. With your upcoming [campaign/launch name], I would love to craft a dedicated cinematic Reel spotlighting the formula in both daylight natural skin and dramatic studio lighting.

My recent beauty masterclass Reels average 300K+ reach with over 80% viewer retention and high save rates from fashion-conscious millennial shoppers in India and abroad.

I have attached my digital media kit and rate card for your review: https://couturefloss.studio/kit

Would you be open to exploring a dedicated partnership for this launch? I would be thrilled to share a tailored creative moodboard and storyboard.

Warm regards,
Sharmistha
Creator, COUTUREFLOSS
Instagram: @couturefloss (311K Avg Reel Views)
sharmic17@gmail.com`,
    followUp: `Hi [Brand Contact Name],

Just following up on my note regarding a potential collaboration between [Brand Name] and @couturefloss for the upcoming collection. 

We are currently locking our campaign calendar for the upcoming month and would love to reserve a dedicated launch slot for [Brand Name]. Let me know if you would like me to send over our creative concepts!

Best,
Sharmistha`,
  },
  {
    id: 'skincare-ritual',
    name: 'Dermatology & Luxury Skincare Routine',
    category: 'Skincare & Haircare',
    subject: 'Editorial Skincare Storytelling: COUTUREFLOSS x [Brand Name]',
    opportunity: 'Active ingredient deep-dive or 14-day barrier repair transformation',
    proposedDeliverables: '1x Educational Routine Reel + 4x Ingredient Breakdown Stories + Carousel Infographic',
    content: `Hi [Brand Contact Name],

I'm reaching out from @couturefloss. My audience is intensely passionate about ingredient transparency, glass-skin barrier care, and scientifically grounded formulations presented with luxury editorial elegance.

Having personally used [Brand Name's Hero Product] as part of my daily ritual, I can genuinely speak to its efficacy in [mention key benefit: e.g. deep hydration / barrier restoration]. Rather than a generic testimonial, I propose crafting an in-depth "Routine & Science" Reel highlighting texture, skin compatibility, and honest results over 14 days.

Key Audience Metrics:
- 40,000+ Followers (78% Women, ages 22-38)
- 68,000+ Average Reel Views (Audited Meta Dashboard)
- Top Cities: Bengaluru, Mumbai, New Delhi, Kolkata
- 6.68% Verified Engagement Rate

Would you have 10 minutes next week to discuss aligning for your upcoming campaign?

Kind regards,
Sharmistha (@couturefloss)`,
    followUp: `Hi [Brand Contact Name],

Following up on our proposed skincare feature with @couturefloss. We have two production slots opening in our editorial calendar next month and would love to feature [Brand Name]. 

Looking forward to hearing your thoughts!

Best,
Sharmistha`,
  },
  {
    id: 'luxury-hotel',
    name: '5-Star Hotel & Luxury Resort Hosted Stay',
    category: 'Travel & Hotels',
    subject: 'Experiential Hospitality Storytelling: COUTUREFLOSS at [Property Name]',
    opportunity: 'Property reopening, luxury villa showcase, or destination culinary experience',
    proposedDeliverables: '2x High-Fashion Destination Reels + 8x Curated Stories (with direct booking link) + High-Res Photography Suite',
    content: `Dear [Hotel PR / Marketing Director],

Warm greetings from @couturefloss!

I am Sharmistha, a luxury fashion, lifestyle, and travel creator based in India. My community turns to COUTUREFLOSS for immersive travel documentaries, architectural aesthetics, and high-fashion resort styling that transports viewers straight into the destination.

I am planning an upcoming itinerary to [Destination / City] between [Dates] and would be delighted to partner with [Property Name] for a hosted experiential feature. 

Deliverables proposed:
- 1x Architectural Tour & Luxury Experience Reel (High-retention storytelling)
- 1x "Resort Styling & Golden Hour Ritual" Reel
- 8x Real-Time Stories capturing dining, wellness, and signature amenities
- Full licensing rights for [Property Name] to repost all raw content and reels

You can view my previous hospitality highlights and verified reach here: https://couturefloss.studio/kit

Could you let me know if hosted press visits are currently open for [Month]?

Warmest regards,
Sharmistha
COUTUREFLOSS (@couturefloss)`,
    followUp: `Dear [Hotel PR / Marketing Director],

Hope you are well! Following up on my media inquiry for [Property Name]. I am finalizing our filming itinerary for [Destination] this week and would love to confirm if we can collaborate on this experiential showcase.

Thank you so much,
Sharmistha`,
  },
  {
    id: 'fashion-styling',
    name: 'Designer Fashion & Seasonal Capsule',
    category: 'Fashion & Styling',
    subject: 'Runway to Reality Capsule: COUTUREFLOSS x [Fashion Brand]',
    opportunity: 'Festive edit, capsule collection drop, or multi-way styling guide',
    proposedDeliverables: '1x "3 Ways to Style" High-Energy Reel + 1x Editorial Carousel + 3x Direct-to-Shop Stories',
    content: `Hi [Styling / PR Lead],

Sharmistha here from @couturefloss. 

My fashion editorial Reels focus on high-impact silhouette storytelling, unexpected color pairings, and elevating contemporary Indian and global couture into timeless capsule moments.

[Brand Name]'s latest collection, specifically [Collection Name / Key Pieces], captured my aesthetic vision immediately. I would love to produce a dedicated "3 Ways to Style [Hero Piece]" transition Reel, merging crisp sound design with bold editorial staging.

With verified high-velocity views (averaging 68,000+ views with peaks to 98K+), my audience actively bookmarks shopping links and styling combinations for festive, cocktail, and destination events.

Looking forward to sharing our lookbook concept with your team!

Best,
Sharmistha
@couturefloss`,
    followUp: `Hi [Styling / PR Lead],

Quick follow up on my fashion styling proposal for [Brand Name]. We are shooting next week's editorial wardrobe and would love to feature pieces from your latest collection. Let me know if you would like me to send over our lookbook selections!

Warm regards,
Sharmistha`,
  },
  {
    id: 'perfume-fragrance',
    name: 'Niche Fragrance & Scent Storytelling',
    category: 'Luxury Lifestyle',
    subject: 'Sensory Luxury: COUTUREFLOSS x [Fragrance House]',
    opportunity: 'New eau de parfum launch or olfactory notes feature',
    proposedDeliverables: '1x Cinematic Mood Reel + 2x Scent Profile Stories + Still Life Assets',
    content: `Dear [Fragrance House PR Team],

Fragrance is the invisible architecture of luxury fashion. On @couturefloss, my scent reviews emphasize emotional atmosphere, top-to-base note transitions, and matching perfumes to specific sartorial moods.

I would be thrilled to spotlight [Fragrance Name] in a high-concept sensory Reel that visually translates its notes of [mention key notes] through striking visual metaphors and evocative styling.

Let's collaborate to make [Fragrance Name] the signature scent recommendation for my 40,000+ tastemaker audience.

Warm regards,
Sharmistha (@couturefloss)`,
    followUp: `Hi [Fragrance Team],

Checking in on my fragrance collaboration pitch. We have an upcoming feature on "Luxury Scents of the Season" and would love to highlight [Brand Name]. 

Best,
Sharmistha`,
  },
  {
    id: 'haircare-styling',
    name: 'Haircare Ritual & High-Tech Styling Tools',
    category: 'Skincare & Haircare',
    subject: 'Editorial Hair Transformation: COUTUREFLOSS x [Brand Name]',
    opportunity: 'Styling tool launch, salon blowout at home, or bond repair ritual',
    proposedDeliverables: '1x Step-by-Step Transformation Reel + 3x Sound-On Styling Stories',
    content: `Hi [Brand Contact],

Hair styling is one of the highest-converting content pillars on @couturefloss, with my blowout and styling reels frequently reaching over 500,000 views and generating hundreds of DM inquiries about tools and protectants.

I would love to partner with [Brand Name] to demonstrate how to achieve salon-grade editorial volume using [Product Name]. 

Our video production is shot in crisp 4K with clean studio audio and clear thermal/technique guidance that builds genuine buyer confidence.

Let me know if we can align on deliverables and campaign timelines for next month!

Best,
Sharmistha`,
    followUp: `Hi [Brand Contact],

Just touching base regarding our haircare styling proposal. Would love to know if you have an active campaign window for [Product Name].

Warmly,
Sharmistha`,
  },
  {
    id: 'pr-gifting',
    name: 'Curated PR Gifting & Unboxing Feature',
    category: 'Beauty & Makeup',
    subject: 'PR Gifting & Editorial Unboxing Feature: COUTUREFLOSS',
    opportunity: 'Seeding new product range or seasonal PR press mailer',
    proposedDeliverables: 'Organic Unboxing Story + Tagged Product Tagging (with option to upgrade to paid Reel)',
    content: `Dear [PR Representative],

I would love to connect and share our updated studio address for any upcoming PR seedings and press mailers from [Brand Name] that align with luxury beauty, fashion, and lifestyle editorial.

Studio Address:
Attn: Sharmistha (COUTUREFLOSS)
100 Feet Road, Indiranagar,
Bengaluru, KA - 560038, India
Contact: +91 98201 XXXXX

Please feel free to share your press releases and high-res imagery with sharmic17@gmail.com.

Looking forward to discovering your latest creations!

Best,
Sharmistha (@couturefloss)`,
    followUp: `Hi [PR Team],

Thank you so much for sending over the press kit! The package arrived beautifully. I will be featuring the unboxing on my Stories this week and tagging @[Brand].

Best,
Sharmistha`,
  },
  {
    id: 'long-term-ambassador',
    name: 'Annual Brand Ambassadorship & Retainer',
    category: 'Luxury Lifestyle',
    subject: 'Strategic Ambassadorship: COUTUREFLOSS x [Brand Name] (Q3/Q4 Retainer)',
    opportunity: 'Multi-month exclusive category ambassadorship and consistent presence',
    proposedDeliverables: 'Monthly: 1x Dedicated Reel, 3x Integrated Stories, VIP Event Attendance & Ad Whitelisting',
    content: `Dear [Marketing Director],

Single one-off posts create fleeting awareness, but authentic long-term ambassadorships build lasting brand affinity and compound purchase intent.

Over the past year, @couturefloss has consistently highlighted [Brand Name] organically. I propose establishing a formal 6-month or 12-month brand ambassadorship wherein COUTUREFLOSS serves as your exclusive fashion/beauty ambassador in this category.

Ambassador Retainer Structure:
- 1x Dedicated Monthly 4K Reel
- 3x Monthly Integrated Stories with trackable affiliate/UTM links
- Exclusive category non-compete protection
- Whitelisting rights for Meta Paid Ads
- In-person attendance and red-carpet coverage for flagship brand events

Let's schedule a brief strategy call to explore how we can elevate [Brand Name]'s creator presence throughout 2026.

Sincerely,
Sharmistha
COUTUREFLOSS Studio`,
    followUp: `Hi [Marketing Director],

Following up on our strategic ambassadorship proposal. I would love to share our projected reach and package cost savings for a 6-month partnership. 

Are you free for a 15-minute call this Thursday?

Warm regards,
Sharmistha`,
  },
];

export const initialCollaborations: Collaboration[] = [
  {
    id: 'collab-1',
    brandName: 'Estée Lauder India',
    brandCategory: 'Beauty & Skincare',
    contactPerson: 'Ananya Roy',
    contactInfo: 'aroy@in.estee.com',
    channel: 'Email',
    campaignType: 'paid',
    proposedAmount: 220000,
    finalAmount: 200000,
    currency: 'INR',
    pitchDate: '2026-09-15',
    followUpDate: '2026-10-30',
    deadline: '2026-11-12',
    deliverables: ['1x 4K Dedicated Reel', '3x Story Set with link', '30-Day Ad Whitelisting'],
    status: 'In Production',
    notes: 'Script approved by brand team. Filming night routine and texture shots this weekend in Mumbai studio.',
    links: 'https://esteelauder.in',
  },
  {
    id: 'collab-2',
    brandName: 'The Oberoi Amarvilas',
    brandCategory: 'Travel & Luxury Hospitality',
    contactPerson: 'Vikram Malhotra',
    contactInfo: 'pr.amarvilas@oberoihotels.com',
    channel: 'Email',
    campaignType: 'hosted',
    proposedAmount: 180000,
    finalAmount: 150000,
    currency: 'INR',
    pitchDate: '2026-10-02',
    followUpDate: '2026-10-29',
    deadline: '2026-11-20',
    deliverables: ['2x Destination Reels', '8x Live Stories', 'Full Photo Suite for Hotel Reshare'],
    status: 'Confirmed',
    notes: 'Hosted 3-night luxury suite experience with Taj Mahal view. Filming couture gown styling and spa ritual.',
    links: 'https://oberoihotels.com',
  },
  {
    id: 'collab-3',
    brandName: 'Nicobar',
    brandCategory: 'Fashion & Styling',
    contactPerson: 'Tara Sen',
    contactInfo: 'tara@nicobar.com',
    channel: 'Instagram DM',
    campaignType: 'paid',
    proposedAmount: 160000,
    finalAmount: 160000,
    currency: 'INR',
    pitchDate: '2026-09-28',
    followUpDate: '2026-10-25',
    deadline: '2026-10-29',
    deliverables: ['1x Multi-Look Reel', '1x Carousel', '2x Stories'],
    status: 'Awaiting Approval',
    notes: 'Draft Reel uploaded for review. Waiting for final marketing sign-off before publishing on Friday.',
    links: 'https://nicobar.com',
  },
  {
    id: 'collab-4',
    brandName: 'Kama Ayurveda',
    brandCategory: 'Skincare & Haircare',
    contactPerson: 'Meera Kapoor',
    contactInfo: 'mkapoor@kamaayurveda.com',
    channel: 'Email',
    campaignType: 'paid',
    proposedAmount: 140000,
    finalAmount: 140000,
    currency: 'INR',
    pitchDate: '2026-08-14',
    followUpDate: '2026-08-20',
    deadline: '2026-09-10',
    deliverables: ['1x Reel', '2x Stories'],
    status: 'Paid / Completed',
    notes: 'Kumkumadi oil campaign published. Achieved 440,000+ views and 18,000 saves. Invoice settled.',
    links: 'https://kamaayurveda.com',
  },
  {
    id: 'collab-5',
    brandName: 'Charlotte Tilbury India',
    brandCategory: 'Beauty & Makeup',
    contactPerson: 'Rohan Varma (Nykaa Luxury PR)',
    contactInfo: 'rohan.v@nykaa.com',
    channel: 'Email',
    campaignType: 'paid',
    proposedAmount: 250000,
    finalAmount: 0,
    currency: 'INR',
    pitchDate: '2026-10-18',
    followUpDate: '2026-10-28',
    deadline: '2026-11-25',
    deliverables: ['1x Pillow Talk Masterclass Reel', '4x Stories'],
    status: 'Negotiating',
    notes: 'Discussing scope of exclusivity clause. Requested ₹2.5L base fee with 15-day beauty category lock.',
    links: 'https://charlottetilbury.com',
  },
  {
    id: 'collab-6',
    brandName: 'Dyson Haircare',
    brandCategory: 'Haircare & Technology',
    contactPerson: 'Siddharth Nair',
    contactInfo: 'siddharth@dysonpr.in',
    channel: 'Email',
    campaignType: 'paid',
    proposedAmount: 280000,
    finalAmount: 0,
    currency: 'INR',
    pitchDate: '2026-10-22',
    followUpDate: '2026-10-31',
    deadline: '2026-12-05',
    deliverables: ['1x Dyson Airstrait Review Reel', '3x Stories', 'UGC Raw Files'],
    status: 'Pitched',
    notes: 'Submitted proposal highlighting 311K avg views and high-income metropolitan demographic fit.',
    links: 'https://dyson.in',
  },
  {
    id: 'collab-7',
    brandName: 'Soneva Fushi Maldives',
    brandCategory: 'Travel & Hotels',
    contactPerson: 'Elena Rostova',
    contactInfo: 'press@soneva.com',
    channel: 'Website Form',
    campaignType: 'hosted',
    proposedAmount: 350000,
    finalAmount: 0,
    currency: 'INR',
    pitchDate: '2026-10-20',
    followUpDate: '2026-11-04',
    deadline: '2027-01-15',
    deliverables: ['3x Destination Reels', '12x Stories', 'Whitelisting'],
    status: 'To Pitch',
    notes: 'Preparing custom media kit PDF and previous luxury resort analytics package for winter retreat.',
    links: 'https://soneva.com',
  },
];

export const initialRateItems: RateItem[] = [
  {
    id: 'rate-1',
    title: 'Dedicated Instagram Reel (30–60s 4K)',
    category: 'Video',
    description: 'Studio-grade 4K vertical Reel with creative storyboard, product integration, seamless editing, and permanent in-feed placement.',
    basePriceINR: 25000,
    basePriceUSD: 300,
    turnaroundDays: 5,
    includes: [
      'Concept pitch & storyboard approval',
      'Studio filming in 4K HDR',
      '1–2 rounds of brand creative revisions',
      'Creator profile tag & collaborative co-authoring',
      'Permanent in-feed placement on @couturefloss',
    ],
    notes: 'Micro-tier industry average: ₹10,000–₹60,000. Covers organic posting; paid ad rights billed separately.',
    isPublicInKit: true,
  },
  {
    id: 'rate-2',
    title: 'Signature Reel + 3x Story Suite (High-Impact Bundle)',
    category: 'Package',
    description: 'Our most requested campaign package. Pairs high-reach 4K organic Reel reach with 3 sequential interactive Stories with direct-to-shop link stickers.',
    basePriceINR: 30000,
    basePriceUSD: 360,
    packageDiscountPercent: 15,
    turnaroundDays: 7,
    includes: [
      '1x Dedicated 4K Instagram Reel',
      '3x Interactive Story slides with swipe/tap link stickers',
      'Click-through & engagement report shared 7 days post-live',
      'Organic comment response & community engagement by creator',
    ],
    notes: 'Saves 15% compared to purchasing deliverables individually.',
    isPublicInKit: true,
  },
  {
    id: 'rate-3',
    title: 'Instagram Story Set (2–3 Frames with Link Stickers)',
    category: 'Stories',
    description: 'Sequential real-time candid unboxing, application texture demo, and direct-to-shop link stickers for immediate 24-hour launch impact.',
    basePriceINR: 8000,
    basePriceUSD: 95,
    turnaroundDays: 2,
    includes: [
      '2 to 3 high-res 9:16 Story slides',
      'Direct clickable purchase / affiliate link sticker',
      'Brand mention & handle tag',
      '24h analytics view/tap report screenshot',
    ],
    notes: 'Benchmark range: ₹5,000 – ₹18,000. 24h ephemeral.',
    isPublicInKit: true,
  },
  {
    id: 'rate-4',
    title: 'Editorial Carousel Post (5–7 Slides)',
    category: 'Static',
    description: 'Curated multi-look fashion styling breakdown or macro beauty swatch guide designed for high bookmarks and long-tail save velocity.',
    basePriceINR: 15000,
    basePriceUSD: 180,
    turnaroundDays: 4,
    includes: [
      '5 to 7 color-graded editorial slides',
      'Descriptive styling & ingredient breakdown in caption',
      'Feed permanent placement',
      'Product tagging & collaborative post invitation',
    ],
    notes: 'Benchmark range: ₹8,000 – ₹35,000. High bookmark save rate.',
    isPublicInKit: true,
  },
  {
    id: 'rate-5',
    title: 'UGC Commercial Video Asset (Raw 4K, No Post)',
    category: 'UGC',
    description: 'Direct-response commercial video asset created for brand Meta Ads, TikTok ads, or website landing pages without mandatory creator profile post.',
    basePriceINR: 7500,
    basePriceUSD: 90,
    turnaroundDays: 4,
    includes: [
      '2x Hook variations for A/B creative testing',
      'Clean voiceover & captions',
      'Raw 4K video files via Dropbox / Drive',
      '60-Day digital advertising commercial license',
    ],
    notes: 'Benchmark range: ₹6,000 – ₹15,000. License only.',
    isPublicInKit: true,
  },
  {
    id: 'rate-6',
    title: '30-Day Paid Ad Whitelisting & Amplification',
    category: 'Usage Rights',
    description: 'Permits brand to boost organic Reel via Meta Partnership Ads or run dark ads through @couturefloss handle for 30 consecutive days.',
    basePriceINR: 8750,
    basePriceUSD: 105,
    turnaroundDays: 1,
    includes: [
      'Meta Partnership Ad code provisioning',
      'Creator handle boosting rights for 30 days',
      'Creator identity amplification',
      'Clean ad attribution',
    ],
    notes: 'Standard benchmark: +35% surcharge on base reel fee per 30-day active cycle.',
    isPublicInKit: true,
  },
  {
    id: 'rate-7',
    title: '30-Day Category Exclusivity Lock-Out',
    category: 'Usage Rights',
    description: 'Guarantees creator will not partner with or mention competing brands within the same category for 30 consecutive days.',
    basePriceINR: 10000,
    basePriceUSD: 120,
    turnaroundDays: 1,
    includes: [
      'Strict category non-compete guarantee',
      'Competitor brand blacklist enforcement',
      'Priority campaign alignment',
    ],
    notes: 'Benchmark: +25% to +60% (30-day lock-outs add 25%–35%; full quarterly 90-day adds 50%+).',
    isPublicInKit: true,
  },
  {
    id: 'rate-8',
    title: 'Hosted Resort Stay & Luxury Hospitality Showcase',
    category: 'Experience',
    description: 'Complete experiential luxury travel & hospitality documentary created on-property during a hosted press stay of 2-3 nights.',
    basePriceINR: 50000,
    basePriceUSD: 600,
    turnaroundDays: 10,
    includes: [
      '2x Cinematic Destination & Resort 4K Reels',
      '8x Live Stories with direct booking links',
      'Suite of 10 retouched high-res photos for hotel reshare',
      'Worldwide organic hotel reposting rights',
    ],
    notes: 'Requires complimentary stay + travel arrangements.',
    isPublicInKit: true,
  },
  {
    id: 'rate-9',
    title: 'Monthly Brand Ambassadorship Retainer',
    category: 'Package',
    description: 'Comprehensive monthly creator ambassadorship delivering continuous presence, sustained buyer affinity, and category exclusivity.',
    basePriceINR: 65000,
    basePriceUSD: 780,
    packageDiscountPercent: 20,
    turnaroundDays: 30,
    includes: [
      '2x Dedicated 4K Reels per month',
      '6x Integrated Stories per month',
      'Continuous 30-day paid ad whitelisting rights',
      'Full category exclusivity protection',
      '1x In-person event attendance / VIP store launch',
    ],
    notes: 'Minimum 3-month commitment. 20% package discount applied.',
    isPublicInKit: false,
  },
];

export const CREATOR_ECONOMY_BENCHMARK_2026 = {
  title: 'Indian Creator Commercial Rate Benchmark (2026)',
  subtitle: 'Market Intelligence & Commercial Deliverable Matrices in INR (₹)',
  source: 'Wishlink / Indian Creator Commercial Standard 2026',
  topCards: [
    { label: 'Micro Reel Avg (10K–100K)', value: '₹35,000', range: 'Range: ₹10,000 – ₹75,000' },
    { label: 'Mid-Tier Reel Avg (100K–500K)', value: '₹1,50,000', range: 'Range: ₹75,000 – ₹2,50,000' },
    { label: 'Paid Ad Surcharge', value: '+30% to +50%', range: 'Per 30 days active' },
    { label: 'Statutory GST', value: '18.0%', range: 'Threshold: > ₹20L p.a.' },
  ],
  tiers: [
    { tier: 'Nano', audience: '1K – 10K', avgReel: '₹5,000', range: '₹2,000 – ₹10,000', isCurrentCreatorTier: false },
    { tier: 'Micro', audience: '10K – 100K', avgReel: '₹35,000', range: '₹10,000 – ₹75,000', isCurrentCreatorTier: true, note: 'COUTUREFLOSS (40K followers, high-velocity 68K+ views)' },
    { tier: 'Mid-Tier', audience: '100K – 500K', avgReel: '₹1,50,000', range: '₹75,000 – ₹2,50,000', isCurrentCreatorTier: false },
    { tier: 'Macro', audience: '500K – 1M', avgReel: '₹4,00,000', range: '₹2,50,000 – ₹6,00,000', isCurrentCreatorTier: false },
    { tier: 'Mega', audience: '1M+', avgReel: '₹12,00,000+', range: '₹12,00,000+ per asset', isCurrentCreatorTier: false },
  ],
  deliverablesSchedule: [
    { type: 'Instagram Reel (30–60s)', nano: '₹2,000 – ₹8,000', micro: '₹10,000 – ₹60,000', mid: '₹75,000 – ₹2,50,000', model: 'Per Post' },
    { type: 'Instagram Story Set (2–3 frames)', nano: '₹1,000 – ₹3,000', micro: '₹5,000 – ₹18,000', mid: '₹20,000 – ₹60,000', model: '24h Ephemeral' },
    { type: 'Static Carousel / Image Post', nano: '₹1,500 – ₹5,000', micro: '₹8,000 – ₹35,000', mid: '₹40,000 – ₹1,20,000', model: 'Feed Permanent' },
    { type: 'YouTube 60s Integration', nano: '₹3,000 – ₹8,000', micro: '₹10,000 – ₹50,000', mid: '₹50,000 – ₹2,00,000', model: 'CPM / View Avg' },
    { type: 'YouTube Dedicated Video', nano: '₹5,000 – ₹15,000', micro: '₹20,000 – ₹1,20,000', mid: '₹1,50,000 – ₹5,00,000', model: 'Full Ownership' },
    { type: 'UGC Video (Raw asset, no post)', nano: '₹2,500 – ₹6,000', micro: '₹6,000 – ₹15,000', mid: '₹15,000 – ₹35,000', model: 'License Only' },
  ],
  commercialAddOns: [
    {
      title: 'Paid Ad Whitelisting',
      rate: '+30% to +50%',
      desc: 'Required whenever a brand runs Meta Partnership Ads or TikTok/Shorts Spark ads through creator handles. Charged on a monthly licensing basis (e.g., 30-day or 60-day cycles).',
    },
    {
      title: 'Category Exclusivity',
      rate: '+25% to +60%',
      desc: 'Prevents creators from working with competing sector brands. 30-day lock-outs add 25%–35%; full quarterly (90-day) exclusivity requires a minimum 50% premium over base deliverables.',
    },
    {
      title: 'Niche Multiplier Matrix',
      rate: '1.2x to 2.5x',
      desc: 'High-conversion or compliance-heavy sectors trade at premium valuations: Skincare & Health (1.3x–1.5x), Personal Finance & Crypto (1.8x–2.5x), Tech & B2B SaaS (1.5x–2.0x), Lifestyle/Comedy (1.0x).',
    },
    {
      title: 'Revision & Rush Turnaround',
      rate: '+25% to +40%',
      desc: 'Base contracts include 1–2 draft review iterations. Substantive script reversals incur ₹5,000–₹25,000 per review round. Turnarounds under 5 working days demand 30%+ expedited fees.',
    },
  ],
  statutoryCompliance: [
    {
      clause: 'Goods & Services Tax (GST)',
      standard: '18% Service GST applicable once creator revenue exceeds ₹20 Lakhs per annum.',
      impl: 'Must be levied in addition to quoted base pricing; invoices require valid GSTIN.',
    },
    {
      clause: 'TDS u/s 194J (Technical / Creative)',
      standard: '10% withholding tax on fees for technical and creative professional services.',
      impl: 'Deducted directly by enterprise brand/agency prior to net balance disbursement.',
    },
    {
      clause: 'TDS u/s 194C (Contract)',
      standard: '1% to 2% withholding if classified as pure media production contract.',
      impl: 'Requires structured work-order terminology defining material production.',
    },
    {
      clause: 'ASCI Disclosure Mandate',
      standard: 'Mandatory #Ad, #Collab, or #Sponsored label in initial 2 lines or prominent overlay.',
      impl: 'Non-negotiable statutory requirement per Consumer Protection Council rules.',
    },
  ],
  commercialTip:
    'Always issue formal work orders specifying deliverable formats, preview approval timelines, raw asset rights, and explicit payment windows (standard industry cycle is 30–45 days post-live confirmation). Avoid perpetual broadcast rights unless compensated with upfront buyout clauses.',
};

export const initialPortfolioItems: PortfolioItem[] = [
  {
    id: 'port-tint',
    shortcode: 'DdanYxVoiBI',
    title: 'Multi-Use Lip & Cheek Tint: Natural Clean Girl Dew',
    category: 'Beauty & Makeup',
    brand: 'Everyday Glow',
    views: 66469,
    reach: 465,
    engagement: '6.84%',
    reelUrl: 'https://www.instagram.com/p/DdanYxVoiBI/',
    liveProofUrl: 'https://www.instagram.com/p/DdanYxVoiBI/',
    thumbnailUrl: '/assets/instagram/DdanYxVoiBI.jpg',
    isFeatured: true,
    captionSnippet: 'Comment "tint" for link 💕 Multi-use lip tint & blush review for daily natural glow.',
    verifiedComments: '123 Verified Comments',
    saves: '1,200 Saves · 1,141 Shares',
    likesCount: 1781,
    savesCount: 1200,
    sharesCount: 1141,
    commentsCount: 123,
    totalInteractions: 4550,
    isMetaVerifiedScreenshot: true,
    insightScreenshotUrl: '/assets/aistudio/Screenshot_2026-10-29_at_3.03.17_PM_ace86f2a.png',
    caseStudySummary: 'Audited Meta Insights: 66,469 total views with 4,550 total interactions (1,781 likes, 1,200 saves, 1,141 shares, 123 comments) demonstrating extraordinary buyer intent and bookmark velocity.',
    publishedDate: '2026-08-15',
    accentColor: '#FF5A0A',
  },
  {
    id: 'port-scalp',
    shortcode: 'De8lwj1xC2I',
    title: 'Scalp Care Ritual: 1% Selenium Sulfide Anti-Dandruff Routine',
    category: 'Skincare & Haircare',
    brand: 'Haircare Rituals',
    views: 67590,
    reach: 14649,
    uniqueViewers: 14649,
    engagement: '6.53%',
    reelUrl: 'https://www.instagram.com/p/De8lwj1xC2I/',
    liveProofUrl: 'https://www.instagram.com/p/De8lwj1xC2I/',
    thumbnailUrl: '/assets/instagram/De8lwj1xC2I.jpg',
    isFeatured: true,
    captionSnippet: 'Ready to step out with confidence, without worrying about dandruff! ✨💆🏻‍♀️ Making scalp care a part of my haircare routine with 1% Selenium Sulfide.',
    verifiedComments: '1,947 Likes · 6 Comments',
    saves: '2,464 Saves & Shares',
    likesCount: 1947,
    commentsCount: 6,
    totalInteractions: 4417,
    nonFollowerReachPercent: 73.5,
    nonFollowerInteractionPercent: 99.8,
    isMetaVerifiedScreenshot: true,
    insightScreenshotUrl: '/assets/aistudio/Screenshot_2026-10-29_at_3.03.45_PM_b73e77b6.png',
    caseStudySummary: 'Audited Meta Insights: 67,590 total views across 14,649 unique accounts reached. 73.5% non-follower reach and 99.8% non-follower interactions on Explore, proving massive customer acquisition capability.',
    publishedDate: '2026-10-21',
    accentColor: '#400849',
  },
  {
    id: 'port-aqualogica',
    shortcode: 'DfFFDs6P2Zj',
    title: 'Aqualogica Sugar Baddie: Marshmallow Gourmand Body Mist',
    category: 'Beauty & Makeup',
    brand: 'Aqualogica',
    views: 78500,
    reach: 64200,
    uniqueViewers: 48900,
    engagement: '7.4%',
    reelUrl: 'https://www.instagram.com/p/DfFFDs6P2Zj/',
    liveProofUrl: 'https://www.instagram.com/p/DfFFDs6P2Zj/',
    thumbnailUrl: '/assets/instagram/DfFFDs6P2Zj.jpg',
    isFeatured: true,
    captionSnippet: '🎀 Entering my Sugar Baddie era 💗✨ Smelling like a sweet marshmallow dream! ☁️🍓 Meet the Aqualogica Refresh+ Sugar Baddie Body Mist — a skin-friendly, refreshing mist with a delicious marshmallow gourmand fragrance that lasts up to 8 hours. 💕🧁 Comment "PINK" below!',
    verifiedComments: '4,867 Verified Likes · "PINK" Keyword Automation',
    saves: '2,150 Saves · 1,480 Shares',
    likesCount: 4867,
    commentsCount: 184,
    totalInteractions: 5120,
    nonFollowerReachPercent: 76.2,
    caseStudySummary: 'High-velocity brand partnership for Aqualogica with 4,867 verified likes. Integrated an interactive "Comment PINK" call-to-action driving immediate DM product links and impulse fragrance purchases.',
    publishedDate: '2026-10-29',
    accentColor: '#E7B0DE',
  },
  {
    id: 'port-lotus',
    shortcode: 'DfEEcfQNzMy',
    title: 'Lotus Herbals Safe Sun SPF 50+: HydroActivated Sun Care Routine',
    category: 'Skincare & Haircare',
    brand: 'Lotus Herbals',
    views: 84200,
    reach: 68500,
    engagement: '5.8%',
    reelUrl: 'https://www.instagram.com/p/DfEEcfQNzMy/',
    liveProofUrl: 'https://www.instagram.com/p/DfEEcfQNzMy/',
    thumbnailUrl: '/assets/instagram/DfEEcfQNzMy.jpg',
    isFeatured: true,
    captionSnippet: 'Girl, your sunscreen needs to keep up with you! ☀️🧡✨ Meet the Lotus Herbals Safe Sun HydroActivated Sunscreen SPF 50+ with sweat & water resistance.',
    verifiedComments: 'Direct Link Queries',
    saves: '1,150 Saves',
    caseStudySummary: 'High-conversion sun-care campaign demonstrating sweat & water resistance and 2X protection surge for active outdoor living.',
    publishedDate: '2026-10-24',
    accentColor: '#FF5A0A',
  },
  {
    id: 'port-navratri',
    shortcode: 'DetlEPTPbV4',
    title: 'Navratri Transformation: Winged Eyeliner & Desi Glam Transition',
    category: 'Fashion & Styling',
    brand: 'Festival Series',
    views: 98400,
    reach: 78900,
    engagement: '8.2%',
    reelUrl: 'https://www.instagram.com/p/DetlEPTPbV4/',
    liveProofUrl: 'https://www.instagram.com/p/DetlEPTPbV4/',
    thumbnailUrl: '/assets/instagram/DetlEPTPbV4.jpg',
    isFeatured: true,
    captionSnippet: 'Bani bani prem deewani bani 🌚 Navratri makeover, winged eyeliner look, ethnic glam look, desi girl transformation.',
    verifiedComments: '32K+ Audio Uses',
    saves: '2,800+ Saves',
    caseStudySummary: 'Viral festive transformation reel ranking on trending audio with high save rates and explore page velocity.',
    publishedDate: '2026-10-06',
    accentColor: '#FF5A0A',
  },
  {
    id: 'port-pujo1',
    shortcode: 'DeI3gCYPcDE',
    title: 'Pujor Shaaj Episode 01: Traditional Bengali Festive Essentials',
    category: 'Daily Vlogs & Opinions',
    brand: 'Pujor Shaaj Series',
    views: 89000,
    reach: 71200,
    engagement: '7.5%',
    reelUrl: 'https://www.instagram.com/p/DeI3gCYPcDE/',
    liveProofUrl: 'https://www.instagram.com/p/DeI3gCYPcDE/',
    thumbnailUrl: '/assets/instagram/DeI3gCYPcDE.jpg',
    isFeatured: true,
    captionSnippet: '🌺✨ Pujor Shaaj — Episode 1 ✨🌺 Pujo season is officially here, and I’m starting with the little beauty essentials that make the festive shaaj come together.',
    verifiedComments: '155+ Verified Comments',
    saves: '1,890 Saves',
    caseStudySummary: 'Generated over 155 comments and direct link requests for traditional festive jewelry and sarees.',
    publishedDate: '2026-09-24',
    accentColor: '#E7B0DE',
  },
  {
    id: 'port-wishcare',
    shortcode: 'De37DW3P-wD',
    title: 'WishCare Multi-Peptide Anti-Hairfall Shampoo: Science & Routine',
    category: 'Skincare & Haircare',
    brand: 'WishCare',
    views: 91500,
    reach: 74600,
    engagement: '7.1%',
    reelUrl: 'https://www.instagram.com/p/De37DW3P-wD/',
    liveProofUrl: 'https://www.instagram.com/p/De37DW3P-wD/',
    thumbnailUrl: '/assets/instagram/De37DW3P-wD.jpg',
    isFeatured: true,
    captionSnippet: '💆🏻‍♀️✨ My honest review of the WishCare Multi Peptide Anti-Hairfall Shampoo! 🧴🤍 If hair fall, weak strands and dull hair are your concerns, this one deserves a spot.',
    verifiedComments: '92+ Active Comments',
    saves: '1,640 Saves',
    caseStudySummary: 'Over 92 organic user comments discussing hairfall recovery and peptide benefits with high comment-to-purchase intent.',
    publishedDate: '2026-10-12',
    accentColor: '#400849',
  },
  {
    id: 'port-pujo2',
    shortcode: 'DeTy0_MvvWW',
    title: 'Pujor Shaaj Episode 02: Dramatic Shimmer Winged Eye Glam',
    category: 'Beauty & Makeup',
    brand: 'Pujor Shaaj Series',
    views: 74200,
    reach: 59800,
    engagement: '6.9%',
    reelUrl: 'https://www.instagram.com/p/DeTy0_MvvWW/',
    liveProofUrl: 'https://www.instagram.com/p/DeTy0_MvvWW/',
    thumbnailUrl: '/assets/instagram/DeTy0_MvvWW.jpg',
    isFeatured: false,
    captionSnippet: '✨ PUJOR SHAAJ 🌺 | EPISODE 02 ✨ A little shimmer, a sharp wing, and eyes that do all the talking. For every Bengali girl who loves a little drama in her makeup!',
    verifiedComments: 'High Share Velocity',
    saves: '1,280 Saves',
    caseStudySummary: 'Celebrated Bengali festive episode spotlighting high-drama festive eye glam for pandal-hopping and cultural evenings.',
    publishedDate: '2026-09-30',
    accentColor: '#806785',
  },
  {
    id: 'port-blueheaven',
    shortcode: 'De6WF0qvm7q',
    title: 'Blue Heaven Shringaar Kit: Festive Ethnic Beauty & Traditional Glam',
    category: 'Beauty & Makeup',
    brand: 'Blue Heaven Cosmetics',
    views: 69400,
    reach: 54800,
    engagement: '6.4%',
    reelUrl: 'https://www.instagram.com/p/De6WF0qvm7q/',
    liveProofUrl: 'https://www.instagram.com/p/De6WF0qvm7q/',
    thumbnailUrl: '/assets/instagram/De6WF0qvm7q.jpg',
    isFeatured: false,
    captionSnippet: '✨ One kit, endless festive beauty! ❤️💄 Get ready to embrace your traditional glam with the Blue Heaven Shringaar Kit — all your festive essentials in one place!',
    verifiedComments: 'In-Store Purchase Lift',
    saves: '1,120 Saves',
    caseStudySummary: 'Complete festive shringaar ritual highlighting accessible beauty essentials, ethnic styling, and festive season wear.',
    publishedDate: '2026-10-18',
    accentColor: '#E7B0DE',
  },
  {
    id: 'port-myntra',
    shortcode: 'DezAIllPL20',
    title: 'Myntra Beauty BFF Sale Haul: Skincare Essentials & Lip Tints',
    category: 'Luxury Lifestyle',
    brand: 'Myntra Beauty',
    views: 58600,
    reach: 46200,
    engagement: '5.6%',
    reelUrl: 'https://www.instagram.com/p/DezAIllPL20/',
    liveProofUrl: 'https://www.instagram.com/p/DezAIllPL20/',
    thumbnailUrl: '/assets/instagram/DezAIllPL20.jpg',
    isFeatured: false,
    captionSnippet: 'My Myntra Beauty Finds are here! 🎀💄✨ From skincare essentials to lip tints, body lotion and fragrances — these beauty picks deserve a spot in your routine!',
    verifiedComments: 'Mass DM Link Requests',
    saves: '980 Saves',
    caseStudySummary: 'Comprehensive e-commerce beauty haul reviewing top viral products across lip care, hydration, and niche perfumes.',
    publishedDate: '2026-10-09',
    accentColor: '#FFE4D5',
  },
];

export const initialDeliverables: DeliverableTask[] = [
  {
    id: 'del-1',
    deliverableName: 'Advanced Night Repair 4K Dedicated Reel',
    brand: 'Estée Lauder India',
    dueDate: '2026-11-06',
    contentFormat: 'Reel',
    scriptStatus: 'Approved',
    shootStatus: 'In Progress',
    editingStatus: 'Drafting',
    approvalStatus: 'Pending',
    publishingDate: '2026-11-12',
    liveUrl: '',
    invoiceStatus: 'Unbilled',
    isOverdue: false,
    notes: 'Studio lighting setup scheduled for Thursday afternoon. Need macro drop shot of dropper.',
  },
  {
    id: 'del-2',
    deliverableName: 'Autumn Capsule Styling 3-Way Lookbook Reel',
    brand: 'Nicobar',
    dueDate: '2026-10-27',
    contentFormat: 'Reel',
    scriptStatus: 'Approved',
    shootStatus: 'Completed',
    editingStatus: 'Completed',
    approvalStatus: 'Under Review',
    publishingDate: '2026-10-30',
    liveUrl: '',
    invoiceStatus: 'Invoiced',
    isOverdue: true, // Urgent follow up!
    notes: 'Waiting for brand feedback on cut #2 with text overlay changes.',
  },
  {
    id: 'del-3',
    deliverableName: 'Taj View Suite Experience & Spa Ritual Reel',
    brand: 'The Oberoi Amarvilas',
    dueDate: '2026-11-18',
    contentFormat: 'Hosted Trip Coverage',
    scriptStatus: 'In Progress',
    shootStatus: 'Not Started',
    editingStatus: 'Not Started',
    approvalStatus: 'Pending',
    publishingDate: '2026-11-20',
    liveUrl: '',
    invoiceStatus: 'Unbilled',
    isOverdue: false,
    notes: 'Packing 3 couture outfits for the sunrise shoot on the private balcony.',
  },
  {
    id: 'del-4',
    deliverableName: 'Pillow Talk Matte Revolution Story Set (3 Slides)',
    brand: 'Charlotte Tilbury India',
    dueDate: '2026-11-22',
    contentFormat: 'Story Set',
    scriptStatus: 'Not Started',
    shootStatus: 'Not Started',
    editingStatus: 'Not Started',
    approvalStatus: 'Pending',
    publishingDate: '2026-11-25',
    liveUrl: '',
    invoiceStatus: 'Unbilled',
    isOverdue: false,
    notes: 'Pending final contract signature before shoot dates are locked.',
  },
  {
    id: 'del-5',
    deliverableName: 'Kumkumadi Miracle Beauty Oil Autumn Review',
    brand: 'Kama Ayurveda',
    dueDate: '2026-09-08',
    contentFormat: 'Reel',
    scriptStatus: 'Approved',
    shootStatus: 'Completed',
    editingStatus: 'Completed',
    approvalStatus: 'Approved',
    publishingDate: '2026-09-10',
    liveUrl: 'https://www.instagram.com/reel/C8_example1/',
    invoiceStatus: 'Paid',
    isOverdue: false,
    notes: 'Campaign successfully delivered with 642K views.',
  },
];

export const initialPitches: PitchRecord[] = [
  {
    id: 'pitch-1',
    brandName: 'Dyson Haircare',
    brandCategory: 'Haircare & Styling',
    contactEmail: 'siddharth@dysonpr.in',
    pitchChannel: 'Email',
    campaignOpportunity: 'Dyson Airstrait Launch Campaign in India',
    pitchObjective: 'Secure dedicated 4K Reel highlighting wet-to-dry styling without extreme heat damage.',
    proposedDeliverables: '1x 4K Reel + 3x Stories + UGC Whitelisting',
    quotedFee: 280000,
    currency: 'INR',
    personalizationNotes: 'Emphasize high retention on previous haircare blowout videos (500K+ views) and tech-savvy women demographic.',
    draftPitch: pitchTemplates[5].content,
    followUpMessage: pitchTemplates[5].followUp,
    status: 'Sent',
    sendDate: '2026-10-22',
    templateId: 'haircare-styling',
  },
  {
    id: 'pitch-2',
    brandName: 'Jo Malone London',
    brandCategory: 'Luxury Fragrance',
    contactEmail: 'pr-india@jomalone.com',
    pitchChannel: 'Email',
    campaignOpportunity: 'Winter Cologne Pairing & Festive Candle Gifting',
    pitchObjective: 'Pitch high-concept visual story matching Wood Sage & Sea Salt with autumn silk styling.',
    proposedDeliverables: '1x Mood Reel + 2x Stories',
    quotedFee: 160000,
    currency: 'INR',
    personalizationNotes: 'Mention sensory luxury angle and recent fashion styling engagement.',
    draftPitch: pitchTemplates[4].content,
    followUpMessage: pitchTemplates[4].followUp,
    status: 'Ready',
    sendDate: '2026-10-28',
    templateId: 'perfume-fragrance',
  },
  {
    id: 'pitch-3',
    brandName: 'Soneva Fushi Maldives',
    brandCategory: 'Travel & Hotels',
    contactEmail: 'press@soneva.com',
    pitchChannel: 'Email',
    campaignOpportunity: 'Winter Luxury Retreat Hosted Stay Feature',
    pitchObjective: 'Hosted villa stay exchange for 3x Reels and 12x Stories + Still Photography.',
    proposedDeliverables: '3x Destination Reels + 12x Stories + High-Res Photo Suite',
    quotedFee: 350000,
    currency: 'INR',
    personalizationNotes: 'Highlight 40K+ luxury lifestyle audience with high disposable income in Mumbai/Delhi.',
    draftPitch: pitchTemplates[2].content,
    followUpMessage: pitchTemplates[2].followUp,
    status: 'Draft',
    sendDate: '',
    templateId: 'luxury-hotel',
  },
];
