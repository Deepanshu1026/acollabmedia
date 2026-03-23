export default function Earnings() {
  const earnCards = [
    { icon: 'fa-users', title: 'No Minimum Followers', desc: 'Engagement, niche clarity and reliability matter far more than vanity metrics.' },
    { icon: 'fa-door-open', title: 'Beginner Friendly', desc: 'First-time creators can onboard and earn without any prior brand deal experience.' },
    { icon: 'fa-file-contract', title: 'Clear Expectations', desc: 'Campaign briefs, payout structures and timelines are shared up front — no surprises.' },
    { icon: 'fa-chart-line', title: 'Scales With You', desc: 'On-time delivery and strong performance unlock repeat work and progressively bigger deals.' },
  ];

  return (
    <section className="section">
      <div className="container">
        <div className="section-heading" data-reveal>
          <span className="tag">Earnings opportunity</span>
          <h2>Real income for <em>every creator size.</em></h2>
          <p>You don't need a million followers — you need the right fit, the right brand, and our platform.</p>
        </div>
        <div className="earnings-grid">
          <div className="highlight-panel" data-reveal>
            <span className="tag">Typical creator outcomes</span>
            <h3>Creators earn ₹5,000 to ₹50,000+ per month.</h3>
            <p>Niche trust and engagement beat raw follower counts. Brands know this — and so do we.</p>
            <div className="income-list">
              <div>
                <div>
                  <strong>UGC / First Collab</strong>
                  <div style={{ fontSize: '.78rem', color: 'rgba(148,163,184,.7)', marginTop: '2px' }}>No prior brand deal experience needed</div>
                </div>
                <span>₹5K–12K</span>
              </div>
              <div>
                <div>
                  <strong>Micro Creator Campaign</strong>
                  <div style={{ fontSize: '.78rem', color: 'rgba(148,163,184,.7)', marginTop: '2px' }}>1K–50K with strong niche engagement</div>
                </div>
                <span>₹12K–25K</span>
              </div>
              <div>
                <div>
                  <strong>Recurring Brand Work</strong>
                  <div style={{ fontSize: '.78rem', color: 'rgba(148,163,184,.7)', marginTop: '2px' }}>Consistent creators with repeat partnerships</div>
                </div>
                <span>₹25K–50K+</span>
              </div>
            </div>
          </div>
          <div className="earn-stack" data-reveal-grid>
            {earnCards.map(c => (
              <article className="earn-card" key={c.title} data-reveal>
                <div className="usp-icon"><i className={`fas ${c.icon}`}></i></div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
