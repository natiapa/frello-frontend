import { useState } from 'react'
import { FaRegStar, FaStar } from 'react-icons/fa'
import { updateBoard } from '../store/actions/board.actions'
import { GrFormNext, GrFormPrevious } from 'react-icons/gr'
import { blue } from '@mui/material/colors'

export function BoardSideBar({ board, bgColor }) {
    const [isStarred, setIsStarred] = useState(board.isStarred || false)
    const [isOpen, setIsOpen] = useState(false)

    async function onUpdateBoard(board, newStarredStatus) {
        try {
            const updatedBoard = await boardService.updateBoard(
                board,
                null,
                null,
                {
                    key: 'isStarred',
                    value: newStarredStatus,
                }
            )
            await updateBoard(updatedBoard)
        } catch (error) {
            console.error('Failed to update the board:', error)
        }
    }

    function handleIsStarred(ev) {
        ev.stopPropagation()
        ev.preventDefault()

        const newStarredStatus = !isStarred
        setIsStarred(newStarredStatus)

        onUpdateBoard(board, newStarredStatus)
    }
    return (
        <>
            {!isOpen && (
                <div
                    className="board-side-bar-toggle"
                    style={{ backgroundColor: bgColor }}>
                    <button
                        className="toggle-btn"
                        onClick={() => setIsOpen(!isOpen)}
                        style={{
                            backgroundColor: bgColor,
                        }}>
                        {' '}
                        <GrFormNext />
                    </button>
                </div>
            )}
            <section
                className="board-side-bar"
                style={{
                    opacity: isOpen ? 0.8 : 1,
                    backgroundColor: bgColor,
                    width: isOpen ? '260px' : '0px',
                    transform: isOpen ? 'translateX(0)' : 'translateX(-180px)',
                    transition: 'transform 0.3s ease',
                }}>
                <ul>
                    <li className="header">
                        <div className="logo">
                            {board.title[0]?.toUpperCase()}
                        </div>
                        <p>{`${board.title} Workspace`.substring(0, 10)}</p>
                        <div
                            className="closed"
                            onClick={() => setIsOpen(!isOpen)}>
                            <GrFormPrevious />
                        </div>
                    </li>
                    <li className="footer">
                        <h2>Your boards</h2>
                    </li>
                    <li className="item">
                        <img
                            src={
                                board.style?.backgroundImage
                                    ? board.style.backgroundImage
                                    : board.style.backgroundColor
                            }
                            alt=""
                        />
                        <p>{board.title}</p>
                        <button className="starred-btn">
                            {!board.isStarred && (
                                <div
                                    className="not-starred"
                                    onClick={ev => handleIsStarred(ev)}>
                                    <FaRegStar />
                                </div>
                            )}
                            {board.isStarred && (
                                <div
                                    className="starred"
                                    onClick={ev => handleIsStarred(ev)}>
                                    <FaStar />
                                </div>
                            )}
                        </button>
                    </li>
                </ul>
            </section>
        </>
    )
}
