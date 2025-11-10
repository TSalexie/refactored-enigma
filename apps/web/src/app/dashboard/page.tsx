'use client';

import { CheckSquare, FileText, Target, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your productivity overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasks Due Today</CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">3 completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">2 due this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pages Created</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+3 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Goals in Progress</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">75% on track</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Tasks</CardTitle>
            <CardDescription>Your most recently updated tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-md hover:bg-secondary/50 transition-colors">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Review project proposal</p>
                  <p className="text-xs text-muted-foreground">Due today • High priority</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-md hover:bg-secondary/50 transition-colors">
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Update documentation</p>
                  <p className="text-xs text-muted-foreground">Due tomorrow • Medium priority</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-md hover:bg-secondary/50 transition-colors">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Team meeting preparation</p>
                  <p className="text-xs text-muted-foreground">Due Friday • Low priority</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Start something new</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-4 border rounded-lg hover:bg-secondary/50 transition-colors text-left">
                <CheckSquare className="h-6 w-6 mb-2 text-primary" />
                <p className="font-medium text-sm">New Task</p>
                <p className="text-xs text-muted-foreground">Create a quick task</p>
              </button>
              <button className="p-4 border rounded-lg hover:bg-secondary/50 transition-colors text-left">
                <FileText className="h-6 w-6 mb-2 text-primary" />
                <p className="font-medium text-sm">New Page</p>
                <p className="text-xs text-muted-foreground">Start writing</p>
              </button>
              <button className="p-4 border rounded-lg hover:bg-secondary/50 transition-colors text-left">
                <TrendingUp className="h-6 w-6 mb-2 text-primary" />
                <p className="font-medium text-sm">New Project</p>
                <p className="text-xs text-muted-foreground">Organize your work</p>
              </button>
              <button className="p-4 border rounded-lg hover:bg-secondary/50 transition-colors text-left">
                <Target className="h-6 w-6 mb-2 text-primary" />
                <p className="font-medium text-sm">Set Goal</p>
                <p className="text-xs text-muted-foreground">Plan with AI</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
