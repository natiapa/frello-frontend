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
import { AttachmentList } from "./AttachmentList";
import { IoAddOutline } from "react-icons/io5";
import { CoverDisplay } from "./CoverDisplay";

export function TaskDetails() {
  const dialogRef = useRef(null);
  const params = useParams();
  const navigate = useNavigate();

  const { boardId, groupId, taskId } = params;
  const board = useSelector((storeState) => storeState.boardModule.board);
  const group = board?.groups?.find((group) => group.id === groupId);
  const task = group?.tasks?.find((task) => task.id === taskId);

  const [currElToEdit, setCurrElToEdit] = useState("");
  const [boardSelectedLabels, setBoardSelectedLabels] = useState(board.labels);
  const [taskSelectedLabels, setTaskSelectedLabels] = useState(task.labels);
  const [newDueDate, setNewDueDate] = useState(task.dueDate);
  const [newChecklists, setNewCheckLists] = useState(task.checklists);
  const [newFiles, setNewFiles] = useState(task.attachments || []);
  const [currCover, setCurrCover] = useState(task.cover);
  const [taskMembers, setTaskMembers] = useState(task.members);

  const [anchorEl, setAnchorEl] = useState(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [modalOpenByName, setModalOpenByName] = useState(null);

  useEffect(() => {
    if (task) {
      setNewFiles(task.attachments);
      setTaskSelectedLabels(task.labels);
      setNewDueDate(task.dueDate);
      setNewCheckLists(task.checklists);
    }
  }, [task]);

  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, [params]);

  function calculateTaskNumber() {
    let taskNumber = 0;

    for (const grp of board.groups) {
      if (grp.id === groupId) {
        const taskIndex = grp.tasks.findIndex((task) => task.id === taskId);
        taskNumber += taskIndex + 2;
        break;
      } else {
        taskNumber += grp.tasks.length;
      }
    }
    return taskNumber;
  }

  async function onUpdated(name, value) {
    try {
      const updatedBoard = boardService.updateBoard(board, groupId, taskId, {
        key: name,
        value: value,
      });
      if (name === "checklists") {
        setNewCheckLists([...value]);
      }
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

      await boardService.updateActivities(
        board,
        "",
        "deleteTask",
        group,
        task,
        "",
        calculateTaskNumber()
      );
      navigate(`/board/${boardId}`);
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  }
  function handleClick(ev) {
    const currDataName = ev.currentTarget.getAttribute("data-name");
    setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);
    setAnchorEl(ev.currentTarget);
    setModalOpenByName(currDataName);

    console.log("modalOpenByName:", modalOpenByName);
    console.log("isPopoverOpen:", isPopoverOpen);
    console.log("currDataName:", currDataName);
  }

  function handleAddLabel(ev) {
    ev.preventDefault();
    console.log("Label added:", ev);
    handleClick(ev);
  }
  if (!task) return;

  return (
    <section className="task-details">
      <dialog ref={dialogRef} method="dialog" onClick={handleDialogClick}>
        {currCover.color && (
          <>
            <CoverDisplay currCover={currCover} />
          </>
        )}
        <button
          className="close-btn"
          onClick={onCloseDialog}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            zIndex: 1001,
          }}
        >
          <SvgIcon iconName="close" />
        </button>

        <form style={{ marginTop: currCover.color ? "120px" : "0" }}>
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

          <div className="information">
            {task.members.length > 0 && (
              <ul className="member-list">
                <p className="header">Members</p>

                {task.members && (
                  <MemberList members={task.members} gridColumnWidth="32px" />
                )}
              </ul>
            )}

            {/* Label-List */}
            {taskSelectedLabels.length > 0 && (
              <ul className="labels">
                <p className="header">Labels</p>
                <LabelList taskLabels={taskSelectedLabels} />
              </ul>
            )}

            <div
              className="add-label-button"
              data-name="labels"
              onClick={handleAddLabel}
            >
              <IoAddOutline style={{ fontSize: "20px", color: "#0079bf" }} />
            </div>

            <div>
              <DueDateDisplay
                dueDate={task.dueDate}
                setNewDueDate={setNewDueDate}
              />
            </div>
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

          {task?.attachments && task.attachments.length > 0 && (
            <AttachmentList
              files={task.attachments}
              onUpdated={onUpdated}
              task={task}
              setNewFiles={setNewFiles}
            />
          )}

          {task?.checklists && task.checklists.length > 0 && (
            <TaskChecklist
              checklists={newChecklists}
              onUpdated={onUpdated}
              task={task}
              group={group}
              board={board}
              groupId={groupId}
              boardId={boardId}
            />
          )}
        </form>
        <div style={{ marginTop: currCover.color ? "120px" : "0" }}>
          <TaskDetailsActions
            board={board}
            group={group}
            task={task}

            boardId={board?.id}
            groupId={group.id}
            taskId={task.id}

            setBoardSelectedLabels={setBoardSelectedLabels}
            setTaskSelectedLabels={setTaskSelectedLabels}

            onUpdated={onUpdated}

            setNewDueDate={setNewDueDate}
            setNewCheckLists={setNewCheckLists}
            setNewFiles={setNewFiles}
            setCurrCover={setCurrCover}s
            currCover={currCover}
            newFiles={newFiles}
            handleClick={handleClick}
            anchorEl={anchorEl}
            setIsPopoverOpen={setIsPopoverOpen}
            modalOpenByName={modalOpenByName}
            isPopoverOpen={isPopoverOpen}
            setTaskMembers={setTaskMembers}
            taskMembers={taskMembers}
          />
        </div>
      </dialog>
    </section>
  );
}
