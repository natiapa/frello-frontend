import { useState, useEffect } from "react";
import { useParams, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  loadBoard,
  addBoardMsg,
  updateBoard,
  loadBoards,
} from "../store/actions/board.actions";
import { boardService } from "../services/board";

import {
  showSuccessMsg,
  showErrorMsg,
  eventBus,
} from "../services/event-bus.service";

import {
  socketService,
  SOCKET_EVENT_GROUPS_UPDATED,
} from "../services/socket.service";

import { GroupList } from "../cmps/GroupList";
import { BoardHeader } from "../cmps/BoardHeader";
import { BoardSideBar } from "../cmps/BoardSideBar";
import { AppHeader } from "../cmps/AppHeader";
import { TaskDetailsActions } from "../cmps/TaskDetailsActions";
import { LabelList } from "../cmps/LabelList";
import { MemberList } from "../cmps/MemberList";
import { Menu } from "../cmps/Menu";
import { DueDateDisplay } from "../cmps/DueDateDisplay";
import { CoverDisplay } from "../cmps/CoverDisplay";

import { IoMdCheckboxOutline } from "react-icons/io";
import { FastAverageColor } from "fast-average-color";
import chroma from "chroma-js";
import { MouseTracker } from "../cmps/MouseTracker";

export function BoardDetails() {
  // Import necessary hooks
  const { boardId, taskId } = useParams();
  const board = useSelector((storeState) => storeState.boardModule.board);
  const boards = useSelector((storeState) => storeState.boardModule.boards);
  const filterBy = useSelector(
    (storeState) => storeState.boardModule.filterBoard
  );

  // Filter starred boards
  const starredBoards = Array.isArray(boards)
    ? boards.filter((board) => board.isStarred)
    : [];

  // State variables

  // State variables for managing UI modals, popovers, and preview interactions
  const [isTaskPrevModalOpen, setIsTaskPrevModalOpen] = useState(false);
  const [modalOpenByName, setModalOpenByName] = useState(null);
  const [taskPrevActionsModalData, setTaskPrevActionsModalData] = useState("");
  const [preview, setPreview] = useState({});
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [currElToEdit, setCurrElToEdit] = useState("title");
  const [anchorEl, setAnchorEl] = useState(null);

  // State variables for managing current group, task, and task-related data
  const [currGroup, setCurrGroup] = useState(null);
  const [currTask, setCurrTask] = useState(null);
  const [boardSelectedLabels, setBoardSelectedLabels] = useState(
    board?.labels || []
  );
  const [taskSelectedLabels, setTaskSelectedLabels] = useState(
    currTask?.labels || []
  );
  const [newDueDate, setNewDueDate] = useState(currTask?.dueDate || null);
  const [currCover, setCurrCover] = useState(currTask?.cover || null);
  const [taskMembers, setTaskMembers] = useState(currTask?.members || []);
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [isClickedLabel, setIsClickedLabel] = useState(false);

  // State variables for managing menu, board background style, and background color
  const [currBoardBgStyle, setCurrBoardBgStyle] = useState();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [bgColor, setBgColor] = useState("");
  const [value, setValue] = useState("");

  // Join the board room via socket and listen for group updates
  useEffect(() => {
    socketService.emit("joinBoard", boardId);
    console.log("Joining board room:", boardId);

    socketService.on(SOCKET_EVENT_GROUPS_UPDATED, (updatedGroups) => {
      console.log("Received updated groups:", updatedGroups);
      loadBoard(boardId);
    });

    return () => {
      socketService.off(SOCKET_EVENT_GROUPS_UPDATED);
    };
  }, [boardId]);

  // Listen for task preview events from the event bus
  useEffect(() => {
    loadBoards();
    eventBus.on("show-task", onPreviewToShow);
  }, []);

  // Load board data when boardId or board changes
  useEffect(() => {
    if (!boardId || board?._id === boardId) return;
    loadBoard(boardId);
  }, [boardId, board]);

  // Load board data and update preview if necessary
  useEffect(() => {
    loadBoard(boardId, filterBy);
    if (!preview?.length) return;
    // setPreview(preview);
    loadPreview();
  }, [boardId, preview, filterBy, currTask]);

  // Calculate background color when board style or bgColor changes
  useEffect(() => {
    calculateBgColor();
  }, [board?.style, bgColor, currBoardBgStyle]);

  // Update task details when current task changes
  useEffect(() => {
    if (currTask) {
      // setNewDueDate(currTask.dueDate);
      // setCurrCover(currTask.cover);
      // setTaskMembers(currTask.members);
      // setTaskSelectedLabels(currTask.labels || []);
      loadUpdate();
    }
  }, [currTask]);

  function loadUpdate() {
    setNewDueDate(currTask.dueDate);
    setCurrCover(currTask.cover);
    setTaskMembers(currTask.members);
    setTaskSelectedLabels(currTask.labels || []);
  }

  function loadPreview() {
    setPreview(preview);
  }

  // Update task details if the task preview modal is open
  // useEffect(() => {
  //   if (isTaskPrevModalOpen && currTask) {
  //     setNewDueDate(currTask.dueDate);
  //     setTaskMembers(currTask.members);
  //     setTaskSelectedLabels(currTask.labels);
  //     setCurrCover(currTask.cover);
  //   }
  // }, [currTask, isTaskPrevModalOpen]);

  // Reload board when the background style changes
  useEffect(() => {
    loadBoard(boardId);
  }, [currBoardBgStyle?.style]);

  function handleClick(ev) {
    const currDataName = ev.currentTarget.getAttribute("data-name");
    setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);
    setAnchorEl(ev.currentTarget);
    setModalOpenByName(currDataName);
  }

  // Function to handle board updates
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

  // Function to handle task deletion
  async function deleteTask(ev) {
    ev.preventDefault();

    try {
      await onUpdated("deleteTask", null);

      await boardService.updateActivities(
        board,
        "",
        "deleteTask",
        group,
        task,
        "",
        calculateTaskNumber()
      );

      await loadBoard(boardId);
      navigate(`/board/${boardId}`);
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  }
  // Function to calculate and set the background color based on the board's background image or color
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

  // Function to handle task preview display when a task is selected
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
  // Function to handle saving updates to the task
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

  // Function to allow dropping elements (used in drag-and-drop functionality)
  function allowDrop(ev) {
    ev.preventDefault();
  }

  // Function to handle dragging an element (used in drag-and-drop functionality)
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }

  // Function to calculate the total number of checklist items in the current task
  function getChecklists() {
    const checklists = currTask.checklists;
    if (!checklists) return 0;
    let counter = 0;
    checklists.forEach((checklist) => {
      counter += checklist.items.length;
    });
    return counter;
  }

  // Function to calculate the number of checked items in the checklists of the current task
  function getIsChecked() {
    const checklists = currTask.checklists;
    if (!checklists) return 0;
    let counter = 0;
    checklists.forEach((checklist) => {
      counter += checklist.items.filter((item) => item.isChecked).length;
    });
    return counter;
  }

  // Return early if there is no board or no board style
  if (!board || !board.style) return;
  console.log(currCover);
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
          : "auto 1fr",
      }}
    >
      {/* Task Preview Modal */}
      {isTaskPrevModalOpen && (
        <section className="task-preview-modal-container">
          <div
            onClick={handleSave}
            className="task-preview-modal-overlay"
          ></div>
          <div
            className="task-preview-modal"
            style={{ ...preview }}
            method="dialog"
          >
            {currTask.cover.color !== undefined && (
              <div
                className="absolute-element"
                style={{
                  height: !currCover?.img
                    ? !currCover?.color
                      ? "0"
                      : "36px"
                    : "200px",
                }}
              >
                <CoverDisplay
                  currCover={currCover}
                  height={
                    !currCover?.img
                      ? !currCover?.color
                        ? "0"
                        : "36px"
                      : "200px"
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
              {/* Checklists Display */}
              {currTask.checklists && currTask.checklists.length > 0 && (
                <div className="checklists" style={{ gridRow: 2 }}>
                  <IoMdCheckboxOutline />
                  {`${getIsChecked()}/${getChecklists()}`}
                </div>
              )}

              {/* Members Display */}
              {currTask.members.length > 0 && (
                <ul className="members-modal" style={{ gridRow: 2 }}>
                  <MemberList members={taskMembers} gridColumnWidth="32px" />
                </ul>
              )}

              {/* Due Date Display */}
              <div className="due-date-container" style={{ gridRow: 1 }}>
                <DueDateDisplay
                  dueDate={newDueDate}
                  setNewDueDate={setNewDueDate}
                  onUpdated={onUpdated}
                />
              </div>
            </div>

            {/* Save Form */}
            <form className="modal-form" onSubmit={handleSave}>
              {/* <textarea
                value={value || ""}
                onChange={(ev) => setValue(ev.target.value)}
              /> */}
              <div
                className="prev-title-edit"
                contentEditable
                onInput={(ev) => setValue(ev.target.innerText)}
                onBlur={(ev) => setValue(ev.target.innerText)}
              >
                {currTask.title}
              </div>
              <button className="save-btn" type="submit">
                <span>Save</span>
              </button>
            </form>
          </div>

          {/* Task Details Actions */}
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

      {/* App Header */}
      <AppHeader
        starredBoards={starredBoards}
        bgColor={bgColor}
        logoImg="https://www.pngkey.com/png/full/213-2134177_import-boards-from-trello-trello-logo-white.png"
        logoColor="#fff"
        link={`${import.meta.env.VITE_SERVER}/board`}
        textColor="#fff"
      />

      {/* Board Header */}
      <BoardHeader
        members={board?.members}
        bgColor={bgColor}
        allowDrop={allowDrop}
        drag={drag}
        setIsMenuOpen={setIsMenuOpen}
        isMenuOpen={isMenuOpen}
      />

      {/* Menu */}
      {isMenuOpen && !taskId && (
        <Menu
          board={board}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          setCurrBoardBgStyle={setCurrBoardBgStyle}
        />
      )}

      {/* Board Sidebar */}
      {board && <BoardSideBar board={board} bgColor={bgColor} />}

      <MouseTracker boardId={boardId} />

      {/* Group List */}
      {board && (
        <GroupList
          groups={board.groups}
          allowDrop={allowDrop}
          isActivitiesOpen={isMenuOpen}
          isClickedLabel={isClickedLabel}
          setIsClickedLabel={setIsClickedLabel}
        />
      )}

      {/* Outlet for nested routes */}
      <Outlet />
    </section>
  );
}

// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { Outlet } from "react-router-dom";

// import {
//   showSuccessMsg,
//   showErrorMsg,
//   eventBus,
// } from "../services/event-bus.service";
// import {
//   socketService,
//   SOCKET_EVENT_GROUPS_UPDATED,
// } from "../services/socket.service";

// import { loadBoard, addBoardMsg } from "../store/actions/board.actions";
// import { boardService } from "../services/board";
// import { updateBoard, updateGroups } from "../store/actions/board.actions";

// import { GroupList } from "../cmps/GroupList";
// import { BoardHeader } from "../cmps/BoardHeader";
// import { BoardSideBar } from "../cmps/BoardSideBar";
// import { AppHeader } from "../cmps/AppHeader";
// import { TaskDetailsActions } from "../cmps/TaskDetailsActions";

// import { FastAverageColor } from "fast-average-color";
// import chroma from "chroma-js";

// import { LabelList } from "../cmps/LabelList";
// import { MemberList } from "../cmps/MemberList";
// import { IoMdCheckboxOutline } from "react-icons/io";
// import { Menu } from "../cmps/Menu";
// import { DueDateDisplay } from "../cmps/DueDateDisplay";
// import { CoverDisplay } from "../cmps/CoverDisplay";

// export function BoardDetails() {
//   const { boardId, taskId } = useParams();
//   const board = useSelector((storeState) => storeState.boardModule.board);

//   const filterBy = useSelector(
//     (storeState) => storeState.boardModule.filterBoard
//   );
//   const boards = useSelector((storeState) => storeState.boardModule.boards);
//   const starredBoards = Array.isArray(boards)
//     ? boards.filter((board) => board.isStarred)
//     : [];

//   const [bgColor, setBgColor] = useState("");
//   const [currGroup, setCurrGroup] = useState("");
//   const [currTask, setCurrTask] = useState("");
//   const [preview, setPreview] = useState({});
//   const [currElToEdit, setCurrElToEdit] = useState("title");
//   const [value, setValue] = useState("");
//   const [isTaskPrevModalOpen, setIsTaskPrevModalOpen] = useState(false);
//   const [taskPrevActionsModalData, setTaskPrevActionsModalData] = useState("");
//   const [selectedLabels, setSelectedLabels] = useState([]);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [currBoardBgStyle, setCurrBoardBgStyle] = useState();
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [isPopoverOpen, setIsPopoverOpen] = useState(false);
//   const [modalOpenByName, setModalOpenByName] = useState(null);
//   const [newDueDate, setNewDueDate] = useState(currTask?.dueDate || null);
//   const [boardSelectedLabels, setBoardSelectedLabels] = useState(
//     board?.labels || []
//   );
//   const [taskSelectedLabels, setTaskSelectedLabels] = useState(
//     currTask?.labels || []
//   );
//   const [currCover, setCurrCover] = useState(currTask?.cover || null);
//   const [taskMembers, setTaskMembers] = useState(currTask?.members || []);

//   useEffect(() => {
//     socketService.emit("joinBoard", boardId);
//     console.log("Joining board room:", boardId);

//     socketService.on(SOCKET_EVENT_GROUPS_UPDATED, (updatedGroups) => {
//       console.log("Received updated groups:", updatedGroups);
//       loadBoard(boardId);
//     });

//     return () => {
//       socketService.off(SOCKET_EVENT_GROUPS_UPDATED);
//     };
//   }, [boardId]);

//   useEffect(() => {
//     eventBus.on("show-task", onPreviewToShow);
//   }, []);

//   useEffect(() => {
//     if (!boardId || board?._id === boardId) return;
//     loadBoard(boardId);
//   }, [boardId, board]);

//   useEffect(() => {
//     loadBoard(boardId, filterBy);
//     if (!preview?.length) return;
//     setPreview(preview);
//   }, [boardId, preview, filterBy, currTask]);

//   useEffect(() => {
//     calculateBgColor();
//   }, [board?.style, bgColor, currBoardBgStyle]);

//   useEffect(() => {
//     if (currTask) {
//       setNewDueDate(currTask.dueDate);
//       setCurrCover(currTask.cover);
//       setTaskMembers(currTask.members);
//       setTaskSelectedLabels(currTask.labels || []);
//     }
//   }, [currTask]);

//   useEffect(() => {
//     if (isTaskPrevModalOpen) {
//       setNewDueDate(currTask.dueDate);
//       setTaskMembers(currTask.members);
//       setTaskSelectedLabels(currTask.labels);
//       setCurrCover(currTask.cover);
//     }
//   }, [currTask]);

//   useEffect(() => {
//     loadBoard(boardId);
//   }, [currBoardBgStyle?.style]);

//   function handleClick(ev) {
//     const currDataName = ev.currentTarget.getAttribute("data-name");
//     setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);
//     setAnchorEl(ev.currentTarget);
//     setModalOpenByName(currDataName);
//   }

//   async function deleteTask(ev) {
//     ev.preventDefault();

//     try {
//       onUpdated("deleteTask", null);

//       await boardService.updateActivities(
//         board,
//         "",
//         "deleteTask",
//         group,
//         task,
//         "",
//         calculateTaskNumber()
//       );
//       loadBoard(boardId);
//       navigate(`/board/${boardId}`);
//     } catch (error) {
//       console.error("Failed to delete task:", error);
//     }
//   }

//   async function calculateBgColor() {
//     const bgImage = currBoardBgStyle?.backgroundImage
//       ? await currBoardBgStyle.backgroundImage
//       : await board?.style?.backgroundImage;

//     const bgColor = currBoardBgStyle?.backgroundColor
//       ? await currBoardBgStyle.backgroundColor
//       : await board?.style?.backgroundColor;

//     if (bgImage) {
//       const fac = new FastAverageColor();
//       try {
//         const color = await fac.getColorAsync(bgImage);
//         setBgColor(color.hex);
//       } catch (error) {
//         console.error("Failed to calculate background color:", error);
//       }
//     } else if (bgColor) {
//       const darkenedColor = chroma(bgColor).darken(1.5).hex();
//       setBgColor(darkenedColor);
//     }
//   }

//   function onPreviewToShow(data) {
//     console.log(data.task?.cover?.color);
//     setPreview({
//       position: "absolute",
//       left: `${data.elData.left}px`,
//       top: `${data.elData.top}px`,
//       width: `${data.elData.width}px`,
//       height: `${data.elData.heigh + 100}px`,
//       zIndex: "1000",
//       gridTemplateRows:
//         data.task?.cover?.color === undefined
//           ? "max-content max-content max-content"
//           : "max-content max-content max-content max-content",
//     });

//     setTaskPrevActionsModalData({
//       position: "absolute",
//       left: `${data.elData.right + 7}px`,
//       top: `${data.elData.top}px`,
//       width: `max-content`,
//       height: `max-content`,
//       zIndex: "1000",
//     });
//     setIsTaskPrevModalOpen((isOpenModal) => !isOpenModal);

//     setCurrElToEdit(data.dataName);
//     setCurrGroup(data.group);
//     setCurrTask(data.task);
//     setValue(data.task.title);
//     setSelectedLabels(data.task.labels || []);
//   }

//   async function onUpdated(name, value) {
//     console.log(name, value);
//     if (!board) return;
//     try {
//       const updatedBoard = await boardService.updateBoard(
//         board,
//         currGroup.id,
//         currTask.id,
//         {
//           key: name,
//           value: value,
//         }
//       );
//       await updateBoard(updatedBoard);
//       await loadBoard(boardId, filterBy);
//     } catch (error) {
//       console.error("Failed to update the board:", error);
//     }
//   }

//   function handleSave(ev) {
//     ev.preventDefault();
//     if (!board) return;

//     if (currElToEdit === "title") {
//       onUpdated(currElToEdit, value);
//       setIsTaskPrevModalOpen((isOpenModal) => !isOpenModal);
//     }

//     if (currElToEdit === "labels") {
//       onUpdated("labels", taskSelectedLabels);
//     }
//   }

//   function allowDrop(ev) {
//     ev.preventDefault();
//   }

//   function drag(ev) {
//     ev.dataTransfer.setData("text", ev.target.id);
//   }

//   function getChecklists() {
//     const checklists = currTask.checklists;
//     if (!checklists) return 0;
//     let counter = 0;
//     checklists.forEach((checklist) => {
//       counter += checklist.items.length;
//     });
//     return counter;
//   }

//   function getIsChecked() {
//     const checklists = currTask.checklists;
//     if (!checklists) return 0;
//     let counter = 0;
//     checklists.forEach((checklist) => {
//       counter += checklist.items.filter((item) => item.isChecked).length;
//     });
//     return counter;
//   }

//   if (!board || !board.style) return;
//   return (
//     <section
//       className="board-details"
//       style={{
//         backgroundImage: currBoardBgStyle?.backgroundImage
//           ? `url(${currBoardBgStyle.backgroundImage})`
//           : board?.style?.backgroundImage
//           ? `url(${board.style.backgroundImage})`
//           : "none",
//         backgroundColor: currBoardBgStyle?.backgroundColor
//           ? `${currBoardBgStyle.backgroundColor}`
//           : board?.style?.backgroundColor
//           ? `${board.style.backgroundColor}`
//           : "none",

//         gridTemplateColumns: isMenuOpen
//           ? "auto 1fr minmax(305px,339px)"
//           : "auto 1fr ",
//       }}
//     >
//       {isTaskPrevModalOpen && (
//         <section className="task-preview-modal-container">
//           <div
//             onClick={handleSave}
//             className="task-preview-modal-overlay"
//           ></div>
//           <div
//             className="task-preview-modal"
//             style={{
//               ...preview,
//             }}
//             method="dialog"
//           >
//             {currTask.cover.color !== undefined && (
//               <div
//                 className="absolute-element"
//                 style={{
//                   height: !currCover?.img ? "36px" : "200px",
//                 }}
//               >
//                 <CoverDisplay
//                   currCover={currCover}
//                   height={!currCover?.img ? "36px" : "200px"}
//                   borderRadius="8px 8px 0 0"
//                   imgWidth="100%"
//                   colorHeight="36px"
//                 />
//               </div>
//             )}

//             <div className="labels">
//               <LabelList taskLabels={taskSelectedLabels} labelWidth="40px" />
//             </div>

//             <div className="details-modal">
//               {currTask.checklists && currTask.checklists.length > 0 && (
//                 <div className="checklists" style={{ gridRow: 2 }}>
//                   <IoMdCheckboxOutline />
//                   {`${getIsChecked()}/${getChecklists()}`}
//                 </div>
//               )}

//               {currTask.members.length > 0 && (
//                 <ul className="members-modal" style={{ gridRow: 2 }}>
//                   <MemberList members={taskMembers} gridColumnWidth="32px" />
//                 </ul>
//               )}

//               <div className="due-date-container" style={{ gridRow: 1 }}>
//                 <DueDateDisplay
//                   dueDate={newDueDate}
//                   setNewDueDate={setNewDueDate}
//                   onUpdated={onUpdated}
//                 />
//               </div>
//             </div>

//             <form className="modal-form" onSubmit={handleSave}>
//               <textarea
//                 value={value || ""}
//                 onChange={(ev) => setValue(ev.target.value)}
//               />

//               <button className="save-btn" type="submit">
//                 <span>Save</span>
//               </button>
//             </form>
//           </div>

//           {isTaskPrevModalOpen && (
//             <TaskDetailsActions
//               taskPrevActionsModalData={taskPrevActionsModalData}
//               setIsTaskPrevModalOpen={setIsTaskPrevModalOpen}
//               board={board}
//               group={currGroup}
//               task={currTask}
//               boardId={boardId}
//               groupId={currGroup.id}
//               taskId={currTask.id}
//               setBoardSelectedLabels={setBoardSelectedLabels}
//               setTaskSelectedLabels={setTaskSelectedLabels}
//               onUpdated={onUpdated}
//               setCurrCover={setCurrCover}
//               currCover={currCover}
//               handleClick={handleClick}
//               anchorEl={anchorEl}
//               setIsPopoverOpen={setIsPopoverOpen}
//               modalOpenByName={modalOpenByName}
//               isPopoverOpen={isPopoverOpen}
//               setTaskMembers={setTaskMembers}
//               taskMembers={taskMembers}
//               taskSelectedLabels={taskSelectedLabels}
//               setNewDueDate={setNewDueDate}
//               // setNewCover={setNewCover}
//               deleteTask={deleteTask}
//             />
//           )}
//         </section>
//       )}

//       <AppHeader
//         starredBoards={starredBoards}
//         bgColor={bgColor}
//         logoImg="https://www.pngkey.com/png/full/213-2134177_import-boards-from-trello-trello-logo-white.png"
//         logoColor="#fff"
//         link="http://localhost:5173/board"
//         textColor="#fff"
//         // createBtnColor="#caccd140"
//       />
//       {/* {board?.members && board.members.length && ( */}
//       <BoardHeader
//         members={board?.members}
//         bgColor={bgColor}
//         allowDrop={allowDrop}
//         drag={drag}
//         setIsMenuOpen={setIsMenuOpen}
//         isMenuOpen={isMenuOpen}
//       />

//       {isMenuOpen && !taskId && (
//         <Menu
//           board={board}
//           isMenuOpen={isMenuOpen}
//           setIsMenuOpen={setIsMenuOpen}
//           setCurrBoardBgStyle={setCurrBoardBgStyle}
//         />
//       )}

//       {board && <BoardSideBar board={board} bgColor={bgColor} />}
//       {board && (
//         <GroupList
//           groups={board.groups}
//           allowDrop={allowDrop}
//           isActivitiesOpen={isMenuOpen}
//         />
//       )}

//       {/* {board && <BoardSideBar board={board} bgColor={bgColor} />}
//       // {board && (
//       //   <GroupList
//       //     groups={board.groups}
//       //     allowDrop={allowDrop}
//       //     isActivitiesOpen={isMenuOpen}
//       //   />
//       // )} */}

//       {/* {taskId && <TaskDetails board={board} group={group} task={task} onUpdateBoard={onUpdateBoard} />} */}

//       {/* <button
//                 onClick={() => {
//                     onAddBoardMsg(board._id)
//                 }}>
//                 Add board msg
//             </button> */}

//       <Outlet />
//     </section>
//   );
// }
