import { IoMdClose } from "react-icons/io";
import { boardService } from "../services/board";
import { useSelector } from "react-redux";
import { on } from "ws";

export function AddingForm({
  setIsNew,
  setNew,
  currBoard,
  updateBoard,
  updated,
  groupId,
  tasks,
  setIsNewGroupAdded,
}) {
  function handelChange(ev) {
    const { name, value } = ev.target;
    setNew({ ...updated, [name]: value });
  }

  function onCloseForm() {
    setIsNew(false);
    // setIsNewGroupAdded(false);
  }

  async function onSave(ev) {
    ev.preventDefault();
    setIsNewGroupAdded(true);

    const board = { ...currBoard };
    if (!updated.title) return onCloseForm();
    if (updated.tasks) {
      board.groups.push(updated);
      boardService.updateActivities(board, "", "addGroup", updated);
    } else {
      ev.preventDefault();

      const group = board?.groups?.find((group) => group.id === groupId);

      boardService.updateBoard(board, groupId, null, {
        key: "tasks",
        value: [...tasks, updated],
      });
      await boardService.updateActivities(board, "", "addTask", group, updated);
    }
    setIsNew(false);
    updateBoard(board);
  }

  function handleKeyDown(ev) {
    if (ev.key === "Enter") {
      ev.preventDefault();
      onSave(ev);
    }
  }
  return (
    <form className="adding-form" onSubmit={onSave}>
      <textarea
        onChange={handelChange}
        rows="2"
        cols="1"
        name="title"
        placeholder="Enter list name…"
        onKeyDown={handleKeyDown}
        autoFocus
      ></textarea>
      <button className="save-group-btn">Add list</button>
      <button className="close-btn" onClick={onCloseForm}>
        <span>
          <IoMdClose />
        </span>
      </button>
    </form>
  );
}
