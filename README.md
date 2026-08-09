# LimeTray Task Manager

A responsive Task Manager application built as part of the LimeTray frontend assignment.

The application demonstrates task CRUD operations, filtering, persistent local storage, React Context, custom hooks, performance optimization, dark/light theming, animations, responsive design, and drag-and-drop task reordering.

## ✨ Features

### Core Task Management

- Add new tasks
- Prevent empty tasks from being added
- Mark tasks as completed or pending
- Delete tasks
- Filter tasks by:
  - All
  - Pending
  - Completed

- Persist tasks using browser Local Storage
- Drag and drop tasks to reorder them
- Persist reordered task positions

### React Requirements

- Custom `useLocalStorage` hook
- React Context API for task state management
- `React.memo` for task rendering optimization
- `useCallback` for stable event handlers
- `useMemo` for memoized Context values
- TypeScript for type safety
- Component-based architecture

### UI / CSS

- Light and dark themes
- Theme preference persisted in Local Storage
- Respects the user's system color-scheme preference
- Responsive mobile-first layout
- Task add/remove animations
- Completion animation
- Drag-and-drop visual feedback
- Keyboard focus states
- Reduced-motion support with `prefers-reduced-motion`

---

## 🛠️ Tech Stack

| Technology          | Purpose                                   |
| ------------------- | ----------------------------------------- |
| React 18            | UI development                            |
| TypeScript          | Static typing                             |
| Vite                | Development and build tooling             |
| CSS                 | Styling, responsive design and animations |
| React Context API   | Global task/theme state                   |
| Local Storage       | Client-side persistence                   |
| react-beautiful-dnd | Drag-and-drop functionality               |
| ESLint              | Code quality                              |

---

## 📁 Project Structure

```text
src/
├── components/
│   ├── EmptyState/
│   │   ├── EmptyState.tsx
│   │   └── EmptyState.css
│   │
│   ├── TaskFilters/
│   │   ├── TaskFilters.tsx
│   │   └── TaskFilters.css
│   │
│   ├── TaskForm/
│   │   ├── TaskForm.tsx
│   │   └── TaskForm.css
│   │
│   ├── TaskItem/
│   │   ├── TaskItem.tsx
│   │   └── TaskItem.css
│   │
│   ├── TaskList/
│   │   ├── TaskList.tsx
│   │   └── TaskList.css
│   │
│   └── ThemeToggle/
│       ├── ThemeToggle.tsx
│       └── ThemeToggle.css
│
├── context/
│   ├── TaskContext.ts
│   ├── TaskProvider.tsx
│   ├── useTaskContext.ts
│   ├── ThemeContext.ts
│   ├── ThemeProvider.tsx
│   └── useThemeContext.ts
│
├── hooks/
│   └── useLocalStorage.ts
│
├── types/
│   └── task.ts
│
├── App.tsx
├── App.css
├── index.css
└── main.tsx
```

---

## 🏗️ Architecture

The application uses React Context to avoid prop drilling and keep task-related state centralized.

```text
                         App
                          │
                    ThemeProvider
                          │
                    TaskProvider
                          │
          ┌───────────────┴───────────────┐
          │                               │
     Task Context                    Theme Context
          │                               │
          ▼                               ▼
    Task components                  Theme Toggle
          │
          ▼
  useLocalStorage
          │
          ▼
    Browser LocalStorage
```

### Task Context

`TaskProvider` manages:

- Task state
- Current filter
- Add task
- Toggle task
- Delete task
- Reorder tasks
- Filter changes

Components consume this state through:

```ts
useTaskContext();
```

This keeps components independent from the underlying state-management implementation.

### Theme Context

Theme state is separated from task state.

```text
ThemeContext
     ↓
ThemeProvider
     ↓
useThemeContext()
     ↓
ThemeToggle
```

The selected theme is persisted using Local Storage.

---

## 🔄 Task Reordering

Drag-and-drop is implemented using `react-beautiful-dnd`.

The application uses:

```text
DragDropContext
      ↓
Droppable
      ↓
Draggable
      ↓
TaskItem
```

Only the drag handle (`⋮⋮`) initiates dragging.

The reorder logic also accounts for the currently visible filtered tasks, so users can reorder tasks while viewing:

- All
- Pending
- Completed

The resulting order is persisted to Local Storage.

---

## ⚡ Performance Considerations

The application uses React's optimization APIs where they provide value.

### `React.memo`

`TaskItem` is memoized because individual task components do not need to re-render when unrelated parent state changes.

```tsx
export default memo(TaskItem);
```

### `useCallback`

Task operations such as:

```text
addTask
toggleTask
deleteTask
reorderTasks
```

are memoized with `useCallback`.

This provides stable function references when passed through Context and into memoized components.

### `useMemo`

The Context value is memoized:

```tsx
const contextValue = useMemo(
  () => ({
    tasks,
    filter,
    addTask,
    toggleTask,
    deleteTask,
    reorderTasks,
    setFilter,
  }),
  [...]
);
```

This prevents unnecessary Context value recreation when unrelated state has not changed.

---

## 💾 Local Storage

