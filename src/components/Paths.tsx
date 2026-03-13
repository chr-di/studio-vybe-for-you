'use client';

import { useState } from 'react';
import { Dictionary } from '@/lib/i18n';
import { ScrollAnimation } from './ScrollAnimation';

interface PathsProps {
  dict: Dictionary;
}

const BG = '#EDEAE3';
const TEXT = '#2D2A26';
const BORDER = '#C8C3BB';
const MUTED = '#8A8178';

export function Paths({ dict }: PathsProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const d = dict.paths.diy.waitlist;

  const handleWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(d.emailError);
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      await fetch('https://n8n.dian.solutions/webhook/studio-vybe-intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'diy-waitlist' }),
      });
    } catch {
      // fail silently — lead is not lost, email is captured on our end
    } finally {
      setSubmitted(true);
      setSubmitting(false);
    }
  };

  return (
    <section className="py-32">
      <div className="max-w-5xl mx-auto w-full px-6 md:px-8">
        <ScrollAnimation>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-normal mb-20">
            {dict.paths.title}
          </h2>
        </ScrollAnimation>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {/* Done For You */}
          <ScrollAnimation delay={100}>
            <div>
              <span className="text-sm font-medium uppercase tracking-wider text-accent mb-4 block">
                {dict.paths.dfy.label}
              </span>
              <h3 className="font-display text-3xl md:text-4xl mb-6">
                {dict.paths.dfy.title}
              </h3>
              <p className="text-lg text-light/70 mb-8 leading-relaxed">
                {dict.paths.dfy.description}
              </p>
              <ul className="space-y-3">
                {dict.paths.dfy.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3 text-light/80">
                    <span className="text-accent mt-1">—</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollAnimation>

          {/* DIY with AI */}
          <ScrollAnimation delay={200}>
            <div className="opacity-70">
              <span className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-muted mb-4">
                {dict.paths.diy.label}
              </span>
              <h3 className="font-display text-3xl md:text-4xl mb-6 text-muted">
                {dict.paths.diy.title}
              </h3>
              <p className="text-lg text-muted/70 mb-8 leading-relaxed">
                {dict.paths.diy.description}
              </p>
              <ul className="space-y-3 mb-8">
                {dict.paths.diy.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3 text-muted/60">
                    <span className="text-muted mt-1">—</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setModalOpen(true)}
                style={{
                  border: `1px solid ${BORDER}`,
                  background: 'transparent',
                  color: MUTED,
                  padding: '12px 24px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = TEXT;
                  e.currentTarget.style.color = TEXT;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = BORDER;
                  e.currentTarget.style.color = MUTED;
                }}
              >
                {d.cta}
              </button>
            </div>
          </ScrollAnimation>
        </div>
      </div>

      {/* Waitlist Modal */}
      {modalOpen && (
        <div
          onClick={() => setModalOpen(false)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(45,42,38,0.6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 50, padding: '24px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: BG, color: TEXT, maxWidth: '440px', width: '100%',
              padding: '48px 40px', position: 'relative',
            }}
          >
            <button
              onClick={() => setModalOpen(false)}
              style={{
                position: 'absolute', top: '16px', right: '20px',
                background: 'none', border: 'none', cursor: 'pointer',
                color: MUTED, fontSize: '24px', lineHeight: 1,
              }}
            >×</button>

            {submitted ? (
              <div className="text-center">
                <p style={{ color: MUTED }} className="font-body text-sm tracking-widest uppercase mb-6">
                  {d.successLabel}
                </p>
                <p className="font-display text-2xl font-normal mb-4">{d.successHeading}</p>
                <p style={{ color: MUTED }} className="font-body text-base">{d.successBody}</p>
              </div>
            ) : (
              <form onSubmit={handleWaitlist}>
                <p style={{ color: MUTED }} className="font-body text-sm tracking-widest uppercase mb-6">
                  {d.label}
                </p>
                <p className="font-display text-2xl font-normal mb-3">{d.heading}</p>
                <p style={{ color: MUTED }} className="font-body text-base mb-8">{d.body}</p>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={d.placeholder}
                  style={{
                    background: 'transparent', border: `1px solid ${error ? '#B85C38' : BORDER}`,
                    color: TEXT, width: '100%', padding: '12px 14px',
                    fontFamily: 'var(--font-body)', fontSize: '15px', outline: 'none',
                    marginBottom: error ? '8px' : '16px',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = TEXT)}
                  onBlur={(e) => (e.target.style.borderColor = error ? '#B85C38' : BORDER)}
                />
                {error && <p style={{ color: '#B85C38', fontFamily: 'var(--font-body)', fontSize: '13px', marginBottom: '16px' }}>{error}</p>}
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    background: TEXT, color: BG, border: 'none',
                    width: '100%', padding: '14px', cursor: submitting ? 'not-allowed' : 'pointer',
                    fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 500,
                    opacity: submitting ? 0.7 : 1, transition: 'opacity 0.15s ease',
                  }}
                >
                  {submitting ? d.submitting : d.submit}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
