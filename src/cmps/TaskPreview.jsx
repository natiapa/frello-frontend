import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { TaskDetails } from "./TaskDetails";

export function TaskPreview({ task, group }) {
  const boardId = useSelector((storeState) => storeState.boardModule.board._id);

  console.log({ task, group });
  return (
    <>
      <div className="task-preview">
        <Link to={`/board/${boardId}/${group.id}/${task.id}`}>
          <span>{task.title}</span>
        </Link>
      </div>
    </>
  );
}
