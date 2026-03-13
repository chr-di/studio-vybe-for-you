'use client';

import { useState, useCallback, useRef } from 'react';
import { Dictionary, Locale } from '@/lib/i18n';

interface BriefFormProps {
  dict: Dictionary;
  locale: Locale;
}

const BG = '#EDEAE3';
const TEXT = '#2D2A26';
const MUTED = '#8A8178';
const BORDER = '#C8C3BB';

type Service = { name: string; description: string };

type BriefData = {
  // Step 1
  businessName: string;
  tagline: string;
  services: Service[];
  pricingPublic: string;
  targetAudience: string;
  audiencePainPoints: string;
  // Step 2
  bio: string;
  credentials: string;
  toneOfVoice: string[]; // tag pills
  whyStarted: string;
  // Step 3
  siteGoals: string[];
  pages: string[];
  languages: string;
  urgency: string;
  // Step 4
  hasDomain: string;
  domainName: string;
  existingSite: string;
  bookingSystem: string;
  bookingOther: string;
  newsletterPlatform: string;
  brandColor1: string;
  brandColor2: string;
  brandColor3: string;
  hasLogo: string;
  hasPhotos: string;
  inspiration1Url: string;
  inspiration1Why: string;
  inspiration2Url: string;
  inspiration2Why: string;
  inspiration3Url: string;
  inspiration3Why: string;
  copyStatus: string;
  anythingElse: string;
  name: string;
  email: string;
};

function Input({ label, value, onChange, placeholder, type = 'text', error }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string; error?: string;
}) {
  return (
    <div>
      <label style={{ color: MUTED, display: 'block', fontFamily: 'var(--font-body)', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          background: 'transparent',
          border: `1px solid ${error ? '#B85C38' : BORDER}`,
          color: TEXT,
          width: '100%',
          padding: '12px 14px',
          fontFamily: 'var(--font-body)',
          fontSize: '15px',
          outline: 'none',
          boxSizing: 'border-box',
        }}
        onFocus={(e) => (e.target.style.borderColor = TEXT)}
        onBlur={(e) => (e.target.style.borderColor = error ? '#B85C38' : BORDER)}
      />
      {error && <p style={{ color: '#B85C38', fontFamily: 'var(--font-body)', fontSize: '12px', marginTop: '4px' }}>{error}</p>}
    </div>
  );
}

