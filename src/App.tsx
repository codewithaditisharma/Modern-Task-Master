import React from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { store } from './store/store';
import { TodoList } from './components/TodoList';
import { TodoStats } from './components/TodoStats';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { Sun, Moon } from 'lucide-react';
import { RootState } from './store/store';
import { toggleTheme } from './store/todoSlice';

function AppContent() {
  useKeyboardShortcuts();
  const theme = useSelector((state: RootState) => state.todos.theme);
  const dispatch = useDispatch();

  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Task Master
          </h1>
          <button
            onClick={() => dispatch(toggleTheme())}
            className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow"
          >
            {theme === 'light' ? (
              <Moon className="w-6 h-6 text-gray-600" />
            ) : (
              <Sun className="w-6 h-6 text-yellow-400" />
            )}
          </button>
        </div>
        <TodoStats />
        <TodoList />
      </div>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;