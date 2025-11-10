'use client';

import { useState } from 'react';
import { Plus, Grid3x3, List, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ProjectCard } from '@/components/projects/project-card';
import { ProjectDialog } from '@/components/projects/project-dialog';
import { useProjectsStore } from '@/store/projects';
import { useTasksStore } from '@/store/tasks';
import { Project } from '@productivity-app/shared';

type ViewMode = 'grid' | 'list';

export default function ProjectsPage() {
  const { projects, addProject, updateProject, deleteProject } = useProjectsStore();
  const { tasks } = useTasksStore();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | undefined>();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const handleSaveProject = (projectData: Partial<Project>) => {
    if (editingProject) {
      updateProject(editingProject.id, projectData);
    } else {
      addProject({
        user_id: 'current-user-id', // This would come from auth context
        name: projectData.name!,
        description: projectData.description,
        color: projectData.color,
        icon: projectData.icon,
        order: projectData.order || 0,
        is_archived: false,
      });
    }
    setEditingProject(undefined);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteProject(id);
  };

  const handleArchive = (id: string) => {
    updateProject(id, { is_archived: true });
  };

  const handleNewProject = () => {
    setEditingProject(undefined);
    setDialogOpen(true);
  };

  // Filter projects
  const filteredProjects = projects.filter((project) => {
    if (project.is_archived) return false;
    if (searchQuery) {
      return (
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return true;
  });

  // Get task counts for each project
  const getTaskCount = (projectId: string) => {
    return tasks.filter((task) => task.project_id === projectId && task.status !== 'completed')
      .length;
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Projects</h1>
            <p className="text-muted-foreground">
              Organize your work into projects to stay focused
            </p>
          </div>
          <Button onClick={handleNewProject}>
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>

        {/* Search and View Controls */}
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-1 border rounded-md p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
              }`}
            >
              <Grid3x3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Projects Grid/List */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
            <Grid3x3 className="w-10 h-10 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">
            {searchQuery ? 'No projects found' : 'No projects yet'}
          </h3>
          <p className="text-muted-foreground mb-6">
            {searchQuery
              ? 'Try adjusting your search query'
              : 'Create your first project to organize your tasks'}
          </p>
          {!searchQuery && (
            <Button onClick={handleNewProject}>
              <Plus className="w-4 h-4 mr-2" />
              Create First Project
            </Button>
          )}
        </div>
      ) : (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }
        >
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              taskCount={getTaskCount(project.id)}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onArchive={handleArchive}
            />
          ))}
        </div>
      )}

      {/* Statistics */}
      {filteredProjects.length > 0 && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border bg-card">
            <p className="text-sm text-muted-foreground mb-1">Total Projects</p>
            <p className="text-2xl font-bold">{filteredProjects.length}</p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <p className="text-sm text-muted-foreground mb-1">Total Tasks</p>
            <p className="text-2xl font-bold">
              {filteredProjects.reduce((acc, project) => acc + getTaskCount(project.id), 0)}
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <p className="text-sm text-muted-foreground mb-1">Active Projects</p>
            <p className="text-2xl font-bold">
              {filteredProjects.filter((p) => getTaskCount(p.id) > 0).length}
            </p>
          </div>
        </div>
      )}

      {/* Project Dialog */}
      <ProjectDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleSaveProject}
        project={editingProject}
      />
    </div>
  );
}
