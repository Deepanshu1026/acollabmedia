import { trustLogos } from '../data.js';

export default function TrustBar() {
  const doubled = [...trustLogos, ...trustLogos];

  return (
    <section className="trust-bar">
      <div className="container">
        <div className="trust-inner" data-reveal>
          <span className="trust-label">Trusted by creators who collaborated with</span>
          <div className="trust-logos">
            <div className="trust-logos-track">
              {doubled.map((logo, i) => (
                <div className="trust-logo-pill" key={i}>
                  <img src={logo.src} alt={logo.alt} />
                </div>
              ))}
            </div>
          </div>
          <div className="trust-stats">
            <div className="trust-stat"><strong>100+</strong><span>Creators</span></div>
            <div className="trust-divider"></div>
            <div className="trust-stat"><strong>250+</strong><span>Campaigns</span></div>
            <div className="trust-divider"></div>
            <div className="trust-stat"><strong>₹12L+</strong><span>Paid Out</span></div>
            <div className="trust-divider"></div>
            <div className="trust-stat"><strong>4.9 ★</strong><span>Creator Rating</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
