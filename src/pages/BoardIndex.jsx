import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import {
  loadBoards,
  addBoard,
  updateBoard,
  removeBoard,
  addBoardMsg,
} from "../store/actions/board.actions";

import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service";
import { boardService } from "../services/board";
import { userService } from "../services/user";

import { BoardList } from "../cmps/BoardList";
import { BoardFilter } from "../cmps/BoardFilter";
import { SideBar } from "../cmps/Sidebar";
import { AppHeader } from "../cmps/AppHeader";
import { useNavigate } from "react-router";
import { StarredBoardsList } from "../cmps/StarredBoardsList";

export function BoardIndex() {
  const [filterBy, setFilterBy] = useState(boardService.getDefaultFilter());
  const boards = useSelector((storeState) => storeState.boardModule.boards);
  const starredBoards = Array.isArray(boards)
    ? boards.filter((board) => board.isStarred)
    : [];

  useEffect(() => {
    loadBoards();
  }, [boards.length]);

  useEffect(() => {
    loadBoards(filterBy);
  }, [filterBy]);

  async function onRemoveBoard(ev, boardId) {
    ev.preventDefault();
    ev.stopPropagation();
    try {
      await removeBoard(boardId);
      showSuccessMsg("Board removed");
    } catch (err) {
      showErrorMsg("Cannot remove board");
    }
  }

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
      const savedBoard = await addBoard(boardToSave);
      showSuccessMsg(`Board added (id: ${savedBoard._id})`);
      // navigate(`/board/${savedBoard._id}`);
    } catch (err) {
      showErrorMsg("Cannot add board");
    }
  }

  async function onUpdateBoard(ev, board) {
    ev.preventDefault();
    ev.stopPropagation();
    const title = prompt(board.title);
    board.title = title;
    try {
      await updateBoard(board);
      showSuccessMsg("Board updated");
    } catch (err) {
      showErrorMsg("Cannot update board");
    }
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

  function darkenColor(color, amount) {
    let col = color.substring(1);
    let num = parseInt(col, 16);

    let r = (num >> 16) - Math.round(255 * amount);
    let g = ((num >> 8) & 0x00ff) - Math.round(255 * amount);
    let b = (num & 0x0000ff) - Math.round(255 * amount);

    // Ensure the values stay in the 0-255 range
    r = r < 0 ? 0 : r > 255 ? 255 : r;
    g = g < 0 ? 0 : g > 255 ? 255 : g;
    b = b < 0 ? 0 : b > 255 ? 255 : b;

    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
  }

  return (
    <>
      <AppHeader
        borderBottom="1px solid #ddd"
        logoImg="https://cdn.icon-icons.com/icons2/2699/PNG/512/trello_logo_icon_167765.png"
        logoColor="#0c66e4"
      />
      <section
        className="board-index"
        style={{
          backgroundImage: `url(https://cdn.pixabay.com/photo/2017/02/19/11/19/background-2079405_1280.jpg)`,
          backgroundSize: "cover",
          gridTemplateColumns:
            boards.length > 0
              ? `minmax(1rem, 1fr) auto minmax(1rem, 1fr)`
              : "1",
          rowGap: "2em",
        }}
      >
        {/* <SideBar /> */}

        <StarredBoardsList
          starredBoards={starredBoards}
          onRemoveBoard={onRemoveBoard}
          darkenColor={darkenColor}
        />
        {/* <BoardFilter filterBy={filterBy} setFilterBy={setFilterBy} /> */}
        <BoardList
          boards={boards}
          starredBoards={starredBoards}
          onAddBoard={onAddBoard}
          onRemoveBoard={onRemoveBoard}
          onUpdateBoard={onUpdateBoard}
          darkenColor={darkenColor}
        />
      </section>
    </>
  );
}
