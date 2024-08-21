import { useRef, useEffect } from "react";
import { useNavigate } from "react-router";

export function TaskDetails({ boardId, task }) {
  const navigate = useNavigate();

  function OnCloseForm() {}
  return (
    <form
      onSubmit={onCloseForm}
      style={{ backgroundColor: "red", position: "fixed", zIndex: 10 }}
    >
      <h1>{task.title}</h1>
      <button>X</button>
    </form>
  );
}
