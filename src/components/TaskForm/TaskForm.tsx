import { useState, type FormEvent } from "react";
import { useTaskContext } from "../../context/useTaskContext";
import "./TaskForm.css";


function TaskForm() {
    const { addTask } = useTaskContext();

    const [title, setTitle] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const trimmedTitle = title.trim();

        if (!trimmedTitle) {
            setError("Please enter a task.");
            return;
        }

        addTask(trimmedTitle);

        setTitle("");
        setError("");
    };

    const handleChange = (value: string) => {
        setTitle(value);

        if (error && value.trim()) {
            setError("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="task-form">
            <div className="task-form__input-wrapper">
                <label
                    htmlFor="task-title"
                    className="sr-only"
                >
                    Task title
                </label>
                <input
                    id="task-title"
                    aria-invalid={Boolean(error)}
                    aria-describedby={
                        error ? "task-title-error" : undefined
                    }
                    type="text"
                    value={title}
                    onChange={(event) =>
                        handleChange(event.target.value)
                    }
                    placeholder="What needs to be done?"
                    className="task-form__input"
                />

                {error && (
                    <p
                        id="task-title-error"
                        className="task-form__error"
                        role="alert"
                    >
                        {error}
                    </p>
                )}
            </div>

            <button type="submit" className="task-form__button">
                Add Task
            </button>
        </form>
    );
}

export default TaskForm;