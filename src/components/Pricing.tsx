import { Dictionary } from '@/lib/i18n';
import { ScrollAnimation } from './ScrollAnimation';

interface PricingProps {
  dict: Dictionary;
}

export function Pricing({ dict }: PricingProps) {
  return (
    <section id="pricing" className="bg-cream text-dark py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto">
        <ScrollAnimation>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-normal mb-4">
            {dict.pricing.title}
          </h2>
          <p className="text-lg text-dark/60 mb-20">
            {dict.pricing.subtitle}
          </p>
        </ScrollAnimation>

        {/* One-time setup */}
        <ScrollAnimation>
          <h3 className="font-display text-2xl md:text-3xl mb-12">
            {dict.pricing.oneTime.title}
          </h3>
        </ScrollAnimation>

        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {dict.pricing.oneTime.tiers.map((tier, index) => (
            <ScrollAnimation key={index} delay={index * 100}>
              <div className={`p-8 ${'popular' in tier && tier.popular ? 'bg-dark text-light' : 'bg-light'}`}>
                {'popular' in tier && tier.popular && (
                  <span className="text-xs uppercase tracking-wider text-accent mb-4 block">
                    Most popular
                  </span>
                )}
                <h4 className="font-display text-2xl mb-2">{tier.name}</h4>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-3xl font-medium">€{tier.price}</span>
                </div>
                {'description' in tier && (
                  <p className={`text-sm mb-8 ${'popular' in tier && tier.popular ? 'text-light/60' : 'text-dark/60'}`}>
                    {tier.description}
                  </p>
                )}
                <ul className="space-y-3">
                  {tier.features.map((feature, i) => (
                    <li key={i} className={`flex items-start gap-2 text-sm ${'popular' in tier && tier.popular ? 'text-light/80' : 'text-dark/80'}`}>
                      <span className={'popular' in tier && tier.popular ? 'text-accent' : 'text-dark/40'}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollAnimation>
          ))}
        </div>

        {/* Monthly retainer */}
        <ScrollAnimation>
          <h3 className="font-display text-2xl md:text-3xl mb-4">
            {dict.pricing.retainer.title}
          </h3>
          <p className="text-dark/60 mb-12">
            {dict.pricing.retainer.subtitle}
          </p>
        </ScrollAnimation>

        <div className="grid md:grid-cols-3 gap-8">
          {dict.pricing.retainer.tiers.map((tier, index) => (
            <ScrollAnimation key={index} delay={index * 100}>
              <div className={`p-8 ${'popular' in tier && tier.popular ? 'bg-dark text-light' : 'bg-light'}`}>
                {'popular' in tier && tier.popular && (
                  <span className="text-xs uppercase tracking-wider text-accent mb-4 block">
                    Most popular
                  </span>
                )}
                <h4 className="font-display text-2xl mb-2">{tier.name}</h4>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-3xl font-medium">€{tier.price}</span>
                  <span className={`text-sm ${'popular' in tier && tier.popular ? 'text-light/60' : 'text-dark/60'}`}>
                    {dict.pricing.perMonth}
                  </span>
                </div>
                <ul className="space-y-3">
                  {tier.features.map((feature, i) => (
                    <li key={i} className={`flex items-start gap-2 text-sm ${'popular' in tier && tier.popular ? 'text-light/80' : 'text-dark/80'}`}>
                      <span className={'popular' in tier && tier.popular ? 'text-accent' : 'text-dark/40'}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
