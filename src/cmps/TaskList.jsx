import { useEffect, useState } from "react";
import { TaskPreview } from "./TaskPreview";
import { useSelector } from "react-redux";
import { updateBoard } from "../store/actions/board.actions";
import { AddingForm } from "./AddingForm";

export function TaskList({ group }) {
  const { tasks } = group;

  const [isNewTask, setIsNewTask] = useState(false);
  const [newTask, setNewTask] = useState(boardService.getEmptyTask());
  const currBoard = useSelector((state) => state.boardModule.board);

  useEffect(() => {
    console.log("group:", group);
  }, [group?.length]);

  function onAddTask() {
    setIsNewTask(true);
    setNewTask(boardService.getEmptyTask());
  }

  return (
    <>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id}>
            <TaskPreview groupId={group.id} task={task} />
          </li>
        ))}
      </ul>
      <div className="footer-group">
        {isNewTask && (
          <AddingForm
            setIsNew={setIsNewTask}
            setNew={setNewTask}
            currBoard={currBoard}
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
