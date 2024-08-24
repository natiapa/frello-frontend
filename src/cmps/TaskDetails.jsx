import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

import { EditTask } from './EditTask'
import { useSelector } from 'react-redux'

import { boardService } from '../services/board/board.service.local'
import { updateBoard } from '../store/actions/board.actions'

export function TaskDetails() {
  const [isEditing, setIsEditing] = useState(false)
  const [currElementToEdit, setCurrElementToEdit] = useState('')

  const dialogRef = useRef(null)
  const params = useParams()
  const navigate = useNavigate()

  const { boardId, groupId, taskId } = params

  const board = useSelector(storeState => storeState.boardModule.board)
  const group = board?.groups?.find(group => group.id === groupId)
  const task = group?.tasks?.find(task => task.id === taskId)

  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.showModal()
    }
  }, [params])

  async function onUpdatedTask(name, value) {
    try {
    boardService.updateBoard(board, groupId, taskId, { key: name, value: value })
    await updateBoard(board)
    } catch (error) {
      console.error('Failed to update the board:', error)
    }
  }

  function onCloseDialog() {
    navigate(`/board/${boardId}`)
    if (dialogRef.current) {
      dialogRef.current.close()
    }
  }

  function onEdit(ev) {
    const dataName = ev.currentTarget.getAttribute('data-name')
    // console.log(dataName)
    setCurrElementToEdit(dataName)
    setIsEditing(true)
  }

  function handleDialogClick(ev) {
    if (ev.target === dialogRef.current) {
      onCloseDialog()
    }
  }

  return (
    <>
      <dialog className="task-details" ref={dialogRef} method="dialog" onClick={handleDialogClick}>
        <button onClick={onCloseDialog}>x</button>
        {!isEditing && task?.title && (
          <h1 data-name="title" onClick={onEdit}>
            {task.title || ''}
          </h1>
        )}
        {isEditing && <EditTask task={task} onUpdatedTask={onUpdatedTask} currElementToEdit={currElementToEdit} setIsEditing={setIsEditing} />}
      </dialog>
    </>
  )
}
//   return (
//     <dialog
//       className="task-details"
//       ref={dialogRef}
//       method="dialog"
//       onClick={handleDialogClick}
//     >
//       <form>
//         <button onClick={onCloseDialog}>x</button>
//         {task?.title && <h1>{task.title || ""}</h1>}
//       </form>
//     </dialog>
//   );
// }

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
