export default function CTA() {
  return (
    <section className="section" id="signup">
      <div className="container">
        <div className="cta-panel" data-reveal>
          <div className="cta-badge"><i className="fas fa-bolt"></i> Limited spots open this month</div>
          <h2>Start Earning From Your<br />Instagram Today</h2>
          <p>Whether you're a creator looking for your first paid collab or a brand that needs genuine influencer reach — this is your starting point.</p>
          <div className="cta-actions">
            <a className="btn btn-primary" href="#"><i className="fas fa-user-plus"></i> Join as Creator</a>
            <a className="btn btn-secondary" href="#"><i className="fas fa-building"></i> Join as Brand</a>
          </div>
          <div className="cta-sub">No setup fees. No hidden charges. Get started in minutes.</div>
        </div>
      </div>
    </section>
  );
}
