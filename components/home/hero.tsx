import Link from 'next/link';
import { ProjectEnquiryTrigger } from '@/components/contact/project-enquiry-dialog';
import { siteMeta } from '@/content/site';

export function Hero() {
  const { hero } = siteMeta;

  return (
    <section className="hero" id="top">
      <div className="hero-grid">
        <div className="hero-copy-block">
          <p className="hero-kicker">{hero.kicker}</p>
          <h1>
            <span className="hero-line">BUILD THE SYSTEM.</span>
            <span className="hero-line hero-line-accent">KEEP IT RUNNING.</span>
          </h1>
          <p className="hero-copy">{hero.subhead}</p>
          <div className="cta-row">
            <ProjectEnquiryTrigger className="button button-primary">
              {hero.primaryCta.label}
            </ProjectEnquiryTrigger>
            <Link className="button button-secondary" href={hero.secondaryCta.href}>
              {hero.secondaryCta.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
