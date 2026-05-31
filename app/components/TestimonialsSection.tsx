'use client';

import { motion } from 'framer-motion';

const testimonials = [
  { name: 'Priya S.', role: 'Student', text: 'Subspace saved me ₹200/month on streaming. The split feature is genius!', rating: 5 },
  { name: 'Rahul M.', role: 'Developer', text: 'Finally one place to track all my SaaS subscriptions. Clean UI and super fast.', rating: 5 },
  { name: 'Ananya K.', role: 'Designer', text: 'I was paying for 3 subscriptions I forgot about. Subspace caught them all.', rating: 5 },
  { name: 'Vikram T.', role: 'Freelancer', text: 'Split Netflix with my roommates seamlessly. No more awkward money conversations.', rating: 4 },
  { name: 'Sneha R.', role: 'Product Manager', text: 'The marketplace has amazing deals. Got YouTube Premium at 74% off!', rating: 5 },
  { name: 'Arjun D.', role: 'Student', text: 'Best fintech app I have used this year. The UI is beautiful and intuitive.', rating: 5 },
];

const row1 = testimonials.slice(0, 3);
const row2 = testimonials.slice(3, 6);

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <div className="glass-card" style={{ padding: '1.5rem', minWidth: 320, maxWidth: 360, flexShrink: 0, margin: '0 0.75rem' }}>
      <div style={{ display: 'flex', gap: 4, marginBottom: '0.75rem' }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} style={{ color: i < t.rating ? '#f59e0b' : 'var(--text-tertiary)', fontSize: '0.9rem' }}>★</span>
        ))}
      </div>
      <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
        &ldquo;{t.text}&rdquo;
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem', color: 'white' }}>
          {t.name[0]}
        </div>
        <div>
          <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)' }}>{t.name}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{t.role}</div>
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({ items, reverse }: { items: typeof testimonials; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee-container" style={{ marginBottom: '1rem' }}>
      <div style={{ display: 'flex', width: 'max-content' }} className={reverse ? 'animate-marquee-reverse' : 'animate-marquee'}>
        {doubled.map((t, i) => <TestimonialCard key={i} t={t} />)}
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="section-padding" style={{ position: 'relative', background: 'var(--bg-secondary)', overflow: 'hidden' }}>
      <div className="section-container" style={{ marginBottom: '3rem' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ textAlign: 'center' }}>
          <span style={{ display: 'inline-block', padding: '0.35rem 1rem', borderRadius: 'var(--radius-full)', background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.2)', fontSize: '0.8rem', color: '#f59e0b', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '1rem' }}>Reviews</span>
          <h2 className="heading-section">Loved by <span className="gradient-text">Thousands</span></h2>
          <p className="text-body" style={{ maxWidth: 480, margin: '1rem auto 0' }}>See what our users have to say about their experience with Subspace.</p>
        </motion.div>
      </div>
      <MarqueeRow items={row1} />
      <MarqueeRow items={row2} reverse />
    </section>
  );
}
