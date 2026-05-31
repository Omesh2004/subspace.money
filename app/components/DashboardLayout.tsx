'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import searchData from '../data/searchData.json';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import Sidebar from './Sidebar';
import { Search, Sun, Moon, ChevronDown, Check, User } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  
  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(searchData);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const results = searchData.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        
        {/* Dashboard Navbar */}
        <nav className="glass-navbar" style={{ padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 18, color: 'var(--bg-primary)', fontFamily: 'var(--font-outfit)' }}>S</div>
            <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-outfit)' }}>subspace</span>
          </Link>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            
            {/* Search */}
            <div style={{ position: 'relative' }} ref={searchRef}>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => { if(searchQuery.length > 0) setShowResults(true); }}
                placeholder={t('searchPlaceholder')}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-full)',
                  padding: '0.6rem 1rem 0.6rem 2.75rem',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  width: '280px',
                  transition: 'border-color 0.2s',
                }}
                onFocusCapture={(e) => e.target.style.borderColor = 'var(--accent-violet)'}
                onBlurCapture={(e) => e.target.style.borderColor = 'var(--border-subtle)'}
              />
              <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
              
              {/* Search Results Dropdown */}
              {showResults && (
                <div style={{
                  position: 'absolute',
                  top: 'calc(100% + 0.5rem)',
                  left: 0,
                  right: 0,
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  maxHeight: '300px',
                  overflowY: 'auto',
                  zIndex: 100,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                }}>
                  {searchResults.length > 0 ? (
                    <div style={{ padding: '0.5rem' }}>
                      {searchResults.map((item) => (
                        <Link 
                          key={item.id}
                          href={item.url}
                          onClick={() => { setShowResults(false); setSearchQuery(''); }}
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '0.75rem',
                            borderRadius: 'var(--radius-sm)',
                            textDecoration: 'none',
                            color: 'var(--text-primary)',
                            transition: 'background 0.2s'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-card)'}
                          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                        >
                          <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{item.title}</span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '0.2rem' }}>{item.category}</span>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div style={{ padding: '1.5rem 1rem', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                      No results found for "{searchQuery}"
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Language Selector */}
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="btn-outline"
                style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderRadius: 'var(--radius-full)' }}
              >
                <span>{language === 'en' ? 'EN' : 'हिं'}</span>
                <ChevronDown size={14} />
              </button>
              
              {langMenuOpen && (
                <div style={{
                  position: 'absolute',
                  top: '120%',
                  right: 0,
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.5rem',
                  minWidth: '160px',
                  zIndex: 50,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-tertiary)', padding: '0.5rem', borderBottom: '1px solid var(--border-subtle)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {t('language')}
                  </div>
                  <button 
                    onClick={() => { setLanguage('en'); setLangMenuOpen(false); }}
                    style={{ width: '100%', textAlign: 'left', padding: '0.6rem 0.75rem', background: language === 'en' ? 'var(--accent-violet-dim)' : 'transparent', color: language === 'en' ? 'var(--accent-violet)' : 'var(--text-primary)', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem', fontWeight: language === 'en' ? 600 : 500 }}
                  >
                    <span>{t('english')}</span>
                    {language === 'en' && <Check size={16} />}
                  </button>
                  <button 
                    onClick={() => { setLanguage('hi'); setLangMenuOpen(false); }}
                    style={{ width: '100%', textAlign: 'left', padding: '0.6rem 0.75rem', background: language === 'hi' ? 'var(--accent-violet-dim)' : 'transparent', color: language === 'hi' ? 'var(--accent-violet)' : 'var(--text-primary)', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem', fontWeight: language === 'hi' ? 600 : 500, marginTop: '0.25rem' }}
                  >
                    <span>{t('hindi')}</span>
                    {language === 'hi' && <Check size={16} />}
                  </button>
                </div>
              )}
            </div>

            {/* Theme Toggle (Sliding Switch) */}
            <button 
              onClick={toggleTheme}
              style={{
                width: 64,
                height: 32,
                borderRadius: '16px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                position: 'relative',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '0 4px',
                transition: 'background 0.3s ease, border-color 0.3s ease'
              }}
              aria-label="Toggle Theme"
            >
              {/* Background Icons */}
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', padding: '0 4px', opacity: 0.6 }}>
                <Sun size={14} color="var(--text-tertiary)" />
                <Moon size={14} color="var(--text-tertiary)" />
              </div>
              
              {/* Sliding Thumb */}
              <div style={{
                position: 'absolute',
                left: theme === 'dark' ? 34 : 4,
                width: 24,
                height: 24,
                borderRadius: '50%',
                background: 'var(--text-primary)', 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
                color: 'var(--bg-primary)',
                boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                zIndex: 2
              }}>
                {theme === 'dark' ? <Moon size={14} fill="currentColor" /> : <Sun size={14} fill="currentColor" />}
              </div>
            </button>

            {/* Profile Avatar */}
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                style={{ 
                  width: 42, 
                  height: 42, 
                  borderRadius: '50%', 
                  padding: '2px', 
                  background: 'var(--accent-violet)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  cursor: 'pointer',
                  border: 'none',
                  outline: 'none'
                }}
              >
                {session?.user?.image ? (
                  <img src={session.user.image} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--bg-nav)' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', borderRadius: '50%', border: '2px solid var(--bg-nav)', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <User size={18} color="var(--text-tertiary)" />
                  </div>
                )}
              </button>

              {/* Profile Dropdown */}
              {profileMenuOpen && (
                <div style={{
                  position: 'absolute',
                  top: '120%',
                  right: 0,
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.5rem',
                  minWidth: '160px',
                  zIndex: 50,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                }}>
                  <div style={{ padding: '0.5rem', borderBottom: '1px solid var(--border-subtle)', marginBottom: '0.5rem' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                      {session?.user?.name || 'User'}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                      {session?.user?.email}
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => {
                      import('next-auth/react').then((mod) => mod.signOut({ callbackUrl: '/' }));
                    }}
                    style={{ 
                      width: '100%', 
                      textAlign: 'left', 
                      padding: '0.6rem 0.75rem', 
                      background: 'transparent', 
                      color: '#ef4444', 
                      border: 'none', 
                      borderRadius: 'var(--radius-sm)', 
                      cursor: 'pointer', 
                      display: 'flex', 
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.9rem', 
                      fontWeight: 500,
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <span style={{ transform: 'scale(-1, 1)' }}>🚪</span>
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <main style={{ flex: 1, overflowY: 'auto', paddingBottom: '4rem' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
