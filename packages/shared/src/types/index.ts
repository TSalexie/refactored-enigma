import { z } from 'zod';

// User types
export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().optional(),
  avatar_url: z.string().url().optional(),
  subscription_tier: z.enum(['free', 'pro', 'enterprise']),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export type User = z.infer<typeof UserSchema>;

// Task types (Todoist-like)
export const TaskPrioritySchema = z.enum(['p1', 'p2', 'p3', 'p4']);
export type TaskPriority = z.infer<typeof TaskPrioritySchema>;

export const TaskStatusSchema = z.enum(['todo', 'in_progress', 'completed', 'archived']);
export type TaskStatus = z.infer<typeof TaskStatusSchema>;

export const TaskSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  project_id: z.string().uuid().optional(),
  parent_task_id: z.string().uuid().optional(),
  title: z.string().min(1).max(500),
  description: z.string().optional(),
  status: TaskStatusSchema,
  priority: TaskPrioritySchema,
  due_date: z.string().datetime().optional(),
  completed_at: z.string().datetime().optional(),
  order: z.number().int(),
  labels: z.array(z.string()).default([]),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export type Task = z.infer<typeof TaskSchema>;

// Project types
export const ProjectSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  name: z.string().min(1).max(200),
  description: z.string().optional(),
  color: z.string().regex(/^#[0-9A-F]{6}$/i).optional(),
  icon: z.string().optional(),
  order: z.number().int(),
  is_archived: z.boolean().default(false),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export type Project = z.infer<typeof ProjectSchema>;

// Page types (Notion-like)
export const BlockTypeSchema = z.enum([
  'paragraph',
  'heading1',
  'heading2',
  'heading3',
  'bullet_list',
  'numbered_list',
  'todo_list',
  'toggle',
  'quote',
  'code',
  'divider',
  'table',
  'kanban',
  'database',
]);

export type BlockType = z.infer<typeof BlockTypeSchema>;

export const BlockSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    id: z.string().uuid(),
    page_id: z.string().uuid(),
    parent_block_id: z.string().uuid().optional(),
    type: BlockTypeSchema,
    content: z.any(), // JSON content varies by block type
    properties: z.record(z.any()).optional(),
    order: z.number().int(),
    children: z.array(BlockSchema).optional(),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
  })
);

export type Block = z.infer<typeof BlockSchema>;

export const PageSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  parent_page_id: z.string().uuid().optional(),
  title: z.string().min(1).max(500),
  icon: z.string().optional(),
  cover_url: z.string().url().optional(),
  is_published: z.boolean().default(false),
  order: z.number().int(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export type Page = z.infer<typeof PageSchema>;

// Database types (Notion-like database views)
export const DatabaseViewTypeSchema = z.enum(['table', 'board', 'list', 'calendar', 'gallery']);
export type DatabaseViewType = z.infer<typeof DatabaseViewTypeSchema>;

export const DatabasePropertyTypeSchema = z.enum([
  'text',
  'number',
  'select',
  'multi_select',
  'date',
  'person',
  'files',
  'checkbox',
  'url',
  'email',
  'phone',
  'formula',
  'relation',
  'rollup',
]);

export type DatabasePropertyType = z.infer<typeof DatabasePropertyTypeSchema>;

export const DatabasePropertySchema = z.object({
  id: z.string().uuid(),
  database_id: z.string().uuid(),
  name: z.string().min(1).max(200),
  type: DatabasePropertyTypeSchema,
  options: z.record(z.any()).optional(), // Configuration for select, multi-select, etc.
  order: z.number().int(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export type DatabaseProperty = z.infer<typeof DatabasePropertySchema>;

export const DatabaseSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  page_id: z.string().uuid(), // Database is a special type of page
  name: z.string().min(1).max(200),
  description: z.string().optional(),
  icon: z.string().optional(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export type Database = z.infer<typeof DatabaseSchema>;

// Reverse Calendar types
export const GoalSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  title: z.string().min(1).max(500),
  description: z.string().optional(),
  target_date: z.string().datetime(),
  status: z.enum(['planning', 'in_progress', 'completed', 'cancelled']),
  ai_plan: z.any().optional(), // AI-generated plan structure
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export type Goal = z.infer<typeof GoalSchema>;

export const MilestoneSchema = z.object({
  id: z.string().uuid(),
  goal_id: z.string().uuid(),
  title: z.string().min(1).max(500),
  description: z.string().optional(),
  target_date: z.string().datetime(),
  order: z.number().int(),
  is_completed: z.boolean().default(false),
  completed_at: z.string().datetime().optional(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export type Milestone = z.infer<typeof MilestoneSchema>;

// Subscription types
export const SubscriptionTierSchema = z.enum(['free', 'pro', 'enterprise']);
export type SubscriptionTier = z.infer<typeof SubscriptionTierSchema>;

export const SubscriptionSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  tier: SubscriptionTierSchema,
  status: z.enum(['active', 'cancelled', 'expired', 'trialing']),
  current_period_start: z.string().datetime(),
  current_period_end: z.string().datetime(),
  cancel_at_period_end: z.boolean().default(false),
  revenue_cat_customer_id: z.string(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export type Subscription = z.infer<typeof SubscriptionSchema>;
