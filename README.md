# Task Master

A modern, feature-rich task management application built with React, Redux, and Framer Motion. Task Master helps you organize your daily tasks with a beautiful, animated interface and powerful features like priority management, due dates, and keyboard shortcuts.

## 🎯 Live Demo

[Modern Task Manager](https://codewithaditisharma-task-master.netlify.app/)

## Features

- 🎯 **Task Management**

  - Create, edit, and delete tasks
  - Set task priorities (Low, Medium, High)
  - Add due dates
  - Mark tasks as completed
  - Bulk actions for completed tasks

- 🎨 **Modern UI/UX**

  - Smooth animations with Framer Motion
  - Dark/Light theme support
  - Responsive design
  - Accessible components

- 📊 **Task Statistics**
  - Total tasks counter
  - Completion rate
  - Active tasks tracking
  - Priority distribution

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- npm (v9 or higher)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/codewithaditisharma/Modern-Task-Master.git
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Usage Guide

### Creating a Task

1. Click the "Add New Task" button
2. Fill in the task details:
   - Title (required)
   - Priority level
   - Due date (optional)
3. Click "Create Task" to save

### Managing Tasks

```typescript
// Example: Using the Redux store to manage tasks
import { useDispatch } from "react-redux";
import { toggleTodo, deleteTodo } from "./store/todoSlice";

// Toggle task completion
dispatch(toggleTodo(taskId));

// Delete a task
dispatch(deleteTodo(taskId));
```

### Theme Management

The application supports both light and dark themes:

```typescript
// Toggle theme programmatically
import { toggleTheme } from "./store/todoSlice";
dispatch(toggleTheme());
```

## Project Structure

```
├── src/
│   ├── components/        # React components
│   ├── store/            # Redux store and slices
│   ├── hooks/            # Custom React hooks
│   ├── types/            # TypeScript type definitions
│   └── main.tsx          # Application entry point
├── public/               # Static assets
└── package.json          # Project dependencies
```

## Configuration

### Environment Variables

No environment variables are required for basic functionality. However, you can customize the following in `vite.config.ts`:

```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Add custom configuration here
  },
});
```

## Building for Production

1. Create a production build:

```bash
npm run build
```

2. Preview the production build:

```bash
npm run preview
```

## Deployment

The project can be deployed to any static hosting service. Here's how to deploy to Netlify:

1. Create a new site on Netlify
2. Connect your repository
3. Set the build command to `npm run build`
4. Set the publish directory to `dist`

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## Troubleshooting

Common issues and solutions:

| Issue                  | Solution                                         |
| ---------------------- | ------------------------------------------------ |
| Tasks not saving       | Check if localStorage is enabled in your browser |
| Animations not working | Ensure Framer Motion is properly installed       |
| Theme not persisting   | Clear browser cache and reload                   |

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please:

- Open an issue on GitHub
- Join our [Discord community](https://discord.gg/taskmastercommunity)
- Email support at support@taskmaster.com

## Acknowledgments

- Icons provided by [Lucide React](https://lucide.dev)
- UI components styled with [Tailwind CSS](https://tailwindcss.com)
- Animations powered by [Framer Motion](https://www.framer.com/motion)

---

Made with ❤️ by Aditi Sharma
