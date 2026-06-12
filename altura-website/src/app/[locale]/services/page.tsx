import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import RevealWrapper from '@/components/ui/RevealWrapper';
import SectionTag from '@/components/ui/SectionTag';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'en' ? 'Services | Altura Management Consulting' : 'Services | Altura Management Consulting',
    description: locale === 'en'
      ? 'Eight practice areas covering the full commercial lifecycle for telecom, fintech, and technology companies.'
      : "Huit domaines de pratique couvrant l'ensemble du cycle commercial.",
  };
}

type ServiceItem = {
  slug: string;
  number: string;
  badge: string | null;
  name: string;
  tagline: string;
  description: string;
  bullets: string[];
};

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services' });
  const items = t.raw('items') as ServiceItem[];

  return (
    <>
      <section style={{ background: '#0B1622', padding: '160px 32px 80px', borderBottom: '1px solid rgba(201,151,58,0.1)', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent 0%, #C9973A 30%, #E8C87A 70%, transparent 100%)' }} />
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <SectionTag label={t('tag')} />
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px,6vw,80px)', fontWeight: 300, lineHeight: 1.05 }}>
            <span style={{ color: '#F5F0E8' }}>{t('headlinePart1')} </span>
            <span className="gold-gradient-text" style={{ fontStyle: 'italic' }}>{t('headlinePart2')}</span>
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#8A9BB0', maxWidth: '600px', lineHeight: 1.75, marginTop: '24px' }}>{t('subtitle')}</p>
        </div>
      </section>

      <section style={{ background: '#0F1E2E', padding: '80px 32px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }} className="flagship-grid">
            {items.filter(s => s.badge).map((svc, i) => (
              <RevealWrapper key={svc.slug} delay={(i%2) as 0|1}>
                <ServiceCard svc={svc} locale={locale} flagship exploreLabel={t('exploreButton')} />
              </RevealWrapper>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px' }} className="services-grid">
            {items.filter(s => !s.badge).map((svc, i) => (
              <RevealWrapper key={svc.slug} delay={(i%3) as 0|1|2}>
                <ServiceCard svc={svc} locale={locale} exploreLabel={t('exploreButton')} />
              </RevealWrapper>
            ))}
          </div>
        </div>
        <style>{`
          @media(max-width:900px){ .flagship-grid{grid-template-columns:1fr!important} .services-grid{grid-template-columns:1fr 1fr!important} }
          @media(max-width:600px){ .services-grid{grid-template-columns:1fr!important} }
        `}</style>
      </section>
    </>
  );
}

function ServiceCard({ svc, locale, flagship = false, exploreLabel }: { svc: ServiceItem; locale: string; flagship?: boolean; exploreLabel: string }) {
  return (
    <div style={{ background: '#0B1622', border: '1px solid rgba(201,151,58,0.1)', padding: '36px', height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      {flagship && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, #C9973A, #E8C87A)' }} />}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '0.15em', color: '#4A6070' }}>{svc.number}</span>
        {svc.badge && <span style={{ fontFamily: 'var(--font-body)', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9973A', border: '1px solid rgba(201,151,58,0.3)', padding: '2px 8px' }}>{svc.badge}</span>}
      </div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 400, color: '#F5F0E8', marginBottom: '8px', lineHeight: 1.2 }}>{svc.name}</h2>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontStyle: 'italic', color: '#C9973A', marginBottom: '16px' }}>{svc.tagline}</div>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#8A9BB0', lineHeight: 1.7, marginBottom: '24px', flex: 1 }}>{svc.description}</p>
      <ul style={{ listStyle: 'none', padding: 0, marginBottom: '28px' }}>
        {svc.bullets.map((b, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontFamily: 'var(--font-body)', fontSize: '13px', color: '#8A9BB0', marginBottom: '8px' }}>
            <span style={{ color: '#C9973A', fontSize: '8px' }}>◆</span>{b}
          </li>
        ))}
      </ul>
      <Link href={`/${locale}/services/${svc.slug}`} style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#C9973A', textDecoration: 'none', letterSpacing: '0.05em' }}>{exploreLabel}</Link>
    </div>
  );
}
