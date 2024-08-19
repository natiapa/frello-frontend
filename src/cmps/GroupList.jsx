import { GroupPreview } from "./GroupPreview";

export function GroupList({ groups }) {
  return (
    <div className="group-list">
      {groups.map((group) => (
        <GroupPreview tasks={group.tasks} />
      ))}
    </div>
  );
}
