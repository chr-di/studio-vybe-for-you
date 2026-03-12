import { Dictionary } from '@/lib/i18n';

interface HeroProps {
  dict: Dictionary;
  locale: string;
}

export function Hero({ dict, locale }: HeroProps) {
  return (
    <section className="min-h-screen flex flex-col justify-center py-32">
      <div className="max-w-5xl mx-auto w-full px-6 md:px-8">
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-normal leading-[1.1] tracking-tight">
          {dict.hero.headline}
          <br />
          <span className="text-muted">{dict.hero.subheadline}</span>
        </h1>

        <div className="mt-16 flex flex-col sm:flex-row gap-4">
          <a
            href={'/' + locale + '/apply'}
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium bg-light text-dark hover:bg-cream transition-colors"
          >
            {dict.hero.cta.primary}
          </a>
          <button
            disabled
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium border border-muted text-muted cursor-not-allowed"
          >
            {dict.hero.cta.secondary}
            <span className="ml-3 text-sm px-2 py-0.5 bg-muted/20 rounded">
              {dict.hero.cta.comingSoon}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
