import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { boardService } from '../services/board'
import { updateBoard } from '../store/actions/board.actions'

import { TaskList } from './TaskList'
import { useEffect, useState } from 'react'
import { Edit } from './Edit'
import { Draggable } from 'react-beautiful-dnd'
import { HiDotsHorizontal } from 'react-icons/hi'
import { Popover } from '@mui/material'

export function GroupPreview({ group, gIndex, allowDrop, drop }) {
    const board = useSelector(storeState => storeState.boardModule.board)

    const [currElToEdit, setCurrElToEdit] = useState('')
    const [anchorEl, setAnchorEl] = useState(null)
    const [isHiDotsOpen, setIsHiDotsOpen] = useState(false)

    const navigate = useNavigate()

    async function deleteGroup(ev) {
        ev.preventDefault()

        try {
            const newBoard = await boardService.updateBoard(
                board,
                group.id,
                null,
                {
                    key: 'deleteGroup',
                    value: null,
                }
            )
            await updateBoard(newBoard)
            await boardService.updateActivities(board, '', 'deleteGroup', group)
        } catch (error) {
            console.error('Failed to update the board:', error)
        }

        navigate(`/board/${board._id}`)
    }
    function onEdit({ target }) {
        const dataName = target.getAttribute('data-name')
        setCurrElToEdit(dataName)
    }

    function onOpen(ev) {
        setAnchorEl(ev.currentTarget)
        setIsHiDotsOpen(isHiDotsOpen => !isHiDotsOpen)
    }

    async function onUpdated(name, value) {
        try {
            const updatedBoard = boardService.updateBoard(
                board,
                group.id,
                null,
                {
                    key: name,
                    value: value,
                }
            )
            await updateBoard(updatedBoard)
        } catch (error) {
            console.error('Failed to update the board:', error)
        }
    }

    return (
        <Draggable key={group.id} draggableId={group.id} index={gIndex}>
            {(provided, snapshot) => (
                <li
                    className="group-preview"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                        ...provided.draggableProps.style,
                        opacity: snapshot.isDragging ? '0.5' : '1',
                    }}>
                    <div className="header-and-actions">
                        {currElToEdit !== 'title' && (
                            <h3 data-name="title" onClick={onEdit}>
                                {group?.title}
                            </h3>
                        )}
                        {currElToEdit === 'title' && (
                            <Edit
                                task={group}
                                currElToEdit={currElToEdit}
                                onUpdated={onUpdated}
                                setCurrElToEdit={setCurrElToEdit}
                            />
                        )}
                        <div className="hi-dots" onClick={onOpen}>
                            <HiDotsHorizontal />

                            {isHiDotsOpen && (
                                <Popover
                                    open={isHiDotsOpen}
                                    id={anchorEl}
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}>
                                    <div className="group-preview-actions">
                                        <button onClick={deleteGroup}>
                                            Delete
                                        </button>
                                    </div>
                                </Popover>
                            )}
                        </div>
                    </div>
                    <TaskList group={group} allowDrop={allowDrop} drop={drop} />
                </li>
            )}
        </Draggable>
    )
}
