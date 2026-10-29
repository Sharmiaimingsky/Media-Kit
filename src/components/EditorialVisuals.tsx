import React from 'react';

// Bespoke Luxury Editorial Visuals for COUTUREFLOSS using the exact brand palette:
// Orchid Pink: #E7B0DE, Eggplant Violet: #400849, Signal Orange: #FF5A0A, Warm Ivory: #FFF9F5, Peach: #FFE4D5

export const EditorialCoverArtwork: React.FC<{ className?: string }> = ({ className = 'h-full w-full' }) => (
  <div className={`relative overflow-hidden bg-gradient-to-br from-[#E7B0DE] via-[#F5E8F5] to-[#FFE4D5] flex items-center justify-center ${className}`}>
    {/* Geometric haute couture accents */}
    <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-[#E7B0DE]/40 blur-3xl" />
    <div className="absolute -left-16 -bottom-16 w-80 h-80 rounded-full bg-[#FF5A0A]/20 blur-2xl" />
    <div className="absolute inset-0 bg-[radial-gradient(#400849_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.07]" />

    {/* Editorial Silhouette / Monogram Composition */}
    <div className="relative z-10 flex flex-col items-center text-center p-8">
      <div className="w-24 h-24 mb-6 rounded-full border-2 border-[#400849]/30 flex items-center justify-center bg-white/70 backdrop-blur-md shadow-sm">
        <span className="font-serif italic text-3xl font-semibold text-[#400849]">CF</span>
      </div>
      <p className="font-display text-xs uppercase tracking-[0.3em] text-[#400849]/70 mb-2">Editorial Masterclass</p>
      <h2 className="font-serif italic text-3xl md:text-5xl text-[#400849] font-medium max-w-md tracking-tight leading-none mb-4">
        COUTUREFLOSS
      </h2>
      <div className="flex items-center gap-2 text-xs font-medium text-[#400849]/80 uppercase tracking-widest">
        <span>Vogue Aesthetic</span>
        <span>•</span>
        <span>High Glamour</span>
        <span>•</span>
        <span>India & Beyond</span>
      </div>
      <div className="mt-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#400849] text-white text-[11px] font-medium tracking-wide">
        <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A0A]" />
        311,000 Avg Reel Views
      </div>
    </div>
  </div>
);

export const CreatorAvatar: React.FC<{ src?: string; alt?: string; size?: 'sm' | 'md' | 'lg' | 'xl'; className?: string }> = ({
  src,
  alt = 'Sharmistha — COUTUREFLOSS',
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-10 h-10 text-sm',
    md: 'w-16 h-16 text-lg',
    lg: 'w-24 h-24 text-2xl',
    xl: 'w-32 h-32 text-3xl',
  }[size];

  if (src && src.trim() !== '') {
    return (
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        className={`${sizeClasses} rounded-full object-cover border-2 border-[#E7B0DE] shadow-sm ${className}`}
      />
    );
  }

  // Luxury Editorial Avatar Fallback
  return (
    <div
      className={`${sizeClasses} rounded-full bg-gradient-to-tr from-[#400849] via-[#806785] to-[#E7B0DE] text-white font-serif font-semibold italic flex items-center justify-center border-2 border-[#E7B0DE] shadow-sm shrink-0 ${className}`}
      title={alt}
    >
      <span>S</span>
    </div>
  );
};

export const EditorialCardIllustration: React.FC<{
  category: string;
  className?: string;
  accent?: string;
}> = ({ category, className = 'h-48 w-full', accent = '#E7B0DE' }) => {
  const getCategoryDetails = () => {
    switch (category) {
      case 'Beauty & Makeup':
        return {
          title: 'Beauty & Pigment Artistry',
          subtitle: 'Editorial Lips & Macro Glow',
          bg: 'from-[#E7B0DE] via-[#F5E8F5] to-[#FFE4D5]',
          iconText: 'BEAUTY',
        };
      case 'Skincare & Haircare':
        return {
          title: 'Barrier Repair & Science',
          subtitle: 'Glass Skin & Botanical Actives',
          bg: 'from-[#FFE4D5] via-[#FFF9F5] to-[#E7B0DE]',
          iconText: 'SKINCARE',
        };
      case 'Fashion & Styling':
        return {
          title: 'Haute Couture & Draping',
          subtitle: 'Modern Silhouettes & Festive Styling',
          bg: 'from-[#F5E8F5] via-[#E7B0DE] to-[#400849]/10',
          iconText: 'FASHION',
        };
      case 'Travel & Hotels':
        return {
          title: 'Experiential Escapes',
          subtitle: 'Luxury Heritage & Coastal Retreats',
          bg: 'from-[#FFE4D5] via-[#E7B0DE] to-[#FFF9F5]',
          iconText: 'TRAVEL',
        };
      case 'Luxury Lifestyle':
        return {
          title: 'Curated Elegance',
          subtitle: 'Fragrance & Capsule Living',
          bg: 'from-[#E7B0DE] via-[#806785]/20 to-[#FFF9F5]',
          iconText: 'LIFESTYLE',
        };
      default:
        return {
          title: 'Cultural Perspectives',
          subtitle: 'Candid Opinions & Creator Studio',
          bg: 'from-[#F5E8F5] via-[#FFE4D5] to-[#E7B0DE]',
          iconText: 'VLOGS',
        };
    }
  };

  const details = getCategoryDetails();

  return (
    <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${details.bg} flex flex-col justify-end p-5 select-none ${className}`}>
      <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/80 backdrop-blur-sm text-[10px] font-display font-semibold tracking-wider text-[#400849]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A0A]" />
        {details.iconText}
      </div>

      <div className="relative z-10">
        <p className="font-display text-[11px] uppercase tracking-wider text-[#400849]/70 font-semibold mb-1">
          {details.subtitle}
        </p>
        <h4 className="font-serif italic text-lg text-[#400849] font-medium leading-snug">
          {details.title}
        </h4>
      </div>

      {/* Decorative luxury lines */}
      <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full border border-[#400849]/15 pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-44 h-44 rounded-full border border-[#400849]/10 pointer-events-none" />
    </div>
  );
};
