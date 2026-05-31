'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../components/DashboardLayout';
import { useLanguage } from '../context/LanguageContext';
import Skeleton from '../components/Skeleton';
import { Camera, User } from 'lucide-react';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { t } = useLanguage();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  if (status === 'loading' || !session) {
    return (
      <DashboardLayout>
        <div className="section-container" style={{ paddingTop: '2rem' }}>
          <Skeleton height="240px" borderRadius="var(--radius-lg)" style={{ marginBottom: '4rem' }} />
          
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2rem', marginTop: '-7rem', paddingLeft: '2rem', position: 'relative', zIndex: 10 }}>
            <Skeleton width="120px" height="120px" borderRadius="50%" style={{ border: '4px solid var(--bg-primary)' }} />
          </div>

          <div style={{ marginTop: '3rem', padding: '0 2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem 2rem', maxWidth: '800px' }}>
              <div><Skeleton width="40%" height="1rem" style={{ marginBottom: '0.5rem' }} /><Skeleton width="80%" height="1.5rem" /></div>
              <div><Skeleton width="40%" height="1rem" style={{ marginBottom: '0.5rem' }} /><Skeleton width="80%" height="1.5rem" /></div>
              <div><Skeleton width="40%" height="1rem" style={{ marginBottom: '0.5rem' }} /><Skeleton width="80%" height="1.5rem" /></div>
              <div><Skeleton width="40%" height="1rem" style={{ marginBottom: '0.5rem' }} /><Skeleton width="80%" height="1.5rem" /></div>
            </div>
            <Skeleton width="200px" height="3rem" borderRadius="var(--radius-full)" style={{ marginTop: '3rem' }} />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="section-container" style={{ paddingTop: '2rem' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          
          {/* Promotional Banner */}
          <div style={{ 
            width: '100%', 
            height: '240px', 
            borderRadius: 'var(--radius-lg)', 
            background: 'linear-gradient(135deg, #4c1d95 0%, #1e1b4b 100%)',
            marginBottom: '4rem',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            padding: '2rem 4rem',
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(147, 51, 234, 0.2)'
          }}>
            {/* Banner Content (Mocked based on image) */}
            <div style={{ zIndex: 2 }}>
              <h2 style={{ fontSize: '3.5rem', fontWeight: 800, color: 'white', lineHeight: 1, fontFamily: 'var(--font-outfit)' }}>KYC</h2>
              <p style={{ fontSize: '1.75rem', color: 'rgba(255,255,255,0.9)', fontWeight: 500, marginTop: '0.5rem', fontFamily: 'var(--font-outfit)' }}>Know Your<br/>Customer</p>
            </div>
            
            {/* Decorative graphics for banner */}
            <div style={{ position: 'absolute', right: '10%', top: '50%', transform: 'translateY(-50%)', display: 'flex', gap: '2rem', opacity: 0.9 }}>
              <div style={{ width: 80, height: 160, background: 'rgba(255,255,255,0.1)', borderRadius: 12, border: '2px solid rgba(255,255,255,0.2)' }} />
              <div style={{ width: 80, height: 160, background: 'rgba(255,255,255,0.15)', borderRadius: 12, border: '2px solid rgba(255,255,255,0.3)', transform: 'scale(1.1) translateY(-10px)' }} />
              <div style={{ width: 80, height: 160, background: 'rgba(255,255,255,0.1)', borderRadius: 12, border: '2px solid rgba(255,255,255,0.2)' }} />
            </div>
          </div>

          {/* Profile Header (Avatar) */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2rem', marginTop: '-7rem', paddingLeft: '2rem', position: 'relative', zIndex: 10 }}>
            <div style={{ position: 'relative' }}>
              <div style={{ 
                width: 120, 
                height: 120, 
                borderRadius: '50%', 
                background: 'var(--bg-secondary)', 
                border: '6px solid var(--bg-primary)',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
              }}>
                {session.user?.image ? (
                  <img src={session.user.image} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <User size={48} color="var(--text-tertiary)" />
                )}
              </div>
              <button style={{
                position: 'absolute',
                bottom: 5,
                right: 5,
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: 'var(--accent-violet)',
                color: 'white',
                border: '3px solid var(--bg-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <Camera size={16} />
              </button>
            </div>
          </div>

          {/* Profile Details Grid */}
          <div style={{ marginTop: '3rem', padding: '0 2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem 2rem', maxWidth: '800px' }}>
              
              <div>
                <div style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', marginBottom: '0.4rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('fullName')}</div>
                <div style={{ color: 'var(--text-primary)', fontSize: '1.15rem', fontWeight: 600 }}>{session.user?.name}</div>
              </div>

              <div>
                <div style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', marginBottom: '0.4rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('username')}</div>
                <div style={{ color: 'var(--text-primary)', fontSize: '1.15rem', fontWeight: 600 }}>
                  {session.user?.email?.split('@')[0] || 'user123'}
                </div>
              </div>

              <div>
                <div style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', marginBottom: '0.4rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('email')}</div>
                <div style={{ color: 'var(--text-primary)', fontSize: '1.15rem', fontWeight: 600 }}>{session.user?.email}</div>
              </div>

              <div>
                <div style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', marginBottom: '0.4rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('phoneNumber')}</div>
                <div style={{ color: 'var(--text-primary)', fontSize: '1.15rem', fontWeight: 600 }}>+91 9432279870</div>
              </div>

            </div>

            <button className="btn-primary" style={{ marginTop: '3.5rem', padding: '0.85rem 2.5rem' }}>
              <span>{t('editProfile')}</span>
            </button>
          </div>

        </motion.div>
      </div>
    </DashboardLayout>
  );
}
