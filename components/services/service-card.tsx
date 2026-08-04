import Link from 'next/link';
import type { ServiceItem } from '@/content/services';

type ServiceCardProps = {
  item: ServiceItem;
};

export function ServiceCard({ item }: ServiceCardProps) {
  return (
    <details className="panel service-cell" id={`service-${item.slug}`}>
      <summary className="service-cell-summary">
        <span className="service-cell-main">
          <span className="service-mini-label">{item.shortLabel}</span>
          <span className="service-cell-title">{item.name}</span>
          <span className="service-symptom">{item.summary}</span>
        </span>
        <span className="service-cell-toggle" aria-hidden="true" />
      </summary>

      <div className="service-cell-detail">
        <div className="service-card-block service-signals-block">
          <strong>Common signs</strong>
          <div className="service-cell-signals">
            {item.signals.map((signal) => (
              <span className="service-signal" key={signal}>
                <span className="service-signal-path" aria-hidden="true" />
                <span className="service-signal-text">{signal}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="service-card-block service-fit-block">
          <strong>Good fit</strong>
          <p>{item.fit}</p>
        </div>

        <div className="service-card-block">
          <strong>What this can include</strong>
          <ul>
            {item.capabilities.map((capability) => (
              <li key={capability.title}>{capability.title}</li>
            ))}
          </ul>
        </div>

        <div className="service-proof-block">
          <strong>Related work</strong>
          <ul className="service-related-links">
            {item.proof.map((project) => (
              <li key={project.href}>
                <Link className="text-link" href={project.href}>
                  {project.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="service-card-cta">
          <Link
            className="button button-primary"
            href={`/services/${item.slug}/`}
            scroll
          >
            Explore this service
          </Link>
        </div>
      </div>
    </details>
  );
}
