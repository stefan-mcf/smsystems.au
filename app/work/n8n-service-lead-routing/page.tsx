import type { Metadata } from 'next';
import { ProjectStory } from '@/components/projects/project-story';
import { getProject } from '@/content/projects';

const project = getProject('n8n-service-lead-routing');

export const metadata: Metadata = {
  title: 'n8n Service Lead Routing Workflow | Stefan McFeeters',
  description:
    'A 16-node n8n implementation for lead validation, duplicate handling, business routing, exceptions, and human review.',
  alternates: { canonical: '/work/n8n-service-lead-routing/' },
};

export default function N8nServiceLeadRoutingPage() {
  if (!project) throw new Error('n8n service lead project is missing.');
  return <ProjectStory project={project} />;
}
