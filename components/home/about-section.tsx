import { siteMeta } from '@/content/site';
import { ZoomableImage } from '@/components/ui/image-lightbox';

export function AboutSection() {
  const { about } = siteMeta;

  return (
    <section className="page-section about-section" id="about" data-reveal>
      <div className="about-copy">
        <p className="eyebrow">{about.eyebrow}</p>
        <h2>{about.title}</h2>
      </div>

      <aside className="about-card panel" aria-label="About Stefan McFeeters">
        <div className="about-portrait-frame">
          <ZoomableImage
            src={about.imageSrc}
            alt={about.imageAlt}
            width={997}
            height={1254}
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="about-card-copy">
          <p className="about-name">Stefan McFeeters</p>
          <ul>
            {about.facts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        </div>
      </aside>

      <div className="about-body">
        {about.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
