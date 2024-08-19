import { TaskList } from "./TaskList";

export function GroupPreview({ tasks }) {
  return (
    <div className="group-preview">
      <TaskList tasks={tasks} />
    </div>
  );
}
