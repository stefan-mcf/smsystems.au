import Link from 'next/link';
import type { Project } from '@/content/projects';

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <article className="project-card" data-reveal>
      <Link
        className="project-card-media"
        href={`/work/${project.slug}/`}
        aria-label={`Read ${project.title}`}
      >
        <img
          src={project.heroImage.src}
          alt=""
          width={project.heroImage.width}
          height={project.heroImage.height}
          loading={index === 0 ? 'eager' : 'lazy'}
        />
        <span className="project-card-index" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>
      </Link>
      <div className="project-card-copy">
        <div className="project-card-meta">
          <span>{project.category}</span>
          <span>{project.status}</span>
        </div>
        <h3>
          <Link href={`/work/${project.slug}/`}>{project.shortTitle}</Link>
        </h3>
        <p>{project.cardDescription}</p>
        <Link className="project-card-link" href={`/work/${project.slug}/`}>
          Read project
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
}
