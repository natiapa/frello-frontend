export function MemberList({ members, gridColumnWidth }) {
  // if (members) console.log(members);
  // if (!members) return <div>Loading...</div>;
  return (
    <div
      className="list-container"
      style={{
        gridTemplateColumns: `repeat(${members.length}, ${gridColumnWidth})`,
      }}
    >
      {members.map((member, idx) => (
        <li
          className="member"
          key={member.fullname}
          style={{ backgroundColor: member.color, gridColumn: `${idx + 1}` }}
        >
          {member.fullname[0].toUpperCase()}
        </li>
      ))}
    </div>
  );
}
