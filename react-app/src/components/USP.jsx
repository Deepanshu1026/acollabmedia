export default function USP() {
  const usps = [
    { icon: 'fa-shield-halved', title: 'Verified Brand Deals', desc: 'Every opportunity is vetted for legitimacy and relevance before reaching creators.' },
    { icon: 'fa-bolt', title: 'Fast Payments', desc: 'Campaign workflows are structured to eliminate payout delays and invoice confusion.' },
    { icon: 'fa-seedling', title: 'Beginner Friendly', desc: 'New creators can start without industry contacts, agency ties or large audience numbers.' },
    { icon: 'fa-headset', title: 'Dedicated Support', desc: 'Hands-on guidance at every step — from shortlisting to final campaign approval.' },
  ];

  return (
    <section className="section">
      <div className="container">
        <div className="section-heading" data-reveal>
          <span className="tag">Why choose us</span>
          <h2>Built for creators. <em>Optimised for brands.</em></h2>
          <p>We reduce friction on both sides of the marketplace by doing the heavy lifting in between.</p>
        </div>
        <div className="usp-grid" data-reveal-grid>
          {usps.map(u => (
            <article className="usp-card" key={u.title} data-reveal>
              <div className="usp-icon"><i className={`fas ${u.icon}`}></i></div>
              <h3>{u.title}</h3>
              <p>{u.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
