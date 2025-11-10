'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Sparkles, Calendar, Target, CheckCircle2 } from 'lucide-react';

type WizardStep = 'goal' | 'date' | 'questions' | 'answers' | 'plan';

interface Question {
  question: string;
  answer: string;
}

export function ReverseCalendarWizard() {
  const [step, setStep] = useState<WizardStep>('goal');
  const [goal, setGoal] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [plan, setPlan] = useState<any>(null);

  // Step 1: Goal Input
  const handleGoalNext = async () => {
    if (!goal.trim()) {
      setError('Please enter your goal');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Call backend API to generate questions
      const response = await fetch('/api/reverse-calendar/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ goal }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate questions');
      }

      const data = await response.json();
      setQuestions(data.questions);
      setAnswers(data.questions.map((q: string) => ({ question: q, answer: '' })));
      setStep('date');
    } catch (err) {
      setError('Failed to generate questions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Target Date
  const handleDateNext = () => {
    if (!targetDate) {
      setError('Please select a target date');
      return;
    }
    setError('');
    setStep('answers');
  };

  // Step 3: Answer Questions
  const handleAnswersNext = async () => {
    const unanswered = answers.some((a) => !a.answer.trim());
    if (unanswered) {
      setError('Please answer all questions');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Call backend API to generate plan
      const response = await fetch('/api/reverse-calendar/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          goal,
          targetDate: new Date(targetDate).toISOString(),
          answers,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate plan');
      }

      const data = await response.json();
      setPlan(data.plan);
      setStep('plan');
    } catch (err) {
      setError('Failed to generate plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index].answer = value;
    setAnswers(newAnswers);
  };

  const handleReset = () => {
    setStep('goal');
    setGoal('');
    setTargetDate('');
    setQuestions([]);
    setAnswers([]);
    setPlan(null);
    setError('');
  };

  // Progress indicator
  const steps = ['goal', 'date', 'answers', 'plan'];
  const currentStepIndex = steps.indexOf(step);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2 text-sm font-medium">
          <span>Step {currentStepIndex + 1} of {steps.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-secondary rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-destructive/10 text-destructive text-sm p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      {/* Step 1: Goal Input */}
      {step === 'goal' && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-6 h-6 text-primary" />
              <CardTitle>What's Your Goal?</CardTitle>
            </div>
            <CardDescription>
              Describe what you want to achieve. Be specific and clear.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="goal">Your Goal</Label>
                <Textarea
                  id="goal"
                  placeholder="E.g., Launch my SaaS product, Learn web development, Write a book..."
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  rows={4}
                  className="mt-2"
                />
              </div>
              <Button onClick={handleGoalNext} disabled={loading} className="w-full">
                {loading ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                    Generating Questions...
                  </>
                ) : (
                  <>
                    Continue
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Target Date */}
      {step === 'date' && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-6 h-6 text-primary" />
              <CardTitle>When Do You Want to Achieve This?</CardTitle>
            </div>
            <CardDescription>
              Choose your target completion date. We'll work backwards from here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="targetDate">Target Date</Label>
                <Input
                  id="targetDate"
                  type="date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="mt-2"
                />
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep('goal')} className="flex-1">
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button onClick={handleDateNext} className="flex-1">
                  Continue
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Answer Questions */}
      {step === 'answers' && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-6 h-6 text-primary" />
              <CardTitle>Help Us Understand Your Situation</CardTitle>
            </div>
            <CardDescription>
              Answer these questions so we can create a realistic plan for you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {answers.map((qa, index) => (
                <div key={index} className="space-y-2">
                  <Label htmlFor={`question-${index}`} className="text-base">
                    {index + 1}. {qa.question}
                  </Label>
                  <Textarea
                    id={`question-${index}`}
                    placeholder="Your answer..."
                    value={qa.answer}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    rows={3}
                  />
                </div>
              ))}
              <div className="flex gap-3 pt-4">
                <Button variant="outline" onClick={() => setStep('date')} className="flex-1">
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button onClick={handleAnswersNext} disabled={loading} className="flex-1">
                  {loading ? (
                    <>
                      <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                      Generating Plan...
                    </>
                  ) : (
                    <>
                      Generate Plan
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Display Plan */}
      {step === 'plan' && plan && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-6 h-6 text-green-500" />
                <CardTitle>Your AI-Generated Plan</CardTitle>
              </div>
              <CardDescription>
                Here's your personalized roadmap to achieve: {goal}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-primary/5 p-4 rounded-lg mb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Target Date</p>
                    <p className="font-semibold text-lg">
                      {new Date(targetDate).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Time Frame</p>
                    <p className="font-semibold text-lg">
                      {Math.ceil(
                        (new Date(targetDate).getTime() - new Date().getTime()) /
                          (1000 * 60 * 60 * 24)
                      )}{' '}
                      days
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Milestones */}
          <Card>
            <CardHeader>
              <CardTitle>Milestones</CardTitle>
              <CardDescription>Key checkpoints on your journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {plan.milestones?.map((milestone: any, index: number) => (
                  <div key={index} className="border-l-4 border-primary pl-4 py-2">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{milestone.title}</h3>
                      <span className="text-sm text-muted-foreground">
                        {new Date(milestone.targetDate).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{milestone.description}</p>
                    {milestone.tasks && milestone.tasks.length > 0 && (
                      <div className="space-y-2">
                        {milestone.tasks.map((task: any, taskIndex: number) => (
                          <div key={taskIndex} className="flex items-start gap-2 text-sm">
                            <span className="text-primary">•</span>
                            <div>
                              <span className="font-medium">{task.title}</span>
                              <span className="text-muted-foreground"> ({task.estimatedHours}h)</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Success Metrics */}
          {plan.successMetrics && plan.successMetrics.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Success Metrics</CardTitle>
                <CardDescription>How to measure your progress</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {plan.successMetrics.map((metric: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                      <span className="text-sm">{metric}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleReset} className="flex-1">
              Create Another Plan
            </Button>
            <Button className="flex-1">Save Plan</Button>
          </div>
        </div>
      )}
    </div>
  );
}
