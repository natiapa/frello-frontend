import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { boardService } from '../services/board'
import { updateBoard } from '../store/actions/board.actions'

export function EditChecklist({ groupId, taskId, task, setIsPopoverOpen, handlePopoverClick }) {
    const board = useSelector(state => state.boardModule.board)
    const [title, setTitle] = useState('checklist')
    const checklists = board.groups.find(group => group.id === groupId).tasks.find(task => task.id === taskId).checklists

    useEffect(() => {
        console.log('checklists:', checklists)
    }, [checklists?.length])

    function handleChange(ev) {
        // ev.preventDefault()
        setTitle(ev.target.value)
    }

    async function onAddChecklist() {
        checklists.push({ ...boardService.getEmptyChecklist(), title: title })
        const updatedBoard = { ...board }
        console.log('updatedBoard:', updatedBoard)
        // const updatedBoard = boardService.updateBoard(board, groupId, taskId, {
        //     key: 'checklists',
        //     value: [...(task.checklists || ''), { ...boardService.getEmptyChecklist(), title: title }],
        // })
        updateBoard(updatedBoard) // מעדכן את הסטור של Redux עם ה-board המעודכן
        setIsPopoverOpen(false)
    }
    return (
        <div className="edit-checklist" onClick={handlePopoverClick}>
            <h2>
                Checklist <span>{checklists?.length}</span>
            </h2>
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
