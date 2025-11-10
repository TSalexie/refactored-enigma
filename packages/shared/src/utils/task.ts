import { Task, TaskPriority, TaskStatus } from '../types';

export const getPriorityColor = (priority: TaskPriority): string => {
  const colors: Record<TaskPriority, string> = {
    p1: '#FF4444', // Red - Urgent
    p2: '#FFA500', // Orange - High
    p3: '#4A90E2', // Blue - Medium
    p4: '#999999', // Gray - Low
  };
  return colors[priority];
};

export const getPriorityLabel = (priority: TaskPriority): string => {
  const labels: Record<TaskPriority, string> = {
    p1: 'Urgent',
    p2: 'High',
    p3: 'Medium',
    p4: 'Low',
  };
  return labels[priority];
};

export const getStatusColor = (status: TaskStatus): string => {
  const colors: Record<TaskStatus, string> = {
    todo: '#999999',
    in_progress: '#4A90E2',
    completed: '#4CAF50',
    archived: '#666666',
  };
  return colors[status];
};

export const getStatusLabel = (status: TaskStatus): string => {
  const labels: Record<TaskStatus, string> = {
    todo: 'To Do',
    in_progress: 'In Progress',
    completed: 'Completed',
    archived: 'Archived',
  };
  return labels[status];
};

export const sortTasksByPriority = (tasks: Task[]): Task[] => {
  const priorityOrder: Record<TaskPriority, number> = {
    p1: 0,
    p2: 1,
    p3: 2,
    p4: 3,
  };

  return [...tasks].sort((a, b) => {
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
};

export const sortTasksByDueDate = (tasks: Task[]): Task[] => {
  return [...tasks].sort((a, b) => {
    if (!a.due_date && !b.due_date) return 0;
    if (!a.due_date) return 1;
    if (!b.due_date) return -1;
    return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
  });
};

export const filterTasksByStatus = (tasks: Task[], status: TaskStatus): Task[] => {
  return tasks.filter(task => task.status === status);
};

export const filterTasksByProject = (tasks: Task[], projectId: string): Task[] => {
  return tasks.filter(task => task.project_id === projectId);
};

export const getSubtasks = (tasks: Task[], parentTaskId: string): Task[] => {
  return tasks.filter(task => task.parent_task_id === parentTaskId);
};
