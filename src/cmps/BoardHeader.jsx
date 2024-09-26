import { CgProfile } from 'react-icons/cg'
import { getRandomColor } from '../services/util.service'
import { MdOutlineFilterList } from 'react-icons/md'
import { Popover } from '@mui/material'
import { useState } from 'react'
import { BoardFilter } from './BoardFilter'
import { boardService } from '../services/board'
import { useSelector } from 'react-redux'
import { filterBoard, updateBoard } from '../store/actions/board.actions'
import { RxDotsHorizontal } from 'react-icons/rx'
import { HiDotsHorizontal } from 'react-icons/hi'
import { useParams } from 'react-router'
import { Activities } from './Activities'
import { TbDots } from 'react-icons/tb'
import { FaRegStar, FaStar } from 'react-icons/fa'
import { BsPersonPlus } from 'react-icons/bs'
import { MemberPicker } from './MemberPicker'
import { AllMembersPicker } from './AllMembersPicker'
import { RiUserAddLine } from 'react-icons/ri'

export function BoardHeader({
  members,
  bgColor,
  allowDrop,
  drag,
  setIsMenuOpen,
  isMenuOpen,
  setNewBoardMembers,
}) {
  const board = useSelector(storeState => storeState.boardModule.board)
  const users = useSelector(storeState => storeState.userModule.users)
  const [anchorEl, setAnchorEl] = useState(null)
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isClearFilter, setIsClearFilter] = useState(false)
  const [modalOpenByName, setModalOpenByName] = useState(null)
  // const [isShareOpen, setIsShareOpen] = useState(false);
  function handleFilterClick(ev) {
    const currDataName = ev.currentTarget.getAttribute('data-name')
    setIsClearFilter(true)
    setAnchorEl(ev.currentTarget)
    setModalOpenByName(currDataName)
    setIsPopoverOpen(isOpen => !isOpen)
  }

  function handleClick(ev) {
    ev.stopPropagation()
    const currDataName = ev.currentTarget.getAttribute('data-name')
    setIsPopoverOpen(isPopoverOpen => !isPopoverOpen)
    setAnchorEl(ev.currentTarget)
    setModalOpenByName(currDataName)
    console.log(currDataName)
  }

  function handlePopoverClick(ev) {
    ev.stopPropagation()
  }

  function handleMenuBtnClick() {
    setIsMenuOpen(true)
  }

  function clearFilter(ev) {
    ev.stopPropagation()
    setIsClearFilter(false)
    filterBoard(boardService.getDefaultFilter())
  }

  async function onUpdated(name, value) {
    if (!board) return
    try {
      const updatedBoard = await boardService.updateBoard(board, null, null, {
        key: name,
        value: value,
      })
      await updateBoard(updatedBoard)
    } catch (error) {
      console.error('Failed to update the board:', error)
    }
  }

  function setStarred() {
    if (board.isStarred) return false
    else return true
  }

  function handleIsStarred(ev) {
    ev.stopPropagation()
    ev.preventDefault()
    setStarred()
    onUpdated('isStarred', setStarred())
  }

  return (
    <section
      className='board-header'
      style={{
        gridColumn: isMenuOpen ? '2/3' : '2/-1',
        columnGap: isMenuOpen ? '1em' : '',
      }}>
      <div className='board-header-title'>{board?.title}</div>
      <div
        className='starred'
        onClick={ev => handleIsStarred(ev)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
        {!board.isStarred || isHovered ? <FaRegStar /> : <FaStar />}
      </div>

      <div
        role='button'
        data-name='members'
        className='members all-members-btn'
        aria-describedby='30'
        onClick={handleClick}
        style={{
          placeSelf: 'center',
          backgroundColor: '#fff',
          gridColumn: isMenuOpen ? '5' : '4',
        }}>
        <RiUserAddLine />
        <span>Share</span>

        {modalOpenByName === 'members' && isPopoverOpen && (
          <Popover
            id={isPopoverOpen ? 'members-popover' : undefined}
            open={isPopoverOpen}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            PaperProps={{
              sx: {
                width: '304px',
                padding: '20px',
              },
            }}>
            <AllMembersPicker
              setNewBoardMembers={setNewBoardMembers}
              members={members}
              users={users}
              onUpdated={onUpdated}
            />
          </Popover>
        )}
      </div>

      <div
        className='filter'
        data-name='filter'
        onClick={handleFilterClick}
        style={{
          gridColumn: '2',
        }}>
        <p>
          <span>
            <MdOutlineFilterList />
          </span>
          <span>Filters</span>
          {modalOpenByName === 'filter' && isPopoverOpen && (
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
          )}
        </p>
        {isClearFilter && (
          <button className='btn-clear' onClick={clearFilter}>
            Clear
          </button>
        )}
      </div>
      {members && (
        <ul
          className='members'
          onDragOver={ev => allowDrop(ev)}
          style={{
            gridColumn: isMenuOpen ? '4' : '3',
            gridTemplateColumns: `repeat(${members.length}, 26px)`,
            placeSelf: 'center end',
          }}>
          {members.map((member, idx) => (
            <li
              key={member._id}
              id={member._id}
              className='member'
              draggable={true}
              onDragStart={ev => drag(ev)}
              style={{
                gridColumn: `${idx + 1}`,
                marginLeft: idx * -0.1 + 'px',
                zIndex: members.length - idx,
                borderRadius: '50%',
                backgroundImage: member.imgUrl ? `url(${member.imgUrl})` : 'none',
                backgroundColor: !member.imgUrl ? member.color : 'transparent',
                backgroundSize: 'cover',
              }}></li>
          ))}
        </ul>
      )}

      {!isMenuOpen && (
        <div
          className='activity-menu'
          data-name='activities'
          onClick={handleMenuBtnClick}>
          <span>
            <TbDots />
          </span>
        </div>
      )}
    </section>
  )
}
