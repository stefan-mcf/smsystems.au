import type { Metadata } from 'next';
import { ProjectStory } from '@/components/projects/project-story';
import { getProject } from '@/content/projects';

const project = getProject('airtable-coaching-program-delivery-hub');

export const metadata: Metadata = {
  title: 'Airtable Coaching Program Delivery Hub | Stefan McFeeters',
  description:
    'A relational Airtable system with four published Interfaces for participants, sessions, actions, ownership, and programme delivery.',
  alternates: {
    canonical: '/work/airtable-coaching-program-delivery-hub/',
  },
};

export default function AirtableCoachingProgramDeliveryHubPage() {
  if (!project) throw new Error('Airtable Coaching project is missing.');
  return <ProjectStory project={project} />;
}
