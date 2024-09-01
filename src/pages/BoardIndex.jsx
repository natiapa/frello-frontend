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

export function BoardIndex() {
  const [filterBy, setFilterBy] = useState(boardService.getDefaultFilter());
  const boards = useSelector((storeState) => storeState.boardModule.boards);
  console.log(boards);
  const navigate = useNavigate();

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
          // backgroundImage: `url(https://cdn.pixabay.com/photo/2022/06/08/05/47/stars-7249785_1280.jpg)`,
          // backgroundImage: `url(https://cdn.pixabay.com/photo/2015/03/11/19/19/violet-669046_1280.jpg)`,
          backgroundSize: "cover",
        }}
      >
        {/* <SideBar /> */}

        {/* <BoardFilter filterBy={filterBy} setFilterBy={setFilterBy} /> */}
        <BoardList
          boards={boards}
          onAddBoard={onAddBoard}
          onRemoveBoard={onRemoveBoard}
          onUpdateBoard={onUpdateBoard}
        />
      </section>
    </>
  );
}
