import type { Metadata } from 'next';
import { ProjectStory } from '@/components/projects/project-story';
import { getProject } from '@/content/projects';

const project = getProject('automation-debugger');

export const metadata: Metadata = {
  title: 'Automation Debugger | Stefan McFeeters',
  description:
    'An open-source Python toolkit for diagnosing failed Zapier, Make, n8n, and webhook automations before a retry creates downstream problems.',
  alternates: { canonical: '/work/automation-debugger/' },
};

export default function AutomationDebuggerPage() {
  if (!project) throw new Error('Automation Debugger project is missing.');
  return <ProjectStory project={project} />;
}
