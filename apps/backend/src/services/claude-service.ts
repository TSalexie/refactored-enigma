import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY || '',
});

export interface ReverseCalendarQuestion {
  question: string;
  answer: string;
}

export interface ReverseCalendarInput {
  goal: string;
  targetDate: string;
  answers: ReverseCalendarQuestion[];
}

export interface Milestone {
  title: string;
  description: string;
  targetDate: string;
  order: number;
  tasks: Array<{
    title: string;
    description: string;
    priority: 'p1' | 'p2' | 'p3' | 'p4';
    estimatedHours: number;
  }>;
}

export interface ReverseCalendarPlan {
  goal: string;
  targetDate: string;
  milestones: Milestone[];
  weeklyBreakdown: Array<{
    week: number;
    startDate: string;
    endDate: string;
    focus: string;
    tasks: string[];
  }>;
  successMetrics: string[];
  risks: string[];
  recommendations: string[];
}

export class ClaudeService {
  async generateDiscoveryQuestions(goal: string): Promise<string[]> {
    const prompt = `You are an expert productivity coach. A user wants to achieve the following goal:

"${goal}"

Generate 5-7 thoughtful discovery questions to help understand their current situation, constraints, resources, and requirements. These questions should help create a realistic, actionable plan.

Return ONLY a JSON array of question strings, no other text.

Example format:
["What is your current skill level in this area?", "How many hours per week can you dedicate to this goal?"]`;

    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const content = message.content[0];
    if (content.type === 'text') {
      const questions = JSON.parse(content.text);
      return questions;
    }

    throw new Error('Failed to generate questions');
  }

  async generateReverseCalendarPlan(
    input: ReverseCalendarInput
  ): Promise<ReverseCalendarPlan> {
    const questionsAndAnswers = input.answers
      .map((qa) => `Q: ${qa.question}\nA: ${qa.answer}`)
      .join('\n\n');

    const prompt = `You are an expert productivity and project planning coach. Create a detailed reverse calendar plan for the following goal:

**Goal:** ${input.goal}
**Target Date:** ${input.targetDate}

**User Context:**
${questionsAndAnswers}

Create a comprehensive, realistic plan that works backward from the target date. Include:

1. **Milestones**: Major checkpoints with specific deadlines
2. **Weekly Breakdown**: What to focus on each week
3. **Tasks**: Specific actionable tasks with time estimates
4. **Success Metrics**: How to measure progress
5. **Risks**: Potential obstacles and mitigation strategies
6. **Recommendations**: Pro tips for success

Return the plan as a JSON object matching this TypeScript interface:

interface ReverseCalendarPlan {
  goal: string;
  targetDate: string;
  milestones: Array<{
    title: string;
    description: string;
    targetDate: string;
    order: number;
    tasks: Array<{
      title: string;
      description: string;
      priority: 'p1' | 'p2' | 'p3' | 'p4';
      estimatedHours: number;
    }>;
  }>;
  weeklyBreakdown: Array<{
    week: number;
    startDate: string;
    endDate: string;
    focus: string;
    tasks: string[];
  }>;
  successMetrics: string[];
  risks: string[];
  recommendations: string[];
}

Be realistic about time estimates and ensure the plan is achievable given the user's constraints.`;

    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const content = message.content[0];
    if (content.type === 'text') {
      const plan = JSON.parse(content.text);
      return plan;
    }

    throw new Error('Failed to generate plan');
  }
}

export const claudeService = new ClaudeService();
