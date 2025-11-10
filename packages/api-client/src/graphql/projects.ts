import { gql } from 'graphql-request';

// Project Queries
export const GET_PROJECTS = gql`
  query GetProjects($userId: uuid!) {
    projects(
      where: { user_id: { _eq: $userId }, is_archived: { _eq: false } }
      order_by: { order: asc }
    ) {
      id
      user_id
      name
      description
      color
      icon
      order
      is_archived
      created_at
      updated_at
    }
  }
`;

export const GET_PROJECT_BY_ID = gql`
  query GetProjectById($id: uuid!) {
    projects_by_pk(id: $id) {
      id
      user_id
      name
      description
      color
      icon
      order
      is_archived
      created_at
      updated_at
    }
  }
`;

// Project Mutations
export const CREATE_PROJECT = gql`
  mutation CreateProject($project: projects_insert_input!) {
    insert_projects_one(object: $project) {
      id
      user_id
      name
      description
      color
      icon
      order
      is_archived
      created_at
      updated_at
    }
  }
`;

export const UPDATE_PROJECT = gql`
  mutation UpdateProject($id: uuid!, $updates: projects_set_input!) {
    update_projects_by_pk(pk_columns: { id: $id }, _set: $updates) {
      id
      user_id
      name
      description
      color
      icon
      order
      is_archived
      created_at
      updated_at
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation DeleteProject($id: uuid!) {
    delete_projects_by_pk(id: $id) {
      id
    }
  }
`;

export const ARCHIVE_PROJECT = gql`
  mutation ArchiveProject($id: uuid!) {
    update_projects_by_pk(pk_columns: { id: $id }, _set: { is_archived: true }) {
      id
      is_archived
      updated_at
    }
  }
`;
