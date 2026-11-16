import React from 'react';

// Bespoke Luxury Editorial Visuals for COUTUREFLOSS featuring Sharmistha's authentic photography

export const EditorialCoverArtwork: React.FC<{ className?: string }> = ({ className = 'h-full w-full' }) => (
  <div className={`relative overflow-hidden bg-[#400849] flex items-center justify-center ${className}`}>
    <img
      src="/assets/aistudio/1CD2BD78-5F60-4824-BE87-D1E4B2CB0946_5909ad5f.PNG"
      alt="Sharmistha — COUTUREFLOSS Lotus Waters Editorial"
      referrerPolicy="no-referrer"
      className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.95]"
    />
    {/* High-fashion scrim */}
    <div className="absolute inset-0 bg-gradient-to-t from-[#400849] via-[#400849]/30 to-black/20" />

    {/* Editorial Silhouette / Monogram Composition */}
    <div className="relative z-10 flex flex-col items-center text-center p-6 sm:p-8">
      <div className="w-20 h-20 mb-4 rounded-full border-2 border-[#E7B0DE] flex items-center justify-center bg-[#400849]/80 backdrop-blur-md shadow-lg">
        <span className="font-serif italic text-3xl font-semibold text-[#E7B0DE]">CF</span>
      </div>
      <p className="font-display text-xs uppercase tracking-[0.3em] text-[#E7B0DE] mb-1 font-semibold">
        Haute Couture & Heritage
      </p>
      <h2 className="font-serif italic text-3xl sm:text-5xl text-white font-medium max-w-md tracking-tight leading-none mb-3 drop-shadow-md">
        COUTUREFLOSS
      </h2>
      <div className="flex items-center gap-2 text-xs font-medium text-white/90 uppercase tracking-widest">
        <span>Vogue Aesthetic</span>
        <span>•</span>
        <span>High Glamour</span>
        <span>•</span>
        <span>India & Beyond</span>
      </div>
      <div className="mt-5 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#400849]/90 border border-[#E7B0DE]/40 text-white text-xs font-medium tracking-wide shadow-md">
        <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A0A]" />
        311,000 Avg Reel Views
      </div>
    </div>
  </div>
);

export const CreatorAvatar: React.FC<{ src?: string; alt?: string; size?: 'sm' | 'md' | 'lg' | 'xl'; className?: string }> = ({
  src = '/assets/aistudio/87E9CEBA-F010-4EDB-87ED-70F16142154B_c05f9a2b.JPG',
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

  const imageSrc = src && src.trim() !== '' ? src : '/assets/aistudio/87E9CEBA-F010-4EDB-87ED-70F16142154B_c05f9a2b.JPG';

  return (
    <img
      src={imageSrc}
      alt={alt}
      referrerPolicy="no-referrer"
      className={`${sizeClasses} rounded-full object-cover border-2 border-[#E7B0DE] shadow-md shrink-0 ${className}`}
      onError={e => {
        // Fallback to monogram if missing
        e.currentTarget.style.display = 'none';
      }}
    />
  );
};

export const EditorialCardIllustration: React.FC<{
  category: string;
  className?: string;
  accent?: string;
}> = ({ category, className = 'h-52 w-full', accent = '#E7B0DE' }) => {
  const getCategoryDetails = () => {
    switch (category) {
      case 'Beauty & Makeup':
        return {
          title: 'Beauty & Pigment Artistry',
          subtitle: 'Editorial Lips & Macro Glow',
          image: '/assets/aistudio/87E9CEBA-F010-4EDB-87ED-70F16142154B_c05f9a2b.JPG',
          iconText: 'BEAUTY',
        };
      case 'Skincare & Haircare':
        return {
          title: 'Barrier Repair & Science',
          subtitle: 'Luminous Dewy Skin & Blowouts',
          image: '/assets/aistudio/IMG_2332_693554b4.jpg',
          iconText: 'SKINCARE',
        };
      case 'Fashion & Styling':
        return {
          title: 'Haute Couture & Draping',
          subtitle: 'Heritage Zari & Bridal Styling',
          image: '/assets/aistudio/IMG_000757_0_4444eba1.PNG',
          iconText: 'FASHION',
        };
      case 'Travel & Hotels':
        return {
          title: 'Experiential Escapes',
          subtitle: 'Resort Living & Lotus Waters',
          image: '/assets/aistudio/1CD2BD78-5F60-4824-BE87-D1E4B2CB0946_5909ad5f.PNG',
          iconText: 'TRAVEL',
        };
      case 'Luxury Lifestyle':
        return {
          title: 'Curated Evening Glam',
          subtitle: 'Festive Net Couture & Golden Details',
          image: '/assets/aistudio/IMG_154559_0_45a7af44.JPG',
          iconText: 'LIFESTYLE',
        };
      default:
        return {
          title: 'Cultural Perspectives',
          subtitle: 'Candid Opinions & Contemporary Styling',
          image: '/assets/aistudio/IMG_134026_0_3f8e8219.JPG',
          iconText: 'VLOGS',
        };
    }
  };

  const details = getCategoryDetails();

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-[#400849] flex flex-col justify-end p-5 select-none shadow-sm group ${className}`}>
      {/* Background Photograph */}
      <img
        src={details.image}
        alt={details.title}
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
      />

      {/* Measured Luxury Scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#400849] via-[#400849]/50 to-black/20" />

      {/* Badge */}
      <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-display font-semibold tracking-wider text-[#400849] shadow-xs">
        <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A0A]" />
        {details.iconText}
      </div>

      {/* Content */}
      <div className="relative z-10 text-white">
        <p className="font-display text-[11px] uppercase tracking-wider text-[#E7B0DE] font-semibold mb-1 drop-shadow-xs">
          {details.subtitle}
        </p>
        <h4 className="font-serif italic text-lg sm:text-xl text-white font-medium leading-snug drop-shadow-sm">
          {details.title}
        </h4>
      </div>
    </div>
  );
};
