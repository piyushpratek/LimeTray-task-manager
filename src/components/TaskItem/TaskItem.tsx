import {
    memo,
    useEffect,
    useRef,
    useState,
} from "react";

import type {
    DraggableProvidedDragHandleProps,
} from "react-beautiful-dnd";

import type { Task } from "../../types/task";

import "./TaskItem.css";

interface TaskItemProps {
    task: Task;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    dragHandleProps?: DraggableProvidedDragHandleProps | null;
}

function TaskItem({
    task,
    onToggle,
    onDelete,
    dragHandleProps,
}: TaskItemProps) {
    const [isRemoving, setIsRemoving] =
        useState(false);

    const deleteTimeoutRef =
        useRef<ReturnType<typeof setTimeout> | null>(
            null
        );

    useEffect(() => {
        return () => {
            if (deleteTimeoutRef.current) {
                clearTimeout(deleteTimeoutRef.current);
            }
        };
    }, []);

    const handleDelete = () => {
        if (isRemoving) {
            return;
        }

        setIsRemoving(true);

        deleteTimeoutRef.current = setTimeout(() => {
            onDelete(task.id);
        }, 220);
    };

    return (
        <article
            className={`task-item ${isRemoving
                ? "task-item--removing"
                : ""
                }`}
        >
            <span
                className="task-item__drag-handle"
                {...dragHandleProps}
            >
                ⋮⋮
            </span>

            <button
                type="button"
                className={`task-item__checkbox ${task.completed
                    ? "task-item__checkbox--completed"
                    : ""
                    }`}
                onClick={() => onToggle(task.id)}
                disabled={isRemoving}
                aria-label={
                    task.completed
                        ? `Mark "${task.title}" as pending`
                        : `Mark "${task.title}" as completed`
                }
            >
                {task.completed && "✓"}
            </button>

            <span
                className={`task-item__title ${task.completed
                    ? "task-item__title--completed"
                    : ""
                    }`}
            >
                {task.title}
            </span>

            <button
                type="button"
                className="task-item__delete"
                onClick={handleDelete}
                disabled={isRemoving}
                aria-label={`Delete "${task.title}"`}
            >
                {isRemoving ? "Deleting..." : "Delete"}
            </button>
        </article>
    );
}

export default memo(TaskItem);