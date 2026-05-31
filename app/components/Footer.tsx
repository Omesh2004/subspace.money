'use client';

const footerLinks = {
  Product: [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Pricing', href: '#' },
    { label: 'Marketplace', href: '#' },
  ],
  Company: [
    { label: 'About Us', href: 'https://blogs.subspace.money/about-us' },
    { label: 'Contact', href: 'https://blogs.subspace.money/contact' },
    { label: 'Blog', href: 'https://subspace.money/blogs' },
    { label: 'Careers', href: '#' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: 'https://blogs.subspace.money/docs/whatsub-single-docs-subspace-policies-privacy-policy' },
    { label: 'Terms of Service', href: 'https://blogs.subspace.money/docs/whatsub-single-docs-subspace-policies-terms-and-conditions' },
    { label: 'Refund Policy', href: 'https://blogs.subspace.money/docs/whatsub-single-docs-subspace-policies-return-and-refund-policy' },
  ],
};

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-primary)', position: 'relative' }}>
      {/* Top gradient border */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, #8b5cf6, #06b6d4, transparent)', position: 'absolute', top: -1, left: 0, right: 0 }} />

      <div className="section-container" style={{ padding: '4rem 1.5rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1rem' }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 16, color: 'white' }}>S</div>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>subspace</span>
            </div>
            <p className="text-small" style={{ maxWidth: 220 }}>Your subscription management platform. Track, split, and save — all in one place.</p>
            {/* Social icons */}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
              {['𝕏', 'in', 'ig'].map((icon) => (
                <a key={icon} href="#" style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600, transition: 'all 0.2s' }}>{icon}</a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{title}</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} style={{ color: 'var(--text-tertiary)', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')} onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-tertiary)')}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <p className="text-small">© {new Date().getFullYear()} Subspace. All rights reserved.</p>
          <p className="text-small">Made with 💜 in India</p>
        </div>
      </div>
    </footer>
  );
}
