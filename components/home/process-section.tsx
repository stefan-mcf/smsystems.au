import { siteMeta } from '@/content/site';

export function ProcessSection() {
  const { process } = siteMeta;

  return (
    <section className="page-section process-section" id="process" data-reveal>
      <div className="process-intro">
        <p className="eyebrow">{process.eyebrow}</p>
        <h2>{process.title}</h2>
        <p>{process.body}</p>
      </div>

      <div className="process-panel panel">
        <div className="process-lane" aria-hidden="true" />
        <div className="process-steps">
          {process.steps.map((step) => (
            <article className="process-step" key={step.label}>
              <span className="process-step-node" aria-hidden="true" />
              <div className="process-step-copy">
                <div className="process-step-heading">
                  <h3>{step.label}</h3>
                  <p>{step.window}</p>
                </div>
                <p>{step.body}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="process-evidence">
          <strong>{process.evidence.title}</strong>
          <p>{process.evidence.body}</p>
        </div>
      </div>
    </section>
  );
}
