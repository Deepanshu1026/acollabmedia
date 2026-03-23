export default function WhyItWorks() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-heading" data-reveal>
          <span className="tag">Why this works</span>
          <h2>Creators need access. <em>Brands need real reach.</em></h2>
          <p>The gap isn't talent — it's discovery, trust, and deal flow. We bridge both sides.</p>
        </div>
        <div className="problem-solution">
          <div className="split-card problem" data-reveal>
            <div className="split-label"><i className="fas fa-triangle-exclamation"></i> The Problem</div>
            <h3>What creators face without us</h3>
            <div className="point-list">
              <div className="point">
                <i className="fas fa-circle-xmark" style={{ color: '#f87171', flexShrink: 0 }}></i>
                <p>Brand deals locked behind industry connections — engaged but small creators get ignored.</p>
              </div>
              <div className="point">
                <i className="fas fa-circle-xmark" style={{ color: '#f87171', flexShrink: 0 }}></i>
                <p>Strong engagement but zero income — no structured deal pipeline to convert audience to earnings.</p>
              </div>
              <div className="point">
                <i className="fas fa-circle-xmark" style={{ color: '#f87171', flexShrink: 0 }}></i>
                <p>Brands waste weeks chasing and vetting creators — and campaigns still underperform.</p>
              </div>
            </div>
          </div>
          <div className="split-card solution" data-reveal>
            <div className="split-label solution-label">
              <i className="fas fa-circle-check" style={{ color: 'var(--green)' }}></i> The Solution
            </div>
            <h3>What changes when you join</h3>
            <div className="point-list">
              <div className="point">
                <i className="fas fa-circle-check" style={{ color: 'var(--green)', flexShrink: 0 }}></i>
                <p><strong>Curated matchmaking</strong> — We connect creators to brands by niche, audience and campaign fit.</p>
              </div>
              <div className="point">
                <i className="fas fa-circle-check" style={{ color: 'var(--green)', flexShrink: 0 }}></i>
                <p><strong>Zero follower floor</strong> — Micro creators with real engagement can start earning immediately.</p>
              </div>
              <div className="point">
                <i className="fas fa-circle-check" style={{ color: 'var(--green)', flexShrink: 0 }}></i>
                <p><strong>Faster launches</strong> — Brands get a vetted shortlist, clean execution and real results.</p>
              </div>
            </div>
            <a className="btn btn-primary" href="#signup" style={{ marginTop: '24px', display: 'inline-flex' }}>
              Get Started Free <i className="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
