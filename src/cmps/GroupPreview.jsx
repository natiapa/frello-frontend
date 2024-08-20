import { TaskList } from "./TaskList";

export function GroupPreview({ group }) {
  console.log(group)
  return (
    <div className="group-preview">
      <TaskList tasks={group.tasks} group={group}/>
    </div>
  );
}
