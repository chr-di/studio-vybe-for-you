import { Dictionary } from '@/lib/i18n';
import { ScrollAnimation } from './ScrollAnimation';

interface TrustProps {
  dict: Dictionary;
}

export function Trust({ dict }: TrustProps) {
  return (
    <section className="py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-5xl">
        <ScrollAnimation>
          <p className="font-display text-3xl md:text-4xl lg:text-5xl font-normal text-light/60 text-center leading-snug">
            {dict.trust.headline}
          </p>
        </ScrollAnimation>
      </div>
    </section>
  );
}
