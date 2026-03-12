import { Dictionary } from '@/lib/i18n';
import { ScrollAnimation } from './ScrollAnimation';

interface ProblemProps {
  dict: Dictionary;
}

export function Problem({ dict }: ProblemProps) {
  return (
    <section className="bg-cream text-dark py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto">
        <ScrollAnimation>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-normal mb-20">
            {dict.problem.title}
          </h2>
        </ScrollAnimation>

        <div className="space-y-16">
          {dict.problem.points.map((point, index) => (
            <ScrollAnimation key={index} delay={index * 100}>
              <div className="grid md:grid-cols-2 gap-6 md:gap-12">
                <h3 className="font-display text-2xl md:text-3xl">
                  {point.title}
                </h3>
                <p className="text-lg text-dark/70 leading-relaxed">
                  {point.description}
                </p>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
