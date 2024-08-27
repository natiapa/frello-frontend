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
import { Edit } from "./cmps/Edit.jsx";
import { updateBoard } from "./store/actions/board.actions.js";
import { Provider } from "react-redux";
import { store } from "./store/store.js";

export function RootCmp() {
  return (
    <Provider store={store}>
      <div className="main-layout">
        {/* <AppHeader /> */}
        <UserMsg />

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
