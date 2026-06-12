import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import RevealWrapper from '@/components/ui/RevealWrapper';
import SectionTag from '@/components/ui/SectionTag';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'en' ? 'Insights & Analysis | Altura Management Consulting' : 'Analyses & Perspectives | Altura Management Consulting',
    description: locale === 'en'
      ? 'Strategic perspectives on African telecom, fintech, mobile money, and high-stakes markets.'
      : 'Perspectives stratégiques sur les télécoms africains, la fintech, le mobile money et les marchés à enjeux élevés.',
  };
}

type Article = { slug: string; category: string; date: string; readTime: number; title: string; excerpt: string; featured: boolean };

export default async function InsightsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'insights' });
  const articles = t.raw('articles') as Article[];
  const featured = articles.find(a => a.featured);
  const rest = articles.filter(a => !a.featured);

  return (
    <>
      {/* Hero */}
      <section style={{ background: '#0B1622', padding: '160px 32px 80px', borderBottom: '1px solid rgba(201,151,58,0.1)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent 0%, #C9973A 30%, #E8C87A 70%, transparent 100%)' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontFamily: 'var(--font-display)', fontSize: 'clamp(100px,18vw,240px)', fontWeight: 300, color: 'rgba(201,151,58,0.04)', whiteSpace: 'nowrap', pointerEvents: 'none', userSelect: 'none' }}>INSIGHTS</div>
        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>
          <SectionTag label={t('tag')} />
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px,6vw,80px)', fontWeight: 300, lineHeight: 1.05 }}>
            <span style={{ color: '#F5F0E8' }}>{t('headlinePart1')} </span>
            <span className="gold-gradient-text" style={{ fontStyle: 'italic' }}>{t('headlinePart2')}</span>
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#8A9BB0', maxWidth: '520px', lineHeight: 1.75, marginTop: '20px' }}>{t('subtitle')}</p>
        </div>
      </section>

      {/* Featured */}
      {featured && (
        <section style={{ background: '#0F1E2E', padding: '60px 32px' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <RevealWrapper>
              <Link href={`/${locale}/insights/${featured.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', border: '1px solid rgba(201,151,58,0.15)', overflow: 'hidden' }} className="featured-card">
                  <div style={{ padding: '48px' }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '24px' }}>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9973A', border: '1px solid rgba(201,151,58,0.3)', padding: '3px 8px' }}>{t('featuredLabel')}</span>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#4A6070' }}>{featured.category}</span>
                    </div>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px,3vw,36px)', fontWeight: 400, color: '#F5F0E8', lineHeight: 1.25, marginBottom: '20px' }}>{featured.title}</h2>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#8A9BB0', lineHeight: 1.75, marginBottom: '32px' }}>{featured.excerpt}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#4A6070' }}>{featured.date}</span>
                      <span style={{ color: '#4A6070' }}>·</span>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#4A6070' }}>{featured.readTime} {t('readTime')}</span>
                      <span style={{ marginLeft: 'auto', color: '#C9973A', fontSize: '16px' }}>→</span>
                    </div>
                  </div>
                  <div style={{ background: 'linear-gradient(135deg, #162030, #0B1622)', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '320px', position: 'relative', overflow: 'hidden' }}>
                    <svg viewBox="0 0 400 400" width="300" height="300" style={{ opacity: 0.3 }}>
                      <polygon points="200,30 370,330 30,330" fill="none" stroke="#C9973A" strokeWidth="1" />
                      <polygon points="200,80 320,290 80,290" fill="none" stroke="#C9973A" strokeWidth="1" />
                      <polygon points="200,130 270,250 130,250" fill="none" stroke="#C9973A" strokeWidth="1" />
                      <polygon points="200,180 220,210 180,210" fill="none" stroke="#E8C87A" strokeWidth="1" />
                    </svg>
                    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(201,151,58,0.05) 0%, transparent 70%)' }} />
                  </div>
                </div>
              </Link>
            </RevealWrapper>
          </div>
          <style>{`@media(max-width:768px){ .featured-card{grid-template-columns:1fr!important} .featured-card>div:last-child{min-height:200px!important} }`}</style>
        </section>
      )}

      {/* Filters */}
      <section style={{ background: '#0B1622', padding: '32px 32px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['All','Mobile Money','Telecom Strategy','Fraud & Risk','Market Entry','Advisory','Regulation','M&A'].map((cat, i) => (
            <span key={cat} style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: i === 0 ? '#C9973A' : '#8A9BB0', border: `1px solid ${i === 0 ? '#C9973A' : 'rgba(201,151,58,0.15)'}`, padding: '6px 14px', cursor: 'pointer' }}>
              {i === 0 ? t('filterAll') : cat}
            </span>
          ))}
        </div>
      </section>

      {/* Articles grid */}
      <section style={{ background: '#0B1622', padding: '40px 32px 80px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px' }} className="articles-grid">
            {rest.map((article, i) => (
              <RevealWrapper key={article.slug} delay={(i%3) as 0|1|2}>
                <Link href={`/${locale}/insights/${article.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                  <div
                    style={{ background: '#0F1E2E', border: '1px solid rgba(201,151,58,0.1)', padding: '28px', height: '100%', display: 'flex', flexDirection: 'column', transition: 'border-color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(201,151,58,0.3)')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(201,151,58,0.1)')}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9973A' }}>{article.category}</span>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: '#4A6070' }}>{article.date}</span>
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 400, color: '#F5F0E8', lineHeight: 1.3, marginBottom: '12px', flex: 1 }}>{article.title}</h3>
                    <p className="line-clamp-3" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#8A9BB0', lineHeight: 1.7, marginBottom: '20px' }}>{article.excerpt}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#4A6070' }}>{article.readTime} {t('readTime')}</span>
                      <span style={{ color: '#C9973A', fontSize: '16px' }}>→</span>
                    </div>
                  </div>
                </Link>
              </RevealWrapper>
            ))}
          </div>
        </div>
        <style>{`
          @media(max-width:900px){ .articles-grid{grid-template-columns:1fr 1fr!important} }
          @media(max-width:600px){ .articles-grid{grid-template-columns:1fr!important} }
        `}</style>
      </section>

      {/* Newsletter */}
      <section style={{ background: '#0F1E2E', padding: '80px 32px', borderTop: '1px solid rgba(201,151,58,0.1)' }}>
        <div style={{ maxWidth: '560px', margin: '0 auto', textAlign: 'center' }}>
          <RevealWrapper>
            <SectionTag label="Newsletter" />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3vw,40px)', fontWeight: 300, color: '#F5F0E8', marginBottom: '12px', lineHeight: 1.2 }}>{t('newsletterTitle')}</h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#8A9BB0', marginBottom: '32px', lineHeight: 1.7 }}>{t('newsletterSubtitle')}</p>
            <div style={{ display: 'flex', gap: '0' }}>
              <input type="email" placeholder={t('newsletterPlaceholder')} style={{ flex: 1, background: '#0B1622', border: '1px solid rgba(201,151,58,0.2)', borderRight: 'none', padding: '14px 20px', color: '#F5F0E8', fontFamily: 'var(--font-body)', fontSize: '13px', outline: 'none' }} />
              <button style={{ background: 'linear-gradient(135deg, #C9973A, #E8C87A)', color: '#0B1622', border: 'none', padding: '14px 24px', fontFamily: 'var(--font-body)', fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 500, cursor: 'pointer' }}>{t('newsletterButton')}</button>
            </div>
          </RevealWrapper>
        </div>
      </section>
    </>
  );
}
