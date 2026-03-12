'use client';

import { useState, useCallback } from 'react';
import { Dictionary, Locale } from '@/lib/i18n';

interface OnboardingFormProps {
  dict: Dictionary;
  locale: Locale;
}

interface Step1Data {
  name: string;
  email: string;
  workType: string;
  workTypeOther: string;
  currentSituation: string;
  mainGoal: string;
  timeline: string;
  additionalInfo: string;
}

interface Step2Data {
  businessName: string;
  currentUrl: string;
  industry: string;
  yearsInBusiness: string;
  audienceLanguage: string;
  idealClient: string;
  ageRanges: string[];
  painPoints: string;
  toneOfVoice: string[];
  brandColors: string;
  hasLogo: string;
  pagesNeeded: string[];
  otherPages: string;
  hasCopy: string;
  hasPhotos: string;
  integrations: string[];
  domainSituation: string;
  hosting: string;
  budget: string;
  launchMonth: string;
  retainerInterest: string;
  inspirationUrl1: string;
  inspirationUrl2: string;
  inspirationUrl3: string;
  whatYouLove: string;
  whatToAvoid: string;
  anythingElse: string;
}

export function OnboardingForm({ dict, locale }: OnboardingFormProps) {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const [step1Data, setStep1Data] = useState<Step1Data>({
    name: '',
    email: '',
    workType: '',
    workTypeOther: '',
    currentSituation: '',
    mainGoal: '',
    timeline: '',
    additionalInfo: '',
  });

  const [step2Data, setStep2Data] = useState<Step2Data>({
    businessName: '',
    currentUrl: '',
    industry: '',
    yearsInBusiness: '',
    audienceLanguage: '',
    idealClient: '',
    ageRanges: [],
    painPoints: '',
    toneOfVoice: [],
    brandColors: '',
    hasLogo: '',
    pagesNeeded: [],
    otherPages: '',
    hasCopy: '',
    hasPhotos: '',
    integrations: [],
    domainSituation: '',
    hosting: '',
    budget: '',
    launchMonth: '',
    retainerInterest: '',
    inspirationUrl1: '',
    inspirationUrl2: '',
    inspirationUrl3: '',
    whatYouLove: '',
    whatToAvoid: '',
    anythingElse: '',
  });

  const totalQuestions = 6;
  const formDict = dict.form;

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const goToQuestion = useCallback((questionNum: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentQuestion(questionNum);
      setIsTransitioning(false);
    }, 150);
  }, []);

  const goBack = useCallback(() => {
    if (currentQuestion > 1) {
      goToQuestion(currentQuestion - 1);
    }
  }, [currentQuestion, goToQuestion]);

  const goNext = useCallback(() => {
    setValidationErrors({});

    // Validate current question
    if (currentQuestion === 1) {
      const errors: Record<string, string> = {};
      if (!step1Data.name.trim()) {
        errors.name = formDict.validation.required;
      }
      if (!step1Data.email.trim()) {
        errors.email = formDict.validation.required;
      } else if (!validateEmail(step1Data.email)) {
        errors.email = formDict.validation.invalidEmail;
      }
      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        return;
      }
    }

    if (currentQuestion === 2 && !step1Data.workType) {
      return;
    }

    if (currentQuestion === 3 && !step1Data.currentSituation) {
      return;
    }

    if (currentQuestion === 4 && !step1Data.mainGoal) {
      return;
    }

    if (currentQuestion === 5 && !step1Data.timeline) {
      return;
    }

    if (currentQuestion < totalQuestions) {
      goToQuestion(currentQuestion + 1);
    } else {
      // Move to step 2
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStep(2);
        setIsTransitioning(false);
      }, 150);
    }
  }, [currentQuestion, step1Data, formDict.validation, goToQuestion]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    const payload = {
      name: step1Data.name,
      email: step1Data.email,
      locale,
      step1: {
        workType: step1Data.workType === 'other' ? step1Data.workTypeOther : step1Data.workType,
        currentSituation: step1Data.currentSituation,
        mainGoal: step1Data.mainGoal,
        timeline: step1Data.timeline,
        additionalInfo: step1Data.additionalInfo,
      },
      step2: step2Data,
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

  const updateStep1 = <K extends keyof Step1Data>(key: K, value: Step1Data[K]) => {
    setStep1Data(prev => ({ ...prev, [key]: value }));
    if (validationErrors[key]) {
      setValidationErrors(prev => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const updateStep2 = <K extends keyof Step2Data>(key: K, value: Step2Data[K]) => {
    setStep2Data(prev => ({ ...prev, [key]: value }));
  };

  const toggleArrayValue = (key: keyof Step2Data, value: string) => {
    const currentArray = step2Data[key] as string[];
    if (currentArray.includes(value)) {
      updateStep2(key, currentArray.filter(v => v !== value) as Step2Data[typeof key]);
    } else {
      updateStep2(key, [...currentArray, value] as Step2Data[typeof key]);
    }
  };

  // Success state
  if (isSuccess) {
    return (
      <main className="min-h-screen bg-cream text-dark flex items-center justify-center px-6">
        <div className="max-w-xl text-center">
          <h1 className="font-display text-4xl md:text-5xl font-normal mb-6">
            {formDict.success.headline}
          </h1>
          <p className="text-lg text-dark/70 mb-4">
            {formDict.success.subtext}
          </p>
          <p className="text-sm text-muted">
            {formDict.success.note}
          </p>
        </div>
      </main>
    );
  }

  // Step 1 - Typeform style
  if (currentStep === 1) {
    return (
      <main className="min-h-screen bg-cream text-dark">
        {/* Progress dots */}
        <div className="fixed top-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {Array.from({ length: totalQuestions }).map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 transition-colors duration-300 ${
                i < currentQuestion ? 'bg-dark' : 'bg-dark/20'
              }`}
            />
          ))}
        </div>

        {/* Back button */}
        {currentQuestion > 1 && (
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
            {/* Question 1: Name & Email */}
            {currentQuestion === 1 && (
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-normal mb-10">
                  {formDict.step1.q1.headline}
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm mb-2">{formDict.step1.q1.nameLabel}</label>
                    <input
                      type="text"
                      value={step1Data.name}
                      onChange={(e) => updateStep1('name', e.target.value)}
                      placeholder={formDict.step1.q1.namePlaceholder}
                      className={`w-full px-4 py-3 bg-transparent border ${
                        validationErrors.name ? 'border-red-500' : 'border-dark/20'
                      } focus:border-accent outline-none transition-colors`}
                    />
                    {validationErrors.name && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm mb-2">{formDict.step1.q1.emailLabel}</label>
                    <input
                      type="email"
                      value={step1Data.email}
                      onChange={(e) => updateStep1('email', e.target.value)}
                      placeholder={formDict.step1.q1.emailPlaceholder}
                      className={`w-full px-4 py-3 bg-transparent border ${
                        validationErrors.email ? 'border-red-500' : 'border-dark/20'
                      } focus:border-accent outline-none transition-colors`}
                    />
                    {validationErrors.email && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
                    )}
                  </div>
                  <button
                    onClick={goNext}
                    className="mt-4 px-8 py-3 bg-dark text-light hover:bg-dark/90 transition-colors"
                  >
                    {formDict.step1.q1.continue}
                  </button>
                </div>
              </div>
            )}

            {/* Question 2: Work type */}
            {currentQuestion === 2 && (
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-normal mb-10">
                  {formDict.step1.q2.headline}
                </h2>
                <div className="space-y-3">
                  {[
                    { value: 'coach', label: formDict.step1.q2.coach, desc: formDict.step1.q2.coachDesc },
                    { value: 'consultant', label: formDict.step1.q2.consultant, desc: formDict.step1.q2.consultantDesc },
                    { value: 'trainer', label: formDict.step1.q2.trainer, desc: formDict.step1.q2.trainerDesc },
                    { value: 'other', label: formDict.step1.q2.other, desc: null },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        updateStep1('workType', option.value);
                        if (option.value !== 'other') {
                          setTimeout(() => goNext(), 200);
                        }
                      }}
                      className={`w-full text-left p-4 border transition-colors ${
                        step1Data.workType === option.value
                          ? 'border-accent bg-accent/10'
                          : 'border-dark/20 hover:border-dark/40'
                      }`}
                    >
                      <span className="font-medium">{option.label}</span>
                      {option.desc && (
                        <span className="text-muted ml-2">{option.desc}</span>
                      )}
                    </button>
                  ))}
                  {step1Data.workType === 'other' && (
                    <div className="mt-4">
                      <input
                        type="text"
                        value={step1Data.workTypeOther}
                        onChange={(e) => updateStep1('workTypeOther', e.target.value)}
                        placeholder={formDict.step1.q2.otherPlaceholder}
                        className="w-full px-4 py-3 bg-transparent border border-dark/20 focus:border-accent outline-none transition-colors"
                        autoFocus
                      />
                      <button
                        onClick={goNext}
                        disabled={!step1Data.workTypeOther.trim()}
                        className="mt-4 px-8 py-3 bg-dark text-light hover:bg-dark/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {formDict.step1.q1.continue}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Question 3: Current situation */}
            {currentQuestion === 3 && (
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-normal mb-10">
                  {formDict.step1.q3.headline}
                </h2>
                <div className="space-y-3">
                  {[
                    { value: 'none', label: formDict.step1.q3.noWebsite },
                    { value: 'hasWebsite', label: formDict.step1.q3.hasWebsite },
                    { value: 'rebuilding', label: formDict.step1.q3.rebuilding },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        updateStep1('currentSituation', option.value);
                        setTimeout(() => goNext(), 200);
                      }}
                      className={`w-full text-left p-4 border transition-colors ${
                        step1Data.currentSituation === option.value
                          ? 'border-accent bg-accent/10'
                          : 'border-dark/20 hover:border-dark/40'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Question 4: Main goal */}
            {currentQuestion === 4 && (
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-normal mb-10">
                  {formDict.step1.q4.headline}
                </h2>
                <div className="space-y-3">
                  {[
                    { value: 'clients', label: formDict.step1.q4.clients },
                    { value: 'credibility', label: formDict.step1.q4.credibility },
                    { value: 'replace', label: formDict.step1.q4.replace },
                    { value: 'launch', label: formDict.step1.q4.launch },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        updateStep1('mainGoal', option.value);
                        setTimeout(() => goNext(), 200);
                      }}
                      className={`w-full text-left p-4 border transition-colors ${
                        step1Data.mainGoal === option.value
                          ? 'border-accent bg-accent/10'
                          : 'border-dark/20 hover:border-dark/40'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Question 5: Timeline */}
            {currentQuestion === 5 && (
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-normal mb-10">
                  {formDict.step1.q5.headline}
                </h2>
                <div className="space-y-3">
                  {[
                    { value: 'asap', label: formDict.step1.q5.asap, desc: formDict.step1.q5.asapDesc },
                    { value: 'months', label: formDict.step1.q5.months, desc: formDict.step1.q5.monthsDesc },
                    { value: 'noRush', label: formDict.step1.q5.noRush, desc: formDict.step1.q5.noRushDesc },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        updateStep1('timeline', option.value);
                        setTimeout(() => goNext(), 200);
                      }}
                      className={`w-full text-left p-4 border transition-colors ${
                        step1Data.timeline === option.value
                          ? 'border-accent bg-accent/10'
                          : 'border-dark/20 hover:border-dark/40'
                      }`}
                    >
                      <span className="font-medium">{option.label}</span>
                      <span className="text-muted ml-2">{option.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Question 6: Additional info */}
            {currentQuestion === 6 && (
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-normal mb-10">
                  {formDict.step1.q6.headline}
                </h2>
                <textarea
                  value={step1Data.additionalInfo}
                  onChange={(e) => updateStep1('additionalInfo', e.target.value)}
                  placeholder={formDict.step1.q6.placeholder}
                  rows={5}
                  className="w-full px-4 py-3 bg-transparent border border-dark/20 focus:border-accent outline-none transition-colors resize-none"
                />
                <button
                  onClick={goNext}
                  className="mt-6 px-8 py-3 bg-dark text-light hover:bg-dark/90 transition-colors"
                >
                  {formDict.step1.q6.continue}
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    );
  }

  // Step 2 - Full brief
  return (
    <main className="min-h-screen bg-cream text-dark pb-32 md:pb-8">
      <div
        className={`transition-all duration-300 ease-out ${
          isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
        }`}
      >
        <div className="max-w-2xl mx-auto px-6 py-12">
          <h1 className="font-display text-3xl md:text-4xl font-normal mb-12">
            {formDict.step2.title}
          </h1>

          {/* Section 1: Your business */}
          <section className="mb-12">
            <h2 className="font-display text-2xl font-normal mb-6">
              {formDict.step2.section1.title}
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm mb-2">{formDict.step2.section1.businessName}</label>
                <input
                  type="text"
                  value={step2Data.businessName}
                  onChange={(e) => updateStep2('businessName', e.target.value)}
                  placeholder={formDict.step2.section1.businessNamePlaceholder}
                  className="w-full px-4 py-3 bg-transparent border border-dark/20 focus:border-accent outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">
                  {formDict.step2.section1.currentUrl}{' '}
                  <span className="text-muted">{formDict.step2.section1.currentUrlOptional}</span>
                </label>
                <input
                  type="url"
                  value={step2Data.currentUrl}
                  onChange={(e) => updateStep2('currentUrl', e.target.value)}
                  placeholder={formDict.step2.section1.currentUrlPlaceholder}
                  className="w-full px-4 py-3 bg-transparent border border-dark/20 focus:border-accent outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">{formDict.step2.section1.industry}</label>
                <input
                  type="text"
                  value={step2Data.industry}
                  onChange={(e) => updateStep2('industry', e.target.value)}
                  placeholder={formDict.step2.section1.industryPlaceholder}
                  className="w-full px-4 py-3 bg-transparent border border-dark/20 focus:border-accent outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">{formDict.step2.section1.yearsInBusiness}</label>
                <select
                  value={step2Data.yearsInBusiness}
                  onChange={(e) => updateStep2('yearsInBusiness', e.target.value)}
                  className="w-full px-4 py-3 bg-cream border border-dark/20 focus:border-accent outline-none transition-colors"
                >
                  <option value=""></option>
                  <option value="less1">{formDict.step2.section1.yearsOptions.less1}</option>
                  <option value="1to3">{formDict.step2.section1.yearsOptions.years1to3}</option>
                  <option value="3to10">{formDict.step2.section1.yearsOptions.years3to10}</option>
                  <option value="10plus">{formDict.step2.section1.yearsOptions.years10plus}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-2">{formDict.step2.section1.audienceLanguage}</label>
                <select
                  value={step2Data.audienceLanguage}
                  onChange={(e) => updateStep2('audienceLanguage', e.target.value)}
                  className="w-full px-4 py-3 bg-cream border border-dark/20 focus:border-accent outline-none transition-colors"
                >
                  <option value=""></option>
                  <option value="german">{formDict.step2.section1.languageOptions.german}</option>
                  <option value="english">{formDict.step2.section1.languageOptions.english}</option>
                  <option value="both">{formDict.step2.section1.languageOptions.both}</option>
                  <option value="other">{formDict.step2.section1.languageOptions.other}</option>
                </select>
              </div>
            </div>
          </section>

          <hr className="border-dark/10 mb-12" />

          {/* Section 2: Your audience */}
          <section className="mb-12">
            <h2 className="font-display text-2xl font-normal mb-6">
              {formDict.step2.section2.title}
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm mb-2">{formDict.step2.section2.idealClient}</label>
                <textarea
                  value={step2Data.idealClient}
                  onChange={(e) => updateStep2('idealClient', e.target.value)}
                  placeholder={formDict.step2.section2.idealClientPlaceholder}
                  rows={4}
                  className="w-full px-4 py-3 bg-transparent border border-dark/20 focus:border-accent outline-none transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">{formDict.step2.section2.ageRange}</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: '25-34', label: formDict.step2.section2.ageOptions.age25to34 },
                    { value: '35-44', label: formDict.step2.section2.ageOptions.age35to44 },
                    { value: '45-54', label: formDict.step2.section2.ageOptions.age45to54 },
                    { value: '55+', label: formDict.step2.section2.ageOptions.age55plus },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => toggleArrayValue('ageRanges', option.value)}
                      className={`px-4 py-2 border transition-colors ${
                        step2Data.ageRanges.includes(option.value)
                          ? 'border-accent bg-accent/10'
                          : 'border-dark/20 hover:border-dark/40'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm mb-2">{formDict.step2.section2.painPoints}</label>
                <textarea
                  value={step2Data.painPoints}
                  onChange={(e) => updateStep2('painPoints', e.target.value)}
                  placeholder={formDict.step2.section2.painPointsPlaceholder}
                  rows={4}
                  className="w-full px-4 py-3 bg-transparent border border-dark/20 focus:border-accent outline-none transition-colors resize-none"
                />
              </div>
            </div>
          </section>

          <hr className="border-dark/10 mb-12" />

          {/* Section 3: Brand & tone */}
          <section className="mb-12">
            <h2 className="font-display text-2xl font-normal mb-6">
              {formDict.step2.section3.title}
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm mb-2">{formDict.step2.section3.toneOfVoice}</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: 'warm', label: formDict.step2.section3.toneOptions.warm },
                    { value: 'professional', label: formDict.step2.section3.toneOptions.professional },
                    { value: 'bold', label: formDict.step2.section3.toneOptions.bold },
                    { value: 'minimal', label: formDict.step2.section3.toneOptions.minimal },
                    { value: 'playful', label: formDict.step2.section3.toneOptions.playful },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => toggleArrayValue('toneOfVoice', option.value)}
                      className={`px-4 py-2 border transition-colors ${
                        step2Data.toneOfVoice.includes(option.value)
                          ? 'border-accent bg-accent/10'
                          : 'border-dark/20 hover:border-dark/40'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm mb-2">
                  {formDict.step2.section3.brandColors}{' '}
                  <span className="text-muted">{formDict.step2.section3.brandColorsOptional}</span>
                </label>
                <input
                  type="text"
                  value={step2Data.brandColors}
                  onChange={(e) => updateStep2('brandColors', e.target.value)}
                  placeholder={formDict.step2.section3.brandColorsPlaceholder}
                  className="w-full px-4 py-3 bg-transparent border border-dark/20 focus:border-accent outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">{formDict.step2.section3.hasLogo}</label>
                <div className="flex gap-2">
                  {[
                    { value: 'yes', label: formDict.step2.section3.logoOptions.yes },
                    { value: 'no', label: formDict.step2.section3.logoOptions.no },
                    { value: 'inProgress', label: formDict.step2.section3.logoOptions.inProgress },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => updateStep2('hasLogo', option.value)}
                      className={`px-4 py-2 border transition-colors ${
                        step2Data.hasLogo === option.value
                          ? 'border-accent bg-accent/10'
                          : 'border-dark/20 hover:border-dark/40'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <hr className="border-dark/10 mb-12" />

          {/* Section 4: Pages & content */}
          <section className="mb-12">
            <h2 className="font-display text-2xl font-normal mb-6">
              {formDict.step2.section4.title}
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm mb-2">{formDict.step2.section4.pagesNeeded}</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: 'home', label: formDict.step2.section4.pageOptions.home },
                    { value: 'about', label: formDict.step2.section4.pageOptions.about },
                    { value: 'services', label: formDict.step2.section4.pageOptions.services },
                    { value: 'blog', label: formDict.step2.section4.pageOptions.blog },
                    { value: 'contact', label: formDict.step2.section4.pageOptions.contact },
                    { value: 'pricing', label: formDict.step2.section4.pageOptions.pricing },
                    { value: 'portfolio', label: formDict.step2.section4.pageOptions.portfolio },
                    { value: 'testimonials', label: formDict.step2.section4.pageOptions.testimonials },
                    { value: 'faq', label: formDict.step2.section4.pageOptions.faq },
                    { value: 'other', label: formDict.step2.section4.pageOptions.other },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => toggleArrayValue('pagesNeeded', option.value)}
                      className={`px-4 py-2 border transition-colors ${
                        step2Data.pagesNeeded.includes(option.value)
                          ? 'border-accent bg-accent/10'
                          : 'border-dark/20 hover:border-dark/40'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                {step2Data.pagesNeeded.includes('other') && (
                  <input
                    type="text"
                    value={step2Data.otherPages}
                    onChange={(e) => updateStep2('otherPages', e.target.value)}
                    placeholder={formDict.step2.section4.otherPagesPlaceholder}
                    className="w-full mt-3 px-4 py-3 bg-transparent border border-dark/20 focus:border-accent outline-none transition-colors"
                  />
                )}
              </div>
              <div>
                <label className="block text-sm mb-2">{formDict.step2.section4.hasCopy}</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: 'yes', label: formDict.step2.section4.copyOptions.yes },
                    { value: 'partially', label: formDict.step2.section4.copyOptions.partially },
                    { value: 'no', label: formDict.step2.section4.copyOptions.no },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => updateStep2('hasCopy', option.value)}
                      className={`px-4 py-2 border transition-colors ${
                        step2Data.hasCopy === option.value
                          ? 'border-accent bg-accent/10'
                          : 'border-dark/20 hover:border-dark/40'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm mb-2">{formDict.step2.section4.hasPhotos}</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: 'yes', label: formDict.step2.section4.photoOptions.yes },
                    { value: 'noNeedPhotographer', label: formDict.step2.section4.photoOptions.noNeedPhotographer },
                    { value: 'useStock', label: formDict.step2.section4.photoOptions.useStock },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => updateStep2('hasPhotos', option.value)}
                      className={`px-4 py-2 border transition-colors ${
                        step2Data.hasPhotos === option.value
                          ? 'border-accent bg-accent/10'
                          : 'border-dark/20 hover:border-dark/40'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <hr className="border-dark/10 mb-12" />

          {/* Section 5: Technical needs */}
          <section className="mb-12">
            <h2 className="font-display text-2xl font-normal mb-6">
              {formDict.step2.section5.title}
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm mb-2">{formDict.step2.section5.integrations}</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: 'newsletter', label: formDict.step2.section5.integrationOptions.newsletter },
                    { value: 'booking', label: formDict.step2.section5.integrationOptions.booking },
                    { value: 'payment', label: formDict.step2.section5.integrationOptions.payment },
                    { value: 'video', label: formDict.step2.section5.integrationOptions.video },
                    { value: 'multilingual', label: formDict.step2.section5.integrationOptions.multilingual },
                    { value: 'none', label: formDict.step2.section5.integrationOptions.none },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => toggleArrayValue('integrations', option.value)}
                      className={`px-4 py-2 border transition-colors ${
                        step2Data.integrations.includes(option.value)
                          ? 'border-accent bg-accent/10'
                          : 'border-dark/20 hover:border-dark/40'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm mb-2">{formDict.step2.section5.domainSituation}</label>
                <select
                  value={step2Data.domainSituation}
                  onChange={(e) => updateStep2('domainSituation', e.target.value)}
                  className="w-full px-4 py-3 bg-cream border border-dark/20 focus:border-accent outline-none transition-colors"
                >
                  <option value=""></option>
                  <option value="hasDomain">{formDict.step2.section5.domainOptions.hasDomain}</option>
                  <option value="needDomain">{formDict.step2.section5.domainOptions.needDomain}</option>
                  <option value="notSure">{formDict.step2.section5.domainOptions.notSure}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-2">{formDict.step2.section5.hosting}</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: 'euHosting', label: formDict.step2.section5.hostingOptions.euHosting },
                    { value: 'ownHosting', label: formDict.step2.section5.hostingOptions.ownHosting },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => updateStep2('hosting', option.value)}
                      className={`px-4 py-2 border transition-colors ${
                        step2Data.hosting === option.value
                          ? 'border-accent bg-accent/10'
                          : 'border-dark/20 hover:border-dark/40'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <hr className="border-dark/10 mb-12" />

          {/* Section 6: Investment & timeline */}
          <section className="mb-12">
            <h2 className="font-display text-2xl font-normal mb-6">
              {formDict.step2.section6.title}
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm mb-2">{formDict.step2.section6.budget}</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { value: 'tier1', label: formDict.step2.section6.budgetOptions.tier1 },
                    { value: 'tier2', label: formDict.step2.section6.budgetOptions.tier2 },
                    { value: 'tier3', label: formDict.step2.section6.budgetOptions.tier3 },
                    { value: 'notSure', label: formDict.step2.section6.budgetOptions.notSure },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => updateStep2('budget', option.value)}
                      className={`p-4 border text-center transition-colors ${
                        step2Data.budget === option.value
                          ? 'border-accent bg-accent/10'
                          : 'border-dark/20 hover:border-dark/40'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm mb-2">{formDict.step2.section6.launchMonth}</label>
                <input
                  type="text"
                  value={step2Data.launchMonth}
                  onChange={(e) => updateStep2('launchMonth', e.target.value)}
                  placeholder={formDict.step2.section6.launchMonthPlaceholder}
                  className="w-full px-4 py-3 bg-transparent border border-dark/20 focus:border-accent outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">{formDict.step2.section6.retainerInterest}</label>
                <div className="flex gap-2">
                  {[
                    { value: 'yes', label: formDict.step2.section6.retainerOptions.yes },
                    { value: 'maybe', label: formDict.step2.section6.retainerOptions.maybe },
                    { value: 'no', label: formDict.step2.section6.retainerOptions.no },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => updateStep2('retainerInterest', option.value)}
                      className={`px-4 py-2 border transition-colors ${
                        step2Data.retainerInterest === option.value
                          ? 'border-accent bg-accent/10'
                          : 'border-dark/20 hover:border-dark/40'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <hr className="border-dark/10 mb-12" />

          {/* Section 7: Inspiration */}
          <section className="mb-12">
            <h2 className="font-display text-2xl font-normal mb-6">
              {formDict.step2.section7.title}
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm mb-2">
                  {formDict.step2.section7.inspirationUrls}{' '}
                  <span className="text-muted">{formDict.step2.section7.urlOptional}</span>
                </label>
                <div className="space-y-3">
                  <input
                    type="url"
                    value={step2Data.inspirationUrl1}
                    onChange={(e) => updateStep2('inspirationUrl1', e.target.value)}
                    placeholder={formDict.step2.section7.urlPlaceholder}
                    className="w-full px-4 py-3 bg-transparent border border-dark/20 focus:border-accent outline-none transition-colors"
                  />
                  <input
                    type="url"
                    value={step2Data.inspirationUrl2}
                    onChange={(e) => updateStep2('inspirationUrl2', e.target.value)}
                    placeholder={formDict.step2.section7.urlPlaceholder}
                    className="w-full px-4 py-3 bg-transparent border border-dark/20 focus:border-accent outline-none transition-colors"
                  />
                  <input
                    type="url"
                    value={step2Data.inspirationUrl3}
                    onChange={(e) => updateStep2('inspirationUrl3', e.target.value)}
                    placeholder={formDict.step2.section7.urlPlaceholder}
                    className="w-full px-4 py-3 bg-transparent border border-dark/20 focus:border-accent outline-none transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm mb-2">{formDict.step2.section7.whatYouLove}</label>
                <textarea
                  value={step2Data.whatYouLove}
                  onChange={(e) => updateStep2('whatYouLove', e.target.value)}
                  placeholder={formDict.step2.section7.whatYouLovePlaceholder}
                  rows={3}
                  className="w-full px-4 py-3 bg-transparent border border-dark/20 focus:border-accent outline-none transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">{formDict.step2.section7.whatToAvoid}</label>
                <textarea
                  value={step2Data.whatToAvoid}
                  onChange={(e) => updateStep2('whatToAvoid', e.target.value)}
                  placeholder={formDict.step2.section7.whatToAvoidPlaceholder}
                  rows={3}
                  className="w-full px-4 py-3 bg-transparent border border-dark/20 focus:border-accent outline-none transition-colors resize-none"
                />
              </div>
            </div>
          </section>

          <hr className="border-dark/10 mb-12" />

          {/* Section 8: Final notes */}
          <section className="mb-12">
            <h2 className="font-display text-2xl font-normal mb-6">
              {formDict.step2.section8.title}
            </h2>
            <div>
              <label className="block text-sm mb-2">
                {formDict.step2.section8.anythingElse}{' '}
                <span className="text-muted">{formDict.step2.section8.optional}</span>
              </label>
              <textarea
                value={step2Data.anythingElse}
                onChange={(e) => updateStep2('anythingElse', e.target.value)}
                placeholder={formDict.step2.section8.anythingElsePlaceholder}
                rows={4}
                className="w-full px-4 py-3 bg-transparent border border-dark/20 focus:border-accent outline-none transition-colors resize-none"
              />
            </div>
          </section>

          {/* Error message */}
          {submitError && (
            <div className="mb-6 p-4 border border-red-500 bg-red-50 text-red-700">
              {submitError}
            </div>
          )}

          {/* Submit button - desktop */}
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="hidden md:block w-full py-4 bg-dark text-light hover:bg-dark/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg font-medium"
          >
            {isSubmitting ? '...' : formDict.step2.submit}
          </button>
        </div>

        {/* Submit button - mobile sticky */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-cream border-t border-dark/10">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full py-4 bg-dark text-light hover:bg-dark/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg font-medium"
          >
            {isSubmitting ? '...' : formDict.step2.submit}
          </button>
        </div>
      </div>
    </main>
  );
}
