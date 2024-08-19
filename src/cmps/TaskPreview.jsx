export function TaskPreview({ task }) {
  return (
    <div className="task-preview" key={task.id}>
      {task.title}
    </div>
  );
}
