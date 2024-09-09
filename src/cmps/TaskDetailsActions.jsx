import { Popover } from "@mui/material";
import { CgCreditCard } from "react-icons/cg";
import { IoMdCheckboxOutline } from "react-icons/io";
import { TiTag } from "react-icons/ti";
import { Link, useParams } from "react-router-dom";
import { LabelPicker } from "./LabelPicker";
import { EditChecklist } from "./EditChecklist";
import { LuClock5 } from "react-icons/lu";
import { DueDatePicker } from "./DueDatePicker";
import { AttachmentUploader } from "./AttachmentUploader";
import { FiPaperclip } from "react-icons/fi";
import { BsArchive } from "react-icons/bs";
import { ArchiveAction } from "./ArchiveAction.JSX";
import { CoverPicker } from "./CoverPicker";
import { BsCardImage } from "react-icons/bs";
import { useState } from "react";
import { MemberPicker } from "./MemberPicker";

export function TaskDetailsActions({
  board,
  group,
  task,
  boardId,
  groupId,
  taskId,
  taskPrevActionsModalData,
  setIsTaskPrevModalOpen,
  setTaskSelectedLabels,
  setBoardSelectedLabels,
  onUpdated = () => {},
  setNewDueDate,
  setNewCheckLists,
  setNewFiles,
  newFiles,
  anchorEl,
  setCurrCover,
  setIsPopoverOpen,
  modalOpenByName,
  currCover,
  handleClick,
  isPopoverOpen,
  setTaskMembers,
  taskMembers,
}) {
  const { taskId: taskParams } = useParams();

  function handlePopoverClick(ev) {
    ev.stopPropagation();
  }

  return (
    <section className="actions" style={{ ...taskPrevActionsModalData }}>
      <>
        {taskParams && <h5>Add to card</h5>}

        <div
          role="button"
          data-name="members"
          className="members action-btn"
          aria-describedby="1"
          onClick={handleClick}
        >
          <span className="icon">
            <LuClock5 />
          </span>
          <p>Members</p>

          {modalOpenByName === "members" && isPopoverOpen && (
            <Popover
              id={isPopoverOpen ? "members-popover" : undefined}
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
              <MemberPicker
                board={board}
                task={task}
                handlePopoverClick={handlePopoverClick}
                setIsPopoverOpen={setIsPopoverOpen}
                onUpdated={onUpdated}
                setTaskMembers={setTaskMembers}
                taskMembers={taskMembers}
              />
            </Popover>
          )}
        </div>

        {taskParams && (
          <div
            role="button"
            data-name="checklists"
            className="checklist action-btn"
            aria-describedby="2"
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
          aria-describedby="3"
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
                board={board}
                task={task}
                group={group}
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
          aria-describedby="4"
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
                  width: "auto",
                  maxWidth: "400px",
                  maxHeight: "90vh",
                  overflow: "auto",
                  padding: "10px",
                },
              }}
            >
              <LabelPicker
                task={task}
                handlePopoverClick={handlePopoverClick}
                setTaskSelectedLabels={setTaskSelectedLabels}
                setBoardSelectedLabels={setBoardSelectedLabels}
                setIsPopoverOpen={setIsPopoverOpen}
                onUpdated={onUpdated}
              />
            </Popover>
          )}
        </div>

        {taskParams && (
          <div
            role="button"
            data-name="attach"
            className="attach action-btn"
            aria-describedby="5"
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

        {/* <div
          role="button"
          data-name="cover"
          className="cover action-btn"
          aria-describedby="5"
          onClick={handleClick}
        >
          <span className="icon">
            <BsCardImage />
          </span>
          <p>Cover</p>

          {modalOpenByName === "cover" && isPopoverOpen && (
            <Popover
              id={isPopoverOpen ? "cover-popover" : undefined}
              open={isPopoverOpen}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              disablePortal
              PaperProps={{
                sx: {

                  padding: "20px",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", 
                  borderRadius: "8px", 
                },
              }}
            >
              <CoverPicker 
                onUpdated={onUpdated}
                setIsPopoverOpen={setIsPopoverOpen}
                handlePopoverClick={handlePopoverClick}
                setCurrCover={setCurrCover}
                currCover={currCover}
              />
            </Popover>
          )}



          
        </div> */}
        <div
          role="button"
          data-name="cover"
          className={`cover action-btn ${
            currCover.color ? "cover-selected" : ""
          }`}
          aria-describedby="6"
          onClick={handleClick}
          style={{
            position: currCover.color ? "absolute" : "relative",
            top: currCover.color ? "50px" : "auto",
            zIndex: currCover.color ? 1001 : "auto",
          }}
        >
          <span className="icon">
            <BsCardImage />
          </span>
          <p>Cover</p>

          {modalOpenByName === "cover" && isPopoverOpen && (
            <Popover
              id={isPopoverOpen ? "cover-popover" : undefined}
              open={isPopoverOpen}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              disablePortal
              PaperProps={{
                sx: {
                  padding: "20px",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                  borderRadius: "8px",
                },
              }}
            >
              <CoverPicker
                onUpdated={onUpdated}
                setIsPopoverOpen={setIsPopoverOpen}
                handlePopoverClick={handlePopoverClick}
                setCurrCover={setCurrCover}
                currCover={currCover}
              />
            </Popover>
          )}
        </div>
      </>

      <>
        {taskParams && <h5>Action</h5>}
        {taskParams && (
          <div
            role="button"
            data-name="archive"
            className="archive action-btn"
            aria-describedby="7"
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
