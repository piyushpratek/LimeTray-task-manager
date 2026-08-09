import { useContext } from "react";

import { TaskContext } from "./TaskContext";

export function useTaskContext() {
    const context = useContext(TaskContext);

    if (!context) {
        throw new Error(
            "useTaskContext must be used inside a TaskProvider"
        );
    }

    return context;
}