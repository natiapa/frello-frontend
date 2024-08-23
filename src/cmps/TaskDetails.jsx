import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

import { LabelList } from './LabelList'
import { Edit } from './Edit'
import { useSelector } from 'react-redux'

import svgIcon from './SvgIcon'

export function TaskDetails() {
    const dialogRef = useRef(null)
    const params = useParams()
    const { groupId, taskId } = params

    const board = useSelector(storeState => storeState.boardModule.board)
    const group = board?.groups?.find(group => group.id === groupId)
    const task = group?.tasks?.find(task => task.id === taskId)

    const [isEditing, setIsEditing] = useState(false)
    const [elementToEdit, setElementToEdit] = useState(null)

    console.log(params)

    const navigate = useNavigate()

    useEffect(() => {
        if (dialogRef.current) {
            dialogRef.current.showModal()
        }
    }, [params])

    function onCloseDialog() {
        navigate(`/board/${params.boardId}`)
        if (dialogRef.current) {
            dialogRef.current.close()
        }
    }
    function onEdit(ev) {
        const dataName = ev.currentTarget.getAttribute('data-name')
        console.log(dataName)
        setElementToEdit(dataName)
        setIsEditing(true)
    }

    return (
        <>
            {/* <div className="overlay" onClick={onCloseDialog}></div> */}
            <dialog className="task-details" ref={dialogRef} tabIndex="-1">
                <button onClick={onCloseDialog}>x</button>
                {!isEditing && task?.title && (
                    <h1 data-name="title" onClick={onEdit}>
                        {task.title || ''}
                    </h1>
                )}
                {isEditing && (
                    <Edit
                        task={task}
                        elementToEdit={elementToEdit}
                        setIsEditing={setIsEditing}
                    />
                )}
            </dialog>
        </>
    )
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
