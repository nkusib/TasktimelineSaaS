import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SectionTag from '@/components/ui/SectionTag';

type ServiceItem = { slug: string; number: string; badge: string | null; name: string; tagline: string; description: string; bullets: string[] };

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'services' });
  const items = t.raw('items') as ServiceItem[];
  const svc = items.find(s => s.slug === slug);
  if (!svc) return {};
  return { title: `${svc.name} | Altura Management Consulting`, description: svc.tagline };
}

export default async function ServiceSlugPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'services' });
  const items = t.raw('items') as ServiceItem[];
  const svc = items.find(s => s.slug === slug);
  if (!svc) notFound();
  const others = items.filter(s => s.slug !== slug).slice(0, 3);

  return (
    <>
      <section style={{ background: '#0B1622', padding: '160px 32px 80px', borderBottom: '1px solid rgba(201,151,58,0.1)', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent 0%, #C9973A 30%, #E8C87A 70%, transparent 100%)' }} />
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <Link href={`/${locale}/services`} style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#8A9BB0', textDecoration: 'none', letterSpacing: '0.1em', display: 'inline-block', marginBottom: '32px' }}>← All Services</Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '0.15em', color: '#4A6070' }}>{svc.number}</span>
            {svc.badge && <span style={{ fontFamily: 'var(--font-body)', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9973A', border: '1px solid rgba(201,151,58,0.3)', padding: '2px 8px' }}>{svc.badge}</span>}
          </div>
          <SectionTag label="Service" />
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(44px,6vw,72px)', fontWeight: 300, color: '#F5F0E8', lineHeight: 1.1, marginBottom: '16px' }}>{svc.name}</h1>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontStyle: 'italic', color: '#C9973A', fontWeight: 300 }}>{svc.tagline}</p>
        </div>
      </section>

      <section style={{ background: '#0F1E2E', padding: '80px 32px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '64px', alignItems: 'start' }} className="service-content-grid">
            <div>
              <div style={{ width: '44px', height: '2px', background: 'linear-gradient(90deg, #C9973A, #E8C87A)', marginBottom: '20px' }} />
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 300, color: '#F5F0E8', lineHeight: 1.7, marginBottom: '32px' }}>{svc.description}</p>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C9973A', marginBottom: '20px', fontWeight: 500 }}>What We Cover</div>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {svc.bullets.map((b, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 0', borderBottom: '1px solid rgba(201,151,58,0.08)', fontFamily: 'var(--font-body)', fontSize: '15px', color: '#8A9BB0' }}>
                    <span style={{ color: '#C9973A', fontSize: '8px', flexShrink: 0 }}>◆</span>{b}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div style={{ background: '#0B1622', border: '1px solid rgba(201,151,58,0.15)', padding: '32px', marginBottom: '20px' }}>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9973A', marginBottom: '16px' }}>Ready to Discuss?</div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#8A9BB0', lineHeight: 1.7, marginBottom: '24px' }}>Submit your brief and Jean Bosco will respond personally within 48 hours.</p>
                <Link href={`/${locale}/contact`} style={{ display: 'block', background: 'linear-gradient(135deg, #C9973A, #E8C87A)', color: '#0B1622', fontFamily: 'var(--font-body)', fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500, padding: '14px 20px', textDecoration: 'none', textAlign: 'center' }}>{t('contactButton')}</Link>
              </div>
              {others.length > 0 && (
                <div style={{ background: '#0B1622', border: '1px solid rgba(201,151,58,0.1)', padding: '24px' }}>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#4A6070', marginBottom: '16px' }}>Other Services</div>
                  {others.map(s => (
                    <Link key={s.slug} href={`/${locale}/services/${s.slug}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid rgba(201,151,58,0.06)', textDecoration: 'none' }}>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#8A9BB0' }}>{s.name}</span>
                      <span style={{ color: '#C9973A', fontSize: '14px' }}>→</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <style>{`@media(max-width:900px){ .service-content-grid{grid-template-columns:1fr!important} }`}</style>
      </section>
    </>
  );
}
