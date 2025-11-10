import { GraphQLClient } from 'graphql-request';

export interface GraphQLClientConfig {
  endpoint: string;
  headers?: Record<string, string>;
}

export class ProductivityGraphQLClient {
  private client: GraphQLClient;

  constructor(config: GraphQLClientConfig) {
    this.client = new GraphQLClient(config.endpoint, {
      headers: config.headers || {},
    });
  }

  setAuthToken(token: string) {
    this.client.setHeader('Authorization', `Bearer ${token}`);
  }

  removeAuthToken() {
    this.client.setHeader('Authorization', '');
  }

  async query<T>(query: string, variables?: Record<string, any>): Promise<T> {
    return this.client.request<T>(query, variables);
  }

  async mutate<T>(mutation: string, variables?: Record<string, any>): Promise<T> {
    return this.client.request<T>(mutation, variables);
  }

  getClient() {
    return this.client;
  }
}

// Singleton instance
let clientInstance: ProductivityGraphQLClient | null = null;

export const initializeGraphQLClient = (config: GraphQLClientConfig): ProductivityGraphQLClient => {
  clientInstance = new ProductivityGraphQLClient(config);
  return clientInstance;
};

export const getGraphQLClient = (): ProductivityGraphQLClient => {
  if (!clientInstance) {
    throw new Error('GraphQL client not initialized. Call initializeGraphQLClient first.');
  }
  return clientInstance;
};
