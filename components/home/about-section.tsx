import { siteMeta } from '@/content/site';

export function AboutSection() {
  const { about } = siteMeta;

  return (
    <section className="page-section about-section" id="about" data-reveal>
      <div className="about-copy">
        <p className="eyebrow">{about.eyebrow}</p>
        <h2>{about.title}</h2>
        <div className="about-body">
          {about.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>

      <aside className="about-card panel" aria-label="About Stefan McFeeters">
        <div className="about-portrait-frame">
          <img src={about.imageSrc} alt={about.imageAlt} />
        </div>
        <div className="about-card-copy">
          <p className="about-name">Stefan McFeeters</p>
          <p className="brand-subtitle">SM Systems</p>
          <ul>
            {about.facts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        </div>
      </aside>
    </section>
  );
}
