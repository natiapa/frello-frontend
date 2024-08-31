import { Popover, Typography } from "@mui/material";
import { useState } from "react";
import { CgCreditCard } from "react-icons/cg";
import { IoMdCheckboxOutline } from "react-icons/io";
import { TiTag } from "react-icons/ti";
import { Link, useParams } from "react-router-dom";
import { EditLables } from "./EditLabels";
import { EditChecklist } from "./EditChecklist";
import { SiDatefns } from "react-icons/si";
import { LuClock5 } from "react-icons/lu";
import { DueDatePicker } from "./DueDatePicker";

export function TaskDetailsActions({
  boardId,
  groupId,
  taskId,
  task,
  taskPrevActionsModalData,
  setIsTaskPrevModalOpen,
  selectedLabels,
  setSelectedLabels,
  onUpdated,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [modalOpenByName, setModalOpenByName] = useState(null);

  const { taskId: taskParams } = useParams();

  function handleClick(ev) {
    const currDataName = ev.currentTarget.getAttribute("data-name");
    setIsPopoverOpen((isOpen) => !isOpen);
    setAnchorEl(ev.currentTarget);
    setModalOpenByName(currDataName);
  }

  function handlePopoverClick(ev) {
    ev.stopPropagation();
  }

  return (
    <section className="actions" style={{ ...taskPrevActionsModalData }}>
      <button
        data-name="checklists"
        className="checklist action-btn"
        aria-describedby="1"
        onClick={handleClick}
      >
        <span className="icon">
          <IoMdCheckboxOutline />
        </span>
        <p>Checklist </p>

        {modalOpenByName === "checklists" && (
          <Popover
            id={anchorEl}
            open={isPopoverOpen}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            disablePortal
            // disableEnforceFocus
            // disableAutoFocus
          >
            <Typography sx={{ p: 2 }} onClick={handlePopoverClick}></Typography>

            <EditChecklist
              groupId={groupId}
              taskId={taskId}
              task={task}
              setIsPopoverOpen={setIsPopoverOpen}
              handlePopoverClick={handlePopoverClick}
            />
          </Popover>
        )}
      </button>

      <button
        data-name="due-date"
        className="due-date action-btn"
        aria-describedby="5"
        onClick={handleClick}
      >
        <span className="icon">
          <LuClock5 />
        </span>
        <p> Dates </p>

        {modalOpenByName === "due-date" && (
          <Popover
            id={anchorEl}
            open={isPopoverOpen}
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
                width: "400px",
                height: "600px",
                padding: "20px",
              },
            }}
          >
            <Typography sx={{ p: 2 }} onClick={handlePopoverClick}>
              <DueDatePicker
                onUpdated={onUpdated}
              />
            </Typography>
          </Popover>
        )}
      </button>

      {!taskParams && (
        <Link
          to={`/board/${boardId}/${groupId}/${taskId}`}
          onClick={() => setIsTaskPrevModalOpen(false)}
        >
          <button className="open-card action-btn">
            <span>
              <CgCreditCard />
            </span>
            <p>open card</p>
          </button>
        </Link>
      )}

      <button
        aria-describedby="2"
        data-name="labels"
        className="edit-labels action-btn"
        onClick={handleClick}
      >
        <span>
          <TiTag />
        </span>
        <p>Edit Labels</p>

        {modalOpenByName === "labels" && (
          <Popover
            id={anchorEl}
            open={isPopoverOpen}
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
              selectedLabels={selectedLabels}
              setSelectedLabels={setSelectedLabels}
            />
          </Popover>
        )}
      </button>
    </section>
  );
}

{
}
