export default function HowItWorks() {
  const steps = [
    { num: '01', icon: 'fa-user-pen', title: 'Create Your Profile', desc: 'Set up your niche, goals, content style and Instagram link. Takes under 5 minutes.' },
    { num: '02', icon: 'fa-instagram', fab: true, title: 'Connect Instagram', desc: 'Showcase your audience quality and content category so brands can assess the right match fast.' },
    { num: '03', icon: 'fa-handshake', title: 'Get Matched', desc: 'We shortlist you for verified campaigns based on your profile — no cold outreach needed.' },
    { num: '04', icon: 'fa-indian-rupee-sign', title: 'Earn & Grow', desc: 'Deliver your content, get approved, and receive payment. Consistent creators unlock bigger deals.', green: true },
  ];

  return (
    <section className="section" id="how-it-works">
      <div className="container">
        <div className="section-heading" data-reveal>
          <span className="tag">How it works</span>
          <h2>From signup to <em>first payout</em> in days.</h2>
          <p>A streamlined 4-step flow built to remove every unnecessary barrier for creators and brands.</p>
        </div>
        <div className="steps-grid" data-reveal-grid>
          {steps.map(s => (
            <article className="step-card" key={s.num} data-reveal>
              <div className="step-number">{s.num}</div>
              <div className="step-icon-row">
                <i className={`${s.fab ? 'fab' : 'fas'} ${s.icon}`}
                  style={{ color: s.green ? 'var(--green)' : 'var(--accent)', fontSize: '1.4rem' }}></i>
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
