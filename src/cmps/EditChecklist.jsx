import { useState } from "react";
import { boardService } from "../services/board";

export function EditChecklist({
  board,
  group,
  task,
  onUpdated,
  setIsPopoverOpen,
  handlePopoverClick,
  setNewCheckLists,
}) {
  const [title, setTitle] = useState("checklist");

  const [localChecklists, setLocalChecklists] = useState(
    Array.isArray(task.checklists) ? task.checklists : []
  );

  function handleChange(ev) {
    setTitle(ev.target.value);
  }

  async function onAddChecklist() {
    localChecklists.push({ ...boardService.getEmptyChecklist(), title });
    const updatedChecklists = localChecklists;

    setNewCheckLists(updatedChecklists);

    onUpdated("checklists", updatedChecklists);
    setIsPopoverOpen(false);

    await boardService.updateActivities(
      board,
      "",
      "addChecklist",
      group,
      task,
      localChecklists[localChecklists.length - 1]
    );
  }

  function handleKeyDown(ev) {
    if (ev.key === "Enter") {
      ev.preventDefault();
      onAddChecklist();
    }
  }

  return (
    <div className="edit-checklist" onClick={handlePopoverClick}>
      <h2>Checklist</h2>
      <label>
        <span className="title-pop">title</span>
        <input
          type="text"
          value={title}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      </label>
      <div className="edit-checklist-btn" onClick={onAddChecklist}>
        Add
      </div>
    </div>
  );
}
