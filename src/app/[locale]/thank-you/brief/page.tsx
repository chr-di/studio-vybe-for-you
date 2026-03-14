import { getDictionary, Locale, locales } from '@/lib/i18n';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const BG = '#EDEAE3';
const TEXT = '#2D2A26';
const MUTED = '#8A8178';
const BORDER = '#C8C3BB';

export default async function ThankYouBriefPage({ params }: PageProps) {
  const { locale } = await params;
  const validLocale = (locales.includes(locale as Locale) ? locale : 'en') as Locale;
  const dict = getDictionary(validLocale);
  const t = dict.thankYou.brief;

  return (
    <main
      style={{ background: BG, color: TEXT, minHeight: '100vh' }}
      className="flex flex-col"
    >
      {/* Minimal header */}
      <div
        style={{ borderBottom: `1px solid ${BORDER}` }}
        className="px-6 py-5"
      >
        <a
          href={`/${validLocale}`}
          style={{ color: MUTED }}
          className="font-display text-sm tracking-wide hover:opacity-70 transition-opacity"
        >
          Studio Vybe
        </a>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="max-w-lg w-full text-center">
          <p
            style={{ color: MUTED }}
            className="font-body text-sm tracking-widest uppercase mb-8"
          >
            {t.label}
          </p>

          <h1 className="font-display text-4xl md:text-5xl font-normal leading-tight mb-6">
            {t.heading}
          </h1>

          <p style={{ color: MUTED }} className="font-body text-lg mb-6">
            {t.body}
          </p>

          <p style={{ color: MUTED }} className="font-body text-sm">
            {t.sub}
          </p>
        </div>
      </div>
    </main>
  );
}
