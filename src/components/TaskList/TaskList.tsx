import { useMemo } from "react";
import {
    DragDropContext,
    Droppable,
    Draggable,
    type DropResult,
} from "react-beautiful-dnd";
import EmptyState from "../EmptyState/EmptyState";
import TaskItem from "../TaskItem/TaskItem";

import { useTaskContext } from "../../context/useTaskContext";
import "./TaskList.css";


function TaskList() {
    const {
        tasks,
        filter,
        toggleTask,
        deleteTask,
        reorderTasks,
    } = useTaskContext();

    const filteredTasks = useMemo(() => {
        switch (filter) {
            case "completed":
                return tasks.filter(
                    (task) => task.completed
                );

            case "pending":
                return tasks.filter(
                    (task) => !task.completed
                );

            default:
                return tasks;
        }
    }, [tasks, filter]);

    const visibleTaskIds = useMemo(
        () => filteredTasks.map((task) => task.id),
        [filteredTasks]
    );

    const handleDragEnd = (result: DropResult) => {

        const { destination, source } = result;

        if (!destination) {
            return;
        }

        if (
            destination.index === source.index
        ) {
            return;
        }

        const sourceTask = filteredTasks[source.index];
        const destinationTask =
            filteredTasks[destination.index];

        if (!sourceTask || !destinationTask) {
            return;
        }

        reorderTasks(
            sourceTask.id,
            destinationTask.id,
            visibleTaskIds
        );
    };

    if (filteredTasks.length === 0) {
        const message =
            tasks.length === 0
                ? "Add your first task to get started."
                : filter === "completed"
                    ? "You don't have any completed tasks yet."
                    : "You don't have any pending tasks.";

        return <EmptyState message={message} />;
    }

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="task-list">
                {(provided, snapshot) => (
                    <div
                        className={`task-list ${snapshot.isDraggingOver
                            ? "task-list--dragging-over"
                            : ""
                            }`}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {filteredTasks.map((task, index) => (
                            <Draggable
                                key={task.id}
                                draggableId={task.id}
                                index={index}
                            >
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        className={
                                            snapshot.isDragging
                                                ? "task-list__item task-list__item--dragging"
                                                : "task-list__item"
                                        }
                                        style={{
                                            ...provided.draggableProps.style,
                                        }}
                                    >
                                        <TaskItem
                                            task={task}
                                            onToggle={toggleTask}
                                            onDelete={deleteTask}
                                            dragHandleProps={provided.dragHandleProps}
                                        />
                                    </div>
                                )}
                            </Draggable>
                        ))}

                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}

export default TaskList;