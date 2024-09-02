import { Popover, Typography } from "@mui/material";
import { useState } from "react";
import { CgCreditCard } from "react-icons/cg";
import { IoMdCheckboxOutline } from "react-icons/io";
import { TiTag } from "react-icons/ti";
import { Link, useParams } from "react-router-dom";
import { EditLables } from "./EditLabels";
import { EditChecklist } from "./EditChecklist";
import { LuClock5 } from "react-icons/lu";
import { DueDatePicker } from "./DueDatePicker";
import { AttachmentUploader } from "./AttachmentUploader";
import { FiPaperclip } from "react-icons/fi";

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
  setNewDueDate,
  setNewCheckLists,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [modalOpenByName, setModalOpenByName] = useState(null);
  const [dataN, setDataN] = useState("");

  const { taskId: taskParams } = useParams();

  function handleClick(ev) {
    const currDataName = ev.currentTarget.getAttribute("data-name");
    setDataN(currDataName);
    setIsPopoverOpen((isOpen) => !isOpen);
    setAnchorEl(ev.currentTarget);
    setModalOpenByName(currDataName);
  }

  function handlePopoverClick(ev) {
    ev.stopPropagation();
  }

  return (
    <section className="actions" style={{ ...taskPrevActionsModalData }}>
      {taskParams && (
        <button
          data-name="checklists"
          className="checklist action-btn"
          aria-describedby="1"
          onClick={handleClick}
        >
          <span className="icon">
            <IoMdCheckboxOutline />
          </span>
          <p>Checklist</p>

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
            >
              <EditChecklist
                groupId={groupId}
                taskId={taskId}
                task={task}
                onUpdated={onUpdated}
                setIsPopoverOpen={setIsPopoverOpen}
                handlePopoverClick={handlePopoverClick}
                setNewCheckLists={setNewCheckLists}
              />
            </Popover>
          )}
        </button>
      )}

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

        {modalOpenByName === "due-date" && isPopoverOpen && (
          <Popover
            id={anchorEl}
            open={isPopoverOpen}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            disablePortal
            PaperProps={{
              sx: {
                width: "400px",
                height: "600px",
                padding: "20px",
              },
            }}
          >
            <DueDatePicker
              onUpdated={onUpdated}
              setIsPopoverOpen={setIsPopoverOpen}
              handlePopoverClick={handlePopoverClick}
              setNewDueDate={setNewDueDate}
            />
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

        {modalOpenByName === "labels" && isPopoverOpen && (
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
              setIsPopoverOpen={setIsPopoverOpen}
            />
          </Popover>
        )}
      </button>

      <button
        data-name="attach"
        className="attach action-btn"
        aria-describedby="6"
        onClick={handleClick}
      >
        <span className="icon">
        <FiPaperclip />

        </span>
        <p>Attchment</p>

        {modalOpenByName === "attach" && isPopoverOpen && (
          <Popover
            id={anchorEl}
            open={isPopoverOpen}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            disablePortal
            PaperProps={{
              sx: {
                width: "400px",
                height: "600px",
                padding: "20px",
              },
            }}
          >
            <AttachmentUploader
              onUpdated={onUpdated}
              setIsPopoverOpen={setIsPopoverOpen}
              handlePopoverClick={handlePopoverClick}
            />
          </Popover>
        )}
      </button>
    </section>
  );
}

{
}
