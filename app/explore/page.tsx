'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../components/DashboardLayout';
import { useLanguage } from '../context/LanguageContext';
import Skeleton from '../components/Skeleton';

export default function ExplorePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    } else if (status === 'authenticated') {
      const hasOnboarded = document.cookie.split('; ').find(row => row.startsWith('onboardingComplete='));
      if (!hasOnboarded) {
        router.push('/onboarding');
      } else {
        setLoading(false);
      }
    }
  }, [status, router]);

  if (status === 'loading' || loading) {
    return (
      <DashboardLayout>
        <div className="section-container" style={{ paddingTop: '3rem' }}>
          <Skeleton width="40%" height="3rem" style={{ marginBottom: '1rem' }} />
          <Skeleton width="60%" height="1.5rem" style={{ marginBottom: '3rem' }} />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
            <Skeleton height="120px" borderRadius="var(--radius-lg)" />
            <Skeleton height="120px" borderRadius="var(--radius-lg)" />
            <Skeleton height="120px" borderRadius="var(--radius-lg)" />
          </div>

          <Skeleton width="30%" height="2rem" style={{ marginBottom: '1.5rem' }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <Skeleton height="200px" borderRadius="var(--radius-lg)" />
            <Skeleton height="200px" borderRadius="var(--radius-lg)" />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!session) return null;

  return (
    <DashboardLayout>
      <div className="section-container" style={{ paddingTop: '3rem' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="heading-section" style={{ marginBottom: '0.5rem' }}>
            {t('welcome')}, {session.user?.name?.split(' ')[0]}
          </h1>
          <p className="text-body" style={{ marginBottom: '3rem' }}>{t('exploreDeals')}</p>

          {/* Stats row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
            <div className="glass-card" style={{ padding: '1.75rem' }}>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 500 }}>{t('walletBalance')}</div>
              <div style={{ fontSize: '2.25rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-outfit)' }}>₹4,500</div>
            </div>
            <div className="glass-card" style={{ padding: '1.75rem' }}>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 500 }}>{t('activeSplits')}</div>
              <div style={{ fontSize: '2.25rem', fontWeight: 700, color: 'var(--accent-violet)', fontFamily: 'var(--font-outfit)' }}>3</div>
            </div>
            <div className="glass-card" style={{ padding: '1.75rem' }}>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 500 }}>{t('monthlySavings')}</div>
              <div style={{ fontSize: '2.25rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-outfit)' }}>₹840</div>
            </div>
          </div>

          {/* Deals grid */}
          <h2 className="heading-card" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>{t('trendingDeals')}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            
            {/* Deal 1 */}
            <div className="glass-card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                <div style={{ width: 52, height: 52, background: 'var(--text-primary)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--bg-primary)', fontWeight: 800, fontSize: '1.75rem', fontFamily: 'var(--font-outfit)' }}>N</div>
                <span style={{ background: 'var(--accent-violet-dim)', color: 'var(--accent-violet)', padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: 600 }}>{t('save')} 75%</span>
              </div>
              <h3 className="heading-card" style={{ marginBottom: '0.5rem' }}>Netflix Premium</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem', flex: 1, lineHeight: 1.6 }}>Join an existing family plan. 4K HDR streaming on 4 devices.</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>₹162<span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', fontWeight: 400 }}>/mo</span></div>
                  <div style={{ textDecoration: 'line-through', color: 'var(--text-tertiary)', fontSize: '0.8rem', marginTop: '0.2rem' }}>₹649/mo</div>
                </div>
                <button className="btn-primary" style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}>{t('joinSplit')}</button>
              </div>
            </div>

            {/* Deal 2 */}
            <div className="glass-card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                <div style={{ width: 52, height: 52, background: 'var(--text-primary)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--bg-primary)', fontWeight: 800, fontSize: '1.75rem', fontFamily: 'var(--font-outfit)' }}>S</div>
                <span style={{ background: 'var(--accent-violet-dim)', color: 'var(--accent-violet)', padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: 600 }}>{t('save')} 74%</span>
              </div>
              <h3 className="heading-card" style={{ marginBottom: '0.5rem' }}>Spotify Premium</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem', flex: 1, lineHeight: 1.6 }}>Ad-free music listening, offline playback, and better audio quality.</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>₹30<span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', fontWeight: 400 }}>/mo</span></div>
                  <div style={{ textDecoration: 'line-through', color: 'var(--text-tertiary)', fontSize: '0.8rem', marginTop: '0.2rem' }}>₹119/mo</div>
                </div>
                <button className="btn-primary" style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}>{t('joinSplit')}</button>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
