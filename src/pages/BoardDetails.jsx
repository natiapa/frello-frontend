import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";

import {
  showSuccessMsg,
  showErrorMsg,
  eventBus,
} from "../services/event-bus.service";
import { loadBoard, addBoardMsg } from "../store/actions/board.actions";

import { GroupList } from "../cmps/GroupList";
import { SideBar } from "../cmps/Sidebar";
import { BoardHeader } from "../cmps/BoardHeader";
// import { Outlet } from "react-router-dom"
import { BoardSideBar } from "../cmps/BoardSideBar";
import { AppHeader } from "../cmps/AppHeader";

import { FastAverageColor } from "fast-average-color";

import { updateBoard } from "../store/actions/board.actions";

export function BoardDetails() {
  const { boardId } = useParams();
  const [bgColor, setbgColor] = useState();
  const [currGroup, setCurrGroup] = useState("");
  const [currTask, setCurrTask] = useState("");
  const [preview, setPreview] = useState({});
  const [currElToEdit, setCurrElToEdit] = useState("title");
  const [value, setValue] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);

  const board = useSelector((storeState) => storeState.boardModule.board);

  useEffect(() => {
    eventBus.on("show-task", onPreviewToShow);
  }, []);

  useEffect(() => {
    loadBoard(boardId);
    if (!preview?.length) return;
    setPreview(preview);
  }, [boardId, preview]);

  useEffect(() => {
    calculateBgColor();
  }, [board?.style?.backgroundImage]);

  async function calculateBgColor() {
    if (board?.style?.backgroundImage) {
      const fac = new FastAverageColor();
      try {
        const color = await fac.getColorAsync(board.style.backgroundImage);
        setbgColor(color.hex);
      } catch (error) {
        console.error("Failed to calculate background color:", error);
      }
    }
  }

  // async function onUpdateBoard(newBoard) {
  //   try {
  //     await updateBoard(newBoard);
  //     loadBoard(boardId); //***check if there is other way.***
  //     // showSuccessMsg("Board U");
  //   } catch (err) {
  //     showErrorMsg("Cannot update board");
  //   }
  // }

  // async function onAddBoardMsg(boardId) {
  //   try {
  //     await addBoardMsg(boardId, "bla bla " + parseInt(Math.random() * 10));
  //     showSuccessMsg(`Board msg added`);
  //   } catch (err) {
  //     showErrorMsg("Cannot add board msg");
  //   }
  // }

  function onPreviewToShow(data) {
    console.log(data);

    setPreview({
      position: "absolute",
      left: `${data.elData.left}px`,
      top: `${data.elData.top}px`,
      width: `${data.elData.width}px`,
      height: `${data.elData.height}px`,
      zIndex: "1000",
    });
    setIsOpenModal((isOpenModal) => !isOpenModal);

    setCurrElToEdit(data.dataName);
    setCurrGroup(data.group);
    setCurrTask(data.task);
    setValue(data.task.title);
  }

  async function onUpdated(name, value) {
    try {
      const updatedBoard = boardService.updateBoard(
        board,
        currGroup.id,
        currTask.id,
        {
          key: name,
          value: value,
        }
      );
      await updateBoard(updatedBoard);
      await loadBoard(boardId);
      // console.log(currTask);
    } catch (error) {
      console.error("Failed to update the board:", error);
    }
  }

  async function handleSave(ev) {
    ev.preventDefault();

    if (currElToEdit === "title") {
      onUpdated(currElToEdit, value);
      setIsOpenModal((isOpenModal) => !isOpenModal);
    }
  }
  console.log(preview);
  if (!board) return;

  return (
    <>
      <section
        className="board-details"
        style={{
          backgroundImage: `url(${board?.style?.backgroundImage})`,
        }}
      >
        {isOpenModal && (
          <section>
            <div
              onClick={handleSave}
              className="task-preview-modal-overlay"
            ></div>
            <div
              className="task-preview-modal"
              style={{ ...preview }}
              method="dialog"
            >
              <form style={{ height: "100%" }} onSubmit={handleSave}>
                <textarea
                  value={value || ""}
                  onChange={(ev) => setValue(ev.target.value)}
                />

                <button type="submit">save</button>
              </form>
            </div>
          </section>
        )}

        <AppHeader bgColor={bgColor} />
        {board?.members && board.members.length && (
          <BoardHeader members={board.members} bgColor={bgColor} />
        )}

        {board && <BoardSideBar board={board} bgColor={bgColor} />}
        {board && <GroupList groups={board.groups} />}
        {/* {taskId && <TaskDetails board={board} group={group} task={task} onUpdateBoard={onUpdateBoard} />} */}

        {/* <button
                onClick={() => {
                    onAddBoardMsg(board._id)
                }}>
                Add board msg
            </button> */}

        <Outlet />
      </section>
    </>
  );
}
