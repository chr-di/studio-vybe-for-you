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
    form: {
      progress: 'Step {current} of {total}',
      back: 'Back',
      step1: {
        q1: {
          headline: "Let's start with you.",
          nameLabel: 'Full name',
          namePlaceholder: 'Your name',
          emailLabel: 'Email address',
          emailPlaceholder: 'you@example.com',
          continue: 'Continue',
        },
        q2: {
          headline: 'What best describes your work?',
          coach: 'Coach',
          coachDesc: 'life, business, health...',
          consultant: 'Consultant / Advisor',
          consultantDesc: 'strategy, management, HR...',
          trainer: 'Trainer / Speaker',
          trainerDesc: 'workshops, keynotes, education...',
          other: 'Something else',
          otherPlaceholder: 'Tell us what you do',
        },
        q3: {
          headline: 'Where are you right now?',
          noWebsite: 'I have no website',
          hasWebsite: "I have a website but it doesn't represent me well",
          rebuilding: "I'm rebuilding / rebranding",
        },
        q4: {
          headline: "What's your main goal?",
          clients: 'Get more clients & inquiries',
          credibility: 'Build credibility and authority',
          replace: 'Replace my current site',
          launch: 'Launch something new',
        },
        q5: {
          headline: 'When do you need this?',
          asap: 'ASAP',
          asapDesc: 'within 4 weeks',
          months: '1–3 months',
          monthsDesc: 'comfortable timeline',
          noRush: 'No rush',
          noRushDesc: 'just exploring',
        },
        q6: {
          headline: 'Anything we should know?',
          placeholder: 'Share any context, goals, or concerns...',
          continue: 'Continue to full brief →',
        },
      },
      step2: {
        title: 'Your full brief',
        submit: 'Submit your brief →',
        section1: {
          title: 'Your business',
          businessName: 'Business name',
          businessNamePlaceholder: 'Your company or brand name',
          currentUrl: 'Current website URL',
          currentUrlPlaceholder: 'https://...',
          currentUrlOptional: '(optional)',
          industry: 'Industry / niche',
          industryPlaceholder: 'e.g. Business coaching, HR consulting',
          yearsInBusiness: 'Years in business',
          yearsOptions: {
            less1: 'Less than 1 year',
            years1to3: '1–3 years',
            years3to10: '3–10 years',
            years10plus: '10+ years',
          },
          audienceLanguage: 'Primary language of your audience',
          languageOptions: {
            german: 'German',
            english: 'English',
            both: 'Both',
            other: 'Other',
          },
        },
        section2: {
          title: 'Your audience',
          idealClient: 'Describe your ideal client',
          idealClientPlaceholder: 'Who are they? What do they struggle with? What do they want?',
          ageRange: 'Age range of ideal client',
          ageOptions: {
            age25to34: '25–34',
            age35to44: '35–44',
            age45to54: '45–54',
            age55plus: '55+',
          },
          painPoints: 'Their biggest pain points',
          painPointsPlaceholder: 'What problems are they trying to solve?',
        },
        section3: {
          title: 'Brand & tone',
          toneOfVoice: 'Tone of voice',
          toneOptions: {
            warm: 'Warm & Personal',
            professional: 'Professional & Authoritative',
            bold: 'Bold & Direct',
            minimal: 'Minimal & Elegant',
            playful: 'Playful & Creative',
          },
          brandColors: 'Brand colors',
          brandColorsPlaceholder: 'e.g. navy blue, warm gold',
          brandColorsOptional: '(optional)',
          hasLogo: 'Do you have a logo?',
          logoOptions: {
            yes: 'Yes',
            no: 'No',
            inProgress: 'In progress',
          },
        },
        section4: {
          title: 'Pages & content',
          pagesNeeded: 'Pages needed',
          pageOptions: {
            home: 'Home',
            about: 'About',
            services: 'Services',
            blog: 'Blog',
            contact: 'Contact',
            pricing: 'Pricing',
            portfolio: 'Portfolio',
            testimonials: 'Testimonials',
            faq: 'FAQ',
            other: 'Other',
          },
          otherPagesPlaceholder: 'Specify other pages',
          hasCopy: 'Do you have copy (text) ready?',
          copyOptions: {
            yes: 'Yes, ready',
            partially: 'Partially',
            no: 'No, need help',
          },
          hasPhotos: 'Do you have professional photos?',
          photoOptions: {
            yes: 'Yes',
            noNeedPhotographer: 'No, need photographer',
            useStock: 'Will use stock',
          },
        },
        section5: {
          title: 'Technical needs',
          integrations: 'Integrations needed',
          integrationOptions: {
            newsletter: 'Newsletter signup',
            booking: 'Online booking / calendar',
            payment: 'Payment processing',
            video: 'Video embeds',
            multilingual: 'Multilingual',
            none: 'None',
          },
          domainSituation: 'Domain situation',
          domainOptions: {
            hasDomain: 'I already have a domain',
            needDomain: 'I need to register one',
            notSure: 'Not sure',
          },
          hosting: 'Hosting',
          hostingOptions: {
            euHosting: 'EU hosting included in package',
            ownHosting: 'I manage my own hosting',
          },
        },
        section6: {
          title: 'Investment & timeline',
          budget: 'Budget range',
          budgetOptions: {
            tier1: '€1,800–€2,500',
            tier2: '€2,500–€3,500',
            tier3: '€4,500–€6,000',
            notSure: 'Not sure yet',
          },
          launchMonth: 'Preferred launch month',
          launchMonthPlaceholder: 'e.g. May 2025',
          retainerInterest: 'Interest in monthly retainer?',
          retainerOptions: {
            yes: 'Yes',
            maybe: 'Maybe',
            no: 'No',
          },
        },
        section7: {
          title: 'Inspiration',
          inspirationUrls: 'Up to 3 inspiration / competitor URLs',
          urlPlaceholder: 'https://...',
          urlOptional: '(optional)',
          whatYouLove: 'What do you love about them?',
          whatYouLovePlaceholder: 'Colors, layout, vibe, features...',
          whatToAvoid: 'What should we absolutely avoid?',
          whatToAvoidPlaceholder: 'Anything you dislike or want to stay away from',
        },
        section8: {
          title: 'Final notes',
          anythingElse: 'Anything else you want to share?',
          anythingElsePlaceholder: 'Additional context, ideas, or questions...',
          optional: '(optional)',
        },
      },
      success: {
        headline: 'Your brief is in.',
        subtext: 'We will review everything and be in touch within 48 hours.',
        note: 'Keep an eye on your inbox.',
      },
      error: {
        submitFailed: 'Something went wrong. Please try again.',
        retry: 'Retry',
      },
      validation: {
        required: 'This field is required',
        invalidEmail: 'Please enter a valid email address',
      },
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
    form: {
      progress: 'Schritt {current} von {total}',
      back: 'Zurück',
      step1: {
        q1: {
          headline: 'Lassen Sie uns mit Ihnen beginnen.',
          nameLabel: 'Vollständiger Name',
          namePlaceholder: 'Ihr Name',
          emailLabel: 'E-Mail-Adresse',
          emailPlaceholder: 'sie@beispiel.de',
          continue: 'Weiter',
        },
        q2: {
          headline: 'Was beschreibt Ihre Arbeit am besten?',
          coach: 'Coach',
          coachDesc: 'Life, Business, Gesundheit...',
          consultant: 'Berater / Advisor',
          consultantDesc: 'Strategie, Management, HR...',
          trainer: 'Trainer / Speaker',
          trainerDesc: 'Workshops, Keynotes, Bildung...',
          other: 'Etwas anderes',
          otherPlaceholder: 'Erzählen Sie uns, was Sie tun',
        },
        q3: {
          headline: 'Wo stehen Sie gerade?',
          noWebsite: 'Ich habe keine Website',
          hasWebsite: 'Ich habe eine Website, aber sie repräsentiert mich nicht gut',
          rebuilding: 'Ich baue um / rebrande',
        },
        q4: {
          headline: 'Was ist Ihr Hauptziel?',
          clients: 'Mehr Kunden & Anfragen gewinnen',
          credibility: 'Glaubwürdigkeit und Autorität aufbauen',
          replace: 'Meine aktuelle Website ersetzen',
          launch: 'Etwas Neues starten',
        },
        q5: {
          headline: 'Wann brauchen Sie das?',
          asap: 'So schnell wie möglich',
          asapDesc: 'innerhalb von 4 Wochen',
          months: '1–3 Monate',
          monthsDesc: 'komfortabler Zeitrahmen',
          noRush: 'Keine Eile',
          noRushDesc: 'erst mal erkunden',
        },
        q6: {
          headline: 'Gibt es etwas, das wir wissen sollten?',
          placeholder: 'Teilen Sie Kontext, Ziele oder Bedenken...',
          continue: 'Weiter zum vollständigen Briefing →',
        },
      },
      step2: {
        title: 'Ihr vollständiges Briefing',
        submit: 'Briefing absenden →',
        section1: {
          title: 'Ihr Unternehmen',
          businessName: 'Firmenname',
          businessNamePlaceholder: 'Ihr Unternehmen oder Markenname',
          currentUrl: 'Aktuelle Website-URL',
          currentUrlPlaceholder: 'https://...',
          currentUrlOptional: '(optional)',
          industry: 'Branche / Nische',
          industryPlaceholder: 'z.B. Business Coaching, HR-Beratung',
          yearsInBusiness: 'Jahre im Geschäft',
          yearsOptions: {
            less1: 'Weniger als 1 Jahr',
            years1to3: '1–3 Jahre',
            years3to10: '3–10 Jahre',
            years10plus: '10+ Jahre',
          },
          audienceLanguage: 'Primäre Sprache Ihrer Zielgruppe',
          languageOptions: {
            german: 'Deutsch',
            english: 'Englisch',
            both: 'Beide',
            other: 'Andere',
          },
        },
        section2: {
          title: 'Ihre Zielgruppe',
          idealClient: 'Beschreiben Sie Ihren idealen Kunden',
          idealClientPlaceholder: 'Wer sind sie? Womit kämpfen sie? Was wollen sie?',
          ageRange: 'Altersbereich des idealen Kunden',
          ageOptions: {
            age25to34: '25–34',
            age35to44: '35–44',
            age45to54: '45–54',
            age55plus: '55+',
          },
          painPoints: 'Ihre größten Schmerzpunkte',
          painPointsPlaceholder: 'Welche Probleme versuchen sie zu lösen?',
        },
        section3: {
          title: 'Marke & Tonalität',
          toneOfVoice: 'Tonalität',
          toneOptions: {
            warm: 'Warm & Persönlich',
            professional: 'Professionell & Autoritativ',
            bold: 'Mutig & Direkt',
            minimal: 'Minimal & Elegant',
            playful: 'Verspielt & Kreativ',
          },
          brandColors: 'Markenfarben',
          brandColorsPlaceholder: 'z.B. Marineblau, warmes Gold',
          brandColorsOptional: '(optional)',
          hasLogo: 'Haben Sie ein Logo?',
          logoOptions: {
            yes: 'Ja',
            no: 'Nein',
            inProgress: 'In Arbeit',
          },
        },
        section4: {
          title: 'Seiten & Inhalte',
          pagesNeeded: 'Benötigte Seiten',
          pageOptions: {
            home: 'Startseite',
            about: 'Über uns',
            services: 'Leistungen',
            blog: 'Blog',
            contact: 'Kontakt',
            pricing: 'Preise',
            portfolio: 'Portfolio',
            testimonials: 'Referenzen',
            faq: 'FAQ',
            other: 'Andere',
          },
          otherPagesPlaceholder: 'Weitere Seiten angeben',
          hasCopy: 'Haben Sie Texte fertig?',
          copyOptions: {
            yes: 'Ja, fertig',
            partially: 'Teilweise',
            no: 'Nein, brauche Hilfe',
          },
          hasPhotos: 'Haben Sie professionelle Fotos?',
          photoOptions: {
            yes: 'Ja',
            noNeedPhotographer: 'Nein, brauche Fotografen',
            useStock: 'Nutze Stock-Bilder',
          },
        },
        section5: {
          title: 'Technische Anforderungen',
          integrations: 'Benötigte Integrationen',
          integrationOptions: {
            newsletter: 'Newsletter-Anmeldung',
            booking: 'Online-Buchung / Kalender',
            payment: 'Zahlungsabwicklung',
            video: 'Video-Einbettung',
            multilingual: 'Mehrsprachig',
            none: 'Keine',
          },
          domainSituation: 'Domain-Situation',
          domainOptions: {
            hasDomain: 'Ich habe bereits eine Domain',
            needDomain: 'Ich muss eine registrieren',
            notSure: 'Nicht sicher',
          },
          hosting: 'Hosting',
          hostingOptions: {
            euHosting: 'EU-Hosting im Paket enthalten',
            ownHosting: 'Ich verwalte mein eigenes Hosting',
          },
        },
        section6: {
          title: 'Investition & Zeitplan',
          budget: 'Budgetrahmen',
          budgetOptions: {
            tier1: '€1.800–€2.500',
            tier2: '€2.500–€3.500',
            tier3: '€4.500–€6.000',
            notSure: 'Noch nicht sicher',
          },
          launchMonth: 'Gewünschter Launch-Monat',
          launchMonthPlaceholder: 'z.B. Mai 2025',
          retainerInterest: 'Interesse an monatlichem Retainer?',
          retainerOptions: {
            yes: 'Ja',
            maybe: 'Vielleicht',
            no: 'Nein',
          },
        },
        section7: {
          title: 'Inspiration',
          inspirationUrls: 'Bis zu 3 Inspirations- / Wettbewerber-URLs',
          urlPlaceholder: 'https://...',
          urlOptional: '(optional)',
          whatYouLove: 'Was gefällt Ihnen daran?',
          whatYouLovePlaceholder: 'Farben, Layout, Atmosphäre, Features...',
          whatToAvoid: 'Was sollten wir unbedingt vermeiden?',
          whatToAvoidPlaceholder: 'Alles, was Sie nicht mögen oder vermeiden möchten',
        },
        section8: {
          title: 'Abschließende Notizen',
          anythingElse: 'Möchten Sie noch etwas teilen?',
          anythingElsePlaceholder: 'Zusätzlicher Kontext, Ideen oder Fragen...',
          optional: '(optional)',
        },
      },
      success: {
        headline: 'Ihr Briefing ist eingegangen.',
        subtext: 'Wir werden alles prüfen und uns innerhalb von 48 Stunden bei Ihnen melden.',
        note: 'Behalten Sie Ihren Posteingang im Auge.',
      },
      error: {
        submitFailed: 'Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.',
        retry: 'Erneut versuchen',
      },
      validation: {
        required: 'Dieses Feld ist erforderlich',
        invalidEmail: 'Bitte geben Sie eine gültige E-Mail-Adresse ein',
      },
    },
  },
} as const;

export function getDictionary(locale: Locale): Dictionary {
  return (dictionaries[locale] || dictionaries[defaultLocale]) as unknown as Dictionary;
}
