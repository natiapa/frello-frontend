import { Link } from 'react-router-dom'
import { userService } from '../services/user'
import { BoardPreview } from './BoardPreview'

export function BoardList({ boards, onRemoveBoard, onUpdateBoard }) {
    
    function shouldShowActionBtns(board) {
        const user = userService.getLoggedinUser()
        
        if (!user) return false
        if (user.isAdmin) return true
        return board.owner?._id === user._id
    }

    return <section>
        <ul className="list">
            {boards.map(board =>
                <li key={board._id}>
                    <BoardPreview board={board}/>
                    <Link to={`/board/${board._id}`}>Board</Link>
                    {/* {shouldShowActionBtns(board) && <div className="actions">
                        <button onClick={() => onUpdateBoard(board)}>Edit</button>
                        <button onClick={() => onRemoveBoard(board._id)}>x</button>
                    </div>} */}
                </li>)
            }
        </ul>
    </section>
}