import { useEffect, useRef, useState, useCallback } from 'react';
import { creators } from '../data.js';

/* ── Count-up hook ─────────────────────────────── */
function useCountUp(target, delay = 600) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => {
      const step = Math.ceil(target / 40);
      const id = setInterval(() => {
        setValue(v => {
          const next = Math.min(v + step, target);
          if (next >= target) clearInterval(id);
          return next;
        });
      }, 28);
    }, delay);
    return () => clearTimeout(t);
  }, [target, delay]);
  return value;
}

/* ── Particle canvas ───────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let pts = [];
    let W, H;

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }

    function makeP() {
      return {
        x: Math.random() * W, y: Math.random() * H,
        r: Math.random() * 1.4 + 0.3,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        a: Math.random() * 0.45 + 0.1
      };
    }

    resize();
    for (let i = 0; i < 70; i++) pts.push(makeP());

    function loop() {
      ctx.clearRect(0, 0, W, H);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W || p.y < 0 || p.y > H) Object.assign(p, makeP(), { x: Math.random() * W, y: Math.random() * H });
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(37,99,235,${p.a * 0.5})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(loop);
    }

    window.addEventListener('resize', resize);
    loop();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas id="bs-bgCanvas" ref={canvasRef} />;
}

/* ── Toast ─────────────────────────────────────── */
function Toast({ msg, visible }) {
  return (
    <div className={`app-toast${visible ? ' s-show' : ''}`}>
      <i className="fas fa-check-circle"></i>
      <span>{msg}</span>
    </div>
  );
}

