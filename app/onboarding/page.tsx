'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function OnboardingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [paymentMethod, setPaymentMethod] = useState<'bank' | 'wallet' | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentMethod) return alert('Please select a payment method');
    
    setSubmitting(true);
    // Mock API call to save user details
    setTimeout(() => {
      // Set a cookie to indicate onboarding is complete
      document.cookie = "onboardingComplete=true; path=/; max-age=31536000";
      router.push('/explore');
    }, 1000);
  };

  if (status === 'loading') {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
  }

  if (!session) return null;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem', position: 'relative' }}>
      <div className="glow-orb glow-orb-violet" style={{ width: 500, height: 500, top: '-10%', right: '-5%' }} />
      <div className="glow-orb glow-orb-cyan" style={{ width: 400, height: 400, bottom: '0%', left: '-5%' }} />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card"
        style={{ width: '100%', maxWidth: 600, padding: '3rem', position: 'relative', zIndex: 10 }}
      >
        <h1 className="heading-section" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Complete your profile</h1>
        <p className="text-body" style={{ marginBottom: '2rem' }}>Just a few details to get your subscription dashboard ready.</p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Full Name</label>
            <input 
              type="text" 
              value={session.user?.name || ''} 
              disabled 
              style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)', color: 'var(--text-tertiary)' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Email Address</label>
            <input 
              type="email" 
              value={session.user?.email || ''} 
              disabled 
              style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)', color: 'var(--text-tertiary)' }}
            />
          </div>

          <div style={{ marginTop: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '1rem', color: 'var(--text-primary)', fontWeight: 600 }}>Payment Method</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              
              <div 
                onClick={() => setPaymentMethod('bank')}
                style={{ 
                  padding: '1.5rem 1rem', 
                  borderRadius: 'var(--radius-md)', 
                  border: `1px solid ${paymentMethod === 'bank' ? 'var(--accent-violet)' : 'var(--border-subtle)'}`,
                  background: paymentMethod === 'bank' ? 'rgba(139, 92, 246, 0.1)' : 'rgba(255,255,255,0.02)',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🏦</div>
                <div style={{ fontWeight: 500, color: paymentMethod === 'bank' ? 'var(--text-primary)' : 'var(--text-secondary)' }}>Bank Details</div>
              </div>

              <div 
                onClick={() => setPaymentMethod('wallet')}
                style={{ 
                  padding: '1.5rem 1rem', 
                  borderRadius: 'var(--radius-md)', 
                  border: `1px solid ${paymentMethod === 'wallet' ? 'var(--text-primary)' : 'var(--border-subtle)'}`,
                  background: paymentMethod === 'wallet' ? 'var(--bg-card-hover)' : 'var(--bg-card)',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>💳</div>
                <div style={{ fontWeight: 500, color: paymentMethod === 'wallet' ? 'var(--text-primary)' : 'var(--text-secondary)' }}>Platform Wallet</div>
              </div>

            </div>
          </div>

          <button 
            type="submit" 
            disabled={submitting}
            className="btn-primary" 
            style={{ width: '100%', marginTop: '1rem', padding: '1rem' }}
          >
            <span>{submitting ? 'Setting up...' : 'Continue to Dashboard'}</span>
          </button>
        </form>
      </motion.div>
    </div>
  );
}
