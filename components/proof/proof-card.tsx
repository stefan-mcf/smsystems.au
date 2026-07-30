import Link from 'next/link';
import type { ProofItem } from '@/content/proof';
import { ScreenshotCarousel } from './screenshot-carousel';

type ProofCardProps = {
  item: ProofItem;
};

export function ProofCard({ item }: ProofCardProps) {
  const hasCaseStudy = Boolean(item.caseStudy);
  const className = `panel proof-card${
    item.anchorClient || item.featuredBuild ? ' proof-card-anchor' : ''
  }`;

  return (
    <details className={className} id={item.slug} open={!hasCaseStudy}>
      <summary className="proof-card-summary">
        <span className="proof-copy-stack">
          <span className="proof-lane">{item.lane}</span>
          <span className="proof-card-title">{item.title}</span>
          <span>{item.problemShape}</span>
        </span>
        <span className="proof-card-toggle" aria-hidden="true" />
      </summary>

      <div className="proof-card-detail">
        {item.caseStudy ? (
          <div className="proof-case-study" aria-label={`${item.title} work summary`}>
            {item.caseStudy.outcome ? (
              <section className="proof-case-section proof-case-outcome">
                <p>{item.caseStudy.outcome}</p>
              </section>
            ) : null}

            {item.caseStudy.proofStrip?.length ? (
              <section className="proof-case-section proof-proof-strip-section">
                <div className="proof-proof-strip">
                  {item.caseStudy.proofStrip.map((proof) => (
                    <article key={proof.label}>
                      <span>{proof.label}</span>
                      <strong>{proof.title}</strong>
                      <p>{proof.body}</p>
                    </article>
                  ))}
                </div>
              </section>
            ) : null}

            {item.caseStudy.screenshots?.length ? (
              <section className="proof-case-section proof-visual-evidence">
                <ScreenshotCarousel screenshots={item.caseStudy.screenshots} />
              </section>
            ) : null}
          </div>
        ) : null}

        {item.caseStudyLink ? (
          <div className="proof-card-actions">
            <Link className="button button-primary" href={item.caseStudyLink}>
              View full case study
            </Link>
            {item.primaryLink && item.primaryLinkLabel ? (
              <Link className="button button-secondary" href={item.primaryLink}>
                {item.primaryLinkLabel}
              </Link>
            ) : null}
          </div>
        ) : item.primaryLink && item.primaryLinkLabel ? (
          <Link className="text-link" href={item.primaryLink}>
            {item.primaryLinkLabel}
          </Link>
        ) : null}
      </div>
    </details>
  );
}
