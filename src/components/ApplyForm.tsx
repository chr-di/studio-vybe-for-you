'use client';

import { useState, useCallback } from 'react';
import { Dictionary, Locale } from '@/lib/i18n';

interface ApplyFormProps {
  dict: Dictionary;
  locale: Locale;
}

type FormData = {
  name: string;
  email: string;
  whatYouDo: string;
  siteGoal: string;
  vibe: string;
  budget: string;
};

const VIBES = [
  {
    value: 'warm',
    palette: ['#C8956C', '#E8D5C0', '#F5EDE3', '#8B5E3C'],
    pattern: 'warm',
  },
  {
    value: 'minimal',
    palette: ['#E8E8E8', '#FFFFFF', '#C4C4C4', '#1A1A1A'],
    pattern: 'minimal',
  },
  {
    value: 'bold',
    palette: ['#1A1A1A', '#D4A857', '#2C2C2C', '#F5F0E8'],
    pattern: 'bold',
  },
  {
    value: 'editorial',
    palette: ['#D4C5BD', '#E8D8D0', '#B8A8A0', '#4A3C38'],
    pattern: 'editorial',
  },
];

const BG = '#EDEAE3';
const TEXT = '#2D2A26';
const MUTED = '#8A8178';
const BORDER = '#C8C3BB';
const ACCENT = '#2D2A26';

