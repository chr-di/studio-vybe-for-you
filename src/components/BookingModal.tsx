'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const BG = '#EDEBE4';
const TEXT = '#2D2A26';
const BORDER = '#B0ADA6';
const MUTED = '#8A8178';

/**
 * Cal.com booking modal — iframe-based, no external dependencies.
 *
 * Cal.com URL is read from NEXT_PUBLIC_CAL_URL env var.
 * Falls back to book.studio-vybe.com if not set.
 * Append the event slug (e.g. /chris/check-in) to get the full booking page.
 *
 * Until Cal.com is configured with an event type, the modal
 * shows a fallback message with a mailto link.
 */

const CAL_BASE = process.env.NEXT_PUBLIC_CAL_URL || 'https://book.studio-vybe.com';
// Set this to the event slug once Cal.com is configured (e.g. '/chris/check-in')
const CAL_EVENT = process.env.NEXT_PUBLIC_CAL_EVENT || '';

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  locale?: string;
}

export function BookingModal({ open, onClose, locale = 'en' }: BookingModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  const bookingUrl = CAL_EVENT
    ? `${CAL_BASE}${CAL_EVENT}?embed=true&theme=light&layout=month_view`
    : '';

  // Close on escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setLoaded(false);
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlayRef.current) onClose();
    },
    [onClose],
  );

  if (!open) return null;

  const isDE = locale === 'de';

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      style={{ background: 'rgba(45, 42, 38, 0.5)' }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
    >
      <div
        style={{
          background: BG,
          border: `1px solid ${BORDER}`,
          borderRadius: '18px',
          maxWidth: '680px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'hidden',
        }}
        className="relative flex flex-col shadow-2xl"
      >
        {/* Header */}
        <div
          style={{ borderBottom: `1px solid ${BORDER}` }}
          className="flex items-center justify-between px-8 py-5"
        >
          <span
            style={{ color: MUTED }}
            className="font-display text-sm tracking-wide"
          >
            {isDE ? 'Termin buchen' : 'Book a check-in'}
          </span>
          <button
            onClick={onClose}
            style={{ color: MUTED }}
            className="text-2xl leading-none hover:opacity-60 transition-opacity"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-auto" style={{ minHeight: '480px' }}>
          {bookingUrl ? (
            <>
              {!loaded && (
                <div className="flex items-center justify-center h-full">
                  <p style={{ color: MUTED }} className="font-body text-sm">
                    {isDE ? 'Kalender wird geladen…' : 'Loading calendar…'}
                  </p>
                </div>
              )}
              <iframe
                src={bookingUrl}
                style={{
                  width: '100%',
                  height: '560px',
                  border: 'none',
                  display: loaded ? 'block' : 'none',
                }}
                onLoad={() => setLoaded(true)}
                title={isDE ? 'Termin buchen' : 'Book appointment'}
              />
            </>
          ) : (
            /* Fallback until Cal.com event is configured */
            <div className="flex flex-col items-center justify-center h-full px-8 py-16 text-center">
              <p
                style={{ color: TEXT }}
                className="font-display text-2xl font-normal mb-4"
              >
                {isDE ? 'Wir richten den Kalender ein.' : 'We\'re setting up the calendar.'}
              </p>
              <p style={{ color: MUTED }} className="font-body text-base mb-8 max-w-sm">
                {isDE
                  ? 'In der Zwischenzeit erreichst du uns per E-Mail — wir melden uns innerhalb eines Werktags.'
                  : 'In the meantime, reach out by email — we\'ll get back to you within one business day.'}
              </p>
              <a
                href="mailto:hello@studio-vybe.com"
                style={{ border: `1px solid ${BORDER}`, color: TEXT }}
                className="inline-flex items-center gap-2 px-8 py-4 font-body text-sm hover:opacity-70 transition-opacity"
              >
                hello@studio-vybe.com ———→
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
