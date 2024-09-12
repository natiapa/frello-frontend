import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { boardService } from "../services/board";
import { updateBoard } from "../store/actions/board.actions";
import { useParams } from "react-router";

export function EditChecklist({
  groupId,
  taskId,
  task,
  onUpdated,
  setIsPopoverOpen,
  handlePopoverClick,
  setNewCheckLists,
}) {
  const board = useSelector((state) => state.boardModule.board);

  const [title, setTitle] = useState("checklist");
  const checklists =
    board.groups
      .find((group) => group.id === groupId)
      .tasks.find((task) => task.id === taskId).checklists || [];

  useEffect(() => {
    console.log("checklists:", checklists);
    setNewCheckLists(checklists);
  }, [checklists?.length]);

  function handleChange(ev) {
    setTitle(ev.target.value);
  }

  async function onAddChecklist() {
    checklists.push({ ...boardService.getEmptyChecklist(), title });
    setNewCheckLists(checklists);

    console.log(checklists[checklists.length - 1]);
    const group = board?.groups?.find((group) => group.id === groupId);

    onUpdated("checklists", checklists);

    await boardService.updateActivities(
      board,
      "",
      "addChecklist",
      group,
      task,
      checklists[checklists.length - 1]
    );

    setIsPopoverOpen(false);
  }

  return (
    <div className="edit-checklist" onClick={handlePopoverClick}>
      <h2>Checklist</h2>
      <label>
        <span className="title-pop">title</span>
        <input type="text" value={title} onChange={handleChange} />
      </label>
      <div className="edit-checklist-btn" onClick={onAddChecklist}>
        Add
      </div>
    </div>
  );
}
