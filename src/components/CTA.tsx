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
              className="group inline-flex items-center gap-4 px-10 py-5 text-lg font-medium bg-transparent transition-opacity hover:opacity-70"
            >
              <span>{dict.cta.button}</span>
              <span className="flex items-center overflow-hidden">
                <svg
                  width="20"
                  height="12"
                  viewBox="0 0 20 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="translate-x-0 transition-transform duration-300 ease-out group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  <path d="M0 6H18M18 6L13 1M18 6L13 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
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
