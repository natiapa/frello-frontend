import { useState } from "react";
import { MdClose } from "react-icons/md";

export function MemberPicker({
  board,
  task,
  onUpdated,
  setTaskMembers,
  taskMembers,
}) {
  const membersBoard = board.members;
  console.log(membersBoard);
  const availableMembers = membersBoard.filter(
    (boardMember) =>
      !taskMembers.some((taskMember) => taskMember._id === boardMember._id)
  );
  const [selectedMembers, setSelectedMembers] = useState(availableMembers);

  function handleRemoveMember(ev, member) {
    ev.stopPropagation();
    const updateTaskMembers = taskMembers.filter((m) => m._id !== member._id);
    onUpdated("members", updateTaskMembers);
    setTaskMembers(updateTaskMembers);

    const updateBoardMembers = [...selectedMembers, member];
    setSelectedMembers(updateBoardMembers);
  }

  function handleAddMember(ev, member) {
    ev.stopPropagation();
    console.log(member);
    const updateBoardMembers = selectedMembers.filter(
      (m) => m._id !== member._id
    );
    setSelectedMembers(updateBoardMembers);

    const updateTaskMembers = [...taskMembers, member];
    onUpdated("members", updateTaskMembers);
    setTaskMembers(updateTaskMembers);
  }

  console.log(taskMembers);
  return (
    <div className="members-container">
      <h5 className="members-title">Members</h5>

      {/* Card Members Section */}
      <div className="card-members">
        {taskMembers.length > 0 && (
          <span className="card-members-title">Card Members</span>
        )}
        <ul className="members-list">
          {taskMembers.length > 0
            ? taskMembers.map((member, idx) => (
                <li className="member-item" key={member._id}>
                  {member.imgUrl && (
                    <img
                      src={member.imgUrl}
                      style={{
                        borderRadius: "50%",
                        width: "24px",
                        marginInlineEnd: "10px",
                      }}
                    />
                  )}
                  {!member.imgUrl && (
                    <span style={{ backgroundColor: member.color }}>
                      {member.fullname[0]}
                    </span>
                  )}
                  <span className="member-name">{member.fullname}</span>
                  <button
                    className="remove-member-btn"
                    onClick={(event) => handleRemoveMember(event, member)}
                  >
                    <MdClose size={16} />
                  </button>
                </li>
              ))
            : ""}
        </ul>
      </div>

      {/* Board Members Section */}
      <div className="board-members">
        {selectedMembers.length > 0 && (
          <span className="board-members-title">Board Members</span>
        )}
        <ul className="members-list">
          {selectedMembers.map((member, idx) => (
            <li
              className="member-item"
              key={member._id}
              onClick={(event) => handleAddMember(event, member)}
            >
              {member.imgUrl && (
                <img
                  src={member.imgUrl}
                  style={{
                    borderRadius: "50%",
                    width: "24px",
                    marginInlineEnd: "10px",
                  }}
                />
              )}
              {!member.imgUrl && (
                <span style={{ backgroundColor: member.color }}>
                  {member.fullname[0]}
                </span>
              )}
              <span className="member-name">{member.fullname}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
