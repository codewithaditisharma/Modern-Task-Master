import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { toggleTodo, deleteTodo, editTodo } from '../store/todoSlice';
import { Check, Trash2, Edit2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreateTask } from './CreateTask';

export function TodoList() {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch();
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [editText, setEditText] = React.useState('');

  const handleEdit = (id: string, text: string) => {
    setEditingId(id);
    setEditText(text);
  };

  const handleSaveEdit = (id: string) => {
    if (editText.trim()) {
      dispatch(editTodo({ id, text: editText }));
    }
    setEditingId(null);
    setEditText('');
  };

  return (
    <div className="space-y-4">
      <CreateTask />
      
      <AnimatePresence mode="popLayout">
        {todos.map((todo) => (
          <motion.div
            key={todo.id}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="flex items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <button
              onClick={() => dispatch(toggleTodo(todo.id))}
              className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center
                ${
                  todo.completed
                    ? 'bg-green-500 border-green-500'
                    : 'border-gray-300 dark:border-gray-600'
                }`}
            >
              {todo.completed && <Check className="w-4 h-4 text-white" />}
            </button>

            {editingId === todo.id ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onBlur={() => handleSaveEdit(todo.id)}
                onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit(todo.id)}
                className="flex-grow bg-gray-50 dark:bg-gray-700 px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
            ) : (
              <div className="flex-grow">
                <span
                  className={`block text-gray-800 dark:text-gray-200 ${
                    todo.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''
                  }`}
                >
                  {todo.title}
                </span>
                {todo.dueDate && (
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Due: {new Date(todo.dueDate).toLocaleDateString()}
                  </span>
                )}
                {todo.priority && (
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ml-2 
                    ${todo.priority === 'high' ? 'bg-red-100 text-red-800' :
                      todo.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'}`}>
                    {todo.priority}
                  </span>
                )}
              </div>
            )}

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(todo.id, todo.title)}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => dispatch(deleteTodo(todo.id))}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      
      {todos.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No tasks yet. Add one to get started!
        </div>
      )}
    </div>
  );
}