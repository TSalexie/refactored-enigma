import { gql } from 'graphql-request';

// Task Queries
export const GET_TASKS = gql`
  query GetTasks($userId: uuid!) {
    tasks(
      where: { user_id: { _eq: $userId }, status: { _neq: "archived" } }
      order_by: { order: asc }
    ) {
      id
      user_id
      project_id
      parent_task_id
      title
      description
      status
      priority
      due_date
      completed_at
      order
      labels
      created_at
      updated_at
    }
  }
`;

export const GET_TASK_BY_ID = gql`
  query GetTaskById($id: uuid!) {
    tasks_by_pk(id: $id) {
      id
      user_id
      project_id
      parent_task_id
      title
      description
      status
      priority
      due_date
      completed_at
      order
      labels
      created_at
      updated_at
    }
  }
`;

export const GET_TASKS_BY_PROJECT = gql`
  query GetTasksByProject($projectId: uuid!, $userId: uuid!) {
    tasks(
      where: {
        project_id: { _eq: $projectId }
        user_id: { _eq: $userId }
        status: { _neq: "archived" }
      }
      order_by: { order: asc }
    ) {
      id
      user_id
      project_id
      parent_task_id
      title
      description
      status
      priority
      due_date
      completed_at
      order
      labels
      created_at
      updated_at
    }
  }
`;

// Task Mutations
export const CREATE_TASK = gql`
  mutation CreateTask($task: tasks_insert_input!) {
    insert_tasks_one(object: $task) {
      id
      user_id
      project_id
      parent_task_id
      title
      description
      status
      priority
      due_date
      order
      labels
      created_at
      updated_at
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation UpdateTask($id: uuid!, $updates: tasks_set_input!) {
    update_tasks_by_pk(pk_columns: { id: $id }, _set: $updates) {
      id
      user_id
      project_id
      parent_task_id
      title
      description
      status
      priority
      due_date
      completed_at
      order
      labels
      created_at
      updated_at
    }
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($id: uuid!) {
    delete_tasks_by_pk(id: $id) {
      id
    }
  }
`;

export const COMPLETE_TASK = gql`
  mutation CompleteTask($id: uuid!, $completedAt: timestamptz!) {
    update_tasks_by_pk(
      pk_columns: { id: $id }
      _set: { status: "completed", completed_at: $completedAt }
    ) {
      id
      status
      completed_at
      updated_at
    }
  }
`;

// Subscription for real-time updates
export const SUBSCRIBE_TO_TASKS = gql`
  subscription SubscribeToTasks($userId: uuid!) {
    tasks(
      where: { user_id: { _eq: $userId }, status: { _neq: "archived" } }
      order_by: { order: asc }
    ) {
      id
      user_id
      project_id
      parent_task_id
      title
      description
      status
      priority
      due_date
      completed_at
      order
      labels
      created_at
      updated_at
    }
  }
`;
