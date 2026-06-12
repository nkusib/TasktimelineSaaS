'use client';

import { useState, use } from 'react';
import Link from 'next/link';

type CT = {
  tag: string; headlinePart1: string; headlinePart2: string;
  howWeWorkTitle: string;
  step1Number: string; step1Title: string; step1Desc: string;
  step2Number: string; step2Title: string; step2Desc: string;
  step3Number: string; step3Title: string; step3Desc: string;
  step4Number: string; step4Title: string; step4Desc: string;
  directContactTitle: string; emailLabel: string; locationLabel: string; locationValue: string; languagesLabel: string; languagesValue: string; calendlyLabel: string; calendlyLink: string;
  formTitle: string; firstName: string; lastName: string; email: string; company: string; role: string; country: string; sector: string; engagement: string; budget: string; message: string; messagePlaceholder: string; privacyNotice: string; submit: string; submitting: string;
  successTitle: string; successMessage: string; successEmail: string;
  sectorOptions: string[]; engagementOptions: string[]; budgetOptions: string[];
};

const inputStyle: React.CSSProperties = {
  width: '100%', background: '#0B1622', border: '1px solid rgba(201,151,58,0.15)',
  padding: '12px 16px', color: '#F5F0E8', fontFamily: 'var(--font-body)', fontSize: '14px', outline: 'none',
};
const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8A9BB0', display: 'block', marginBottom: '6px',
};
const selectStyle: React.CSSProperties = {
  ...inputStyle,
  cursor: 'pointer',
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23C9973A' strokeWidth='1.5' fill='none'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center', paddingRight: '36px',
};

export default function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  const [t, setT] = useState<CT | null>(null);

  if (!t) {
    import(`@/messages/${locale}.json`).then(mod => setT(mod.default.contact));
    return <div style={{ minHeight: '100vh', background: '#0B1622' }} />;
  }

  return <ContactContent locale={locale} t={t} />;
}

