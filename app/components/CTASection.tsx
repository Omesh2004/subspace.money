'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function CTASection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section id="cta" className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="glow-orb glow-orb-violet" style={{ width: 500, height: 500, top: '-20%', left: '30%', opacity: 0.2 }} />
      <div className="glow-orb glow-orb-cyan" style={{ width: 300, height: 300, bottom: '-10%', right: '20%', opacity: 0.15 }} />

      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-card"
          style={{
            maxWidth: 720,
            margin: '0 auto',
            padding: '4rem 3rem',
            textAlign: 'center',
            border: '1px solid rgba(139,92,246,0.15)',
            position: 'relative',
          }}
        >
          {/* Decorative ring */}
          <div style={{
            position: 'absolute',
            width: 200,
            height: 200,
            borderRadius: '50%',
            border: '1px solid rgba(139,92,246,0.1)',
            top: -60,
            right: -60,
            animation: 'spin-slow 20s linear infinite',
          }} />

          <h2 className="heading-section" style={{ marginBottom: '1rem' }}>
            Ready to take control of your{' '}
            <span className="gradient-text">subscriptions?</span>
          </h2>
          <p className="text-body" style={{ maxWidth: 480, margin: '0 auto 2rem' }}>
            Join 50,000+ users who are saving money every month. Get early access to new features and exclusive deals.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.75rem', maxWidth: 460, margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                style={{
                  flex: 1,
                  minWidth: 220,
                  padding: '0.875rem 1.25rem',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--border-subtle)',
                  background: 'rgba(255,255,255,0.05)',
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'border-color 0.3s',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#8b5cf6')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--border-subtle)')}
              />
              <button type="submit" className="btn-primary">
                <span>Get Early Access</span>
              </button>
            </form>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '1rem', borderRadius: 'var(--radius-lg)', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', maxWidth: 400, margin: '0 auto' }}>
              <span style={{ fontSize: '1.5rem' }}>✅</span>
              <span style={{ color: '#10b981', fontWeight: 600 }}>You&apos;re on the list! We&apos;ll be in touch.</span>
            </motion.div>
          )}

          <p className="text-small" style={{ marginTop: '1rem' }}>No spam. Unsubscribe anytime.</p>
        </motion.div>
      </div>
    </section>
  );
}
