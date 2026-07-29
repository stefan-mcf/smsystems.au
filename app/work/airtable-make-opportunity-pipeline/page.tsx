import type { Metadata } from 'next';
import { ProjectStory } from '@/components/projects/project-story';
import { getProject } from '@/content/projects';

const project = getProject('airtable-make-opportunity-pipeline');

export const metadata: Metadata = {
  title: 'Airtable and Make Opportunity Pipeline | Stefan McFeeters',
  description:
    'An internal operating system for approved opportunities, routing decisions, exceptions, reporting, and project handoff.',
  alternates: { canonical: '/work/airtable-make-opportunity-pipeline/' },
};

export default function AirtableMakeOpportunityPipelinePage() {
  if (!project) throw new Error('Airtable and Make project is missing.');
  return <ProjectStory project={project} />;
}
