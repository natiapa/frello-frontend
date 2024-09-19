import { useEffect, useState } from "react";
import {
  socketService,
  SOCKET_EVENT_MOUSE_MOVE,
  SOCKET_EVENT_USER_LEFT,
} from "../services/socket.service";
import { FaMousePointer } from "react-icons/fa";

export function MouseTracker({ boardId }) {
  const [myCursor, setMyCursor] = useState({ x: 0, y: 0 });
  const [otherCursors, setOtherCursors] = useState({});

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    socketService.on(SOCKET_EVENT_MOUSE_MOVE, handleMouseMoveFromOthers);

    socketService.on(SOCKET_EVENT_USER_LEFT, handleUserLeft);

    return () => {
      console.log("Preparing to leave board", boardId);
      socketService.emit("leaveBoard", boardId);
      socketService.off(SOCKET_EVENT_MOUSE_MOVE);
      socketService.off(SOCKET_EVENT_USER_LEFT, handleUserLeft);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [boardId]);

  function handleMouseMove(ev) {
    const mouseData = {
      x: ev.clientX,
      y: ev.clientY,
      boardId,
    };

    setMyCursor(mouseData);
    socketService.emit(SOCKET_EVENT_MOUSE_MOVE, mouseData);
  }

  function handleMouseMoveFromOthers(cursorData) {
    setOtherCursors((prevCursors) => ({
      ...prevCursors,
      [cursorData.id]: cursorData,
    }));
  }

  function handleUserLeft(user) {
    const userId = user.id;
    console.log(userId);
    setOtherCursors((prevCursors) => {
      const updatedCursors = { ...prevCursors };

      delete updatedCursors[userId];

      return updatedCursors;
    });
  }

  const filteredCursors = Object.values(otherCursors).filter(
    (cursor) => cursor.id !== socketService.getSocketId()
  );

  return (
    <div>
      {filteredCursors.map((cursor, index) => {
        const isNearRightEdge = cursor.x > window.innerWidth - 100;
        const isNearBottomEdge = cursor.y > window.innerHeight - 50;

        return (
          <div
            key={index}
            style={{ position: "absolute", top: cursor.y, left: cursor.x }}
          >
            <FaMousePointer
              style={{
                color: "black",
                fontSize: "24px",
                pointerEvents: "none",
                zIndex: "1000000",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: isNearBottomEdge ? "-30px" : "30px",
                left: isNearRightEdge ? "-80%" : "-50%",
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                color: "white",
                padding: "4px 8px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "500",
                whiteSpace: "nowrap",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                pointerEvents: "none",
                zIndex: "1000000",
              }}
            >
              {cursor.fullname}
            </div>
          </div>
        );
      })}
    </div>
  );
}
