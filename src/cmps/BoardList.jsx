import { Link } from "react-router-dom";
import { userService } from "../services/user";
import { BoardPreview } from "./BoardPreview";
import { Popover } from "@mui/material";
import { useEffect, useState } from "react";
import { CreateBoardModal } from "./CreateBoardModal";
import { useNavigate } from "react-router-dom";
import { CiStar } from "react-icons/ci";
import { useSelector } from "react-redux";

export function BoardList({
  boards,
  onAddBoard,
  onRemoveBoard,
  // onUpdateBoard,
}) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalOpenByName, setModalOpenByName] = useState(null);
  const [columns, setColumns] = useState(4);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleResize() {
    const width = window.innerWidth;
    if (width <= 600) {
      setColumns(1);
    } else if (width <= 900) {
      setColumns(2);
    } else if (width <= 1200) {
      setColumns(3);
    } else {
      setColumns(4);
    }
  }

  function handleClick(ev) {
    const currDataName = ev.currentTarget.getAttribute("data-name");

    setAnchorEl(ev.currentTarget);
    setModalOpenByName(currDataName);
    setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);
  }

  function shouldShowActionBtns(board) {
    const user = userService.getLoggedinUser();

    if (!user) return false;
    if (user.isAdmin) return true;
    return board.owner?._id === user._id;
  }

  function handleCreateBoard(board) {
    console.log(board);
    onAddBoard(board);
    handleClosePopover();
  }

  function handleClosePopover() {
    setIsPopoverOpen(false);
    setAnchorEl(null);
    setModalOpenByName(null);
  }

  return (
    <ul
      className="board-list"
      style={{
        gridTemplateRows: `repeat(${Math.ceil(
          (boards.length + 1) / columns
        )}, 96px)`,
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
      }}
    >
      {boards &&
        boards.length &&
        boards.map((board, idx) => (
          <Link
            to={`/board/${board._id}`}
            key={idx}
            style={{
              backgroundImage: `url(${board?.style?.backgroundImage})`,
              display: "block",
            }}
          >
            <li key={board._id}>
              <BoardPreview board={board} />

              <div className="actions">
                {/* <button onClick={() => onUpdateBoard(board)}>Edit</button> */}
                <button
                  className="close-btn"
                  onClick={(ev) => onRemoveBoard(ev, board._id)}
                >
                  x
                </button>
              </div>
            </li>
          </Link>
        ))}
      <button
        aria-describedby="7"
        data-name="add-board"
        className="new-board-btn"
        onClick={handleClick}
        style={{
          gridRow: `${Math.floor(boards.length / columns) + 1}`,
          gridColumn: `${(boards.length % columns) + 1}`,
        }}
      >
        Create new board
      </button>
      {modalOpenByName === "add-board" && (
        <Popover
          id={anchorEl}
          open={isPopoverOpen}
          onClose={handleClosePopover}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          disablePortal
        >
          <CreateBoardModal handleCreateBoard={handleCreateBoard} />
        </Popover>
      )}
    </ul>
  );
}
