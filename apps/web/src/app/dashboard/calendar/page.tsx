'use client';

import { ReverseCalendarWizard } from '@/components/calendar/reverse-calendar-wizard';
import { Sparkles, Target, TrendingUp, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function CalendarPage() {
  return (
    <div className="p-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <Sparkles className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold mb-3">Reverse Calendar</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Set your goal, pick your deadline, and let AI create a personalized roadmap working
          backwards from your target date.
        </p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <Target className="w-8 h-8 text-primary mb-2" />
            <CardTitle className="text-lg">Goal-Driven</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Start with your end goal and we'll figure out the path to get there.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <TrendingUp className="w-8 h-8 text-primary mb-2" />
            <CardTitle className="text-lg">AI-Powered</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Claude AI analyzes your situation and creates a realistic, personalized plan.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Calendar className="w-8 h-8 text-primary mb-2" />
            <CardTitle className="text-lg">Milestone-Based</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Break down your goal into manageable milestones with specific deadlines.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Wizard */}
      <ReverseCalendarWizard />
    </div>
  );
}
