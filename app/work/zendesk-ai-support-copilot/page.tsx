import type { Metadata } from 'next';
import { ProjectStory } from '@/components/projects/project-story';
import { getProject } from '@/content/projects';

const project = getProject('zendesk-ai-support-copilot');

export const metadata: Metadata = {
  title: 'Zendesk AI Support Copilot with Jira on AWS | Stefan McFeeters',
  description:
    'A human-reviewed AI support system built with Zendesk, Jira, FastAPI, PostgreSQL, pgvector, Amazon Bedrock, and AWS.',
  alternates: { canonical: '/work/zendesk-ai-support-copilot/' },
};

export default function ZendeskAiSupportCopilotPage() {
  if (!project) throw new Error('Zendesk AI Support Copilot project is missing.');
  return <ProjectStory project={project} />;
}
