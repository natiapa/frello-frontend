import { useState } from "react"
import { useNavigate } from "react-router"
import { LabelList } from "./LabelList"
import { EditTaskTitle } from "./EditTaskTitle"



export function TaskDetails({ boardId, task, loadBoard }) {

  const [title, setTitle] = useState(task.title)
  const [isEditing, setIsEditing] = useState(false)
  const navigate = useNavigate()

 

  console.log("task:", task);
  function onCloseForm() {
    navigate(`/board/${boardId}`);
  }

  return (
    <>
      <div className="overlay" onClick={onCloseForm}></div>
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
      </div>
    </>
  );
}
