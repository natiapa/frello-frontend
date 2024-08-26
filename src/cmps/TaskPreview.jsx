import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { TaskDetails } from "./TaskDetails";
import { useEffect, useState } from "react";
import { eventBus } from "../services/event-bus.service";

export function TaskPreview({ groupId, task }) {
  const boardId = useSelector((storeState) => storeState.boardModule.board._id);


  function handleClick(ev){

    ev.preventDefault()
    const previewData= ev.target.parentNode.getBoundingClientRect()
    eventBus.emit('show-task', previewData)

    
  
  }
  return (
    <Link to={`/board/${boardId}/${groupId}/${task.id}`}>
      <div className="task-preview">
      <button onClick={(e)=>handleClick(e)}>edit</button>
        <span>{task.title || "New"}</span>
      </div>
    </Link>
  );
}
