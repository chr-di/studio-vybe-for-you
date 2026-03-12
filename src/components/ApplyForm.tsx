'use client';

import { useState, useCallback } from 'react';
import { Dictionary, Locale } from '@/lib/i18n';

interface ApplyFormProps {
  dict: Dictionary;
  locale: Locale;
}

interface FormData {
  name: string;
  email: string;
  businessName: string;
  whatYouDo: string;
  whoYouHelp: string;
  mainCta: string;
  vibe: string;
  hasLogo: string;
}

export function ApplyForm({ dict, locale }: ApplyFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    businessName: '',
    whatYouDo: '',
    whoYouHelp: '',
    mainCta: '',
    vibe: '',
    hasLogo: '',
  });

  const totalSteps = 5;
  const applyDict = dict.apply;
  const formDict = dict.form;

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const goToStep = useCallback((stepNum: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStep(stepNum);
      setIsTransitioning(false);
    }, 150);
  }, []);

  const goBack = useCallback(() => {
    if (currentStep > 1) {
      goToStep(currentStep - 1);
    }
  }, [currentStep, goToStep]);

  const goNext = useCallback(() => {
    setValidationErrors({});

    if (currentStep === 1) {
      const errors: Record<string, string> = {};
      if (!formData.name.trim()) {
        errors.name = formDict.validation.required;
      }
      if (!formData.email.trim()) {
        errors.email = formDict.validation.required;
      } else if (!validateEmail(formData.email)) {
        errors.email = formDict.validation.invalidEmail;
      }
      if (!formData.businessName.trim()) {
        errors.businessName = formDict.validation.required;
      }
      if (!formData.whatYouDo.trim()) {
        errors.whatYouDo = formDict.validation.required;
      }
      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        return;
      }
    }

    if (currentStep === 2 && !formData.whoYouHelp.trim()) {
      setValidationErrors({ whoYouHelp: formDict.validation.required });
      return;
    }

    if (currentStep === 3 && !formData.mainCta) {
      return;
    }

    if (currentStep === 4 && !formData.vibe) {
      return;
    }

    if (currentStep === 5 && !formData.hasLogo) {
      return;
    }

    if (currentStep < totalSteps) {
      goToStep(currentStep + 1);
    }
  }, [currentStep, formData, formDict.validation, goToStep]);

  const handleSubmit = async () => {
    if (!formData.hasLogo) return;

    setIsSubmitting(true);
    setSubmitError(null);

    const payload = {
      name: formData.name,
      email: formData.email,
      business_name: formData.businessName,
      what_you_do: formData.whatYouDo,
      who_you_help: formData.whoYouHelp,
      main_cta: formData.mainCta,
      vibe: formData.vibe,
      has_logo: formData.hasLogo,
      locale,
      form: 'apply',
    };

    try {
      const response = await fetch('https://n8n.dian.solutions/webhook/studio-vybe-intake', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Submit failed');
      }

      setIsSuccess(true);
    } catch {
      setSubmitError(formDict.error.submitFailed);
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    if (validationErrors[key]) {
      setValidationErrors(prev => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  // Success state
  if (isSuccess) {
    return (
      <main className="min-h-screen bg-cream text-dark flex items-center justify-center px-6">
        <div className="max-w-xl text-center">
          <h1 className="font-display text-4xl md:text-5xl font-normal mb-6">
            {applyDict.success.headline}
          </h1>
          <p className="text-lg text-dark/70 mb-8">
            {applyDict.success.subtext}
          </p>
          <a
            href={`/${locale}/brief`}
            className="text-accent hover:text-accent/80 transition-colors underline underline-offset-4"
          >
            {applyDict.success.briefLink}
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream text-dark">
      {/* Progress dots */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 transition-colors duration-300 ${
              i < currentStep ? 'bg-dark' : 'bg-dark/20'
            }`}
          />
        ))}
      </div>

      {/* Back button */}
      {currentStep > 1 && (
        <button
          onClick={goBack}
          className="fixed top-8 left-6 text-dark/60 hover:text-dark transition-colors text-sm"
        >
          {formDict.back}
        </button>
      )}

      <div className="min-h-screen flex items-center justify-center px-6 py-24">
        <div
          className={`max-w-xl w-full transition-all duration-300 ease-out ${
            isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}
        >
          {/* Step 1: Basic info */}
          {currentStep === 1 && (
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-normal mb-10">
                {applyDict.step1.intro}
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm mb-2">{applyDict.step1.nameLabel}</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    placeholder={applyDict.step1.namePlaceholder}
                    className={`w-full px-4 py-3 bg-transparent border ${
                      validationErrors.name ? 'border-red-500' : 'border-dark/20'
                    } focus:border-accent outline-none transition-colors`}
                  />
                  {validationErrors.name && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm mb-2">{applyDict.step1.emailLabel}</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder={applyDict.step1.emailPlaceholder}
                    className={`w-full px-4 py-3 bg-transparent border ${
                      validationErrors.email ? 'border-red-500' : 'border-dark/20'
                    } focus:border-accent outline-none transition-colors`}
                  />
                  {validationErrors.email && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm mb-2">{applyDict.step1.businessNameLabel}</label>
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => updateField('businessName', e.target.value)}
                    placeholder={applyDict.step1.businessNamePlaceholder}
                    className={`w-full px-4 py-3 bg-transparent border ${
                      validationErrors.businessName ? 'border-red-500' : 'border-dark/20'
                    } focus:border-accent outline-none transition-colors`}
                  />
                  {validationErrors.businessName && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.businessName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm mb-2">{applyDict.step1.whatYouDoLabel}</label>
                  <input
                    type="text"
                    value={formData.whatYouDo}
                    onChange={(e) => updateField('whatYouDo', e.target.value)}
                    placeholder={applyDict.step1.whatYouDoPlaceholder}
                    className={`w-full px-4 py-3 bg-transparent border ${
                      validationErrors.whatYouDo ? 'border-red-500' : 'border-dark/20'
                    } focus:border-accent outline-none transition-colors`}
                  />
                  {validationErrors.whatYouDo && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.whatYouDo}</p>
                  )}
                </div>
                <button
                  onClick={goNext}
                  className="mt-4 px-8 py-4 bg-dark text-light font-medium hover:bg-dark/90 transition-colors"
                >
                  {applyDict.step1.continue}
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Who do you help? */}
          {currentStep === 2 && (
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-normal mb-10">
                {applyDict.step2.headline}
              </h2>
              <div className="space-y-6">
                <input
                  type="text"
                  value={formData.whoYouHelp}
                  onChange={(e) => updateField('whoYouHelp', e.target.value)}
                  placeholder={applyDict.step2.placeholder}
                  className={`w-full px-4 py-3 bg-transparent border ${
                    validationErrors.whoYouHelp ? 'border-red-500' : 'border-dark/20'
                  } focus:border-accent outline-none transition-colors`}
                />
                {validationErrors.whoYouHelp && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.whoYouHelp}</p>
                )}
                <button
                  onClick={goNext}
                  className="mt-4 px-8 py-4 bg-dark text-light font-medium hover:bg-dark/90 transition-colors"
                >
                  {applyDict.step1.continue}
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Main CTA */}
          {currentStep === 3 && (
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-normal mb-10">
                {applyDict.step3.headline}
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: 'bookCall', label: applyDict.step3.options.bookCall },
                  { value: 'buyCourse', label: applyDict.step3.options.buyCourse },
                  { value: 'joinList', label: applyDict.step3.options.joinList },
                  { value: 'getQuote', label: applyDict.step3.options.getQuote },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      updateField('mainCta', option.value);
                      setTimeout(() => goToStep(4), 200);
                    }}
                    className={`p-6 border text-center transition-colors ${
                      formData.mainCta === option.value
                        ? 'border-accent bg-accent/10'
                        : 'border-dark/20 hover:border-dark/40'
                    }`}
                  >
                    <span className="font-medium">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Pick a vibe */}
          {currentStep === 4 && (
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-normal mb-10">
                {applyDict.step4.headline}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { value: 'warm', label: applyDict.step4.vibes.warm.label, desc: applyDict.step4.vibes.warm.desc },
                  { value: 'minimal', label: applyDict.step4.vibes.minimal.label, desc: applyDict.step4.vibes.minimal.desc },
                  { value: 'bold', label: applyDict.step4.vibes.bold.label, desc: applyDict.step4.vibes.bold.desc },
                  { value: 'editorial', label: applyDict.step4.vibes.editorial.label, desc: applyDict.step4.vibes.editorial.desc },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      updateField('vibe', option.value);
                      setTimeout(() => goToStep(5), 200);
                    }}
                    className={`p-6 border text-left transition-colors ${
                      formData.vibe === option.value
                        ? 'border-accent bg-accent/10'
                        : 'border-dark/20 hover:border-dark/40'
                    }`}
                  >
                    <span className="font-medium block mb-1">{option.label}</span>
                    <span className="text-muted text-sm">{option.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Do you have a logo? */}
          {currentStep === 5 && (
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-normal mb-10">
                {applyDict.step5.headline}
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: 'yes', label: applyDict.step5.yes },
                    { value: 'notYet', label: applyDict.step5.notYet },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => updateField('hasLogo', option.value)}
                      className={`p-6 border text-center transition-colors ${
                        formData.hasLogo === option.value
                          ? 'border-accent bg-accent/10'
                          : 'border-dark/20 hover:border-dark/40'
                      }`}
                    >
                      <span className="font-medium">{option.label}</span>
                    </button>
                  ))}
                </div>

                {formData.hasLogo === 'yes' && (
                  <p className="text-sm text-muted mt-4 p-4 border border-dark/10 bg-dark/5">
                    {applyDict.step5.uploadNote}
                  </p>
                )}

                {submitError && (
                  <div className="p-4 border border-red-500 bg-red-50 text-red-700">
                    {submitError}
                  </div>
                )}

                {formData.hasLogo && (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full mt-6 px-8 py-4 bg-dark text-light font-medium hover:bg-dark/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? '...' : applyDict.submit}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
