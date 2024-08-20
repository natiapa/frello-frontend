import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { loadBoards, addBoard, updateBoard, removeBoard, addBoardMsg } from '../store/actions/board.actions'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { boardService } from '../services/board'
import { userService } from '../services/user'

import { BoardList } from '../cmps/BoardList'
import { BoardFilter } from '../cmps/BoardFilter'
import { SideBar } from '../cmps/Sidebar'

export function BoardIndex() {
    const [filterBy, setFilterBy] = useState(boardService.getDefaultFilter())
    const boards = useSelector(storeState => storeState.boardModule.boards)

    useEffect(() => {
        loadBoards(filterBy)
    }, [filterBy])

    async function onRemoveBoard(boardId) {
        try {
            await removeBoard(boardId)
            showSuccessMsg('Board removed')
        } catch (err) {
            showErrorMsg('Cannot remove board')
        }
    }

    async function onAddBoard() {
        const board = boardService.getEmptyBoard()
        board.title = prompt('Title?')
        try {
            const savedBoard = await addBoard(board)
            showSuccessMsg(`Board added (id: ${savedBoard._id})`)
        } catch (err) {
            showErrorMsg('Cannot add board')
        }
    }

    async function onUpdateBoard(board) {
        const title = prompt(board.title)
        board.title = title
        try {
            await updateBoard(board)
            showSuccessMsg('Board updated')
        } catch (err) {
            showErrorMsg('Cannot update board')
        }
    }

    return (
        <>
            <section className="board-index">
                <SideBar />
              
                {/* <BoardFilter filterBy={filterBy} setFilterBy={setFilterBy} /> */}
                <BoardList boards={boards} onAddBoard={onAddBoard} onRemoveBoard={onRemoveBoard} onUpdateBoard={onUpdateBoard} />
            </section>
        </>
    )
}
