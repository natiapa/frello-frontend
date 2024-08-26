import React, { useEffect, useRef, useState } from "react";
import { Routes, Route } from "react-router";

import { HomePage } from "./pages/HomePage";
import { AboutUs, AboutTeam, AboutVision } from "./pages/AboutUs";
import { BoardIndex } from "./pages/BoardIndex.jsx";
import { ReviewIndex } from "./pages/ReviewIndex.jsx";
import { ChatApp } from "./pages/Chat.jsx";
import { AdminIndex } from "./pages/AdminIndex.jsx";

import { BoardDetails } from "./pages/BoardDetails";
import { UserDetails } from "./pages/UserDetails";

import { AppHeader } from "./cmps/AppHeader";
import { AppFooter } from "./cmps/AppFooter";
import { UserMsg } from "./cmps/UserMsg.jsx";

import { LoginSignup } from "./pages/LoginSignup.jsx";
import { Login } from "./pages/Login.jsx";
import { Signup } from "./pages/Signup.jsx";
import { TaskDetails } from "./cmps/TaskDetails.jsx";

import { eventBus } from "./services/event-bus.service.js";
import { EditTask } from "./cmps/EditTask.jsx";
import { updateBoard } from "./store/actions/board.actions.js";
import { Provider } from "react-redux";
import { store } from "./store/store.js";

export function RootCmp() {
  const [preview, setPreview] = useState({});
  const [currElToEdit, setCurrElToEdit] = useState("");
  const [task, setTask] = useState("");

  const [value, setValue] = useState("");

  const dialogRef = useRef(null);

  useEffect(() => {
    eventBus.on("show-task", onPreviewToShow);
  }, []);

  function onPreviewToShow(data) {
    console.log(data);
    setPreview({
      position: "absolute", // Ensure that the dialog can be positioned
      left: `${data.left}px`,
      top: `${data.top}px`,
      width: `${data.width}px`,
      height: `${data.height}px`,
      zIndex: "1000",
    });

    setTask(data.task);
    setCurrElToEdit(data.dataName);
    setValue(data.task.title);

    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  }

  function onCloseDialog() {
    // navigate(`/board/${boardId}`);
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  }

  function handleDialogClick(ev) {
    if (ev.target === dialogRef.current) {
      onCloseDialog();
    }
  }

  async function onUpdatedTask(name, value) {
    try {
      const updatedBoard = boardService.updateBoard(board, group.id, task.id, {
        key: name,
        value: value,
      });
      await updateBoard(updatedBoard);
    } catch (error) {
      console.error("Failed to update the board:", error);
    }
  }

  function handleSave(ev) {
    ev.preventDefault();
    if (currElToEdit === "title") {
      onUpdatedTask(currElToEdit, value);
      onCloseDialog();
    }
  }

  return (
    <Provider store={store}>
      <div className="main-layout">
        {/* <AppHeader /> */}
        <UserMsg />

        <dialog
          className="task-preview-modal"
          style={{ ...preview }}
          ref={dialogRef}
          method="dialog"
          onClick={handleDialogClick}
        >
          <form style={{ height: "100%" }} onSubmit={handleSave}>
            <input
              type="text"
              value={value || ""}
              onChange={(ev) => setValue(ev.target.value)}
            />

            <button type="submit">save</button>
          </form>
        </dialog>

        <main className="main-container">
          <Routes>
            <Route path="" element={<HomePage />} />
            <Route path="about" element={<AboutUs />}>
              <Route path="team" element={<AboutTeam />} />
              <Route path="vision" element={<AboutVision />} />
            </Route>
            <Route path="board" element={<BoardIndex />} />
            <Route path="board/:boardId" element={<BoardDetails />}>
              <Route path=":groupId/:taskId" element={<TaskDetails />} />
            </Route>

            <Route path="user/:id" element={<UserDetails />} />
            {/* <Route path="review" element={<ReviewIndex />} /> */}
            <Route path="chat" element={<ChatApp />} />
            <Route path="admin" element={<AdminIndex />} />
            <Route path="login" element={<LoginSignup />}>
              <Route index element={<Login />} />
              <Route path="signup" element={<Signup />} />
            </Route>
          </Routes>
        </main>
        {/* <AppFooter /> */}
      </div>
    </Provider>
  );
}
