import { Popover, Typography } from "@mui/material";
import { useState } from "react";
import { CgCreditCard } from "react-icons/cg";
import { IoMdCheckboxOutline } from "react-icons/io";
import { TiTag } from "react-icons/ti";
import { Link, useParams } from "react-router-dom";
import {  LabelPicker } from "./LabelPicker";
import { EditChecklist } from "./EditChecklist";
import { LuClock5 } from "react-icons/lu";
import { DueDatePicker } from "./DueDatePicker";
import { AttachmentUploader } from "./AttachmentUploader";
import { FiPaperclip } from "react-icons/fi";
import { BsArchive } from "react-icons/bs";
import { ArchiveAction } from "./ArchiveAction.JSX";

export function TaskDetailsActions({
  boardId,
  groupId,
  taskId,
  task,
  taskPrevActionsModalData,
  setIsTaskPrevModalOpen,
  selectedLabels,
  setSelectedLabels,
  onUpdated = () => {},
  setNewDueDate,
  setNewCheckLists,
  setNewFiles,
  newFiles,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [modalOpenByName, setModalOpenByName] = useState(null);

  const { taskId: taskParams } = useParams();

  function handleClick(ev) {
    const currDataName = ev.currentTarget.getAttribute("data-name");
    setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);
    setAnchorEl(ev.currentTarget);
    setModalOpenByName(currDataName);
  }

  function handlePopoverClick(ev) {
    ev.stopPropagation();
  }

  return (
    <section className="actions" style={{ ...taskPrevActionsModalData }}>
      <>
        {taskParams && <h5>Add to card</h5>}
        {taskParams && (
          <div
            role="button"
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
                id={isPopoverOpen ? "checklist-popover" : undefined} 
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
          </div>
        )}

        <div
          role="button"
          data-name="due-date"
          className="due-date action-btn"
          aria-describedby="2"
          onClick={handleClick}
        >
          <span className="icon">
            <LuClock5 />
          </span>
          <p>Dates</p>

          {modalOpenByName === "due-date" && isPopoverOpen && (
            <Popover
              id={isPopoverOpen ? "due-date-popover" : undefined} 
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
        </div>

        <div
          role="button"
          data-name="labels"
          className="labels action-btn"
          aria-describedby="3"
          onClick={handleClick}
        >
          <span className="icon">
            <TiTag />
          </span>
          <p>Labels</p>

          {modalOpenByName === "labels" && isPopoverOpen && (
            <Popover
              id={isPopoverOpen ? "labels-popover" : undefined} 
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
              <LabelPicker
                groupId={groupId}
                task={task}
                handlePopoverClick={handlePopoverClick}
                selectedLabels={selectedLabels}
                setSelectedLabels={setSelectedLabels}
                setIsPopoverOpen={setIsPopoverOpen}
              />
            </Popover>
          )}
        </div>

        {taskParams && (
          <div
            role="button"
            data-name="attach"
            className="attach action-btn"
            aria-describedby="4"
            onClick={handleClick}
          >
            <span className="icon">
              <FiPaperclip />
            </span>
            <p>Attachment</p>

            {modalOpenByName === "attach" && isPopoverOpen && (
              <Popover
                id={isPopoverOpen ? "attachment-popover" : undefined} 
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
                  task={task}
                  setNewFiles={setNewFiles}
                  newFiles={newFiles}
                />
              </Popover>
            )}
          </div>
        )}
      </>
      <>
        {taskParams && <h5>Action</h5>}
        {taskParams && (
          <div
            role="button"
            data-name="archive"
            className="archive action-btn"
            aria-describedby="5"
            onClick={handleClick}
          >
            <span className="icon">
              <BsArchive />
            </span>
            <p>Archive</p>

            {modalOpenByName === "archive" && isPopoverOpen && (
              <Popover
                id={isPopoverOpen ? "archive-popover" : undefined} 
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
                <ArchiveAction
                  onUpdated={onUpdated}
                  setIsPopoverOpen={setIsPopoverOpen}
                  handlePopoverClick={handlePopoverClick}
                />
              </Popover>
            )}
          </div>
        )}
      </>
      {!taskParams && (
        <Link
          to={`/board/${boardId}/${groupId}/${taskId}`}
          className="open-card action-btn"
          onClick={() => setIsTaskPrevModalOpen(false)}
        >
          <span>
            <CgCreditCard />
          </span>
          <p>Open Card</p>
        </Link>
      )}
    </section>
  );
}


