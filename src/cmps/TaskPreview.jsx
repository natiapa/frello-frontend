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
import { Draggable } from "react-beautiful-dnd";

export function TaskPreview({ groupId, task, tIndex }) {
  // const boardId = useSelector((storeState) => storeState.boardModule.board._id);
  const board = useSelector((storeState) => storeState.boardModule.board);
  const group = board?.groups?.find((group) => group.id === groupId);

  // const task = group?.tasks?.find((task) => task.id === taskId);

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
    <Draggable key={task.id} draggableId={task.id} index={tIndex}>
      {(provided, snapshot) => (
        <li
          className="task-preview"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
            opacity: snapshot.isDragging ? "0.5" : "1",
          }}
        >
          <Link to={`/board/${board._id}/${group.id}/${task.id}`}>
            <button
              data-name="title"
              className="edit-btn"
              onClick={(e) => handleClick(e)}
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
              <ul
                className="members"
                style={{
                  gridTemplateColumns: `repeat(${task.members.length}, 20px)`,
                }}
              >
                <MemberList members={task.members} />
              </ul>
            </div>
          </Link>
        </li>
      )}
    </Draggable>
  );
}
