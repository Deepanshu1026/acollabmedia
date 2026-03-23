export default function ForBrands() {
  const campaigns = [
    {
      cls: 'one', initials: 'BL', gradient: 'linear-gradient(135deg,#fbbf24,#f59e0b)',
      title: 'Beauty Launch',
      desc: 'Need 12 skincare creators with strong Reels retention and metro audience mix for a product launch.',
      statusColor: 'var(--green)', statusText: 'Campaign Live',
    },
    {
      cls: 'two', initials: 'FC', gradient: 'linear-gradient(135deg,#f87171,#ef4444)',
      title: 'Food Campaign',
      desc: 'Looking for regional creators with relatable content and a trusted home audience in India.',
      statusColor: '#f59e0b', statusText: 'Micro Creators Wanted',
    },
    {
      cls: 'three', initials: 'AG', gradient: 'linear-gradient(135deg,var(--accent),var(--accent2))',
      title: 'App Growth Push',
      desc: 'Short-form creators ready to drive installs with CTA-led storytelling and strong audience trust.',
      statusColor: 'var(--accent)', statusText: 'Performance Focused',
    },
  ];

  return (
    <section className="section" id="brands">
      <div className="container brand-grid">
        <div className="brand-copy-panel" data-reveal>
          <div className="section-heading" style={{ marginBottom: '22px' }}>
            <span className="tag">For brands</span>
            <h2>Find the right creators. <em>Fast.</em></h2>
            <p>Stop spending weeks chasing influencers. We give you a curated, vetted shortlist matched to your campaign goals.</p>
          </div>
          <ul>
            <li><i className="fas fa-check-circle" style={{ color: 'var(--green)', flexShrink: 0 }}></i><span>Browse creators filtered by niche, engagement quality and audience geography.</span></li>
            <li><i className="fas fa-check-circle" style={{ color: 'var(--green)', flexShrink: 0 }}></i><span>Launch campaigns faster — we handle outreach, coordination and brief delivery.</span></li>
            <li><i className="fas fa-check-circle" style={{ color: 'var(--green)', flexShrink: 0 }}></i><span>Full support on creator shortlisting, content review and campaign wrap-up.</span></li>
          </ul>
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '10px' }}>
            <a className="btn btn-primary" href="#signup">Post a Campaign <i className="fas fa-arrow-right"></i></a>
            <a className="btn btn-secondary" href="#top">Browse Creators</a>
          </div>
        </div>
        <div className="brand-board" data-reveal>
          {campaigns.map(c => (
            <article className={`brand-card ${c.cls}`} key={c.cls}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: c.gradient, display: 'grid', placeItems: 'center', color: '#fff', fontSize: '.78rem', fontWeight: 800, flexShrink: 0 }}>{c.initials}</div>
                <span style={{ fontWeight: 700, fontSize: '.95rem' }}>{c.title}</span>
              </div>
              <p>{c.desc}</p>
              <span className="brand-label">
                <i className="fas fa-circle" style={{ fontSize: '.45rem', verticalAlign: 'middle', color: c.statusColor }}></i> {c.statusText}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
