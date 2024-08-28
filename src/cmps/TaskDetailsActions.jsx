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
  selectedLabels,
  setSelectedLabels,
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
