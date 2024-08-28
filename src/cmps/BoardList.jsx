import { Link } from "react-router-dom";
import { userService } from "../services/user";
import { BoardPreview } from "./BoardPreview";
import { Popover } from "@mui/material";
import { useState } from "react";
import { CreateBoardModal } from "./CreateBoardModal";

export function BoardList({
  boards,
  onAddBoard,
  onRemoveBoard,
  onUpdateBoard,
}) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  function handleClick(ev) {
    setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);
  }

  function shouldShowActionBtns(board) {
    const user = userService.getLoggedinUser();

    if (!user) return false;
    if (user.isAdmin) return true;
    return board.owner?._id === user._id;
  }

  function handleStartBoard(board) {
    console.log(board);
    onAddBoard(board);
  }

  return (
    <ul className="board-list">
      <header>
        <h2>Demo boards</h2>
      </header>
      {boards &&
        boards.length &&
        boards.map((board) => (
          <li key={board._id}>
            <BoardPreview board={board} />
            <Link to={`/board/${board._id}`}>{board.title}</Link>
            <div className="actions">
              <button onClick={() => onUpdateBoard(board)}>Edit</button>
              <button onClick={() => onRemoveBoard(board._id)}>x</button>
            </div>
          </li>
        ))}
      <button
        data-name="add-board"
        className="new-board"
        // onClick={() => onAddBoard()}
        onClick={handleClick}
        style={{ width: "200px", height: "200px" }}
      >
        Create new board
      </button>
      {isPopoverOpen && (
        <CreateBoardModal handleStartBoard={handleStartBoard} />
      )}
    </ul>
  );
}
