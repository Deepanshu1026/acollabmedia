import { useState, useRef, useEffect, useCallback } from 'react';
import { liveCampaigns } from '../liveCampaignsData.js';

/* ── Decorative SVG elements ───────────────────── */
function FloatingRing({ color, size = 48, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={`lc-deco ${className}`}>
      <circle cx="24" cy="24" r="20" stroke={color} strokeWidth="1.5" opacity="0.18" />
    </svg>
  );
}

function DotCluster({ color, className = '' }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className={`lc-deco ${className}`}>
      <circle cx="4" cy="4" r="2" fill={color} opacity="0.2" />
      <circle cx="16" cy="4" r="2" fill={color} opacity="0.12" />
      <circle cx="28" cy="4" r="2" fill={color} opacity="0.08" />
      <circle cx="4" cy="16" r="2" fill={color} opacity="0.12" />
      <circle cx="16" cy="16" r="2" fill={color} opacity="0.25" />
      <circle cx="28" cy="16" r="2" fill={color} opacity="0.15" />
      <circle cx="4" cy="28" r="2" fill={color} opacity="0.08" />
      <circle cx="16" cy="28" r="2" fill={color} opacity="0.12" />
      <circle cx="28" cy="28" r="2" fill={color} opacity="0.2" />
    </svg>
  );
}

function PlusMark({ color, className = '' }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={`lc-deco ${className}`}>
      <line x1="8" y1="2" x2="8" y2="14" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.2" />
      <line x1="2" y1="8" x2="14" y2="8" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.2" />
    </svg>
  );
}

function Diamond({ color, className = '' }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={`lc-deco ${className}`}>
      <rect x="7" y="0.5" width="9" height="9" rx="2" transform="rotate(45 7 0.5)" stroke={color} strokeWidth="1.2" opacity="0.18" />
    </svg>
  );
}

function GradientOrb({ color, size = 80, className = '' }) {
  return (
    <div
      className={`lc-deco lc-orb ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color}20 0%, ${color}08 40%, transparent 70%)`,
      }}
    />
  );
}

/* ── Urgency level mapping ─────────────────────── */
const urgencyOrder = { 'Hiring Now': 3, 'Urgent': 2, 'Open': 1 };

/* ── Deco layouts (cycle through for each card) ── */
const decoLayouts = [
  (c) => (<><GradientOrb color={c} size={100} className="lc-deco-tl" /><FloatingRing color={c} size={56} className="lc-deco-tr" /><DotCluster color={c} className="lc-deco-bl" /><PlusMark color={c} className="lc-deco-mid-r" /></>),
  (c) => (<><FloatingRing color={c} size={44} className="lc-deco-tl2" /><GradientOrb color={c} size={90} className="lc-deco-br2" /><PlusMark color={c} className="lc-deco-tl" /><DotCluster color={c} className="lc-deco-tr2" /></>),
  (c) => (<><GradientOrb color={c} size={110} className="lc-deco-br3" /><Diamond color={c} className="lc-deco-tl3" /><PlusMark color={c} className="lc-deco-mid-l" /><DotCluster color={c} className="lc-deco-tr3" /></>),
];

const CARDS_PER_VIEW = 3;

