import { useEffect, useState } from "react";
import { GroupPreview } from "./GroupPreview";
import { boardService } from "../services/board";

export function GroupList({ groups }) {
  const [isAddingGroup, setIsAddingGroup] = useState(false);
  // useEffect(() => {
  //   boardService.updateBoard();
  // }, [groups]);

  function handleChange(ev) {
    const { value } = ev.target;
    console.log(value);
  }

  function addList() {}

  if (!groups) return <div>Loading...</div>;
  return (
    <div className="group-list">
      {groups.map((group) => (
        <GroupPreview group={group} key={group.id} />
      ))}
      <div className="add-group-preview">
        {isAddingGroup && (
          <div>
            <input onChange={(ev) => handleChange(ev)} />
            <button style={{ color: "black", display: "flex" }}>
              Add list
            </button>
          </div>
        )}
        {!isAddingGroup && (
          <button
            style={{ color: "black" }}
            className="add-group"
            onClick={() => setIsAddingGroup(!isAddingGroup)}
          >
            Add Group +
          </button>
        )}
        {/* {isAddingGroup && <GroupPreview group={{}} />} */}
      </div>
    </div>
  );
}
