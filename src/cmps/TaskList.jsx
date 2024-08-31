import { useEffect, useState } from "react";
import { TaskPreview } from "./TaskPreview";
import { useSelector } from "react-redux";
import { updateBoard } from "../store/actions/board.actions";
import { AddingForm } from "./AddingForm";
import { Link } from "react-router-dom";
import { Droppable } from "react-beautiful-dnd";

export function TaskList({ group }) {
  const { tasks } = group;

  const [isNewTask, setIsNewTask] = useState(false);
  const [newTask, setNewTask] = useState(boardService.getEmptyTask());
  const board = useSelector((state) => state.boardModule.board);

  useEffect(() => {
    console.log("render!");
  }, [group?.length]);

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
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((task, tIndex) => (
              <TaskPreview
                groupId={group.id}
                task={task}
                key={task.id}
                tIndex={tIndex}
              />
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
      <div className="footer-group">
        {isNewTask && (
          <AddingForm
            setIsNew={setIsNewTask}
            setNew={setNewTask}
            currBoard={board}
            updateBoard={updateBoard}
            updated={newTask}
            groupId={group.id}
            tasks={group.tasks}
          />
        )}

        <button className="add-task-btn" onClick={onAddTask} hidden={isNewTask}>
          <span className="header-btn">+ Add a card</span>
        </button>
      </div>
    </>
  );
}
