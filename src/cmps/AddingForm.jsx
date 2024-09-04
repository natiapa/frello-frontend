import { IoMdClose } from 'react-icons/io'
import { boardService } from '../services/board'

export function AddingForm({ setIsNew, setNew, currBoard, updateBoard, updated, groupId,tasks }) {
    function handelChange(ev) {
        const { name, value } = ev.target
        setNew({ ...updated, [name]: value })
    }

    function onCloseForm() {
        setIsNew(false)
    }
    function onSave(ev) {
        ev.preventDefault()
        const board = { ...currBoard }
        if (updated.tasks) {
            board.groups.push(updated)
        } else {
            ev.preventDefault()
            boardService.updateBoard(board, groupId, null, { key: 'tasks', value: [...tasks,updated] })
        }
        setIsNew(false)
        updateBoard(board)
    }
    return (
        <form className='adding-form' onSubmit={onSave}>
            <textarea onChange={handelChange} rows="2" cols="1" name="title" placeholder="Enter list name…" autoFocus></textarea>
            <button className="save-group-btn">Add list</button>
            <button className="close-btn" onClick={onCloseForm}>
                <span>
                    <IoMdClose />
                </span>
            </button>
        </form>
    )
}
