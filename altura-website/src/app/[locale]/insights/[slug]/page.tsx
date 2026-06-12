import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import GoldRule from '@/components/ui/GoldRule';

type Article = { slug: string; category: string; date: string; readTime: number; title: string; excerpt: string; featured: boolean; lead: string; body: string };

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'insights' });
  const articles = t.raw('articles') as Article[];
  const article = articles.find(a => a.slug === slug);
  if (!article) return {};
  return { title: `${article.title} | Altura Management Consulting`, description: article.excerpt };
}

export default async function ArticlePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'insights' });
  const articles = t.raw('articles') as Article[];
  const article = articles.find(a => a.slug === slug);
  if (!article) notFound();
  const related = articles.filter(a => a.slug !== slug).slice(0, 3);

  return (
    <>
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, #C9973A, #E8C87A)', zIndex: 200 }} />

      <section style={{ background: '#0B1622', padding: '140px 32px 60px', borderBottom: '1px solid rgba(201,151,58,0.1)', position: 'relative' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Link href={`/${locale}/insights`} style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#8A9BB0', textDecoration: 'none', letterSpacing: '0.1em', display: 'inline-block', marginBottom: '32px' }}>{t('backButton')}</Link>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '24px' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9973A', border: '1px solid rgba(201,151,58,0.3)', padding: '3px 8px' }}>{article.category}</span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#4A6070' }}>{article.date}</span>
            <span style={{ color: '#4A6070' }}>·</span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#4A6070' }}>{article.readTime} {t('readTime')}</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,5vw,56px)', fontWeight: 300, color: '#F5F0E8', lineHeight: 1.15 }}>{article.title}</h1>
        </div>
      </section>

      <section style={{ background: '#0F1E2E', padding: '60px 32px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <GoldRule />
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 300, color: '#F5F0E8', lineHeight: 1.75, marginBottom: '40px' }}>{article.lead}</p>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#8A9BB0', lineHeight: 1.85 }}>
            {article.body.split('\n\n').map((para, i) => (
              <p key={i} style={{ marginBottom: '24px' }}>{para}</p>
            ))}
          </div>
          <div style={{ marginTop: '56px', background: '#0B1622', border: '1px solid rgba(201,151,58,0.2)', padding: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9973A', marginBottom: '8px' }}>Found this relevant?</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 400, color: '#F5F0E8' }}>Discuss this with Jean Bosco</div>
            </div>
            <Link href={`/${locale}/contact`} style={{ display: 'inline-block', background: 'linear-gradient(135deg, #C9973A, #E8C87A)', color: '#0B1622', fontFamily: 'var(--font-body)', fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500, padding: '12px 24px', textDecoration: 'none', whiteSpace: 'nowrap' }}>{t('discussCta')}</Link>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section style={{ background: '#0B1622', padding: '60px 32px' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#4A6070', marginBottom: '32px' }}>More Insights</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px' }} className="related-grid">
              {related.map(a => (
                <Link key={a.slug} href={`/${locale}/insights/${a.slug}`} style={{ textDecoration: 'none' }}>
                  <div
                    style={{ background: '#0F1E2E', border: '1px solid rgba(201,151,58,0.1)', padding: '24px', transition: 'border-color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(201,151,58,0.3)')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(201,151,58,0.1)')}
                  >
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C9973A', marginBottom: '12px' }}>{a.category}</div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 400, color: '#F5F0E8', lineHeight: 1.3, marginBottom: '12px' }}>{a.title}</h3>
                    <span style={{ color: '#C9973A', fontSize: '14px' }}>→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <style>{`@media(max-width:768px){ .related-grid{grid-template-columns:1fr!important} }`}</style>
        </section>
      )}
    </>
  );
}