export function ApplyForm({ dict, locale }: ApplyFormProps) {
  const f = dict.apply;
  const [step, setStep] = useState(1);
  const [transitioning, setTransitioning] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [data, setData] = useState<FormData>({
    name: '',
    email: '',
    whatYouDo: '',
    siteGoal: '',
    vibe: '',
    budget: '',
  });

  const TOTAL = 5;

  const set = (field: keyof FormData, value: string) =>
    setData((d) => ({ ...d, [field]: value }));

  const transition = useCallback((to: number) => {
    setTransitioning(true);
    setTimeout(() => {
      setStep(to);
      setTransitioning(false);
    }, 200);
  }, []);

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (step === 1) {
      if (!data.name.trim()) e.name = f.validation.required;
      if (!data.email.trim()) e.email = f.validation.required;
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = f.validation.email;
    }
    if (step === 2 && !data.whatYouDo.trim()) e.whatYouDo = f.validation.required;
    if (step === 3 && !data.siteGoal) e.siteGoal = f.validation.required;
    if (step === 4 && !data.vibe) e.vibe = f.validation.required;
    if (step === 5 && !data.budget) e.budget = f.validation.required;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validate()) return;
    if (step < TOTAL) transition(step + 1);
    else handleSubmit();
  };

  const back = () => {
    if (step > 1) transition(step - 1);
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    setError(null);
    try {
      await fetch('https://n8n.dian.solutions/webhook/studio-vybe-intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, locale, form: 'apply' }),
      });
      setSubmitted(true);
    } catch {
      setError(f.error);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <main style={{ background: BG, color: TEXT }} className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-lg w-full text-center py-24">
          <p style={{ color: MUTED }} className="font-body text-sm tracking-widest uppercase mb-8">
            {f.success.label}
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-normal leading-tight mb-6">
            {f.success.heading}
          </h1>
          <p style={{ color: MUTED }} className="font-body text-lg mb-12">
            {f.success.body}
          </p>
          <a
            href={`/${locale}/brief`}
            style={{ background: TEXT, color: BG }}
            className="inline-flex items-center gap-3 px-8 py-4 font-body font-medium text-base hover:opacity-90 transition-opacity"
          >
            {f.success.cta} <span>→</span>
          </a>
          <p style={{ color: MUTED }} className="font-body text-sm mt-12">
            {f.success.fallback}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main style={{ background: BG, color: TEXT }} className="min-h-screen flex flex-col">
      {/* Progress bar */}
      <div style={{ borderBottom: `1px solid ${BORDER}` }} className="px-6 py-5 flex items-center gap-6">
        <a
          href={`/${locale}`}
          style={{ color: MUTED }}
          className="font-display text-sm tracking-wide hover:opacity-70 transition-opacity"
        >
          Studio Vybe
        </a>
        <div className="flex-1 flex gap-1.5 max-w-xs">
          {Array.from({ length: TOTAL }).map((_, i) => (
            <div
              key={i}
              style={{
                background: i < step ? TEXT : BORDER,
                height: '2px',
                flex: 1,
                transition: 'background 0.3s ease',
              }}
            />
          ))}
        </div>
        <span style={{ color: MUTED }} className="font-body text-sm">
          {step}/{TOTAL}
        </span>
      </div>

      {/* Step content */}
      <div
        className="flex-1 flex items-center justify-center px-6 py-16"
        style={{
          opacity: transitioning ? 0 : 1,
          transform: transitioning ? 'translateY(8px)' : 'translateY(0)',
          transition: 'opacity 0.2s ease, transform 0.2s ease',
        }}
      >
        <div className="max-w-2xl w-full">

          {/* Step 1: Name + email */}
          {step === 1 && (
            <div>
              <p style={{ color: MUTED }} className="font-body text-sm tracking-widest uppercase mb-4">
                {f.step1.label}
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-normal mb-10">
                {f.step1.heading}
              </h2>
              <div className="flex flex-col gap-5">
                <div>
                  <input
                    type="text"
                    placeholder={f.step1.namePlaceholder}
                    value={data.name}
                    onChange={(e) => set('name', e.target.value)}
                    style={{
                      background: 'transparent',
                      border: `1px solid ${errors.name ? '#B85C38' : BORDER}`,
                      color: TEXT,
                      width: '100%',
                      padding: '14px 16px',
                      fontFamily: 'inherit',
                      fontSize: '16px',
                      outline: 'none',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = ACCENT)}
                    onBlur={(e) => (e.target.style.borderColor = errors.name ? '#B85C38' : BORDER)}
                  />
                  {errors.name && <p style={{ color: '#B85C38' }} className="font-body text-sm mt-1">{errors.name}</p>}
                </div>
                <div>
                  <input
                    type="email"
                    placeholder={f.step1.emailPlaceholder}
                    value={data.email}
                    onChange={(e) => set('email', e.target.value)}
                    style={{
                      background: 'transparent',
                      border: `1px solid ${errors.email ? '#B85C38' : BORDER}`,
                      color: TEXT,
                      width: '100%',
                      padding: '14px 16px',
                      fontFamily: 'inherit',
                      fontSize: '16px',
                      outline: 'none',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = ACCENT)}
                    onBlur={(e) => (e.target.style.borderColor = errors.email ? '#B85C38' : BORDER)}
                  />
                  {errors.email && <p style={{ color: '#B85C38' }} className="font-body text-sm mt-1">{errors.email}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: What do you do */}
          {step === 2 && (
            <div>
              <p style={{ color: MUTED }} className="font-body text-sm tracking-widest uppercase mb-4">
                {f.step2.label}
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-normal mb-3">
                {f.step2.heading}
              </h2>
              <p style={{ color: MUTED }} className="font-body text-base mb-10">
                {f.step2.hint}
              </p>
              <textarea
                placeholder={f.step2.placeholder}
                value={data.whatYouDo}
                onChange={(e) => set('whatYouDo', e.target.value)}
                rows={3}
                style={{
                  background: 'transparent',
                  border: `1px solid ${errors.whatYouDo ? '#B85C38' : BORDER}`,
                  color: TEXT,
                  width: '100%',
                  padding: '14px 16px',
                  fontFamily: 'inherit',
                  fontSize: '16px',
                  outline: 'none',
                  resize: 'none',
                }}
                onFocus={(e) => (e.target.style.borderColor = ACCENT)}
                onBlur={(e) => (e.target.style.borderColor = errors.whatYouDo ? '#B85C38' : BORDER)}
              />
              {errors.whatYouDo && <p style={{ color: '#B85C38' }} className="font-body text-sm mt-1">{errors.whatYouDo}</p>}
            </div>
          )}

          {/* Step 3: Site goal */}
          {step === 3 && (
            <div>
              <p style={{ color: MUTED }} className="font-body text-sm tracking-widest uppercase mb-4">
                {f.step3.label}
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-normal mb-10">
                {f.step3.heading}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {f.step3.options.map((opt: { value: string; label: string }) => (
                  <button
                    key={opt.value}
                    onClick={() => set('siteGoal', opt.value)}
                    style={{
                      border: `1px solid ${data.siteGoal === opt.value ? TEXT : BORDER}`,
                      background: data.siteGoal === opt.value ? TEXT : 'transparent',
                      color: data.siteGoal === opt.value ? BG : TEXT,
                      padding: '18px 20px',
                      fontFamily: 'inherit',
                      fontSize: '15px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              {errors.siteGoal && <p style={{ color: '#B85C38' }} className="font-body text-sm mt-3">{errors.siteGoal}</p>}
            </div>
          )}

          {/* Step 4: Vibe */}
          {step === 4 && (
            <div>
              <p style={{ color: MUTED }} className="font-body text-sm tracking-widest uppercase mb-4">
                {f.step4.label}
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-normal mb-3">
                {f.step4.heading}
              </h2>
              <p style={{ color: MUTED }} className="font-body text-base mb-10">
                {f.step4.hint}
              </p>
              <div className="grid grid-cols-2 gap-4">
                {VIBES.map((vibe) => {
                  const label = f.step4.vibes[vibe.value as keyof typeof f.step4.vibes];
                  const selected = data.vibe === vibe.value;
                  return (
                    <button
                      key={vibe.value}
                      onClick={() => set('vibe', vibe.value)}
                      style={{
                        border: `2px solid ${selected ? TEXT : BORDER}`,
                        background: 'transparent',
                        cursor: 'pointer',
                        padding: 0,
                        overflow: 'hidden',
                        transition: 'border-color 0.15s ease',
                      }}
                    >
                      {/* Moodboard palette swatch */}
                      <div style={{ height: '120px', display: 'flex' }}>
                        {vibe.palette.map((color, i) => (
                          <div
                            key={i}
                            style={{
                              flex: 1,
                              background: color,
                              position: 'relative',
                            }}
                          >
                            {/* Texture overlay for visual depth */}
                            {vibe.pattern === 'warm' && i === 2 && (
                              <div style={{
                                position: 'absolute', inset: 0,
                                backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(200,149,108,0.3) 0%, transparent 70%)',
                              }} />
                            )}
                            {vibe.pattern === 'editorial' && i === 1 && (
                              <div style={{
                                position: 'absolute', inset: 0,
                                backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 60%)',
                              }} />
                            )}
                          </div>
                        ))}
                      </div>
                      {/* Label */}
                      <div
                        style={{
                          padding: '14px 16px',
                          textAlign: 'left',
                          borderTop: `1px solid ${selected ? TEXT : BORDER}`,
                          background: selected ? TEXT : BG,
                          color: selected ? BG : TEXT,
                          transition: 'all 0.15s ease',
                        }}
                      >
                        <p style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 400, margin: 0 }}>
                          {label.title}
                        </p>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', opacity: 0.7, margin: '4px 0 0' }}>
                          {label.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
              {errors.vibe && <p style={{ color: '#B85C38' }} className="font-body text-sm mt-3">{errors.vibe}</p>}
            </div>
          )}

          {/* Step 5: Budget */}
          {step === 5 && (
            <div>
              <p style={{ color: MUTED }} className="font-body text-sm tracking-widest uppercase mb-4">
                {f.step5.label}
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-normal mb-10">
                {f.step5.heading}
              </h2>
              <div className="flex flex-col gap-3">
                {f.step5.options.map((opt: { value: string; label: string }) => (
                  <button
                    key={opt.value}
                    onClick={() => set('budget', opt.value)}
                    style={{
                      border: `1px solid ${data.budget === opt.value ? TEXT : BORDER}`,
                      background: data.budget === opt.value ? TEXT : 'transparent',
                      color: data.budget === opt.value ? BG : TEXT,
                      padding: '18px 24px',
                      fontFamily: 'inherit',
                      fontSize: '16px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              {errors.budget && <p style={{ color: '#B85C38' }} className="font-body text-sm mt-3">{errors.budget}</p>}
              {error && <p style={{ color: '#B85C38' }} className="font-body text-sm mt-4">{error}</p>}
            </div>
          )}

          {/* Nav buttons */}
          <div className="mt-12 flex items-center gap-6">
            {step > 1 && (
              <button
                onClick={back}
                style={{ color: MUTED, fontFamily: 'inherit', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontSize: '15px' }}
                className="hover:opacity-70 transition-opacity"
              >
                ← {f.back}
              </button>
            )}
            <button
              onClick={next}
              disabled={submitting}
              style={{
                background: TEXT,
                color: BG,
                border: 'none',
                padding: '16px 36px',
                fontFamily: 'inherit',
                fontSize: '16px',
                fontWeight: 500,
                cursor: submitting ? 'not-allowed' : 'pointer',
                opacity: submitting ? 0.7 : 1,
                transition: 'opacity 0.15s ease',
              }}
            >
              {step === TOTAL ? (submitting ? f.submitting : f.submit) : f.next}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
