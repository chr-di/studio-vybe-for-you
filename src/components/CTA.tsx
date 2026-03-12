import { Dictionary } from '@/lib/i18n';
import { ScrollAnimation } from './ScrollAnimation';

interface CTAProps {
  dict: Dictionary;
}

export function CTA({ dict }: CTAProps) {
  return (
    <section id="contact" className="bg-cream text-dark py-32">
      <div className="max-w-3xl mx-auto w-full px-6 md:px-8 text-center">
        <ScrollAnimation>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-normal mb-6">
            {dict.cta.title}
          </h2>
          <p className="text-lg text-dark/60 mb-12">
            {dict.cta.subtitle}
          </p>
          <a
            href="mailto:hello@studiovybe.com"
            className="inline-flex items-center justify-center px-10 py-5 text-lg font-medium bg-dark text-light hover:bg-dark/90 transition-colors"
          >
            {dict.cta.button}
          </a>
        </ScrollAnimation>
      </div>
    </section>
  );
}
