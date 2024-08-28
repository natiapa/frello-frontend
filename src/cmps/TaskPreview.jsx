import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { TaskDetails } from "./TaskDetails";
import { useEffect, useState } from "react";
import { eventBus } from "../services/event-bus.service";
import { FiEdit2 } from "react-icons/fi";
import { LabelList } from "./LabelList";
import { MemberList } from "./MemberList";
import { IoMdCheckboxOutline } from "react-icons/io";

export function TaskPreview({ groupId, task }) {
  const boardId = useSelector((storeState) => storeState.boardModule.board._id);
  const board = useSelector((storeState) => storeState.boardModule.board);
  const group = board?.groups?.find((group) => group.id === groupId);
  // const task = group?.tasks?.find((task) => task.id === taskId);

  // function handleClick(ev) {
  //   ev.preventDefault();
  //   const previewData = ev.target.parentNode.getBoundingClientRect();
  //   eventBus.emit("show-task", previewData);
  // }
  function getChecklists() {
    const checklists = task.checklists;
    if (!checklists) return 0;
    let counter = 0;
    checklists.forEach((checklist) => {
      counter += checklist.items.length;
    });
    return counter;
  }

  function getIsChecked() {
    const checklists = task.checklists;
    if (!checklists) return 0;
    let counter = 0;
    checklists.forEach((checklist) => {
      counter += checklist.items.filter((item) => item.isChecked).length;
    });
    return counter;
  }

  function handleClick(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    const dataName = ev.currentTarget.getAttribute("data-name");
    const elData = ev.target.closest(".task-preview").getBoundingClientRect();
    if (!elData) return;
    const previewData = { elData, group, task, dataName };
    eventBus.emit("show-task", previewData);
  }

  return (
    <Link to={`/board/${boardId}/${groupId}/${task.id}`}>
      <div className="task-preview">
        <button
          data-name="title"
          className="edit-btn"
          onClick={(e) => handleClick(e)}
          style={{ backgroundColor: "grey" }}
        >
          <FiEdit2 />
        </button>
        <div className="labels">
          <LabelList labels={task.labels} />
        </div>

        <span>{task.title || "New"}</span>

        <div className="details">
          {task.checklists && task.checklists.length > 0 && (
            <div className="checklists">
              <IoMdCheckboxOutline />
              {`${getIsChecked()}/${getChecklists()}`}
            </div>
          )}
          <ul className="members">
            <MemberList members={task.members} />
          </ul>
        </div>
      </div>
    </Link>
  );
}
