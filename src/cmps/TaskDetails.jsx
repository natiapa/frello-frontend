import { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router'

export function TaskDetails({ boardId, task }) {
    const navigate = useNavigate()
    console.log('task:', task)
    function onCloseForm() {
        navigate(`/board/${boardId}`)
    }
    return (
        <div className="task-details">
            <form onSubmit={onCloseForm}>
                <button>X</button>
                <h1>{task.title}</h1>
                <ul>
                    <h3>Labels:</h3>
                    {task.labels.map((label, idx) => (
                        <li key={idx}>{label}</li>
                    ))}
                </ul>
                <ul>
                    <h3>Members:</h3>
                    {task.members.map((member, idx) => (
                        <li key={idx}>{member}</li>
                    ))}
                </ul>
                <div className="description">
                    <h3>Description:</h3>
                    <textarea>{task.description}</textarea>
                </div>
            </form>
        </div>
    )
}
