import { useEffect } from "react";
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

export function BoardDetails() {
  const { boardId } = useParams();
  const { taskId } = useParams();
  const { groupId } = useParams();

  const board = useSelector((storeState) => storeState.boardModule.board);

  useEffect(() => {
    loadBoard(boardId);
    // console.log("board:", board);
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

  return (
    <section
      className="board-details"
      style={{
        backgroundImage: `url(${board?.style?.backgroundImage})`,
      }}
    >
      {taskId && <TaskDetails task={task} />}

      <BoardHeader />
      {/* <SideBar /> */}
      <Link to="/board">Back to list</Link>
      <h1>Board Details</h1>

      {board && <GroupList groups={board.groups} />}
      {board && (
        <div>
          <h3>{board.title}</h3>
          <pre> {JSON.stringify(board, null, 2)} </pre>
        </div>
      )}
      <button
        onClick={() => {
          onAddBoardMsg(board._id);
        }}
      >
        Add board msg
      </button>
    </section>
  );
}
