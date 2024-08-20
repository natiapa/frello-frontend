import { TaskPreview } from "./TaskPreview";

export function TaskList({ tasks, group }) {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskPreview task={task} group={group} />
        </li>
      ))}
    </ul>
  );
}
