import "./EmptyState.css";

interface EmptyStateProps {
    message: string;
}

function EmptyState({
    message,
}: EmptyStateProps) {
    return (
        <div className="empty-state">
            <div className="empty-state__icon">
                ✓
            </div>

            <h2>No tasks here</h2>

            <p>{message}</p>
        </div>
    );
}

export default EmptyState;