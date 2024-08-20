import { GroupPreview } from "./GroupPreview";

export function GroupList({ groups }) {
  if (!groups) return <div>Loading...</div>
  return (
    <div className="group-list">
      {groups.map((group) => (
        <GroupPreview group={group} key={group.id} />
      ))}
    </div>
  );
}
