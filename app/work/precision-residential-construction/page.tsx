import type { Metadata } from 'next';
import { ProjectStory } from '@/components/projects/project-story';
import { getProject } from '@/content/projects';

const project = getProject('precision-residential-construction');

export const metadata: Metadata = {
  title: 'Precision Residential Construction Website | Stefan McFeeters',
  description:
    'A delivered residential construction website with client project media, service journeys, direct contact routes, and structured quote requests.',
  alternates: { canonical: '/work/precision-residential-construction/' },
};

export default function PrecisionResidentialConstructionPage() {
  if (!project) throw new Error('Precision website project is missing.');
  return <ProjectStory project={project} />;
}