/* ── Creator Card ───────────────────────────────── */
function CreatorCard({ creator, creatorIndex, onOpen, delay }) {
  const ref = useRef(null);
  useEffect(() => {
    const t = setTimeout(() => ref.current?.classList.add('s-visible'), delay);
    return () => clearTimeout(t);
  }, [delay]);

  const MAX = 6;
  const extra = creator.brands.length - MAX;

  return (
    <div className="gr-card anim-reveal" ref={ref} onClick={() => onOpen(creatorIndex, 0)}>
      <img className="gr-img" src={creator.image} alt={creator.name} />
      <div className="gr-badge">
        <div className="gr-logo"><img src="assets/images/logo-light.png" alt="logo" /></div>
        <div className="gr-text">A Collab Media</div>
      </div>
      <div className="gr-overlay">
        <div className="gr-namerow">
          <div className="gr-name">{creator.name}</div>
          <div className="gr-verified"><i className="fas fa-check-circle"></i></div>
        </div>
        <div className="gr-metarow">
          <span className="gr-pill">{creator.impressions} Reach</span>
          <span className="gr-pill ac">{creator.category}</span>
        </div>
        <div className="gr-brandrow">
          {creator.brands.slice(0, MAX).map((b, bi) => (
            <div
              key={bi} className="gr-avatar" data-tip={b.name}
              onClick={e => { e.stopPropagation(); onOpen(creatorIndex, bi); }}>
              <img src={b.url} alt={b.name} />
            </div>
          ))}
          {extra > 0 && (
            <div className="gr-more" onClick={e => { e.stopPropagation(); onOpen(creatorIndex, MAX); }}>
              +{extra}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Showcase Panel ─────────────────────────────── */
function ShowcasePanel({ creatorIdx, brandIdx, onClose, onBrandChange }) {
  const cr = creators[creatorIdx];
  const br = cr.brands[brandIdx];
  const trackRef = useRef(null);

  // Drag scroll
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let down = false, sx, sl;
    const md = e => { down = true; sx = e.pageX - el.offsetLeft; sl = el.scrollLeft; };
    const ml = () => down = false;
    const mu = () => down = false;
    const mm = e => { if (!down) return; e.preventDefault(); el.scrollLeft = sl - (e.pageX - el.offsetLeft - sx); };
    el.addEventListener('mousedown', md); el.addEventListener('mouseleave', ml);
    el.addEventListener('mouseup', mu); el.addEventListener('mousemove', mm);
    return () => { el.removeEventListener('mousedown', md); el.removeEventListener('mouseleave', ml); el.removeEventListener('mouseup', mu); el.removeEventListener('mousemove', mm); };
  }, []);

  // Scroll carousel to active chip
  useEffect(() => {
    trackRef.current?.scrollTo({ left: Math.max(0, brandIdx * 78 - 60), behavior: 'smooth' });
  }, [brandIdx]);

  return (
    <div className="sp-section s-show" id="bs-showcase">
      <div className="sp-closebar">
        <button className="sp-closebtn" onClick={onClose}>
          <i className="fas fa-times"></i> Close
        </button>
      </div>
      <div className="sp-panel">
        <div className="sp-imgwrap">
          <img src={cr.image} alt={cr.name} />
          <div className="sp-badge">{cr.category}</div>
        </div>
        <div className="sp-info">
          <div>
            <div className="sp-cname">{cr.name}</div>
            <div className="sp-cmeta">
              <i className="fas fa-bolt" style={{ color: 'var(--accent)', fontSize: '.7rem' }}></i>
              {cr.impressions} Reach
              <span className="meta-sep"></span>
              <i className="fas fa-tag" style={{ fontSize: '.65rem', color: 'var(--text-3)' }}></i>
              {cr.category}
            </div>
          </div>
          <div className="sc-bcard">
            <div className="sc-blogo"><img src={br.url} alt={br.name} /></div>
            <div className="sc-btext">
              <div className="sc-bname">{br.name}</div>
              <div className="sc-bdesc">{br.desc}</div>
              <div className="sp-reach">
                <i className="fas fa-bolt"></i>
                <span>{cr.impressions} Campaign Reach</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="cr-carousel">
        <button className="cr-nav" disabled={brandIdx === 0} onClick={() => onBrandChange(brandIdx - 1)}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <div className="cr-track" ref={trackRef}>
          <div className="cr-inner">
            {cr.brands.map((b, idx) => (
              <div key={idx} className={`cr-chip${idx === brandIdx ? ' s-active' : ''}`} onClick={() => onBrandChange(idx)}>
                <img src={b.url} alt={b.name} title={b.name} />
              </div>
            ))}
          </div>
        </div>
        <button className="cr-nav" disabled={brandIdx === cr.brands.length - 1} onClick={() => onBrandChange(brandIdx + 1)}>
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>

      <div className="cr-dots">
        {cr.brands.map((_, idx) => (
          <div key={idx} className={`cr-dot${idx === brandIdx ? ' s-active' : ''}`} onClick={() => onBrandChange(idx)} />
        ))}
      </div>
    </div>
  );
}

/* ── Main BrandShowcase ─────────────────────────── */
export default function BrandShowcase() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('default');
  const [showcase, setShowcase] = useState(null); // { creatorIdx, brandIdx }
  const [toast, setToast] = useState({ msg: '', visible: false });
  const toastTimer = useRef(null);
  const showcaseRef = useRef(null);

  const totalCreators = creators.length;
  const totalBrands = creators.reduce((a, c) => a + c.brands.length, 0);
  const statCreators = useCountUp(totalCreators);
  const statBrands = useCountUp(totalBrands);

  const categories = ['all', ...new Set(creators.map(c => c.category))];

  const displayed = (() => {
    let res = creators.filter(c => {
      const catOk = filter === 'all' || c.category === filter;
      const q = search.toLowerCase().trim();
      const qOk = !q || c.name.toLowerCase().includes(q) || c.brands.some(b => b.name.toLowerCase().includes(q));
      return catOk && qOk;
    });
    if (sort === 'reach-h') res = [...res].sort((a, b) => b.reachNum - a.reachNum);
    else if (sort === 'reach-l') res = [...res].sort((a, b) => a.reachNum - b.reachNum);
    else if (sort === 'name') res = [...res].sort((a, b) => a.name.localeCompare(b.name));
    return res;
  })();

  const showToast = useCallback(msg => {
    setToast({ msg, visible: true });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(t => ({ ...t, visible: false })), 2400);
  }, []);

  const openShowcase = useCallback((creatorIdx, brandIdx) => {
    setShowcase({ creatorIdx, brandIdx });
    setTimeout(() => showcaseRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
    showToast(`Viewing ${creators[creatorIdx].brands[brandIdx].name}`);
  }, [showToast]);

  const hideShowcase = () => setShowcase(null);

  // Arrow key navigation
  useEffect(() => {
    const handler = e => {
      if (!showcase) return;
      const cr = creators[showcase.creatorIdx];
      if (e.key === 'ArrowLeft' && showcase.brandIdx > 0) setShowcase(s => ({ ...s, brandIdx: s.brandIdx - 1 }));
      if (e.key === 'ArrowRight' && showcase.brandIdx < cr.brands.length - 1) setShowcase(s => ({ ...s, brandIdx: s.brandIdx + 1 }));
      if (e.key === 'Escape') hideShowcase();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [showcase]);

  return (
    <>
      <ParticleCanvas />
      <div className="pg-wrap">
        {/* h-section */}
        <header className="h-section">
          <div className="h-eyebrow"><span className="h-dot"></span>Creator Showcase</div>
          <h1 className="h-title">Where Creators Meet<br /><span>Iconic Brands</span></h1>
          <p className="h-sub">Explore real collaborations, campaign stories, and the power behind every partnership.</p>
          <div className="kpi-bar">
            <div className="kpi-item"><span className="kpi-val">{statCreators}</span><span className="kpi-cap">Creators</span></div>
            <div className="kpi-sep"></div>
            <div className="kpi-item"><span className="kpi-val">{statBrands}</span><span className="kpi-cap">Brand Deals</span></div>
            <div className="kpi-sep"></div>
            <div className="kpi-item"><span className="kpi-val">10M+</span><span className="kpi-cap">Total Reach</span></div>
          </div>
        </header>

        {/* Filter row */}
        <div className="fl-row">
          <div className="fl-search">
            <i className="fas fa-search"></i>
            <input type="text" placeholder="Search creator or brand…" autoComplete="off"
              value={search} onChange={e => { setSearch(e.target.value); hideShowcase(); }} />
          </div>
          <div className="fl-chips">
            {categories.map(cat => (
              <div key={cat} className={`fl-chip${filter === cat ? ' s-active' : ''}`}
                onClick={() => { setFilter(cat); hideShowcase(); }}>
                {cat === 'all' ? 'All' : cat}
              </div>
            ))}
          </div>
          <div className="fl-sort">
            <select value={sort} onChange={e => setSort(e.target.value)}>
              <option value="default">Sort: Default</option>
              <option value="reach-h">Reach: High → Low</option>
              <option value="reach-l">Reach: Low → High</option>
              <option value="name">Name A–Z</option>
            </select>
          </div>
          <div className="fl-count">{displayed.length} creator{displayed.length !== 1 ? 's' : ''}</div>
        </div>

        {/* Grid */}
        <div className="gr-grid">
          {displayed.length === 0
            ? <div className="empty-view"><i className="fas fa-search"></i><p>No creators found. Try a different search.</p></div>
            : displayed.map((cr, ci) => {
              const ri = creators.indexOf(cr);
              return <CreatorCard key={ri} creator={cr} creatorIndex={ri} onOpen={openShowcase} delay={ci * 75 + 80} />;
            })
          }
        </div>

        {/* Divider */}
        <div className={`sg-divider${showcase ? ' s-show' : ''}`}>
          <div className="sg-line"></div>
          <span className="sg-lbl">Brand Collab Detail</span>
          <div className="sg-line"></div>
        </div>

        {/* Showcase */}
        <div ref={showcaseRef}>
          {showcase && (
            <ShowcasePanel
              creatorIdx={showcase.creatorIdx}
              brandIdx={showcase.brandIdx}
              onClose={hideShowcase}
              onBrandChange={idx => setShowcase(s => ({ ...s, brandIdx: idx }))}
            />
          )}
        </div>
      </div>

      <Toast msg={toast.msg} visible={toast.visible} />
    </>
  );
}
