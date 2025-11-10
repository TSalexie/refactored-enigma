'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Plus, LayoutList, LayoutGrid, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TaskItem } from '@/components/tasks/task-item';
import { TaskDialog } from '@/components/tasks/task-dialog';
import { ProjectDialog } from '@/components/projects/project-dialog';
import { useProjectsStore } from '@/store/projects';
import { useTasksStore } from '@/store/tasks';
import { Task, Project } from '@productivity-app/shared';
import Link from 'next/link';

type ViewMode = 'list' | 'kanban';

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;

  const { projects, updateProject } = useProjectsStore();
  const { tasks, addTask, updateTask, deleteTask, completeTask } = useTasksStore();

  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [projectDialogOpen, setProjectDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [viewMode, setViewMode] = useState<ViewMode>('list');

  const project = projects.find((p) => p.id === projectId);
  const projectTasks = tasks.filter((t) => t.project_id === projectId);

  if (!project) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground mb-4">Project not found</p>
        <Link href="/dashboard/projects">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Button>
        </Link>
      </div>
    );
  }

  const handleSaveTask = (taskData: Partial<Task>) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
    } else {
      addTask({
        user_id: 'current-user-id',
        project_id: projectId,
        title: taskData.title!,
        description: taskData.description,
        status: taskData.status || 'todo',
        priority: taskData.priority || 'p3',
        due_date: taskData.due_date,
        completed_at: undefined,
        order: taskData.order || 0,
        labels: taskData.labels || [],
        parent_task_id: taskData.parent_task_id,
      });
    }
    setEditingTask(undefined);
  };

  const handleSaveProject = (projectData: Partial<Project>) => {
    updateProject(projectId, projectData);
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setTaskDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      deleteTask(id);
    }
  };

  const handleNewTask = () => {
    setEditingTask(undefined);
    setTaskDialogOpen(true);
  };

  // Group tasks by status for kanban view
  const todoTasks = projectTasks.filter((t) => t.status === 'todo');
  const inProgressTasks = projectTasks.filter((t) => t.status === 'in_progress');
  const completedTasks = projectTasks.filter((t) => t.status === 'completed');

  const stats = {
    total: projectTasks.length,
    completed: completedTasks.length,
    inProgress: inProgressTasks.length,
    todo: todoTasks.length,
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <Link href="/dashboard/projects" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Projects
        </Link>

        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl"
              style={{ backgroundColor: `${project.color}20` }}
            >
              {project.icon}
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-1">{project.name}</h1>
              {project.description && (
                <p className="text-muted-foreground">{project.description}</p>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setProjectDialogOpen(true)}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Project
            </Button>
            <Button onClick={handleNewTask}>
              <Plus className="w-4 h-4 mr-2" />
              New Task
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          <div className="p-4 rounded-lg border bg-card">
            <p className="text-sm text-muted-foreground mb-1">Total Tasks</p>
            <p className="text-2xl font-bold">{stats.total}</p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <p className="text-sm text-muted-foreground mb-1">To Do</p>
            <p className="text-2xl font-bold">{stats.todo}</p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <p className="text-sm text-muted-foreground mb-1">In Progress</p>
            <p className="text-2xl font-bold">{stats.inProgress}</p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <p className="text-sm text-muted-foreground mb-1">Completed</p>
            <p className="text-2xl font-bold">{stats.completed}</p>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex gap-1 border rounded-md p-1 w-fit mt-6">
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-2 px-3 py-2 rounded transition-colors ${
              viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
            }`}
          >
            <LayoutList className="w-4 h-4" />
            List
          </button>
          <button
            onClick={() => setViewMode('kanban')}
            className={`flex items-center gap-2 px-3 py-2 rounded transition-colors ${
              viewMode === 'kanban' ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            Kanban
          </button>
        </div>
      </div>

      {/* Content */}
      {projectTasks.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground mb-4">No tasks in this project yet</p>
          <Button onClick={handleNewTask}>
            <Plus className="w-4 h-4 mr-2" />
            Create First Task
          </Button>
        </div>
      ) : viewMode === 'list' ? (
        // List View
        <div className="space-y-8">
          {todoTasks.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                To Do ({todoTasks.length})
              </h2>
              <div className="space-y-3">
                {todoTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onComplete={completeTask}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                  />
                ))}
              </div>
            </div>
          )}

          {inProgressTasks.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                In Progress ({inProgressTasks.length})
              </h2>
              <div className="space-y-3">
                {inProgressTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onComplete={completeTask}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                  />
                ))}
              </div>
            </div>
          )}

          {completedTasks.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Completed ({completedTasks.length})
              </h2>
              <div className="space-y-3">
                {completedTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onComplete={completeTask}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        // Kanban View
        <div className="grid grid-cols-3 gap-6">
          {/* To Do Column */}
          <div className="bg-secondary/20 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                To Do
              </h3>
              <span className="text-sm text-muted-foreground">{todoTasks.length}</span>
            </div>
            <div className="space-y-3">
              {todoTasks.map((task) => (
                <div key={task.id} className="bg-card rounded-lg">
                  <TaskItem
                    task={task}
                    onComplete={completeTask}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* In Progress Column */}
          <div className="bg-blue-500/10 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                In Progress
              </h3>
              <span className="text-sm text-muted-foreground">{inProgressTasks.length}</span>
            </div>
            <div className="space-y-3">
              {inProgressTasks.map((task) => (
                <div key={task.id} className="bg-card rounded-lg">
                  <TaskItem
                    task={task}
                    onComplete={completeTask}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Completed Column */}
          <div className="bg-green-500/10 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Completed
              </h3>
              <span className="text-sm text-muted-foreground">{completedTasks.length}</span>
            </div>
            <div className="space-y-3">
              {completedTasks.map((task) => (
                <div key={task.id} className="bg-card rounded-lg">
                  <TaskItem
                    task={task}
                    onComplete={completeTask}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Dialogs */}
      <TaskDialog
        open={taskDialogOpen}
        onOpenChange={setTaskDialogOpen}
        onSave={handleSaveTask}
        task={editingTask}
        projectId={projectId}
      />

      <ProjectDialog
        open={projectDialogOpen}
        onOpenChange={setProjectDialogOpen}
        onSave={handleSaveProject}
        project={project}
      />
    </div>
  );
}
