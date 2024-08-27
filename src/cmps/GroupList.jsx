import { useEffect, useState } from 'react'
import { GroupPreview } from './GroupPreview'
import { boardService } from '../services/board'
import { useSelector } from 'react-redux'
import { updateBoard } from '../store/actions/board.actions'
import { IoMdClose } from 'react-icons/io'

export function GroupList({ groups }) {
    const [isNewGroup, setIsNewGroup] = useState(false)
    const [newGroup, setNewGroup] = useState(boardService.getEmptyGroup())
    const currBoard = useSelector(state => state.boardModule.board)

    useEffect(() => {
        console.log('groups:', groups)
    }, [groups?.length])

    function handelChange(ev) {
        const { name, value } = ev.target
        setNewGroup({ ...newGroup, [name]: value })
    }

    function onSaveGroup(ev) {
        ev.preventDefault()
        const updatedBoard = { ...currBoard }
        updatedBoard.groups.push(newGroup)
        updateBoard(updatedBoard)
        setIsNewGroup(false)
    }

    function onCloseForm() {
        setIsNewGroup(false)
    }

    function onAddGroup() {
        setIsNewGroup(true)
        setNewGroup(boardService.getEmptyGroup())
    }

    if (!groups) return <div>Loading...</div>
    return (
        <div className="group-list">
            {groups.map(group => (
                <GroupPreview group={group} key={group.id} />
            ))}
            {/* <div className="add-group-preview"> */}
            {isNewGroup && (
                <form onSubmit={onSaveGroup}>
                    <textarea onChange={handelChange} rows="1" name="title" placeholder="Enter list name…"></textarea>
                    <button className="save-group-btn">Add list</button>
                    <button className="close-btn" onClick={onCloseForm}>
                        <span><IoMdClose /></span>
                    </button>
                </form>
            )}
            {/* {isNewGroup && <GroupPreview group={newGroup} key={newGroup.id}/>} */}
            <button className="add-group-btn" onClick={onAddGroup} hidden={isNewGroup}>
                <span className="header-btn">+ Add another list</span>
            </button>
            {/* </div> */}
        </div>
    )
}
