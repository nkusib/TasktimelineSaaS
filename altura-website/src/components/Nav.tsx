'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavProps {
  locale: string;
  messages: {
    services: string;
    sectors: string;
    about: string;
    insights: string;
    langToggle: string;
    contactCta: string;
  };
}

export default function Nav({ locale, messages }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const otherLocale = locale === 'en' ? 'fr' : 'en';
  const switchPath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  const links = [
    { href: `/${locale}/services`, label: messages.services },
    { href: `/${locale}/sectors`, label: messages.sectors },
    { href: `/${locale}/about`, label: messages.about },
    { href: `/${locale}/insights`, label: messages.insights },
  ];

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/');

  const navBg: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    transition: 'background 0.3s ease, border-color 0.3s ease',
    background: scrolled ? 'rgba(11,22,34,0.97)' : 'transparent',
    borderBottom: scrolled
      ? '1px solid rgba(201,151,58,0.12)'
      : '1px solid transparent',
    backdropFilter: scrolled ? 'blur(12px)' : 'none',
  };

  return (
    <nav style={navBg}>
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 32px',
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Link href={`/${locale}`} style={{ textDecoration: 'none' }}>
          <div style={{ lineHeight: 1 }}>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '22px',
                fontWeight: 300,
                letterSpacing: '0.18em',
                color: '#F5F0E8',
                textTransform: 'uppercase',
              }}
            >
              ALTURA
            </div>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '9px',
                letterSpacing: '0.22em',
                color: '#8A9BB0',
                textTransform: 'uppercase',
                marginTop: '2px',
              }}
            >
              Management Consulting
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <div
          className="altura-desktop-nav"
          style={{ display: 'flex', alignItems: 'center', gap: '32px' }}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: isActive(link.href) ? '#C9973A' : '#8A9BB0',
                textDecoration: 'none',
                fontWeight: isActive(link.href) ? 500 : 400,
              }}
            >
              {link.label}
            </Link>
          ))}
          <div
            style={{
              width: '1px',
              height: '16px',
              background: 'rgba(201,151,58,0.2)',
            }}
          />
          <Link
            href={switchPath}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '11px',
              letterSpacing: '0.15em',
              color: '#8A9BB0',
              textDecoration: 'none',
              textTransform: 'uppercase',
            }}
          >
            {messages.langToggle}
          </Link>
          <Link
            href={`/${locale}/contact`}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              letterSpacing: '0.1em',
              color: '#C9973A',
              textDecoration: 'none',
              textTransform: 'uppercase',
              fontWeight: 500,
            }}
          >
            {messages.contactCta}
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="altura-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            flexDirection: 'column',
            gap: '5px',
          }}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: 'block',
                width: '22px',
                height: '1px',
                background: '#F5F0E8',
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            background: 'rgba(11,22,34,0.98)',
            borderTop: '1px solid rgba(201,151,58,0.1)',
            padding: '24px 32px 32px',
          }}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: isActive(link.href) ? '#C9973A' : '#F5F0E8',
                textDecoration: 'none',
                padding: '12px 0',
                borderBottom: '1px solid rgba(201,151,58,0.08)',
              }}
            >
              {link.label}
            </Link>
          ))}
          <div
            style={{
              marginTop: '20px',
              display: 'flex',
              gap: '24px',
              alignItems: 'center',
            }}
          >
            <Link
              href={switchPath}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                color: '#8A9BB0',
                textDecoration: 'none',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              {messages.langToggle}
            </Link>
            <Link
              href={`/${locale}/contact`}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                color: '#C9973A',
                textDecoration: 'none',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontWeight: 500,
              }}
            >
              {messages.contactCta}
            </Link>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .altura-desktop-nav { display: none !important; }
          .altura-hamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
