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
import { AppHeader } from "../cmps/AppHeader";

import { FastAverageColor } from "fast-average-color";

export function BoardDetails() {
  const { boardId, groupId, taskId } = useParams();
  const [headerBgColor, setHeaderBgColor] = useState();

  const board = useSelector((storeState) => storeState.boardModule.board);

  useEffect(() => {
    loadBoard(boardId);
  }, [boardId]);

  useEffect(() => {
    async function calculateBgColor() {
      if (board?.style?.backgroundImage) {
        const fac = new FastAverageColor();
        try {
          const color = await fac.getColorAsync(board.style.backgroundImage);
          setHeaderBgColor(color.hex);
          console.log(color.hex);
        } catch (error) {
          console.error("Failed to calculate background color:", error);
        }
      }
    }
    calculateBgColor();
  }, [board?.style?.backgroundImage]);

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
    <>
      <section
        className="board-details"
        style={{
          backgroundImage: `url(${board?.style?.backgroundImage})`,
        }}
      >
        <AppHeader bgColor={headerBgColor} />
        <BoardHeader bgColor={headerBgColor} />

        {board && <BoardSideBar board={board} bgColor={headerBgColor} />}
        {board && <GroupList groups={board.groups} />}
        {taskId && <TaskDetails boardId={boardId} task={task} />}

        {/* <button
                onClick={() => {
                    onAddBoardMsg(board._id)
                }}>
                Add board msg
            </button> */}
      </section>
    </>
  );
}
