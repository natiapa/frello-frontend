export function MemberList({ members }) {
  // if (members) console.log(members);
  // if (!members) return <div>Loading...</div>;
  return (
    <>
      {members.map((member) => (
        <li key={member.fullname} style={{ backgroundColor: member.color }}>
          {member.fullname[0].toUpperCase()}
        </li>
      ))}
    </>
  );
}
