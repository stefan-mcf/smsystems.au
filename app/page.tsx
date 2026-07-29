import { Hero } from '@/components/home/hero';
import { AboutSection } from '@/components/home/about-section';
import { ProjectCard } from '@/components/projects/project-card';
import { SectionIntro } from '@/components/ui/section-intro';
import { CtaSection } from '@/components/ui/cta-section';
import {
  flagshipProjects,
  supportingProjects,
  technicalTools,
} from '@/content/projects';
import { siteMeta } from '@/content/site';
import { ProjectEnquiryProvider } from '@/components/contact/project-enquiry-dialog';
import Link from 'next/link';

export default function HomePage() {
  return (
    <ProjectEnquiryProvider>
      <Hero />

      <section className="page-section home-work-section" id="work" data-reveal>
        <div className="home-work-heading">
          <SectionIntro
            eyebrow="Selected work"
            title="Four projects. Four different operating problems."
            body="AI support, automation reliability, lead operations, and a delivered client website. Each story covers the decisions behind the finished system."
          />
        </div>
        <div className="project-card-list">
          {flagshipProjects.map((project, index) => (
            <ProjectCard project={project} index={index} key={project.slug} />
          ))}
        </div>
      </section>

      <section className="page-section supporting-work-section" data-reveal>
        <div className="supporting-work-intro">
          <p className="project-kicker">More implementation work</p>
          <h2>Focused builds for integrations and internal operations.</h2>
          <p>
            Smaller projects with a narrower scope, documented as engineering
            notes rather than stretched into flagship stories.
          </p>
        </div>
        <div className="supporting-project-list">
          {supportingProjects.map((project, index) => (
            <Link href={`/work/${project.slug}/`} key={project.slug}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <p>{project.category}</p>
                <h3>{project.shortTitle}</h3>
              </div>
              <p>{project.cardDescription}</p>
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="page-section technical-tools-section" data-reveal>
        <div className="technical-tools-copy">
          <p className="project-kicker">Open source tools</p>
          <h2>Reusable components for the work behind the work.</h2>
          <p>
            Public repositories for API integration, reconciliation, document
            routing, and human review checkpoints.
          </p>
          <Link
            className="text-link"
            href="https://github.com/stefan-mcf"
            target="_blank"
            rel="noreferrer"
          >
            View GitHub profile ↗
          </Link>
        </div>
        <div className="technical-tool-list">
          {technicalTools.map((tool) => (
            <Link href={tool.href} target="_blank" rel="noreferrer" key={tool.name}>
              <span>{tool.stack}</span>
              <h3>{tool.name}</h3>
              <p>{tool.description}</p>
              <strong>Repository ↗</strong>
            </Link>
          ))}
        </div>
      </section>

      <AboutSection />

      <div className="page-divider" aria-hidden="true" />

      <div className="final-contact-section" id="contact" data-reveal>
        <CtaSection
          eyebrow="Contact"
          title={siteMeta.finalCta.title}
          primary={siteMeta.finalCta.primary}
          secondary={siteMeta.finalCta.secondary}
        />
      </div>
    </ProjectEnquiryProvider>
  );
}
