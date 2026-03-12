export type Locale = 'en' | 'de';

export const defaultLocale: Locale = 'en';

export const locales: Locale[] = ['en', 'de'];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DeepStringify<T> = T extends readonly (infer U)[] ? DeepStringify<U>[] : T extends object ? { [K in keyof T]: DeepStringify<T[K]> } : T extends string ? string : T extends boolean ? boolean : T extends number ? number : T;

export type Dictionary = DeepStringify<typeof dictionaries.en>;

export const dictionaries = {
  en: {
    meta: {
      title: 'Studio Vybe – Agency-quality websites for solopreneurs',
      description: 'Get an agency-quality website without hiring an agency. GDPR-compliant, EU-hosted, fast, and multilingual.',
    },
    nav: {
      howItWorks: 'How it works',
      pricing: 'Pricing',
      contact: 'Contact',
    },
    hero: {
      headline: 'Agency-quality website.',
      subheadline: 'Without hiring an agency.',
      cta: {
        primary: 'Build it for me',
        secondary: 'Build it myself',
        comingSoon: 'coming soon',
      },
    },
    problem: {
      title: 'The website problem',
      points: [
        {
          title: 'WordPress is overbuilt',
          description: 'You don\'t need 50 plugins, security patches every week, and a site that loads in 5 seconds.',
        },
        {
          title: 'Templates feel generic',
          description: 'Squarespace and Wix look like everyone else. Your brand deserves better.',
        },
        {
          title: 'Agencies are too expensive',
          description: 'You shouldn\'t need to spend €10,000+ for a simple, beautiful website.',
        },
      ],
    },
    paths: {
      title: 'Two paths to your website',
      dfy: {
        label: 'Done for you',
        title: 'Build it for me',
        description: 'We design and build your website. You focus on your business.',
        features: [
          'Custom design tailored to your brand',
          'Professional copywriting support',
          'SEO-optimized from day one',
          'Launched in 2-4 weeks',
        ],
      },
      diy: {
        label: 'Coming soon',
        title: 'Build it myself with AI',
        description: 'Our AI-powered builder helps you create a professional website in hours.',
        features: [
          'AI-guided design decisions',
          'Pre-built sections and layouts',
          'No coding required',
          'Launch same day',
        ],
      },
    },
    howItWorks: {
      title: 'How it works',
      steps: [
        {
          number: '01',
          title: 'Brief',
          description: 'Tell us about your business, your audience, and your goals. We\'ll craft the perfect strategy.',
        },
        {
          number: '02',
          title: 'Design',
          description: 'We create a custom design that reflects your brand. You review and we refine until it\'s perfect.',
        },
        {
          number: '03',
          title: 'Launch',
          description: 'We build, test, and deploy your site. You get a fast, secure, and beautiful website.',
        },
        {
          number: '04',
          title: 'Maintain',
          description: 'We handle updates, security, and hosting. You focus on growing your business.',
        },
      ],
    },
    features: {
      title: 'Built for European solopreneurs',
      items: [
        {
          title: 'GDPR/DSGVO compliant',
          description: 'Privacy-first by design. No cookie consent hell.',
        },
        {
          title: 'EU-hosted',
          description: 'Your data stays in Europe. Frankfurt and Amsterdam servers.',
        },
        {
          title: 'Lightning fast',
          description: 'Sub-second load times. No bloated code.',
        },
        {
          title: 'Multilingual ready',
          description: 'German, English, French, Spanish—we\'ve got you covered.',
        },
        {
          title: 'No vendor lock-in',
          description: 'You own your content. Export anytime.',
        },
        {
          title: 'SEO optimized',
          description: 'Built for search engines from the ground up.',
        },
      ],
    },
    pricing: {
      title: 'Simple, transparent pricing',
      subtitle: 'One-time setup fee. Optional monthly retainer.',
      oneTime: {
        title: 'One-time setup',
        tiers: [
          {
            name: 'Micro Site',
            price: '1,800 – 2,500',
            description: 'Perfect for coaches, consultants, and freelancers',
            features: [
              'Up to 5 pages',
              'Mobile-responsive design',
              'Contact form',
              'Basic SEO setup',
            ],
          },
          {
            name: 'Standard',
            price: '2,500 – 3,500',
            description: 'For established solopreneurs ready to grow',
            features: [
              'Up to 10 pages',
              'Blog or portfolio section',
              'Newsletter integration',
              'Advanced SEO',
              'Analytics setup',
            ],
            popular: true,
          },
          {
            name: 'Full Custom',
            price: '4,500 – 6,000',
            description: 'When you need something truly unique',
            features: [
              'Unlimited pages',
              'Custom functionality',
              'E-commerce ready',
              'Multi-language',
              'Priority support',
            ],
          },
        ],
      },
      retainer: {
        title: 'Monthly retainer',
        subtitle: 'Keep your site fresh and secure',
        tiers: [
          {
            name: 'Basic',
            price: '79',
            features: [
              'Hosting & SSL',
              'Security updates',
              'Monthly backup',
              'Email support',
            ],
          },
          {
            name: 'Growth',
            price: '149',
            features: [
              'Everything in Basic',
              '2 content updates/month',
              'Performance monitoring',
              'Priority support',
            ],
            popular: true,
          },
          {
            name: 'Scale',
            price: '299',
            features: [
              'Everything in Growth',
              'Unlimited content updates',
              'A/B testing',
              'Dedicated account manager',
            ],
          },
        ],
      },
      currency: 'EUR',
      perMonth: '/month',
    },
    trust: {
      headline: 'Trusted by coaches and consultants across Europe',
    },
    cta: {
      title: 'Ready to get started?',
      subtitle: 'Book a free check-in call and let\'s discuss your project.',
      button: 'Book your check-in',
    },
    footer: {
      impressum: 'Impressum',
      datenschutz: 'Privacy Policy',
      contact: 'Contact',
      language: 'Language',
      copyright: '© 2024 Studio Vybe. All rights reserved.',
    },
  },
  de: {
    meta: {
      title: 'Studio Vybe – Agentur-Qualität Websites für Solopreneure',
      description: 'Erhalte eine Website in Agentur-Qualität ohne eine Agentur zu beauftragen. DSGVO-konform, EU-gehostet, schnell und mehrsprachig.',
    },
    nav: {
      howItWorks: 'So funktioniert\'s',
      pricing: 'Preise',
      contact: 'Kontakt',
    },
    hero: {
      headline: 'Agentur-Qualität Website.',
      subheadline: 'Ohne eine Agentur zu beauftragen.',
      cta: {
        primary: 'Für mich erstellen',
        secondary: 'Selbst erstellen',
        comingSoon: 'bald verfügbar',
      },
    },
    problem: {
      title: 'Das Website-Problem',
      points: [
        {
          title: 'WordPress ist überladen',
          description: 'Du brauchst keine 50 Plugins, wöchentliche Sicherheitsupdates und eine Seite, die 5 Sekunden lädt.',
        },
        {
          title: 'Templates wirken generisch',
          description: 'Squarespace und Wix sehen aus wie alle anderen. Deine Marke verdient Besseres.',
        },
        {
          title: 'Agenturen sind zu teuer',
          description: 'Du solltest nicht €10.000+ für eine einfache, schöne Website ausgeben müssen.',
        },
      ],
    },
    paths: {
      title: 'Zwei Wege zu deiner Website',
      dfy: {
        label: 'Rundum-Sorglos',
        title: 'Für mich erstellen',
        description: 'Wir designen und bauen deine Website. Du konzentrierst dich auf dein Business.',
        features: [
          'Individuelles Design für deine Marke',
          'Professionelle Textunterstützung',
          'SEO-optimiert von Anfang an',
          'Online in 2-4 Wochen',
        ],
      },
      diy: {
        label: 'Bald verfügbar',
        title: 'Selbst erstellen mit KI',
        description: 'Unser KI-gestützter Builder hilft dir, eine professionelle Website in Stunden zu erstellen.',
        features: [
          'KI-geführte Design-Entscheidungen',
          'Vorgefertigte Sektionen und Layouts',
          'Keine Programmierkenntnisse nötig',
          'Am selben Tag online',
        ],
      },
    },
    howItWorks: {
      title: 'So funktioniert\'s',
      steps: [
        {
          number: '01',
          title: 'Briefing',
          description: 'Erzähl uns von deinem Business, deiner Zielgruppe und deinen Zielen. Wir entwickeln die perfekte Strategie.',
        },
        {
          number: '02',
          title: 'Design',
          description: 'Wir erstellen ein individuelles Design, das deine Marke widerspiegelt. Du reviewst, wir verfeinern.',
        },
        {
          number: '03',
          title: 'Launch',
          description: 'Wir bauen, testen und deployen deine Seite. Du bekommst eine schnelle, sichere und schöne Website.',
        },
        {
          number: '04',
          title: 'Pflege',
          description: 'Wir kümmern uns um Updates, Sicherheit und Hosting. Du fokussierst dich auf dein Wachstum.',
        },
      ],
    },
    features: {
      title: 'Gemacht für europäische Solopreneure',
      items: [
        {
          title: 'DSGVO-konform',
          description: 'Privacy-first by Design. Kein Cookie-Consent-Chaos.',
        },
        {
          title: 'EU-gehostet',
          description: 'Deine Daten bleiben in Europa. Server in Frankfurt und Amsterdam.',
        },
        {
          title: 'Blitzschnell',
          description: 'Ladezeiten unter einer Sekunde. Kein aufgeblähter Code.',
        },
        {
          title: 'Mehrsprachig',
          description: 'Deutsch, Englisch, Französisch, Spanisch—wir haben dich abgedeckt.',
        },
        {
          title: 'Kein Vendor Lock-in',
          description: 'Du besitzt deinen Content. Jederzeit exportieren.',
        },
        {
          title: 'SEO optimiert',
          description: 'Von Grund auf für Suchmaschinen gebaut.',
        },
      ],
    },
    pricing: {
      title: 'Einfache, transparente Preise',
      subtitle: 'Einmalige Einrichtungsgebühr. Optionaler monatlicher Retainer.',
      oneTime: {
        title: 'Einmalige Einrichtung',
        tiers: [
          {
            name: 'Micro Site',
            price: '1.800 – 2.500',
            description: 'Perfekt für Coaches, Berater und Freelancer',
            features: [
              'Bis zu 5 Seiten',
              'Mobile-responsives Design',
              'Kontaktformular',
              'Basis-SEO Setup',
            ],
          },
          {
            name: 'Standard',
            price: '2.500 – 3.500',
            description: 'Für etablierte Solopreneure, die wachsen wollen',
            features: [
              'Bis zu 10 Seiten',
              'Blog oder Portfolio',
              'Newsletter-Integration',
              'Erweitertes SEO',
              'Analytics Setup',
            ],
            popular: true,
          },
          {
            name: 'Full Custom',
            price: '4.500 – 6.000',
            description: 'Wenn du etwas wirklich Einzigartiges brauchst',
            features: [
              'Unbegrenzte Seiten',
              'Individuelle Funktionen',
              'E-Commerce ready',
              'Mehrsprachig',
              'Priority Support',
            ],
          },
        ],
      },
      retainer: {
        title: 'Monatlicher Retainer',
        subtitle: 'Halte deine Seite frisch und sicher',
        tiers: [
          {
            name: 'Basic',
            price: '79',
            features: [
              'Hosting & SSL',
              'Sicherheitsupdates',
              'Monatliches Backup',
              'E-Mail Support',
            ],
          },
          {
            name: 'Growth',
            price: '149',
            features: [
              'Alles aus Basic',
              '2 Content-Updates/Monat',
              'Performance Monitoring',
              'Priority Support',
            ],
            popular: true,
          },
          {
            name: 'Scale',
            price: '299',
            features: [
              'Alles aus Growth',
              'Unbegrenzte Content-Updates',
              'A/B Testing',
              'Dedizierter Account Manager',
            ],
          },
        ],
      },
      currency: 'EUR',
      perMonth: '/Monat',
    },
    trust: {
      headline: 'Vertraut von Coaches und Beratern in ganz Europa',
    },
    cta: {
      title: 'Bereit loszulegen?',
      subtitle: 'Buch ein kostenloses Check-in-Gespräch und lass uns dein Projekt besprechen.',
      button: 'Check-in buchen',
    },
    footer: {
      impressum: 'Impressum',
      datenschutz: 'Datenschutz',
      contact: 'Kontakt',
      language: 'Sprache',
      copyright: '© 2024 Studio Vybe. Alle Rechte vorbehalten.',
    },
  },
} as const;

export function getDictionary(locale: Locale): Dictionary {
  return (dictionaries[locale] || dictionaries[defaultLocale]) as unknown as Dictionary;
}