The application uses a custom hook:

```text
useLocalStorage
```

The hook handles:

1. Reading persisted data during initialization
2. Maintaining React state
3. Synchronizing state changes with Local Storage
4. Handling invalid/unavailable stored data safely

Tasks are stored under:

```text
limetray-tasks
```

Theme preference is stored under:

```text
limetray-theme
```

---

## 🎨 Theming

The application uses CSS custom properties instead of hard-coding colors throughout components.

Example:

```css
:root {
  --color-bg: #f5f7fb;
  --color-surface: #ffffff;
  --color-text: #111827;
}

:root[data-theme='dark'] {
  --color-bg: #0f172a;
  --color-surface: #1e293b;
  --color-text: #f8fafc;
}
```

Components consume semantic variables such as:

```css
background: var(--color-surface);
color: var(--color-text);
border-color: var(--color-border);
```

This makes the theme system easier to maintain and extend.

---

## ♿ Accessibility

Accessibility considerations include:

- Semantic HTML elements
- Accessible button labels
- Form labels
- Validation announcements
- `aria-invalid` and `aria-describedby` for form errors
- Keyboard-accessible controls
- Visible `:focus-visible` states
- Accessible filter state using `aria-pressed`
- Drag-and-drop keyboard support provided through `react-beautiful-dnd`
- `prefers-reduced-motion` support
- Appropriate touch target sizes

---

## 📱 Responsive Design

The UI follows a mobile-first approach and is designed to work across:

- Mobile phones
- Tablets
- Desktop screens

The layout adapts at smaller widths so that:

- The task form stacks vertically
- Theme controls become compact
- Filter controls remain horizontally scrollable
- Long task titles wrap correctly
- Task controls remain usable on touch devices

---

## 🎞️ Animations

Animations are intentionally subtle.

### Task creation

New tasks use a short fade/slide-in animation.

### Task deletion

Deleted tasks briefly fade and slide out before being removed from state.

### Completion

The completion checkbox provides a small visual feedback animation.

### Reduced motion

Animations are disabled when the user has enabled:

```css
prefers-reduced-motion: reduce;
```

---

## 🚀 Getting Started

### Prerequisites

Make sure Node.js and npm are installed.

### Installation

Clone the repository and install dependencies:

```bash
npm install
```

### Start development server

```bash
npm run dev
```

The application will be available at the local Vite development URL shown in the terminal.

---

## 🧪 Quality Checks

Run ESLint:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

The project should pass both linting and the TypeScript/Vite production build before submission.

---

## 📦 Production Build

Create the production build with:

```bash
npm run build
```

The generated files are placed in:

```text
dist/
```

---

## 🧠 Key Engineering Decisions

### Why React Context?

The application has several task-related operations used by different components. Context avoids passing task state and handlers through multiple levels of props.

### Why a custom Local Storage hook?

Persistence is separated from task-specific business logic. This keeps `TaskProvider` focused on task management while `useLocalStorage` handles browser storage synchronization.

### Why CSS variables?

They allow the same components to support both light and dark themes without duplicating component styles.

### Why `React.memo`?

Tasks are independent UI units. Memoizing `TaskItem` helps avoid unnecessary renders when its props have not changed.

### Why separate Context, Provider and Hook files?

The architecture keeps responsibilities clear:

```text
TaskContext.ts
    → Context definition and types

TaskProvider.tsx
    → State and task business logic

useTaskContext.ts
    → Context consumer hook
```

The same pattern is used for theme management.

### Why React 18?

`react-beautiful-dnd` requires React 18 or earlier through its peer dependency range. React 18 was therefore selected to satisfy the assignment's explicit drag-and-drop requirement.

---

## ⚠️ Note About `react-beautiful-dnd`

The assignment explicitly specifies `react-beautiful-dnd`, so the implementation uses it as requested.

`react-beautiful-dnd` has compatibility issues with React 18 development `StrictMode`. Therefore, `StrictMode` is intentionally not enabled in the application's root render.

This avoids draggable registration issues while maintaining the required library and React version compatibility.

---

## 📋 Assignment Requirements

| Requirement                       | Status |
| --------------------------------- | ------ |
| Add tasks                         | ✅     |
| Mark tasks completed              | ✅     |
| Delete tasks                      | ✅     |
| All / Completed / Pending filters | ✅     |
| Local Storage persistence         | ✅     |
| `useLocalStorage` custom hook     | ✅     |
| React Context API                 | ✅     |
| `React.memo`                      | ✅     |
| `useCallback`                     | ✅     |
| `useMemo`                         | ✅     |
| Empty task validation             | ✅     |
| Light / Dark mode                 | ✅     |
| CSS transitions / animations      | ✅     |
| Responsive design                 | ✅     |
| Drag and drop                     | ✅     |
| Drag-and-drop persistence         | ✅     |
| Accessibility considerations      | ✅     |
| TypeScript                        | ✅     |
| ESLint                            | ✅     |
| Production build                  | ✅     |

---

## 👨‍💻 Author

**Piyush Prateek**

Built as part of the LimeTray frontend development assignment.
