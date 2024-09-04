import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { TaskDetails } from './TaskDetails'
import { useEffect, useState } from 'react'
import { eventBus } from '../services/event-bus.service'
import { FiEdit2 } from 'react-icons/fi'
import { LabelList } from './LabelList'
import { MemberList } from './MemberList'
import { IoMdCheckboxOutline } from 'react-icons/io'
import { Draggable } from 'react-beautiful-dnd'
import { loadBoard, updateBoard } from '../store/actions/board.actions'
import { boardService } from '../services/board'

export function TaskPreview({ groupId, task, tIndex, allowDrop, drop }) {
    const board = useSelector(storeState => storeState.boardModule.board)
    const group = board?.groups?.find(group => group.id === groupId)
    const [members, setMembers] = useState(task.members)

    useEffect(() => {}, [task.members])

    function drop(ev) {
        ev.preventDefault()
        const data = ev.dataTransfer.getData('text')
        const currDraggedMemberId = data

        const draggedMember = board.members.find(
            member => member.id === currDraggedMemberId
        )

        if (
            !draggedMember ||
            task.members.some(member => member.id === currDraggedMemberId)
        ) {
            return
        }

        const membersToUpdate = Array.isArray(task.members)
            ? [...task.members, draggedMember]
            : [draggedMember]
        setMembers(membersToUpdate)
        onUpdated('members', membersToUpdate)
    }

    async function onUpdated(name, value) {
        if (!board) return
        try {
            const updatedBoard = boardService.updateBoard(
                board,
                group.id,
                task.id,
                {
                    key: name,
                    value: value,
                }
            )
            updateBoard(updatedBoard)
            // await loadBoard(board._id);
        } catch (error) {
            console.error('Failed to update the board:', error)
        }
    }

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
        ev.stopPropagation()
        const dataName = ev.currentTarget.getAttribute('data-name')
        const elData = ev.target
            .closest('.task-preview')
            .getBoundingClientRect()
        if (!elData) return
        const previewData = { elData, group, task, dataName }
        eventBus.emit('show-task', previewData)
    }

    return (
        <Draggable key={task.id} draggableId={task.id} index={tIndex}>
            {(provided, snapshot) => (
                <li
                    className="task-preview"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                        ...provided.draggableProps.style,
                        opacity: snapshot.isDragging ? '0.5' : '1',
                    }}
                    onDragOver={ev => allowDrop(ev)}
                    onDrop={ev => drop(ev)}>
                    {group && task && (
                        <Link to={`/board/${board._id}/${group.id}/${task.id}`}>
                            <button
                                data-name="title"
                                className="edit-btn"
                                onClick={e => handleClick(e)}>
                                <FiEdit2 />
                            </button>
                            <div className="labels">
                                <LabelList
                                    labels={task.labels}
                                    labelWidth="40px"
                                />
                            </div>

                            <span>{task.title || 'New'}</span>

                            <div className="details">
                                {task.checklists &&
                                    task.checklists.length > 0 && (
                                        <div className="checklists">
                                            <IoMdCheckboxOutline />
                                            {`${getIsChecked()}/${getChecklists()}`}
                                        </div>
                                    )}
                                <ul className="members">
                                    <MemberList
                                        members={members}
                                        gridColumnWidth="28px"
                                    />
                                </ul>
                            </div>
                        </Link>
                    )}
                </li>
            )}
        </Draggable>
    )
}
