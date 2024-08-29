import { useState } from 'react'
import { useSelector } from 'react-redux'
import { boardService } from '../services/board'
import { makeId } from '../services/util.service'
import { updateBoard } from '../store/actions/board.actions'

export function EditChecklist({ groupId, taskId, task, setIsPopoverOpen, handlePopoverClick }) {
    const board = useSelector(state => state.boardModule.board)
    const [title, setTitle] = useState('checklist')
    console.log('task:', task)
    function handleChange(ev) {
        // ev.preventDefault()
        console.log(ev.target.value)
        setTitle(ev.target.value)
    }

    function onAddChecklist() {
        boardService.updateBoard(board, groupId, taskId, {
            key: 'checklists',
            value: [...(task.checklists || ''), { ...boardService.getEmptyChecklist(), title: title }],
        })
        const c = board.groups.find(group => group.id === groupId).tasks.find(task => task.id === taskId)
        console.log('c:', c)
        updateBoard(board)
        setIsPopoverOpen(false)
        console.log('add checklist')
    }
    return (
        <div className="edit-checklist" onClick={handlePopoverClick}>
            <h2>Checklist</h2>
            <label>
                <span>title</span>
                <input type="text" value={title} onChange={handleChange} />
            </label>
            <div className="edit-checklist-btn" onClick={onAddChecklist}>
                Add
            </div>
        </div>
    )
}
