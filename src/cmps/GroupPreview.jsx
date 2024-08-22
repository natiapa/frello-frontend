import { TaskList } from "./TaskList";

export function GroupPreview({ group }) {
  // console.log(group)
  return (
    <div className="group-preview">
      <h3>{group?.title}</h3>
      <TaskList group={group} />
    </div>
  );
}
