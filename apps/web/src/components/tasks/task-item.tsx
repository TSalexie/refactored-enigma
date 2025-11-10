'use client';

import { Task } from '@productivity-app/shared';
import { CheckCircle2, Circle, Trash2, Edit, Calendar, Flag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatRelativeDate, getPriorityColor, getPriorityLabel } from '@productivity-app/shared';

interface TaskItemProps {
  task: Task;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

export function TaskItem({ task, onComplete, onDelete, onEdit }: TaskItemProps) {
  const isCompleted = task.status === 'completed';
  const priorityColor = getPriorityColor(task.priority);
  const priorityLabel = getPriorityLabel(task.priority);

  return (
    <div
      className={cn(
        'flex items-center gap-3 p-4 rounded-lg border bg-card hover:shadow-md transition-all group',
        isCompleted && 'opacity-60'
      )}
    >
      {/* Complete Button */}
      <button
        onClick={() => onComplete(task.id)}
        className="flex-shrink-0"
        disabled={isCompleted}
      >
        {isCompleted ? (
          <CheckCircle2 className="w-5 h-5 text-green-500" />
        ) : (
          <Circle className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
        )}
      </button>

      {/* Task Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3
            className={cn(
              'font-medium text-sm',
              isCompleted && 'line-through text-muted-foreground'
            )}
          >
            {task.title}
          </h3>
          {/* Priority Badge */}
          <span
            className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{
              backgroundColor: `${priorityColor}20`,
              color: priorityColor,
            }}
          >
            {priorityLabel}
          </span>
        </div>

        {task.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{task.description}</p>
        )}

        {/* Meta Info */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          {task.due_date && (
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatRelativeDate(task.due_date)}
            </span>
          )}
          {task.labels.length > 0 && (
            <div className="flex gap-1">
              {task.labels.map((label) => (
                <span key={label} className="px-2 py-0.5 bg-secondary rounded text-xs">
                  {label}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex-shrink-0 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onEdit(task)}
          className="p-2 hover:bg-secondary rounded-md transition-colors"
        >
          <Edit className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="p-2 hover:bg-destructive/10 hover:text-destructive rounded-md transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
