import { getDictionary, Locale, locales } from '@/lib/i18n';
import { Hero } from '@/components/Hero';
import { Problem } from '@/components/Problem';
import { Paths } from '@/components/Paths';
import { HowItWorks } from '@/components/HowItWorks';
import { Features } from '@/components/Features';
import { Pricing } from '@/components/Pricing';
import { Trust } from '@/components/Trust';
import { CTA } from '@/components/CTA';
import { Footer } from '@/components/Footer';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  const validLocale = (locales.includes(locale as Locale) ? locale : 'en') as Locale;
  const dict = getDictionary(validLocale);

  return (
    <main>
      <Hero dict={dict} locale={validLocale} />
      <Problem dict={dict} />
      <Paths dict={dict} />
      <HowItWorks dict={dict} />
      <Features dict={dict} />
      <Pricing dict={dict} />
      <Trust dict={dict} />
      <CTA dict={dict} locale={validLocale} />
      <Footer dict={dict} currentLocale={validLocale} />
    </main>
  );
}
