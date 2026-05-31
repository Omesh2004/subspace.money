'use client';

import { motion } from 'framer-motion';

const steps = [
  {
    number: 1,
    title: 'Download the App',
    description: 'Get started in seconds. Download Subspace and create your account with just your phone number.',
    icon: '📱',
  },
  {
    number: 2,
    title: 'Add Your Subscriptions',
    description: 'Instantly connect and track all your subscriptions. Our smart detection finds them automatically.',
    icon: '➕',
  },
  {
    number: 3,
    title: 'Split & Save',
    description: 'Share subscriptions with friends, discover deals, and watch your savings grow every month.',
    icon: '💰',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-padding" style={{ position: 'relative', background: 'var(--bg-secondary)' }}>
      <div className="glow-orb glow-orb-cyan" style={{ width: 300, height: 300, top: '30%', left: '-5%', opacity: 0.12 }} />
      <div className="section-container">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ display: 'inline-block', padding: '0.35rem 1rem', borderRadius: 'var(--radius-full)', background: 'var(--accent-violet-dim)', border: '1px solid rgba(139,92,246,0.2)', fontSize: '0.8rem', color: 'var(--accent-violet)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '1rem' }}>How It Works</span>
          <h2 className="heading-section">Get Started in <span className="gradient-text">3 Simple Steps</span></h2>
        </motion.div>
        <div style={{ maxWidth: 700, margin: '0 auto', position: 'relative' }}>
          <div style={{ position: 'absolute', left: 24, top: 25, bottom: 25, width: 2, background: 'linear-gradient(180deg, #8b5cf6, #06b6d4, transparent)' }} />
          {steps.map((step, i) => (
            <motion.div key={step.number} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, delay: i * 0.2 }} style={{ display: 'flex', gap: '2rem', marginBottom: i < steps.length - 1 ? '3rem' : 0, position: 'relative' }}>
              <div className="timeline-dot">{step.number}</div>
              <div className="glass-card" style={{ padding: '1.75rem', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>{step.icon}</span>
                  <h3 className="heading-card">{step.title}</h3>
                </div>
                <p className="text-small" style={{ lineHeight: 1.7 }}>{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
