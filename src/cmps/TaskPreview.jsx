import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { eventBus } from '../services/event-bus.service'
import { FiEdit2 } from 'react-icons/fi'
import { LabelList } from './LabelList'
import { MemberList } from './MemberList'
import { IoMdCheckboxOutline } from 'react-icons/io'

export function TaskPreview({ groupId, task }) {
    const boardId = useSelector(storeState => storeState.boardModule.board._id)

    function getChecklists() {
        const checklists = task.checklists
        if (!checklists) return 0
        let counter = 0
        checklists.forEach(checklist => {
            counter += checklist.items.length
        })
        return counter
    }

    function getIsChecked() {
        const checklists = task.checklists
        if (!checklists) return 0
        let counter = 0
        checklists.forEach(checklist => {
            counter += checklist.items.filter(item => item.isChecked).length
        })
        return counter
    }

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
                <div className="labels">
                    <LabelList labels={task.labels} />
                </div>

                <span>{task.title || 'New'}</span>

                <div className="details">
                    {task.checklists && task.checklists.length > 0 && (
                        <div className="checklists">
                            <IoMdCheckboxOutline />
                            {`${getIsChecked()}/${getChecklists()}`}
                        </div>
                    )}

                    <ul className="members">
                        <MemberList members={task.members} />
                    </ul>
                </div>
            </div>
        </Link>
    )
}
