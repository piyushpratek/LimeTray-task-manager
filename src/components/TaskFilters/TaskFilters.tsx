import { useMemo } from "react";
import type { TaskFilter } from "../../types/task";
import { useTaskContext } from "../../context/useTaskContext";
import "./TaskFilters.css";


function TaskFilters() {
    const {
        tasks,
        filter,
        setFilter,
    } = useTaskContext();

    const counts = useMemo(() => {
        const completed = tasks.filter(
            (task) => task.completed
        ).length;

        return {
            all: tasks.length,
            completed,
            pending: tasks.length - completed,
        };
    }, [tasks]);

    const filters: {
        value: TaskFilter;
        label: string;
        count: number;
    }[] = [
            {
                value: "all",
                label: "All",
                count: counts.all,
            },
            {
                value: "pending",
                label: "Pending",
                count: counts.pending,
            },
            {
                value: "completed",
                label: "Completed",
                count: counts.completed,
            },
        ];

    return (
        <div
            className="task-filters"
            role="group"
            aria-label="Task filters"
        >
            {filters.map((item) => (
                <button
                    key={item.value}
                    type="button"
                    onClick={() => setFilter(item.value)}
                    className={`task-filter ${filter === item.value
                        ? "task-filter--active"
                        : ""
                        }`}
                    aria-pressed={filter === item.value}
                >
                    <span>{item.label}</span>

                    <span
                        className="task-filter__count"
                        aria-label={`${item.count} tasks`}
                    >
                        {item.count}
                    </span>
                </button>
            ))}
        </div>
    );
}

export default TaskFilters;