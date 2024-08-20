import { TaskPreview } from "./TaskPreview";

export function TaskList({ tasks }) {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskPreview task={task} key={task.id} />
      ))}
    </div>
  );
}
