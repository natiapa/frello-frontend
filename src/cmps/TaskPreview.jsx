import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { TaskDetails } from './TaskDetails'
import { useEffect, useState } from 'react'
import { eventBus } from '../services/event-bus.service'
import { FiEdit2 } from 'react-icons/fi'

export function TaskPreview({ groupId, task }) {
    const board = useSelector(storeState => storeState.boardModule.board)
    const group = board.groups.find(group => group.id === groupId)
    const boardId = useSelector(storeState => storeState.boardModule.board._id)

    function handleClick(ev) {
        ev.preventDefault()
        const previewData = ev.target.parentNode.getBoundingClientRect()
        eventBus.emit('show-task', previewData)
    }
    return (
        <Link to={`/board/${boardId}/${groupId}/${task.id}`}>
            <div className="task-preview">
                <button className="edit-btn" onClick={e => handleClick(e)}>
                    <FiEdit2 />
                </button>
                <span>{task.title || 'New'}</span>
                <div className="details">
                    <ul className="members">
                        {task.members &&
                            task.members.length &&
                            task.members.map(member => {
                                return (
                                    <li key={member.fullname} className="member" style={{backgroundColor:member.color}}>
                                        {member.fullname[0].toUpperCase()}
                                    </li>
                                )
                            })}
                    </ul>
                </div>
            </div>
        </Link>
    )
}
