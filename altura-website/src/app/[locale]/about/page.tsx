import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import RevealWrapper from '@/components/ui/RevealWrapper';
import SectionTag from '@/components/ui/SectionTag';
import GoldRule from '@/components/ui/GoldRule';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'en' ? 'Jean Bosco Nkusi — Founder | Altura Management Consulting' : 'Jean Bosco Nkusi — Fondateur | Altura Management Consulting',
    description: locale === 'en'
      ? 'Former CEO MTN Mobile Money Congo. 15+ years in African telecom and fintech. Founder of Altura Management Consulting.'
      : "Ancien PDG de MTN Mobile Money Congo. Plus de 15 ans dans les télécoms et la fintech africaines. Fondateur d'Altura Management Consulting.",
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  const stats = [
    { num: t('stat1Number'), label: t('stat1Label') },
    { num: t('stat2Number'), label: t('stat2Label') },
    { num: t('stat3Number'), label: t('stat3Label') },
  ];
  const timeline = [
    { title: t('timeline1Title'), period: t('timeline1Period'), desc: t('timeline1Desc') },
    { title: t('timeline2Title'), period: t('timeline2Period'), desc: t('timeline2Desc') },
    { title: t('timeline3Title'), period: t('timeline3Period'), desc: t('timeline3Desc') },
  ];
  const engagements = [
    { name: t('engagement1Name'), role: t('engagement1Role'), badge: t('engagement1Badge') },
    { name: t('engagement2Name'), role: t('engagement2Role'), badge: t('engagement2Badge') },
  ];

  const h2 = { fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,4vw,48px)', fontWeight: 300, color: '#F5F0E8', lineHeight: 1.15 } as React.CSSProperties;

  return (
    <>
      {/* Hero */}
      <section style={{ background: '#0B1622', padding: '160px 32px 80px', borderBottom: '1px solid rgba(201,151,58,0.1)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent 0%, #C9973A 30%, #E8C87A 70%, transparent 100%)' }} />
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <SectionTag label={t('tag')} />
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px,6vw,80px)', fontWeight: 300, lineHeight: 1.05 }}>
            <span style={{ color: '#F5F0E8' }}>{t('headlinePart1')} </span>
            <span className="gold-gradient-text" style={{ fontStyle: 'italic' }}>{t('headlinePart2')}</span>
          </h1>
        </div>
      </section>

      {/* Profile */}
      <section style={{ background: '#0F1E2E', padding: '80px 32px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '64px', alignItems: 'start' }} className="profile-grid">
            <RevealWrapper>
              <div style={{ background: '#0B1622', border: '1px solid rgba(201,151,58,0.1)', overflow: 'hidden' }}>
                <div style={{ width: '100%', aspectRatio: '3/4', background: 'linear-gradient(145deg,#0F1E2E,#162030)', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Image src="/jb-photo.jpg" alt="Jean Bosco Nkusi" fill style={{ objectFit: 'cover' }} onError={() => {}} />
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: '64px', color: 'rgba(201,151,58,0.15)', zIndex: -1 }}>JBN</div>
                </div>
                <div style={{ padding: '24px' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 400, color: '#F5F0E8', marginBottom: '4px' }}>Jean Bosco Nkusi</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#C9973A', letterSpacing: '0.08em', marginBottom: '16px' }}>{t('role')}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                    {['MTN','Tigo','FraudBuster','CEMAC'].map(tag => (
                      <span key={tag} style={{ fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '0.1em', color: '#8A9BB0', border: '1px solid rgba(201,151,58,0.2)', padding: '3px 8px' }}>{tag}</span>
                    ))}
                  </div>
                  <div style={{ borderTop: '1px solid rgba(201,151,58,0.1)', paddingTop: '16px' }}>
                    {[['Languages', t('languages')], ['Education', t('education')], ['Based in', t('location')]].map(([k, v]) => (
                      <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: '#4A6070', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{k}</span>
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#8A9BB0' }}>{v}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: '16px', padding: '12px', border: '1px solid rgba(201,151,58,0.2)', background: 'rgba(201,151,58,0.04)' }}>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C9973A', marginBottom: '6px' }}>Award</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#8A9BB0', lineHeight: 1.5 }}>{t('awardTitle')}</div>
                  </div>
                </div>
              </div>
            </RevealWrapper>

            <RevealWrapper delay={1}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 300, color: '#F5F0E8', lineHeight: 1.7, marginBottom: '28px' }}>{t('bio')}</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#8A9BB0', lineHeight: 1.75, marginBottom: '28px' }}>{t('bio2')}</p>
              <div style={{ background: '#0B1622', border: '1px solid rgba(201,151,58,0.2)', padding: '24px', marginBottom: '28px' }}>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9973A', marginBottom: '8px' }}>Distinction</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 400, color: '#F5F0E8', marginBottom: '8px' }}>{t('awardTitle')}</div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#8A9BB0', lineHeight: 1.6 }}>{t('awardDesc')}</p>
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#8A9BB0', lineHeight: 1.75, marginBottom: '28px' }}>{t('bio3')}</p>
              <div style={{ borderLeft: '2px solid #C9973A', paddingLeft: '20px', marginBottom: '28px' }}>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9973A', marginBottom: '8px' }}>{t('currentEngagementLabel')}</div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#8A9BB0', lineHeight: 1.6 }}>{t('currentEngagement')}</p>
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#8A9BB0', lineHeight: 1.75 }}>{t('bio4')}</p>
            </RevealWrapper>
          </div>
        </div>
        <style>{`@media(max-width:900px){ .profile-grid{grid-template-columns:1fr!important} }`}</style>
      </section>

      {/* Achievements */}
      <section style={{ background: '#0B1622', padding: '80px 32px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <RevealWrapper><SectionTag label="Key Achievements" /></RevealWrapper>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px', marginTop: '32px' }} className="achievements-grid">
            {stats.map((s, i) => (
              <RevealWrapper key={i} delay={(i%3) as 0|1|2}>
                <div style={{ background: '#0F1E2E', border: '1px solid rgba(201,151,58,0.1)', padding: '40px 32px', textAlign: 'center' }}>
                  <div className="gold-gradient-text" style={{ fontFamily: 'var(--font-display)', fontSize: '52px', fontWeight: 300, marginBottom: '8px' }}>{s.num}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8A9BB0' }}>{s.label}</div>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:768px){ .achievements-grid{grid-template-columns:1fr!important} }`}</style>
      </section>

      {/* Timeline */}
      <section style={{ background: '#0F1E2E', padding: '80px 32px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <RevealWrapper><SectionTag label={t('timelineTitle')} /></RevealWrapper>
          <div style={{ marginTop: '40px' }}>
            {timeline.map((item, i) => (
              <RevealWrapper key={i} delay={(i%3) as 0|1|2}>
                <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '32px', padding: '32px 0', borderBottom: '1px solid rgba(201,151,58,0.08)' }} className="timeline-row">
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 400, color: '#F5F0E8', marginBottom: '4px' }}>{item.title}</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '0.1em', color: '#C9973A' }}>{item.period}</div>
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#8A9BB0', lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:768px){ .timeline-row{grid-template-columns:1fr!important} }`}</style>
      </section>

      {/* Current Engagements */}
      <section style={{ background: '#0B1622', padding: '80px 32px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <RevealWrapper><SectionTag label={t('engagementsTitle')} /></RevealWrapper>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '32px' }} className="engagements-grid">
            {engagements.map((e, i) => (
              <RevealWrapper key={i} delay={(i%2) as 0|1}>
                <div style={{ background: '#0F1E2E', border: '1px solid rgba(201,151,58,0.1)', padding: '32px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 400, color: '#F5F0E8' }}>{e.name}</div>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C9973A', border: '1px solid rgba(201,151,58,0.3)', padding: '3px 8px' }}>{e.badge}</span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#8A9BB0', lineHeight: 1.6 }}>{e.role}</div>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:768px){ .engagements-grid{grid-template-columns:1fr!important} }`}</style>
      </section>

      {/* CTA */}
      <section style={{ background: '#0F1E2E', padding: '80px 32px', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <RevealWrapper>
            <GoldRule />
            <h2 style={{ ...h2, marginBottom: '32px' }}>{t('ctaTitle')}</h2>
            <Link href={`/${locale}/contact`} style={{ display: 'inline-block', background: 'linear-gradient(135deg, #C9973A, #E8C87A)', color: '#0B1622', fontFamily: 'var(--font-body)', fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500, padding: '14px 28px', textDecoration: 'none' }}>{t('ctaButton')}</Link>
          </RevealWrapper>
        </div>
      </section>
    </>
  );
}
