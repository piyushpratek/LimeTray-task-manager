import { createContext } from "react";
import type { Task, TaskFilter } from "../types/task";

export interface TaskContextValue {
    tasks: Task[];
    filter: TaskFilter;

    addTask: (title: string) => void;
    toggleTask: (id: string) => void;
    deleteTask: (id: string) => void;

    reorderTasks: (
        sourceId: string,
        destinationId: string,
        visibleTaskIds: string[]
    ) => void;

    setFilter: (filter: TaskFilter) => void;
}

export const TaskContext =
    createContext<TaskContextValue | undefined>(undefined);