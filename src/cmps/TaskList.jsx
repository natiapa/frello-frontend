import { TaskPreview } from "./TaskPreview";

export function TaskList({ tasks }) {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskPreview task={task} />
          <button>X</button>
        </li>
      ))}
    </ul>
  );
}
