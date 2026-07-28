import Link from 'next/link';
import { ProjectEnquiryTrigger } from '@/components/contact/project-enquiry-dialog';

type CtaSectionProps = {
  eyebrow?: string;
  title: string;
  body?: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
  profile?: {
    imageSrc: string;
    name: string;
    role: string;
    summary: string;
  };
};

export function CtaSection({ eyebrow, title, body, primary, secondary, profile }: CtaSectionProps) {
  const actions = (
    <div className="cta-row">
      {primary.href === '/#project-enquiry' ? (
        <ProjectEnquiryTrigger className="button button-primary">
          {primary.label}
        </ProjectEnquiryTrigger>
      ) : (
        <Link className="button button-primary" href={primary.href}>
          {primary.label}
        </Link>
      )}
      {secondary ? (
        <Link className="button button-secondary" href={secondary.href}>
          {secondary.label}
        </Link>
      ) : null}
    </div>
  );

  return (
    <section className={`panel cta-panel${profile ? ' cta-panel-profile' : ''}`}>
      <div className="cta-panel-copy">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2>
          {title.split('\n').map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h2>
        {body ? <p>{body}</p> : null}
      </div>
      <div className="cta-panel-actions">
        {profile ? (
          <div className="cta-profile" aria-label={`Profile for ${profile.name}`}>
            <img src={profile.imageSrc} alt={`${profile.name} portrait`} />
            <div className="cta-profile-copy">
              <div>
                <p className="cta-profile-name">{profile.name}</p>
                <p className="cta-profile-role">{profile.role}</p>
              </div>
              {profile.summary ? <p className="cta-profile-summary">{profile.summary}</p> : null}
              {actions}
            </div>
          </div>
        ) : (
          actions
        )}
      </div>
    </section>
  );
}
