import { jsPDF } from 'jspdf';
import { CreatorProfile, RateItem, PortfolioItem } from '../types';

interface GeneratePdfOptions {
  profile: CreatorProfile;
  rates: RateItem[];
  portfolio: PortfolioItem[];
  currency: 'INR' | 'USD';
}

export const generateMediaKitPdf = async ({
  profile,
  rates,
  portfolio,
  currency,
}: GeneratePdfOptions): Promise<void> => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;

  // Palette definitions
  const cEggplant = [64, 8, 73]; // #400849
  const cPink = [231, 176, 222]; // #E7B0DE
  const cOrange = [255, 90, 10]; // #FF5A0A
  const cIvory = [255, 249, 245]; // #FFF9F5
  const cLavender = [245, 232, 245]; // #F5E8F5
  const cMuted = [128, 103, 133]; // #806785
  const cBorder = [233, 221, 232]; // #E9DDE8
  const cWhite = [255, 255, 255];

  // Helper: draw header banner on top
  const drawPageHeader = (pageNumber: number, sectionLabel: string, sectionTitle: string) => {
    // Top background strip
    doc.setFillColor(cEggplant[0], cEggplant[1], cEggplant[2]);
    doc.rect(0, 0, pageWidth, 24, 'F');

    // Accent line
    doc.setFillColor(cOrange[0], cOrange[1], cOrange[2]);
    doc.rect(0, 24, pageWidth, 1.2, 'F');

    // Brand lockup
    doc.setTextColor(cWhite[0], cWhite[1], cWhite[2]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text('COUTUREFLOSS', margin, 12);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(cPink[0], cPink[1], cPink[2]);
    doc.text(`OFFICIAL MEDIA KIT 2026 · SHARMISTHA · ${profile.handle.toUpperCase()}`, margin, 18);

    // Section title right aligned
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(cOrange[0], cOrange[1], cOrange[2]);
    doc.text(sectionLabel.toUpperCase(), pageWidth - margin, 12, { align: 'right' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(cWhite[0], cWhite[1], cWhite[2]);
    doc.text(sectionTitle, pageWidth - margin, 18, { align: 'right' });
  };

  // Helper: draw footer on bottom
  const drawPageFooter = (pageNumber: number, totalPages: number) => {
    const y = pageHeight - 10;
    doc.setDrawColor(cBorder[0], cBorder[1], cBorder[2]);
    doc.setLineWidth(0.4);
    doc.line(margin, y - 2, pageWidth - margin, y - 2);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(cMuted[0], cMuted[1], cMuted[2]);
    doc.text(`Contact: ${profile.businessEmail} · Location: ${profile.location} · @couturefloss`, margin, y + 3);

    doc.text(`Page ${pageNumber} of ${totalPages}`, pageWidth - margin, y + 3, { align: 'right' });
  };

  // =========================================================================
  // PAGE 1: EDITORIAL COVER, CREATOR BIO & AUDIENCE DEMOGRAPHICS
  // =========================================================================
  drawPageHeader(1, '01. Editorial Profile', 'Audience Demographics & Brand Aesthetics');

  // Hero Card
  let curY = 32;
  doc.setFillColor(cIvory[0], cIvory[1], cIvory[2]);
  doc.setDrawColor(cBorder[0], cBorder[1], cBorder[2]);
  doc.roundedRect(margin, curY, contentWidth, 54, 4, 4, 'FD');

  // Accent badge
  doc.setFillColor(cEggplant[0], cEggplant[1], cEggplant[2]);
  doc.roundedRect(margin + 6, curY + 6, 44, 6, 2, 2, 'F');
  doc.setTextColor(cPink[0], cPink[1], cPink[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.text('CREATIVE DIRECTOR & CREATOR', margin + 8, curY + 10.5);

  doc.setTextColor(cEggplant[0], cEggplant[1], cEggplant[2]);
  doc.setFont('times', 'bolditalic');
  doc.setFontSize(22);
  doc.text('Sharmistha', margin + 6, curY + 23);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(cOrange[0], cOrange[1], cOrange[2]);
  doc.text('@couturefloss · Luxury Beauty, Fashion & Travel', margin + 6, curY + 28);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(cEggplant[0], cEggplant[1], cEggplant[2]);
  const bioLines = doc.splitTextToSize(
    'Bridging avant-garde runway aesthetics with wearable everyday glamour. Sharmistha curates high-concept beauty tutorials, capsule fashion styling, luxury hotel escapades, and candid cultural reflections for an intensely engaged cosmopolitan audience.',
    contentWidth - 12
  );
  doc.text(bioLines, margin + 6, curY + 34);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(cMuted[0], cMuted[1], cMuted[2]);
  doc.text(`Base: ${profile.location}  |  Email: ${profile.businessEmail}  |  Languages: English, Hindi, Bengali`, margin + 6, curY + 48);

  // Key Audience Statistics (4 Big Stat Cards)
  curY = 92;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(cEggplant[0], cEggplant[1], cEggplant[2]);
  doc.text('VERIFIED AUDIENCE PERFORMANCE & BASELINE METRICS', margin, curY);

  curY += 4;
  const statCardWidth = (contentWidth - 9) / 4;
  const statCards = [
    {
      label: 'Instagram Followers',
      value: profile.followersDisplay,
      sub: 'Verified Community',
      highlight: false,
    },
    {
      label: 'Avg Reel Views',
      value: profile.avgReelViewsDisplay,
      sub: 'Audited Meta Dashboard',
      highlight: true,
    },
    {
      label: 'Engagement Rate',
      value: `${profile.engagementRate}%`,
      sub: 'Verified Buyer Intent',
      highlight: false,
    },
    {
      label: 'Core Audience',
      value: '78%',
      sub: 'Women (Ages 22–38)',
      highlight: false,
    },
  ];

  statCards.forEach((card, idx) => {
    const x = margin + idx * (statCardWidth + 3);
    if (card.highlight) {
      doc.setFillColor(cEggplant[0], cEggplant[1], cEggplant[2]);
      doc.setDrawColor(cOrange[0], cOrange[1], cOrange[2]);
      doc.roundedRect(x, curY, statCardWidth, 30, 3, 3, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(6.5);
      doc.setTextColor(cPink[0], cPink[1], cPink[2]);
      doc.text(card.label.toUpperCase(), x + statCardWidth / 2, curY + 7, { align: 'center' });

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.setTextColor(cOrange[0], cOrange[1], cOrange[2]);
      doc.text(card.value, x + statCardWidth / 2, curY + 17, { align: 'center' });

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.5);
      doc.setTextColor(cWhite[0], cWhite[1], cWhite[2]);
      doc.text(card.sub, x + statCardWidth / 2, curY + 24, { align: 'center' });
    } else {
      doc.setFillColor(cWhite[0], cWhite[1], cWhite[2]);
      doc.setDrawColor(cBorder[0], cBorder[1], cBorder[2]);
      doc.roundedRect(x, curY, statCardWidth, 30, 3, 3, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(6.5);
      doc.setTextColor(cMuted[0], cMuted[1], cMuted[2]);
      doc.text(card.label.toUpperCase(), x + statCardWidth / 2, curY + 7, { align: 'center' });

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.setTextColor(cEggplant[0], cEggplant[1], cEggplant[2]);
      doc.text(card.value, x + statCardWidth / 2, curY + 17, { align: 'center' });

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.5);
      doc.setTextColor(cMuted[0], cMuted[1], cMuted[2]);
      doc.text(card.sub, x + statCardWidth / 2, curY + 24, { align: 'center' });
    }
  });

  // Audience Demographics & Geographies
  curY = 132;
  const halfColWidth = (contentWidth - 6) / 2;

  // Left Col: Demographics & Age
  doc.setFillColor(cWhite[0], cWhite[1], cWhite[2]);
  doc.setDrawColor(cBorder[0], cBorder[1], cBorder[2]);
  doc.roundedRect(margin, curY, halfColWidth, 68, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(cEggplant[0], cEggplant[1], cEggplant[2]);
  doc.text('Audience Age & Gender Cohorts', margin + 6, curY + 8);

  const demoItems = [
    { label: 'Women (Core Demographic)', pct: '78%' },
    { label: 'Age 22 – 28 (Young Professionals)', pct: '46%' },
    { label: 'Age 29 – 38 (Affluent Consumers)', pct: '32%' },
    { label: 'Men / Co-Ed Audience', pct: '22%' },
  ];

  let demoY = curY + 16;
  demoItems.forEach(item => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(cEggplant[0], cEggplant[1], cEggplant[2]);
    doc.text(item.label, margin + 6, demoY);
    doc.setFont('helvetica', 'bold');
    doc.text(item.pct, margin + halfColWidth - 6, demoY, { align: 'right' });

    // Bar
    const num = parseInt(item.pct);
    doc.setFillColor(cLavender[0], cLavender[1], cLavender[2]);
    doc.rect(margin + 6, demoY + 2, halfColWidth - 12, 2.5, 'F');
    doc.setFillColor(cEggplant[0], cEggplant[1], cEggplant[2]);
    doc.rect(margin + 6, demoY + 2, ((halfColWidth - 12) * num) / 100, 2.5, 'F');

    demoY += 12;
  });

  // Right Col: Geographic Reach & Buying Power
  doc.setFillColor(cWhite[0], cWhite[1], cWhite[2]);
  doc.setDrawColor(cBorder[0], cBorder[1], cBorder[2]);
  doc.roundedRect(margin + halfColWidth + 6, curY, halfColWidth, 68, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(cEggplant[0], cEggplant[1], cEggplant[2]);
  doc.text('Geographic Distribution & Buying Power', margin + halfColWidth + 12, curY + 8);

  const cityItems = [
    { city: 'Bengaluru (Tech, Luxury Lifestyle)', share: '34%' },
    { city: 'Mumbai (Fashion & Entertainment)', share: '28%' },
    { city: 'New Delhi / NCR (Weddings & Couture)', share: '22%' },
    { city: 'Kolkata (Festive & Heritage Glam)', share: '16%' },
  ];

  let cityY = curY + 16;
  cityItems.forEach(item => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(cEggplant[0], cEggplant[1], cEggplant[2]);
    doc.text(item.city, margin + halfColWidth + 12, cityY);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(cOrange[0], cOrange[1], cOrange[2]);
    doc.text(item.share, margin + halfColWidth * 2 - 6, cityY, { align: 'right' });

    // Bar
    const num = parseInt(item.share);
    doc.setFillColor(cLavender[0], cLavender[1], cLavender[2]);
    doc.rect(margin + halfColWidth + 12, cityY + 2, halfColWidth - 18, 2.5, 'F');
    doc.setFillColor(cOrange[0], cOrange[1], cOrange[2]);
    doc.rect(margin + halfColWidth + 12, cityY + 2, ((halfColWidth - 18) * num) / 100, 2.5, 'F');

    cityY += 12;
  });

  // Content Pillars Grid
  curY = 206;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(cEggplant[0], cEggplant[1], cEggplant[2]);
  doc.text('EDITORIAL PILLARS & CONTENT FOCUS', margin, curY);

  curY += 4;
  const pillarWidth = (contentWidth - 6) / 3;
  const pillars = [
    { title: 'Beauty & Makeup', desc: 'Runway glam, winged eyeliner masterclasses, festival shaaj.' },
    { title: 'Skincare & Haircare', desc: 'Barrier repair, anti-dandruff actives, honest ingredient testing.' },
    { title: 'Fashion & Styling', desc: 'Heritage zari sarees, modern capsule wardrobe, draping hacks.' },
    { title: 'Luxury Lifestyle', desc: 'Hauls, fine fragrances, cosmetic vanity curation, daily vlogs.' },
    { title: 'Travel & Hotels', desc: '5-star boutique resort stays, destination styling, villa walk-throughs.' },
    { title: 'Relatable Opinions', desc: 'Voiceover reflections, unboxing discussions, beauty consumer advice.' },
  ];

  pillars.forEach((p, idx) => {
    const row = Math.floor(idx / 3);
    const col = idx % 3;
    const px = margin + col * (pillarWidth + 3);
    const py = curY + row * 24;

    doc.setFillColor(cIvory[0], cIvory[1], cIvory[2]);
    doc.setDrawColor(cBorder[0], cBorder[1], cBorder[2]);
    doc.roundedRect(px, py, pillarWidth, 21, 2.5, 2.5, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(cEggplant[0], cEggplant[1], cEggplant[2]);
    doc.text(p.title, px + 4, py + 6.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.setTextColor(cMuted[0], cMuted[1], cMuted[2]);
    const pLines = doc.splitTextToSize(p.desc, pillarWidth - 8);
    doc.text(pLines, px + 4, py + 12);
  });

  drawPageFooter(1, 4);

  // =========================================================================
  // PAGE 2: HIGH-RETENTION CASE STUDIES & AUDITED META DASHBOARD PROOF
  // =========================================================================
  doc.addPage();
  drawPageHeader(2, '02. Proven Velocity', 'High-Retention Case Studies & Meta Insights Proof');

  curY = 32;
  // Banner: 100% Authentic Feed Records
  doc.setFillColor(cEggplant[0], cEggplant[1], cEggplant[2]);
  doc.roundedRect(margin, curY, contentWidth, 12, 3, 3, 'F');
  doc.setTextColor(cWhite[0], cWhite[1], cWhite[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('AUDITED META PROFESSIONAL DASHBOARD CASE STUDIES', margin + 6, curY + 7.5);
  doc.setTextColor(cPink[0], cPink[1], cPink[2]);
  doc.setFont('helvetica', 'normal');
  doc.text('Exact statistics extracted directly from published feed records & internal dashboard screenshots', pageWidth - margin - 6, curY + 7.5, { align: 'right' });

  curY += 16;
  // Audited Reel 1: Multi-Use Lip & Cheek Tint
  doc.setFillColor(cWhite[0], cWhite[1], cWhite[2]);
  doc.setDrawColor(cOrange[0], cOrange[1], cOrange[2]);
  doc.setLineWidth(0.8);
  doc.roundedRect(margin, curY, contentWidth, 54, 4, 4, 'FD');
  doc.setLineWidth(0.4);

  doc.setFillColor(cOrange[0], cOrange[1], cOrange[2]);
  doc.roundedRect(margin + 6, curY + 6, 42, 5, 1.5, 1.5, 'F');
  doc.setTextColor(cWhite[0], cWhite[1], cWhite[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.text('META INSIGHTS AUDITED PROOF', margin + 8, curY + 9.5);

  doc.setTextColor(cEggplant[0], cEggplant[1], cEggplant[2]);
  doc.setFont('times', 'bolditalic');
  doc.setFontSize(13);
  doc.text('Multi-Use Lip & Cheek Tint: Natural Clean Girl Dew', margin + 6, curY + 17);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(cMuted[0], cMuted[1], cMuted[2]);
  doc.text('Instagram Shortcode: instagram.com/p/DdanYxVoiBI/  |  Category: Beauty & Makeup', margin + 6, curY + 22);

  // 5 Stat Pills
  const tintStats = [
    { label: 'Total Views', val: '66,469' },
    { label: 'Reach', val: '465' },
    { label: 'Likes', val: '1,781' },
    { label: 'Saves (Bookmarks)', val: '1,200' },
    { label: 'Shares', val: '1,141' },
  ];
  const tintBoxW = (contentWidth - 24) / 5;
  tintStats.forEach((st, i) => {
    const bx = margin + 6 + i * (tintBoxW + 3);
    doc.setFillColor(cIvory[0], cIvory[1], cIvory[2]);
    doc.setDrawColor(cBorder[0], cBorder[1], cBorder[2]);
    doc.roundedRect(bx, curY + 26, tintBoxW, 14, 2, 2, 'FD');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6);
    doc.setTextColor(cMuted[0], cMuted[1], cMuted[2]);
    doc.text(st.label, bx + tintBoxW / 2, curY + 31, { align: 'center' });

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(cEggplant[0], cEggplant[1], cEggplant[2]);
    doc.text(st.val, bx + tintBoxW / 2, curY + 37, { align: 'center' });
  });

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7.2);
  doc.setTextColor(cEggplant[0], cEggplant[1], cEggplant[2]);
  doc.text('“Comment tint for link 💕 Multi-use lip tint & blush review for daily natural glow.” — 123 verified comments & 4,550 total interactions (6.84% Eng. Rate)', margin + 6, curY + 47);

  curY += 58;
  // Audited Reel 2: Scalp Care Ritual (1% Selenium Sulfide)
  doc.setFillColor(cWhite[0], cWhite[1], cWhite[2]);
  doc.setDrawColor(cEggplant[0], cEggplant[1], cEggplant[2]);
  doc.setLineWidth(0.8);
  doc.roundedRect(margin, curY, contentWidth, 54, 4, 4, 'FD');
  doc.setLineWidth(0.4);

  doc.setFillColor(cEggplant[0], cEggplant[1], cEggplant[2]);
  doc.roundedRect(margin + 6, curY + 6, 42, 5, 1.5, 1.5, 'F');
  doc.setTextColor(cPink[0], cPink[1], cPink[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.text('META INSIGHTS AUDITED PROOF', margin + 8, curY + 9.5);

  doc.setTextColor(cEggplant[0], cEggplant[1], cEggplant[2]);
  doc.setFont('times', 'bolditalic');
  doc.setFontSize(13);
  doc.text('Scalp Care Ritual: 1% Selenium Sulfide Anti-Dandruff Routine', margin + 6, curY + 17);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(cMuted[0], cMuted[1], cMuted[2]);
  doc.text('Instagram Shortcode: instagram.com/p/De8lwj1xC2I/  |  Category: Skincare & Haircare', margin + 6, curY + 22);

  // 5 Stat Pills
  const scalpStats = [
    { label: 'Total Views', val: '67,590' },
    { label: 'Unique Viewers (Reach)', val: '14,649' },
    { label: 'Likes', val: '1,947' },
    { label: 'Non-Follower Reach', val: '73.5%' },
    { label: 'Explore Interactions', val: '99.8%' },
  ];
  scalpStats.forEach((st, i) => {
    const bx = margin + 6 + i * (tintBoxW + 3);
    doc.setFillColor(cLavender[0], cLavender[1], cLavender[2]);
    doc.setDrawColor(cBorder[0], cBorder[1], cBorder[2]);
    doc.roundedRect(bx, curY + 26, tintBoxW, 14, 2, 2, 'FD');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6);
    doc.setTextColor(cMuted[0], cMuted[1], cMuted[2]);
    doc.text(st.label, bx + tintBoxW / 2, curY + 31, { align: 'center' });

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(cOrange[0], cOrange[1], cOrange[2]);
    doc.text(st.val, bx + tintBoxW / 2, curY + 37, { align: 'center' });
  });

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7.2);
  doc.setTextColor(cEggplant[0], cEggplant[1], cEggplant[2]);
  doc.text('“Making scalp care a part of my haircare routine with 1% Selenium Sulfide.” — 4,417 total interactions (6.53% Eng. Rate) with massive Explore page virality.', margin + 6, curY + 47);

  // Additional Reel Highlights Grid (4 reels)
  curY += 58;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(cEggplant[0], cEggplant[1], cEggplant[2]);
  doc.text('ADDITIONAL VIRAL REEL BENCHMARKS & CAMPAIGN CASE STUDIES', margin, curY);

  curY += 4;
  const gridCaseW = (contentWidth - 6) / 2;
  const extraCases = [
    {
      title: 'Aqualogica Sugar Baddie Body Mist',
      code: 'DfFFDs6P2Zj',
      views: '78,500 Views',
      reach: '4,867 Likes (7.4% Eng)',
      summary: 'Gourmand marshmallow fragrance feature with 4,867 verified likes & "Comment PINK" DM sales conversion.',
    },
    {
      title: 'Lotus Herbals Safe Sun SPF 50+',
      code: 'DfEEcfQNzMy',
      views: '84,200 Views',
      reach: '68,500 Reach',
      summary: 'HydroActivated sun care routine highlighting sweat/water resistance and outdoor active protection.',
    },
    {
      title: 'Navratri Ethnic Makeover & Transformation',
      code: 'DetlEPTPbV4',
      views: '98,400 Views',
      reach: '78,900 Reach',
      summary: 'Viral festive glam transition ranking on trending audio with over 32,000 saves and high bookmarks.',
    },
    {
      title: 'WishCare Multi-Peptide Anti-Hairfall',
      code: 'De37DW3P-wD',
      views: '91,500 Views',
      reach: '74,600 Reach',
      summary: 'Scientific routine review with 92+ active comments inquiring about ingredient safety and product links.',
    },
  ];

  extraCases.forEach((cs, i) => {
    const rx = margin + (i % 2) * (gridCaseW + 6);
    const ry = curY + Math.floor(i / 2) * 26;

    doc.setFillColor(cWhite[0], cWhite[1], cWhite[2]);
    doc.setDrawColor(cBorder[0], cBorder[1], cBorder[2]);
    doc.roundedRect(rx, ry, gridCaseW, 23, 2.5, 2.5, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(cEggplant[0], cEggplant[1], cEggplant[2]);
    doc.text(cs.title, rx + 4, ry + 6);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(cOrange[0], cOrange[1], cOrange[2]);
    doc.text(`${cs.views}  ·  ${cs.reach}`, rx + 4, ry + 11.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.setTextColor(cMuted[0], cMuted[1], cMuted[2]);
    const lines = doc.splitTextToSize(cs.summary, gridCaseW - 8);
    doc.text(lines, rx + 4, ry + 16.5);
  });

  // Collaborator Brand Tags Banner
  curY = 222;
  doc.setFillColor(cIvory[0], cIvory[1], cIvory[2]);
  doc.setDrawColor(cBorder[0], cBorder[1], cBorder[2]);
  doc.roundedRect(margin, curY, contentWidth, 36, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(cEggplant[0], cEggplant[1], cEggplant[2]);
  doc.text('TRUSTED BY PREMIER BEAUTY & LUXURY LABELS', margin + 6, curY + 7);

  const brandList = [
    'Aqualogica', 'Lotus Herbals', 'Blue Heaven', 'WishCare',
    'Myntra Beauty', 'Estée Lauder', 'The Oberoi Hotels', 'Charlotte Tilbury',
    'Dyson', 'Raw Mango', 'Kama Ayurveda', 'Taj Hotels'
  ];

  const bColW = (contentWidth - 12) / 4;
  brandList.forEach((b, i) => {
    const bx = margin + 6 + (i % 4) * bColW;
    const by = curY + 12 + Math.floor(i / 4) * 7.5;
    doc.setFont('times', 'bolditalic');
    doc.setFontSize(8.5);
    doc.setTextColor(cEggplant[0], cEggplant[1], cEggplant[2]);
    doc.text(`• ${b}`, bx, by);
  });

  drawPageFooter(2, 4);

  // =========================================================================
  // PAGE 3: COMMERCIAL RATE CARD (WISHLINK / CREATOR BENCHMARK 2026 STANDARD)
  // =========================================================================
  doc.addPage();
  drawPageHeader(3, '03. Commercial Schedule', 'Indian Creator Rate Card & Deliverables Benchmark');

  curY = 32;
  // Intro banner noting alignment with Creator Economy 2026 benchmark
  doc.setFillColor(cIvory[0], cIvory[1], cIvory[2]);
  doc.setDrawColor(cBorder[0], cBorder[1], cBorder[2]);
  doc.roundedRect(margin, curY, contentWidth, 14, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(cEggplant[0], cEggplant[1], cEggplant[2]);
  doc.text('ALIGNED WITH INDIAN CREATOR COMMERCIAL RATE BENCHMARK (2026 STANDARD)', margin + 6, curY + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(cMuted[0], cMuted[1], cMuted[2]);
  doc.text('Deliverables priced according to Micro Tier (10K–100K) market standards, with high-velocity 4K HDR production values.', margin + 6, curY + 10.5);

  curY += 18;
  // Deliverable Schedule Table Header
  doc.setFillColor(cEggplant[0], cEggplant[1], cEggplant[2]);
  doc.rect(margin, curY, contentWidth, 8, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(cWhite[0], cWhite[1], cWhite[2]);
  doc.text('DELIVERABLE TYPE & SPECIFICATION', margin + 4, curY + 5.5);
  doc.text('BENCHMARK RANGE', margin + 98, curY + 5.5);
  doc.text('TURNAROUND', margin + 138, curY + 5.5);
  doc.text('BASE FEE (INR / USD)', pageWidth - margin - 4, curY + 5.5, { align: 'right' });

  curY += 8;
  // Rate items
  rates.forEach((rate, idx) => {
    const isEven = idx % 2 === 0;
    doc.setFillColor(isEven ? cWhite[0] : cIvory[0], isEven ? cWhite[1] : cIvory[1], isEven ? cWhite[2] : cIvory[2]);
    doc.rect(margin, curY, contentWidth, 15, 'F');
    doc.setDrawColor(cBorder[0], cBorder[1], cBorder[2]);
    doc.line(margin, curY + 15, pageWidth - margin, curY + 15);

    // Title & desc
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(cEggplant[0], cEggplant[1], cEggplant[2]);
    doc.text(rate.title, margin + 4, curY + 5.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(cMuted[0], cMuted[1], cMuted[2]);
    const descTrim = rate.description.length > 70 ? `${rate.description.slice(0, 68)}...` : rate.description;
    doc.text(descTrim, margin + 4, curY + 10.5);

    // Benchmark Range
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(cMuted[0], cMuted[1], cMuted[2]);
    const benchmarkNote =
      rate.category === 'Video' ? '₹10k – ₹60k (Micro Avg)' :
      rate.category === 'Stories' ? '₹5k – ₹18k (2-3 slides)' :
      rate.category === 'Static' ? '₹8k – ₹35k (Carousel)' :
      rate.category === 'UGC' ? '₹6k – ₹15k (License Only)' :
      rate.category === 'Usage Rights' ? '+30% to +50% Surcharge' :
      'Contract Multiplier';
    doc.text(benchmarkNote, margin + 98, curY + 8);

    // Turnaround
    doc.text(`${rate.turnaroundDays} working days`, margin + 138, curY + 8);

    // Price
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(cOrange[0], cOrange[1], cOrange[2]);
    doc.text(`₹${rate.basePriceINR.toLocaleString()} / $${rate.basePriceUSD.toLocaleString()}`, pageWidth - margin - 4, curY + 8, { align: 'right' });

    curY += 15;
  });

  // Commercial Add-Ons & Usage Rights Multipliers Box (From Page 2 of user's PDF)
  curY += 6;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(cEggplant[0], cEggplant[1], cEggplant[2]);
  doc.text('COMMERCIAL ADD-ONS & USAGE RIGHTS MULTIPLIERS (2026 BENCHMARK)', margin, curY);

  curY += 4;
  const addOnCols = [
    {
      title: 'Paid Ad Whitelisting',
      rate: '+30% to +50%',
      desc: 'Required for Meta Partnership Ads / dark ads via creator handle. Charged per 30-day active cycle.',
    },
    {
      title: 'Category Exclusivity',
      rate: '+25% to +60%',
      desc: 'Lock-out preventing creator from working with competing brands. 30 days (+35%); quarterly (+50%+).',
    },
    {
      title: 'Skincare Niche Multiplier',
      rate: '1.3x to 1.5x',
      desc: 'High-conversion and compliance-heavy sectors trade at premium valuation due to ingredient education.',
    },
    {
      title: 'Rush Turnaround (< 5 Days)',
      rate: '+25% to +40%',
      desc: 'Expedited production under 5 working days demands 30%+ fee. Includes priority studio scheduling.',
    },
  ];

  const addOnW = (contentWidth - 9) / 4;
  addOnCols.forEach((ao, idx) => {
    const ax = margin + idx * (addOnW + 3);
    doc.setFillColor(cWhite[0], cWhite[1], cWhite[2]);
    doc.setDrawColor(cBorder[0], cBorder[1], cBorder[2]);
    doc.roundedRect(ax, curY, addOnW, 36, 2.5, 2.5, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(cEggplant[0], cEggplant[1], cEggplant[2]);
    doc.text(ao.title, ax + 3, curY + 6);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(cOrange[0], cOrange[1], cOrange[2]);
    doc.text(ao.rate, ax + 3, curY + 13);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(cMuted[0], cMuted[1], cMuted[2]);
    const aoLines = doc.splitTextToSize(ao.desc, addOnW - 6);
    doc.text(aoLines, ax + 3, curY + 18.5);
  });

  drawPageFooter(3, 4);

  // =========================================================================
  // PAGE 4: STATUTORY COMPLIANCE, TAX DEDUCTIONS & CAMPAIGN BOOKING
  // =========================================================================
  doc.addPage();
  drawPageHeader(4, '04. Statutory Terms', 'Tax Deductions, ASCI Mandates & Reservations');

  curY = 32;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(cEggplant[0], cEggplant[1], cEggplant[2]);
  doc.text('STATUTORY COMPLIANCE & TAX DEDUCTIONS IN INDIA', margin, curY);

  curY += 4;
  // Statutory Compliance Table (From Page 2 of user's PDF)
  doc.setFillColor(cEggplant[0], cEggplant[1], cEggplant[2]);
  doc.rect(margin, curY, contentWidth, 7.5, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(cWhite[0], cWhite[1], cWhite[2]);
  doc.text('COMPLIANCE CLAUSE', margin + 4, curY + 5.2);
  doc.text('REGULATORY STANDARD', margin + 56, curY + 5.2);
  doc.text('CONTRACTUAL IMPLEMENTATION', margin + 118, curY + 5.2);

  curY += 7.5;
  const statutoryRows = [
    {
      clause: 'Goods & Services Tax (GST)',
      standard: '18% Service GST applicable once revenue exceeds ₹20 Lakhs p.a.',
      impl: 'Must be levied in addition to quoted base pricing. Invoices require valid GSTIN.',
    },
    {
      clause: 'TDS u/s 194J (Technical / Creative)',
      standard: '10% withholding tax on fees for technical & creative professional services.',
      impl: 'Deducted directly by enterprise brand/agency prior to net balance disbursement.',
    },
    {
      clause: 'TDS u/s 194C (Contract)',
      standard: '1% to 2% withholding if classified as pure media production contract.',
      impl: 'Requires structured work-order terminology defining material production.',
    },
    {
      clause: 'ASCI Disclosure Mandate',
      standard: 'Mandatory #Ad, #Collab, or #Sponsored label in initial 2 lines / overlay.',
      impl: 'Non-negotiable statutory requirement per Consumer Protection Council rules.',
    },
  ];

  statutoryRows.forEach((row, idx) => {
    const isEven = idx % 2 === 0;
    doc.setFillColor(isEven ? cWhite[0] : cIvory[0], isEven ? cWhite[1] : cIvory[1], isEven ? cWhite[2] : cIvory[2]);
    doc.rect(margin, curY, contentWidth, 16, 'F');
    doc.setDrawColor(cBorder[0], cBorder[1], cBorder[2]);
    doc.line(margin, curY + 16, pageWidth - margin, curY + 16);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(cEggplant[0], cEggplant[1], cEggplant[2]);
    doc.text(row.clause, margin + 4, curY + 6);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.setTextColor(cMuted[0], cMuted[1], cMuted[2]);
    const stdLines = doc.splitTextToSize(row.standard, 58);
    doc.text(stdLines, margin + 56, curY + 5.5);

    const implLines = doc.splitTextToSize(row.impl, contentWidth - 122);
    doc.text(implLines, margin + 118, curY + 5.5);

    curY += 16;
  });

  // Commercial Contracting Terms (Tip from user's PDF)
  curY += 6;
  doc.setFillColor(cIvory[0], cIvory[1], cIvory[2]);
  doc.setDrawColor(cOrange[0], cOrange[1], cOrange[2]);
  doc.setLineWidth(0.6);
  doc.roundedRect(margin, curY, contentWidth, 24, 3, 3, 'FD');
  doc.setLineWidth(0.4);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(cOrange[0], cOrange[1], cOrange[2]);
  doc.text('COMMERCIAL CONTRACTING STANDARDS & PAYMENT TERMS', margin + 6, curY + 6.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(cEggplant[0], cEggplant[1], cEggplant[2]);
  const termsText = [
    '• Payment Window: Standard industry cycle is 30–45 days post-live confirmation upon delivery of invoice & PAN/GST details.',
    '• Work Orders: All partnerships executed under formal work orders detailing draft approval windows & usage rights scope.',
    '• Review Iterations: Base contracts include 1–2 draft review iterations. Substantive script reversals incur standard review fees.',
    '• Rights & Buyouts: Organic rates cover creator profile posting. Perpetual broadcast rights require upfront buyout compensation.',
  ];
  termsText.forEach((t, i) => {
    doc.text(t, margin + 6, curY + 11 + i * 3.6);
  });

  // Direct Booking & Contact Section
  curY += 32;
  doc.setFillColor(cEggplant[0], cEggplant[1], cEggplant[2]);
  doc.roundedRect(margin, curY, contentWidth, 54, 4, 4, 'F');

  doc.setTextColor(cOrange[0], cOrange[1], cOrange[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('RESERVATIONS & BRAND MANAGEMENT', margin + 8, curY + 10);

  doc.setFont('times', 'bolditalic');
  doc.setFontSize(18);
  doc.setTextColor(cWhite[0], cWhite[1], cWhite[2]);
  doc.text('Let’s create something iconic together.', margin + 8, curY + 20);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(cPink[0], cPink[1], cPink[2]);
  doc.text('Now reserving seasonal campaigns, festive edits, and long-term brand partnerships for 2026.', margin + 8, curY + 26);

  // 3 Contact detail blocks
  const contactBlocks = [
    { label: 'PR & Collaborations', val: profile.businessEmail },
    { label: 'Instagram Profile', val: `${profile.handle} (34K+ reach)` },
    { label: 'Studio Base', val: 'Bengaluru, KA, India' },
  ];
  const cbW = (contentWidth - 20) / 3;
  contactBlocks.forEach((cb, idx) => {
    const cx = margin + 8 + idx * (cbW + 2);
    doc.setFillColor(255, 255, 255, 0.1);
    doc.roundedRect(cx, curY + 32, cbW, 14, 2, 2, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(cPink[0], cPink[1], cPink[2]);
    doc.text(cb.label.toUpperCase(), cx + 3, curY + 37);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(cWhite[0], cWhite[1], cWhite[2]);
    doc.text(cb.val, cx + 3, curY + 43);
  });

  drawPageFooter(4, 4);

  // Save PDF directly to user's downloads!
  const fileName = `COUTUREFLOSS_Media_Kit_Sharmistha_2026.pdf`;
  doc.save(fileName);
};
