import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { socketService, SOCKET_EVENT_MOUSE_MOVE } from "../services/socket.service";
import { FaMousePointer } from "react-icons/fa";

export function MouseTracker({boardId}) {

  const [myCursor, setMyCursor] = useState({ x: 0, y: 0 });
  const [otherCursors, setOtherCursors] = useState([]);



  useEffect(() => {
    const handleMouseMove = (event) => {
      const mouseData = {
        x: event.clientX,
        y: event.clientY,
        boardId, 
      };

      setMyCursor(mouseData); 
      socketService.emit(SOCKET_EVENT_MOUSE_MOVE, mouseData); 
    };

    window.addEventListener("mousemove", handleMouseMove);
    socketService.on(SOCKET_EVENT_MOUSE_MOVE, (cursorData) => {
        setOtherCursors((prevCursors) => ({
          ...prevCursors,
          [cursorData.id]: cursorData, 
        }));
      });
  
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        socketService.off(SOCKET_EVENT_MOUSE_MOVE);
      };
    }, [boardId]); 

    const filteredCursors = Object.values(otherCursors).filter(cursor => cursor.id !== socketService.getSocketId());
    
    return (
        <div>
          {filteredCursors.map((cursor, index) => (
            <FaMousePointer
              key={index}
              style={{
                position: "absolute",
                top: cursor.y,
                left: cursor.x,
                color: "black",
                fontSize: "24px", 
                pointerEvents: "none",
              }}
            />
          ))}
        </div>
      );
    }