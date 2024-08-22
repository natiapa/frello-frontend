import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { TaskDetails } from "./TaskDetails";
import { useEffect, useState } from "react";

export function TaskPreview({ groupId, task }) {
  const boardId = useSelector((storeState) => storeState.boardModule.board._id);

  return (
    <div>
      <Link to={`/board/${boardId}/${groupId}/${task.id}`}>{task.title || 'New'}</Link>
    </div>
  );
}
