import { Popover, Typography } from "@mui/material";
import { useState } from "react";
import { CgCreditCard } from "react-icons/cg";
import { IoMdCheckboxOutline } from "react-icons/io";
import { TiTag } from "react-icons/ti";
import { Link } from "react-router-dom";
import { EditLables } from "./EditLabels";
import { SiDatefns } from "react-icons/si";
import { LuClock5 } from "react-icons/lu";
import { DueDatePicker } from "./DueDatePicker";

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
  const [modalOpenByName, setModalOpenByName] = useState(null);

  function handleClick(ev) {
    const currDataName = ev.currentTarget.getAttribute("data-name");
    setIsSmallModalOpen((isOpen) => !isOpen);
    setAnchorEl(ev.currentTarget);
    setModalOpenByName(currDataName);
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
          <span>Checklist </span>
        </span>

        {modalOpenByName === "checklists" && (
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

      <button
        data-name="due-date"
        className="due-date action-btn"
        aria-describedby="5"
        onClick={handleClick}
      >
        <div>
        <span className="icon">
          <LuClock5 />
          <span> Dates </span>
        </span>
        </div>

        {modalOpenByName === "due-date" && (
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
            PaperProps={{
              sx: {
                width: '400px', 
                height: '600px', 
                padding: '20px',
              },
            }}
          >
            <Typography sx={{ p: 2 }} onClick={handlePopoverClick}>
              <DueDatePicker task={task} taskId={taskId}/>
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

        {modalOpenByName === "labels" && (
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
