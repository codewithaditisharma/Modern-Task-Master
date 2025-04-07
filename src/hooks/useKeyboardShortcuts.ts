import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toggleTheme, bulkDeleteCompleted } from '../store/todoSlice';

export const useKeyboardShortcuts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case 'd':
            e.preventDefault();
            dispatch(toggleTheme());
            break;
          case 'backspace':
            if (e.shiftKey) {
              e.preventDefault();
              dispatch(bulkDeleteCompleted());
            }
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [dispatch]);
};