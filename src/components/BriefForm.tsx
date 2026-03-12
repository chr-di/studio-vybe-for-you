'use client';

import { useState, useEffect, useRef } from 'react';
import { Dictionary, Locale } from '@/lib/i18n';

interface BriefFormProps {
  dict: Dictionary;
  locale: Locale;
}

interface Service {
  name: string;
  description: string;
}

interface Inspiration {
  url: string;
  love: string;
}

interface FormData {
  // About the business
  businessName: string;
  tagline: string;
  services: Service[];
  pricingPublic: string;
  whoAreThey: string;
  painPoints: string;
  whereHangOut: string[];
  // Your story
  bio: string;
  credentials: string;
  whyStarted: string;
  // Site goals
  accomplish: string[];
  pagesNeeded: string[];
  languages: string;
  // Technical
  hasDomain: string;
  domainName: string;
  existingUrl: string;
  bookingSystem: string;
  bookingOther: string;
  newsletter: string;
  newsletterOther: string;
  otherIntegrations: string;
  // Brand & design
  logo: string;
  brandColor1: string;
  brandColor2: string;
  brandColor3: string;
  helpChooseColors: boolean;
  fonts: string;
  helpChooseFonts: boolean;
  inspirations: Inspiration[];
  professionalPhotos: string;
  // Copy
  existingCopy: string;
  existingCopyText: string;
  tone1: string;
  tone2: string;
  tone3: string;
  // Timeline & admin
  urgency: string;
  anythingElse: string;
  name: string;
  email: string;
}

const sectionIds = [
  'aboutBusiness',
  'yourStory',
  'siteGoals',
  'technical',
  'brandDesign',
  'copy',
  'timelineAdmin',
];

