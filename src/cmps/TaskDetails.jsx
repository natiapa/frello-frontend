import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { Edit } from "./Edit";
import { LabelList } from "./LabelList";
import { TaskChecklist } from "./TaskChecklist";
import { updateBoard } from "../store/actions/board.actions";
import { TaskDetailsActions } from "./TaskDetailsActions";
import { MemberList } from "./MemberList";
import { boardService } from "../services/board";
import SvgIcon from "./SvgIcon";
import { DueDateDisplay } from "./DueDateDisplay";

export function TaskDetails() {
  const dialogRef = useRef(null);
  const params = useParams();
  const navigate = useNavigate();
  const { boardId, groupId, taskId } = params;
  const board = useSelector((storeState) => storeState.boardModule.board);

  const group = board?.groups?.find((group) => group.id === groupId);
  const task = group?.tasks?.find((task) => task.id === taskId);

  const [currElToEdit, setCurrElToEdit] = useState("");
  const [selectedLabels, setSelectedLabels] = useState(task?.labels || []);
  const [newDueDate, setNewDueDate] = useState(task.dueDate);
  console.log(newDueDate)


  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, [params]);

  async function onUpdated(name, value) {
    try {
      const updatedBoard = boardService.updateBoard(board, groupId, taskId, {
        key: name,
        value: value,
      });
      await updateBoard(updatedBoard);
    } catch (error) {
      console.error("Failed to update the board:", error);
    }
  }

  function onEdit(ev) {
    const dataName = ev.currentTarget.getAttribute("data-name");
    setCurrElToEdit(dataName);
  }

  function onCloseDialog() {
    navigate(`/board/${boardId}`);
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  }

  function handleDialogClick(ev) {
    if (ev.target === dialogRef.current) {
      onCloseDialog();
    }
  }

  async function deleteTask(ev) {
    ev.preventDefault();
    try {
      const updatedBoard = boardService.updateBoard(board, groupId, taskId, {
        key: "deleteTask",
        value: null,
      });
      await updateBoard(updatedBoard);
      navigate(`/board/${boardId}`);
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  }

  if (!task) return;

  return (
    <section className="task-details">
      <dialog ref={dialogRef} method="dialog" onClick={handleDialogClick}>
        <form>
          {currElToEdit !== "title" ? (
            <header data-name="title" onClick={onEdit}>
              {task?.title || "Untitled Task"}
            </header>
          ) : (
            <Edit
              task={task}
              onUpdated={onUpdated}
              currElToEdit={currElToEdit}
              setCurrElToEdit={setCurrElToEdit}
            />
          )}
          <button className="close-btn" onClick={onCloseDialog}>
            <SvgIcon iconName="close" />
          </button>
          <ul className="member-list">
            <p className="header-member-list">Members</p>

            {task.members && <MemberList members={task.members} />}
          </ul>
          <LabelList labels={selectedLabels} />

          <div>
            <DueDateDisplay dueDate={newDueDate} setNewDueDate={setNewDueDate} />
          </div>

          {currElToEdit !== "description" ? (
            <p
              className="editable-description"
              data-name="description"
              onClick={onEdit}
            >
              {task?.description || "Add a more detailed description..."}
            </p>
          ) : (
            <Edit
              task={task}
              onUpdated={onUpdated}
              currElToEdit={currElToEdit}
              setCurrElToEdit={setCurrElToEdit}
            />
          )}

          <button className="delete-btn" onClick={deleteTask}>
            Delete task
          </button>

          {task?.checklists && task.checklists.length > 0 && (
            <TaskChecklist
              checklists={task.checklists}
              onUpdated={onUpdated}
              task={task}
              groupId={groupId}
              boardId={boardId}
            />
          )}
        </form>
        <TaskDetailsActions
          boardId={board?.id}
          groupId={group.id}
          taskId={task.id}
          task={task}
          selectedLabels={selectedLabels}
          setSelectedLabels={setSelectedLabels}
          onUpdated={onUpdated}
          setNewDueDate={setNewDueDate}
        />
      </dialog>
    </section>
  );
}
