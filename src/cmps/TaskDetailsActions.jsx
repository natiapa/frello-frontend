// import { Button, Popover, Typography } from "@mui/material";
// import { useState } from "react";
// import { IoMdCheckboxOutline } from "react-icons/io";

// export function TaskDetailsActions() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [anchorEl, setAnchorEl] = useState(null);

//   function handleClick(ev) {
//     setIsModalOpen((isOpen) => !isOpen);
//     setAnchorEl(ev.currentTarget);
//   }
//   return (
//     <section className="actions">
//       <button
//         data-name="checklists"
//         className="checklist"
//         aria-describedby={anchorEl}
//         onClick={handleClick}
//       >
//         <span className="icon">
//           <IoMdCheckboxOutline />
//           <span>Checklist</span>
//         </span>

//         {/* {isModalOpen && (
//           <form action="">
//           <input type="text" placeholder="Add an item" />
//           <button className="add-checklist">Add checklist</button>
//           </form>
//           )} */}

//         <Popover
//           id={anchorEl}
//           open={isModalOpen}
//           anchorEl={anchorEl}
//           //   onClose={handleClose}
//           anchorOrigin={{
//             vertical: "bottom",
//             horizontal: "left",
//           }}
//           disablePortal
//           //   sx={{ zIndex: 100000000, position: "fixed" }}
//         >
//           <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
//         </Popover>
//       </button>
//     </section>
//   );
// }

import { Button, Popover, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { CgCreditCard } from "react-icons/cg";
import { IoMdCheckboxOutline } from "react-icons/io";
import { IoCard } from "react-icons/io5";
import { TiTag } from "react-icons/ti";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { EditLables } from "./EditLabels";

export function TaskDetailsActions({
  boardId,
  groupId,
  taskId,
  task,
  taskPrevModalData,
  setIsTaskPrevModalOpen,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isSmallModalOpen, setIsSmallModalOpen] = useState(false);
  const [modalOpenById, setModalOpenById] = useState(null);

  function handleClick(ev) {
    const currDataName = ev.currentTarget.getAttribute("data-name");
    setIsSmallModalOpen((isOpen) => !isOpen);
    setAnchorEl(ev.currentTarget);
    setModalOpenById(currDataName);
  }

  function handlePopoverClick(ev) {
    ev.stopPropagation();
  }

  return (
    <section className="actions" style={{ ...taskPrevModalData }}>
      <button
        data-name="checklists"
        className="checklist action-btn"
        aria-describedby="1"
        onClick={handleClick}
      >
        <span className="icon">
          <IoMdCheckboxOutline />
          <span>Checklist</span>
        </span>

        {modalOpenById === "checklists" && (
          <Popover
            id={anchorEl}
            open={isSmallModalOpen}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            disablePortal
            // disableEnforceFocus
            // disableAutoFocus
          >
            <Typography sx={{ p: 2 }} onClick={handlePopoverClick}>
              CHECKLIST
            </Typography>
          </Popover>
        )}
      </button>

      <Link
        to={`/board/${boardId}/${groupId}/${taskId}`}
        onClick={() => setIsTaskPrevModalOpen(false)}
      >
        <button className="open-card action-btn">
          <span>
            <CgCreditCard />
            <span>open card</span>
          </span>
        </button>
      </Link>

      <button
        aria-describedby="2"
        data-name="labels"
        className="edit-labels action-btn"
        onClick={handleClick}
      >
        <span>
          <TiTag />
          <span>Edit Labels</span>
        </span>

        {modalOpenById === "labels" && (
          <Popover
            id={anchorEl}
            open={isSmallModalOpen}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            disablePortal
          >
            <EditLables
              groupId={groupId}
              task={task}
              handlePopoverClick={handlePopoverClick}
            />
          </Popover>
        )}
      </button>
    </section>
  );
}
