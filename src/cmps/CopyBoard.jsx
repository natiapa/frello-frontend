import { useEffect, useState } from "react";
import SvgIcon from "./SvgIcon";
import { LiaChevronDownSolid } from "react-icons/lia";
import { addBoard } from "../store/actions/board.actions";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { boardService } from "../services/board";
import { userService } from "../services/user";
import { makeId } from "../services/util.service";
import { useNavigate } from "react-router";

export function CopyBoard({
  board,
  setIsPopoverOpen,
  onAddBoard,
  handlePopoverClick,
  setIsMenuOpen,
  //   copiedBoard,
  //   setCopiedBoard,
  handleCreateCopiedBoard,
}) {
  const [copiedBoardTitle, setCopiedBoardTitle] = useState("");
  const [isKeepCards, setIsKeepCards] = useState(true);
  const [copiedBoard, setCopiedBoard] = useState({});
  const navigate = useNavigate();

  function handleCopiedBoardTitle({ target }) {
    const { value } = target;
    setCopiedBoardTitle(value);
  }

  function handleCheckboxClick() {
    setIsKeepCards((isKeepCards) => !isKeepCards);
  }

  function handleCreateBtnClick() {
    const boardToCopy = {
      ...board,
      title: copiedBoardTitle,
      isKeepCards: isKeepCards,
    };
    setCopiedBoard(boardToCopy);
    onAddBoard(boardToCopy);
  }

  async function onAddBoard(boardToCopy) {
    const emptyBoard = boardService.getEmptyBoard();
    const originalBoard = board;
    const groupsWithoutMembers = board.groups.map((group) => ({
      ...group,
      tasks: group.tasks.map((task) => ({
        ...task,
        members: [],
      })),
    }));

    const boardToSave = {
      ...emptyBoard,
      title: boardToCopy.title,
      createdBy: userService.getLoggedinUser(),
      activities: [],
      members: [
        {
          _id: "u121",
          fullname: "Abi Abambi",
          imgUrl: "http://some-img",
          color: "#000",
        },
      ],
      groups: boardToCopy.isKeepCards ? groupsWithoutMembers : [],
      style: {
        ...emptyBoard.style,
        ...board.style,
      },
    };
    console.log(board.title);
    try {
      boardService.updateActivities(
        boardToSave,
        "copied this board",
        "copyBoard",
        null,
        null,
        null,
        null,
        null,
        null,
        originalBoard
      );

      boardService.updateActivities(
        boardToSave,
        "added this board to",
        "addBoard"
      );
      const savedBoard = await addBoard(boardToSave);
      console.log(savedBoard);
      navigate(`/board/${savedBoard._id}`);
      setIsPopoverOpen(false);
      setIsMenuOpen(false);
      showSuccessMsg(`Board copied (id: ${savedBoard._id})`);
    } catch (err) {
      showErrorMsg("Cannot add board");
    }
  }

  return (
    <div className="copy-board-container" onClick={handlePopoverClick}>
      <header className="copy-board-header">
        <span className="close-btn" onClick={() => setIsPopoverOpen(false)}>
          <SvgIcon iconName="close" />
        </span>
        <h3>Copy board</h3>
      </header>
      <section className="user-choice">
        <label className="choice-board-title title">Title</label>
        <input
          type="text"
          value={copiedBoardTitle}
          onChange={handleCopiedBoardTitle}
          placeholder='Like "Team Product Sprint" for example...'
        />
        <span className="workspace-title title">Workspace</span>
        <span className="workspace-name">Frello workspace</span>
        <div className="check">
          <input
            type="checkbox"
            name="isChecked"
            checked={isKeepCards}
            onChange={handleCheckboxClick}
          />
          <span>Keep cards</span>
        </div>
        <span className="disclaimer">
          Activity, comments, and members will not be copied to the new board.
        </span>
        <div
          role="button"
          className="copy-board-create-btn"
          onClick={handleCreateBtnClick}
          style={{
            cursor: copiedBoardTitle && "pointer",
            color: copiedBoardTitle && "#fff",
            backgroundColor: copiedBoardTitle && "#0c66e4",
            borderRadius: copiedBoardTitle && "3px",
          }}
        >
          Create
        </div>
      </section>
    </div>
  );
}
