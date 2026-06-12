import Link from 'next/link';

export default function Footer({ locale }: { locale: string }) {
  const serviceLinks = [
    { label: 'Strategic Advisory', href: `/${locale}/services/strategic-advisory` },
    { label: 'Business Development', href: `/${locale}/services/business-development` },
    { label: 'Digital Transformation', href: `/${locale}/services/digital-transformation` },
    { label: 'M&A Advisory', href: `/${locale}/services/ma-advisory` },
    { label: 'License Acquisition', href: `/${locale}/services/license-acquisition` },
  ];
  const sectorLinks = [
    'Telecom',
    'Fintech & Payments',
    'Financial Services',
    'SaaS & Technology',
    'Government & Public Sector',
  ];

  const col: React.CSSProperties = { display: 'flex', flexDirection: 'column' };
  const label: React.CSSProperties = {
    fontFamily: 'var(--font-body)',
    fontSize: '10px',
    letterSpacing: '0.25em',
    textTransform: 'uppercase',
    color: '#C9973A',
    marginBottom: '20px',
    fontWeight: 500,
  };
  const linkStyle: React.CSSProperties = {
    fontFamily: 'var(--font-body)',
    fontSize: '13px',
    color: '#8A9BB0',
    textDecoration: 'none',
    marginBottom: '10px',
  };

  return (
    <footer
      style={{
        background: '#080F18',
        borderTop: '1px solid rgba(201,151,58,0.12)',
        padding: '64px 32px 32px',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div
          className="footer-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '48px',
            marginBottom: '56px',
          }}
        >
          {/* Brand */}
          <div style={col}>
            <Link href={`/${locale}`} style={{ textDecoration: 'none', marginBottom: '16px' }}>
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
            </Link>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '16px',
                fontStyle: 'italic',
                fontWeight: 300,
                color: '#8A9BB0',
                lineHeight: 1.6,
                marginTop: '12px',
                maxWidth: '240px',
              }}
            >
              Where Strategy Meets High-Stakes Reality.
            </p>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...linkStyle, marginTop: '24px' }}
            >
              LinkedIn ↗
            </a>
          </div>

          {/* Services */}
          <div style={col}>
            <div style={label}>Services</div>
            {serviceLinks.map((l) => (
              <Link key={l.href} href={l.href} style={linkStyle}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Sectors */}
          <div style={col}>
            <div style={label}>Sectors</div>
            {sectorLinks.map((s) => (
              <Link key={s} href={`/${locale}/sectors`} style={linkStyle}>
                {s}
              </Link>
            ))}
          </div>
        </div>

        <div
          style={{
            borderTop: '1px solid rgba(201,151,58,0.1)',
            paddingTop: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              color: '#4A6070',
            }}
          >
            © 2025 Altura Management Consulting SRL
          </span>
          <a
            href="mailto:jb.nkusi@alturaholdings.io"
            style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#4A6070', textDecoration: 'none' }}
          >
            jb.nkusi@alturaholdings.io
          </a>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </footer>
  );
}
