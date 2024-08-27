import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { boardService } from '../services/board'
import { updateBoard } from '../store/actions/board.actions'

import { TaskList } from './TaskList'
import { useEffect, useState } from 'react'
import { Edit } from './Edit'

export function GroupPreview({ group }) {
    const board = useSelector(storeState => storeState.boardModule.board)

    const [currElToEdit, setCurrElToEdit] = useState("");


    const navigate = useNavigate()

    async function deleteGroup(ev) {
        ev.preventDefault()

        try {
            const newBoard = await boardService.updateBoard(board, group.id, null, {
                key: 'deleteGroup',
                value: null,
            })
            await updateBoard(newBoard)
        } catch (error) {
            console.error('Failed to update the board:', error)
        }

        navigate(`/board/${board._id}`)
    }
    function onEdit({ target }) {
        const dataName = target.getAttribute('data-name')
        setCurrElToEdit(dataName)
    }

    async function onUpdated(name, value) {
      try {
        const updatedBoard = boardService.updateBoard(board, group.id, null, {
          key: name,
          value: value,
        });
        await updateBoard(updatedBoard);
      } catch (error) {
        console.error("Failed to update the board:", error);
      }
    }

    return (
        <div className="group-preview">
            <div className="header-and-actions">
                {currElToEdit !== 'title' && <h3 data-name="title" onClick={onEdit}>{group?.title}</h3>}
                {currElToEdit === 'title' && <Edit task={group} currElToEdit={currElToEdit} onUpdated={onUpdated} setCurrElToEdit={setCurrElToEdit}/>}
                <button onClick={deleteGroup}>Delete list</button>
            </div>
            <TaskList group={group} />
        </div>
    )
}
