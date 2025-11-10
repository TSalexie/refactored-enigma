import { Router, Response } from 'express';
import { claudeService } from '../services/claude-service';
import { AuthRequest } from '../middleware/auth';
import { z } from 'zod';

const router = Router();

// Validation schemas
const GenerateQuestionsSchema = z.object({
  goal: z.string().min(10).max(1000),
});

const GeneratePlanSchema = z.object({
  goal: z.string().min(10).max(1000),
  targetDate: z.string().datetime(),
  answers: z.array(
    z.object({
      question: z.string(),
      answer: z.string(),
    })
  ),
});

/**
 * POST /api/reverse-calendar/questions
 * Generate discovery questions based on the user's goal
 */
router.post('/questions', async (req: AuthRequest, res: Response) => {
  try {
    const { goal } = GenerateQuestionsSchema.parse(req.body);

    const questions = await claudeService.generateDiscoveryQuestions(goal);

    res.json({
      success: true,
      questions,
    });
  } catch (error: any) {
    console.error('Error generating questions:', error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Invalid input',
        details: error.errors,
      });
    }

    res.status(500).json({
      success: false,
      error: 'Failed to generate questions',
    });
  }
});

/**
 * POST /api/reverse-calendar/generate
 * Generate a complete reverse calendar plan
 */
router.post('/generate', async (req: AuthRequest, res: Response) => {
  try {
    const input = GeneratePlanSchema.parse(req.body);

    const plan = await claudeService.generateReverseCalendarPlan(input);

    res.json({
      success: true,
      plan,
      userId: req.user?.id,
    });
  } catch (error: any) {
    console.error('Error generating plan:', error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Invalid input',
        details: error.errors,
      });
    }

    res.status(500).json({
      success: false,
      error: 'Failed to generate plan',
    });
  }
});

export { router as reverseCalendarRouter };
