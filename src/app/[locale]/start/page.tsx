import { getDictionary, Locale, locales } from '@/lib/i18n';
import { OnboardingForm } from '@/components/OnboardingForm';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function StartPage({ params }: PageProps) {
  const { locale } = await params;
  const validLocale = (locales.includes(locale as Locale) ? locale : 'en') as Locale;
  const dict = getDictionary(validLocale);

  return <OnboardingForm dict={dict} locale={validLocale} />;
}
