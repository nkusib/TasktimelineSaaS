import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Altura Management Consulting | Strategic Advisory Africa & Europe",
  description:
    "Precision consulting for high-stakes markets. Expert advisory in Telecom, Fintech, Financial Services and SaaS across Africa and Europe.",
  robots: "index, follow",
  alternates: { canonical: "https://alturaholdings.io" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Altura Management Consulting",
              url: "https://alturaholdings.io",
              contactPoint: {
                "@type": "ContactPoint",
                email: "jb.nkusi@alturaholdings.io",
                contactType: "customer service",
              },
            }),
          }}
        />
      </head>
      <body
        style={{ fontFamily: "var(--font-body, 'DM Sans', sans-serif)" }}
        className="min-h-full flex flex-col"
      >
        {children}
      </body>
    </html>
  );
}