function Textarea({ label, value, onChange, placeholder, rows = 4, hint }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; rows?: number; hint?: string;
}) {
  return (
    <div>
      <label style={{ color: MUTED, display: 'block', fontFamily: 'var(--font-body)', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
        {label}
      </label>
      {hint && <p style={{ color: MUTED, fontFamily: 'var(--font-body)', fontSize: '13px', marginBottom: '8px' }}>{hint}</p>}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        style={{
          background: 'transparent',
          border: `1px solid ${BORDER}`,
          color: TEXT,
          width: '100%',
          padding: '12px 14px',
          fontFamily: 'var(--font-body)',
          fontSize: '15px',
          outline: 'none',
          resize: 'vertical',
          boxSizing: 'border-box',
        }}
        onFocus={(e) => (e.target.style.borderColor = TEXT)}
        onBlur={(e) => (e.target.style.borderColor = BORDER)}
      />
    </div>
  );
}

function RadioCards({ label, options, value, onChange }: {
  label?: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      {label && (
        <label style={{ color: MUTED, display: 'block', fontFamily: 'var(--font-body)', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '10px' }}>
          {label}
        </label>
      )}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            style={{
              border: `1px solid ${value === opt.value ? TEXT : BORDER}`,
              background: value === opt.value ? TEXT : 'transparent',
              color: value === opt.value ? BG : TEXT,
              padding: '10px 18px',
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function CheckboxGroup({ label, options, selected, onChange }: {
  label?: string;
  options: { value: string; label: string }[];
  selected: string[];
  onChange: (v: string[]) => void;
}) {
  const toggle = (val: string) => {
    onChange(selected.includes(val) ? selected.filter((v) => v !== val) : [...selected, val]);
  };
  return (
    <div>
      {label && (
        <label style={{ color: MUTED, display: 'block', fontFamily: 'var(--font-body)', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '10px' }}>
          {label}
        </label>
      )}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {options.map((opt) => {
          const checked = selected.includes(opt.value);
          return (
            <button
              key={opt.value}
              onClick={() => toggle(opt.value)}
              style={{
                border: `1px solid ${checked ? TEXT : BORDER}`,
                background: checked ? TEXT : 'transparent',
                color: checked ? BG : TEXT,
                padding: '10px 18px',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Tag pill input for tone-of-voice
function TagPillInput({ label, hint, tags, onChange, placeholder, maxTags = 5 }: {
  label: string; hint?: string; tags: string[]; onChange: (v: string[]) => void;
  placeholder?: string; maxTags?: number;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const addTag = (raw: string) => {
    const val = raw.trim().replace(/,/g, '');
    if (val && !tags.includes(val) && tags.length < maxTags) {
      onChange([...tags, val]);
    }
  };
  return (
    <div>
      <label style={{ color: MUTED, display: 'block', fontFamily: 'var(--font-body)', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
        {label}
      </label>
      {hint && <p style={{ color: MUTED, fontFamily: 'var(--font-body)', fontSize: '13px', marginBottom: '10px' }}>{hint}</p>}
      <div
        onClick={() => inputRef.current?.focus()}
        style={{
          border: `1px solid ${BORDER}`, padding: '8px 12px', display: 'flex',
          flexWrap: 'wrap', gap: '8px', alignItems: 'center', cursor: 'text',
          minHeight: '48px',
        }}
      >
        {tags.map((tag, i) => (
          <span key={i} style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px',
            background: TEXT, color: BG, fontFamily: 'var(--font-body)', fontSize: '13px',
          }}>
            {tag}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onChange(tags.filter((_, j) => j !== i)); }}
              style={{ background: 'none', border: 'none', color: BG, cursor: 'pointer', fontSize: '16px', lineHeight: 1, opacity: 0.7, padding: 0 }}
            >×</button>
          </span>
        ))}
        {tags.length < maxTags && (
          <input
            ref={inputRef}
            type="text"
            placeholder={tags.length === 0 ? placeholder : undefined}
            style={{ border: 'none', outline: 'none', flex: 1, minWidth: '120px', background: 'transparent', fontFamily: 'var(--font-body)', fontSize: '14px', color: TEXT, padding: '4px 0' }}
            onKeyDown={(e) => {
              if ((e.key === 'Enter' || e.key === ',') && e.currentTarget.value.trim()) {
                e.preventDefault();
                addTag(e.currentTarget.value);
                e.currentTarget.value = '';
              }
            }}
            onBlur={(e) => { if (e.target.value.trim()) { addTag(e.target.value); e.target.value = ''; } }}
          />
        )}
      </div>
    </div>
  );
}

// Hex color inputs with live swatch previews
function ColorSwatchInputs({ label, colors, onChange }: {
  label: string;
  colors: [string, string, string];
  onChange: (idx: 0 | 1 | 2, val: string) => void;
}) {
  const isValidHex = (v: string) => /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(v);
  const normalise = (v: string) => v && !v.startsWith('#') ? '#' + v : v;
  return (
    <div>
      <label style={{ color: MUTED, display: 'block', fontFamily: 'var(--font-body)', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
        {label}
      </label>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        {([0, 1, 2] as const).map((idx) => {
          const raw = colors[idx];
          const norm = normalise(raw);
          const valid = isValidHex(norm);
          return (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input
                type="text"
                value={raw}
                maxLength={7}
                placeholder="#EDEAE3"
                onChange={(e) => onChange(idx, e.target.value)}
                style={{
                  background: 'transparent', border: `1px solid ${BORDER}`, color: TEXT,
                  padding: '10px 12px', fontFamily: 'var(--font-body)', fontSize: '14px',
                  outline: 'none', width: '110px',
                }}
              />
              <div style={{
                width: '36px', height: '36px', flexShrink: 0,
                border: `1px solid ${BORDER}`,
                background: valid ? norm : BG,
                transition: 'background 0.15s ease',
              }} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SectionDivider({ title }: { title: string }) {
  return (
    <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: '32px', marginTop: '8px' }}>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 400, color: TEXT, margin: '0 0 24px' }}>
        {title}
      </h3>
    </div>
  );
}

export function BriefForm({ dict, locale }: BriefFormProps) {
  const f = dict.brief;
  const [step, setStep] = useState(1);
  const [transitioning, setTransitioning] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const TOTAL = 4;

  const [data, setData] = useState<BriefData>({
    businessName: '', tagline: '',
    services: [{ name: '', description: '' }],
    pricingPublic: '', targetAudience: '', audiencePainPoints: '',
    bio: '', credentials: '',
    toneOfVoice: [],
    whyStarted: '',
    siteGoals: [], pages: [], languages: '', urgency: '',
    hasDomain: '', domainName: '', existingSite: '',
    bookingSystem: '', bookingOther: '', newsletterPlatform: '',
    brandColor1: '', brandColor2: '', brandColor3: '',
    hasLogo: '', hasPhotos: '',
    inspiration1Url: '', inspiration1Why: '',
    inspiration2Url: '', inspiration2Why: '',
    inspiration3Url: '', inspiration3Why: '',
    copyStatus: '', anythingElse: '',
    name: '', email: '',
  });

  const set = <K extends keyof BriefData>(field: K, value: BriefData[K]) =>
    setData((d) => ({ ...d, [field]: value }));

  const transition = useCallback((to: number) => {
    setTransitioning(true);
    setTimeout(() => {
      setStep(to);
      setTransitioning(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 200);
  }, []);

  const addService = () => {
    if (data.services.length < 5) {
      set('services', [...data.services, { name: '', description: '' }]);
    }
  };

  const updateService = (idx: number, field: 'name' | 'description', value: string) => {
    const updated = data.services.map((s, i) => i === idx ? { ...s, [field]: value } : s);
    set('services', updated);
  };

  const removeService = (idx: number) => {
    set('services', data.services.filter((_, i) => i !== idx));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, locale, form: 'brief' }),
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
          <p style={{ color: MUTED }} className="font-body text-lg">
            {f.success.body}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main style={{ background: BG, color: TEXT }} className="min-h-screen">
      {/* Header */}
      <div style={{ borderBottom: `1px solid ${BORDER}` }} className="px-6 py-5 flex items-center gap-6 sticky top-0" >
        <a href={`/${locale}`} style={{ color: MUTED, background: BG }} className="font-display text-sm tracking-wide hover:opacity-70 transition-opacity z-10">
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
        <span style={{ color: MUTED, background: BG }} className="font-body text-sm z-10">
          {f.stepLabel} {step}/{TOTAL}
        </span>
      </div>

      {/* Step content */}
      <div
        className="max-w-2xl mx-auto px-6 py-16"
        style={{
          opacity: transitioning ? 0 : 1,
          transform: transitioning ? 'translateY(8px)' : 'translateY(0)',
          transition: 'opacity 0.2s ease, transform 0.2s ease',
        }}
      >

        {/* Step 1: About your business */}
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div>
              <p style={{ color: MUTED }} className="font-body text-sm tracking-widest uppercase mb-3">
                {f.step1.label}
              </p>
              <h2 className="font-display text-3xl font-normal">{f.step1.heading}</h2>
            </div>

            <Input label={f.step1.businessName} value={data.businessName} onChange={(v) => set('businessName', v)} />
            <Input label={f.step1.tagline} value={data.tagline} onChange={(v) => set('tagline', v)} placeholder={f.step1.taglinePlaceholder} />

            <div>
              <label style={{ color: MUTED, display: 'block', fontFamily: 'var(--font-body)', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>
                {f.step1.services}
              </label>
              {data.services.map((svc, idx) => (
                <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr auto', gap: '8px', marginBottom: '8px', alignItems: 'start' }}>
                  <input
                    type="text"
                    value={svc.name}
                    onChange={(e) => updateService(idx, 'name', e.target.value)}
                    placeholder={f.step1.serviceName}
                    style={{ background: 'transparent', border: `1px solid ${BORDER}`, color: TEXT, padding: '11px 13px', fontFamily: 'var(--font-body)', fontSize: '14px', outline: 'none' }}
                    onFocus={(e) => (e.target.style.borderColor = TEXT)}
                    onBlur={(e) => (e.target.style.borderColor = BORDER)}
                  />
                  <input
                    type="text"
                    value={svc.description}
                    onChange={(e) => updateService(idx, 'description', e.target.value)}
                    placeholder={f.step1.serviceDesc}
                    style={{ background: 'transparent', border: `1px solid ${BORDER}`, color: TEXT, padding: '11px 13px', fontFamily: 'var(--font-body)', fontSize: '14px', outline: 'none' }}
                    onFocus={(e) => (e.target.style.borderColor = TEXT)}
                    onBlur={(e) => (e.target.style.borderColor = BORDER)}
                  />
                  {idx > 0 && (
                    <button onClick={() => removeService(idx)} style={{ color: MUTED, background: 'none', border: 'none', cursor: 'pointer', padding: '11px 8px', fontSize: '18px', lineHeight: 1 }}>×</button>
                  )}
                </div>
              ))}
              {data.services.length < 5 && (
                <button onClick={addService} style={{ color: MUTED, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '13px', padding: '4px 0', marginTop: '4px' }}>
                  + {f.step1.addService}
                </button>
              )}
            </div>

            <RadioCards label={f.step1.pricingPublic} options={f.step1.pricingOptions} value={data.pricingPublic} onChange={(v) => set('pricingPublic', v)} />
            <Textarea label={f.step1.targetAudience} value={data.targetAudience} onChange={(v) => set('targetAudience', v)} placeholder={f.step1.targetAudiencePlaceholder} rows={3} />
            <Textarea label={f.step1.painPoints} value={data.audiencePainPoints} onChange={(v) => set('audiencePainPoints', v)} placeholder={f.step1.painPointsPlaceholder} rows={3} />
          </div>
        )}

        {/* Step 2: Your story + voice */}
        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div>
              <p style={{ color: MUTED }} className="font-body text-sm tracking-widest uppercase mb-3">
                {f.step2.label}
              </p>
              <h2 className="font-display text-3xl font-normal">{f.step2.heading}</h2>
            </div>

            <Textarea label={f.step2.bio} value={data.bio} onChange={(v) => set('bio', v)} placeholder={f.step2.bioPlaceholder} rows={5} hint={f.step2.bioHint} />
            <Textarea label={f.step2.credentials} value={data.credentials} onChange={(v) => set('credentials', v)} placeholder={f.step2.credentialsPlaceholder} rows={3} />

            <TagPillInput
              label={f.step2.toneLabel}
              hint={f.step2.toneHint}
              tags={data.toneOfVoice}
              onChange={(v) => set('toneOfVoice', v)}
              placeholder={f.step2.tonePlaceholder}
            />

            <Textarea label={f.step2.whyStarted} value={data.whyStarted} onChange={(v) => set('whyStarted', v)} placeholder={f.step2.whyStartedPlaceholder} rows={4} hint={f.step2.whyStartedHint} />
          </div>
        )}

        {/* Step 3: Goals + structure */}
        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div>
              <p style={{ color: MUTED }} className="font-body text-sm tracking-widest uppercase mb-3">
                {f.step3.label}
              </p>
              <h2 className="font-display text-3xl font-normal">{f.step3.heading}</h2>
            </div>

            <CheckboxGroup label={f.step3.siteGoals} options={f.step3.goalOptions} selected={data.siteGoals} onChange={(v) => set('siteGoals', v)} />
            <CheckboxGroup label={f.step3.pages} options={f.step3.pageOptions} selected={data.pages} onChange={(v) => set('pages', v)} />
            <RadioCards label={f.step3.languages} options={f.step3.languageOptions} value={data.languages} onChange={(v) => set('languages', v)} />
            <RadioCards label={f.step3.urgency} options={f.step3.urgencyOptions} value={data.urgency} onChange={(v) => set('urgency', v)} />
          </div>
        )}

        {/* Step 4: Technical + brand */}
        {step === 4 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div>
              <p style={{ color: MUTED }} className="font-body text-sm tracking-widest uppercase mb-3">
                {f.step4.label}
              </p>
              <h2 className="font-display text-3xl font-normal">{f.step4.heading}</h2>
            </div>

            <SectionDivider title={f.step4.sectionTech} />
            <RadioCards label={f.step4.hasDomain} options={f.step4.domainOptions} value={data.hasDomain} onChange={(v) => set('hasDomain', v)} />
            {data.hasDomain === 'yes' && (
              <Input label={f.step4.domainName} value={data.domainName} onChange={(v) => set('domainName', v)} placeholder="yourdomain.com" />
            )}
            <Input label={f.step4.existingSite} value={data.existingSite} onChange={(v) => set('existingSite', v)} placeholder="https://..." />
            <RadioCards label={f.step4.bookingSystem} options={f.step4.bookingOptions} value={data.bookingSystem} onChange={(v) => set('bookingSystem', v)} />
            {data.bookingSystem === 'other' && (
              <Input label={f.step4.bookingOther} value={data.bookingOther} onChange={(v) => set('bookingOther', v)} />
            )}
            <RadioCards label={f.step4.newsletterPlatform} options={f.step4.newsletterOptions} value={data.newsletterPlatform} onChange={(v) => set('newsletterPlatform', v)} />

            <SectionDivider title={f.step4.sectionBrand} />
            <ColorSwatchInputs
              label={f.step4.brandColors}
              colors={[data.brandColor1, data.brandColor2, data.brandColor3]}
              onChange={(idx, val) => {
                if (idx === 0) set('brandColor1', val);
                else if (idx === 1) set('brandColor2', val);
                else set('brandColor3', val);
              }}
            />
            <RadioCards label={f.step4.hasLogo} options={f.step4.logoOptions} value={data.hasLogo} onChange={(v) => set('hasLogo', v)} />
            {data.hasLogo === 'yes' && (
              <p style={{ color: MUTED, fontFamily: 'var(--font-body)', fontSize: '14px', padding: '12px 16px', border: `1px solid ${BORDER}` }}>
                {f.step4.logoUploadNote}
              </p>
            )}
            <RadioCards label={f.step4.hasPhotos} options={f.step4.photoOptions} value={data.hasPhotos} onChange={(v) => set('hasPhotos', v)} />

            <SectionDivider title={f.step4.sectionInspiration} />
            <p style={{ color: MUTED, fontFamily: 'var(--font-body)', fontSize: '14px', marginTop: '-16px' }}>{f.step4.inspirationHint}</p>
            {([1, 2, 3] as const).map((n) => (
              <div key={n} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <input
                  type="url"
                  value={data[`inspiration${n}Url` as keyof BriefData] as string}
                  onChange={(e) => set(`inspiration${n}Url` as keyof BriefData, e.target.value)}
                  placeholder={`https://...`}
                  style={{ background: 'transparent', border: `1px solid ${BORDER}`, color: TEXT, padding: '11px 13px', fontFamily: 'var(--font-body)', fontSize: '14px', outline: 'none' }}
                  onFocus={(e) => (e.target.style.borderColor = TEXT)}
                  onBlur={(e) => (e.target.style.borderColor = BORDER)}
                />
                <input
                  type="text"
                  value={data[`inspiration${n}Why` as keyof BriefData] as string}
                  onChange={(e) => set(`inspiration${n}Why` as keyof BriefData, e.target.value)}
                  placeholder={f.step4.inspirationWhy}
                  style={{ background: 'transparent', border: `1px solid ${BORDER}`, color: TEXT, padding: '11px 13px', fontFamily: 'var(--font-body)', fontSize: '14px', outline: 'none' }}
                  onFocus={(e) => (e.target.style.borderColor = TEXT)}
                  onBlur={(e) => (e.target.style.borderColor = BORDER)}
                />
              </div>
            ))}

            <SectionDivider title={f.step4.sectionCopy} />
            <RadioCards label={f.step4.copyStatus} options={f.step4.copyOptions} value={data.copyStatus} onChange={(v) => set('copyStatus', v)} />
            <p style={{ color: MUTED, fontFamily: 'var(--font-body)', fontSize: '13px', marginTop: '-16px' }}>{f.step4.copyHint}</p>

            <SectionDivider title={f.step4.sectionContact} />
            <Input label={f.step4.name} value={data.name} onChange={(v) => set('name', v)} />
            <Input label={f.step4.email} value={data.email} onChange={(v) => set('email', v)} type="email" />
            <Textarea label={f.step4.anythingElse} value={data.anythingElse} onChange={(v) => set('anythingElse', v)} rows={3} />

            {error && <p style={{ color: '#B85C38', fontFamily: 'var(--font-body)', fontSize: '14px' }}>{error}</p>}
          </div>
        )}

        {/* Navigation */}
        <div style={{ marginTop: '48px', display: 'flex', alignItems: 'center', gap: '24px' }}>
          {step > 1 && (
            <button
              onClick={() => transition(step - 1)}
              style={{ color: MUTED, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '15px', padding: 0 }}
            >
              ← {f.back}
            </button>
          )}
          {step < TOTAL ? (
            <button
              onClick={() => transition(step + 1)}
              style={{ background: TEXT, color: BG, border: 'none', padding: '16px 36px', fontFamily: 'var(--font-body)', fontSize: '16px', fontWeight: 500, cursor: 'pointer' }}
            >
              {f.next} →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              style={{ background: TEXT, color: BG, border: 'none', padding: '16px 36px', fontFamily: 'var(--font-body)', fontSize: '16px', fontWeight: 500, cursor: submitting ? 'not-allowed' : 'pointer', opacity: submitting ? 0.7 : 1 }}
            >
              {submitting ? f.submitting : f.submit}
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
