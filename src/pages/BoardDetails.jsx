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
import { CoverDisplay } from "../cmps/CoverDisplay";

export function BoardDetails() {
  const { boardId, taskId } = useParams();
  const board = useSelector((storeState) => storeState.boardModule.board);
  const filterBy = useSelector(
    (storeState) => storeState.boardModule.filterBoard
  );
  const boards = useSelector((storeState) => storeState.boardModule.boards);
  const starredBoards = Array.isArray(boards)
    ? boards.filter((board) => board.isStarred)
    : [];

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
  const [currBoardBgStyle, setCurrBoardBgStyle] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [modalOpenByName, setModalOpenByName] = useState(null);
  const [newDueDate, setNewDueDate] = useState(currTask?.dueDate || null);
  const [boardSelectedLabels, setBoardSelectedLabels] = useState(
    board?.labels || []
  );
  const [taskSelectedLabels, setTaskSelectedLabels] = useState(
    currTask?.labels || []
  );
  const [currCover, setCurrCover] = useState(currTask?.cover || null);
  const [newCover, setNewCover] = useState(currTask?.cover || null);
  const [taskMembers, setTaskMembers] = useState(currTask?.members || []);

  useEffect(() => {
    eventBus.on("show-task", onPreviewToShow);
  }, []);

  useEffect(() => {
    loadBoard(boardId, filterBy);
    if (!preview?.length) return;
    setPreview(preview);
  }, [boardId, preview, filterBy, currTask]);

  useEffect(() => {
    calculateBgColor();
  }, [board?.style, bgColor, currBoardBgStyle]);

  useEffect(() => {
    if (currTask) {
      setNewDueDate(currTask.dueDate);
      setCurrCover(currTask.cover);
      setTaskMembers(currTask.members);
      setTaskSelectedLabels(currTask.labels || []);
    }
  }, [currTask]);

  useEffect(() => {
    setNewCover(currTask.cover);
  }, [newCover]);

  useEffect(() => {
    if (isTaskPrevModalOpen) {
      setNewDueDate(currTask.dueDate);
      setTaskMembers(currTask.members);
      setTaskSelectedLabels(currTask.labels);
      setCurrCover(currTask.cover);
    }
  }, [currTask]);

  useEffect(() => {
    loadBoard(boardId);
  }, [currBoardBgStyle?.style]);

  function handleClick(ev) {
    const currDataName = ev.currentTarget.getAttribute("data-name");
    setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);
    setAnchorEl(ev.currentTarget);
    setModalOpenByName(currDataName);
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
    console.log(data.task?.cover?.color);
    setPreview({
      position: "absolute",
      left: `${data.elData.left}px`,
      top: `${data.elData.top}px`,
      width: `${data.elData.width}px`,
      height: `${data.elData.heigh + 100}px`,
      zIndex: "1000",
      gridTemplateRows:
        data.task?.cover?.color === undefined
          ? "max-content max-content max-content"
          : "max-content max-content max-content max-content",
    });

    setTaskPrevActionsModalData({
      position: "absolute",
      left: `${data.elData.right + 7}px`,
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
    console.log(name, value);
    if (!board) return;
    try {
      const updatedBoard = await boardService.updateBoard(
        board,
        currGroup.id,
        currTask.id,
        {
          key: name,
          value: value,
        }
      );
      await updateBoard(updatedBoard);
      await loadBoard(boardId, filterBy);
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
      onUpdated("labels", taskSelectedLabels);
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
        <section className="task-preview-modal-container">
          <div
            onClick={handleSave}
            className="task-preview-modal-overlay"
          ></div>
          <div
            className="task-preview-modal"
            style={{
              ...preview,
            }}
            method="dialog"
          >
            {currTask.cover.color !== undefined && (
              <div
                className="absolute-element"
                style={{
                  height:
                    !newCover?.img && currTask.cover.img ? "36px" : "200px",
                }}
              >
                <CoverDisplay
                  currCover={newCover || currTask.cover}
                  height={
                    !newCover?.img && !currTask.cover.img ? "36px" : "200px"
                  }
                  borderRadius="8px 8px 0 0"
                  imgWidth="100%"
                  colorHeight="36px"
                />
              </div>
            )}

            <div className="labels">
              <LabelList taskLabels={taskSelectedLabels} labelWidth="40px" />
            </div>

            <div className="details-modal">
              {currTask.checklists && currTask.checklists.length > 0 && (
                <div className="checklists" style={{ gridRow: 2 }}>
                  <IoMdCheckboxOutline />
                  {`${getIsChecked()}/${getChecklists()}`}
                </div>
              )}

              {currTask.members.length > 0 && (
                <ul className="members-modal" style={{ gridRow: 2 }}>
                  <MemberList members={taskMembers} gridColumnWidth="32px" />
                </ul>
              )}

              <div className="due-date-container" style={{ gridRow: 1 }}>
                <DueDateDisplay
                  dueDate={newDueDate}
                  setNewDueDate={setNewDueDate}
                  onUpdated={onUpdated}
                />
              </div>
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
              setNewCover={setNewCover}
              deleteTask={deleteTask}
            />
          )}
        </section>
      )}

      <AppHeader
        starredBoards={starredBoards}
        bgColor={bgColor}
        logoImg="https://www.pngkey.com/png/full/213-2134177_import-boards-from-trello-trello-logo-white.png"
        logoColor="#fff"
        link="http://localhost:5173/board"
        textColor="#fff"
        createBtnColor="#caccd140"
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
