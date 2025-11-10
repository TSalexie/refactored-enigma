import Link from 'next/link';
import { CheckSquare, FileText, Sparkles, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center flex-1 p-8 text-center">
        <div className="max-w-4xl">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
            <Sparkles className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Your World-Class
            <br />
            <span className="text-primary">Productivity Hub</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Combine the power of Todoist's task management with Notion's rich content editing.
            Plus AI-powered goal planning with our unique Reverse Calendar.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/auth"
              className="inline-flex items-center bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition text-lg"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center border border-border px-8 py-4 rounded-lg font-semibold hover:bg-secondary transition text-lg"
            >
              View Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="border-t bg-secondary/20">
        <div className="max-w-6xl mx-auto px-8 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Everything You Need to Stay Productive</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <CheckSquare className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Task Management</h3>
              <p className="text-muted-foreground">
                Organize your work with projects, priorities, due dates, and smart filters. Just like Todoist.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <FileText className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Rich Content Pages</h3>
              <p className="text-muted-foreground">
                Create beautiful documents with nested pages, databases, and multiple views. Notion-style.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Reverse Calendar</h3>
              <p className="text-muted-foreground">
                Set a goal and deadline. Our AI creates a personalized plan working backwards to success.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="border-t py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to boost your productivity?</h2>
        <p className="text-muted-foreground mb-8">Join thousands of users achieving their goals.</p>
        <Link
          href="/auth"
          className="inline-flex items-center bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition text-lg"
        >
          Start Free Today
          <ArrowRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </main>
  );
}
