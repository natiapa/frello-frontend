import { useEffect, useState } from "react";
import { socketService, SOCKET_EVENT_MOUSE_MOVE, SOCKET_EVENT_USER_LEFT } from "../services/socket.service";
import { FaMousePointer } from "react-icons/fa";

export function MouseTracker({ boardId }) {
  const [myCursor, setMyCursor] = useState({ x: 0, y: 0 });
  const [otherCursors, setOtherCursors] = useState({});


  useEffect(() => {

    window.addEventListener("mousemove", handleMouseMove);


    socketService.on(SOCKET_EVENT_MOUSE_MOVE, handleMouseMoveFromOthers);


    socketService.on(SOCKET_EVENT_USER_LEFT, handleUserLeft);

    return () => {

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
    setOtherCursors((prevCursors) => {
      const updatedCursors = { ...prevCursors };
      if (userId in updatedCursors) {
        delete updatedCursors[userId];
      } else {
        console.warn(`User ${userId} not found in otherCursors`);
      }
      return updatedCursors;
    });
  }


  const filteredCursors = Object.values(otherCursors).filter(
    (cursor) => cursor.id !== socketService.getSocketId()
  )

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
            zIndex: 9999,
          }}
        />
      ))}
    </div>
  );
}


// import { useEffect, useState } from "react";
// import { socketService, SOCKET_EVENT_MOUSE_MOVE, SOCKET_EVENT_USER_LEFT } from "../services/socket.service";
// import { FaMousePointer } from "react-icons/fa";

// export function MouseTracker({ boardId }) {
//   const [myCursor, setMyCursor] = useState({ x: 0, y: 0 });
//   const [otherCursors, setOtherCursors] = useState({});

//   useEffect(() => {
//     window.addEventListener("mousemove", handleMouseMove);

//     socketService.on(SOCKET_EVENT_MOUSE_MOVE, (cursorData) => {
//       setOtherCursors((prevCursors) => ({
//         ...prevCursors,
//         [cursorData.id]: cursorData,
//       }));
//     });

//     socketService.on(SOCKET_EVENT_USER_LEFT, handleUserLeft);

//     return () => {
//       console.log("Component is being unmounted or boardId changed");
//       socketService.emit("leaveBoard", boardId);

//       socketService.off(SOCKET_EVENT_MOUSE_MOVE);

//       socketService.off(SOCKET_EVENT_USER_LEFT, handleUserLeft);
//       window.removeEventListener("mousemove", handleMouseMove);
//     };
//   }, [boardId]);

//   function handleMouseMove(ev) {
//     const mouseData = {
//       x: ev.clientX,
//       y: ev.clientY,
//       boardId,
//     };

//     setMyCursor(mouseData);
//     socketService.emit(SOCKET_EVENT_MOUSE_MOVE, mouseData);
//   }

//   function handleUserLeft(user) {
//     const userId = user.id;

//     setOtherCursors((prevCursors) => {
//       const updatedCursors = { ...prevCursors };

//       if (userId in updatedCursors) {
//         delete updatedCursors[userId];
//         console.log("Cursors after deletion:", updatedCursors);
//       } else {
//         console.log(`User ${userId} not found in otherCursors`);
//       }

//       return updatedCursors;
//     });
//   }

//   const filteredCursors = Object.values(otherCursors).filter(
//     (cursor) => cursor.id !== socketService.getSocketId()
//   );

//   return (
//     <div>
//       {filteredCursors.map((cursor, index) => (
//         <FaMousePointer
//           key={index}
//           style={{
//             position: "absolute",
//             top: cursor.y,
//             left: cursor.x,
//             color: "black",
//             fontSize: "24px",
//             pointerEvents: "none",
//             zIndex: 9999,
//           }}
//         />
//       ))}
//     </div>
//   );
// }

