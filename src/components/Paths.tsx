import { Dictionary } from '@/lib/i18n';
import { ScrollAnimation } from './ScrollAnimation';

interface PathsProps {
  dict: Dictionary;
}

export function Paths({ dict }: PathsProps) {
  return (
    <section className="py-32">
      <div className="max-w-5xl mx-auto w-full px-6 md:px-8">
        <ScrollAnimation>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-normal mb-20">
            {dict.paths.title}
          </h2>
        </ScrollAnimation>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {/* Done For You */}
          <ScrollAnimation delay={100}>
            <div>
              <span className="text-sm font-medium uppercase tracking-wider text-accent mb-4 block">
                {dict.paths.dfy.label}
              </span>
              <h3 className="font-display text-3xl md:text-4xl mb-6">
                {dict.paths.dfy.title}
              </h3>
              <p className="text-lg text-light/70 mb-8 leading-relaxed">
                {dict.paths.dfy.description}
              </p>
              <ul className="space-y-3">
                {dict.paths.dfy.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3 text-light/80">
                    <span className="text-accent mt-1">—</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollAnimation>

          {/* DIY with AI */}
          <ScrollAnimation delay={200}>
            <div className="opacity-60">
              <span className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-muted mb-4">
                {dict.paths.diy.label}
              </span>
              <h3 className="font-display text-3xl md:text-4xl mb-6 text-muted">
                {dict.paths.diy.title}
              </h3>
              <p className="text-lg text-muted/70 mb-8 leading-relaxed">
                {dict.paths.diy.description}
              </p>
              <ul className="space-y-3">
                {dict.paths.diy.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3 text-muted/60">
                    <span className="text-muted mt-1">—</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
