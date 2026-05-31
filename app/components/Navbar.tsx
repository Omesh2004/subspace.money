'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Savings', href: '#split' },
  { label: 'Reviews', href: '#testimonials' },
];

export default function Navbar() {
  const { data: session } = useSession();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="glass-navbar"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'box-shadow 0.3s',
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.3)' : 'none',
      }}
    >
      <div
        className="section-container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 72,
        }}
      >
        {/* Logo */}
        <a href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: 18,
              color: 'white',
            }}
          >
            S
          </div>
          <span
            style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
            }}
          >
            subspace
          </span>
        </a>

        {/* Desktop Nav */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 500,
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              {link.label}
            </a>
          ))}
          {session ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <a href="/explore" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Explore</a>
              
              {/* Theme Toggle */}
              <button 
                onClick={toggleTheme}
                style={{
                  width: 64, height: 32, borderRadius: '16px', background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)', position: 'relative', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', padding: '0 4px', transition: 'all 0.3s'
                }}
                aria-label="Toggle Theme"
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', padding: '0 4px', opacity: 0.6 }}>
                  <Sun size={14} color="var(--text-tertiary)" />
                  <Moon size={14} color="var(--text-tertiary)" />
                </div>
                <div style={{
                  position: 'absolute', left: theme === 'dark' ? 34 : 4, width: 24, height: 24,
                  borderRadius: '50%', background: 'var(--text-primary)', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', transition: 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
                  color: 'var(--bg-primary)', zIndex: 2
                }}>
                  {theme === 'dark' ? <Moon size={14} fill="currentColor" /> : <Sun size={14} fill="currentColor" />}
                </div>
              </button>

              <button onClick={() => signOut()} className="btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.875rem' }}>Sign Out</button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {/* Theme Toggle */}
              <button 
                onClick={toggleTheme}
                style={{
                  width: 64, height: 32, borderRadius: '16px', background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)', position: 'relative', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', padding: '0 4px', transition: 'all 0.3s'
                }}
                aria-label="Toggle Theme"
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', padding: '0 4px', opacity: 0.6 }}>
                  <Sun size={14} color="var(--text-tertiary)" />
                  <Moon size={14} color="var(--text-tertiary)" />
                </div>
                <div style={{
                  position: 'absolute', left: theme === 'dark' ? 34 : 4, width: 24, height: 24,
                  borderRadius: '50%', background: 'var(--text-primary)', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', transition: 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
                  color: 'var(--bg-primary)', zIndex: 2
                }}>
                  {theme === 'dark' ? <Moon size={14} fill="currentColor" /> : <Sun size={14} fill="currentColor" />}
                </div>
              </button>

              <button onClick={() => signIn('google', { callbackUrl: '/onboarding' })} className="btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.875rem' }}>
                <span>Get Started</span>
              </button>
            </div>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="mobile-menu-btn"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            padding: 8,
          }}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              overflow: 'hidden',
              borderTop: '1px solid var(--border-subtle)',
            }}
          >
            <div className="section-container" style={{ padding: '1rem 1.5rem 1.5rem' }}>
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: 'block',
                    padding: '0.75rem 0',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    fontSize: '1rem',
                    fontWeight: 500,
                    borderBottom: '1px solid var(--border-subtle)',
                  }}
                >
                  {link.label}
                </a>
              ))}
              {session ? (
                <>
                  <a href="/explore" className="btn-primary" onClick={() => setMobileOpen(false)} style={{ marginTop: '1rem', width: '100%', textAlign: 'center' }}>
                    <span>Go to Explore</span>
                  </a>
                  <button onClick={() => { signOut(); setMobileOpen(false); }} className="btn-outline" style={{ marginTop: '0.5rem', width: '100%' }}>
                    Sign Out
                  </button>
                </>
              ) : (
                <button onClick={() => { signIn('google', { callbackUrl: '/onboarding' }); setMobileOpen(false); }} className="btn-primary" style={{ marginTop: '1rem', width: '100%' }}>
                  <span>Get Started</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
        }
      `}</style>
    </motion.nav>
  );
}
