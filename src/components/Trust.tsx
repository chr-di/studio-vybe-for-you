import { Dictionary } from '@/lib/i18n';
import { ScrollAnimation } from './ScrollAnimation';

interface TrustProps {
  dict: Dictionary;
}

export function Trust({ dict }: TrustProps) {
  return (
    <section className="py-32">
      <div className="max-w-5xl mx-auto w-full px-6 md:px-8">
        <ScrollAnimation>
          <p className="font-display text-3xl md:text-4xl lg:text-5xl font-normal text-light/60 text-center leading-snug">
            {dict.trust.headline}
          </p>
        </ScrollAnimation>
      </div>
    </section>
  );
}
