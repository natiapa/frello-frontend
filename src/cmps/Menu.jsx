import { useEffect, useState } from "react";
import { Activities } from "./Activities";
import { ChangeBg } from "./ChangeBg";
import SvgIcon from "./SvgIcon";
import { IoIosArrowBack, IoMdList } from "react-icons/io";
import { useParams } from "react-router";
import { FaListCheck } from "react-icons/fa6";
import { MdOutlineContentCopy } from "react-icons/md";
import { IoShareSocialOutline } from "react-icons/io5";
import { Popover } from "@mui/material";
import { CopyBoard } from "./CopyBoard";
import {
  addBoard,
  updateBoard,
  removeBoard,
  addBoardMsg,
  loadBoard,
} from "../store/actions/board.actions";
import { ShareExportPrintBoard } from "./ShareExportPrintBoard";
import { userService } from "../services/user";

export function Menu({
  board,
  isMenuOpen,
  setIsMenuOpen,
  setCurrBoardBgStyle,
}) {
  const { boardId, taskId } = useParams();
  const [isActivitiesOpen, setIsActivitiesOpen] = useState(false);
  const [isChangeBgOpen, setIsChangeBgOpen] = useState(false);
  // const [copiedBoard, setCopiedBoard] = useState({});

  const [anchorEl, setAnchorEl] = useState(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [modalOpenByName, setModalOpenByName] = useState(null);
  const currUser = userService.getLoggedinUser();
  // const board = useSelector((storeState) => storeState.boardModule.board);

  // function handleCreateBoard(board) {
  //   console.log(board);
  //   onAddBoard(board);
  //   handleClosePopover();
  // }

  useEffect(() => {
    if (!currUser) return;
    socketService.emit("joinBoard", { boardId, currUser });
    console.log("Joining board room:", boardId);

    // socketService.on(SOCKET_EVENT_GROUPS_UPDATED, (updatedGroups) => {
    //   loadBoard(boardId);
    // });
    socketService.on(SOCKET_EVENT_ACTIVITIES_UPDATED, (updatedActivities) => {
      loadBoard(boardId);
    });

    return () => {
      // socketService.off(SOCKET_EVENT_GROUPS_UPDATED);
      socketService.off(SOCKET_EVENT_ACTIVITIES_UPDATED);
    };
  }, [boardId]);

  function handleClick(ev) {
    const currDataName = ev.currentTarget.getAttribute("data-name");
    setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);
    setAnchorEl(ev.currentTarget);
    setModalOpenByName(currDataName);
  }

  function handlePopoverClick(ev) {
    ev.stopPropagation();
  }

  if (taskId) setIsMenuOpen(false);
  return (
    <aside className="menu" style={{ transform: "translateX(0)" }}>
      {isActivitiesOpen && !isChangeBgOpen && (
        <Activities
          board={board}
          setIsActivitiesOpen={setIsActivitiesOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
      )}

      {isChangeBgOpen && !isActivitiesOpen && (
        <ChangeBg
          board={board}
          setIsChangeBgOpen={setIsChangeBgOpen}
          setIsMenuOpen={setIsMenuOpen}
          setCurrBoardBgStyle={setCurrBoardBgStyle}
        />
      )}

      {!isActivitiesOpen && !isChangeBgOpen && (
        <>
          {/* {!isActivitiesOpen && !isChangeBgOpen && <h3>Menu</h3>} */}
          <header className="menu-header">
            <span className="close-btn" onClick={() => setIsMenuOpen(false)}>
              <SvgIcon iconName="close" />
            </span>

            <h3>Menu</h3>
          </header>

          <button
            className="menu-btn"
            onClick={() => setIsActivitiesOpen(true)}
          >
            <FaListCheck />
            <span className="activity-btn">Activity</span>
          </button>

          <button
            className="change-bg menu-btn"
            onClick={() => setIsChangeBgOpen(true)}
          >
            <span
              className="color-container"
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
            <span className="change-bg-btn">Change background</span>
          </button>

          <button
            data-name="copy-board"
            aria-describedby="20"
            className="copy-board-btn menu-btn"
            onClick={handleClick}
          >
            <MdOutlineContentCopy />
            <span className="btn">Copy board</span>

            {modalOpenByName === "copy-board" && isPopoverOpen && (
              <Popover
                id={isPopoverOpen ? "copy-board" : undefined}
                open={isPopoverOpen}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                PaperProps={{
                  sx: {
                    width: "320px",
                    height: "400px",
                    padding: "20px",
                    borderRadius: "8px",
                  },
                }}
              >
                <CopyBoard
                  board={board}
                  handlePopoverClick={handlePopoverClick}
                  setIsPopoverOpen={setIsPopoverOpen}
                  setIsMenuOpen={setIsMenuOpen}
                  // onAddBoard={onAddBoard}
                  // copiedBoard={copiedBoard}
                  // setCopiedBoard={setCopiedBoard}
                />
              </Popover>
            )}
          </button>

          <button
            className="menu-btn"
            data-name="share-board"
            aria-describedby="20"
            onClick={handleClick}
          >
            <IoShareSocialOutline className="shae-icon" />
            <span className="share-btn btn">Print, export, and share</span>

            {modalOpenByName === "share-board" && isPopoverOpen && (
              <Popover
                id={isPopoverOpen ? "share-board" : undefined}
                open={isPopoverOpen}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                PaperProps={{
                  sx: {
                    width: "320px",
                    height: "350px",
                    padding: "20px",
                    borderRadius: "8px",
                  },
                }}
              >
                <ShareExportPrintBoard
                  board={board}
                  handlePopoverClick={handlePopoverClick}
                  setIsPopoverOpen={setIsPopoverOpen}
                  setIsMenuOpen={setIsMenuOpen}
                />
              </Popover>
            )}
          </button>
        </>
      )}
    </aside>
  );
}
