'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '../context/LanguageContext';
import { signOut } from 'next-auth/react';
import { 
  User, CreditCard, MapPin, Clock, Package, 
  Settings, PiggyBank, FileText, Mail, 
  HelpCircle, Star, Info, LogOut, Compass
} from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const navItems = [
    { label: t('explore'), icon: Compass, href: '/explore' },
    { label: t('profile'), icon: User, href: '/profile' },
    { label: t('payoutMethods'), icon: CreditCard, href: '#' },
    { label: t('myAddresses'), icon: MapPin, href: '#' },
    { label: t('orderHistory'), icon: Clock, href: '#' },
    { label: t('rentalHistory'), icon: Package, href: '#' },
    { label: t('settings'), icon: Settings, href: '#' },
    { label: t('moneySaved'), icon: PiggyBank, href: '#' },
    { label: t('blogsArticles'), icon: FileText, href: '#' },
    { label: t('aiMailbox'), icon: Mail, href: '#' },
    { label: t('helpSupport'), icon: HelpCircle, href: '#' },
    { label: t('reviewUs'), icon: Star, href: '#' },
    { label: t('appInfo'), icon: Info, href: '#' },
  ];

  return (
    <aside style={{
      width: '260px',
      minHeight: '100vh',
      background: 'var(--bg-secondary)',
      borderRight: '1px solid var(--border-subtle)',
      padding: '2rem 1rem',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1 }}>
        {navItems.map((item, idx) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link 
              key={idx} 
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                background: isActive ? 'var(--bg-card)' : 'transparent',
                textDecoration: 'none',
                fontWeight: isActive ? 600 : 500,
                fontSize: '0.9rem',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'var(--bg-card-hover)';
                  e.currentTarget.style.color = 'var(--text-primary)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }
              }}
            >
              <Icon size={18} strokeWidth={isActive ? 2.5 : 2} style={{ color: isActive ? 'var(--accent-violet)' : 'inherit' }} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      
      <button 
        onClick={() => signOut({ callbackUrl: '/' })}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          padding: '0.75rem 1rem',
          background: 'transparent',
          border: 'none',
          color: '#ef4444',
          fontWeight: 600,
          fontSize: '0.9rem',
          cursor: 'pointer',
          marginTop: '2rem',
          textAlign: 'left',
          borderRadius: 'var(--radius-md)',
          transition: 'background 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
        }}
      >
        <LogOut size={18} />
        <span>{t('logout')}</span>
      </button>
    </aside>
  );
}
