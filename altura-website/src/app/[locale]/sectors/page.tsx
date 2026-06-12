import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import RevealWrapper from '@/components/ui/RevealWrapper';
import SectionTag from '@/components/ui/SectionTag';
import GoldRule from '@/components/ui/GoldRule';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'en' ? 'Sectors | Altura Management Consulting' : 'Secteurs | Altura Management Consulting',
    description: locale === 'en'
      ? 'Deep vertical expertise in Telecom, Fintech, Financial Services, SaaS, and Government across African and European markets.'
      : 'Expertise verticale approfondie en Télécom, Fintech, Services Financiers, SaaS et Gouvernement.',
  };
}

type SectorItem = { id: string; name: string; description: string; details: string };

export default async function SectorsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'sectors' });
  const items = t.raw('items') as SectorItem[];

  return (
    <>
      <section style={{ background: '#0B1622', padding: '160px 32px 80px', borderBottom: '1px solid rgba(201,151,58,0.1)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent 0%, #C9973A 30%, #E8C87A 70%, transparent 100%)' }} />
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <SectionTag label={t('tag')} />
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px,6vw,80px)', fontWeight: 300, lineHeight: 1.05 }}>
            <span style={{ color: '#F5F0E8' }}>{t('headlinePart1')} </span>
            <span className="gold-gradient-text" style={{ fontStyle: 'italic' }}>{t('headlinePart2')}</span>
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#8A9BB0', maxWidth: '580px', lineHeight: 1.75, marginTop: '24px' }}>{t('subtitle')}</p>
        </div>
      </section>

      <section style={{ background: '#0F1E2E', padding: '80px 32px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          {items.map((sector, i) => (
            <RevealWrapper key={sector.id} delay={(i%3) as 0|1|2}>
              <div
                style={{ display: 'grid', gridTemplateColumns: '80px 1fr 1fr auto', gap: '32px', alignItems: 'start', padding: '40px 24px', borderBottom: '1px solid rgba(201,151,58,0.08)', transition: 'background 0.2s', cursor: 'default' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#162030')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                className="sector-full-row"
              >
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '13px', color: '#C9973A', letterSpacing: '0.1em' }}>{sector.id}</span>
                <div>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 400, color: '#F5F0E8', marginBottom: '8px' }}>{sector.name}</h2>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#C9973A', letterSpacing: '0.05em' }}>{sector.description}</p>
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#8A9BB0', lineHeight: 1.7 }} className="sector-details">{sector.details}</p>
                <span style={{ color: '#C9973A', fontSize: '20px', paddingTop: '8px' }}>→</span>
              </div>
            </RevealWrapper>
          ))}
        </div>
        <style>{`
          @media(max-width:900px){ .sector-full-row{grid-template-columns:60px 1fr auto!important} .sector-details{display:none!important} }
          @media(max-width:600px){ .sector-full-row{grid-template-columns:1fr!important} }
        `}</style>
      </section>

      <section style={{ background: '#0B1622', padding: '80px 32px', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <RevealWrapper>
            <GoldRule />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,4vw,48px)', fontWeight: 300, color: '#F5F0E8', marginBottom: '16px', lineHeight: 1.15 }}>Operating in one of these sectors?</h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#8A9BB0', marginBottom: '32px', lineHeight: 1.7 }}>Discuss your specific needs with Jean Bosco directly.</p>
            <Link href={`/${locale}/contact`} style={{ display: 'inline-block', background: 'linear-gradient(135deg, #C9973A, #E8C87A)', color: '#0B1622', fontFamily: 'var(--font-body)', fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500, padding: '14px 28px', textDecoration: 'none' }}>Request a Proposal</Link>
          </RevealWrapper>
        </div>
      </section>
    </>
  );
}
