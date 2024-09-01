import { useState } from 'react'
import { useSelector } from 'react-redux'
import { boardService } from '../services/board'
import { updateBoard } from '../store/actions/board.actions'

export function EditChecklist({ groupId, taskId, task, setIsPopoverOpen, handlePopoverClick }) {
    const board = useSelector(state => state.boardModule.board)
    const [title, setTitle] = useState('checklist')
    
    function handleChange(ev) {
        // ev.preventDefault()
        setTitle(ev.target.value)
    }

   async function onAddChecklist() {
        boardService.updateBoard(board, groupId, taskId, {
            key: 'checklists',
            value: [...(task.checklists || ''), { ...boardService.getEmptyChecklist(), title: title }],
        })
        await updateBoard(board)
        setIsPopoverOpen(false)
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
