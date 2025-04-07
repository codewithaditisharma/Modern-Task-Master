export type Priority = 'low' | 'medium' | 'high';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  dueDate?: string;
  priority: Priority;
  labels: string[];
}

export interface TodoState {
  todos: Todo[];
  filter: {
    status: 'all' | 'active' | 'completed';
    priority: Priority | 'all';
    search: string;
  };
  labels: string[];
  theme: 'light' | 'dark';
}