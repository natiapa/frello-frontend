import { CgProfile } from 'react-icons/cg'
import { getRandomColor } from '../services/util.service'
import { MdOutlineFilterList } from 'react-icons/md'
import { Popover } from '@mui/material'
import { useState } from 'react'
import { BoardFilter } from './BoardFilter'
import { boardService } from '../services/board'
import { useSelector } from 'react-redux'
import { filterBoard } from '../store/actions/board.actions'

export function BoardHeader({ members, bgColor }) {
    const [anchorEl, setAnchorEl] = useState(null)
    const [isPopoverOpen, setIsPopoverOpen] = useState(false)

    
    function handleClick(ev) {
        setAnchorEl(ev.currentTarget)
        setIsPopoverOpen(isOpen => !isOpen)
    }

    function clearFilter() {
        filterBoard(boardService.getDefaultFilter())
        
    }

    return (
        <section className="board-header">
            <div className="board-header-title">Frello</div>
            <div className="board-header-actions"></div>
            <div className="filter" onClick={handleClick}>
                <p>
                    <span>
                        <MdOutlineFilterList />
                    </span>
                    Filters
                    <Popover
                        id={anchorEl}
                        open={isPopoverOpen}
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}>
                        <BoardFilter />
                    </Popover>
                </p>
            </div>
                {/* <button className="btn-clear" onClick={clearFilter}>
                    Clear
                </button> */}
            <ul
                className="members"
                style={{
                    gridTemplateColumns: `repeat(${members.length}, 25px)`,
                }}>
                {members.map(member => (
                    <li key={member.id} className="member" style={{ backgroundColor: member.color }}>
                        {member.fullname[0]}
                    </li>
                ))}
            </ul>

            {/* <div className="board-header-icon">🔍</div>
      <div className="board-header-icon">➕</div> */}
        </section>
    )
}
