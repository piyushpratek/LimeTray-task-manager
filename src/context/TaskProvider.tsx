import {
    useCallback,
    useMemo,
    useState,
    type ReactNode,
} from "react";

import type {
    Task,
    TaskFilter,
} from "../types/task";

import useLocalStorage from "../hooks/useLocalStorage";

import { TaskContext } from "./TaskContext";

interface TaskProviderProps {
    children: ReactNode;
}

export function TaskProvider({
    children,
}: TaskProviderProps) {
    const [tasks, setTasks] = useLocalStorage<Task[]>(
        "limetray-tasks",
        []
    );

    const [filter, setFilter] =
        useState<TaskFilter>("all");

    // -----------------------------
    // Add Task
    // -----------------------------

    const addTask = useCallback(
        (title: string) => {
            const trimmedTitle = title.trim();

            if (!trimmedTitle) {
                return;
            }

            const newTask: Task = {
                id: crypto.randomUUID(),
                title: trimmedTitle,
                completed: false,
                createdAt: Date.now(),
            };

            setTasks((currentTasks) => [
                newTask,
                ...currentTasks,
            ]);
        },
        [setTasks]
    );

    // -----------------------------
    // Toggle Task
    // -----------------------------

    const toggleTask = useCallback(
        (id: string) => {
            setTasks((currentTasks) =>
                currentTasks.map((task) =>
                    task.id === id
                        ? {
                            ...task,
                            completed: !task.completed,
                        }
                        : task
                )
            );
        },
        [setTasks]
    );

    // -----------------------------
    // Delete Task
    // -----------------------------

    const deleteTask = useCallback(
        (id: string) => {
            setTasks((currentTasks) =>
                currentTasks.filter(
                    (task) => task.id !== id
                )
            );
        },
        [setTasks]
    );

    // -----------------------------
    // Reorder Tasks
    // -----------------------------

    const reorderTasks = useCallback(
        (
            sourceId: string,
            destinationId: string,
            visibleTaskIds: string[]
        ) => {
            setTasks((currentTasks) => {
                // Get only the tasks currently visible
                // under the active filter.
                const visibleTasks =
                    currentTasks.filter((task) =>
                        visibleTaskIds.includes(task.id)
                    );

                const sourceIndex =
                    visibleTasks.findIndex(
                        (task) => task.id === sourceId
                    );

                const destinationIndex =
                    visibleTasks.findIndex(
                        (task) => task.id === destinationId
                    );

                // Invalid drag operation.
                if (
                    sourceIndex === -1 ||
                    destinationIndex === -1 ||
                    sourceIndex === destinationIndex
                ) {
                    return currentTasks;
                }

                // Create a copy so we don't mutate React state.
                const reorderedVisibleTasks =
                    Array.from(visibleTasks);

                const [movedTask] =
                    reorderedVisibleTasks.splice(
                        sourceIndex,
                        1
                    );

                reorderedVisibleTasks.splice(
                    destinationIndex,
                    0,
                    movedTask
                );

                /*
                 * Put the reordered visible tasks back
                 * into the positions occupied by visible
                 * tasks in the original array.
                 */
                const visibleTaskMap = new Map(
                    reorderedVisibleTasks.map((task) => [
                        task.id,
                        task,
                    ])
                );

                let visibleTaskIndex = 0;

                return currentTasks.map((task) => {
                    if (!visibleTaskMap.has(task.id)) {
                        return task;
                    }

                    return reorderedVisibleTasks[
                        visibleTaskIndex++
                    ];
                });
            });
        },
        [setTasks]
    );

    // -----------------------------
    // Memoized Context Value
    // -----------------------------

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
        [
            tasks,
            filter,
            addTask,
            toggleTask,
            deleteTask,
            reorderTasks,
            setFilter,
        ]
    );

    return (
        <TaskContext.Provider value={contextValue}>
            {children}
        </TaskContext.Provider>
    );
}