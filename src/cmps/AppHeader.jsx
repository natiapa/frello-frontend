import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserModal } from "./UserModal.jsx";
import { SearchBar } from "./SearchBar.jsx";
import { useNavigate } from "react-router-dom";
import { Popover } from "@mui/material";
import { BsChevronDown } from "react-icons/bs";
import SvgIcon from "./SvgIcon";
import { CreateBoardModal } from "./CreateBoardModal.jsx";
import { WorkspaceModal } from "./WorkspaceModal.jsx";
import { addBoard } from "../store/actions/board.actions.js";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
import { boardService } from "../services/board";

export function AppHeader({ bgColor, borderBottom, logoImg, logoColor, link }) {
  const [showUserModal, setShowUserModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [modalOpenByName, setModalOpenByName] = useState(null);

  const user = useSelector((storeState) => storeState.userModule.user);

  const navigate = useNavigate();

  async function onAddBoard(board) {
    const emptyBoard = boardService.getEmptyBoard();
    const boardToSave = {
      ...emptyBoard,
      title: board.title,
      style: {
        ...emptyBoard.style,
        backgroundImage: board.backgroundImage,
      },
    };
    try {
      boardService.updateActivities(
        boardToSave,
        "created this board",
        "createBoard"
      );
      boardService.updateActivities(
        boardToSave,
        "added this board to",
        "addBoard"
      );
      const savedBoard = await addBoard(boardToSave);
      console.log(savedBoard);
      navigate(`/board/${savedBoard._id}`);
      showSuccessMsg(`Board added (id: ${savedBoard._id})`);
    } catch (err) {
      showErrorMsg("Cannot add board");
    }
  }

  function handleClick(ev) {
    const currDataName = ev.currentTarget.getAttribute("data-name");
    setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);
    setAnchorEl(ev.currentTarget);
    setModalOpenByName(currDataName);
  }

  function handlePopoverClick(ev) {
    ev.stopPropagation();
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
    <header
      className="app-header full"
      style={{
        backgroundColor: `${bgColor}`,
        borderBottom: borderBottom,
      }}
    >
      <nav>
        <Link to={link}>
          <span className="logo-icon-img">
            <img src={logoImg} alt="" />
          </span>
          <span className="logo" style={{ color: `${logoColor}` }}>
            Frello
          </span>
        </Link>

        <button
          className="workspace-btn"
          data-name="workspace"
          aria-describedby="20"
          onClick={handleClick}
        >
          <span className="btn">Workspace</span>
          <BsChevronDown className="date-picker-icon" />
          {modalOpenByName === "workspace" && isPopoverOpen && (
            <Popover
              id={isPopoverOpen ? "workspace" : undefined}
              open={isPopoverOpen}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              PaperProps={{
                sx: {
                  width: "304px",
                  height: "104px",
                  // padding: "20px",
                  borderRadius: "8px",
                },
              }}
            >
              <WorkspaceModal setIsPopoverOpen={setIsPopoverOpen} />
            </Popover>
          )}
        </button>
        {/* <button
          className="create-btn"
          data-name="create"
          aria-describedby="20"
          onClick={handleClick}
        >
          <span className="btn">Create</span>
          {modalOpenByName === "create" && isPopoverOpen && (
            <Popover
              id={isPopoverOpen ? "create" : undefined}
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
        </button> */}
        <button
          aria-describedby="21"
          data-name="add-board"
          className="create-btn"
          onClick={handleClick}
        >
          Create
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
            // disablePortal
          >
            <CreateBoardModal handleCreateBoard={handleCreateBoard} />
          </Popover>
        )}
      </nav>
      {user && (
        <section className="header-right">
          <div className="user">
            {user.imgUrl && (
              <img
                src={user.imgUrl}
                style={{
                  width: "32px",
                  height: "32px",
                  padding: "4px",
                }}
              />
            )}
            {!user.imgUrl && (
              <img src="https://res.cloudinary.com/dj7k9bpa3/image/upload/v1631123736/avatar-1577909_1280_v0wz9o.png" />
            )}
          </div>
        </section>
      )}
    </header>
  );
}