export function BriefForm({ dict, locale }: BriefFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [activeSection, setActiveSection] = useState('aboutBusiness');
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const [formData, setFormData] = useState<FormData>({
    businessName: '',
    tagline: '',
    services: [{ name: '', description: '' }],
    pricingPublic: '',
    whoAreThey: '',
    painPoints: '',
    whereHangOut: [],
    bio: '',
    credentials: '',
    whyStarted: '',
    accomplish: [],
    pagesNeeded: [],
    languages: '',
    hasDomain: '',
    domainName: '',
    existingUrl: '',
    bookingSystem: '',
    bookingOther: '',
    newsletter: '',
    newsletterOther: '',
    otherIntegrations: '',
    logo: '',
    brandColor1: '',
    brandColor2: '',
    brandColor3: '',
    helpChooseColors: false,
    fonts: '',
    helpChooseFonts: false,
    inspirations: [
      { url: '', love: '' },
      { url: '', love: '' },
      { url: '', love: '' },
    ],
    professionalPhotos: '',
    existingCopy: '',
    existingCopyText: '',
    tone1: '',
    tone2: '',
    tone3: '',
    urgency: '',
    anythingElse: '',
    name: '',
    email: '',
  });

  const briefDict = dict.brief;
  const formDict = dict.form;

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const id of sectionIds) {
        const element = sectionRefs.current[id];
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = sectionRefs.current[id];
    if (element) {
      const offsetTop = element.offsetTop - 100;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const isValidHex = (hex: string) => {
    if (!hex) return false;
    const cleanHex = hex.replace('#', '');
    return /^[0-9A-Fa-f]{6}$/.test(cleanHex) || /^[0-9A-Fa-f]{3}$/.test(cleanHex);
  };

  const handleSubmit = async () => {
    setValidationErrors({});
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = formDict.validation.required;
    }
    if (!formData.email.trim()) {
      errors.email = formDict.validation.required;
    } else if (!validateEmail(formData.email)) {
      errors.email = formDict.validation.invalidEmail;
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      scrollToSection('timelineAdmin');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const payload = {
      name: formData.name,
      email: formData.email,
      locale,
      form: 'brief',
      about_business: {
        business_name: formData.businessName,
        tagline: formData.tagline,
        services: formData.services.filter(s => s.name.trim()),
        pricing_public: formData.pricingPublic,
        who_are_they: formData.whoAreThey,
        pain_points: formData.painPoints,
        where_hang_out: formData.whereHangOut,
      },
      your_story: {
        bio: formData.bio,
        credentials: formData.credentials,
        why_started: formData.whyStarted,
      },
      site_goals: {
        accomplish: formData.accomplish,
        pages_needed: formData.pagesNeeded,
        languages: formData.languages,
      },
      technical: {
        has_domain: formData.hasDomain,
        domain_name: formData.domainName,
        existing_url: formData.existingUrl,
        booking_system: formData.bookingSystem === 'other' ? formData.bookingOther : formData.bookingSystem,
        newsletter: formData.newsletter === 'other' ? formData.newsletterOther : formData.newsletter,
        other_integrations: formData.otherIntegrations,
      },
      brand_design: {
        logo: formData.logo,
        brand_colors: [formData.brandColor1, formData.brandColor2, formData.brandColor3].filter(Boolean),
        help_choose_colors: formData.helpChooseColors,
        fonts: formData.fonts,
        help_choose_fonts: formData.helpChooseFonts,
        inspirations: formData.inspirations.filter(i => i.url.trim()),
        professional_photos: formData.professionalPhotos,
      },
      copy: {
        existing_copy: formData.existingCopy,
        existing_copy_text: formData.existingCopyText,
        tone_of_voice: [formData.tone1, formData.tone2, formData.tone3].filter(Boolean),
      },
      timeline: {
        urgency: formData.urgency,
        anything_else: formData.anythingElse,
      },
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
      setSubmitError(briefDict.error.headline);
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

  const toggleArrayValue = (key: keyof FormData, value: string) => {
    const currentArray = formData[key] as string[];
    if (currentArray.includes(value)) {
      updateField(key, currentArray.filter(v => v !== value) as FormData[typeof key]);
    } else {
      updateField(key, [...currentArray, value] as FormData[typeof key]);
    }
  };

  const addService = () => {
    if (formData.services.length < 5) {
      updateField('services', [...formData.services, { name: '', description: '' }]);
    }
  };

  const removeService = (index: number) => {
    if (formData.services.length > 1) {
      updateField('services', formData.services.filter((_, i) => i !== index));
    }
  };

  const updateService = (index: number, field: keyof Service, value: string) => {
    const newServices = [...formData.services];
    newServices[index] = { ...newServices[index], [field]: value };
    updateField('services', newServices);
  };

  const updateInspiration = (index: number, field: keyof Inspiration, value: string) => {
    const newInspirations = [...formData.inspirations];
    newInspirations[index] = { ...newInspirations[index], [field]: value };
    updateField('inspirations', newInspirations);
  };

  const sectionTitles: Record<string, string> = {
    aboutBusiness: briefDict.aboutBusiness.title,
    yourStory: briefDict.yourStory.title,
    siteGoals: briefDict.siteGoals.title,
    technical: briefDict.technical.title,
    brandDesign: briefDict.brandDesign.title,
    copy: briefDict.copy.title,
    timelineAdmin: briefDict.timelineAdmin.title,
  };

  // Success state
  if (isSuccess) {
    return (
      <main className="min-h-screen bg-cream text-dark flex items-center justify-center px-6">
        <div className="max-w-xl text-center">
          <h1 className="font-display text-4xl md:text-5xl font-normal mb-6">
            {briefDict.success.headline}
          </h1>
          <p className="text-lg text-dark/70">
            {briefDict.success.subtext}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream text-dark">
      <div className="lg:flex">
        {/* Sticky sidebar - desktop only */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-8 p-8">
            <nav className="space-y-3">
              {sectionIds.map((id) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`block text-sm text-left transition-colors ${
                    activeSection === id ? 'text-dark font-medium' : 'text-muted hover:text-dark'
                  }`}
                >
                  {sectionTitles[id]}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main form content */}
        <div className="flex-1 max-w-2xl mx-auto px-6 py-12 lg:py-16 lg:pr-16">
          <h1 className="font-display text-3xl md:text-4xl font-normal mb-12">
            {briefDict.title}
          </h1>

          {/* Section 1: About the business */}
          <section
            id="aboutBusiness"
            ref={(el) => { sectionRefs.current.aboutBusiness = el; }}
            className="mb-12"
          >
            <h2 className="font-display text-2xl font-normal mb-6">
              {briefDict.aboutBusiness.title}
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm mb-2">{briefDict.aboutBusiness.businessName}</label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => updateField('businessName', e.target.value)}
                  placeholder={briefDict.aboutBusiness.businessNamePlaceholder}
                  className="w-full px-4 py-3 bg-transparent border border-dark/20 focus:border-accent outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">{briefDict.aboutBusiness.tagline}</label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => updateField('tagline', e.target.value)}
                  placeholder={briefDict.aboutBusiness.taglinePlaceholder}
                  className="w-full px-4 py-3 bg-transparent border border-dark/20 focus:border-accent outline-none transition-colors"
                />
              </div>

              {/* Services */}
              <div>
                <label className="block text-sm mb-2">{briefDict.aboutBusiness.services}</label>
                <div className="space-y-4">
                  {formData.services.map((service, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="flex-1 space-y-2">
                        <input
                          type="text"
                          value={service.name}
                          onChange={(e) => updateService(index, 'name', e.target.value)}
                          placeholder={briefDict.aboutBusiness.serviceNamePlaceholder}
                          className="w-full px-4 py-3 bg-transparent border border-dark/20 focus:border-accent outline-none transition-colors"
                        />
                        <input
                          type="text"
                          value={service.description}
                          onChange={(e) => updateService(index, 'description', e.target.value)}
                          placeholder={briefDict.aboutBusiness.serviceDescPlaceholder}
                          className="w-full px-4 py-3 bg-transparent border border-dark/20 focus:border-accent outline-none transition-colors"
                        />
                      </div>
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => removeService(index)}
                          className="self-start px-3 py-3 text-muted hover:text-dark transition-colors text-sm"
                        >
                          {briefDict.aboutBusiness.removeService}
                        </button>
                      )}
                    </div>
                  ))}
                  {formData.services.length < 5 && (
                    <button
                      type="button"
                      onClick={addService}
                      className="text-sm text-accent hover:text-accent/80 transition-colors"
                    >
                      {briefDict.aboutBusiness.addService}
                    </button>
                  )}
                </div>
              </div>

              {/* Pricing public */}
              <div>
                <label className="block text-sm mb-2">{briefDict.aboutBusiness.pricingPublic}</label>
                <div className="flex gap-2">
                  {[
                    { value: 'yes', label: briefDict.aboutBusiness.pricingOptions.yes },
                    { value: 'no', label: briefDict.aboutBusiness.pricingOptions.no },
                    { value: 'partially', label: briefDict.aboutBusiness.pricingOptions.partially },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => updateField('pricingPublic', option.value)}
                      className={`px-4 py-2 border transition-colors ${
                        formData.pricingPublic === option.value
                          ? 'border-accent bg-accent/10'
                          : 'border-dark/20 hover:border-dark/40'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Target audience */}
              <div className="pt-4">
                <label className="block text-sm font-medium mb-4">{briefDict.aboutBusiness.targetAudience}</label>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm mb-2">{briefDict.aboutBusiness.whoAreThey}</label>
                    <textarea
                      value={formData.whoAreThey}
                      onChange={(e) => updateField('whoAreThey', e.target.value)}
                      placeholder={briefDict.aboutBusiness.whoAreTheyPlaceholder}
                      rows={3}
                      className="w-full px-4 py-3 bg-transparent border border-dark/20 focus:border-accent outline-none transition-colors resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">{briefDict.aboutBusiness.painPoints}</label>
                    <textarea
                      value={formData.painPoints}
                      onChange={(e) => updateField('painPoints', e.target.value)}
                      placeholder={briefDict.aboutBusiness.painPointsPlaceholder}
                      rows={3}
                      className="w-full px-4 py-3 bg-transparent border border-dark/20 focus:border-accent outline-none transition-colors resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">{briefDict.aboutBusiness.whereHangOut}</label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { value: 'instagram', label: briefDict.aboutBusiness.hangOutOptions.instagram },
                        { value: 'linkedin', label: briefDict.aboutBusiness.hangOutOptions.linkedin },
                        { value: 'tiktok', label: briefDict.aboutBusiness.hangOutOptions.tiktok },
                        { value: 'youtube', label: briefDict.aboutBusiness.hangOutOptions.youtube },
                        { value: 'podcasts', label: briefDict.aboutBusiness.hangOutOptions.podcasts },
                        { value: 'google', label: briefDict.aboutBusiness.hangOutOptions.google },
                        { value: 'other', label: briefDict.aboutBusiness.hangOutOptions.other },
                      ].map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => toggleArrayValue('whereHangOut', option.value)}
                          className={`px-4 py-2 border transition-colors ${
                            formData.whereHangOut.includes(option.value)
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
              </div>
            </div>
          </section>

          <hr className="border-dark/10 mb-12" />

          {/* Section 2: Your story */}
          <section
            id="yourStory"
            ref={(el) => { sectionRefs.current.yourStory = el; }}
            className="mb-12"
          >
            <h2 className="font-display text-2xl font-normal mb-6">
              {briefDict.yourStory.title}
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm mb-2">{briefDict.yourStory.bio}</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => updateField('bio', e.target.value)}
                  placeholder={briefDict.yourStory.bioPlaceholder}
                  rows={4}
                  className="w-full px-4 py-3 bg-transparent border border-dark/20 focus:border-accent outline-none transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">{briefDict.yourStory.credentials}</label>
                <textarea
                  value={formData.credentials}
                  onChange={(e) => updateField('credentials', e.target.value)}
                  placeholder={briefDict.yourStory.credentialsPlaceholder}
                  rows={3}
                  className="w-full px-4 py-3 bg-transparent border border-dark/20 focus:border-accent outline-none transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">{briefDict.yourStory.whyStarted}</label>
                <p className="text-xs text-muted mb-2">{briefDict.yourStory.whyStartedNote}</p>
                <textarea
                  value={formData.whyStarted}
                  onChange={(e) => updateField('whyStarted', e.target.value)}
                  placeholder={briefDict.yourStory.whyStartedPlaceholder}
                  rows={4}
                  className="w-full px-4 py-3 bg-transparent border border-dark/20 focus:border-accent outline-none transition-colors resize-none"
                />
              </div>
            </div>
          </section>

          <hr className="border-dark/10 mb-12" />

          {/* Section 3: Site goals */}
          <section
            id="siteGoals"
            ref={(el) => { sectionRefs.current.siteGoals = el; }}
            className="mb-12"
          >
            <h2 className="font-display text-2xl font-normal mb-6">
              {briefDict.siteGoals.title}
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm mb-2">{briefDict.siteGoals.accomplish}</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: 'leads', label: briefDict.siteGoals.accomplishOptions.leads },
                    { value: 'calls', label: briefDict.siteGoals.accomplishOptions.calls },
                    { value: 'sell', label: briefDict.siteGoals.accomplishOptions.sell },
                    { value: 'trust', label: briefDict.siteGoals.accomplishOptions.trust },
                    { value: 'newsletter', label: briefDict.siteGoals.accomplishOptions.newsletter },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => toggleArrayValue('accomplish', option.value)}
                      className={`px-4 py-2 border transition-colors ${
                        formData.accomplish.includes(option.value)
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
                <label className="block text-sm mb-2">{briefDict.siteGoals.pagesNeeded}</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: 'home', label: briefDict.siteGoals.pageOptions.home },
                    { value: 'about', label: briefDict.siteGoals.pageOptions.about },
                    { value: 'services', label: briefDict.siteGoals.pageOptions.services },
                    { value: 'blog', label: briefDict.siteGoals.pageOptions.blog },
                    { value: 'contact', label: briefDict.siteGoals.pageOptions.contact },
                    { value: 'legal', label: briefDict.siteGoals.pageOptions.legal },
                    { value: 'portfolio', label: briefDict.siteGoals.pageOptions.portfolio },
                    { value: 'shop', label: briefDict.siteGoals.pageOptions.shop },
                    { value: 'booking', label: briefDict.siteGoals.pageOptions.booking },
                    { value: 'faq', label: briefDict.siteGoals.pageOptions.faq },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => toggleArrayValue('pagesNeeded', option.value)}
                      className={`px-4 py-2 border transition-colors ${
                        formData.pagesNeeded.includes(option.value)
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
                <label className="block text-sm mb-2">{briefDict.siteGoals.languages}</label>
                <div className="flex gap-2">
                  {[
                    { value: 'englishOnly', label: briefDict.siteGoals.languageOptions.englishOnly },
                    { value: 'germanOnly', label: briefDict.siteGoals.languageOptions.germanOnly },
                    { value: 'both', label: briefDict.siteGoals.languageOptions.both },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => updateField('languages', option.value)}
                      className={`px-4 py-2 border transition-colors ${
                        formData.languages === option.value
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

          {/* Section 4: Technical */}
          <section
            id="technical"
            ref={(el) => { sectionRefs.current.technical = el; }}
            className="mb-12"
          >
            <h2 className="font-display text-2xl font-normal mb-6">
              {briefDict.technical.title}
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm mb-2">{briefDict.technical.hasDomain}</label>
                <div className="flex gap-2">
                  {[
                    { value: 'yes', label: briefDict.technical.domainOptions.yes },
                    { value: 'no', label: briefDict.technical.domainOptions.no },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => updateField('hasDomain', option.value)}
                      className={`px-4 py-2 border transition-colors ${
                        formData.hasDomain === option.value
                          ? 'border-accent bg-accent/10'
                          : 'border-dark/20 hover:border-dark/40'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
              {formData.hasDomain === 'yes' && (
                <div>
                  <label className="block text-sm mb-2">{briefDict.technical.domainName}</label>
                  <input
                    type="text"
                    value={formData.domainName}
                    onChange={(e) => updateField('domainName', e.target.value)}
                    placeholder={briefDict.technical.domainNamePlaceholder}
                    className="w-full px-4 py-3 bg-transparent border border-dark/20 focus:border-accent outline-none transition-colors"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm mb-2">
                  {briefDict.technical.existingUrl}{' '}
                  <span className="text-muted">{briefDict.technical.existingUrlOptional}</span>
                </label>
                <input
                  type="url"
                  value={formData.existingUrl}
                  onChange={(e) => updateField('existingUrl', e.target.value)}
                  placeholder={briefDict.technical.existingUrlPlaceholder}
                  className="w-full px-4 py-3 bg-transparent border border-dark/20 focus:border-accent outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">{briefDict.technical.bookingSystem}</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: 'calcom', label: briefDict.technical.bookingOptions.calcom },
                    { value: 'calendly', label: briefDict.technical.bookingOptions.calendly },
                    { value: 'acuity', label: briefDict.technical.bookingOptions.acuity },
                    { value: 'none', label: briefDict.technical.bookingOptions.none },
                    { value: 'other', label: briefDict.technical.bookingOptions.other },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => updateField('bookingSystem', option.value)}
                      className={`px-4 py-2 border transition-colors ${
                        formData.bookingSystem === option.value
                          ? 'border-accent bg-accent/10'
                          : 'border-dark/20 hover:border-dark/40'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                {formData.bookingSystem === 'other' && (
                  <input
                    type="text"
                    value={formData.bookingOther}
                    onChange={(e) => updateField('bookingOther', e.target.value)}
                    placeholder={briefDict.technical.bookingOtherPlaceholder}
                    className="w-full mt-3 px-4 py-3 bg-transparent border border-dark/20 focus:border-accent outline-none transition-colors"
                  />
                )}
              </div>
              <div>
                <label className="block text-sm mb-2">{briefDict.technical.newsletter}</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: 'mailchimp', label: briefDict.technical.newsletterOptions.mailchimp },
                    { value: 'brevo', label: briefDict.technical.newsletterOptions.brevo },
                    { value: 'mailerlite', label: briefDict.technical.newsletterOptions.mailerlite },
                    { value: 'none', label: briefDict.technical.newsletterOptions.none },
                    { value: 'other', label: briefDict.technical.newsletterOptions.other },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => updateField('newsletter', option.value)}
                      className={`px-4 py-2 border transition-colors ${
                        formData.newsletter === option.value
                          ? 'border-accent bg-accent/10'
                          : 'border-dark/20 hover:border-dark/40'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                {formData.newsletter === 'other' && (
                  <input
                    type="text"
                    value={formData.newsletterOther}
                    onChange={(e) => updateField('newsletterOther', e.target.value)}
                    placeholder={briefDict.technical.newsletterOtherPlaceholder}
                    className="w-full mt-3 px-4 py-3 bg-transparent border border-dark/20 focus:border-accent outline-none transition-colors"
                  />
                )}
              </div>
              <div>
                <label className="block text-sm mb-2">{briefDict.technical.otherIntegrations}</label>
                <input
                  type="text"
                  value={formData.otherIntegrations}
                  onChange={(e) => updateField('otherIntegrations', e.target.value)}
                  placeholder={briefDict.technical.otherIntegrationsPlaceholder}
                  className="w-full px-4 py-3 bg-transparent border border-dark/20 focus:border-accent outline-none transition-colors"
                />
              </div>
            </div>
          </section>

          <hr className="border-dark/10 mb-12" />

          {/* Section 5: Brand & design */}
          <section
            id="brandDesign"
            ref={(el) => { sectionRefs.current.brandDesign = el; }}
            className="mb-12"
          >
            <h2 className="font-display text-2xl font-normal mb-6">
              {briefDict.brandDesign.title}
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm mb-2">{briefDict.brandDesign.logo}</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: 'uploaded', label: briefDict.brandDesign.logoOptions.uploaded },
                    { value: 'sendLater', label: briefDict.brandDesign.logoOptions.sendLater },
                    { value: 'dontHave', label: briefDict.brandDesign.logoOptions.dontHave },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => updateField('logo', option.value)}
                      className={`px-4 py-2 border transition-colors ${
                        formData.logo === option.value
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
                <label className="block text-sm mb-2">{briefDict.brandDesign.brandColors}</label>
                <div className="flex gap-3">
                  {[
                    { key: 'brandColor1' as const, value: formData.brandColor1 },
                    { key: 'brandColor2' as const, value: formData.brandColor2 },
                    { key: 'brandColor3' as const, value: formData.brandColor3 },
                  ].map(({ key, value }) => (
                    <div key={key} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => updateField(key, e.target.value)}
                        placeholder={briefDict.brandDesign.brandColorsPlaceholder}
                        className="w-24 px-3 py-2 bg-transparent border border-dark/20 focus:border-accent outline-none transition-colors text-sm"
                      />
                      <div
                        className="w-8 h-8 border border-dark/20"
                        style={{
                          backgroundColor: isValidHex(value)
                            ? (value.startsWith('#') ? value : `#${value}`)
                            : 'transparent',
                        }}
                      />
                    </div>
                  ))}
                </div>
                <label className="flex items-center gap-2 mt-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.helpChooseColors}
                    onChange={(e) => updateField('helpChooseColors', e.target.checked)}
                    className="w-4 h-4 border border-dark/20 bg-transparent accent-accent"
                  />
                  <span className="text-sm">{briefDict.brandDesign.helpMeChooseColors}</span>
                </label>
              </div>
              <div>
                <label className="block text-sm mb-2">{briefDict.brandDesign.fonts}</label>
                <input
                  type="text"
                  value={formData.fonts}
                  onChange={(e) => updateField('fonts', e.target.value)}
                  placeholder={briefDict.brandDesign.fontsPlaceholder}
                  className="w-full px-4 py-3 bg-transparent border border-dark/20 focus:border-accent outline-none transition-colors"
                />
                <label className="flex items-center gap-2 mt-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.helpChooseFonts}
                    onChange={(e) => updateField('helpChooseFonts', e.target.checked)}
                    className="w-4 h-4 border border-dark/20 bg-transparent accent-accent"
                  />
                  <span className="text-sm">{briefDict.brandDesign.helpMeChooseFonts}</span>
                </label>
              </div>
              <div>
                <label className="block text-sm mb-2">{briefDict.brandDesign.inspiration}</label>
                <div className="space-y-4">
                  {formData.inspirations.map((inspiration, index) => (
                    <div key={index} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="url"
                        value={inspiration.url}
                        onChange={(e) => updateInspiration(index, 'url', e.target.value)}
                        placeholder={briefDict.brandDesign.inspirationUrlPlaceholder}
                        className="px-4 py-3 bg-transparent border border-dark/20 focus:border-accent outline-none transition-colors"
                      />
                      <input
                        type="text"
                        value={inspiration.love}
                        onChange={(e) => updateInspiration(index, 'love', e.target.value)}
                        placeholder={briefDict.brandDesign.inspirationLovePlaceholder}
                        className="px-4 py-3 bg-transparent border border-dark/20 focus:border-accent outline-none transition-colors"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm mb-2">{briefDict.brandDesign.professionalPhotos}</label>
                <div className="flex gap-2">
                  {[
                    { value: 'yes', label: briefDict.brandDesign.photoOptions.yes },
                    { value: 'no', label: briefDict.brandDesign.photoOptions.no },
                    { value: 'inProgress', label: briefDict.brandDesign.photoOptions.inProgress },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => updateField('professionalPhotos', option.value)}
                      className={`px-4 py-2 border transition-colors ${
                        formData.professionalPhotos === option.value
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

          {/* Section 6: Copy */}
          <section
            id="copy"
            ref={(el) => { sectionRefs.current.copy = el; }}
            className="mb-12"
          >
            <h2 className="font-display text-2xl font-normal mb-6">
              {briefDict.copy.title}
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm mb-2">{briefDict.copy.existingCopy}</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: 'ready', label: briefDict.copy.copyOptions.ready },
                    { value: 'needWritten', label: briefDict.copy.copyOptions.needWritten },
                    { value: 'mix', label: briefDict.copy.copyOptions.mix },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => updateField('existingCopy', option.value)}
                      className={`px-4 py-2 border transition-colors ${
                        formData.existingCopy === option.value
                          ? 'border-accent bg-accent/10'
                          : 'border-dark/20 hover:border-dark/40'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
              {(formData.existingCopy === 'ready' || formData.existingCopy === 'mix') && (
                <div>
                  <label className="block text-sm mb-2">{briefDict.copy.existingCopyText}</label>
                  <textarea
                    value={formData.existingCopyText}
                    onChange={(e) => updateField('existingCopyText', e.target.value)}
                    placeholder={briefDict.copy.existingCopyPlaceholder}
                    rows={5}
                    className="w-full px-4 py-3 bg-transparent border border-dark/20 focus:border-accent outline-none transition-colors resize-none"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm mb-2">{briefDict.copy.toneOfVoice}</label>
                <p className="text-xs text-muted mb-2">{briefDict.copy.toneExamples}</p>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={formData.tone1}
                    onChange={(e) => updateField('tone1', e.target.value)}
                    placeholder={briefDict.copy.tonePlaceholder}
                    className="flex-1 px-4 py-3 bg-transparent border border-dark/20 focus:border-accent outline-none transition-colors"
                  />
                  <input
                    type="text"
                    value={formData.tone2}
                    onChange={(e) => updateField('tone2', e.target.value)}
                    placeholder={briefDict.copy.tonePlaceholder}
                    className="flex-1 px-4 py-3 bg-transparent border border-dark/20 focus:border-accent outline-none transition-colors"
                  />
                  <input
                    type="text"
                    value={formData.tone3}
                    onChange={(e) => updateField('tone3', e.target.value)}
                    placeholder={briefDict.copy.tonePlaceholder}
                    className="flex-1 px-4 py-3 bg-transparent border border-dark/20 focus:border-accent outline-none transition-colors"
                  />
                </div>
              </div>
            </div>
          </section>

          <hr className="border-dark/10 mb-12" />

          {/* Section 7: Timeline & admin */}
          <section
            id="timelineAdmin"
            ref={(el) => { sectionRefs.current.timelineAdmin = el; }}
            className="mb-12"
          >
            <h2 className="font-display text-2xl font-normal mb-6">
              {briefDict.timelineAdmin.title}
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm mb-2">{briefDict.timelineAdmin.urgency}</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: 'asap', label: briefDict.timelineAdmin.urgencyOptions.asap },
                    { value: 'oneMonth', label: briefDict.timelineAdmin.urgencyOptions.oneMonth },
                    { value: 'twoThreeMonths', label: briefDict.timelineAdmin.urgencyOptions.twoThreeMonths },
                    { value: 'noRush', label: briefDict.timelineAdmin.urgencyOptions.noRush },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => updateField('urgency', option.value)}
                      className={`px-4 py-2 border transition-colors ${
                        formData.urgency === option.value
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
                <label className="block text-sm mb-2">{briefDict.timelineAdmin.anythingElse}</label>
                <textarea
                  value={formData.anythingElse}
                  onChange={(e) => updateField('anythingElse', e.target.value)}
                  placeholder={briefDict.timelineAdmin.anythingElsePlaceholder}
                  rows={4}
                  className="w-full px-4 py-3 bg-transparent border border-dark/20 focus:border-accent outline-none transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">{briefDict.timelineAdmin.name}</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder={briefDict.timelineAdmin.namePlaceholder}
                  className={`w-full px-4 py-3 bg-transparent border ${
                    validationErrors.name ? 'border-red-500' : 'border-dark/20'
                  } focus:border-accent outline-none transition-colors`}
                />
                {validationErrors.name && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.name}</p>
                )}
              </div>
              <div>
                <label className="block text-sm mb-2">{briefDict.timelineAdmin.email}</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder={briefDict.timelineAdmin.emailPlaceholder}
                  className={`w-full px-4 py-3 bg-transparent border ${
                    validationErrors.email ? 'border-red-500' : 'border-dark/20'
                  } focus:border-accent outline-none transition-colors`}
                />
                {validationErrors.email && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
                )}
              </div>
            </div>
          </section>

          {/* Error message */}
          {submitError && (
            <div className="mb-6 p-4 border border-red-500 bg-red-50 text-red-700">
              <p className="font-medium">{submitError}</p>
              <p className="text-sm mt-1">{briefDict.error.subtext}</p>
            </div>
          )}

          {/* Submit button - desktop */}
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="hidden md:block w-full py-4 bg-dark text-light hover:bg-dark/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg font-medium"
          >
            {isSubmitting ? '...' : briefDict.submit}
          </button>
        </div>
      </div>

      {/* Submit button - mobile sticky */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-cream border-t border-dark/10">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full py-4 bg-dark text-light hover:bg-dark/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg font-medium"
        >
          {isSubmitting ? '...' : briefDict.submit}
        </button>
      </div>
    </main>
  );
}
