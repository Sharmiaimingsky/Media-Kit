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
  location: 'Mumbai & Delhi, India',
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
  avatarUrl: '', // Will use high-fashion avatar component if empty
  heroImageUrl: '', // Will use editorial hero component if empty
  businessEmail: 'collaborations@couturefloss.com',
  instagramUrl: 'https://www.instagram.com/couturefloss/',
  portfolioUrl: 'https://couturefloss.studio',
  // Verified / user-provided baseline figures:
  followers: 40000,
  followersDisplay: '40,000+',
  followersVerified: true,
  avgReelViews: 311000,
  avgReelViewsDisplay: '311,000',
  avgReelViewsVerified: true,
  // Unverified / editable metrics:
  engagementRate: 4.8,
  engagementRateVerified: false,
  monthlyReach: 1450000,
  monthlyReachVerified: false,
  monthlyImpressions: 2800000,
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
collaborations@couturefloss.com`,
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
- 311,000 Average Reel Views
- Top Cities: Mumbai, New Delhi, Bengaluru, Dubai, London

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
- 1x Architectural Tour & Luxury Experience Reel (311K+ expected reach)
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

With an average of 311,000 views per Reel, my audience actively bookmarks shopping links and styling combinations for festive, cocktail, and destination events.

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
B-402, Signature Towers, High Street Road,
Lower Parel, Mumbai, MH - 400013, India
Contact: +91 98201 XXXXX

Please feel free to share your press releases and high-res imagery with collaborations@couturefloss.com.

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
    title: 'Dedicated Instagram Reel (4K 9:16)',
    category: 'Video',
    description: 'High-production fashion or beauty Reel featuring dedicated product integration, custom studio lighting, professional color grading, and organic voiceover.',
    basePriceINR: 150000,
    basePriceUSD: 1850,
    turnaroundDays: 7,
    includes: [
      'Concept pitch & storyboard approval',
      'Studio filming in 4K HDR',
      '1 round of brand creative revisions',
      'Creator profile tag & collaborative co-authoring',
      'Live in-feed permanence for 12 months minimum',
    ],
    notes: 'Rates cover organic posting. Paid media rights billed separately.',
    isPublicInKit: true,
  },
  {
    id: 'rate-2',
    title: 'Signature Reel + 3x Story Suite',
    category: 'Package',
    description: 'Our most popular collaboration package. Maximizes immediate launch impact with interactive Story stickers and sustained organic algorithmic reach via Reel.',
    basePriceINR: 195000,
    basePriceUSD: 2400,
    packageDiscountPercent: 15,
    turnaroundDays: 8,
    includes: [
      '1x Dedicated Instagram Reel',
      '3x Sequential Story slides with trackable link sticker',
      'Engagement report shared 7 days post-live',
      'Organic engagement reply by creator',
    ],
    notes: 'Save 15% compared to purchasing deliverables individually.',
    isPublicInKit: true,
  },
  {
    id: 'rate-3',
    title: 'Instagram Story Set (3 Slides)',
    category: 'Stories',
    description: 'Sequential, candid and unscripted story sequence showing direct real-time unboxing, texture review, or event coverage with link stickers.',
    basePriceINR: 65000,
    basePriceUSD: 800,
    turnaroundDays: 3,
    includes: [
      '3x High-res 9:16 Story slides',
      'Trackable CTA sticker / affiliate discount link',
      'Brand tag on all slides',
      '24-hour analytics screenshot report',
    ],
    notes: 'Ideal for flash sales, launch announcements, and event buzz.',
    isPublicInKit: true,
  },
  {
    id: 'rate-4',
    title: 'High-Fashion Carousel Post (5-7 Slides)',
    category: 'Static',
    description: 'Curated editorial photo gallery featuring multiple styling angles, macro beauty details, and high-save descriptive captions.',
    basePriceINR: 110000,
    basePriceUSD: 1350,
    turnaroundDays: 5,
    includes: [
      '5 to 7 color-graded editorial slides',
      'Detailed caption with styling breakdown and product tags',
      'Collaborative post invitation',
    ],
    notes: 'Exceptional for high save-rate capsule wardrobe guides.',
    isPublicInKit: true,
  },
  {
    id: 'rate-5',
    title: 'UGC Video Asset (Brand Ad Whitelisting)',
    category: 'UGC',
    description: 'Direct-response UGC-style video crafted specifically for brand Meta ads, TikTok ads, or website landing pages without mandatory organic post.',
    basePriceINR: 90000,
    basePriceUSD: 1100,
    turnaroundDays: 5,
    includes: [
      '2x Hook variations for A/B testing',
      'Clean audio and dynamic captions',
      'Raw 4K video files via Dropbox / Drive',
      'Full brand commercial ad rights for 60 days',
    ],
    notes: 'Does not require creator profile posting.',
    isPublicInKit: true,
  },
  {
    id: 'rate-6',
    title: '30-Day Paid Ad Usage Rights & Whitelisting',
    category: 'Usage Rights',
    description: 'Permits the brand to boost the organic Reel via Meta Partnership Ads or run dark posts using the creator handle for 30 consecutive days.',
    basePriceINR: 45000,
    basePriceUSD: 550,
    turnaroundDays: 1,
    includes: [
      'Meta Partnership Ad code generation',
      'Dark posting permissions for 30 days',
      'Clean creator attribution',
    ],
    notes: 'Can be renewed monthly at the same rate.',
    isPublicInKit: false,
  },
  {
    id: 'rate-7',
    title: 'Luxury Hotel / Resort Hosted Stay Content Suite',
    category: 'Experience',
    description: 'Complete experiential hospitality content package created on-property during a hosted stay of 2-3 nights.',
    basePriceINR: 260000,
    basePriceUSD: 3200,
    turnaroundDays: 12,
    includes: [
      '2x Cinematic Destination & Resort Reels',
      '8x Curated Real-Time Stories with direct booking links',
      '10x High-resolution retouched still images for hotel website and social use',
      'Worldwide digital marketing rights for the hotel brand',
    ],
    notes: 'Requires complimentary stay + travel arrangements.',
    isPublicInKit: true,
  },
  {
    id: 'rate-8',
    title: 'Exclusive Category Brand Ambassadorship (Monthly)',
    category: 'Package',
    description: 'Comprehensive monthly retainer providing category non-compete exclusivity, steady monthly content output, and prioritized brand advocacy.',
    basePriceINR: 320000,
    basePriceUSD: 3900,
    packageDiscountPercent: 25,
    turnaroundDays: 30,
    includes: [
      '2x Dedicated Reels per month',
      '6x Integrated Stories per month',
      'Full 30-day continuous paid ad usage rights',
      'Category exclusivity (no rival brand mentions)',
      '1x In-person event attendance / VIP store launch',
    ],
    notes: 'Minimum 3-month commitment required.',
    isPublicInKit: false,
  },
];

export const initialPortfolioItems: PortfolioItem[] = [
  {
    id: 'port-1',
    title: 'The Glass Skin Ritual: Monsoon Hydration & Barrier Repair',
    category: 'Skincare & Haircare',
    brand: 'Kama Ayurveda',
    views: 642000,
    reach: 780000,
    engagement: '5.4%',
    reelUrl: 'https://www.instagram.com/reel/C8_example1/',
    thumbnailUrl: '',
    isFeatured: true,
    caseStudySummary: 'Generated over 22,000 saves and driven directly to client e-commerce portal with 1,800+ link clicks through sequential Story follow-ups.',
    publishedDate: '2026-08-18',
    accentColor: '#E7B0DE',
  },
  {
    id: 'port-2',
    title: 'Couture Saree Draping: 4 Modern Silhouettes for Festive Season',
    category: 'Fashion & Styling',
    brand: 'Nicobar & Raw Mango',
    views: 489000,
    reach: 590000,
    engagement: '6.1%',
    reelUrl: 'https://www.instagram.com/reel/C9_example2/',
    thumbnailUrl: '',
    isFeatured: true,
    caseStudySummary: 'Viral fashion reel exploring avant-garde drape techniques with tailored blazers. Ranked #1 under trending styling audio for 11 days.',
    publishedDate: '2026-09-04',
    accentColor: '#400849',
  },
  {
    id: 'port-3',
    title: 'Sunset at Lake Pichola: Luxury Heritage Palaces of Udaipur',
    category: 'Travel & Hotels',
    brand: 'Taj Lake Palace',
    views: 382000,
    reach: 450000,
    engagement: '4.9%',
    reelUrl: 'https://www.instagram.com/reel/C7_example3/',
    thumbnailUrl: '',
    isFeatured: true,
    caseStudySummary: 'Experiential hospitality feature highlighting royal sunset boat transfers and culinary heritage. High conversion to direct booking inquiries.',
    publishedDate: '2026-07-22',
    accentColor: '#FF5A0A',
  },
  {
    id: 'port-4',
    title: 'Bold Berry Lips & Graphic Liner: High-Fashion Autumn Editorial',
    category: 'Beauty & Makeup',
    brand: 'Fenty Beauty / Nykaa',
    views: 311000,
    reach: 395000,
    engagement: '4.7%',
    reelUrl: 'https://www.instagram.com/reel/D1_example4/',
    thumbnailUrl: '',
    isFeatured: true,
    caseStudySummary: 'High-speed editorial beauty transitions demonstrating pigment payoff and 12-hour wear test under hot studio illumination.',
    publishedDate: '2026-09-29',
    accentColor: '#806785',
  },
  {
    id: 'port-5',
    title: 'Capsule Trench Coat & Monochrome Tailoring for London Autumn',
    category: 'Luxury Lifestyle',
    brand: 'Massimo Dutti',
    views: 275000,
    reach: 340000,
    engagement: '4.2%',
    reelUrl: 'https://www.instagram.com/reel/D2_example5/',
    thumbnailUrl: '',
    isFeatured: false,
    caseStudySummary: 'Street style lookbook in Mayfair and Soho. High international viewer reach across UK and UAE audiences.',
    publishedDate: '2026-10-08',
    accentColor: '#FFE4D5',
  },
  {
    id: 'port-6',
    title: 'Why I Stopped Chasing Micro-Trends: A Candid Opinion on Personal Style',
    category: 'Daily Vlogs & Opinions',
    brand: 'Self-Produced',
    views: 520000,
    reach: 630000,
    engagement: '7.8%',
    reelUrl: 'https://www.instagram.com/reel/D3_example6/',
    thumbnailUrl: '',
    isFeatured: false,
    caseStudySummary: 'Talking-head opinion reel that sparked over 1,400 thoughtful comments and shares on fashion consumerism and authentic personal identity.',
    publishedDate: '2026-10-15',
    accentColor: '#E7B0DE',
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
