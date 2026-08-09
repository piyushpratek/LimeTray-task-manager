import TaskForm from "./components/TaskForm/TaskForm";
import TaskFilters from "./components/TaskFilters/TaskFilters";
import TaskList from "./components/TaskList/TaskList";
import "./App.css";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle";

function App() {
  return (
    <main className="app">
      <section className="task-manager">
        <header className="task-manager__header">
          <div>
            <p className="task-manager__eyebrow">
              LIME TRAY
            </p>

            <h1>Task Manager</h1>

            <p className="task-manager__description">
              Organize your work and get things done.
            </p>
          </div>
          <ThemeToggle />
        </header>

        <TaskForm />

        <TaskFilters />

        <TaskList />
      </section>
    </main>
  );
}

export default App;