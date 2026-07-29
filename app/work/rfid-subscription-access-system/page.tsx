import type { Metadata } from 'next';
import { ProjectStory } from '@/components/projects/project-story';
import { getProject } from '@/content/projects';

const project = getProject('rfid-subscription-access-system');

export const metadata: Metadata = {
  title: 'RFID Subscription Access System | Stefan McFeeters',
  description:
    'An in-progress client system connecting subscription records, RFID tag management, operator controls, and an edge access path.',
  alternates: { canonical: '/work/rfid-subscription-access-system/' },
};

export default function RfidSubscriptionAccessSystemPage() {
  if (!project) throw new Error('RFID subscription access project is missing.');
  return <ProjectStory project={project} />;
}
