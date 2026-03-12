import { Dictionary } from '@/lib/i18n';
import { ScrollAnimation } from './ScrollAnimation';

interface FeaturesProps {
  dict: Dictionary;
}

export function Features({ dict }: FeaturesProps) {
  return (
    <section className="py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-5xl">
        <ScrollAnimation>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-normal mb-20">
            {dict.features.title}
          </h2>
        </ScrollAnimation>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
          {dict.features.items.map((feature, index) => (
            <ScrollAnimation key={index} delay={index * 50}>
              <div>
                <h3 className="font-display text-xl md:text-2xl mb-3">
                  {feature.title}
                </h3>
                <p className="text-light/60 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