function ContactContent({ locale, t }: { locale: string; t: CT }) {
  const [form, setForm] = useState({ firstName:'', lastName:'', email:'', company:'', role:'', country:'', sector:'', engagement:'', budget:'', message:'' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const steps = [
    { num: t.step1Number, title: t.step1Title, desc: t.step1Desc },
    { num: t.step2Number, title: t.step2Title, desc: t.step2Desc },
    { num: t.step3Number, title: t.step3Title, desc: t.step3Desc },
    { num: t.step4Number, title: t.step4Title, desc: t.step4Desc },
  ];

  const required = ['firstName','lastName','email','company','role','country','sector','engagement','message'];

  function validate() {
    const errs: Record<string, boolean> = {};
    required.forEach(f => { if (!form[f as keyof typeof form]) errs[f] = true; });
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({}); setSubmitting(true);
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (res.ok) setSuccess(true);
    } finally { setSubmitting(false); }
  }

  if (success) {
    return (
      <div style={{ minHeight: '100vh', background: '#0B1622', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 32px 32px' }}>
        <div style={{ maxWidth: '480px', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '48px', color: '#C9973A', marginBottom: '24px' }}>◈</div>
          <div style={{ width: '44px', height: '2px', background: 'linear-gradient(90deg, #C9973A, #E8C87A)', margin: '0 auto 24px' }} />
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px,5vw,56px)', fontWeight: 300, color: '#F5F0E8', marginBottom: '20px' }}>{t.successTitle}</h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#8A9BB0', lineHeight: 1.75, marginBottom: '16px' }}>{t.successMessage}</p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#4A6070', lineHeight: 1.7, marginBottom: '40px' }}>{t.successEmail}</p>
          <Link href={`/${locale}`} style={{ fontFamily: 'var(--font-body)', fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C9973A', textDecoration: 'none' }}>← Return to Home</Link>
        </div>
      </div>
    );
  }

  const ef = (f: string) => errors[f] ? '#C9973A' : 'rgba(201,151,58,0.15)';

  return (
    <>
      <section style={{ background: '#0B1622', padding: '160px 32px 60px', borderBottom: '1px solid rgba(201,151,58,0.1)', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent 0%, #C9973A 30%, #E8C87A 70%, transparent 100%)' }} />
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <div style={{ width: '20px', height: '1px', background: '#C9973A' }} />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C9973A', fontWeight: 500 }}>{t.tag}</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(44px,6vw,72px)', fontWeight: 300, lineHeight: 1.1 }}>
            <span style={{ color: '#F5F0E8' }}>{t.headlinePart1} </span>
            <span className="gold-gradient-text" style={{ fontStyle: 'italic' }}>{t.headlinePart2}</span>
          </h1>
        </div>
      </section>

      <section style={{ background: '#0F1E2E', padding: '60px 32px 100px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: '64px', alignItems: 'start' }} className="contact-grid">
            {/* Left */}
            <div style={{ position: 'sticky', top: '100px' }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C9973A', marginBottom: '24px', fontWeight: 500 }}>{t.howWeWorkTitle}</div>
              {steps.map(s => (
                <div key={s.num} style={{ display: 'flex', gap: '20px', marginBottom: '24px' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: '#C9973A', fontWeight: 300, minWidth: '28px' }}>{s.num}</div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#F5F0E8', marginBottom: '4px', fontWeight: 500 }}>{s.title}</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#8A9BB0', lineHeight: 1.6 }}>{s.desc}</div>
                  </div>
                </div>
              ))}
              <div style={{ width: '100%', height: '1px', background: 'rgba(201,151,58,0.1)', marginBottom: '32px', marginTop: '8px' }} />
              <div style={{ marginBottom: '40px' }}>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#4A6070', marginBottom: '20px' }}>{t.directContactTitle}</div>
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#4A6070', marginBottom: '4px' }}>{t.emailLabel}</div>
                  <a href="mailto:jb.nkusi@alturaholdings.io" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#C9973A', textDecoration: 'none' }}>jb.nkusi@alturaholdings.io</a>
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#4A6070', marginBottom: '4px' }}>{t.locationLabel}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#8A9BB0' }}>{t.locationValue}</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#4A6070', marginBottom: '4px' }}>{t.languagesLabel}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#8A9BB0' }}>{t.languagesValue}</div>
                </div>
              </div>
              <div style={{ width: '100%', height: '1px', background: 'rgba(201,151,58,0.1)', marginBottom: '32px' }} />
              <div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#4A6070', marginBottom: '8px' }}>{t.calendlyLabel}</div>
                <a href="#" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#C9973A', textDecoration: 'none' }}>{t.calendlyLink}</a>
              </div>
            </div>

            {/* Right: Form */}
            <div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#4A6070', marginBottom: '32px' }}>{t.formTitle}</div>
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }} className="name-row">
                  <div><label style={labelStyle}>{t.firstName} *</label><input type="text" value={form.firstName} onChange={e => setForm({...form,firstName:e.target.value})} style={{...inputStyle,borderColor:ef('firstName')}} /></div>
                  <div><label style={labelStyle}>{t.lastName} *</label><input type="text" value={form.lastName} onChange={e => setForm({...form,lastName:e.target.value})} style={{...inputStyle,borderColor:ef('lastName')}} /></div>
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <label style={labelStyle}>{t.email} *</label>
                  <input type="email" value={form.email} onChange={e => setForm({...form,email:e.target.value})} style={{...inputStyle,borderColor:ef('email')}} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }} className="company-row">
                  <div><label style={labelStyle}>{t.company} *</label><input type="text" value={form.company} onChange={e => setForm({...form,company:e.target.value})} style={{...inputStyle,borderColor:ef('company')}} /></div>
                  <div><label style={labelStyle}>{t.role} *</label><input type="text" value={form.role} onChange={e => setForm({...form,role:e.target.value})} style={{...inputStyle,borderColor:ef('role')}} /></div>
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <label style={labelStyle}>{t.country} *</label>
                  <input type="text" value={form.country} onChange={e => setForm({...form,country:e.target.value})} style={{...inputStyle,borderColor:ef('country')}} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }} className="sector-row">
                  <div>
                    <label style={labelStyle}>{t.sector} *</label>
                    <select value={form.sector} onChange={e => setForm({...form,sector:e.target.value})} style={{...selectStyle,borderColor:ef('sector')}}>
                      <option value="">Select sector</option>
                      {t.sectorOptions.map(o => <option key={o} value={o} style={{background:'#0B1622'}}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>{t.engagement} *</label>
                    <select value={form.engagement} onChange={e => setForm({...form,engagement:e.target.value})} style={{...selectStyle,borderColor:ef('engagement')}}>
                      <option value="">Select type</option>
                      {t.engagementOptions.map(o => <option key={o} value={o} style={{background:'#0B1622'}}>{o}</option>)}
                    </select>
                  </div>
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <label style={labelStyle}>{t.budget}</label>
                  <select value={form.budget} onChange={e => setForm({...form,budget:e.target.value})} style={selectStyle}>
                    <option value="">Select range (optional)</option>
                    {t.budgetOptions.map(o => <option key={o} value={o} style={{background:'#0B1622'}}>{o}</option>)}
                  </select>
                </div>
                <div style={{ marginBottom: '24px' }}>
                  <label style={labelStyle}>{t.message} *</label>
                  <textarea rows={5} value={form.message} onChange={e => setForm({...form,message:e.target.value})} placeholder={t.messagePlaceholder} style={{...inputStyle,resize:'vertical',borderColor:ef('message')}} />
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#4A6070', lineHeight: 1.6, marginBottom: '24px' }}>{t.privacyNotice}</p>
                <button type="submit" disabled={submitting} style={{ background: submitting ? '#2A3A4E' : 'linear-gradient(135deg, #C9973A, #E8C87A)', color: '#0B1622', border: 'none', padding: '16px 40px', fontFamily: 'var(--font-body)', fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500, cursor: submitting ? 'not-allowed' : 'pointer', width: '100%' }}>
                  {submitting ? t.submitting : t.submit}
                </button>
              </form>
            </div>
          </div>
        </div>
        <style>{`
          @media(max-width:1024px){ .contact-grid{grid-template-columns:1fr!important} }
          @media(max-width:600px){ .name-row,.company-row,.sector-row{grid-template-columns:1fr!important} }
        `}</style>
      </section>
    </>
  );
}
