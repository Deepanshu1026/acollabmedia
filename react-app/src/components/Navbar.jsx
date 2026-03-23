import { useEffect, useState } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="container nav">
        <a href="#top" className="brand">
          <img src="assets/images/logo-light.png" alt="A Collab Media logo" />
          <div className="brand-copy">
            <strong>A Collab Media</strong>
            <span>Creators × Brands</span>
          </div>
        </a>
        <nav className="nav-links">
          <a href="#how-it-works">How it Works</a>
          <a href="#top">Creators</a>
          <a href="#brands">Brands</a>
          <a href="#testimonials">Testimonials</a>
          <a href="#faq">FAQ</a>
        </nav>
        <div className="nav-actions">
          <a className="pill-link" href="#brands">
            <i className="fas fa-rocket" style={{ fontSize: '.75rem', color: 'var(--accent)' }}></i> For Brands
          </a>
          <a className="btn btn-primary" href="#signup">
            Start Earning <i className="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </header>
  );
}
