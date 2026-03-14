'use client';

import { useState } from 'react';
import { Dictionary } from '@/lib/i18n';
import { ScrollAnimation } from './ScrollAnimation';
import { BookingModal } from './BookingModal';

const BORDER = '#B0ADA6';
const TEXT = '#2D2A26';

interface CTAProps {
  dict: Dictionary;
  locale?: string;
}

export function CTA({ dict, locale = 'en' }: CTAProps) {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <>
      <section id="contact" className="bg-cream text-dark py-32">
        <div className="max-w-3xl mx-auto w-full px-6 md:px-8 text-center">
          <ScrollAnimation>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-normal mb-6">
              {dict.cta.title}
            </h2>
            <p className="text-lg text-dark/60 mb-12">
              {dict.cta.subtitle}
            </p>
            <button
              onClick={() => setBookingOpen(true)}
              style={{ border: `1px solid ${BORDER}`, color: TEXT }}
              className="inline-flex items-center justify-center px-10 py-5 text-lg font-medium hover:opacity-70 transition-opacity bg-transparent"
            >
              {dict.cta.button}
            </button>
          </ScrollAnimation>
        </div>
      </section>

      <BookingModal
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        locale={locale}
      />
    </>
  );
}
