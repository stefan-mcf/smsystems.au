import Link from 'next/link';
import type { Project } from '@/content/projects';

type ProjectStoryProps = {
  project: Project;
};

function ExternalMark({ href }: { href: string }) {
  return href.startsWith('http') ? <span aria-hidden="true">↗</span> : null;
}

export function ProjectStory({ project }: ProjectStoryProps) {
  return (
    <article className="project-page">
      <header className="project-hero" data-reveal>
        <Link className="project-back-link" href="/#work">
          <span aria-hidden="true">←</span>
          Selected work
        </Link>

        <div className="project-hero-layout">
          <div className="project-hero-copy">
            <p className="project-kicker">{project.category}</p>
            <h1>{project.title}</h1>
            <p className="project-summary">{project.summary}</p>
            <div className="project-actions">
              {project.links.slice(0, 2).map((link) => (
                <Link
                  className={
                    link.style === 'primary'
                      ? 'button button-primary'
                      : 'button button-secondary'
                  }
                  href={link.href}
                  key={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                >
                  {link.label}
                  <ExternalMark href={link.href} />
                </Link>
              ))}
            </div>
          </div>

          <dl className="project-brief">
            <div>
              <dt>Status</dt>
              <dd>{project.status}</dd>
            </div>
            <div>
              <dt>My role</dt>
              <dd>{project.role}</dd>
            </div>
            <div>
              <dt>Timeframe</dt>
              <dd>{project.timeframe}</dd>
            </div>
            <div>
              <dt>Stack</dt>
              <dd>{project.stack.join(' · ')}</dd>
            </div>
          </dl>
        </div>
      </header>

      <figure className="project-hero-visual" data-reveal>
        <img
          src={project.heroImage.src}
          alt={project.heroImage.alt}
          width={project.heroImage.width}
          height={project.heroImage.height}
          loading="eager"
        />
        <figcaption>{project.heroImage.caption}</figcaption>
      </figure>

      <section className="project-facts" aria-label="Project facts" data-reveal>
        {project.facts.map((fact) => (
          <div key={`${fact.value}-${fact.label}`}>
            <strong>{fact.value}</strong>
            <span>{fact.label}</span>
          </div>
        ))}
      </section>

      <section className="project-editorial project-context" data-reveal>
        <p className="project-section-number">01</p>
        <div>
          <p className="project-kicker">Why this existed</p>
          <h2>{project.context.title}</h2>
        </div>
        <div className="project-prose">
          {project.context.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="project-editorial project-ownership" data-reveal>
        <p className="project-section-number">02</p>
        <div>
          <p className="project-kicker">What I owned</p>
          <h2>From operating problem to working system.</h2>
          <p>{project.ownership.intro}</p>
        </div>
        <ul className="project-responsibility-list">
          {project.ownership.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="project-flow" aria-labelledby={`${project.slug}-flow`} data-reveal>
        <div className="project-section-heading">
          <p className="project-kicker">System map</p>
          <h2 id={`${project.slug}-flow`}>The operating path</h2>
        </div>
        <ol>
          {project.systemFlow.map((step, index) => (
            <li key={step}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{step}</strong>
            </li>
          ))}
        </ol>
      </section>

      <section className="project-decisions" aria-labelledby={`${project.slug}-decisions`} data-reveal>
        <div className="project-section-heading">
          <p className="project-kicker">Engineering and delivery decisions</p>
          <h2 id={`${project.slug}-decisions`}>Choices that shaped the build</h2>
        </div>
        <div className="project-decision-list">
          {project.decisions.map((decision, index) => (
            <article key={decision.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3>{decision.title}</h3>
                <p>{decision.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <aside className="project-turning-point" data-reveal>
        <p className="project-kicker">What changed during the work</p>
        <h2>{project.turningPoint.title}</h2>
        <p>{project.turningPoint.body}</p>
      </aside>

      <section className="project-walkthrough" aria-labelledby={`${project.slug}-walkthrough`} data-reveal>
        <div className="project-section-heading">
          <p className="project-kicker">Selected walkthrough</p>
          <h2 id={`${project.slug}-walkthrough`}>The system in use</h2>
        </div>
        <div className="project-gallery">
          {project.gallery.map((image, index) => (
            <figure key={image.src}>
              <div className="project-gallery-media">
                <img
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
              </div>
              <figcaption>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{image.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="project-validation" data-reveal>
        <div>
          <p className="project-kicker">How I checked it</p>
          <h2>Validation tied to the operating claim.</h2>
          <p>{project.validation.intro}</p>
        </div>
        <ul>
          {project.validation.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="project-result" data-reveal>
        <p className="project-section-number">03</p>
        <div>
          <p className="project-kicker">Result and current boundary</p>
          <h2>{project.result.title}</h2>
          <div className="project-prose">
            {project.result.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className="project-actions">
          {project.links.map((link) => (
            <Link
              className={
                link.style === 'primary'
                  ? 'button button-primary'
                  : 'button button-secondary'
              }
              href={link.href}
              key={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
            >
              {link.label}
              <ExternalMark href={link.href} />
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
