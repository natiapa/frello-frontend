import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import chroma from "chroma-js";

import { updateBoard } from "../store/actions/board.actions";
import { LabelList } from "../cmps/LabelList";
import { boardService } from "../services/board";
import { Activities } from "../cmps/Activities";
import { MemberList } from "../cmps/MemberList";
import { IoMdCheckboxOutline } from "react-icons/io";
import { Menu } from "../cmps/Menu";
import { DueDateDisplay } from "../cmps/DueDateDisplay";

export function BoardDetails() {
  const { boardId, taskId } = useParams();
  const board = useSelector((storeState) => storeState.boardModule.board);

  const filterBy = useSelector(
    (storeState) => storeState.boardModule.filterBoard
  );
  const [bgColor, setBgColor] = useState("");
  const [currGroup, setCurrGroup] = useState("");
  const [currTask, setCurrTask] = useState("");
  const [preview, setPreview] = useState({});
  const [currElToEdit, setCurrElToEdit] = useState("title");
  const [value, setValue] = useState("");
  const [isTaskPrevModalOpen, setIsTaskPrevModalOpen] = useState(false);
  const [taskPrevActionsModalData, setTaskPrevActionsModalData] = useState("");
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currBoardBgStyle, setCurrBoardBgStyle] = useState('')

  const [boardSelectedLabels, setBoardSelectedLabels] = useState(board?.labels);
  const [taskSelectedLabels, setTaskSelectedLabels] = useState(currTask.labels);

  const [newDueDate, setNewDueDate] = useState(currTask.dueDate);
  const [currCover, setCurrCover] = useState(currTask.cover);
  const [taskMembers, setTaskMembers] = useState(currTask?.members);

  const [anchorEl, setAnchorEl] = useState(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [modalOpenByName, setModalOpenByName] = useState(null);

console.log(currBoardBgStyle)


  useEffect(() => {
    if (currTask) {
      setNewDueDate(currTask.dueDate);
      setCurrCover(currTask.cover);
      setTaskMembers(currTask.members);
      
  console.log("currTask", currTask);
  console.log("taskMembers", taskMembers);

    }
  }, [currTask]);
 

  useEffect(() => {
    eventBus.on("show-task", onPreviewToShow);
  }, []);

  useEffect(() => {
    loadBoard(boardId, filterBy);
    if (!preview?.length) return;
    setPreview(preview);
  }, [boardId, preview, filterBy]);

  useEffect(() => {
    calculateBgColor();
  }, [board?.style, bgColor, currBoardBgStyle]);

  useEffect(() => {
    loadBoard(boardId);
  },[currBoardBgStyle.style]);

  function handleClick(ev) {
    const currDataName = ev.currentTarget.getAttribute("data-name");
    setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);
    setAnchorEl(ev.currentTarget);
    setModalOpenByName(currDataName);

    console.log("isPopoverOpen", isPopoverOpen);
  }

  async function deleteTask(ev) {
    ev.preventDefault();

    try {
      onUpdated("deleteTask", null);
      await boardService.updateActivities(
        board,
        "",
        "deleteTask",
        group,
        task,
        "",
        calculateTaskNumber()
      );
      navigate(`/board/${boardId}`);
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  }

  function calculateTaskNumber() {
    let taskNumber = 0;

    for (const grp of board.groups) {
      if (grp.id === groupId) {
        const taskIndex = grp.tasks.findIndex((task) => task.id === taskId);
        taskNumber += taskIndex + 2;
        break;
      } else {
        taskNumber += grp.tasks.length;
      }
    }
    return taskNumber;
  }

  async function calculateBgColor() {
    const bgImage = currBoardBgStyle?.backgroundImage
      ? await currBoardBgStyle.backgroundImage
      : await board?.style?.backgroundImage;

    const bgColor = currBoardBgStyle?.backgroundColor
      ? await currBoardBgStyle.backgroundColor
      : await board?.style?.backgroundColor;

    if (bgImage) {
      const fac = new FastAverageColor();
      try {
        const color = await fac.getColorAsync(bgImage);
        setBgColor(color.hex);
      } catch (error) {
        console.error("Failed to calculate background color:", error);
      }
    } else if (bgColor) {
      const darkenedColor = chroma(bgColor).darken(1.5).hex();
      setBgColor(darkenedColor);
    }
  }

  function onPreviewToShow(data) {
    setPreview({
      position: "absolute",
      left: `${data.elData.left}px`,
      top: `${data.elData.top}px`,
      width: `${data.elData.width}px`,
      height: `${data.elData.heigh + 100}px`,
      zIndex: "1000",
    });

    setTaskPrevActionsModalData({
      position: "fixed",
      left: `${data.elData.left + 265}px`,
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

  function allowDrop(ev) {
    ev.preventDefault();
  }

  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }

  function getChecklists() {
    const checklists = currTask.checklists;
    if (!checklists) return 0;
    let counter = 0;
    checklists.forEach((checklist) => {
      counter += checklist.items.length;
    });
    return counter;
  }

  function getIsChecked() {
    const checklists = currTask.checklists;
    if (!checklists) return 0;
    let counter = 0;
    checklists.forEach((checklist) => {
      counter += checklist.items.filter((item) => item.isChecked).length;
    });
    return counter;
  }

  if (!board || !board.style) return;
  return (
    <section
      className="board-details"
      style={{
        backgroundImage: currBoardBgStyle?.backgroundImage
          ? `url(${currBoardBgStyle.backgroundImage})`
          : board?.style?.backgroundImage
          ? `url(${board.style.backgroundImage})`
          : "none",
        backgroundColor: currBoardBgStyle?.backgroundColor
          ? `${currBoardBgStyle.backgroundColor}`
          : board?.style?.backgroundColor
          ? `${board.style.backgroundColor}`
          : "none",

        gridTemplateColumns: isMenuOpen
          ? "auto 1fr minmax(305px,339px)"
          : "auto 1fr ",
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
              <LabelList taskLabels={taskSelectedLabels} labelWidth="40px" />
            </div>
            <div>
            <DueDateDisplay
                dueDate={currTask.dueDate}
                setNewDueDate={setNewDueDate}
              />
            </div>

            <div className="details-modal">
              {currTask.checklists && currTask.checklists.length > 0 && (
                <div className="checklists">
                  <IoMdCheckboxOutline />
                  {`${getIsChecked()}/${getChecklists()}`}
                </div>
              )}
              <ul className="members-modal">
                <MemberList members={currTask.members} gridColumnWidth="28px" />
              </ul>
            </div>

            <form className="modal-form" onSubmit={handleSave}>
              <textarea
                value={value || ""}
                onChange={(ev) => setValue(ev.target.value)}
              />

              <button className="save-btn" type="submit">
                <span>Save</span>
              </button>
            </form>
          </div>

          {isTaskPrevModalOpen && (
            <TaskDetailsActions
              taskPrevActionsModalData={taskPrevActionsModalData}
              setIsTaskPrevModalOpen={setIsTaskPrevModalOpen}
              board={board}
              group={currGroup}
              task={currTask}
              boardId={boardId}
              groupId={currGroup.id}
              taskId={currTask.id}
              setBoardSelectedLabels={setBoardSelectedLabels}
              setTaskSelectedLabels={setTaskSelectedLabels}
              onUpdated={onUpdated}
              setCurrCover={setCurrCover}
              currCover={currCover}
              handleClick={handleClick}
              anchorEl={anchorEl}
              setIsPopoverOpen={setIsPopoverOpen}
              modalOpenByName={modalOpenByName}
              isPopoverOpen={isPopoverOpen}
              setTaskMembers={setTaskMembers}
              taskMembers={taskMembers}
              taskSelectedLabels={taskSelectedLabels}
              setNewDueDate={setNewDueDate}
              deleteTask={deleteTask}
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
      <BoardHeader
        members={board?.members}
        bgColor={bgColor}
        allowDrop={allowDrop}
        drag={drag}
        setIsMenuOpen={setIsMenuOpen}
        isMenuOpen={isMenuOpen}
      />

      {isMenuOpen && !taskId && (
        <Menu
          board={board}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          setCurrBoardBgStyle={setCurrBoardBgStyle}
        />
      )}

      {board && <BoardSideBar board={board} bgColor={bgColor} />}
      {board && (
        <GroupList
          groups={board.groups}
          allowDrop={allowDrop}
          isActivitiesOpen={isMenuOpen}
        />
      )}

      {/* {taskId && <TaskDetails board={board} group={group} task={task} onUpdateBoard={onUpdateBoard} />} */}

      {/* <button
                onClick={() => {
                    onAddBoardMsg(board._id)
                }}>
                Add board msg
            </button> */}

      <Outlet />
    </section>
  );
}
