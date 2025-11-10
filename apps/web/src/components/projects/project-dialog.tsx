'use client';

import { useState, useEffect } from 'react';
import { Project } from '@productivity-app/shared';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const PROJECT_COLORS = [
  '#FF6B6B', // Red
  '#4ECDC4', // Teal
  '#45B7D1', // Blue
  '#FFA07A', // Salmon
  '#98D8C8', // Mint
  '#F7DC6F', // Yellow
  '#BB8FCE', // Purple
  '#85C1E2', // Sky Blue
  '#F8B500', // Orange
  '#95E1D3', // Aqua
];

const PROJECT_ICONS = ['📁', '🎯', '💼', '🚀', '⭐', '🎨', '📊', '💡', '🔥', '⚡', '🌟', '🎪'];

interface ProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (project: Partial<Project>) => void;
  project?: Project;
}

export function ProjectDialog({ open, onOpenChange, onSave, project }: ProjectDialogProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState(PROJECT_COLORS[0]);
  const [icon, setIcon] = useState(PROJECT_ICONS[0]);

  useEffect(() => {
    if (project) {
      setName(project.name);
      setDescription(project.description || '');
      setColor(project.color || PROJECT_COLORS[0]);
      setIcon(project.icon || PROJECT_ICONS[0]);
    } else {
      setName('');
      setDescription('');
      setColor(PROJECT_COLORS[0]);
      setIcon(PROJECT_ICONS[0]);
    }
  }, [project, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const projectData: Partial<Project> = {
      name,
      description: description || undefined,
      color,
      icon,
      order: 0,
      is_archived: false,
    };

    if (project) {
      projectData.id = project.id;
    }

    onSave(projectData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{project ? 'Edit Project' : 'Create New Project'}</DialogTitle>
            <DialogDescription>
              {project
                ? 'Update the details of your project'
                : 'Create a new project to organize your tasks'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Icon & Color Selector */}
            <div className="flex gap-6">
              <div className="flex-1 space-y-2">
                <Label>Icon</Label>
                <div className="grid grid-cols-6 gap-2">
                  {PROJECT_ICONS.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setIcon(emoji)}
                      className={`p-2 text-2xl rounded-md border-2 transition-all hover:scale-110 ${
                        icon === emoji ? 'border-primary bg-primary/10' : 'border-transparent'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-1 space-y-2">
                <Label>Color</Label>
                <div className="grid grid-cols-5 gap-2">
                  {PROJECT_COLORS.map((projectColor) => (
                    <button
                      key={projectColor}
                      type="button"
                      onClick={() => setColor(projectColor)}
                      className={`w-10 h-10 rounded-md transition-all hover:scale-110 ${
                        color === projectColor ? 'ring-2 ring-offset-2 ring-primary' : ''
                      }`}
                      style={{ backgroundColor: projectColor }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="p-4 rounded-lg border bg-secondary/20">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                  style={{ backgroundColor: `${color}20` }}
                >
                  {icon}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Preview</p>
                  <p className="font-semibold">{name || 'Project Name'}</p>
                </div>
              </div>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Project Name *</Label>
              <Input
                id="name"
                placeholder="e.g., Website Redesign"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                maxLength={200}
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="What is this project about?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!name.trim()}>
              {project ? 'Update Project' : 'Create Project'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
