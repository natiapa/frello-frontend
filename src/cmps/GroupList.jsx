import { useEffect, useState } from 'react'
import { GroupPreview } from './GroupPreview'
import { boardService } from '../services/board'
import { useSelector } from 'react-redux'
import { updateBoard } from '../store/actions/board.actions'
import { on } from 'ws'

export function GroupList({ groups }) {
    const [isNewGroup, setIsNewGroup] = useState(false)
    const [newGroup, setNewGroup] = useState({})
    const currBoard = useSelector(state => state.boardModule.board)

    useEffect(() => {
        setNewGroup(boardService.getEmptyGroup())
        setIsNewGroup(true)
    }, [!isNewGroup])

    function onAddGroup() {
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
                <button onClick={onAddGroup}>Add Group</button>
            </div>
        </div>
    )
}
