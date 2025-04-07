import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo, TodoState } from '../types/todo';

const loadState = (): TodoState => {
  try {
    const serializedState = localStorage.getItem('todoState');
    if (serializedState === null) {
      return {
        todos: [],
        filter: { status: 'all', priority: 'all', search: '' },
        labels: ['Personal', 'Work', 'Shopping', 'Important'],
        theme: 'light'
      };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return {
      todos: [],
      filter: { status: 'all', priority: 'all', search: '' },
      labels: ['Personal', 'Work', 'Shopping', 'Important'],
      theme: 'light'
    };
  }
};

const saveState = (state: TodoState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('todoState', serializedState);
  } catch (err) {
    console.error('Could not save state', err);
  }
};

const initialState: TodoState = loadState();

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Omit<Todo, 'id' | 'createdAt'>>) => {
      const newTodo: Todo = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      state.todos.unshift(newTodo);
      saveState(state);
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        saveState(state);
      }
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      const index = state.todos.findIndex(todo => todo.id === action.payload.id);
      if (index !== -1) {
        state.todos[index] = action.payload;
        saveState(state);
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
      saveState(state);
    },
    editTodo: (state, action: PayloadAction<{ id: string; text: string }>) => {
      const todo = state.todos.find(todo => todo.id === action.payload.id);
      if (todo) {
        todo.text = action.payload.text;
        saveState(state);
      }
    },
    reorderTodos: (state, action: PayloadAction<{ startIndex: number; endIndex: number }>) => {
      const [removed] = state.todos.splice(action.payload.startIndex, 1);
      state.todos.splice(action.payload.endIndex, 0, removed);
      saveState(state);
    },
    setFilter: (state, action: PayloadAction<Partial<TodoState['filter']>>) => {
      state.filter = { ...state.filter, ...action.payload };
    },
    addLabel: (state, action: PayloadAction<string>) => {
      if (!state.labels.includes(action.payload)) {
        state.labels.push(action.payload);
        saveState(state);
      }
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      saveState(state);
    },
    bulkDeleteCompleted: (state) => {
      state.todos = state.todos.filter(todo => !todo.completed);
      saveState(state);
    },
    bulkUpdatePriority: (state, action: PayloadAction<{ ids: string[]; priority: Todo['priority'] }>) => {
      state.todos = state.todos.map(todo => 
        action.payload.ids.includes(todo.id) 
          ? { ...todo, priority: action.payload.priority }
          : todo
      );
      saveState(state);
    }
  }
});

export const {
  addTodo,
  toggleTodo,
  updateTodo,
  deleteTodo,
  editTodo,
  reorderTodos,
  setFilter,
  addLabel,
  toggleTheme,
  bulkDeleteCompleted,
  bulkUpdatePriority
} = todoSlice.actions;

export default todoSlice.reducer;