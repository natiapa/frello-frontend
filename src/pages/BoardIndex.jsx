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

  async function onRemoveBoard(boardId) {
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
      navigate(`/board/${savedBoard._id}`);
    } catch (err) {
      showErrorMsg("Cannot add board");
    }
  }

  async function onUpdateBoard(board) {
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
      <AppHeader borderBottom="1px solid #ddd" />
      <section className="board-index">
        <SideBar />

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
