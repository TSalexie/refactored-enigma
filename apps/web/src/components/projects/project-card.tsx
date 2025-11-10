'use client';

import { Project } from '@productivity-app/shared';
import { MoreVertical, Edit, Trash2, Archive, CheckSquare } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ProjectCardProps {
  project: Project;
  taskCount?: number;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
  onArchive: (id: string) => void;
}

export function ProjectCard({ project, taskCount = 0, onEdit, onDelete, onArchive }: ProjectCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = () => {
    onDelete(project.id);
    setShowDeleteDialog(false);
  };

  return (
    <>
      <div className="group relative">
        <Link href={`/dashboard/projects/${project.id}`}>
          <div className="p-6 rounded-xl border bg-card hover:shadow-lg transition-all cursor-pointer">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl"
                style={{ backgroundColor: `${project.color}20` }}
              >
                {project.icon}
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowMenu(!showMenu);
                }}
                className="opacity-0 group-hover:opacity-100 p-2 hover:bg-secondary rounded-md transition-all"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>

            {/* Project Info */}
            <h3 className="font-semibold text-lg mb-2 line-clamp-1">{project.name}</h3>
            {project.description && (
              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                {project.description}
              </p>
            )}

            {/* Stats */}
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1 text-muted-foreground">
                <CheckSquare className="w-4 h-4" />
                <span>{taskCount} tasks</span>
              </div>
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: project.color }}
              />
            </div>
          </div>
        </Link>

        {/* Action Menu */}
        {showMenu && (
          <div className="absolute top-16 right-6 w-48 bg-card border rounded-lg shadow-lg p-1 z-10">
            <button
              onClick={() => {
                onEdit(project);
                setShowMenu(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-secondary rounded-md transition-colors"
            >
              <Edit className="w-4 h-4" />
              Edit Project
            </button>
            <button
              onClick={() => {
                onArchive(project.id);
                setShowMenu(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-secondary rounded-md transition-colors"
            >
              <Archive className="w-4 h-4" />
              Archive
            </button>
            <button
              onClick={() => {
                setShowDeleteDialog(true);
                setShowMenu(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-destructive/10 text-destructive rounded-md transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Project</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{project.name}"? This action cannot be undone and
              all associated tasks will be unlinked from this project.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete Project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
