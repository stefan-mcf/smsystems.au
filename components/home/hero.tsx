import Link from 'next/link';
import { siteMeta } from '@/content/site';

export function Hero() {
  const { hero } = siteMeta;

  return (
    <section className="hero" id="top">
      <div className="hero-grid">
        <div className="hero-copy-block">
          <h1>
            <span className="hero-line">BUILD THE SYSTEM.</span>
            <span className="hero-line hero-line-accent">KEEP IT RUNNING.</span>
          </h1>
          <p className="hero-copy">{hero.subhead}</p>
          <div className="cta-row">
            <Link className="button button-primary" href={hero.primaryCta.href}>
              {hero.primaryCta.label}
            </Link>
            <Link className="button button-secondary" href={hero.secondaryCta.href}>
              {hero.secondaryCta.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
