import { useState, useRef, useEffect, useCallback } from 'react';
import { liveCampaigns } from '../liveCampaignsData.js';

/* ── helper: parse "2 Reels" → { count: "2", type: "Reels" } ── */
function parseDel(str) {
  const m = str.match(/^(\d+)\s+(.+)$/);
  return m ? { count: m[1], type: m[2] } : { count: '', type: str };
}

/* ── deliverable icon by keyword ── */
function DelIcon({ type, color }) {
  const t = type.toLowerCase();
  if (t.includes('reel'))
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="5" width="14" height="14" rx="2.5" stroke={color} strokeWidth="1.3" />
        <path d="M16 10 L22 7.5 L22 16.5 L16 14" stroke={color} strokeWidth="1.3" strokeLinejoin="round" />
        <circle cx="9" cy="12" r="2" fill={color} opacity="0.35" />
      </svg>
    );
  if (t.includes('stor'))
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="5" y="2" width="14" height="20" rx="3" stroke={color} strokeWidth="1.3" />
        <circle cx="12" cy="19.5" r="1" fill={color} opacity="0.4" />
        <rect x="8" y="6" width="8" height="1.5" rx="0.75" fill={color} opacity="0.5" />
        <rect x="8" y="9" width="5" height="1.5" rx="0.75" fill={color} opacity="0.3" />
        <rect x="8" y="12" width="8" height="4" rx="1" stroke={color} strokeWidth="0.9" opacity="0.4" />
      </svg>
    );
  if (t.includes('carousel'))
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="5" width="7" height="14" rx="2" stroke={color} strokeWidth="1.3" />
        <rect x="11" y="5" width="11" height="6" rx="2" stroke={color} strokeWidth="1.3" />
        <rect x="11" y="13" width="11" height="6" rx="2" stroke={color} strokeWidth="1.3" opacity="0.45" />
      </svg>
    );
  if (t.includes('post'))
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="3" stroke={color} strokeWidth="1.3" />
        <path d="M3 15 L8 11 L12 14 L17 9 L21 13" stroke={color} strokeWidth="1.2" strokeLinejoin="round" fill="none" />
        <circle cx="8.5" cy="8.5" r="2" fill={color} opacity="0.35" />
      </svg>
    );
  if (t.includes('blog'))
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="2" width="18" height="20" rx="3" stroke={color} strokeWidth="1.3" />
        <line x1="7" y1="7" x2="17" y2="7" stroke={color} strokeWidth="1.2" opacity="0.5" />
        <line x1="7" y1="10.5" x2="14" y2="10.5" stroke={color} strokeWidth="1.2" opacity="0.35" />
        <line x1="7" y1="14" x2="17" y2="14" stroke={color} strokeWidth="1.2" opacity="0.25" />
        <line x1="7" y1="17.5" x2="12" y2="17.5" stroke={color} strokeWidth="1.2" opacity="0.2" />
      </svg>
    );
  // fallback
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="3" stroke={color} strokeWidth="1.3" />
      <circle cx="12" cy="12" r="4" stroke={color} strokeWidth="1.2" opacity="0.4" />
    </svg>
  );
}

/* ── helper: lighten a hex color for dark-bg vibrancy ── */
function adjustColor(hex) {
  // If the color is very dark (like #1a1a1a), return a gold accent instead
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  if (brightness < 60) return '#F5A623'; // gold for very dark brands
  return hex;
}

const CARDS_VISIBLE = 3;

