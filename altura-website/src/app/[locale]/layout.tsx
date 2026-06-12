import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import GrainOverlay from '@/components/GrainOverlay';

const locales = ['en', 'fr'];

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(locales, locale)) notFound();

  const messages = await getMessages();
  const nav = messages.nav as Record<string, string>;

  return (
    <NextIntlClientProvider messages={messages}>
      <GrainOverlay />
      <Nav
        locale={locale}
        messages={{
          services: nav.services,
          sectors: nav.sectors,
          about: nav.about,
          insights: nav.insights,
          langToggle: nav.langToggle,
          contactCta: nav.contactCta,
        }}
      />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer locale={locale} />
    </NextIntlClientProvider>
  );
}
