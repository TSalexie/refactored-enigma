'use client';

import { useState, useEffect } from 'react';
import { Search, FileText, CheckSquare, FolderOpen, Command } from 'lucide-react';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useTasksStore } from '@/store/tasks';
import { useProjectsStore } from '@/store/projects';
import { usePagesStore } from '@/store/pages';
import { useRouter } from 'next/navigation';

interface SearchResult {
  type: 'task' | 'project' | 'page';
  id: string;
  title: string;
  subtitle?: string;
  icon?: string;
}

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);

  const { tasks } = useTasksStore();
  const { projects } = useProjectsStore();
  const { pages } = usePagesStore();
  const router = useRouter();

  // Listen for Cmd+K / Ctrl+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  // Search logic
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const lowercaseQuery = query.toLowerCase();
    const searchResults: SearchResult[] = [];

    // Search tasks
    tasks
      .filter((task) =>
        task.title.toLowerCase().includes(lowercaseQuery) ||
        task.description?.toLowerCase().includes(lowercaseQuery)
      )
      .slice(0, 5)
      .forEach((task) => {
        searchResults.push({
          type: 'task',
          id: task.id,
          title: task.title,
          subtitle: task.description,
        });
      });

    // Search projects
    projects
      .filter((project) =>
        project.name.toLowerCase().includes(lowercaseQuery) ||
        project.description?.toLowerCase().includes(lowercaseQuery)
      )
      .slice(0, 5)
      .forEach((project) => {
        searchResults.push({
          type: 'project',
          id: project.id,
          title: project.name,
          subtitle: project.description,
          icon: project.icon,
        });
      });

    // Search pages
    pages
      .filter((page) => page.title.toLowerCase().includes(lowercaseQuery))
      .slice(0, 5)
      .forEach((page) => {
        searchResults.push({
          type: 'page',
          id: page.id,
          title: page.title,
          icon: page.icon,
        });
      });

    setResults(searchResults);
  }, [query, tasks, projects, pages]);

  const handleSelect = (result: SearchResult) => {
    setOpen(false);
    setQuery('');

    switch (result.type) {
      case 'task':
        router.push('/dashboard/tasks');
        break;
      case 'project':
        router.push(`/dashboard/projects/${result.id}`);
        break;
      case 'page':
        router.push(`/dashboard/pages/${result.id}`);
        break;
    }
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'task':
        return <CheckSquare className="w-4 h-4" />;
      case 'project':
        return <FolderOpen className="w-4 h-4" />;
      case 'page':
        return <FileText className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-muted-foreground hover:bg-secondary rounded-md transition-colors"
      >
        <Search className="w-4 h-4" />
        <span>Search...</span>
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <Command className="w-3 h-3" />K
        </kbd>
      </button>

      {/* Search Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 top-[20%]">
          <div className="flex items-center border-b px-3">
            <Search className="w-4 h-4 mr-2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tasks, projects, pages..."
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          {results.length > 0 ? (
            <div className="max-h-[300px] overflow-y-auto p-2">
              {results.map((result, index) => (
                <button
                  key={`${result.type}-${result.id}-${index}`}
                  onClick={() => handleSelect(result)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-secondary transition-colors text-left"
                >
                  {result.icon ? (
                    <span className="text-lg">{result.icon}</span>
                  ) : (
                    getResultIcon(result.type)
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{result.title}</p>
                    {result.subtitle && (
                      <p className="text-xs text-muted-foreground truncate">
                        {result.subtitle}
                      </p>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground capitalize">
                    {result.type}
                  </span>
                </button>
              ))}
            </div>
          ) : query ? (
            <div className="p-8 text-center text-muted-foreground">
              <p>No results found for "{query}"</p>
            </div>
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              <p className="mb-2">Search for tasks, projects, or pages</p>
              <p className="text-xs">Press <kbd className="px-1 py-0.5 bg-muted rounded">Cmd+K</kbd> anytime to search</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
