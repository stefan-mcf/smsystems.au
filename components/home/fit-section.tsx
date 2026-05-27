import { siteMeta } from '@/content/site';

export function FitSection() {
  const { fit } = siteMeta;

  return (
    <section className="page-section fit-section" id="fit" data-reveal>
      <div className="fit-intro">
        <p className="eyebrow">{fit.eyebrow}</p>
        <h2>{fit.title}</h2>
        <p>{fit.body}</p>
      </div>

      <div className="fit-panel-grid" aria-label="Project fit guidance">
        {fit.panels.map((panel) => (
          <article className="panel fit-panel" key={panel.title}>
            <div className="fit-panel-heading">
              <h3>{panel.title}</h3>
            </div>
            <div className="fit-signal-list">
              {panel.items.map((item) => (
                <p className="fit-signal" key={item}>
                  <span className="fit-signal-node" aria-hidden="true" />
                  <span>{item}</span>
                </p>
              ))}
            </div>
          </article>
        ))}
        <article className="panel fit-panel fit-panel-close">
          <div className="fit-panel-heading">
            <h3>{fit.closePanel.title}</h3>
          </div>
          <div className="fit-signal-list fit-close-content">
            {fit.closePanel.items.map((item) => (
              <p className="fit-signal" key={item}>
                <span className="fit-signal-node" aria-hidden="true" />
                <span>{item}</span>
              </p>
            ))}
            <p className="fit-signal">
              <span className="fit-signal-node" aria-hidden="true" />
              <a className="text-link" href={fit.cta.href}>
                {fit.cta.label}
              </a>
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
