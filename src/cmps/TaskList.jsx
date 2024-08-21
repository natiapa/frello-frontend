import { TaskPreview } from "./TaskPreview";

export function TaskList({ group }) {
  const { tasks } = group;
  console.log(tasks);

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskPreview groupId={group.id} task={task} />
        </li>
      ))}
    </ul>
  );
}
