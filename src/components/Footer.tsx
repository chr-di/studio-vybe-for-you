'use client';

import { Dictionary, Locale, locales } from '@/lib/i18n';
import { useRouter, usePathname } from 'next/navigation';

interface FooterProps {
  dict: Dictionary;
  currentLocale: Locale;
}

export function Footer({ dict, currentLocale }: FooterProps) {
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (locale: Locale) => {
    const newPath = pathname.replace(`/${currentLocale}`, `/${locale}`);
    router.push(newPath === pathname ? `/${locale}` : newPath);
  };

  return (
    <footer className="py-16 border-t border-light/10">
      <div className="max-w-5xl mx-auto w-full px-6 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 text-sm text-light/60">
            <a href="/impressum" className="hover:text-light transition-colors">
              {dict.footer.impressum}
            </a>
            <a href="/datenschutz" className="hover:text-light transition-colors">
              {dict.footer.datenschutz}
            </a>
            <a href="mailto:hello@studiovybe.com" className="hover:text-light transition-colors">
              {dict.footer.contact}
            </a>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-light/40">{dict.footer.language}:</span>
            <div className="flex gap-2">
              {locales.map((locale) => (
                <button
                  key={locale}
                  onClick={() => switchLocale(locale)}
                  className={`text-sm px-3 py-1 transition-colors ${
                    currentLocale === locale
                      ? 'text-light bg-light/10'
                      : 'text-light/40 hover:text-light'
                  }`}
                >
                  {locale.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 text-sm text-light/30">
          {dict.footer.copyright}
        </div>
      </div>
    </footer>
  );
}
