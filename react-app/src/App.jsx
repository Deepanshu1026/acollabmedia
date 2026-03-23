import { useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import BrandShowcase from './components/BrandShowcase.jsx';
import TrustBar from './components/TrustBar.jsx';
import WhyItWorks from './components/WhyItWorks.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import Earnings from './components/Earnings.jsx';
import USP from './components/USP.jsx';
import ForBrands from './components/ForBrands.jsx';
import Testimonials from './components/Testimonials.jsx';
import CTA from './components/CTA.jsx';
import FAQ from './components/FAQ.jsx';
import Footer from './components/Footer.jsx';
import { useReveal } from './hooks/useReveal.js';

export default function App() {
  useReveal();

  // Parallax on hero orbs
  useEffect(() => {
    const handler = e => {
      const x = (e.clientX / window.innerWidth - 0.5) * 18;
      const y = (e.clientY / window.innerHeight - 0.5) * 18;
      document.querySelector('.page-shell')?.style.setProperty('--mx', `${x}px`);
      document.querySelector('.page-shell')?.style.setProperty('--my', `${y}px`);
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return (
    <div className="page-shell">
      <Navbar />

      <main id="top">
        {/* Hero = BrandShowcase */}
        <section className="hero">
          <BrandShowcase />
        </section>

        <TrustBar />
        <WhyItWorks />
        <HowItWorks />
        <Earnings />
        <USP />
        <ForBrands />
        <Testimonials />
        <CTA />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
}
