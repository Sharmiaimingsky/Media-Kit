import React, { useState, useEffect } from 'react';
import {
  Download,
  Share2,
  Copy,
  Check,
  Edit3,
  Smartphone,
  Monitor,
  Instagram,
  Mail,
  MapPin,
  Globe,
  ArrowUpRight,
  Sparkles,
  Send,
  Plus,
  Trash2,
  CheckCircle2,
  Star,
  Info,
  Layers,
  Play,
  Eye,
  Heart,
  Camera,
  Maximize2,
  X,
  Filter,
  ShieldCheck,
  MessageCircle,
  ExternalLink,
  Loader2,
  Calculator,
  Percent,
  FileText,
  FileCheck,
  ArrowRight,
  Receipt,
  CheckSquare,
  Square,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CreatorAvatar, EditorialCoverArtwork, EditorialCardIllustration } from './EditorialVisuals';
import { ContentCategory } from '../types';
import { generateMediaKitPdf } from '../utils/pdfGenerator';
import { CREATOR_ECONOMY_BENCHMARK_2026 } from '../data/initialData';

interface LookbookItem {
  id: string;
  title: string;
  category: 'Couture & Heritage' | 'Beauty & Skincare' | 'Resort & Travel' | 'Festive & Glam' | 'Lifestyle';
  imageUrl: string;
  tag: string;
  stylingNotes: string;
  deliverableFit: string;
  isReel?: boolean;
  reelUrl?: string;
  views?: string;
}

const LOOKBOOK_ITEMS: LookbookItem[] = [
  // --- REAL EXTRACTED INSTAGRAM REELS ---
  {
    id: 'lb-reel-aqualogica',
    title: 'Aqualogica Sugar Baddie: Marshmallow Gourmand Body Mist',
    category: 'Beauty & Skincare',
    imageUrl: '/assets/instagram/DfFFDs6P2Zj.jpg',
    tag: 'Brand Collab',
    isReel: true,
    reelUrl: 'https://www.instagram.com/p/DfFFDs6P2Zj/',
    views: '78K+ Views · 4.8K Likes',
    stylingNotes: 'Girly pink aesthetic, delicious marshmallow gourmand scent storytelling, direct unboxing & application.',
    deliverableFit: 'High-conversion fragrance & body mist reviews, pink aesthetic styling, "Comment to receive link" DM automation.',
  },
  {
    id: 'lb-reel-lotus',
    title: 'Lotus Herbals Safe Sun SPF 50+: HydroActivated Sun Care Routine',
    category: 'Beauty & Skincare',
    imageUrl: '/assets/instagram/DfEEcfQNzMy.jpg',
    tag: 'Verified Reel',
    isReel: true,
    reelUrl: 'https://www.instagram.com/p/DfEEcfQNzMy/',
    views: '348K Views',
    stylingNotes: 'Outdoor active lifestyle, sweat & water resistance demonstration, warm sunny-day golden lighting.',
    deliverableFit: 'High-production sunscreen reviews, outdoor lifestyle features, summer skincare campaigns.',
  },
  {
    id: 'lb-reel-navratri',
    title: 'Navratri Transformation: Winged Eyeliner & Desi Glam Transition',
    category: 'Festive & Glam',
    imageUrl: '/assets/instagram/DetlEPTPbV4.jpg',
    tag: 'Viral Transition',
    isReel: true,
    reelUrl: 'https://www.instagram.com/p/DetlEPTPbV4/',
    views: '680K Views',
    stylingNotes: 'Seamless transformation cut, sharp winged eyeliner, traditional oxidised silver jewelry, black ethnic ghagra.',
    deliverableFit: 'High-tempo transition reels, festive seasonal campaigns, statement jewelry drops.',
  },
  {
    id: 'lb-reel-pujo1',
    title: 'Pujor Shaaj Episode 01: Traditional Bengali Festive Essentials',
    category: 'Couture & Heritage',
    imageUrl: '/assets/instagram/DeI3gCYPcDE.jpg',
    tag: 'Durga Pujo Edit',
    isReel: true,
    reelUrl: 'https://www.instagram.com/p/DeI3gCYPcDE/',
    views: '590K Views',
    stylingNotes: 'Classic red border saree, heritage gold jewelry, festive bindi, authentic cultural celebration.',
    deliverableFit: 'Traditional saree campaigns, authentic regional festive collaborations, high comment conversion (155+ comments).',
  },
  {
    id: 'lb-reel-wishcare',
    title: 'WishCare Multi-Peptide Anti-Hairfall Routine & Science',
    category: 'Beauty & Skincare',
    imageUrl: '/assets/instagram/De37DW3P-wD.jpg',
    tag: 'Haircare Science',
    isReel: true,
    reelUrl: 'https://www.instagram.com/p/De37DW3P-wD/',
    views: '520K Views',
    stylingNotes: 'Clean shower routine, bouncy blow-dry results, peptide and ceramide science breakdown.',
    deliverableFit: 'Sulphate-free haircare, hairfall treatment, ingredient-conscious beauty brands.',
  },
  {
    id: 'lb-reel-pujo2',
    title: 'Pujor Shaaj Episode 02: Dramatic Shimmer Winged Eye Glam',
    category: 'Festive & Glam',
    imageUrl: '/assets/instagram/DeTy0_MvvWW.jpg',
    tag: 'Dramatic Eye Glam',
    isReel: true,
    reelUrl: 'https://www.instagram.com/p/DeTy0_MvvWW/',
    views: '440K Views',
    stylingNotes: 'Bengali festive saree drape, gold temple jhumkas, high-drama shimmer wing eye makeup.',
    deliverableFit: 'Evening festive makeup, eye palette launches, pandal-hopping lookbooks.',
  },
  {
    id: 'lb-reel-blueheaven',
    title: 'Blue Heaven Shringaar Kit: Festive Ethnic Beauty',
    category: 'Festive & Glam',
    imageUrl: '/assets/instagram/De6WF0qvm7q.jpg',
    tag: 'Ethnic Shringaar',
    isReel: true,
    reelUrl: 'https://www.instagram.com/p/De6WF0qvm7q/',
    views: '412K Views',
    stylingNotes: 'Traditional red bindi, festive sindoor, gold ethnic jewelry, warm festive color palette.',
    deliverableFit: 'Festive beauty kits, accessible cosmetics, bridal guest styling.',
  },
  {
    id: 'lb-reel-myntra',
    title: 'Myntra Beauty BFF Sale Haul: Skincare & Lip Tints',
    category: 'Lifestyle',
    imageUrl: '/assets/instagram/DezAIllPL20.jpg',
    tag: 'E-Comm Haul',
    isReel: true,
    reelUrl: 'https://www.instagram.com/p/DezAIllPL20/',
    views: '375K Views',
    stylingNotes: 'Vibrant unboxing, lip tint swatches, luxury perfume showcase, and GRWM pacing.',
    deliverableFit: 'E-commerce sales events, beauty aggregator hauls, mass product seeding.',
  },
  {
    id: 'lb-reel-tint',
    title: 'Multi-Use Lip & Cheek Tint: Natural Clean Girl Dew',
    category: 'Beauty & Skincare',
    imageUrl: '/assets/instagram/DdanYxVoiBI.jpg',
    tag: 'UGC Clean Dew',
    isReel: true,
    reelUrl: 'https://www.instagram.com/p/DdanYxVoiBI/',
    views: '315K Views',
    stylingNotes: 'Sunlit natural lighting, dewy cheek flush, glossy tint application, candid personality.',
    deliverableFit: 'UGC video assets, multi-use tint seeding, direct-response brand ads.',
  },
  {
    id: 'lb-reel-scalp',
    title: 'Scalp Care Ritual: Flake-Free Confidence & Hair Longevity',
    category: 'Beauty & Skincare',
    imageUrl: '/assets/instagram/De8lwj1xC2I.jpg',
    tag: 'Scalp Health',
    isReel: true,
    reelUrl: 'https://www.instagram.com/p/De8lwj1xC2I/',
    views: '295K Views',
    stylingNotes: 'Close-up scalp massage, glossy salon hair texture, clean wellness routine.',
    deliverableFit: 'Dandruff treatments, scalp serums, Amazon affiliate conversions.',
  },

  // --- EDITORIAL PORTFOLIO MASTERPIECES ---
  {
    id: 'lb-1',
    title: 'Sunrise at the Lotus Waters',
    category: 'Resort & Travel',
    imageUrl: '/assets/aistudio/1CD2BD78-5F60-4824-BE87-D1E4B2CB0946_5909ad5f.PNG',
    tag: 'Editorial Cover',
    stylingNotes: 'Traditional red and white drape, floating lotus blossoms, golden hour dawn reflections.',
    deliverableFit: 'Cinematic destination reels, luxury hospitality partnerships, heritage campaign covers.',
  },
  {
    id: 'lb-2',
    title: 'The Lotus Blossom & Traditional Glamour',
    category: 'Beauty & Skincare',
    imageUrl: '/assets/aistudio/1354B2F4-2E78-4550-B553-89473717ECFC_a78102df.PNG',
    tag: 'Macro Beauty',
    stylingNotes: 'Statement bridal gold nose ring, vermilion accents, luminous skin finish with fresh lotus.',
    deliverableFit: 'High-end cosmetics launches, bridal jewelry endorsements, editorial print/digital billboards.',
  },
  {
    id: 'lb-3',
    title: 'Sunlit Frangipani & Dewy Glow',
    category: 'Beauty & Skincare',
    imageUrl: '/assets/aistudio/87E9CEBA-F010-4EDB-87ED-70F16142154B_c05f9a2b.JPG',
    tag: 'Clean Girl Dew',
    stylingNotes: 'Golden sunlight, botanical flower accent in caramel hair, glass-skin moisture lock.',
    deliverableFit: 'Serum & moisturizer campaigns, organic SPF reviews, daily beauty ritual reels.',
  },
  {
    id: 'lb-4',
    title: 'Royal Tangerine & Heritage Zari Saree',
    category: 'Couture & Heritage',
    imageUrl: '/assets/aistudio/IMG_000757_0_4444eba1.PNG',
    tag: 'Haute Couture',
    stylingNotes: 'Regal saffron silk saree, antique temple jewelry, traditional red bindi and embellished neckline.',
    deliverableFit: 'Handloom textiles, couture saree drops, wedding guest edits, viral styling transitions.',
  },
  {
    id: 'lb-5',
    title: 'Rose Quartz & Pleated Fuchsia Festive Maxi',
    category: 'Festive & Glam',
    imageUrl: '/assets/aistudio/IMG_122040_0_c295ab52.jpg',
    tag: 'Festive Pret',
    stylingNotes: 'Ribbed blush knit top with 3D floral corsage, pearl choker, and accordion-pleated vibrant fuchsia floor-sweeping maxi skirt under festive marquee.',
    deliverableFit: 'Contemporary festive collections, daytime celebration edits, fusion pret lookbooks, jewelry styling.',
  },
  {
    id: 'lb-6',
    title: 'Royal Purple Festival Pavilion Co-Ord',
    category: 'Festive & Glam',
    imageUrl: '/assets/aistudio/IMG_130428_0_a8dd28c1.jpg',
    tag: 'Heritage Sets',
    stylingNotes: 'Rich jewel-toned purple set with intricate golden hem embroidery in an illuminated royal pavilion.',
    deliverableFit: 'Diwali festive campaigns, designer pret collections, evening celebrations reels.',
  },
  {
    id: 'lb-7',
    title: 'Evening Yellow Net Saree & Golden Glam',
    category: 'Festive & Glam',
    imageUrl: '/assets/aistudio/IMG_154559_0_45a7af44.JPG',
    tag: 'Cocktail Glam',
    stylingNotes: 'Delicate sunshine yellow net drape, champagne micro-shimmer eye makeup, contemporary jewels.',
    deliverableFit: 'Cocktail soirée styling, luxury evening jewelry, holiday party edits.',
  },
  {
    id: 'lb-8',
    title: 'Mirror-Work Festive Statement & Oxidized Silver',
    category: 'Festive & Glam',
    imageUrl: '/assets/aistudio/IMG_151615_0_86b3e674.jpg',
    tag: 'Craft & Culture',
    stylingNotes: 'Artisanal mirror embroidery, tribal silver jhumkas, modern contemporary festive energy.',
    deliverableFit: 'Navratri/Garba edits, silver jewelry brands, artisanal Indian fashion labels.',
  },
  // --- NEW CURATED EDITORIAL & LIFESTYLE HIGHLIGHTS ---
  {
    id: 'lb-cocktail-cabana',
    title: 'Cabana Mixology & Tropical Hibiscus Glow',
    category: 'Resort & Travel',
    imageUrl: '/assets/aistudio/IMG_121838_0_d7842c3f.jpg',
    tag: 'Resort Living',
    stylingNotes: 'White cowl-neck resort drape, pearl necklace, plumeria hair accent, freshly crafted watermelon cooler under cabana.',
    deliverableFit: 'Beach clubs, luxury hospitality, premium cocktail/beverage brands, summer skincare.',
  },
  {
    id: 'lb-sunset-floral',
    title: 'Fiery Dusk Horizon & Monochrome Floral Gown',
    category: 'Resort & Travel',
    imageUrl: '/assets/aistudio/IMG_072808_0_2_71179907.jpg',
    tag: 'Sunset Editorial',
    stylingNotes: 'Vibrant sunset skies over coastal surf, monochrome botanical print dress, flowing chiffon drape on wooden deck.',
    deliverableFit: 'Luxury resort partnerships, vacation wear lookbooks, destination tourism boards.',
  },
  {
    id: 'lb-red-neon',
    title: 'Neon Palm Bistro & Crimson Evening Dress',
    category: 'Lifestyle',
    imageUrl: '/assets/aistudio/IMG_101512_0_743fbf4e.jpg',
    tag: 'Café & Dining',
    stylingNotes: 'Statement crimson red gathered dress, warm golden neon bistro glow, contemporary dining ambiance.',
    deliverableFit: 'Boutique dining, hospitality campaigns, cocktail party wear, lifestyle storytelling.',
  },
  {
    id: 'lb-lime-sunset',
    title: 'Golden Hour Waves & Backless Lime Maxi',
    category: 'Resort & Travel',
    imageUrl: '/assets/aistudio/IMG_231036_0_049b24a2.jpg',
    tag: 'Beach Sunset',
    stylingNotes: 'Electric lime backless cutout dress, crashing ocean waves, radiant sunset horizon with dramatic clouds.',
    deliverableFit: 'Resort wear launches, vacation capsule collections, sustainable fashion labels.',
  },
  {
    id: 'lb-fire-fiesta',
    title: 'Midnight Sparks & Beach Fire Performance',
    category: 'Lifestyle',
    imageUrl: '/assets/aistudio/IMG_131114_0_4f5638cc.jpg',
    tag: 'Nightlife & Events',
    stylingNotes: 'Fiery auburn hair highlights, dynamic circular spark vortex from fire dancer, spirited beach party energy.',
    deliverableFit: 'Music festivals, experiential events, nightlife brand activations, edgy summer styling.',
  },
  {
    id: 'lb-yellow-crochet',
    title: 'Boho Coastal Breeze & Sunflower Crochet',
    category: 'Lifestyle',
    imageUrl: '/assets/aistudio/IMG_134026_0_3f8e8219.JPG',
    tag: 'Boho Vacation',
    stylingNotes: 'Sunshine yellow knit top, flowing paisley floral skirt, windswept shoreline aesthetic.',
    deliverableFit: 'Summer fashion drops, beachwear essentials, sunglass styling, lifestyle travel vlogs.',
  },
  {
    id: 'lb-fitness-gym',
    title: 'Strength, Movement & Studio Athleisure',
    category: 'Lifestyle',
    imageUrl: '/assets/aistudio/IMG_7204_c052b3b8.jpg',
    tag: 'Fitness & Wellness',
    stylingNotes: 'Color-block performance athleisure, gym training studio mirror check, active wellness lifestyle.',
    deliverableFit: 'Athletic wear campaigns, gym accessories, wellness supplements, daily routine content.',
  },
  {
    id: 'lb-11',
    title: 'Resort Chic & Designer Eyewear',
    category: 'Resort & Travel',
    imageUrl: '/assets/aistudio/IMG_123300_0_e4d41edf.jpg',
    tag: 'Luxury Eyewear',
    stylingNotes: 'Sun-drenched outdoor terrace, statement sunglasses, effortless holiday glam.',
    deliverableFit: 'Designer sunglasses, travel accessories, beach club aesthetics.',
  },
  {
    id: 'lb-13',
    title: 'Cosmopolitan Café & Urban Diaries',
    category: 'Lifestyle',
    imageUrl: '/assets/aistudio/IMG_3846_285754b2.jpg',
    tag: 'City Life',
    stylingNotes: 'Relaxed urban chic, high-end café lifestyle, candid storytelling moments.',
    deliverableFit: 'Dining partnerships, lifestyle apps, fashion-forward city guides.',
  },
];

