import { useEffect, useRef, useState } from "react";
import { TaskPreview } from "./TaskPreview";
import { useSelector } from "react-redux";
import { updateBoard } from "../store/actions/board.actions";
import { AddingForm } from "./AddingForm";
import { Link } from "react-router-dom";
import { Droppable } from "react-beautiful-dnd";
import { boardService } from "../services/board";

export function TaskList({
  group,
  allowDrop,
  drop,
  draggedMemberId,
  isClickedLabel,
  setIsClickedLabel,
  isNewGroupAdded,
  setIsNewGroupAdded,
}) {
  const { tasks } = group;

  const [isNewTask, setIsNewTask] = useState(isNewGroupAdded ? true : false);
  const [newTask, setNewTask] = useState(boardService.getEmptyTask());
  const board = useSelector((state) => state.boardModule.board);
  const taskListRef = useRef(null);
  const addingFormRef = useRef(null);

  useEffect(() => {
    if (isNewTask && addingFormRef.current && taskListRef.current) {
      taskListRef.current.scrollTop = addingFormRef.current.offsetTop;
      document.querySelector("button.save-group-btn").innerText = "Add card";
      document.querySelector("textarea").placeholder =
        "Enter a name for this card...";
    }
  }, [isNewTask]);
  useEffect(() => {}, [group?.length]);

  function onAddTask() {
    setIsNewTask(true);
    setNewTask(boardService.getEmptyTask());
  }

  return (
    <>
      <Droppable droppableId={group.id} type="task">
        {(provided) => (
          <ul
            className="task-list"
            ref={(element) => {
              provided.innerRef(element);
              taskListRef.current = element;
            }}
            {...provided.droppableProps}
          >
            {tasks.map((task, tIndex) => (
              <TaskPreview
                groupId={group.id}
                task={task}
                key={task.id}
                tIndex={tIndex}
                allowDrop={allowDrop}
                drop={drop}
                isClickedLabel={isClickedLabel}
                setIsClickedLabel={setIsClickedLabel}
              />
            ))}
            {provided.placeholder}
            {isNewTask && (
              <div className="adding-form-container" ref={addingFormRef}>
                <AddingForm
                  setIsNew={setIsNewTask}
                  setNew={setNewTask}
                  currBoard={board}
                  updateBoard={updateBoard}
                  updated={newTask}
                  groupId={group.id}
                  tasks={group.tasks}
                  setIsNewGroupAdded={setIsNewGroupAdded}
                  // setIsNewTask={setIsNewTask}
                />
              </div>
            )}
          </ul>
        )}
      </Droppable>
      <div
        className="footer-group"
        hidden={isNewTask}
        style={!isNewTask ? { display: "grid" } : { display: "none" }}
      >
        {
          <button className="add-task-btn" onClick={onAddTask}>
            <span className="header-btn">+ Add a card</span>
          </button>
        }
      </div>
    </>
  );
}
// style={isNewTask ? { opacity: "0" } : { opacity: "1" }}
