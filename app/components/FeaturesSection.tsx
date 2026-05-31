'use client';

import { Suspense } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const Feature3DIcon = dynamic(() => import('./Feature3DIcon'), { ssr: false });

const features = [
  {
    type: 'track' as const,
    title: 'Track Everything',
    description: 'Monitor all your subscriptions in one dashboard. Never miss a renewal or overpay again.',
    gradient: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(139,92,246,0.05))',
  },
  {
    type: 'split' as const,
    title: 'Split & Share',
    description: 'Split subscription costs with friends and family. Share Netflix, Spotify, and more — effortlessly.',
    gradient: 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(212,175,55,0.05))',
  },
  {
    type: 'save' as const,
    title: 'Save Money',
    description: 'Discover unused subscriptions and cut waste. Save up to ₹2,400 per year on average.',
    gradient: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))',
  },
  {
    type: 'discover' as const,
    title: 'Discover Deals',
    description: 'Browse our marketplace for exclusive discounts on premium services and new subscriptions.',
    gradient: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(59,130,246,0.05))',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function FeaturesSection() {
  return (
    <section id="features" className="section-padding" style={{ position: 'relative' }}>
      {/* Background glow */}
      <div
        className="glow-orb glow-orb-violet"
        style={{ width: 350, height: 350, top: '20%', right: '10%', opacity: 0.15 }}
      />

      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <span
            style={{
              display: 'inline-block',
              padding: '0.35rem 1rem',
              borderRadius: 'var(--radius-full)',
              background: 'var(--accent-cyan-dim)',
              border: '1px solid rgba(6, 182, 212, 0.2)',
              fontSize: '0.8rem',
              color: 'var(--accent-cyan)',
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: '1rem',
            }}
          >
            Features
          </span>
          <h2 className="heading-section">
            Everything You Need to{' '}
            <span className="gradient-text">Take Control</span>
          </h2>
          <p
            className="text-body"
            style={{ maxWidth: 560, margin: '1rem auto 0' }}
          >
            Powerful tools designed to simplify your subscription life and put
            money back in your pocket.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.type}
              variants={cardVariants}
              className="glass-card"
              style={{
                padding: '2rem',
                cursor: 'default',
                perspective: 1000,
              }}
            >
              <div
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 'var(--radius-md)',
                  background: feature.gradient,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                }}
              >
                <Suspense fallback={<div style={{ width: 120, height: 120 }} />}>
                  <Feature3DIcon type={feature.type} />
                </Suspense>
              </div>
              <h3 className="heading-card">{feature.title}</h3>
              <p
                className="text-small"
                style={{ marginTop: '0.75rem', lineHeight: 1.7 }}
              >
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
