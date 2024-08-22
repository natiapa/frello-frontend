import { Link } from 'react-router-dom'
import { userService } from '../services/user'
import { BoardPreview } from './BoardPreview'

export function BoardList({ boards, onAddBoard, onRemoveBoard, onUpdateBoard }) {
    function shouldShowActionBtns(board) {
        const user = userService.getLoggedinUser()

        if (!user) return false
        if (user.isAdmin) return true
        return board.owner?._id === user._id
    }

    
    return (
        <ul className="board-list">
            <header>
                <h2>Demo boards</h2>
            </header>
            {boards && boards.length && boards.map(board => (
                <li key={board._id}>
                    <BoardPreview board={board} />
                    <Link to={`/board/${board._id}`}>{board.title}</Link>
                    <div className="actions">
                        <button onClick={() => onUpdateBoard(board)}>Edit</button>
                        <button onClick={() => onRemoveBoard(board._id)}>x</button>
                    </div>
                </li>
            ))}
            <li className="new-board" onClick={() => onAddBoard()}>
                Create new board
            </li>
        </ul>
    )
}
