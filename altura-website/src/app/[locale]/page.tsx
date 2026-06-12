import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import RevealWrapper from '@/components/ui/RevealWrapper';
import SectionTag from '@/components/ui/SectionTag';
import GoldRule from '@/components/ui/GoldRule';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  return {
    title: isEn
      ? 'Altura Management Consulting | Strategic Advisory Africa & Europe'
      : 'Altura Management Consulting | Conseil Stratégique Afrique & Europe',
    description: isEn
      ? 'Precision consulting for high-stakes markets. Expert advisory in Telecom, Fintech, Financial Services and SaaS across Africa and Europe.'
      : 'Conseil de précision pour les marchés à enjeux élevés. Expertise en Télécom, Fintech, Services Financiers et SaaS en Afrique et en Europe.',
    openGraph: {
      title: 'Altura Management Consulting | Strategic Advisory Africa & Europe',
      description: 'Precision consulting for high-stakes markets.',
      url: 'https://alturaholdings.io',
      type: 'website',
    },
  };
}

const S: React.CSSProperties = {};

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });

  const stats = [
    { num: t('stat1Number'), label: t('stat1Label') },
    { num: t('stat2Number'), label: t('stat2Label') },
    { num: t('stat3Number'), label: t('stat3Label') },
    { num: t('stat4Number'), label: t('stat4Label') },
  ];

  const services = [
    { num: '01', badge: t('flagshipBadge'), name: t('service1Name'), desc: t('service1Desc'), slug: 'strategic-advisory' },
    { num: '02', badge: t('flagshipBadge'), name: t('service2Name'), desc: t('service2Desc'), slug: 'business-development' },
    { num: '03', badge: null, name: t('service3Name'), desc: t('service3Desc'), slug: 'digital-transformation' },
    { num: '04', badge: null, name: t('service4Name'), desc: t('service4Desc'), slug: 'ma-advisory' },
    { num: '05', badge: null, name: t('service5Name'), desc: t('service5Desc'), slug: 'license-acquisition' },
    { num: '06', badge: null, name: t('service6Name'), desc: t('service6Desc'), slug: 'market-intelligence' },
    { num: '07', badge: null, name: t('service7Name'), desc: t('service7Desc'), slug: 'governance-board' },
    { num: '08', badge: null, name: t('service8Name'), desc: t('service8Desc'), slug: 'capacity-building' },
  ];

  const sectors = [
    { id: '01', name: t('sector1Name'), desc: t('sector1Desc') },
    { id: '02', name: t('sector2Name'), desc: t('sector2Desc') },
    { id: '03', name: t('sector3Name'), desc: t('sector3Desc') },
    { id: '04', name: t('sector4Name'), desc: t('sector4Desc') },
    { id: '05', name: t('sector5Name'), desc: t('sector5Desc') },
  ];

  const whyItems = [
    { icon: '◈', title: t('why1Title'), desc: t('why1Desc') },
    { icon: '◎', title: t('why2Title'), desc: t('why2Desc') },
    { icon: '◉', title: t('why3Title'), desc: t('why3Desc') },
    { icon: '◐', title: t('why4Title'), desc: t('why4Desc') },
  ];

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section style={{ minHeight: '100vh', background: '#0B1622', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent 0%, #C9973A 30%, #E8C87A 70%, transparent 100%)' }} />

        {/* Concentric triangles */}
        <svg style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', opacity: 0.04, width: '900px', height: '900px', pointerEvents: 'none' }} viewBox="0 0 900 900">
          {[0,1,2,3,4].map(i => (
            <polygon key={i} points="450,60 860,780 40,780" fill="none" stroke="#C9973A" strokeWidth="1"
              style={{ transform: `scale(${1 - i*0.18})`, transformOrigin: '450px 450px' }} />
          ))}
        </svg>

        {/* Dot grid */}
        <svg style={{ position: 'absolute', inset: 0, opacity: 0.06, pointerEvents: 'none', width: '100%', height: '100%' }}>
          <defs>
            <pattern id="dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="#C9973A" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>

        {/* Glow */}
        <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(201,151,58,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

        {/* Content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: '1280px', margin: '0 auto', padding: '120px 32px 0', width: '100%', position: 'relative', zIndex: 1 }}>
          <GoldRule />
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C9973A', marginBottom: '28px', fontWeight: 500 }}>
            {t('eyebrow')}
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(52px, 7vw, 86px)', lineHeight: 1.05, marginBottom: '40px' }}>
            <span style={{ color: '#F5F0E8', display: 'block' }}>{t('headlineLine1')}</span>
            <span style={{ color: '#F5F0E8', display: 'block' }}>{t('headlineLine2')}</span>
            <span className="gold-gradient-text" style={{ display: 'block', fontStyle: 'italic' }}>{t('headlineLine3')}</span>
          </h1>

          {/* Two-axis descriptor */}
          <div style={{ marginBottom: '48px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '10px' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#4A6070', fontWeight: 500, minWidth: '140px' }}>{t('geoLabel')}</span>
              <div style={{ width: '1px', height: '16px', background: 'rgba(201,151,58,0.3)' }} />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#C4D4E4', letterSpacing: '0.05em' }}>{t('geoValue')}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#4A6070', fontWeight: 500, minWidth: '140px' }}>{t('sectorLabel')}</span>
              <div style={{ width: '1px', height: '16px', background: 'rgba(201,151,58,0.3)' }} />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#8A9BB0', letterSpacing: '0.03em' }}>{t('sectorValue')}</span>
            </div>
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px', flexWrap: 'wrap', marginBottom: '40px' }}>
            <Link href={`/${locale}/services`} style={{ display: 'inline-block', background: 'linear-gradient(135deg, #C9973A, #E8C87A)', color: '#0B1622', fontFamily: 'var(--font-body)', fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500, padding: '14px 28px', textDecoration: 'none' }}>
              {t('ctaPrimary')}
            </Link>
            <Link href={`/${locale}/contact`} style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#8A9BB0', textDecoration: 'none' }}>
              {t('ctaSecondary')}
            </Link>
          </div>

          {/* Trust */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '80px' }}>
            <div style={{ width: '24px', height: '1px', background: 'rgba(201,151,58,0.4)' }} />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#4A6070', letterSpacing: '0.1em' }}>{t('trustLabel')}</span>
          </div>
        </div>

        {/* Stats bar */}
        <div style={{ borderTop: '1px solid rgba(201,151,58,0.15)', background: 'rgba(11,22,34,0.8)', position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }} className="stats-grid">
            {stats.map((s, i) => (
              <div key={i} style={{ padding: '28px 24px', borderRight: i < 3 ? '1px solid rgba(201,151,58,0.1)' : 'none', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '30px', fontWeight: 300, color: '#C9973A', marginBottom: '4px' }}>{s.num}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8A9BB0' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: '100px', right: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 2 }}>
          <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, transparent, #C9973A)', animation: 'scrollPulse 2s infinite' }} />
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C9973A', writingMode: 'vertical-rl', opacity: 0.6 }}>{t('scrollLabel')}</span>
        </div>
        <style>{`
          @keyframes scrollPulse { 0%,100%{opacity:0.4} 50%{opacity:1} }
          @media(max-width:768px){ .stats-grid{grid-template-columns:repeat(2,1fr)!important} }
        `}</style>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section style={{ background: '#0F1E2E', padding: '100px 32px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <RevealWrapper>
            <SectionTag label={t('servicesTag')} />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px,4vw,52px)', fontWeight: 300, color: '#F5F0E8', marginBottom: '16px', lineHeight: 1.15 }}>{t('servicesTitle')}</h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#8A9BB0', maxWidth: '560px', lineHeight: 1.7, marginBottom: '56px' }}>{t('servicesSubtitle')}</p>
          </RevealWrapper>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }} className="flagship-grid">
            {services.slice(0,2).map((svc, i) => (
              <RevealWrapper key={svc.slug} delay={i as 0|1}>
                <ServiceCard svc={svc} locale={locale} flagship />
              </RevealWrapper>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px' }} className="services-grid">
            {services.slice(2).map((svc, i) => (
              <RevealWrapper key={svc.slug} delay={(i%3) as 0|1|2}>
                <ServiceCard svc={svc} locale={locale} />
              </RevealWrapper>
            ))}
          </div>
        </div>
        <style>{`
          @media(max-width:900px){ .flagship-grid{grid-template-columns:1fr!important} .services-grid{grid-template-columns:1fr 1fr!important} }
          @media(max-width:600px){ .services-grid{grid-template-columns:1fr!important} }
        `}</style>
      </section>

      {/* ═══ SECTORS ═══ */}
      <section style={{ background: '#0B1622', padding: '100px 32px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <RevealWrapper>
            <SectionTag label={t('sectorsTag')} />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px,4vw,52px)', fontWeight: 300, color: '#F5F0E8', marginBottom: '56px', lineHeight: 1.15 }}>{t('sectorsTitle')}</h2>
          </RevealWrapper>
          {sectors.map((sector, i) => (
            <RevealWrapper key={sector.id} delay={(i%3) as 0|1|2}>
              <Link href={`/${locale}/sectors`} style={{ textDecoration: 'none' }}>
                <div
                  style={{ display: 'grid', gridTemplateColumns: '80px 1fr 1fr auto', gap: '24px', alignItems: 'center', padding: '28px 24px', borderBottom: '1px solid rgba(201,151,58,0.08)', transition: 'background 0.2s', cursor: 'pointer' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#162030')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  className="sector-row"
                >
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#C9973A', letterSpacing: '0.1em' }}>{sector.id}</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '26px', fontWeight: 400, color: '#F5F0E8' }}>{sector.name}</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#8A9BB0', lineHeight: 1.6 }} className="sector-desc">{sector.desc}</span>
                  <span style={{ color: '#C9973A', fontSize: '18px' }}>→</span>
                </div>
              </Link>
            </RevealWrapper>
          ))}
        </div>
        <style>{`
          @media(max-width:768px){ .sector-row{grid-template-columns:60px 1fr auto!important} .sector-desc{display:none!important} }
        `}</style>
      </section>

      {/* ═══ WHY ALTURA ═══ */}
      <section style={{ background: '#0F1E2E', padding: '100px 32px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <RevealWrapper>
            <SectionTag label={t('whyTag')} />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px,4vw,52px)', fontWeight: 300, color: '#F5F0E8', marginBottom: '56px', lineHeight: 1.15 }}>{t('whyTitle')}</h2>
          </RevealWrapper>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '24px' }} className="why-grid">
            {whyItems.map((item, i) => (
              <RevealWrapper key={i} delay={(i%4) as 0|1|2|3}>
                <div style={{ background: '#0B1622', border: '1px solid rgba(201,151,58,0.1)', padding: '32px', height: '100%' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: '#C9973A', marginBottom: '16px' }}>{item.icon}</div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 400, color: '#F5F0E8', marginBottom: '12px' }}>{item.title}</h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#8A9BB0', lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
        <style>{`
          @media(max-width:900px){ .why-grid{grid-template-columns:1fr 1fr!important} }
          @media(max-width:600px){ .why-grid{grid-template-columns:1fr!important} }
        `}</style>
      </section>

      {/* ═══ FOUNDER ═══ */}
      <section style={{ background: '#0B1622', borderTop: '1px solid rgba(201,151,58,0.15)', padding: '100px 32px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <RevealWrapper>
            <SectionTag label={t('founderTag')} />
          </RevealWrapper>
          <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: '64px', alignItems: 'start' }} className="founder-grid">
            <RevealWrapper>
              <div style={{ background: '#0F1E2E', border: '1px solid rgba(201,151,58,0.1)', overflow: 'hidden' }}>
                <div style={{ width: '100%', aspectRatio: '3/4', background: 'linear-gradient(145deg, #0F1E2E, #162030)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                  <Image src="/jb-photo.jpg" alt="Jean Bosco Nkusi" fill style={{ objectFit: 'cover' }} onError={() => {}} />
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: '72px', color: 'rgba(201,151,58,0.15)', zIndex: -1 }}>JBN</div>
                </div>
                <div style={{ padding: '24px' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 400, color: '#F5F0E8', marginBottom: '4px' }}>{t('founderName')}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#C9973A', letterSpacing: '0.08em', marginBottom: '16px' }}>{t('founderRole')}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                    {['MTN','Tigo','FraudBuster'].map(tag => (
                      <span key={tag} style={{ fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '0.1em', color: '#8A9BB0', border: '1px solid rgba(201,151,58,0.2)', padding: '3px 8px' }}>{tag}</span>
                    ))}
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#4A6070', marginBottom: '6px' }}>{t('founderLang')}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#4A6070' }}>📍 {t('founderLocation')}</div>
                  <div style={{ marginTop: '16px', padding: '10px 12px', border: '1px solid rgba(201,151,58,0.2)', background: 'rgba(201,151,58,0.04)' }}>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C9973A', marginBottom: '4px' }}>Award</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#8A9BB0', lineHeight: 1.5 }}>{t('founderAward')}</div>
                  </div>
                </div>
              </div>
            </RevealWrapper>
            <RevealWrapper delay={1}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 300, color: '#F5F0E8', lineHeight: 1.65, marginBottom: '32px' }}>{t('founderBioShort')}</p>
              <div style={{ borderLeft: '2px solid #C9973A', paddingLeft: '20px', marginBottom: '32px' }}>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9973A', marginBottom: '8px' }}>Current Engagement</div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#8A9BB0', lineHeight: 1.6 }}>{t('founderEngagement')}</p>
              </div>
              <Link href={`/${locale}/about`} style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#C9973A', textDecoration: 'none', letterSpacing: '0.05em' }}>{t('founderBioLink')}</Link>
            </RevealWrapper>
          </div>
        </div>
        <style>{`@media(max-width:900px){ .founder-grid{grid-template-columns:1fr!important} }`}</style>
      </section>

      {/* ═══ CTA ═══ */}
      <section style={{ background: '#0F1E2E', padding: '100px 32px', textAlign: 'center' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <RevealWrapper>
            <GoldRule />
            <SectionTag label={t('ctaTag')} />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px,4vw,52px)', fontWeight: 300, color: '#F5F0E8', marginBottom: '16px', lineHeight: 1.15 }}>{t('ctaTitle')}</h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#8A9BB0', marginBottom: '40px', lineHeight: 1.7 }}>{t('ctaSubtitle')}</p>
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
              <Link href={`/${locale}/contact`} style={{ display: 'inline-block', background: 'linear-gradient(135deg, #C9973A, #E8C87A)', color: '#0B1622', fontFamily: 'var(--font-body)', fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500, padding: '16px 36px', textDecoration: 'none' }}>{t('ctaButton')}</Link>
              <a href="#" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#8A9BB0', textDecoration: 'none' }}>{t('ctaCalendly')}</a>
            </div>
          </RevealWrapper>
        </div>
      </section>
    </>
  );
}

function ServiceCard({ svc, locale, flagship = false }: { svc: { num: string; badge: string|null; name: string; desc: string; slug: string }; locale: string; flagship?: boolean }) {
  return (
    <div style={{ background: '#0B1622', border: '1px solid rgba(201,151,58,0.1)', padding: '32px', height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      {flagship && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, #C9973A, #E8C87A)' }} />}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '0.15em', color: '#4A6070' }}>{svc.num}</span>
        {svc.badge && <span style={{ fontFamily: 'var(--font-body)', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9973A', border: '1px solid rgba(201,151,58,0.3)', padding: '2px 8px' }}>{svc.badge}</span>}
      </div>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 400, color: '#F5F0E8', marginBottom: '12px', lineHeight: 1.2 }}>{svc.name}</h3>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#8A9BB0', lineHeight: 1.7, flex: 1, marginBottom: '24px' }}>{svc.desc}</p>
      <Link href={`/${locale}/services/${svc.slug}`} style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#C9973A', textDecoration: 'none', letterSpacing: '0.05em' }}>Explore →</Link>
    </div>
  );
}
