import { useEffect, useState } from "react";
import { boardService } from "../services/board";
import { updateBoard } from "../store/actions/board.actions";
import { FaRegStar, FaStar } from "react-icons/fa";

export function BoardPreview({ board }) {
  const [isStarred, setIsStarred] = useState(board.isStarred || false);
  useEffect(() => {
    setIsStarred(board.isStarred);
  }, [board.isStarred]);

  function handleIsStarred(ev) {
    ev.stopPropagation();
    ev.preventDefault();

    const newStarredStatus = !isStarred;
    setIsStarred(newStarredStatus);

    onUpdateBoard(board, newStarredStatus);
  }

  async function onUpdateBoard(board, newStarredStatus) {
    try {
      const updatedBoard = await boardService.updateBoard(board, null, null, {
        key: "isStarred",
        value: newStarredStatus,
      });
      await updateBoard(updatedBoard);
    } catch (error) {
      console.error("Failed to update the board:", error);
    }
  }

  return (
    <article className="board-preview">
      <span>{board.title}</span>
      <button className="starred-btn">
        {!board.isStarred && (
          <div className="not-starred" onClick={(ev) => handleIsStarred(ev)}>
            <FaRegStar />
          </div>
        )}
        {board.isStarred && (
          <div className="starred" onClick={(ev) => handleIsStarred(ev)}>
            <FaStar />
          </div>
        )}
      </button>
    </article>
  );
}
