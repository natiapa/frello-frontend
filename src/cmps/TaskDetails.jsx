import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { LabelList } from "./LabelList";
import { EditTaskTitle } from "./EditTaskTitle";
import { useSelector } from "react-redux";

import svgIcon from "./SvgIcon";

export function TaskDetails() {
  const dialogRef = useRef(null);
  const params = useParams();
  const { boardId, groupId, taskId } = params;

  const board = useSelector((storeState) => storeState.boardModule.board);
  const group = board?.groups?.find((group) => group.id === groupId);
  const task = group?.tasks?.find((task) => task.id === taskId);

  // console.log(params);

  const navigate = useNavigate();

  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, [params]);

  function onCloseDialog() {
    navigate(`/board/${boardId}`);
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  }

  function handleDialogClick(event) {
    if (event.target === dialogRef.current) {
      onCloseDialog();
    }
  }

  return (
    <>
      <dialog
        className="task-details"
        ref={dialogRef}
        method="dialog"
        onClick={handleDialogClick}
      >
        <form method="dialog">
          <button onClick={onCloseDialog}>x</button>
          {task?.title && <h1>{task.title || ""}</h1>}
        </form>
      </dialog>
    </>
  );
}

// useEffect(() => {
//   if (title !== task.title) {

//     const updatedTask = { ...task, title }

//     const updateGrope = {
//       ...group,
//       tasks: group.tasks.map(tsk =>
//         tsk.id === task.id ? updatedTask : tsk
//       )
//     }

//     const updateBoard = {
//       ...board,
//       groups: board.groups.map(grp =>
//         grp.id === group.id ? updateGrope : grp
//       )
//     }
//     console.log(updateBoard)

//     onUpdateBoard(updateBoard)
//   }
// }, [title])

{
  /* <div className="overlay" onClick={onCloseForm}></div>
      <div className="task-details">
        <form onSubmit={onCloseForm}>
          <button>
            <span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m4 4 8 8m-8 0 8-8"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="1.5"
                ></path>
              </svg>
            </span>
          </button>
          <h1 onClick={() => setIsEditing(true)}>{title}</h1>
          {isEditing && <EditTaskTitle title={title} setTitle={setTitle} setIsEditing={setIsEditing} />}

          <h3>Labels:</h3>
          <LabelList labels={task.labels} />
          <h3>Members:</h3>
          {task.members.map((member, idx) => (
            <li key={idx}>{member}</li>
          ))}


          <div className="description">
            <h3>Description:</h3>
            <textarea>{task.description}</textarea>
          </div>
        </form>
      </div> */
}
