'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getDictionary, Locale, locales } from '@/lib/i18n';

const BG = '#EDEAE3';
const TEXT = '#2D2A26';
const MUTED = '#8A8178';
const BORDER = '#C8C3BB';

export default function ThankYouApplyPage() {
  const params = useParams();
  const locale = (locales.includes(params.locale as Locale) ? params.locale : 'en') as Locale;
  const dict = getDictionary(locale);
  const t = dict.thankYou.apply;

  const [briefHref, setBriefHref] = useState(`/${locale}/brief`);

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const name = sp.get('name');
    const email = sp.get('email');
    if (name || email) {
      const qs = new URLSearchParams();
      if (name) qs.set('name', name);
      if (email) qs.set('email', email);
      setBriefHref(`/${locale}/brief?${qs.toString()}`);
    }
  }, [locale]);

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
          href={`/${locale}`}
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

          <p style={{ color: MUTED }} className="font-body text-sm mb-12">
            {t.sub}
          </p>

          {/* Soft CTA — not a hard push */}
          <a
            href={briefHref}
            style={{ border: `1px solid ${BORDER}`, color: TEXT }}
            className="inline-flex items-center gap-2 px-6 py-3 font-body text-sm hover:opacity-70 transition-opacity"
          >
            {t.briefCta}
          </a>
        </div>
      </div>
    </main>
  );
}
