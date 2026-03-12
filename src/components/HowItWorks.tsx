import { Dictionary } from '@/lib/i18n';
import { ScrollAnimation } from './ScrollAnimation';

interface HowItWorksProps {
  dict: Dictionary;
}

export function HowItWorks({ dict }: HowItWorksProps) {
  return (
    <section className="bg-cream text-dark py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto">
        <ScrollAnimation>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-normal mb-20">
            {dict.howItWorks.title}
          </h2>
        </ScrollAnimation>

        <div className="space-y-20">
          {dict.howItWorks.steps.map((step, index) => (
            <ScrollAnimation key={index} delay={index * 100}>
              <div className="grid md:grid-cols-[120px_1fr] gap-6 md:gap-12">
                <span className="font-display text-6xl md:text-7xl text-dark/20">
                  {step.number}
                </span>
                <div>
                  <h3 className="font-display text-3xl md:text-4xl mb-4">
                    {step.title}
                  </h3>
                  <p className="text-lg text-dark/70 leading-relaxed max-w-xl">
                    {step.description}
                  </p>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
