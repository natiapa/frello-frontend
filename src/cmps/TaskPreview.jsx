import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { TaskDetails } from "./TaskDetails";
import { useEffect, useState } from "react";

export function TaskPreview({ groupId, task }) {
  const { taskId } = useParams();

  const boardId = useSelector((storeState) => storeState.boardModule.board._id);
  const [currTask, setCurrTask] = useState("");
  console.log(task);
  // console.log(groupId);

  // const chosenTask = task.find((task) => task.id === taskId);

  // useEffect(() => {

  //   setCurrTask(chosenTask);
  // }, [taskId]);

  console.log(taskId);
  // console.log(currTask);

  return (
    <div>
      {taskId && <TaskDetails />}
      <Link to={`/board/${boardId}/${groupId}/${task.id}`}></Link>
    </div>
  );
}