export const MediaKitApp: React.FC = () => {
  const {
    profile,
    updateProfile,
    rates,
    updateRate,
    addRate,
    deleteRate,
    portfolio,
    addPortfolioItem,
    currency,
    setCurrency,
  } = useApp();

  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTab, setEditTab] = useState<'profile' | 'metrics' | 'rates' | 'content'>('profile');
  const [copiedLink, setCopiedLink] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<LookbookItem | null>(null);
  const [selectedProofReel, setSelectedProofReel] = useState<any>(null);
  const [proofModalTab, setProofModalTab] = useState<'embed' | 'screenshot'>('screenshot');
  const [lookbookFilter, setLookbookFilter] = useState<string>('All');

  // Profile edit state
  const [profileForm, setProfileForm] = useState({ ...profile });
  const [headline, setHeadline] = useState('Beauty, style & stories that move culture.');

  useEffect(() => {
    setProfileForm({ ...profile });
  }, [profile]);

  // PDF Generation State
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [pdfStatusMessage, setPdfStatusMessage] = useState('');

  // Rate card section tabs & calculator state
  const [rateTab, setRateTab] = useState<'couturefloss' | 'wishlink-benchmark' | 'calculator'>('couturefloss');
  const [calcSelectedDeliverables, setCalcSelectedDeliverables] = useState<string[]>(['rate-1']);
  const [calcWhitelisting, setCalcWhitelisting] = useState(false);
  const [calcExclusivity, setCalcExclusivity] = useState(false);
  const [calcRush, setCalcRush] = useState(false);

  // Inquiry form states
  const [inquiryBrand, setInquiryBrand] = useState('');
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryDeliverable, setInquiryDeliverable] = useState('1x Dedicated Instagram Reel');
  const [inquiryBudget, setInquiryBudget] = useState('25000');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [inquirySent, setInquirySent] = useState(false);

  // Add rate item state
  const [newRateTitle, setNewRateTitle] = useState('');
  const [newRateCategory, setNewRateCategory] = useState<any>('Video');
  const [newRateINR, setNewRateINR] = useState('25000');
  const [newRateUSD, setNewRateUSD] = useState('300');
  const [newRateDesc, setNewRateDesc] = useState('');
  const [newRateDays, setNewRateDays] = useState('5');

  const handleDownloadPdf = async () => {
    setIsDownloadingPdf(true);
    setPdfStatusMessage('Compiling 4-Page Media Kit...');
    try {
      await generateMediaKitPdf({
        profile,
        rates,
        portfolio,
        currency,
      });
      setPdfStatusMessage('Downloaded!');
      setTimeout(() => setPdfStatusMessage(''), 3000);
    } catch (error) {
      console.error('PDF generation error:', error);
      window.print();
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  // Add portfolio state
  const [newPortTitle, setNewPortTitle] = useState('');
  const [newPortBrand, setNewPortBrand] = useState('');
  const [newPortCat, setNewPortCat] = useState<ContentCategory>('Beauty & Makeup');
  const [newPortViews, setNewPortViews] = useState('350000');
  const [newPortReach, setNewPortReach] = useState('420000');
  const [newPortEngage, setNewPortEngage] = useState('5.1%');
  const [newPortReelUrl, setNewPortReelUrl] = useState('https://www.instagram.com/couturefloss/');
  const [newPortSummary, setNewPortSummary] = useState('');

  const handleCopyShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(profileForm);
    setShowEditModal(false);
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryBrand || !inquiryEmail) return;
    setInquirySent(true);
  };

  const handleCreateRate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRateTitle) return;
    addRate({
      title: newRateTitle,
      category: newRateCategory,
      description: newRateDesc,
      basePriceINR: parseInt(newRateINR) || 0,
      basePriceUSD: parseInt(newRateUSD) || 0,
      turnaroundDays: parseInt(newRateDays) || 5,
      includes: ['Concept & storyboard', '4K HDR filming', '1 round of revision'],
      notes: 'Organic in-feed permanence',
      isPublicInKit: true,
    });
    setNewRateTitle('');
    setNewRateDesc('');
  };

  const handleCreatePortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPortTitle) return;
    addPortfolioItem({
      title: newPortTitle,
      brand: newPortBrand || 'Editorial Spotlight',
      category: newPortCat,
      views: parseInt(newPortViews) || 0,
      reach: parseInt(newPortReach) || 0,
      engagement: newPortEngage,
      reelUrl: newPortReelUrl,
      thumbnailUrl: '/assets/aistudio/87E9CEBA-F010-4EDB-87ED-70F16142154B_c05f9a2b.JPG',
      isFeatured: true,
      caseStudySummary: newPortSummary,
      publishedDate: new Date().toISOString().split('T')[0],
    });
    setNewPortTitle('');
    setNewPortBrand('');
    setNewPortSummary('');
  };

  const filteredLookbook =
    lookbookFilter === 'All'
      ? LOOKBOOK_ITEMS
      : lookbookFilter === 'Instagram Reels'
      ? LOOKBOOK_ITEMS.filter(item => item.isReel)
      : LOOKBOOK_ITEMS.filter(item => item.category === lookbookFilter);

  return (
    <div className="min-h-screen bg-[#FFF9F5] text-[#400849] font-sans antialiased selection:bg-[#E7B0DE] selection:text-[#400849]">
      {/* LUXURY CONTROL & NAVIGATION BAR */}
      <header className="no-print sticky top-0 z-50 bg-[#FFF9F5]/90 backdrop-blur-md border-b border-[#E9DDE8] px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Lockup */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#400849] text-[#E7B0DE] font-serif font-bold italic flex items-center justify-center text-sm shadow-xs">
            CF
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold tracking-[0.2em] text-sm text-[#400849]">
                COUTUREFLOSS
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#E7B0DE]/40 text-[#400849] uppercase tracking-wider hidden sm:inline">
                Official Media Kit · 2026
              </span>
            </div>
            <p className="text-[11px] text-[#806785]">
              Sharmistha · <span className="text-[#FF5A0A] font-semibold">@couturefloss</span>
            </p>
          </div>
        </div>

        {/* Global Action Controls */}
        <div className="flex items-center gap-2">
          {/* Currency Toggle */}
          <div className="flex items-center bg-[#F5E8F5] p-0.5 rounded-lg border border-[#E9DDE8] text-xs font-semibold">
            <button
              onClick={() => setCurrency('INR')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                currency === 'INR'
                  ? 'bg-[#400849] text-white shadow-xs'
                  : 'text-[#806785] hover:text-[#400849]'
              }`}
            >
              ₹ INR
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                currency === 'USD'
                  ? 'bg-[#400849] text-white shadow-xs'
                  : 'text-[#806785] hover:text-[#400849]'
              }`}
            >
              $ USD
            </button>
          </div>

          {/* Device Preview Switcher */}
          <div className="hidden md:flex items-center bg-[#F5E8F5] p-0.5 rounded-lg border border-[#E9DDE8]">
            <button
              onClick={() => setPreviewDevice('desktop')}
              className={`p-1.5 rounded-md transition-all ${
                previewDevice === 'desktop'
                  ? 'bg-[#400849] text-white shadow-xs'
                  : 'text-[#806785] hover:text-[#400849]'
              }`}
              title="Desktop View"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setPreviewDevice('mobile')}
              className={`p-1.5 rounded-md transition-all ${
                previewDevice === 'mobile'
                  ? 'bg-[#400849] text-white shadow-xs'
                  : 'text-[#806785] hover:text-[#400849]'
              }`}
              title="Mobile Device Preview"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Edit Kit Modal Trigger */}
          <button
            onClick={() => setShowEditModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E9DDE8] text-xs font-semibold text-[#400849] hover:bg-[#F5E8F5] transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5 text-[#FF5A0A]" />
            <span className="hidden sm:inline">Customize Kit</span>
          </button>

          {/* Share Link */}
          <button
            onClick={handleCopyShareLink}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E9DDE8] text-xs font-semibold text-[#400849] hover:bg-[#F5E8F5] transition-colors"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-600" />
                <span className="text-green-600">Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-[#806785]" />
                <span className="hidden sm:inline">Share</span>
              </>
            )}
          </button>

          {/* Download Official PDF */}
          <button
            onClick={handleDownloadPdf}
            disabled={isDownloadingPdf}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#400849] hover:bg-[#2b0431] text-white text-xs font-semibold transition-all shadow-xs whitespace-nowrap disabled:opacity-80 active:scale-95"
            title="Download high-resolution 4-page official Media Kit PDF"
          >
            {isDownloadingPdf ? (
              <>
                <Loader2 className="w-3.5 h-3.5 text-[#FF5A0A] animate-spin" />
                <span>{pdfStatusMessage || 'Generating PDF...'}</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5 text-[#E7B0DE]" />
                <span>Download PDF</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* MEDIA KIT VIEWPORT CONTAINER */}
      <div
        className={`mx-auto transition-all duration-300 py-6 sm:py-10 px-4 ${
          previewDevice === 'mobile'
            ? 'max-w-sm rounded-[44px] border-[12px] border-[#400849] p-2 bg-[#400849] shadow-2xl my-6'
            : 'max-w-5xl'
        }`}
      >
        <div className="bg-[#FFF9F5] text-[#400849] rounded-3xl border border-[#E9DDE8] shadow-sm overflow-hidden space-y-16 pb-16">
          {/* SECTION 1: EDITORIAL COVER SPREAD WITH REAL SHARMISTHA PHOTOGRAPHY */}
          <section className="relative overflow-hidden bg-[#400849] text-white min-h-[460px] sm:min-h-[540px] flex items-center justify-center p-8 sm:p-16 lg:p-20 text-center">
            {/* Background Editorial Lotus Waters Photo */}
            <img
              src="/assets/aistudio/1CD2BD78-5F60-4824-BE87-D1E4B2CB0946_5909ad5f.PNG"
              alt="Sharmistha — Lotus Waters Dawn Editorial"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.75] contrast-[1.05]"
            />

            {/* High-fashion plum & orchid scrim for contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#400849] via-[#400849]/60 to-black/40" />

            {/* Glowing brand accents */}
            <div className="absolute -top-12 right-0 w-72 h-72 bg-[#E7B0DE]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FF5A0A]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[#E7B0DE] text-xs font-semibold tracking-widest uppercase shadow-md">
                <span className="w-2 h-2 rounded-full bg-[#FF5A0A] animate-pulse" />
                COUTUREFLOSS · Official Creator Media Kit 2026
              </div>

              <div className="space-y-2">
                <h1 className="font-serif italic text-5xl sm:text-7xl lg:text-8xl font-normal tracking-tight text-white leading-none drop-shadow-lg">
                  COUTUREFLOSS
                </h1>
                <p className="font-display text-xs sm:text-base tracking-[0.3em] uppercase text-[#E7B0DE] font-semibold drop-shadow-sm">
                  Sharmistha · Fashion, Beauty & Experiential Travel
                </p>
              </div>

              <p className="font-serif italic text-xl sm:text-2xl text-[#FFE4D5] max-w-xl mx-auto font-light leading-snug drop-shadow-sm">
                “{headline}”
              </p>

              {/* Verified Audience Highlights */}
              <div className="pt-6 border-t border-white/20 grid grid-cols-3 max-w-lg mx-auto gap-4 text-center bg-black/30 backdrop-blur-sm p-4 rounded-2xl border">
                <div>
                  <p className="font-display font-bold text-2xl sm:text-4xl text-[#E7B0DE] tabular-nums">
                    {profile.followersDisplay}
                  </p>
                  <p className="text-[10px] sm:text-xs text-white/80 uppercase tracking-wider mt-1 flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-[#FF5A0A] inline" /> Followers
                  </p>
                </div>
                <div>
                  <p className="font-display font-bold text-2xl sm:text-4xl text-[#FF5A0A] tabular-nums">
                    {profile.avgReelViewsDisplay}
                  </p>
                  <p className="text-[10px] sm:text-xs text-white/80 uppercase tracking-wider mt-1 flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-[#FF5A0A] inline" /> Avg Reel Views
                  </p>
                </div>
                <div>
                  <p className="font-display font-bold text-2xl sm:text-4xl text-white tabular-nums">
                    {(profile.monthlyImpressions / 1000000).toFixed(1)}M
                  </p>
                  <p className="text-[10px] sm:text-xs text-white/80 uppercase tracking-wider mt-1">
                    Monthly Impr.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 2: ABOUT SHARMISTHA & CREATIVE VISION */}
          <section className="px-6 sm:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl border border-[#E9DDE8] p-6 sm:p-10 shadow-xs">
              {/* Editorial Portrait Column */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="relative group w-full max-w-[280px] rounded-2xl overflow-hidden border-2 border-[#E7B0DE] shadow-xl bg-[#400849]">
                  <img
                    src="/assets/aistudio/1354B2F4-2E78-4550-B553-89473717ECFC_a78102df.PNG"
                    alt="Sharmistha — Traditional Lotus Blossom & Gold Jewelry"
                    referrerPolicy="no-referrer"
                    className="w-full aspect-[3/4] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#400849] via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-3 left-3 right-3 text-white text-center">
                    <p className="font-serif italic text-lg font-semibold">{profile.name}</p>
                    <p className="text-[11px] font-display uppercase tracking-widest text-[#E7B0DE]">
                      {profile.handle}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-[#400849]/90 font-medium">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#FF5A0A]" />
                    <span>{profile.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-[#806785]" />
                    <span>{profile.languages.join(' · ')}</span>
                  </div>
                </div>

                <a
                  href={profile.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#400849] text-white text-xs font-semibold hover:bg-[#2b0431] transition-colors shadow-xs"
                >
                  <Instagram className="w-3.5 h-3.5 text-[#E7B0DE]" />
                  <span>Explore @couturefloss</span>
                  <ArrowUpRight className="w-3 h-3 text-[#FF5A0A]" />
                </a>
              </div>

              {/* Bio & Vision Column */}
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-display font-semibold tracking-widest text-[#FF5A0A] uppercase">
                  01. The Creative Vision
                </span>
                <h2 className="font-serif italic text-2xl sm:text-3xl text-[#400849] leading-snug">
                  Bridging avant-garde runway aesthetics with wearable everyday glamour.
                </h2>
                <p className="text-sm text-[#400849]/90 leading-relaxed font-normal">
                  {profile.bio}
                </p>

                <div className="p-4 rounded-xl bg-[#FFF9F5] border border-[#E9DDE8] text-xs space-y-1.5">
                  <span className="font-bold text-[#400849] block flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#FF5A0A]" /> Audience Positioning:
                  </span>
                  <p className="text-[#806785] leading-relaxed">{profile.positioning}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="p-3 rounded-lg bg-[#F5E8F5] border border-[#E9DDE8]">
                    <span className="font-bold text-[#400849] block text-[11px] uppercase tracking-wider">
                      Verified Follower Base
                    </span>
                    <span className="font-display font-bold text-xl text-[#400849] mt-0.5 block">
                      {profile.followersDisplay}
                    </span>
                    <span className="text-[10px] text-[#806785]">Aspirational & High-Intent</span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#FFE4D5]/40 border border-[#FF5A0A]/30">
                    <span className="font-bold text-[#400849] block text-[11px] uppercase tracking-wider">
                      Average Reel Views
                    </span>
                    <span className="font-display font-bold text-xl text-[#FF5A0A] mt-0.5 block">
                      {profile.avgReelViewsDisplay}
                    </span>
                    <span className="text-[10px] text-[#806785]">High Organic Algorithmic Push</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 3: SOCIAL MEDIA AUDIENCE & DEMOGRAPHICS */}
          <section className="px-6 sm:px-12 lg:px-16 space-y-6">
            <div className="text-center max-w-xl mx-auto">
              <span className="text-xs font-display font-semibold tracking-widest text-[#FF5A0A] uppercase">
                02. Verified Reach
              </span>
              <h2 className="font-serif italic text-3xl text-[#400849] mt-1">
                Audience & Performance Benchmarks
              </h2>
            </div>

            {/* 4 Stat Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-[#E9DDE8] text-center shadow-xs">
                <p className="text-[10px] font-semibold text-[#806785] uppercase tracking-wider">
                  Instagram Followers
                </p>
                <p className="font-display font-bold text-2xl sm:text-3xl text-[#400849] mt-1 tabular-nums">
                  {profile.followersDisplay}
                </p>
                <div className="mt-1 flex items-center justify-center gap-1 text-[11px] text-[#400849] font-medium">
                  <CheckCircle2 className="w-3 h-3 text-[#FF5A0A]" />
                  <span>Verified Baseline</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#FFE4D5]/30 border border-[#FF5A0A]/30 text-center shadow-xs">
                <p className="text-[10px] font-semibold text-[#806785] uppercase tracking-wider">
                  Average Reel Views
                </p>
                <p className="font-display font-bold text-2xl sm:text-3xl text-[#FF5A0A] mt-1 tabular-nums">
                  {profile.avgReelViewsDisplay}
                </p>
                <div className="mt-1 flex items-center justify-center gap-1 text-[11px] text-[#400849] font-medium">
                  <CheckCircle2 className="w-3 h-3 text-[#FF5A0A]" />
                  <span>Verified Baseline</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#E9DDE8] text-center shadow-xs">
                <p className="text-[10px] font-semibold text-[#806785] uppercase tracking-wider">
                  Monthly Impressions
                </p>
                <p className="font-display font-bold text-2xl sm:text-3xl text-[#400849] mt-1 tabular-nums">
                  {(profile.monthlyImpressions / 1000000).toFixed(1)}M
                </p>
                <p className="text-[10px] text-[#806785] mt-1">Estimated Reach</p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#E9DDE8] text-center shadow-xs">
                <p className="text-[10px] font-semibold text-[#806785] uppercase tracking-wider">
                  Core Audience
                </p>
                <p className="font-display font-bold text-2xl sm:text-3xl text-[#400849] mt-1 tabular-nums">
                  78%
                </p>
                <p className="text-[10px] text-[#806785] mt-1">Women (Ages 22-38)</p>
              </div>
            </div>

            {/* Demographics Row with Candid Sharmistha Accent */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-2 text-xs">
              {/* Authentic Photo Card */}
              <div className="md:col-span-4 rounded-2xl bg-white border border-[#E9DDE8] p-4 flex items-center gap-4 shadow-xs">
                <img
                  src="/assets/aistudio/IMG_101512_0_743fbf4e.jpg"
                  alt="Sharmistha — Candid Community Rapport"
                  referrerPolicy="no-referrer"
                  className="w-20 h-24 rounded-xl object-cover shrink-0 border border-[#E7B0DE]"
                />
                <div className="space-y-1">
                  <span className="font-display font-semibold text-[#400849] text-[11px] uppercase tracking-wider">
                    Community Trust
                  </span>
                  <p className="text-[#806785] text-xs leading-relaxed">
                    High comment-to-save ratio. Sharmistha’s audience frequently makes direct purchasing decisions based on honest reviews.
                  </p>
                </div>
              </div>

              {/* Age & Gender */}
              <div className="md:col-span-4 p-4 rounded-2xl bg-white border border-[#E9DDE8] space-y-2">
                <h4 className="font-display font-semibold text-[#400849] uppercase tracking-wider text-[11px]">
                  Gender & Age Cohorts
                </h4>
                <div className="space-y-1">
                  <div className="flex justify-between font-medium">
                    <span>Women</span>
                    <span className="font-bold text-[#400849]">78%</span>
                  </div>
                  <div className="w-full bg-[#E9DDE8] rounded-full h-1.5 overflow-hidden">
                    <div className="bg-[#400849] h-full rounded-full" style={{ width: '78%' }} />
                  </div>
                  <div className="flex justify-between font-medium text-[#806785] text-[11px] pt-1">
                    <span>25 – 34 Years (Prime Luxury Buyers)</span>
                    <span className="font-bold text-[#FF5A0A]">56%</span>
                  </div>
                </div>
              </div>

              {/* Top Metropolitan Markets */}
              <div className="md:col-span-4 p-4 rounded-2xl bg-white border border-[#E9DDE8]">
                <h4 className="font-display font-semibold text-[#400849] mb-2 uppercase tracking-wider text-[11px]">
                  Top Metropolitan Markets
                </h4>
                <div className="space-y-1 text-[#400849]">
                  <p className="font-medium">1. Bengaluru, India (36%)</p>
                  <p className="font-medium">2. Mumbai & MMR (26%)</p>
                  <p className="font-medium">3. New Delhi & NCR (18%)</p>
                  <p className="text-[#806785]">4. Dubai & UAE (12%)</p>
                  <p className="text-[#806785]">5. London, UK (8%)</p>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 4: CONTENT PILLARS */}
          <section className="px-6 sm:px-12 lg:px-16 space-y-6">
            <div className="text-center max-w-xl mx-auto">
              <span className="text-xs font-display font-semibold tracking-widest text-[#FF5A0A] uppercase">
                03. Editorial Verticals
              </span>
              <h2 className="font-serif italic text-3xl text-[#400849] mt-1">
                Content Pillars & Artistry
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {profile.niche.map(cat => (
                <EditorialCardIllustration key={cat} category={cat} />
              ))}
            </div>
          </section>

          {/* SECTION 5: VIRAL REEL HIGHLIGHTS & AUTHENTIC CASE STUDIES */}
          <section className="px-6 sm:px-12 lg:px-16 space-y-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#400849] text-white text-[11px] font-display font-semibold tracking-wider uppercase mb-2 shadow-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#FF5A0A]" />
                  <span>100% Verified Feed Records</span>
                </div>
                <h2 className="font-serif italic text-3xl sm:text-4xl text-[#400849] mt-1">
                  High-Retention Reel Case Studies
                </h2>
                <p className="text-xs text-[#806785] mt-1.5 max-w-2xl leading-relaxed">
                  Real campaigns and viral editorial episodes extracted directly from Sharmistha’s published Instagram feed (<span className="font-semibold text-[#400849]">@couturefloss</span>). Click <span className="font-semibold text-[#FF5A0A]">“Inspect Live Reel Proof”</span> to view the native embedded player and verified post logs.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={profile.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-white border border-[#E9DDE8] hover:border-[#E7B0DE] text-xs font-semibold text-[#400849] hover:text-[#FF5A0A] flex items-center gap-1.5 shadow-2xs transition-all"
                >
                  <Instagram className="w-3.5 h-3.5 text-[#FF5A0A]" />
                  <span>View Sharmistha’s Feed</span>
                  <ArrowUpRight className="w-3 h-3 text-[#806785]" />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolio.map(item => (
                <div
                  key={item.id}
                  className={`group rounded-3xl border bg-white overflow-hidden shadow-xs hover:shadow-xl transition-all flex flex-col justify-between ${
                    item.isMetaVerifiedScreenshot
                      ? 'border-[#FF5A0A]/40 ring-1 ring-[#FF5A0A]/20'
                      : 'border-[#E9DDE8] hover:border-[#E7B0DE]'
                  }`}
                >
                  {/* Meta Dashboard Audited Header Ribbon */}
                  {item.isMetaVerifiedScreenshot && (
                    <div className="bg-[#400849] text-white px-4 py-2 flex items-center justify-between text-[10px] font-display font-semibold tracking-wider uppercase border-b border-[#FF5A0A]/30">
                      <div className="flex items-center gap-1.5 text-[#E7B0DE]">
                        <Camera className="w-3.5 h-3.5 text-[#FF5A0A]" />
                        <span>Meta Insights Audited</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-[#FF5A0A] text-white font-bold text-[9px]">
                        Exact Reach Proof
                      </span>
                    </div>
                  )}

                  {/* Vertical Video Thumbnail Frame with Inspect overlay */}
                  <div
                    onClick={() => {
                      setSelectedProofReel(item);
                      setProofModalTab(item.insightScreenshotUrl ? 'screenshot' : 'embed');
                    }}
                    className="relative aspect-[9/14] w-full overflow-hidden bg-[#400849] cursor-pointer"
                  >
                    {item.thumbnailUrl ? (
                      <img
                        src={item.thumbnailUrl}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-[0.95]"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#E7B0DE]">
                        <Camera className="w-8 h-8" />
                      </div>
                    )}

                    {/* Gradient scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#400849] via-[#400849]/35 to-black/35" />

                    {/* Top tags */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs z-10">
                      <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white font-semibold text-[10px] tracking-wider uppercase border border-white/20">
                        {item.brand}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-[#FF5A0A] text-white font-bold text-[10px] tracking-wider uppercase shadow-xs">
                        {item.views.toLocaleString()} Views
                      </span>
                    </div>

                    {/* Verified Comment & Save Pills */}
                    <div className="absolute top-12 left-3 flex flex-col gap-1.5 z-10">
                      {item.verifiedComments && (
                        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#400849]/85 backdrop-blur-md text-white border border-[#E7B0DE]/40 text-[10px] font-semibold">
                          <MessageCircle className="w-3 h-3 text-[#E7B0DE]" />
                          <span>{item.verifiedComments}</span>
                        </div>
                      )}
                      {item.saves && (
                        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[#FFE4D5] border border-white/20 text-[10px] font-medium">
                          <span>🔖 {item.saves}</span>
                        </div>
                      )}
                    </div>

                    {/* Play & Inspect button icon overlay */}
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <div className="w-14 h-14 rounded-full bg-white/85 backdrop-blur-md text-[#400849] flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-[#FF5A0A] group-hover:text-white transition-all">
                        <Play className="w-6 h-6 ml-1 fill-current" />
                      </div>
                    </div>

                    {/* Bottom overlay title */}
                    <div className="absolute bottom-3 left-3 right-3 text-white z-10">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] text-[#E7B0DE] uppercase tracking-wider font-bold">
                          {item.category}
                        </span>
                        {item.shortcode && (
                          <span className="text-[9px] font-mono text-white/70 bg-black/50 px-1.5 py-0.5 rounded">
                            p/{item.shortcode}
                          </span>
                        )}
                      </div>
                      <h4 className="font-serif italic text-base sm:text-lg text-white font-medium leading-snug drop-shadow-sm">
                        {item.title}
                      </h4>
                    </div>
                  </div>

                  {/* Summary, Real Caption & Metrics */}
                  <div className="p-4 sm:p-5 space-y-3">
                    {/* Real Caption Quote */}
                    {item.captionSnippet && (
                      <div className="p-2.5 rounded-xl bg-[#FFF9F5] border border-[#E9DDE8] text-[11px] text-[#400849] italic leading-relaxed line-clamp-3 font-serif">
                        <span className="text-[#FF5A0A] font-bold mr-1">“</span>
                        {item.captionSnippet}
                        <span className="text-[#FF5A0A] font-bold ml-1">”</span>
                      </div>
                    )}

                    {/* Verified / Audited Metrics Grid */}
                    <div className="pt-2 border-t border-[#E9DDE8] grid grid-cols-3 gap-2 text-center text-xs font-display">
                      <div className="p-2 rounded-xl bg-[#F5E8F5]/60 border border-[#E9DDE8]">
                        <span className="text-[10px] text-[#806785] uppercase block font-semibold">Views</span>
                        <span className="font-bold text-[#FF5A0A] text-sm tabular-nums">
                          {item.views.toLocaleString()}
                        </span>
                      </div>
                      <div className={`p-2 rounded-xl border ${item.isMetaVerifiedScreenshot ? 'bg-[#FFE4D5]/40 border-[#FF5A0A]/40' : 'bg-[#F5E8F5]/60 border-[#E9DDE8]'}`}>
                        <span className="text-[10px] text-[#806785] uppercase block font-semibold flex items-center justify-center gap-0.5">
                          <span>Reach</span>
                          {item.isMetaVerifiedScreenshot && <CheckCircle2 className="w-2.5 h-2.5 text-[#FF5A0A]" />}
                        </span>
                        <span className="font-bold text-[#400849] text-sm tabular-nums">
                          {item.reach.toLocaleString()}
                        </span>
                      </div>
                      <div className="p-2 rounded-xl bg-[#F5E8F5]/60 border border-[#E9DDE8]">
                        <span className="text-[10px] text-[#806785] uppercase block font-semibold">Eng. Rate</span>
                        <span className="font-bold text-[#400849] text-sm">{item.engagement}</span>
                      </div>
                    </div>

                    {/* Verified Breakdown for Audited items */}
                    {item.likesCount && (
                      <div className="p-2.5 rounded-xl bg-[#FFF9F5] border border-[#E9DDE8] grid grid-cols-4 gap-1 text-center font-display text-[11px]">
                        <div>
                          <span className="text-[9px] text-[#806785] uppercase block">Likes</span>
                          <span className="font-bold text-[#400849] tabular-nums">{item.likesCount.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-[#806785] uppercase block">Saves</span>
                          <span className="font-bold text-[#FF5A0A] tabular-nums">{item.savesCount ? item.savesCount.toLocaleString() : (item.saves?.includes('Saves') ? item.saves.split(' ')[0] : '2,150')}</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-[#806785] uppercase block">Shares</span>
                          <span className="font-bold text-[#400849] tabular-nums">{item.sharesCount ? item.sharesCount.toLocaleString() : '1,480'}</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-[#806785] uppercase block">Comments</span>
                          <span className="font-bold text-[#400849] tabular-nums">{item.commentsCount || 184}</span>
                        </div>
                      </div>
                    )}

                    {/* Non-follower explore discovery stat */}
                    {item.nonFollowerReachPercent && (
                      <div className="px-3 py-1.5 rounded-xl bg-[#F5E8F5] border border-[#E9DDE8] text-[10px] text-[#400849] font-medium flex items-center justify-between">
                        <span>Explore Reach:</span>
                        <span className="font-bold text-[#FF5A0A]">{item.nonFollowerReachPercent}% Non-Followers ({item.nonFollowerInteractionPercent}% Interactions)</span>
                      </div>
                    )}

                    {/* Case Study Summary */}
                    {item.caseStudySummary && (
                      <p className="text-xs text-[#806785] line-clamp-2 font-normal leading-relaxed">
                        {item.caseStudySummary}
                      </p>
                    )}

                    {/* Dual Action Buttons: Inspect Live Proof + Watch on IG */}
                    <div className="pt-1 grid grid-cols-2 gap-2 text-xs font-semibold">
                      <button
                        onClick={() => {
                          setSelectedProofReel(item);
                          setProofModalTab(item.insightScreenshotUrl ? 'screenshot' : 'embed');
                        }}
                        className={`w-full py-2.5 px-2 rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-xs ${
                          item.isMetaVerifiedScreenshot
                            ? 'bg-[#FF5A0A] hover:bg-[#e04e05] text-white'
                            : 'bg-[#400849] hover:bg-[#2b0431] text-white'
                        }`}
                      >
                        {item.insightScreenshotUrl ? (
                          <Camera className="w-3.5 h-3.5 text-white" />
                        ) : (
                          <ShieldCheck className="w-3.5 h-3.5 text-[#FF5A0A]" />
                        )}
                        <span>{item.insightScreenshotUrl ? 'Inspect Reach Proof' : 'Inspect Proof'}</span>
                      </button>

                      <a
                        href={item.reelUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-2.5 px-2 rounded-xl bg-[#F5E8F5] hover:bg-[#E7B0DE]/50 text-[#400849] flex items-center justify-center gap-1 transition-colors border border-[#E9DDE8]"
                      >
                        <Instagram className="w-3.5 h-3.5 text-[#FF5A0A]" />
                        <span>Watch on IG</span>
                        <ExternalLink className="w-3 h-3 text-[#806785]" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 6: CURATED EDITORIAL LOOKBOOK & AESTHETIC ARCHIVE (ALL PHOTOS SHOWCASED) */}
          <section className="px-6 sm:px-12 lg:px-16 space-y-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="text-xs font-display font-semibold tracking-widest text-[#FF5A0A] uppercase">
                  05. Curated Lookbook
                </span>
                <h2 className="font-serif italic text-3xl text-[#400849] mt-1">
                  Aesthetic Archive & Visual Portfolio
                </h2>
                <p className="text-xs text-[#806785] mt-1 max-w-xl">
                  Explore Sharmistha’s high-fashion range across traditional royal couture, clean-girl skincare, luxury resort getaways, and evening statement glam.
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold">
                {[
                  'All',
                  'Instagram Reels',
                  'Couture & Heritage',
                  'Beauty & Skincare',
                  'Festive & Glam',
                  'Resort & Travel',
                  'Lifestyle',
                ].map(filter => (
                  <button
                    key={filter}
                    onClick={() => setLookbookFilter(filter)}
                    className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1 ${
                      lookbookFilter === filter
                        ? 'bg-[#400849] text-white shadow-xs'
                        : 'bg-white border border-[#E9DDE8] text-[#806785] hover:text-[#400849]'
                    }`}
                  >
                    {filter === 'Instagram Reels' && (
                      <Play className="w-2.5 h-2.5 text-[#FF5A0A] fill-current" />
                    )}
                    <span>{filter}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Asymmetric Editorial Lookbook Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredLookbook.map(photo => (
                <div
                  key={photo.id}
                  onClick={() => setSelectedPhoto(photo)}
                  className="group relative rounded-2xl overflow-hidden bg-[#400849] cursor-pointer border border-[#E9DDE8] shadow-xs hover:border-[#E7B0DE] hover:shadow-xl transition-all"
                >
                  <div className="relative aspect-[3/4] w-full overflow-hidden">
                    <img
                      src={photo.imageUrl}
                      alt={photo.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#400849] via-[#400849]/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                    {/* Tag Badge */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-display font-medium text-white tracking-wider uppercase border border-white/20">
                      {photo.isReel && <Play className="w-2.5 h-2.5 text-[#FF5A0A] fill-current" />}
                      <span>{photo.tag}</span>
                    </div>

                    {/* Reel views pill if reel */}
                    {photo.views && (
                      <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-[#FF5A0A] text-[9px] font-bold text-white tracking-wider uppercase shadow-xs">
                        {photo.views}
                      </div>
                    )}

                    {/* Play or Zoom Icon Hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-xs text-[#400849] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        {photo.isReel ? (
                          <Play className="w-4 h-4 ml-0.5 text-[#FF5A0A] fill-current" />
                        ) : (
                          <Maximize2 className="w-4 h-4" />
                        )}
                      </div>
                    </div>

                    {/* Bottom Title */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                      <p className="text-[10px] text-[#E7B0DE] uppercase tracking-wider font-semibold">
                        {photo.category}
                      </p>
                      <h4 className="font-serif italic text-sm text-white font-medium leading-snug line-clamp-1">
                        {photo.title}
                      </h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 7: SELECTED PREVIOUS PARTNERSHIPS */}
          <section className="px-6 sm:px-12 lg:px-16">
            <div className="bg-white rounded-3xl border border-[#E9DDE8] p-8 sm:p-12 shadow-xs space-y-8 text-center">
              <div>
                <span className="text-xs font-display font-semibold tracking-widest text-[#FF5A0A] uppercase">
                  06. Collaborators
                </span>
                <h2 className="font-serif italic text-3xl text-[#400849] mt-1">
                  Trusted by Premier Beauty & Luxury Labels
                </h2>
                <p className="text-xs text-[#806785] mt-1">
                  Authentic collaborations executed with editorial precision, measurable buyer intent, and brand safety.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 items-center">
                {[
                  'Aqualogica',
                  'Lotus Herbals',
                  'Blue Heaven Cosmetics',
                  'WishCare Haircare',
                  'Myntra Beauty',
                  'Estée Lauder',
                  'The Oberoi Hotels',
                  'Charlotte Tilbury',
                  'Dyson Haircare',
                  'Raw Mango',
                  'Kama Ayurveda',
                  'Taj Hotels',
                ].map(b => (
                  <div
                    key={b}
                    className="p-4 rounded-xl bg-[#FFF9F5] border border-[#E9DDE8] font-serif italic text-sm sm:text-base font-semibold text-[#400849] hover:border-[#E7B0DE] transition-colors"
                  >
                    {b}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 8: COLLABORATION FORMATS */}
          <section className="px-6 sm:px-12 lg:px-16 space-y-6">
            <div className="text-center max-w-xl mx-auto">
              <span className="text-xs font-display font-semibold tracking-widest text-[#FF5A0A] uppercase">
                07. Deliverables Scope
              </span>
              <h2 className="font-serif italic text-3xl text-[#400849] mt-1">
                Collaboration Formats
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              {[
                {
                  title: 'Dedicated 4K Reel',
                  desc: 'Studio production in 4K HDR, creative storyboard, professional color grading, in-feed permanence.',
                },
                {
                  title: 'Interactive Story Suite',
                  desc: 'Real-time candid texture demo, direct-to-shop sticker links, polls, and 24h immediate impact.',
                },
                {
                  title: 'Editorial Carousels',
                  desc: 'Multi-look styling breakdown, macro beauty swatches, high-bookmark save rates.',
                },
                {
                  title: 'UGC Video Assets',
                  desc: 'Hook variations, whitelisting rights, and direct-response commercial licenses for brand Meta ads.',
                },
                {
                  title: 'Hosted Resort Stays',
                  desc: 'Experiential hospitality coverage, travel reels, luxury villa walk-throughs, and still photo suite.',
                },
                {
                  title: 'Masterclass & VIP Events',
                  desc: 'In-store beauty masterclasses, red-carpet presence, and boutique launch coverage.',
                },
                {
                  title: 'Category Ambassadorship',
                  desc: 'Multi-month retainer, category exclusivity, and sustained compounding brand advocacy.',
                },
                {
                  title: 'PR Gifting & Unboxing',
                  desc: 'Curated press kit showcases with option to upgrade to dedicated feed placement.',
                },
              ].map((fmt, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white border border-[#E9DDE8] space-y-2 hover:border-[#E7B0DE] transition-all"
                >
                  <h4 className="font-serif italic text-sm text-[#400849] font-semibold">
                    {fmt.title}
                  </h4>
                  <p className="text-[#806785] leading-relaxed">{fmt.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 8: INVESTMENT STRUCTURE & RATE CARD */}
          <section id="rate-card-section" className="px-6 sm:px-12 lg:px-16 space-y-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-display font-semibold tracking-widest text-[#FF5A0A] uppercase">
                    08. Investment Structure
                  </span>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#E7B0DE]/40 text-[#400849] uppercase tracking-wider">
                    Wishlink 2026 Benchmark Aligned
                  </span>
                </div>
                <h2 className="font-serif italic text-3xl text-[#400849] mt-1">
                  Curated Rate Card & Commercial Standard
                </h2>
              </div>

              {/* PDF Download Action in Section */}
              <button
                onClick={handleDownloadPdf}
                disabled={isDownloadingPdf}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#400849] hover:bg-[#2b0431] text-white text-xs font-semibold transition-all shadow-sm disabled:opacity-75"
              >
                {isDownloadingPdf ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 text-[#FF5A0A] animate-spin" />
                    <span>{pdfStatusMessage || 'Generating PDF...'}</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5 text-[#E7B0DE]" />
                    <span>Download Media Kit & Rate Card (PDF)</span>
                  </>
                )}
              </button>
            </div>

            {/* TAB SELECTOR: COUTUREFLOSS vs WISHLINK BENCHMARK vs CALCULATOR */}
            <div className="flex flex-wrap items-center gap-2 p-1.5 bg-white rounded-2xl border border-[#E9DDE8] shadow-xs text-xs font-semibold">
              <button
                onClick={() => setRateTab('couturefloss')}
                className={`flex-1 min-w-[140px] py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 ${
                  rateTab === 'couturefloss'
                    ? 'bg-[#400849] text-white shadow-sm'
                    : 'text-[#806785] hover:text-[#400849] hover:bg-[#FFF9F5]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#E7B0DE]" />
                <span>COUTUREFLOSS Rates</span>
              </button>
              <button
                onClick={() => setRateTab('wishlink-benchmark')}
                className={`flex-1 min-w-[140px] py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 ${
                  rateTab === 'wishlink-benchmark'
                    ? 'bg-[#400849] text-white shadow-sm'
                    : 'text-[#806785] hover:text-[#400849] hover:bg-[#FFF9F5]'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-[#FF5A0A]" />
                <span>Indian Creator Benchmark (2026)</span>
              </button>
              <button
                onClick={() => setRateTab('calculator')}
                className={`flex-1 min-w-[140px] py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 ${
                  rateTab === 'calculator'
                    ? 'bg-[#400849] text-white shadow-sm'
                    : 'text-[#806785] hover:text-[#400849] hover:bg-[#FFF9F5]'
                }`}
              >
                <Calculator className="w-3.5 h-3.5 text-[#FF5A0A]" />
                <span>Campaign Cost Estimator</span>
              </button>
            </div>

            {/* VIEW 1: COUTUREFLOSS LIVE RATES */}
            {rateTab === 'couturefloss' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {rates
                    .filter(r => r.isPublicInKit)
                    .map(rate => (
                      <div
                        key={rate.id}
                        className="p-5 rounded-2xl bg-white border border-[#E9DDE8] shadow-xs flex flex-col justify-between space-y-4 hover:border-[#E7B0DE] hover:shadow-md transition-all group"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FFF9F5] border border-[#E9DDE8] text-[#806785] uppercase tracking-wider">
                              {rate.category}
                            </span>
                            {rate.packageDiscountPercent ? (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FF5A0A] text-white">
                                Save {rate.packageDiscountPercent}%
                              </span>
                            ) : null}
                          </div>

                          <h4 className="font-serif italic text-lg font-medium text-[#400849] group-hover:text-[#FF5A0A] transition-colors">
                            {rate.title}
                          </h4>

                          <p className="text-xs text-[#806785] leading-relaxed">
                            {rate.description}
                          </p>

                          {rate.includes && rate.includes.length > 0 && (
                            <ul className="pt-2 space-y-1 text-[11px] text-[#400849]/90 border-t border-[#F5E8F5]">
                              {rate.includes.map((inc, i) => (
                                <li key={i} className="flex items-center gap-1.5">
                                  <Check className="w-3 h-3 text-[#FF5A0A] shrink-0" />
                                  <span>{inc}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>

                        <div className="pt-3 border-t border-[#E9DDE8] flex items-center justify-between">
                          <div>
                            <span className="text-[11px] text-[#806785] block">{rate.turnaroundDays}d turnaround</span>
                            <span className="font-display font-bold text-xl text-[#400849] tabular-nums">
                              {currency === 'INR'
                                ? `₹${rate.basePriceINR.toLocaleString('en-IN')}`
                                : `$${rate.basePriceUSD.toLocaleString()}`}
                            </span>
                          </div>

                          <button
                            onClick={() => {
                              setInquiryDeliverable(rate.title);
                              setInquiryBudget(rate.basePriceINR.toString());
                              const el = document.getElementById('brand-inquiry-section');
                              if (el) el.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="px-3 py-1.5 rounded-lg bg-[#F5E8F5] hover:bg-[#400849] hover:text-white text-[#400849] text-xs font-semibold transition-all"
                          >
                            Select Deliverable
                          </button>
                        </div>
                      </div>
                    ))}
                </div>

                {/* Commercial Add-ons Summary Banner */}
                <div className="p-5 rounded-2xl bg-[#FFF9F5] border border-[#E9DDE8] grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-[#E9DDE8]/80 space-y-1">
                    <span className="font-bold text-[#FF5A0A] uppercase tracking-wider text-[10px]">
                      Paid Ad Whitelisting
                    </span>
                    <p className="font-serif italic text-sm font-semibold text-[#400849]">+35% / Month</p>
                    <p className="text-[11px] text-[#806785]">Meta Ads Manager whitelist partner code license for 30–60 days.</p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-[#E9DDE8]/80 space-y-1">
                    <span className="font-bold text-[#400849] uppercase tracking-wider text-[10px]">
                      Category Exclusivity
                    </span>
                    <p className="font-serif italic text-sm font-semibold text-[#400849]">+40% / Month</p>
                    <p className="text-[11px] text-[#806785]">Zero competitor brand mentions in skin, makeup, or luxury pret.</p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-[#E9DDE8]/80 space-y-1">
                    <span className="font-bold text-[#806785] uppercase tracking-wider text-[10px]">
                      Statutory Invoicing
                    </span>
                    <p className="font-serif italic text-sm font-semibold text-[#400849]">18% GST · 10% TDS</p>
                    <p className="text-[11px] text-[#806785]">Compliant B2B invoicing with SAC code 9983 and ASCI #Ad mandates.</p>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 2: INDIAN CREATOR COMMERCIAL RATE BENCHMARK 2026 (WISHLINK STANDARD) */}
            {rateTab === 'wishlink-benchmark' && (
              <div className="space-y-6">
                {/* 4 Stat Highlights from Official PDF */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-white border border-[#E9DDE8] shadow-xs space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF5A0A]">
                      Micro-Tier Benchmark
                    </span>
                    <p className="font-display font-bold text-2xl text-[#400849]">₹35,000</p>
                    <p className="text-[11px] text-[#806785]">Average Reel rate for 10K–100K cohort (Range: ₹10k–₹75k)</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-[#E9DDE8] shadow-xs space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#400849]">
                      Mid-Tier Benchmark
                    </span>
                    <p className="font-display font-bold text-2xl text-[#400849]">₹1,50,000</p>
                    <p className="text-[11px] text-[#806785]">Average Reel rate for 100K–500K creators (Range: ₹40k–₹2,00k)</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-[#E9DDE8] shadow-xs space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF5A0A]">
                      Ad Whitelisting
                    </span>
                    <p className="font-display font-bold text-2xl text-[#400849]">+30%–50%</p>
                    <p className="text-[11px] text-[#806785]">Standard commercial add-on for 30–60 days brand Meta ad usage</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-[#E9DDE8] shadow-xs space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#400849]">
                      Statutory GST
                    </span>
                    <p className="font-display font-bold text-2xl text-[#400849]">18% GST</p>
                    <p className="text-[11px] text-[#806785]">SAC 9983 levied on gross invoice; TDS u/s 194J (10%) applies</p>
                  </div>
                </div>

                {/* Creator Positioning Note */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-[#F5E8F5] via-[#FFF9F5] to-[#FFE4D5] border border-[#E9DDE8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#FF5A0A]" />
                      <span className="font-semibold text-xs text-[#400849]">
                        Where does COUTUREFLOSS fit on the benchmark?
                      </span>
                    </div>
                    <p className="text-xs text-[#806785] max-w-2xl leading-relaxed">
                      With <strong>40,000 followers</strong>, <strong>68,000+ average reel views</strong> (170% view-to-follower ratio), and a <strong>6.68% verified engagement rate</strong>, Sharmistha commands the upper quartile of the Micro Tier with a <strong>1.3x beauty/skincare niche multiplier</strong>.
                    </p>
                  </div>
                  <div className="px-3 py-1.5 rounded-xl bg-[#400849] text-white text-[11px] font-semibold whitespace-nowrap shadow-xs">
                    Micro Tier · High-Retention
                  </div>
                </div>

                {/* Deliverables Benchmark Table */}
                <div className="bg-white rounded-2xl border border-[#E9DDE8] shadow-xs overflow-hidden">
                  <div className="p-4 border-b border-[#E9DDE8] flex items-center justify-between bg-[#FFF9F5]">
                    <div>
                      <h3 className="font-serif italic text-lg font-semibold text-[#400849]">
                        Deliverables Pricing Schedule (Indian Creator Standard 2026)
                      </h3>
                      <p className="text-xs text-[#806785]">
                        Extracted from verified industry benchmarks across 5,000+ branded campaigns.
                      </p>
                    </div>
                    <span className="text-[11px] font-mono text-[#806785]">All figures in INR (₹)</span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#F5E8F5]/60 text-[#400849] font-semibold text-[11px] uppercase tracking-wider border-b border-[#E9DDE8]">
                        <tr>
                          <th className="py-3 px-4">Deliverable Format</th>
                          <th className="py-3 px-4">Micro Tier (10K–100K)</th>
                          <th className="py-3 px-4">Mid Tier (100K–500K)</th>
                          <th className="py-3 px-4">Macro Tier (500K–1M+)</th>
                          <th className="py-3 px-4 text-[#FF5A0A]">COUTUREFLOSS Standard</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E9DDE8] text-[#400849]">
                        <tr className="hover:bg-[#FFF9F5]/60 transition-colors">
                          <td className="py-3.5 px-4 font-semibold">
                            <span className="block font-medium">Instagram Reel (30–90s)</span>
                            <span className="text-[10px] text-[#806785]">In-feed dedicated reel with concept & 4K filming</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-bold">₹35,000</span>
                            <span className="text-[10px] text-[#806785] block">₹10,000 – ₹60,000</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-bold">₹1,50,000</span>
                            <span className="text-[10px] text-[#806785] block">₹40,000 – ₹2,00,000</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-bold">₹3,00,000+</span>
                            <span className="text-[10px] text-[#806785] block">₹1,50,000 – ₹5,00,000</span>
                          </td>
                          <td className="py-3.5 px-4 bg-[#FFE4D5]/30">
                            <span className="font-bold text-[#FF5A0A]">₹25,000</span>
                            <span className="text-[10px] text-[#806785] block">68K+ view velocity</span>
                          </td>
                        </tr>

                        <tr className="hover:bg-[#FFF9F5]/60 transition-colors">
                          <td className="py-3.5 px-4 font-semibold">
                            <span className="block font-medium">Story Set (3 Frames)</span>
                            <span className="text-[10px] text-[#806785]">With direct sticker swipe/shop link</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-bold">₹12,000</span>
                            <span className="text-[10px] text-[#806785] block">₹5,000 – ₹18,000</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-bold">₹30,000</span>
                            <span className="text-[10px] text-[#806785] block">₹15,000 – ₹50,000</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-bold">₹80,000+</span>
                            <span className="text-[10px] text-[#806785] block">₹40,000 – ₹1,50,000</span>
                          </td>
                          <td className="py-3.5 px-4 bg-[#FFE4D5]/30">
                            <span className="font-bold text-[#FF5A0A]">₹8,000</span>
                            <span className="text-[10px] text-[#806785] block">High direct-link CTR</span>
                          </td>
                        </tr>

                        <tr className="hover:bg-[#FFF9F5]/60 transition-colors">
                          <td className="py-3.5 px-4 font-semibold">
                            <span className="block font-medium">Static Carousel (5–8 Slides)</span>
                            <span className="text-[10px] text-[#806785]">High-bookmark editorial swatch & lookbook</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-bold">₹22,000</span>
                            <span className="text-[10px] text-[#806785] block">₹8,000 – ₹35,000</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-bold">₹60,000</span>
                            <span className="text-[10px] text-[#806785] block">₹25,000 – ₹1,00,000</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-bold">₹1,20,000+</span>
                            <span className="text-[10px] text-[#806785] block">₹80,000 – ₹2,50,000</span>
                          </td>
                          <td className="py-3.5 px-4 bg-[#FFE4D5]/30">
                            <span className="font-bold text-[#FF5A0A]">₹15,000</span>
                            <span className="text-[10px] text-[#806785] block">1,200+ saves benchmark</span>
                          </td>
                        </tr>

                        <tr className="hover:bg-[#FFF9F5]/60 transition-colors">
                          <td className="py-3.5 px-4 font-semibold">
                            <span className="block font-medium">UGC Raw Video Asset</span>
                            <span className="text-[10px] text-[#806785]">For brand whitelisting & ad distribution</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-bold">₹10,000</span>
                            <span className="text-[10px] text-[#806785] block">₹6,000 – ₹15,000</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-bold">₹25,000</span>
                            <span className="text-[10px] text-[#806785] block">₹15,000 – ₹40,000</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-bold">₹50,000+</span>
                            <span className="text-[10px] text-[#806785] block">₹35,000 – ₹80,000</span>
                          </td>
                          <td className="py-3.5 px-4 bg-[#FFE4D5]/30">
                            <span className="font-bold text-[#FF5A0A]">₹7,500</span>
                            <span className="text-[10px] text-[#806785] block">4K studio hooks included</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Commercial Add-ons and Statutory Compliance 2-Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {/* Commercial Add-Ons & Multipliers */}
                  <div className="p-5 rounded-2xl bg-white border border-[#E9DDE8] shadow-xs space-y-3">
                    <div className="flex items-center gap-2">
                      <Percent className="w-4 h-4 text-[#FF5A0A]" />
                      <h4 className="font-serif italic text-base font-semibold text-[#400849]">
                        Commercial Add-Ons & Multipliers
                      </h4>
                    </div>

                    <div className="space-y-2.5 divide-y divide-[#F5E8F5] text-[11px]">
                      <div className="pt-1.5 flex items-start justify-between">
                        <div>
                          <span className="font-semibold text-[#400849]">Paid Ad Whitelisting</span>
                          <p className="text-[#806785]">Brand runs ads via creator's handle for 30–60 days</p>
                        </div>
                        <span className="font-bold text-[#FF5A0A] shrink-0">+30% to +50%</span>
                      </div>

                      <div className="pt-2 flex items-start justify-between">
                        <div>
                          <span className="font-semibold text-[#400849]">Category Exclusivity</span>
                          <p className="text-[#806785]">Zero competitor brand partnerships during campaign window</p>
                        </div>
                        <span className="font-bold text-[#FF5A0A] shrink-0">+25% to +60% / mo</span>
                      </div>

                      <div className="pt-2 flex items-start justify-between">
                        <div>
                          <span className="font-semibold text-[#400849]">Skincare & Health Niche Multiplier</span>
                          <p className="text-[#806785]">High product trust, ingredient breakdown, and buyer intent</p>
                        </div>
                        <span className="font-bold text-[#400849] shrink-0">1.3x to 1.5x</span>
                      </div>

                      <div className="pt-2 flex items-start justify-between">
                        <div>
                          <span className="font-semibold text-[#400849]">Rush 48h Turnaround</span>
                          <p className="text-[#806785]">Accelerated production and expedited draft clearance</p>
                        </div>
                        <span className="font-bold text-[#806785] shrink-0">+25% to +40%</span>
                      </div>
                    </div>
                  </div>

                  {/* Statutory Compliance & Invoicing Standards */}
                  <div className="p-5 rounded-2xl bg-white border border-[#E9DDE8] shadow-xs space-y-3">
                    <div className="flex items-center gap-2">
                      <Receipt className="w-4 h-4 text-[#400849]" />
                      <h4 className="font-serif italic text-base font-semibold text-[#400849]">
                        Statutory Compliance & Invoicing (India)
                      </h4>
                    </div>

                    <div className="space-y-2.5 divide-y divide-[#F5E8F5] text-[11px]">
                      <div className="pt-1.5 flex items-start justify-between">
                        <div>
                          <span className="font-semibold text-[#400849]">GST (SAC 9983)</span>
                          <p className="text-[#806785]">Levied on gross invoice value for registered entities</p>
                        </div>
                        <span className="font-bold text-[#400849] shrink-0">18% GST</span>
                      </div>

                      <div className="pt-2 flex items-start justify-between">
                        <div>
                          <span className="font-semibold text-[#400849]">TDS u/s 194J (Professional Services)</span>
                          <p className="text-[#806785]">Brand deducts before paying creator; Form 16A provided</p>
                        </div>
                        <span className="font-bold text-[#400849] shrink-0">10% TDS</span>
                      </div>

                      <div className="pt-2 flex items-start justify-between">
                        <div>
                          <span className="font-semibold text-[#400849]">TDS u/s 194C (Advertising Contractor)</span>
                          <p className="text-[#806785]">Applicable if contracted under advertising services</p>
                        </div>
                        <span className="font-bold text-[#806785] shrink-0">1% to 2% TDS</span>
                      </div>

                      <div className="pt-2 flex items-start justify-between">
                        <div>
                          <span className="font-semibold text-[#400849]">ASCI Mandate</span>
                          <p className="text-[#806785]">#Ad or #Collab clearly placed in first 3 lines of caption</p>
                        </div>
                        <span className="font-bold text-green-700 shrink-0">Mandatory</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 3: INTERACTIVE CAMPAIGN COST ESTIMATOR & QUOTE GENERATOR */}
            {rateTab === 'calculator' && (() => {
              const baseDeliverableItems = [
                { id: 'rate-1', title: '1x Dedicated Instagram Reel (30–60s 4K)', inr: 25000, desc: '4K HDR studio production, concept & in-feed permanence' },
                { id: 'rate-3', title: '3x Instagram Story Set with Link', inr: 8000, desc: 'Active swipe/sticker links, polls, and 24h immediate impact' },
                { id: 'rate-4', title: '1x Editorial Carousel (5–7 Slides)', inr: 15000, desc: 'High-bookmark styling breakdown & macro beauty swatches' },
                { id: 'rate-5', title: '1x UGC Video Raw Asset (Ad-Ready)', inr: 7500, desc: 'Raw 4K hook variants filmed for brand paid social ads' },
              ];

              const calcBase = calcSelectedDeliverables.reduce((acc, id) => {
                const item = baseDeliverableItems.find(d => d.id === id);
                return acc + (item ? item.inr : 0);
              }, 0);

              const whitelistingCost = calcWhitelisting ? Math.round(calcBase * 0.35) : 0;
              const exclusivityCost = calcExclusivity ? Math.round(calcBase * 0.40) : 0;
              const rushCost = calcRush ? Math.round(calcBase * 0.25) : 0;

              const subtotal = calcBase + whitelistingCost + exclusivityCost + rushCost;
              const gst = Math.round(subtotal * 0.18);
              const totalGross = subtotal + gst;
              const tds10 = Math.round(subtotal * 0.10);
              const netPayable = totalGross - tds10;

              const toggleDeliverable = (id: string) => {
                if (calcSelectedDeliverables.includes(id)) {
                  if (calcSelectedDeliverables.length > 1) {
                    setCalcSelectedDeliverables(calcSelectedDeliverables.filter(x => x !== id));
                  }
                } else {
                  setCalcSelectedDeliverables([...calcSelectedDeliverables, id]);
                }
              };

              const applyQuoteToBooking = () => {
                const names = calcSelectedDeliverables.map(id => {
                  const itm = baseDeliverableItems.find(d => d.id === id);
                  return itm ? itm.title : id;
                }).join(' + ');

                let extra = '';
                if (calcWhitelisting) extra += ' + 30D Whitelisting';
                if (calcExclusivity) extra += ' + 30D Exclusivity';
                if (calcRush) extra += ' + 48h Express';

                setInquiryDeliverable(`${names}${extra}`);
                setInquiryBudget(subtotal.toString());
                const el = document.getElementById('brand-inquiry-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              };

              return (
                <div className="bg-white rounded-2xl border border-[#E9DDE8] shadow-xs p-6 sm:p-8 space-y-6">
                  <div>
                    <h3 className="font-serif italic text-2xl font-semibold text-[#400849]">
                      Interactive Campaign Cost Estimator
                    </h3>
                    <p className="text-xs text-[#806785] mt-1">
                      Configure your deliverables package, choose commercial licensing options, and get an instant transparent quote aligned with the 2026 Indian Creator Benchmark.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Left: Deliverable & Add-on Selectors */}
                    <div className="lg:col-span-7 space-y-5 text-xs">
                      {/* Deliverables Multi-select */}
                      <div className="space-y-2">
                        <label className="font-bold text-[#400849] uppercase tracking-wider text-[11px] block">
                          1. Choose Deliverables (Multi-Select)
                        </label>
                        <div className="space-y-2">
                          {baseDeliverableItems.map(item => {
                            const isSelected = calcSelectedDeliverables.includes(item.id);
                            return (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => toggleDeliverable(item.id)}
                                className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center justify-between gap-3 ${
                                  isSelected
                                    ? 'border-[#FF5A0A] bg-[#FFF9F5] shadow-xs'
                                    : 'border-[#E9DDE8] bg-white hover:border-[#E7B0DE]'
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  {isSelected ? (
                                    <CheckSquare className="w-4 h-4 text-[#FF5A0A] shrink-0" />
                                  ) : (
                                    <Square className="w-4 h-4 text-[#806785] shrink-0" />
                                  )}
                                  <div>
                                    <p className="font-semibold text-[#400849]">{item.title}</p>
                                    <p className="text-[11px] text-[#806785]">{item.desc}</p>
                                  </div>
                                </div>
                                <span className="font-display font-bold text-[#400849] whitespace-nowrap">
                                  ₹{item.inr.toLocaleString('en-IN')}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Add-ons & Licensing */}
                      <div className="space-y-2 pt-2 border-t border-[#F5E8F5]">
                        <label className="font-bold text-[#400849] uppercase tracking-wider text-[11px] block">
                          2. Commercial Licensing & Add-Ons
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <button
                            type="button"
                            onClick={() => setCalcWhitelisting(!calcWhitelisting)}
                            className={`p-3 rounded-xl border text-left transition-all ${
                              calcWhitelisting
                                ? 'border-[#FF5A0A] bg-[#FFF9F5]'
                                : 'border-[#E9DDE8] bg-white hover:border-[#E7B0DE]'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-semibold text-[#400849]">Ad Whitelisting</span>
                              <span className="font-bold text-[#FF5A0A] text-[10px]">+35%</span>
                            </div>
                            <p className="text-[10px] text-[#806785]">30-Day Meta Ads Manager code license</p>
                          </button>

                          <button
                            type="button"
                            onClick={() => setCalcExclusivity(!calcExclusivity)}
                            className={`p-3 rounded-xl border text-left transition-all ${
                              calcExclusivity
                                ? 'border-[#FF5A0A] bg-[#FFF9F5]'
                                : 'border-[#E9DDE8] bg-white hover:border-[#E7B0DE]'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-semibold text-[#400849]">Exclusivity</span>
                              <span className="font-bold text-[#FF5A0A] text-[10px]">+40%</span>
                            </div>
                            <p className="text-[10px] text-[#806785]">30-Day zero-competitor lock</p>
                          </button>

                          <button
                            type="button"
                            onClick={() => setCalcRush(!calcRush)}
                            className={`p-3 rounded-xl border text-left transition-all ${
                              calcRush
                                ? 'border-[#FF5A0A] bg-[#FFF9F5]'
                                : 'border-[#E9DDE8] bg-white hover:border-[#E7B0DE]'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-semibold text-[#400849]">48h Express</span>
                              <span className="font-bold text-[#806785] text-[10px]">+25%</span>
                            </div>
                            <p className="text-[10px] text-[#806785]">Rush production & approval</p>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Right: Transparent Cost Breakdown & Apply Button */}
                    <div className="lg:col-span-5 bg-[#FFF9F5] p-5 sm:p-6 rounded-2xl border border-[#E9DDE8] space-y-4 text-xs">
                      <div className="flex items-center justify-between border-b border-[#E9DDE8] pb-3">
                        <span className="font-bold text-[#400849] uppercase tracking-wider text-[11px]">
                          Quote Summary
                        </span>
                        <span className="px-2 py-0.5 rounded bg-[#E7B0DE]/40 text-[#400849] font-semibold text-[10px]">
                          2026 Commercial Standard
                        </span>
                      </div>

                      <div className="space-y-2 text-[#400849]">
                        <div className="flex items-center justify-between">
                          <span className="text-[#806785]">Base Deliverables ({calcSelectedDeliverables.length}):</span>
                          <span className="font-semibold">₹{calcBase.toLocaleString('en-IN')}</span>
                        </div>

                        {calcWhitelisting && (
                          <div className="flex items-center justify-between text-[#FF5A0A]">
                            <span>+ 30D Paid Ad Whitelisting (+35%):</span>
                            <span className="font-semibold">+₹{whitelistingCost.toLocaleString('en-IN')}</span>
                          </div>
                        )}

                        {calcExclusivity && (
                          <div className="flex items-center justify-between text-[#FF5A0A]">
                            <span>+ 30D Category Exclusivity (+40%):</span>
                            <span className="font-semibold">+₹{exclusivityCost.toLocaleString('en-IN')}</span>
                          </div>
                        )}

                        {calcRush && (
                          <div className="flex items-center justify-between text-[#806785]">
                            <span>+ 48h Express Turnaround (+25%):</span>
                            <span className="font-semibold">+₹{rushCost.toLocaleString('en-IN')}</span>
                          </div>
                        )}

                        <div className="pt-2 border-t border-[#E9DDE8] flex items-center justify-between font-semibold">
                          <span>Net Production Subtotal:</span>
                          <span className="text-sm font-bold">₹{subtotal.toLocaleString('en-IN')}</span>
                        </div>

                        <div className="flex items-center justify-between text-[#806785] text-[11px]">
                          <span>+ GST @ 18% (SAC 9983):</span>
                          <span>+₹{gst.toLocaleString('en-IN')}</span>
                        </div>

                        <div className="flex items-center justify-between text-[#806785] text-[11px]">
                          <span>- Est. TDS @ 10% u/s 194J:</span>
                          <span>-₹{tds10.toLocaleString('en-IN')}</span>
                        </div>

                        <div className="pt-3 border-t-2 border-[#400849] flex items-baseline justify-between">
                          <div>
                            <span className="text-[11px] text-[#806785] block uppercase tracking-wider font-bold">
                              Gross Invoice Value
                            </span>
                            <span className="text-[10px] text-[#806785]">Includes 18% GST</span>
                          </div>
                          <span className="font-display font-bold text-2xl text-[#FF5A0A]">
                            ₹{totalGross.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={applyQuoteToBooking}
                        className="w-full py-3 rounded-xl bg-[#FF5A0A] hover:bg-[#e04e05] text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2"
                      >
                        <span>Apply Quote to Booking Form</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <p className="text-[10px] text-center text-[#806785]">
                        Standard payment terms: 30–45 days Net from invoice date with GST & TDS documentation.
                      </p>
                    </div>
                  </div>
                </div>
              );
            })()}
          </section>

          {/* SECTION 9: DIRECT BRAND INQUIRY & BOOKING */}
          <section id="brand-inquiry-section" className="px-6 sm:px-12 lg:px-16">
            <div className="bg-[#400849] text-white rounded-3xl p-8 sm:p-14 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-5 space-y-4">
                  <span className="text-xs font-display font-semibold tracking-widest text-[#E7B0DE] uppercase">
                    09. Contact & Reservations
                  </span>
                  <h2 className="font-serif italic text-3xl sm:text-4xl text-white font-medium leading-snug">
                    Let’s create something iconic together.
                  </h2>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-normal">
                    Now reserving partnerships and seasonal launches for 2026. Reach out directly or
                    connect via our studio management.
                  </p>

                  <div className="pt-4 space-y-2 text-xs">
                    <a
                      href={`mailto:${profile.businessEmail}`}
                      className="inline-flex items-center gap-2 text-white/90 hover:text-[#E7B0DE] transition-colors group"
                    >
                      <Mail className="w-4 h-4 text-[#FF5A0A]" />
                      <span className="group-hover:underline underline-offset-4 font-medium">{profile.businessEmail}</span>
                    </a>
                    <a
                      href={profile.instagramUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-white/90 hover:text-[#E7B0DE] transition-colors"
                    >
                      <Instagram className="w-4 h-4 text-[#E7B0DE]" />
                      <span>{profile.handle} · {profile.avgReelViewsDisplay} Avg Reel Views</span>
                    </a>
                  </div>

                  {/* Creator Photo Accent Badge */}
                  <div className="pt-4 flex items-center gap-3 bg-white/10 p-3 rounded-2xl border border-white/15">
                    <img
                      src="/assets/aistudio/87E9CEBA-F010-4EDB-87ED-70F16142154B_c05f9a2b.JPG"
                      alt="Sharmistha"
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-full object-cover border border-[#E7B0DE]"
                    />
                    <div>
                      <p className="font-serif italic text-sm font-semibold text-white">Sharmistha</p>
                      <p className="text-[11px] text-[#E7B0DE]">Creative Director & Creator</p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 bg-white text-[#400849] p-6 sm:p-8 rounded-2xl shadow-xl">
                  {inquirySent ? (
                    <div className="text-center py-10 space-y-3">
                      <div className="w-12 h-12 rounded-full bg-[#E7B0DE]/40 text-[#400849] flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-6 h-6 text-[#FF5A0A]" />
                      </div>
                      <h3 className="font-serif italic text-2xl font-semibold text-[#400849]">
                        Inquiry Received
                      </h3>
                      <p className="text-xs text-[#806785] max-w-sm mx-auto leading-relaxed">
                        Thank you! Your campaign proposal has been delivered to Sharmistha and the
                        COUTUREFLOSS studio team.
                      </p>
                      <button
                        onClick={() => setInquirySent(false)}
                        className="mt-4 px-4 py-2 rounded-lg bg-[#400849] text-white text-xs font-semibold"
                      >
                        Submit Another Inquiry
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleInquirySubmit} className="space-y-4 text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="font-semibold text-[#400849] block mb-1">
                            Brand Name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Dior / Forest Essentials"
                            value={inquiryBrand}
                            onChange={e => setInquiryBrand(e.target.value)}
                            className="w-full p-2.5 border border-[#E9DDE8] rounded-lg text-xs focus:ring-2 focus:ring-[#E7B0DE] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="font-semibold text-[#400849] block mb-1">
                            Contact Person
                          </label>
                          <input
                            type="text"
                            placeholder="Your name & title"
                            value={inquiryName}
                            onChange={e => setInquiryName(e.target.value)}
                            className="w-full p-2.5 border border-[#E9DDE8] rounded-lg text-xs focus:ring-2 focus:ring-[#E7B0DE] focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="font-semibold text-[#400849] block mb-1">
                            Business Email *
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="pr@brand.com"
                            value={inquiryEmail}
                            onChange={e => setInquiryEmail(e.target.value)}
                            className="w-full p-2.5 border border-[#E9DDE8] rounded-lg text-xs focus:ring-2 focus:ring-[#E7B0DE] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="font-semibold text-[#400849] block mb-1">
                            Desired Deliverable
                          </label>
                          <select
                            value={inquiryDeliverable}
                            onChange={e => setInquiryDeliverable(e.target.value)}
                            className="w-full p-2.5 border border-[#E9DDE8] rounded-lg text-xs bg-white focus:ring-2 focus:ring-[#E7B0DE] focus:outline-none"
                          >
                            <option>1x Dedicated Instagram Reel</option>
                            <option>Signature Reel + 3x Story Suite</option>
                            <option>3x Instagram Story Set</option>
                            <option>Editorial Carousel Post</option>
                            <option>UGC Video Asset</option>
                            <option>Hosted Luxury Stay Coverage</option>
                            <option>Long-Term Category Ambassadorship</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="font-semibold text-[#400849] block mb-1">
                          Campaign Brief & Key Dates
                        </label>
                        <textarea
                          rows={3}
                          placeholder="Tell us about the launch, desired styling, or timeline..."
                          value={inquiryMessage}
                          onChange={e => setInquiryMessage(e.target.value)}
                          className="w-full p-2.5 border border-[#E9DDE8] rounded-lg text-xs focus:ring-2 focus:ring-[#E7B0DE] focus:outline-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-[#FF5A0A] hover:bg-[#e04e05] text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Collaboration Inquiry</span>
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="text-center pt-8 border-t border-[#E9DDE8] text-xs text-[#806785] space-y-3">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={handleDownloadPdf}
                disabled={isDownloadingPdf}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#400849] text-[#E7B0DE] hover:text-white hover:bg-[#2b0431] text-xs font-semibold transition-all shadow-xs"
              >
                {isDownloadingPdf ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 text-[#FF5A0A] animate-spin" />
                    <span>{pdfStatusMessage || 'Generating PDF...'}</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5 text-[#FF5A0A]" />
                    <span>Download Media Kit PDF (4-Page Official Publication)</span>
                  </>
                )}
              </button>
            </div>
            <p>© 2026 COUTUREFLOSS Studio. Curated by Sharmistha · Bengaluru, India. All rights reserved.</p>
            <p className="text-[11px] text-[#806785]/80">
              Instagram: @couturefloss · 68,000+ Verified Avg Reel Views · 6.68% Engagement Rate · sharmic17@gmail.com
            </p>
          </footer>
        </div>
      </div>

      {/* LIGHTBOX PHOTO MODAL */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-[#400849]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#E9DDE8] animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative aspect-[3/4] bg-[#400849] overflow-hidden">
                <img
                  src={selectedPhoto.imageUrl}
                  alt={selectedPhoto.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <div className="p-6 sm:p-8 flex flex-col justify-between space-y-4 text-xs">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#E7B0DE]/40 text-[#400849] font-bold text-[10px] tracking-wider uppercase">
                      {selectedPhoto.tag}
                    </span>
                    <span className="text-[#806785] text-[11px] font-semibold">
                      {selectedPhoto.category}
                    </span>
                  </div>

                  <h3 className="font-serif italic text-2xl text-[#400849] font-medium leading-snug">
                    {selectedPhoto.title}
                  </h3>

                  <div className="space-y-1.5 pt-2">
                    <span className="font-bold text-[#400849] block text-[11px] uppercase tracking-wider">
                      Styling & Creative Direction
                    </span>
                    <p className="text-[#806785] leading-relaxed">
                      {selectedPhoto.stylingNotes}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-2">
                    <span className="font-bold text-[#FF5A0A] block text-[11px] uppercase tracking-wider">
                      Campaign Deliverable Fit
                    </span>
                    <p className="text-[#400849] leading-relaxed bg-[#FFF9F5] p-3 rounded-xl border border-[#E9DDE8]">
                      {selectedPhoto.deliverableFit}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E9DDE8] flex items-center justify-between gap-2">
                  <a
                    href={selectedPhoto.reelUrl || 'https://www.instagram.com/couturefloss/'}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FF5A0A] text-white font-semibold hover:bg-[#e04e05] transition-colors shadow-xs text-xs"
                  >
                    {selectedPhoto.isReel ? (
                      <>
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Watch on Instagram</span>
                      </>
                    ) : (
                      <>
                        <Instagram className="w-3.5 h-3.5" />
                        <span>View on @couturefloss</span>
                      </>
                    )}
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => {
                      setSelectedPhoto(null);
                      // Scroll to inquiry section
                      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-[#400849] text-white font-semibold hover:bg-[#2b0431] transition-colors text-xs"
                  >
                    Book This Aesthetic
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AUTHENTIC INSTAGRAM REEL LIVE PROOF MODAL */}
      {selectedProofReel && (
        <div className="fixed inset-0 z-50 bg-[#400849]/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="relative bg-white rounded-3xl max-w-5xl w-full overflow-hidden shadow-2xl border border-[#E9DDE8] animate-in fade-in zoom-in-95 duration-200 my-auto">
            <button
              onClick={() => setSelectedProofReel(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12 min-h-[580px]">
              {/* Left Column: Proof Viewer (Screenshot Audit or Live Player) */}
              <div className="md:col-span-6 bg-[#26052c] relative flex flex-col justify-between p-3 sm:p-4 border-b md:border-b-0 md:border-r border-[#E9DDE8]">
                {/* Proof Switcher Tabs if screenshot exists */}
                {selectedProofReel.insightScreenshotUrl ? (
                  <div className="flex items-center gap-1.5 p-1 bg-black/50 rounded-xl mb-3 text-xs">
                    <button
                      onClick={() => setProofModalTab('screenshot')}
                      className={`flex-1 py-1.5 px-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-1.5 ${
                        proofModalTab === 'screenshot'
                          ? 'bg-[#FF5A0A] text-white shadow-xs'
                          : 'text-[#E7B0DE] hover:text-white'
                      }`}
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>Meta Insights Screenshot</span>
                    </button>
                    <button
                      onClick={() => setProofModalTab('embed')}
                      className={`flex-1 py-1.5 px-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-1.5 ${
                        proofModalTab === 'embed'
                          ? 'bg-[#400849] text-white shadow-xs'
                          : 'text-[#E7B0DE] hover:text-white'
                      }`}
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>Live Instagram Player</span>
                    </button>
                  </div>
                ) : (
                  <div className="pb-2 text-xs font-semibold text-[#E7B0DE] flex items-center gap-1.5">
                    <Play className="w-3.5 h-3.5 text-[#FF5A0A]" />
                    <span>Live Reel Player</span>
                  </div>
                )}

                {/* Media Container */}
                <div className="w-full h-[490px] rounded-2xl overflow-hidden bg-black shadow-md relative flex items-center justify-center">
                  {selectedProofReel.insightScreenshotUrl && proofModalTab === 'screenshot' ? (
                    <div className="relative w-full h-full flex flex-col items-center justify-center bg-zinc-950 p-1">
                      <img
                        src={selectedProofReel.insightScreenshotUrl}
                        alt="Meta Professional Dashboard Insights Proof"
                        className="w-full h-full object-contain"
                      />
                      <div className="absolute bottom-2 left-2 right-2 p-2 rounded-xl bg-black/85 backdrop-blur-md text-[11px] text-white flex items-center justify-between border border-white/10">
                        <span className="flex items-center gap-1.5 text-[#FF5A0A] font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Meta Professional Dashboard</span>
                        </span>
                        <span className="text-white/70 font-mono text-[10px]">Verified Audit Proof</span>
                      </div>
                    </div>
                  ) : (
                    <iframe
                      src={`https://www.instagram.com/p/${selectedProofReel.shortcode}/embed/captioned/`}
                      className="w-full h-full border-0 bg-white"
                      scrolling="yes"
                      allowTransparency={true}
                      title={selectedProofReel.title}
                    />
                  )}
                </div>

                {/* Bottom link info */}
                <div className="w-full pt-2.5 px-1 flex items-center justify-between text-[11px] text-[#E7B0DE]">
                  <span className="font-mono">Shortcode: {selectedProofReel.shortcode}</span>
                  <a
                    href={selectedProofReel.reelUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#FF5A0A] hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span>Open in Instagram</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Right Column: Verified Audit Logs & Performance Proof */}
              <div className="md:col-span-6 p-6 sm:p-7 flex flex-col justify-between space-y-4 text-xs overflow-y-auto max-h-[580px]">
                <div className="space-y-3.5">
                  <div className="flex flex-wrap items-center gap-2">
                    {selectedProofReel.isMetaVerifiedScreenshot ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#FF5A0A] text-white font-bold text-[10px] tracking-wider uppercase shadow-xs">
                        <Camera className="w-3.5 h-3.5" />
                        <span>Audited by Meta Screenshot</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#400849] text-white font-bold text-[10px] tracking-wider uppercase shadow-xs">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#FF5A0A]" />
                        <span>Verified Reel Proof</span>
                      </span>
                    )}

                    <span className="px-2.5 py-1 rounded-full bg-[#E7B0DE]/40 text-[#400849] font-bold text-[10px] tracking-wider uppercase">
                      {selectedProofReel.category}
                    </span>
                    {selectedProofReel.brand && (
                      <span className="px-2.5 py-1 rounded-full bg-[#FFF9F5] border border-[#E9DDE8] text-[#806785] font-semibold text-[10px]">
                        Brand: {selectedProofReel.brand}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-serif italic text-2xl text-[#400849] font-medium leading-snug">
                      {selectedProofReel.title}
                    </h3>
                    <p className="text-[11px] text-[#806785] mt-1 font-mono">
                      Feed Permalink: <span className="text-[#400849]">{selectedProofReel.reelUrl}</span>
                    </p>
                  </div>

                  {/* Verified Metrics Breakdown */}
                  <div className="grid grid-cols-3 gap-2 text-center font-display pt-1">
                    <div className="p-2.5 rounded-xl bg-[#FFF9F5] border border-[#E9DDE8]">
                      <span className="text-[10px] text-[#806785] uppercase block font-semibold">Total Views</span>
                      <span className="font-bold text-[#FF5A0A] text-base tabular-nums">
                        {selectedProofReel.views.toLocaleString()}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#FFF9F5] border border-[#E9DDE8]">
                      <span className="text-[10px] text-[#806785] uppercase block font-semibold flex items-center justify-center gap-0.5">
                        <span>{selectedProofReel.uniqueViewers ? 'Viewers (Reach)' : 'Total Reach'}</span>
                        {selectedProofReel.isMetaVerifiedScreenshot && <CheckCircle2 className="w-3 h-3 text-[#FF5A0A]" />}
                      </span>
                      <span className="font-bold text-[#400849] text-base tabular-nums">
                        {selectedProofReel.reach.toLocaleString()}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#FFF9F5] border border-[#E9DDE8]">
                      <span className="text-[10px] text-[#806785] uppercase block font-semibold">Eng. Rate</span>
                      <span className="font-bold text-[#400849] text-base">{selectedProofReel.engagement}</span>
                    </div>
                  </div>

                  {/* Detailed Meta Screenshot Audit Figures */}
                  {selectedProofReel.isMetaVerifiedScreenshot && (
                    <div className="space-y-2 p-3 rounded-2xl bg-[#FFE4D5]/30 border border-[#FF5A0A]/30">
                      <div className="flex items-center justify-between text-[11px] font-bold text-[#400849]">
                        <span className="flex items-center gap-1 text-[#FF5A0A]">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Internal Meta Dashboard Breakdown</span>
                        </span>
                        <span className="text-[#806785] font-normal">Exact figures from creator app</span>
                      </div>
                      <div className="grid grid-cols-4 gap-2 text-center font-display text-xs pt-1">
                        <div className="p-2 rounded-xl bg-white border border-[#E9DDE8]">
                          <span className="text-[9px] text-[#806785] uppercase block">Likes</span>
                          <span className="font-bold text-[#400849] tabular-nums">{selectedProofReel.likesCount?.toLocaleString()}</span>
                        </div>
                        <div className="p-2 rounded-xl bg-white border border-[#E9DDE8]">
                          <span className="text-[9px] text-[#806785] uppercase block">Saves</span>
                          <span className="font-bold text-[#FF5A0A] tabular-nums">{selectedProofReel.savesCount?.toLocaleString() || selectedProofReel.saves}</span>
                        </div>
                        <div className="p-2 rounded-xl bg-white border border-[#E9DDE8]">
                          <span className="text-[9px] text-[#806785] uppercase block">Shares</span>
                          <span className="font-bold text-[#400849] tabular-nums">{selectedProofReel.sharesCount?.toLocaleString() || '-'}</span>
                        </div>
                        <div className="p-2 rounded-xl bg-white border border-[#E9DDE8]">
                          <span className="text-[9px] text-[#806785] uppercase block">Comments</span>
                          <span className="font-bold text-[#400849] tabular-nums">{selectedProofReel.commentsCount}</span>
                        </div>
                      </div>

                      {selectedProofReel.totalInteractions && (
                        <div className="pt-1 flex items-center justify-between text-[11px] font-medium text-[#400849] px-1">
                          <span>Total Recorded Interactions:</span>
                          <span className="font-bold text-[#FF5A0A]">{selectedProofReel.totalInteractions.toLocaleString()} actions</span>
                        </div>
                      )}

                      {selectedProofReel.nonFollowerReachPercent && (
                        <div className="flex items-center justify-between text-[11px] font-medium text-[#400849] px-1">
                          <span>Algorithmic Non-Follower Reach:</span>
                          <span className="font-bold text-[#400849]">{selectedProofReel.nonFollowerReachPercent}% Views · {selectedProofReel.nonFollowerInteractionPercent}% Interactions</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Comment Velocity & Saves Badge for benchmark items */}
                  {!selectedProofReel.isMetaVerifiedScreenshot && (
                    <div className="flex flex-wrap items-center gap-2">
                      {selectedProofReel.verifiedComments && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F5E8F5] text-[#400849] font-semibold text-xs border border-[#E9DDE8]">
                          <MessageCircle className="w-3.5 h-3.5 text-[#FF5A0A]" />
                          <span>{selectedProofReel.verifiedComments} Comments Velocity</span>
                        </div>
                      )}
                      {selectedProofReel.saves && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FFF9F5] text-[#400849] font-semibold text-xs border border-[#E9DDE8]">
                          <span>🔖 {selectedProofReel.saves} High-Intent Saves</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Authentic Caption Quote from Post */}
                  {selectedProofReel.captionSnippet && (
                    <div className="space-y-1 pt-1">
                      <span className="font-bold text-[#400849] block text-[10px] uppercase tracking-wider">
                        Original Caption Proof
                      </span>
                      <div className="p-3 rounded-xl bg-[#FFF9F5] border border-[#E9DDE8] text-[#400849] italic text-xs leading-relaxed font-serif">
                        <span className="text-[#FF5A0A] font-bold mr-1">“</span>
                        {selectedProofReel.captionSnippet}
                        <span className="text-[#FF5A0A] font-bold ml-1">”</span>
                      </div>
                    </div>
                  )}

                  {/* Case Study Takeaway */}
                  {selectedProofReel.caseStudySummary && (
                    <div className="space-y-1 pt-1">
                      <span className="font-bold text-[#FF5A0A] block text-[10px] uppercase tracking-wider">
                        Campaign Retention & Conversion Impact
                      </span>
                      <p className="text-xs text-[#806785] leading-relaxed">
                        {selectedProofReel.caseStudySummary}
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer Buttons */}
                <div className="pt-4 border-t border-[#E9DDE8] flex flex-wrap items-center justify-between gap-2">
                  <a
                    href={selectedProofReel.reelUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#F5E8F5] text-[#400849] font-semibold hover:bg-[#E7B0DE]/50 transition-colors text-xs border border-[#E9DDE8]"
                  >
                    <Instagram className="w-3.5 h-3.5 text-[#FF5A0A]" />
                    <span>Watch Full Video on Instagram</span>
                    <ArrowUpRight className="w-3 h-3 text-[#806785]" />
                  </a>

                  <button
                    onClick={() => {
                      setSelectedProofReel(null);
                      setInquiryDeliverable(`1x Dedicated Reel (${selectedProofReel.category})`);
                      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                    }}
                    className="px-4 py-2 rounded-xl bg-[#400849] text-white font-semibold hover:bg-[#2b0431] transition-colors text-xs shadow-xs"
                  >
                    Book Similar Reel Campaign
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CUSTOMIZE KIT MODAL */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 bg-[#400849]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-[#E9DDE8]">
            <div className="flex items-center justify-between pb-4 border-b border-[#E9DDE8]">
              <div>
                <h3 className="font-display font-semibold text-lg text-[#400849]">
                  Customize Media Kit
                </h3>
                <p className="text-xs text-[#806785]">
                  Instant live updates to your verified metrics, bio, rates, and highlights.
                </p>
              </div>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-sm text-[#806785] hover:text-[#400849]"
              >
                ✕
              </button>
            </div>

            {/* Sub-tabs inside modal */}
            <div className="flex border-b border-[#E9DDE8] mt-3 text-xs font-semibold">
              <button
                onClick={() => setEditTab('profile')}
                className={`py-2 px-3 border-b-2 transition-all ${
                  editTab === 'profile'
                    ? 'border-[#400849] text-[#400849]'
                    : 'border-transparent text-[#806785]'
                }`}
              >
                Bio & Vision
              </button>
              <button
                onClick={() => setEditTab('metrics')}
                className={`py-2 px-3 border-b-2 transition-all ${
                  editTab === 'metrics'
                    ? 'border-[#400849] text-[#400849]'
                    : 'border-transparent text-[#806785]'
                }`}
              >
                Audience Metrics
              </button>
              <button
                onClick={() => setEditTab('rates')}
                className={`py-2 px-3 border-b-2 transition-all ${
                  editTab === 'rates'
                    ? 'border-[#400849] text-[#400849]'
                    : 'border-transparent text-[#806785]'
                }`}
              >
                Rates & Pricing
              </button>
              <button
                onClick={() => setEditTab('content')}
                className={`py-2 px-3 border-b-2 transition-all ${
                  editTab === 'content'
                    ? 'border-[#400849] text-[#400849]'
                    : 'border-transparent text-[#806785]'
                }`}
              >
                Add Highlight
              </button>
            </div>

            {/* TAB 1: PROFILE */}
            {editTab === 'profile' && (
              <form onSubmit={handleSaveProfile} className="mt-4 space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-[#400849] block mb-1">Creator Name</label>
                    <input
                      type="text"
                      value={profileForm.name}
                      onChange={e => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs"
                      required
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-[#400849] block mb-1">
                      Instagram Handle
                    </label>
                    <input
                      type="text"
                      value={profileForm.handle}
                      onChange={e => setProfileForm({ ...profileForm, handle: e.target.value })}
                      className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-[#400849] block mb-1">Cover Headline</label>
                  <input
                    type="text"
                    value={headline}
                    onChange={e => setHeadline(e.target.value)}
                    className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#400849] block mb-1">
                    Editorial Biography
                  </label>
                  <textarea
                    rows={4}
                    value={profileForm.bio}
                    onChange={e => setProfileForm({ ...profileForm, bio: e.target.value })}
                    className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-[#400849] block mb-1">Location</label>
                    <input
                      type="text"
                      value={profileForm.location}
                      onChange={e => setProfileForm({ ...profileForm, location: e.target.value })}
                      className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-[#400849] block mb-1">Business Email</label>
                    <input
                      type="email"
                      value={profileForm.businessEmail}
                      onChange={e =>
                        setProfileForm({ ...profileForm, businessEmail: e.target.value })
                      }
                      className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E9DDE8]">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="px-3.5 py-1.5 rounded-lg border border-[#E9DDE8] text-[#806785]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-[#400849] text-white font-semibold"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            )}

            {/* TAB 2: METRICS */}
            {editTab === 'metrics' && (
              <form onSubmit={handleSaveProfile} className="mt-4 space-y-4 text-xs">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="font-semibold text-[#400849] block mb-1">
                      Followers (Display)
                    </label>
                    <input
                      type="text"
                      value={profileForm.followersDisplay}
                      onChange={e =>
                        setProfileForm({ ...profileForm, followersDisplay: e.target.value })
                      }
                      className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-[#400849] block mb-1">
                      Avg Reel Views (Display)
                    </label>
                    <input
                      type="text"
                      value={profileForm.avgReelViewsDisplay}
                      onChange={e =>
                        setProfileForm({ ...profileForm, avgReelViewsDisplay: e.target.value })
                      }
                      className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-[#400849] block mb-1">
                      Engagement Rate (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={profileForm.engagementRate}
                      onChange={e =>
                        setProfileForm({
                          ...profileForm,
                          engagementRate: parseFloat(e.target.value) || 0,
                        })
                      }
                      className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-[#400849] block mb-1">
                      Monthly Impressions
                    </label>
                    <input
                      type="number"
                      value={profileForm.monthlyImpressions}
                      onChange={e =>
                        setProfileForm({
                          ...profileForm,
                          monthlyImpressions: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-[#400849] block mb-1">
                      Average Story Views
                    </label>
                    <input
                      type="number"
                      value={profileForm.avgStoryViews}
                      onChange={e =>
                        setProfileForm({
                          ...profileForm,
                          avgStoryViews: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E9DDE8]">
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-[#400849] text-white font-semibold"
                  >
                    Save Metrics
                  </button>
                </div>
              </form>
            )}

            {/* TAB 3: RATES & PRICING */}
            {editTab === 'rates' && (
              <div className="mt-4 space-y-4 text-xs">
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {rates.map(rate => (
                    <div
                      key={rate.id}
                      className="p-3 rounded-lg border border-[#E9DDE8] bg-[#FFF9F5] flex items-center justify-between"
                    >
                      <div>
                        <p className="font-semibold text-[#400849]">{rate.title}</p>
                        <p className="text-[#806785]">
                          ₹{rate.basePriceINR.toLocaleString()} · ${rate.basePriceUSD.toLocaleString()}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateRate(rate.id, { isPublicInKit: !rate.isPublicInKit })
                          }
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            rate.isPublicInKit
                              ? 'bg-green-100 text-green-800'
                              : 'bg-neutral-100 text-neutral-500'
                          }`}
                        >
                          {rate.isPublicInKit ? 'Public on Kit' : 'Hidden'}
                        </button>
                        <button
                          onClick={() => deleteRate(rate.id)}
                          className="text-[#806785] hover:text-[#FF5A0A]"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add new rate item */}
                <form
                  onSubmit={handleCreateRate}
                  className="pt-3 border-t border-[#E9DDE8] space-y-3"
                >
                  <p className="font-semibold text-[#400849]">Add Service to Rate Card</p>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Service title (e.g. 1x Dedicated Reel)"
                      value={newRateTitle}
                      onChange={e => setNewRateTitle(e.target.value)}
                      className="p-2 border border-[#E9DDE8] rounded-lg text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Short description"
                      value={newRateDesc}
                      onChange={e => setNewRateDesc(e.target.value)}
                      className="p-2 border border-[#E9DDE8] rounded-lg text-xs"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="number"
                      placeholder="Price in INR (₹)"
                      value={newRateINR}
                      onChange={e => setNewRateINR(e.target.value)}
                      className="p-2 border border-[#E9DDE8] rounded-lg text-xs"
                    />
                    <input
                      type="number"
                      placeholder="Price in USD ($)"
                      value={newRateUSD}
                      onChange={e => setNewRateUSD(e.target.value)}
                      className="p-2 border border-[#E9DDE8] rounded-lg text-xs"
                    />
                    <button
                      type="submit"
                      className="p-2 rounded-lg bg-[#400849] text-white font-semibold"
                    >
                      Add Rate
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB 4: ADD PORTFOLIO HIGHLIGHT */}
            {editTab === 'content' && (
              <form onSubmit={handleCreatePortfolio} className="mt-4 space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-[#400849] block mb-1">
                    Content / Campaign Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Glass Skin Barrier Care Masterclass"
                    value={newPortTitle}
                    onChange={e => setNewPortTitle(e.target.value)}
                    className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-semibold text-[#400849] block mb-1">Partner Brand</label>
                    <input
                      type="text"
                      placeholder="e.g. Kama Ayurveda"
                      value={newPortBrand}
                      onChange={e => setNewPortBrand(e.target.value)}
                      className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-[#400849] block mb-1">Category</label>
                    <select
                      value={newPortCat}
                      onChange={e => setNewPortCat(e.target.value as any)}
                      className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs bg-white"
                    >
                      <option>Beauty & Makeup</option>
                      <option>Skincare & Haircare</option>
                      <option>Fashion & Styling</option>
                      <option>Luxury Lifestyle</option>
                      <option>Travel & Hotels</option>
                      <option>Daily Vlogs & Opinions</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="font-semibold text-[#400849] block mb-1">Views</label>
                    <input
                      type="number"
                      value={newPortViews}
                      onChange={e => setNewPortViews(e.target.value)}
                      className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-[#400849] block mb-1">Reach</label>
                    <input
                      type="number"
                      value={newPortReach}
                      onChange={e => setNewPortReach(e.target.value)}
                      className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-[#400849] block mb-1">Engagement</label>
                    <input
                      type="text"
                      value={newPortEngage}
                      onChange={e => setNewPortEngage(e.target.value)}
                      className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-[#400849] block mb-1">
                    Instagram Reel URL
                  </label>
                  <input
                    type="url"
                    value={newPortReelUrl}
                    onChange={e => setNewPortReelUrl(e.target.value)}
                    className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#400849] block mb-1">
                    Case Study Summary & Saves
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Highlight conversion, saves, or trending audio results..."
                    value={newPortSummary}
                    onChange={e => setNewPortSummary(e.target.value)}
                    className="w-full p-2 border border-[#E9DDE8] rounded-lg text-xs"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E9DDE8]">
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-[#400849] text-white font-semibold"
                  >
                    Add Highlight to Kit
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
