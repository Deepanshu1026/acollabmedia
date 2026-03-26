import { useState } from 'react';

const faqs = [
  {
    q: 'Do I need many followers to join?',
    a: 'No follower minimum. Strong niche relevance, authentic audience trust, and content quality can be enough to land your first brand deal with us.',
  },
  {
    q: 'How do creators get paid?',
    a: 'After campaign content is approved by the brand, payouts are processed per the agreed terms. Our team stays in the loop to ensure everything runs on time.',
  },
  {
    q: 'Is joining free for creators?',
    a: 'Yes, completely. Creators can register, build a full profile, and get discovered for relevant campaigns at absolutely zero cost.',
  },
  {
    q: 'Can brands post campaigns directly?',
    a: 'Absolutely. Share your campaign brief, budget range and target audience — we handle creator shortlisting, outreach and coordination for you.',
  },
  {
    q: 'How long until I match with a brand?',
    a: 'Most creators receive their first brand match within 7–14 days of completing their profile, depending on ongoing campaigns and niche fit.',
  },
];

export default function FAQ() {
  const [active, setActive] = useState(0);

  const toggle = i => setActive(prev => (prev === i ? null : i));

  return (
    <section className="section" id="faq">
      <div className="container faq-wrap">
        <div className="faq-art" data-reveal>
          <div className="section-heading" style={{ marginBottom: '20px' }}>
            <span className="tag">FAQ</span>
            <h2>Common questions, <em>clear answers.</em></h2>
            <p>Quick answers to remove hesitation and help you start without any confusion.</p>
          </div>
          <img src="/src/assets/images/faq-thumb.png" alt="FAQ illustration" />
        </div>
        <div className="faq-grid" data-reveal>
          {faqs.map((f, i) => (
            <div key={i} className={`faq-item${active === i ? ' active' : ''}`}>
              <button className="faq-question" type="button" onClick={() => toggle(i)}>
                <span>{f.q}</span>
                <i className="fas fa-plus"></i>
              </button>
              <div className="faq-answer">{f.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
