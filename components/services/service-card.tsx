import Link from 'next/link';
import type { ServiceItem } from '@/content/services';

type ServiceCardProps = {
  item: ServiceItem;
  defaultOpen?: boolean;
};

export function ServiceCard({ item, defaultOpen = false }: ServiceCardProps) {
  const tags = item.problemShape.slice(0, 3);

  return (
    <details className="panel service-cell" id={item.slug} open={defaultOpen}>
      <summary className="service-cell-summary">
        <span className="service-cell-main">
          <span className="service-mini-label">{item.eyebrow}</span>
          <span className="service-cell-title">{item.name}</span>
          <span className="service-symptom">{item.symptomHeadline}</span>
          <span className="service-cell-signals" aria-label="Common signs">
            {tags.map((tag) => (
              <span className="service-signal" key={tag}>
                <span className="service-signal-path" aria-hidden="true" />
                <span className="service-signal-text">{tag}</span>
              </span>
            ))}
          </span>
        </span>
        <span className="service-cell-toggle" aria-hidden="true" />
      </summary>

      <div className="service-cell-detail">
        <div className="service-card-block service-fit-block">
          <strong>Good fit</strong>
          <p>{item.whoItsFor}</p>
          {item.bestFirstStep ? <p className="service-best-first-step">{item.bestFirstStep}</p> : null}
        </div>

        <div className="service-card-block">
          <strong>Common signs</strong>
          <ul>
            {item.problemShape.map((sign) => (
              <li key={sign}>{sign}</li>
            ))}
          </ul>
        </div>

        <div className="service-milestone">
          <strong>{item.firstMilestone.timeframe}</strong>
          <p>{item.firstMilestone.outcome}</p>
        </div>

        <div className="service-card-block">
          <strong>Deliverables</strong>
          <ul>
            {item.deliverables.map((deliverable) => (
              <li key={deliverable}>{deliverable}</li>
            ))}
          </ul>
        </div>

        <div className="service-proof-block">
          <strong>Related work</strong>
          <p>{item.proofNote}</p>
          <Link className="text-link" href={item.proofHref}>
            View {item.proofAnchor}
          </Link>
        </div>

        <div className="service-card-cta">
          <Link className="button button-primary" href={item.cta.href}>
            {item.cta.label}
          </Link>
          <p>{item.cta.note}</p>
        </div>
      </div>
    </details>
  );
}
