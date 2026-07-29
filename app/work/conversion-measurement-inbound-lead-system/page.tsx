import type { Metadata } from 'next';
import { ProjectStory } from '@/components/projects/project-story';
import { getProject } from '@/content/projects';

const project = getProject('conversion-measurement-inbound-lead-system');

export const metadata: Metadata = {
  title: 'Conversion Measurement and Inbound Lead System | Stefan McFeeters',
  description:
    'A live lead path connecting the SM Systems website, GTM, GA4, HubSpot, Airtable, Make, and deterministic Playwright checks.',
  alternates: {
    canonical: '/work/conversion-measurement-inbound-lead-system/',
  },
};

export default function ConversionMeasurementPage() {
  if (!project) throw new Error('Conversion and lead project is missing.');
  return <ProjectStory project={project} />;
}