/* ── Single premium card ───────────────────────── */
function PremiumCard({ campaign }) {
  const accent = adjustColor(campaign.theme.primary);
  const accentDeep = adjustColor(campaign.theme.primaryDeep);
  const dels = campaign.deliverables.map(parseDel);

  return (
    <div className="pc-slide">
      <div className="pc-card" style={{ '--pc-accent': accent, '--pc-accent-deep': accentDeep }}>

        {/* ── Banner ── */}
        <div className="pc-banner">
          <div className="pc-banner-grid" style={{
            backgroundImage: `linear-gradient(${accent}0A 1px, transparent 1px), linear-gradient(90deg, ${accent}0A 1px, transparent 1px)`
          }} />
          <div className="pc-ghost">{campaign.brand.toUpperCase()}</div>

          <div className="pc-banner-top">
            <div className="pc-pay">{campaign.budget}</div>
            <div className="pc-hire-badge" style={{
              borderColor: campaign.badge === 'Hiring Now' || campaign.badge === 'Urgent'
                ? `${accent}50` : `${accent}30`
            }}>
              <span className="pc-hire-dot" style={{ background: accent }} />
              {campaign.badge === 'Hiring Now' ? 'Hiring' : campaign.badge}
            </div>
          </div>

          <div className="pc-brand-row">
            <div className="pc-brand-logo" style={{ borderColor: `${accent}25` }}>
              <img src={campaign.brandLogo} alt={campaign.brand} />
            </div>
            <div>
              <div className="pc-brand-name" style={{ color: `${accent}ee` }}>{campaign.brand.toUpperCase()}</div>
              <div className="pc-brand-sub">{campaign.niche}</div>
            </div>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="pc-body">
          <h3 className="pc-title">
            {campaign.role.split(' ').map((word, i) => {
              // Highlight key words with accent
              const highlights = ['content', 'creators', 'ambassadors', 'reviewers', 'hunters', 'campaign'];
              return highlights.some(h => word.toLowerCase().includes(h))
                ? <span key={i} style={{ color: accent }}>{word} </span>
                : <span key={i}>{word} </span>;
            })}
          </h3>

          <div className="pc-fit-row">
            <div className="pc-fit-icon" style={{ background: `${accent}12`, borderColor: `${accent}28` }}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="6.5" stroke={accent} strokeWidth="1.2" />
                <path d="M5 8.5 L7 10.5 L11 5.5" stroke={accent} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="pc-fit-text">
              <b style={{ color: `${accent}cc` }}>Best fit:</b> {campaign.fit}
            </p>
          </div>

          <div className="pc-section-label">What you'll deliver</div>
          <div className="pc-deliverables">
            {dels.map((d, i) => (
              <div className="pc-del" key={i} style={{ borderColor: `${accent}18` }}>
                <div className="pc-del-icon">
                  <DelIcon type={d.type} color={accent} />
                </div>
                <div className="pc-del-count" style={{ color: accent }}>{d.count}</div>
                <div className="pc-del-type">{d.type}</div>
              </div>
            ))}
          </div>

          <div className="pc-tags">
            <div className="pc-tag">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <path d="M8 2 C5.2 2 3 4.4 3 7.2 C3 10.8 8 14 8 14 C8 14 13 10.8 13 7.2 C13 4.4 10.8 2 8 2Z" stroke="#5a5040" strokeWidth="1.2" fill="none" />
                <circle cx="8" cy="7" r="1.8" fill="#5a5040" opacity="0.7" />
              </svg>
              {campaign.location}
            </div>
            <div className="pc-tag">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="5.5" stroke="#5a5040" strokeWidth="1.2" />
                <path d="M8 5 L8 8.5 L10.5 10" stroke="#5a5040" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {campaign.timeline}
            </div>
            <div className="pc-tag">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <path d="M3 5 C3 3.9 3.9 3 5 3 L11 3 C12.1 3 13 3.9 13 5 L13 11 C13 12.1 12.1 13 11 13 L5 13 C3.9 13 3 12.1 3 11 Z" stroke="#5a5040" strokeWidth="1.1" fill="none" />
                <path d="M6 7 C6 5.9 6.9 5 8 5 C9.1 5 10 5.9 10 7 C10 8.6 8 10 8 10 C8 10 6 8.6 6 7Z" fill="#5a5040" opacity="0.6" />
              </svg>
              {campaign.niche}
            </div>
          </div>

          <div className="pc-divider" />

          <div className="pc-cta">
            <a className="pc-btn-primary" href="#signup" style={{ background: `linear-gradient(135deg, ${accent}, ${accentDeep})` }}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8 L13 8 M9 4 L13 8 L9 12" stroke="#0f0900" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Hire Creators
            </a>
            <a className="pc-btn-secondary" href="#top">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.3" />
                <path d="M10.5 10.5 L13.5 13.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              View Matches
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main component ────────────────────────────── */
export default function PremiumCampaigns() {
  const [currentIndex, setCurrentIndex] = useState(CARDS_VISIBLE);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoPlayRef = useRef(null);
  const totalReal = liveCampaigns.length;

  // Clone for infinite scroll
  const cloned = [
    ...liveCampaigns.slice(-CARDS_VISIBLE),
    ...liveCampaigns,
    ...liveCampaigns.slice(0, CARDS_VISIBLE),
  ];

  const handleTransitionEnd = useCallback(() => {
    setIsTransitioning(false);
    if (currentIndex >= totalReal + CARDS_VISIBLE) {
      setCurrentIndex(CARDS_VISIBLE);
    }
    if (currentIndex <= CARDS_VISIBLE - 1) {
      setCurrentIndex(totalReal);
    }
  }, [currentIndex, totalReal]);

  const goNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => prev + 1);
  }, [isTransitioning]);

  const goPrev = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => prev - 1);
  }, [isTransitioning]);

  // Auto-play
  useEffect(() => {
    autoPlayRef.current = setInterval(goNext, 4000);
    return () => clearInterval(autoPlayRef.current);
  }, [goNext]);

  const pauseAuto = () => clearInterval(autoPlayRef.current);
  const resumeAuto = () => {
    clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(goNext, 4000);
  };

  // Dot calculation
  let realIdx = currentIndex - CARDS_VISIBLE;
  if (realIdx < 0) realIdx = totalReal - 1;
  if (realIdx >= totalReal) realIdx = 0;
  const totalPages = Math.ceil(totalReal / CARDS_VISIBLE);
  const activePage = Math.floor(realIdx / CARDS_VISIBLE) % totalPages;

  const goToPage = (page) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(CARDS_VISIBLE + page * CARDS_VISIBLE);
  };

  const slideW = 100 / CARDS_VISIBLE;
  const tx = -(currentIndex * slideW);

  return (
    <section className="section pc-section" id="premium-campaigns">
      <div className="container">

        {/* Header */}
        <div className="pc-header" data-reveal>
          <div className="pc-header-left">
            <div className="pc-eyebrow">
              <span className="pc-eyebrow-diamond">◆</span>
              <span className="pc-eyebrow-text">Premium Campaigns</span>
              <span className="pc-eyebrow-diamond">◆</span>
            </div>
            <h2 className="pc-heading">Exclusive brand collaborations</h2>
            <p className="pc-subheading">
              Hand-picked campaigns from India's most prestigious brands — premium budgets, high-impact deliverables.
            </p>
          </div>
          <div className="pc-header-right">
            <div className="pc-live-count">
              <span className="pc-live-num">{liveCampaigns.length}</span>
              <span className="pc-live-label">Live Now</span>
            </div>
          </div>
        </div>

        {/* Slider */}
        <div
          className="pc-slider"
          data-reveal
          onMouseEnter={pauseAuto}
          onMouseLeave={resumeAuto}
        >
          <button className="pc-arrow pc-arrow-left" onClick={goPrev} aria-label="Previous">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3 L5 8 L10 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button className="pc-arrow pc-arrow-right" onClick={goNext} aria-label="Next">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 3 L11 8 L6 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="pc-viewport">
            <div className="pc-blur-left" />
            <div className="pc-blur-right" />

            <div
              className="pc-track"
              style={{
                transform: `translateX(${tx}%)`,
                transition: isTransitioning ? 'transform 0.6s cubic-bezier(0.4,0,0.2,1)' : 'none',
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {cloned.map((c, i) => (
                <PremiumCard key={`${c.brand}-${i}`} campaign={c} index={i} />
              ))}
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="pc-dots">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              className={`pc-dot ${i === activePage ? 'pc-dot--active' : ''}`}
              onClick={() => goToPage(i)}
              aria-label={`Go to page ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
