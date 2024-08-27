import { useEffect, useState } from 'react'
import { GroupPreview } from './GroupPreview'
import { boardService } from '../services/board'
import { useSelector } from 'react-redux'
import { updateBoard } from '../store/actions/board.actions'

export function GroupList({ groups }) {
    const [isNewGroup, setIsNewGroup] = useState(false)
    const [newGroup, setNewGroup] = useState(boardService.getEmptyGroup())
    const currBoard = useSelector(state => state.boardModule.board)

    useEffect(() => {
        console.log('groups:', groups)
    }, [groups?.length])
    
    function onAddGroup() {
        setNewGroup(boardService.getEmptyGroup())
        setIsNewGroup(true)
        const updatedBoard = { ...currBoard }
        updatedBoard.groups.push(newGroup)
        updateBoard(updatedBoard)
        setIsNewGroup(false)
    }

    if (!groups) return <div>Loading...</div>
    return (
        <div className="group-list">
            {groups.map(group => (
                <GroupPreview group={group} key={group.id} />
            ))}
            <div className="add-group-preview">
                {isNewGroup && <GroupPreview group={newGroup} key={newGroup.id}/>}
                <button className='add-group-btn' onClick={onAddGroup}><span className='header-btn'>+ Add another list</span></button>
            </div>
        </div>
    )
}
