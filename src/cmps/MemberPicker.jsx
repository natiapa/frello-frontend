import { useState } from 'react'
import { MdClose } from 'react-icons/md'
import { useSelector } from 'react-redux'

export function MemberPicker({
    board,
    task,
    setIsPopoverOpen,
    onUpdated,
    setTaskMembers,
    handlePopoverClick,
    taskMembers,
}) {
    const boards = useSelector(state => state.boardModule.boards)
    const allMembers = boards.reduce((acc, board) => {
        return [...acc, ...board.members]
    }, [])
    const availableMembersFromAllBoards = allMembers.filter(
        member => !taskMembers.some(taskMember => taskMember.id === member.id)
    )
    console.log('allMembers:', allMembers)
    const membersBoard = board.members
    const availableMembers = membersBoard.filter(
        boardMember => !taskMembers.some(taskMember => taskMember.id === boardMember.id)
    )
    const [selectedMembers, setSelectedMembers] = useState(availableMembers)
    const [selectedFromAllMembers, setSelectedFromAllMembers] = useState(availableMembersFromAllBoards)

    function handleRemoveMember(ev, member) {
        ev.stopPropagation()
        const updateTaskMembers = taskMembers.filter(m => m.id !== member.id)
        onUpdated('members', updateTaskMembers)
        setTaskMembers(updateTaskMembers)

        const updateBoardMembers = [...selectedMembers, member]
        setSelectedMembers(updateBoardMembers)
    }

    function handleAddMember(ev, member) {
        ev.stopPropagation()
        const updateBoardMembers = selectedMembers.filter(m => m.id !== member.id)
        setSelectedMembers(updateBoardMembers)

        const updateTaskMembers = [...taskMembers, member]
        onUpdated('members', updateTaskMembers)
        setTaskMembers(updateTaskMembers)
    }

    function handleAddFromAllMembers(ev, member) {
        ev.stopPropagation()
        const updateAllMembers = allMembers.filter(m => m.id !== member.id)
        const updateBoardMembers = selectedMembers.filter(m => m.id !== member.id)
        const updateTaskMembers = [...taskMembers, member]
        
        setSelectedFromAllMembers(updateAllMembers)
        setSelectedMembers(updateBoardMembers)
        onUpdated('members', updateTaskMembers)
        setTaskMembers(updateTaskMembers)
    }

    console.log(taskMembers)
    return (
        <div className="members-container">
            <h5 className="members-title">Members</h5>

            <div className="card-members">
                <span className="card-members-title">Card Members</span>
                <ul className="members-list">
                    {taskMembers.length > 0
                        ? taskMembers.map((member, idx) => (
                              <li className="member-item" key={member.id}>
                                  {member.imgUrl && (
                                      <img
                                          src={member.imgUrl}
                                          style={{
                                              borderRadius: '50%',
                                              width: '24px',
                                              marginInlineEnd: '10px',
                                          }}
                                      />
                                  )}
                                  {!member.imgUrl && (
                                      <span style={{ backgroundColor: member.color }}>
                                          {member.fullname[0]}
                                      </span>
                                  )}
                                  <span className="member-name">{member.fullname}</span>
                                  <button
                                      className="remove-member-btn"
                                      onClick={event =>
                                          handleRemoveMember(event, member)
                                      }>
                                      <MdClose size={16} />
                                  </button>
                              </li>
                          ))
                        : ''}
                </ul>
            </div>

            <div className="board-members">
                <span className="board-members-title">Board Members</span>
                <ul className="members-list">
                    {selectedMembers.map((member, idx) => (
                        <li
                            className="member-item"
                            key={member.id}
                            onClick={event => handleAddMember(event, member)}>
                            {member.imgUrl && (
                                <img
                                    src={member.imgUrl}
                                    style={{
                                        borderRadius: '50%',
                                        width: '24px',
                                        marginInlineEnd: '10px',
                                    }}
                                />
                            )}
                            {!member.imgUrl && (
                                <span style={{ backgroundColor: member.color }}>
                                    {member.fullname[0]}
                                </span>
                            )}
                            <span className="member-name">{member.fullname}</span>
                        </li>
                    ))}
                </ul>
            </div>
           {!selectedMembers.length > 0 && <div className="all-members">
                <span className="all-members-title">All Members</span>
                <ul className="members-list">
                    {selectedFromAllMembers.length > 0 && selectedFromAllMembers.map((member, idx) => (
                        <li
                            className="member-item"
                            key={member.id}
                            onClick={event => handleAddFromAllMembers(event, member)}>
                            {member.imgUrl && (
                                <img
                                    src={member.imgUrl}
                                    style={{
                                        borderRadius: '50%',
                                        width: '24px',
                                        marginInlineEnd: '10px',
                                    }}
                                />
                            )}
                            {!member.imgUrl && (
                                <span style={{ backgroundColor: member.color }}>
                                    {member.fullname[0]}
                                </span>
                            )}
                            <span className="member-name">{member.fullname}</span>
                        </li>
                    ))}
                </ul>
            </div>}
        </div>
    )
}
