import { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { updateBoard } from "../store/actions/board.actions";

export function StarredBoardsModal({
  starredBoards,
  setIsPopoverOpen,
  handlePopoverClick,
}) {
  const [hoveredBoardId, setHoveredBoardId] = useState(null);
  const navigate = useNavigate();

  async function onUpdated(board, name, value) {
    if (!board) return;
    try {
      const updatedBoard = await boardService.updateBoard(board, null, null, {
        key: name,
        value: value,
      });
      await updateBoard(updatedBoard);
    } catch (error) {
      console.error("Failed to update the board:", error);
    }
  }

  function handleIsStarred(ev, board) {
    ev.stopPropagation();
    ev.preventDefault();
    onUpdated(board, "isStarred", false);
  }

  function handleLinkClick(boardId) {
    navigate(`/board/${boardId}`);
    setIsPopoverOpen(false);
  }

  return (
    <>
      {!starredBoards || starredBoards.length === 0 ? (
        <div
          className="no-starred-boards-container"
          onClick={handlePopoverClick}
        >
          <span
            className="img"
            style={{
              backgroundImage:
                "url(https://trello.com/assets/cc47d0a8c646581ccd08.svg)",
              backgroundSize: "cover",
            }}
          ></span>
          <span className="text">
            Star important boards to access them quickly and easily.
          </span>
        </div>
      ) : (
        <ul
          className="starred-boars-list"
          style={{
            gridTemplateRows: `repeat(${starredBoards.length},max-content)`,
          }}
          onClick={handlePopoverClick}
        >
          {starredBoards.map((board) => (
            <a
              className="link"
              onClick={() => handleLinkClick(board._id)}
              key={board._id}
            >
              <li>
                <span
                  className="bg"
                  style={{
                    backgroundColor: board?.style?.backgroundColor
                      ? board.style.backgroundColor
                      : "none",
                    backgroundImage: board?.style?.backgroundImage
                      ? `url(${board.style.backgroundImage})`
                      : "none",
                    backgroundSize: "cover",
                  }}
                ></span>
                <section className="titles">
                  <span className="board-title">{board.title}</span>
                  <span className="workspace-title">Frello Workspace</span>
                </section>
                <div
                  className="starred"
                  onClick={(ev) => handleIsStarred(ev, board)}
                  onMouseEnter={() => setHoveredBoardId(board._id)}
                  onMouseLeave={() => setHoveredBoardId(null)}
                >
                  {hoveredBoardId === board._id ? <FaRegStar /> : <FaStar />}
                </div>
              </li>
            </a>
          ))}
        </ul>
      )}
    </>
  );
}
