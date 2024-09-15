export function MemberList({ members, gridColumnWidth }) {
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
          {member.imgUrl && (
            <img src={member.imgUrl} style={{ borderRadius: "50%" }} />
          )}
          {!member.imgUrl && (
            <span style={{ backgroundColor: member.color }}>
              {member.fullname[0]}
            </span>
          )}
        </li>
      ))}
    </div>
  );
}
