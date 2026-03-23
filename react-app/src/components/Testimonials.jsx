const testimonials = [
  {
    quote: "I thought brand deals were only for bigger pages. My first paid campaign came within weeks, and the process felt structured instead of random.",
    name: "Riya S.", role: "Fashion creator, Mumbai",
    initials: "RS", gradient: "linear-gradient(135deg,var(--accent),var(--accent2))",
    proof: "₹12,000 paid",
  },
  {
    quote: "We needed creators with real audience trust, not inflated numbers. The shortlist was cleaner and saved us enormous amounts of time and budget.",
    name: "Campaign Lead", role: "D2C skincare brand",
    initials: "CL", gradient: "linear-gradient(135deg,#10b981,#059669)",
    proof: "11 creators activated",
  },
  {
    quote: "The biggest difference was the support. I always knew what the brand wanted, when payment would arrive, and how to perform better each time.",
    name: "Arjun K.", role: "Micro lifestyle creator",
    initials: "AK", gradient: "linear-gradient(135deg,#f59e0b,#d97706)",
    proof: "3 repeat campaigns",
  },
];

function Stars() {
  return (
    <div className="stars">
      {[...Array(5)].map((_, i) => (
        <i key={i} className="fas fa-star" style={{ color: '#f59e0b', fontSize: '.8rem' }}></i>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="section" id="testimonials">
      <div className="container">
        <div className="section-heading" data-reveal>
          <span className="tag">Testimonials</span>
          <h2>Creators and brands <em>who trust us.</em></h2>
          <p>Real experiences, not marketing copy — people who went from zero brand deals to recurring income.</p>
        </div>
        <div className="testimonial-grid" data-reveal-grid>
          {testimonials.map(t => (
            <article className="testimonial-card" key={t.name} data-reveal>
              <Stars />
              <p className="quote">{t.quote}</p>
              <div className="testimonial-foot">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: t.gradient, display: 'grid', placeItems: 'center', color: '#fff', fontWeight: 800, fontSize: '.85rem', flexShrink: 0 }}>{t.initials}</div>
                  <div><strong>{t.name}</strong><span>{t.role}</span></div>
                </div>
                <div className="proof-shot">{t.proof}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
