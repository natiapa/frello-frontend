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
import { TaskDetailsActions } from "../cmps/TaskDetailsActions";

import { FastAverageColor } from "fast-average-color";

import { updateBoard } from "../store/actions/board.actions";
import { LabelList } from "../cmps/LabelList";
import { boardService } from "../services/board";

export function BoardDetails() {
  const { boardId } = useParams();
  const board = useSelector((storeState) => storeState.boardModule.board);

  const [bgColor, setbgColor] = useState("");
  const [currGroup, setCurrGroup] = useState("");
  const [currTask, setCurrTask] = useState("");
  const [preview, setPreview] = useState({});
  const [currElToEdit, setCurrElToEdit] = useState("title");
  const [value, setValue] = useState("");
  const [isTaskPrevModalOpen, setIsTaskPrevModalOpen] = useState(false);
  const [taskPrevActionsModalData, setTaskPrevActionsModalData] = useState("");
  const [selectedLabels, setSelectedLabels] = useState([]);

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
  }, [board?.style?.backgroundImage, bgColor]);

  async function calculateBgColor() {
    const bgImage = await board?.style?.backgroundImage;

    if (bgImage) {
      const fac = new FastAverageColor();
      try {
        const color = await fac.getColorAsync(board.style.backgroundImage);
        setbgColor(color.hex);
        console.log(color);
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
    console.log("data:", data);
    setPreview({
      position: "absolute",
      left: `${data.elData.left}px`,
      top: `${data.elData.top}px`,
      width: `${data.elData.width}px`,
      height: `${data.elData.height}px`,
      zIndex: "1000",
    });

    setTaskPrevActionsModalData({
      position: "fixed",
      left: `${data.elData.left + 260}px`,
      top: `${data.elData.top}px`,
      width: `max-content`,
      height: `max-content`,
      zIndex: "1000",
    });
    setIsTaskPrevModalOpen((isOpenModal) => !isOpenModal);

    setCurrElToEdit(data.dataName);
    setCurrGroup(data.group);
    setCurrTask(data.task);
    setValue(data.task.title);
    setSelectedLabels(data.task.labels || []);
  }

  async function onUpdated(name, value) {
    if (!board) return;
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
    } catch (error) {
      console.error("Failed to update the board:", error);
    }
  }

  function handleSave(ev) {
    ev.preventDefault();
    if (!board) return;

    if (currElToEdit === "title") {
      onUpdated(currElToEdit, value);
      setIsTaskPrevModalOpen((isOpenModal) => !isOpenModal);
    }

    if (currElToEdit === "labels") {
      onUpdated("labels", selectedLabels);
    }
  }
  if (!board) return;

  return (
    <>
      <section
        className="board-details"
        style={{
          backgroundImage: `url(${board?.style?.backgroundImage})`,
        }}
      >
        {isTaskPrevModalOpen && (
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
              <div className="labels">
                <LabelList labels={selectedLabels} />
              </div>

              <form onSubmit={handleSave}>
                <textarea
                  value={value || ""}
                  onChange={(ev) => setValue(ev.target.value)}
                />

                <button className="save-btn" type="submit">
                  <span>Save</span>
                </button>
              </form>
            </div>

            {taskPrevActionsModalData && (
              <TaskDetailsActions
                boardId={boardId}
                groupId={currGroup.id}
                taskId={currTask.id}
                task={currTask}
                taskPrevActionsModalData={taskPrevActionsModalData}
                setIsTaskPrevModalOpen={setIsTaskPrevModalOpen}
                selectedLabels={selectedLabels}
                setSelectedLabels={setSelectedLabels}
              />
            )}
          </section>
        )}

        <AppHeader
          bgColor={bgColor}
          logoImg="https://www.pngkey.com/png/full/213-2134177_import-boards-from-trello-trello-logo-white.png"
          logoColor="#fff"
        />
        {/* {board?.members && board.members.length && ( */}
        <BoardHeader members={board?.members} bgColor={bgColor} />
        {/* )} */}

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
