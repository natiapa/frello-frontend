import { useEffect, useState } from "react";
import { socketService , SOCKET_EVENT_MOUSE_MOVE} from "../services/socket.service";

export function MouseTracker() {
    const [otherCursors, setOtherCursors] = useState([]);
  
    useEffect(() => {
      socketService.on(SOCKET_EVENT_MOUSE_MOVE, (mouseData) => {
        setOtherCursors((prevCursors) => {
      
          const updatedCursors = prevCursors.filter(
            (cursor) => cursor.id !== mouseData.id
          );
          return [...updatedCursors, mouseData];
        });
      });
  
      
      socketService.on("user-disconnected", (userId) => {
        setOtherCursors((prevCursors) =>
          prevCursors.filter((cursor) => cursor.id !== userId)
        );
      });
  
      return () => {
        socketService.off(SOCKET_EVENT_MOUSE_MOVE);
        socketService.off("user-disconnected");
      };
    }, []);
  
    useEffect(() => {
      const handleMouseMove = (event) => {
        const mouseData = {
          x: event.clientX,
          y: event.clientY,
        };
        socketService.emit(SOCKET_EVENT_MOUSE_MOVE, mouseData);
      };
  
      window.addEventListener("mousemove", handleMouseMove);
  
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }, []);

   
  
    return (
      <div>
        {otherCursors.map((cursor) => (
          <div
            key={cursor.id}
            style={{
              position: "absolute",
              top: cursor.y,
              left: cursor.x,
              width: "10px",
              height: "10px",
              backgroundColor: "red",
              borderRadius: "50%",
              pointerEvents: "none",
            }}
          ></div>
        ))}
      </div>
    );
  }