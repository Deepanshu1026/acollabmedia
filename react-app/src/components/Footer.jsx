export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-copy">
            <a href="#top" className="brand">
              <img src="assets/images/logo-light.png" alt="A Collab Media logo" />
              <div className="brand-copy">
                <strong>A Collab Media</strong>
                <span>Creator monetization platform</span>
              </div>
            </a>
            <p style={{ marginTop: '18px' }}>
              Helping Instagram creators turn their reach into real income — and helping brands find the right people to amplify their campaigns.
            </p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '18px' }}>
              <a href="#" className="social-btn"><i className="fab fa-instagram"></i></a>
              <a href="#" className="social-btn"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" className="social-btn"><i className="fab fa-whatsapp"></i></a>
            </div>
          </div>

          <div>
            <h3 className="footer-title">Navigate</h3>
            <div className="footer-links">
              <a href="#how-it-works"><i className="fas fa-chevron-right" style={{ fontSize: '.6rem', color: 'var(--accent)' }}></i> How it Works</a>
              <a href="#top"><i className="fas fa-chevron-right" style={{ fontSize: '.6rem', color: 'var(--accent)' }}></i> Creator Showcase</a>
              <a href="#brands"><i className="fas fa-chevron-right" style={{ fontSize: '.6rem', color: 'var(--accent)' }}></i> For Brands</a>
              <a href="#testimonials"><i className="fas fa-chevron-right" style={{ fontSize: '.6rem', color: 'var(--accent)' }}></i> Testimonials</a>
            </div>
          </div>

          <div>
            <h3 className="footer-title">Contact</h3>
            <div className="footer-links">
              <a href="mailto:hello@acollabmedia.com"><i className="fas fa-envelope" style={{ fontSize: '.7rem', color: 'var(--accent)' }}></i> hello@acollabmedia.com</a>
              <a href="tel:+919999999999"><i className="fas fa-phone" style={{ fontSize: '.7rem', color: 'var(--accent)' }}></i> +91 99999 99999</a>
              <a href="#"><i className="fab fa-instagram" style={{ fontSize: '.7rem', color: 'var(--accent)' }}></i> @acollabmedia</a>
            </div>
          </div>

          <div>
            <h3 className="footer-title">Legal</h3>
            <div className="footer-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Creator Guidelines</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-note">© {year} A Collab Media. All rights reserved.</div>
          <div className="footer-note">Made with <span style={{ color: '#f87171' }}>♥</span> for creators</div>
        </div>
      </div>
    </footer>
  );
}
