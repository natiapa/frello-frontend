import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service";
import { loadBoard, addBoardMsg } from "../store/actions/board.actions";

import { GroupList } from "../cmps/GroupList";
import { SideBar } from "../cmps/Sidebar";
import { BoardHeader } from "../cmps/BoardHeader";
import { Outlet } from "react-router-dom";
import { TaskDetails } from "../cmps/TaskDetails";
import { BoardSideBar } from "../cmps/BoardSideBar";

export function BoardDetails() {
  const board = useSelector((storeState) => storeState.boardModule.board)
  const { boardId, groupId, taskId } = useParams()

  useEffect(() => {
    loadBoard(boardId);
  }, [boardId]);

  async function onAddBoardMsg(boardId) {
    try {
      await addBoardMsg(boardId, "bla bla " + parseInt(Math.random() * 10));
      showSuccessMsg(`Board msg added`);
    } catch (err) {
      showErrorMsg("Cannot add board msg");
    }
  }

  const group = board?.groups?.find((group) => group.id === groupId);
  const task = group?.tasks?.find((task) => task.id === taskId);

  if (taskId && !task) return;

  return (
    <section
      className="board-details"
      style={{
        backgroundImage: `url(${board?.style?.backgroundImage})`,
      }}
    >
      <BoardHeader />

      {board && <BoardSideBar board={board} />}
      {board && <GroupList groups={board.groups} />}
      {taskId && <TaskDetails boardId={boardId} task={task} />}

      {/* <button
                onClick={() => {
                    onAddBoardMsg(board._id)
                }}>
                Add board msg
            </button> */}
    </section>
  );
}