/* ── Render a single campaign card ─────────────── */
function CampaignCard({ campaign, index }) {
  const { theme } = campaign;
  const urgency = urgencyOrder[campaign.badge] || 1;
  const renderDecos = decoLayouts[index % decoLayouts.length];

  return (
    <div className="lc-slide">
      <div className="lc-card-wrap">
        <div className="lc-deco-layer">
          {renderDecos(theme.primary)}
        </div>

        <article className="lc-card">
          <div
            className="lc-card-accent"
            style={{ background: `linear-gradient(90deg, ${theme.primary}, ${theme.primaryDeep})` }}
          />
          <div className="lc-card-body">
            <div className="lc-card-top">
              <div className="lc-status" style={{ color: theme.badgeColor }}>
                <span className="lc-status-dot" style={{ background: theme.liveIndicator }} />
                {campaign.badge}
                {urgency >= 3 && <span className="lc-status-urgency">●</span>}
              </div>
              <div className="lc-budget">{campaign.budget}</div>
            </div>

            <div className="lc-brand-row">
              <div className="lc-brand-icon">
                <img src={campaign.brandLogo} alt={campaign.brand} className="lc-brand-logo" />
              </div>
              <div className="lc-brand-info">
                <span className="lc-brand-name" style={{ color: theme.accentText }}>{campaign.brand}</span>
                <h3 className="lc-role">{campaign.role}</h3>
              </div>
            </div>

            <div className="lc-divider" style={{ background: theme.cardBorder }} />

            <div className="lc-fit">
              <div className="lc-fit-header">
                <i className="fas fa-crosshairs" style={{ color: theme.primary, fontSize: '0.7rem' }} />
                <span className="lc-fit-label" style={{ color: theme.accentText }}>Best Fit</span>
              </div>
              <p className="lc-fit-text">{campaign.fit}</p>
            </div>

            <div className="lc-meta">
              <span className="lc-meta-tag">
                <i className="fas fa-layer-group" style={{ color: theme.primary }} />
                {campaign.niche}
              </span>
              <span className="lc-meta-tag">
                <i className="fas fa-location-dot" style={{ color: theme.primary }} />
                {campaign.location}
              </span>
              <span className="lc-meta-tag">
                <i className="fas fa-clock" style={{ color: theme.primary }} />
                {campaign.timeline}
              </span>
            </div>

            <div className="lc-deliverables">
              <span className="lc-deliverables-label">Deliverables</span>
              <div className="lc-deliverables-list">
                {campaign.deliverables.map(item => (
                  <span key={item} className="lc-del-chip" style={{ border: `1px solid ${theme.cardBorder}`, color: theme.accentText }}>{item}</span>
                ))}
              </div>
            </div>

            <div className="lc-actions">
              <a className="lc-btn-primary" href="#signup" style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDeep})` }}>
                Hire Creators <i className="fas fa-arrow-right" />
              </a>
              <a className="lc-btn-text" href="#top" style={{ color: theme.accentText }}>
                View Matches <i className="fas fa-chevron-right" />
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

export default function LiveCampaigns() {
  const trackRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(CARDS_PER_VIEW); // Start at the first "real" set
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoPlayRef = useRef(null);
  const totalReal = liveCampaigns.length;

  // Build the infinite array: [last CARDS_PER_VIEW items] + [all items] + [first CARDS_PER_VIEW items]
  const clonedCampaigns = [
    ...liveCampaigns.slice(-CARDS_PER_VIEW),
    ...liveCampaigns,
    ...liveCampaigns.slice(0, CARDS_PER_VIEW),
  ];

  const totalSlides = clonedCampaigns.length;

  // Jump without transition when at clone boundaries
  const handleTransitionEnd = useCallback(() => {
    setIsTransitioning(false);
    // If we've scrolled to the cloned "end" set, jump to real start
    if (currentIndex >= totalReal + CARDS_PER_VIEW) {
      setCurrentIndex(CARDS_PER_VIEW);
    }
    // If we've scrolled to the cloned "start" set, jump to real end
    if (currentIndex <= CARDS_PER_VIEW - 1) {
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
    autoPlayRef.current = setInterval(() => {
      goNext();
    }, 4000);
    return () => clearInterval(autoPlayRef.current);
  }, [goNext]);

  // Pause auto-play on hover
  const pauseAutoPlay = () => clearInterval(autoPlayRef.current);
  const resumeAutoPlay = () => {
    clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      goNext();
    }, 4000);
  };

  // Calculate real page index for dots
  let realIndex = currentIndex - CARDS_PER_VIEW;
  if (realIndex < 0) realIndex = totalReal - 1;
  if (realIndex >= totalReal) realIndex = 0;
  const totalPages = Math.ceil(totalReal / CARDS_PER_VIEW);
  const currentPage = Math.floor(realIndex / CARDS_PER_VIEW) % totalPages;

  const goToPage = (page) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(CARDS_PER_VIEW + page * CARDS_PER_VIEW);
  };

  // Calculate transform: each slide = 100/CARDS_PER_VIEW percent of viewport
  const slideWidth = 100 / CARDS_PER_VIEW;
  const translateX = -(currentIndex * slideWidth);

  return (
    <section className="section lc-section" id="campaign-board">
      <div className="container">

        {/* ── Section Header ── */}
        <div className="lc-header" data-reveal>
          <div className="lc-header-left">
            <div className="lc-eyebrow">
              <span className="lc-eyebrow-line" />
              <span className="lc-eyebrow-text">Live Campaigns</span>
              <span className="lc-eyebrow-line" />
            </div>
            <h2 className="lc-title">Active hiring briefs from top brands</h2>
            <p className="lc-subtitle">
              Browse real campaigns with clear budgets, deliverables, and creator requirements — apply in seconds.
            </p>
          </div>
          <div className="lc-header-right">
            <div className="lc-stat-pill">
              <span className="lc-stat-number">{liveCampaigns.length}</span>
              <span className="lc-stat-label">Live Now</span>
            </div>
          </div>
        </div>

        {/* ── Slider ── */}
        <div
          className="lc-slider"
          data-reveal
          onMouseEnter={pauseAutoPlay}
          onMouseLeave={resumeAutoPlay}
        >
          {/* Nav arrows */}
          <button
            className="lc-arrow lc-arrow-left"
            onClick={goPrev}
            aria-label="Previous campaigns"
          >
            <i className="fas fa-chevron-left" />
          </button>
          <button
            className="lc-arrow lc-arrow-right"
            onClick={goNext}
            aria-label="Next campaigns"
          >
            <i className="fas fa-chevron-right" />
          </button>

          {/* Track with blur edges */}
          <div className="lc-slider-viewport">
            {/* Blur overlays */}
            <div className="lc-blur-left" />
            <div className="lc-blur-right" />

            <div
              className="lc-slider-track"
              ref={trackRef}
              style={{
                transform: `translateX(${translateX}%)`,
                transition: isTransitioning
                  ? 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                  : 'none',
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {clonedCampaigns.map((campaign, index) => (
                <CampaignCard
                  key={`${campaign.brand}-${index}`}
                  campaign={campaign}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── Pagination dots ── */}
        <div className="lc-dots">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              className={`lc-dot ${i === currentPage ? 'lc-dot--active' : ''}`}
              onClick={() => goToPage(i)}
              aria-label={`Go to page ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
