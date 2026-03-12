import type { Metadata } from 'next';
import { getDictionary, Locale, locales } from '@/lib/i18n';
import '../globals.css';

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);

  return {
    title: dict.meta.title,
    description: dict.meta.description,
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
