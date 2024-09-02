import { CgProfile } from "react-icons/cg";
import { getRandomColor } from "../services/util.service";

export function BoardHeader({ members, bgColor, allowDrop, drag }) {
  return (
    <section className="board-header">
      <div className="board-header-title">Frello</div>
      <div className="board-header-actions"></div>
      <ul
        className="members"
        // onDrop={(ev) => drop(ev)}
        onDragOver={(ev) => allowDrop(ev)}
        style={{
          gridTemplateColumns: `repeat(${members.length}, 25px)`,
        }}
      >
        {members.map((member) => (
          <li
            key={member.id}
            id={member.id}
            className="member"
            style={{ backgroundColor: member.color || "#FFA500" }}
            draggable={true}
            onDragStart={(ev) => drag(ev)}
          >
            {member.fullname[0]}
          </li>
        ))}
      </ul>

      {/* <div className="board-header-icon">🔍</div>
      <div className="board-header-icon">➕</div> */}
    </section>
  );
}
