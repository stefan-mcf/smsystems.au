import type { Metadata } from 'next';
import { ProjectStory } from '@/components/projects/project-story';
import { getProject } from '@/content/projects';

const project = getProject('zendesk-jira-support-escalation');

export const metadata: Metadata = {
  title: 'Zendesk to Jira Support Escalation | Stefan McFeeters',
  description:
    'A guarded Zendesk to Jira webhook route with explicit field mapping, ordered provider writes, and a verified return update.',
  alternates: { canonical: '/work/zendesk-jira-support-escalation/' },
};

export default function ZendeskJiraSupportEscalationPage() {
  if (!project) throw new Error('Zendesk to Jira project is missing.');
  return <ProjectStory project={project} />;
}
