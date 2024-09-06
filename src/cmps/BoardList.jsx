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
  starredBoards,
  onAddBoard,
  onRemoveBoard,
  // onUpdateBoard,
}) {
  console.log(boards);
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
    <section
      className="board-list-container"
      style={{
        gridRow: starredBoards.length > 0 ? "3" : "2",
      }}
    >
      {boards.length > 0 && (
        <h3 className="board-list-title">YOUR WORKSPACES</h3>
      )}

      <ul
        className="board-list"
        style={{
          placeSelf: boards.length > 0 ? "" : "center",
          gridTemplateRows: `repeat(${Math.ceil(
            (boards.length + 1) / columns
          )}, 96px)`,
          gridTemplateColumns:
            boards.length > 1 ? `repeat(${columns}, .1fr)` : ``,
          gap: boards.length > 0 ? "1em" : "",
        }}
      >
        {boards.length > 0 &&
          boards.length &&
          boards.map((board, idx) => (
            <Link
              to={`/board/${board._id}`}
              key={idx}
              style={{
                backgroundImage: `url(${board?.style?.backgroundImage})`,

                backgroundColor: board?.style?.backgroundColor,

                // background: board.style.backgroundColor
                //   ? `linear-gradient(to right bottom,  ${
                //       board.style.backgroundColor
                //     } 0%, ${darkenColor(
                //       board.style.backgroundColor,
                //       0.2
                //     )} 100%)`
                //   : "",
                display: "block",
              }}
            >
              <li key={board._id}>
                <BoardPreview board={board} />

                <div className="actions">
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
            gridRow:
              boards.length > 0
                ? `${Math.floor(boards.length / columns) + 1}`
                : "1",
            gridColumn: `${(boards.length % columns) + 1}`,
            transition:
              "transform 0.3s ease ,grid-column 0.3s ease, grid-row 0.3s ease",
            transform: boards.length > 0 ? "scale(1)" : "scale(1.1)",
          }}
        >
          Create new board
        </button>
        {modalOpenByName === "add-board" && (
          <Popover
            id={anchorEl}
            open={isPopoverOpen}
            // onClose={handleClosePopover}
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
    </section>
  );
}
