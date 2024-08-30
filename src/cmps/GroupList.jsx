import { useEffect, useState } from "react";
import { GroupPreview } from "./GroupPreview";
import { boardService } from "../services/board";
import { useSelector } from "react-redux";
import { updateBoard } from "../store/actions/board.actions";
import { AddingForm } from "./AddingForm";

export function GroupList({ groups }) {
  const [isNewGroup, setIsNewGroup] = useState(false);
  const [newGroup, setNewGroup] = useState(boardService.getEmptyGroup());
  const currBoard = useSelector((state) => state.boardModule.board);

  useEffect(() => {
    console.log("render!");
  }, [groups?.length]);

  function onAddGroup() {
    setIsNewGroup(true);
    setNewGroup(boardService.getEmptyGroup());
  }

  if (!groups) return <div>Loading...</div>;
  return (
    <div
      className="group-list"
      style={{ gridTemplateColumns: `repeat(${groups.length + 1}, 284px)` }}
    >
      {groups.map((group) => (
        <GroupPreview group={group} key={group.id} />
      ))}
      {isNewGroup && (
        <AddingForm
          setIsNew={setIsNewGroup}
          setNew={setNewGroup}
          currBoard={currBoard}
          updateBoard={updateBoard}
          updated={newGroup}
          groupId={null}
          tasks={null}
        />
      )}
      <button
        className="add-group-btn"
        onClick={onAddGroup}
        hidden={isNewGroup}
        style={{ gridColumn: `${groups.length + 1}` }}
      >
        <span className="header-btn">+ Add another list</span>
      </button>
    </div>
  );
}
