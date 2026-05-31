'use client';

import { Suspense } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { signIn, useSession } from 'next-auth/react';

const Hero3DScene = dynamic(() => import('./Hero3DScene'), { ssr: false });

export default function HeroSection() {
  const { data: session } = useSession();

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background glow orbs */}
      <div
        className="glow-orb glow-orb-violet"
        style={{ width: 500, height: 500, top: '-10%', right: '-5%' }}
      />
      <div
        className="glow-orb glow-orb-cyan"
        style={{ width: 400, height: 400, bottom: '0%', left: '-5%' }}
      />

      {/* 3D Scene */}
      <Suspense fallback={null}>
        <Hero3DScene />
      </Suspense>

      {/* Content overlay */}
      <div
        className="section-container"
        style={{ position: 'relative', zIndex: 10, width: '100%' }}
      >
        <div style={{ maxWidth: 650, paddingTop: '6rem' }}>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '0.4rem 1rem',
                borderRadius: 'var(--radius-full)',
                background: 'var(--accent-violet-dim)',
                border: '1px solid rgba(139, 92, 246, 0.2)',
                fontSize: '0.85rem',
                color: 'var(--accent-violet)',
                fontWeight: 500,
                marginBottom: '1.5rem',
              }}
            >
              <span style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#8b5cf6',
                display: 'inline-block',
                animation: 'pulse-glow 2s infinite',
              }} />
              Trusted by 50,000+ users
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="heading-hero"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            One Place for{' '}
            <span className="gradient-text">All Your</span>{' '}
            Subscriptions
          </motion.h1>

          {/* Sub */}
          <motion.p
            className="text-body"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            style={{ marginTop: '1.5rem', maxWidth: 520 }}
          >
            Track, split, and save on every subscription. The smartest way to
            manage your digital life — all from one beautiful dashboard.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}
          >
            {session ? (
              <a href="/explore" className="btn-primary">
                <span>Go to Explore</span>
              </a>
            ) : (
              <button onClick={() => signIn('google', { callbackUrl: '/onboarding' })} className="btn-primary" style={{ border: 'none' }}>
                <span>Start Free</span>
              </button>
            )}
            <a href="#how-it-works" className="btn-outline">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              Watch Demo
            </a>
          </motion.div>

          {/* Social Proof Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85 }}
            style={{
              display: 'flex',
              gap: '2rem',
              marginTop: '3.5rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid var(--border-subtle)',
              flexWrap: 'wrap',
            }}
          >
            {[
              { value: '50K+', label: 'Active Users' },
              { value: '₹2.4Cr', label: 'Total Saved' },
              { value: '4.8★', label: 'App Rating' },
            ].map((stat) => (
              <div key={stat.label}>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', marginTop: 2 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
