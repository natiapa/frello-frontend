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
import { BsArchive, BsPersonPlus } from "react-icons/bs";
import { CoverPicker } from "./CoverPicker";
import { BsCardImage } from "react-icons/bs";
import { useState } from "react";
import { MemberPicker } from "./MemberPicker";
import { FaUndo } from "react-icons/fa";
import { IoRemoveOutline } from "react-icons/io5";

// TaskDetailsActions Component
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
  taskSelectedLabels,
  deleteTask,
  setNewCover,
}) {
  const [isDeleteConfirmed, setIsDeleteConfirmed] = useState(false);
  // Extracting taskId from params
  const { taskId: taskParams } = useParams();

  // State to track if archive is clicked
  const [isArchiveClicked, setIsArchiveClicked] = useState(false);

  // Handle Popover Click
  function handlePopoverClick(ev) {
    ev.stopPropagation();
  }

  // Handle Archive Click
  function handleArchiveClick(ev) {
    ev.stopPropagation();
    setIsArchiveClicked(!isArchiveClicked);
  }

  function handelDeleteTask() {}

  return (
    <section className="actions" style={{ ...taskPrevActionsModalData }}>
      {/* Add to Card Section */}
      <>
        {taskParams && <h5>Add to card</h5>}

        {/* Members Action */}
        <div
          role="button"
          data-name="members"
          className="members action-btn"
          aria-describedby="1"
          onClick={handleClick}
        >
          <span className="icon">
            <BsPersonPlus />
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
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              disablePortal
              PaperProps={{
                sx: {
                  width: "304px",
                  height: "max-content",
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

        {/* Checklist Action */}
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

        {/* Due Date Action */}
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
                  width: "max-content",
                  height: "max-content",
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

        {/* Labels Action */}
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
                vertical: "top",
                horizontal: "left",
              }}
              disablePortal
              PaperProps={{
                sx: {
                  width: "auto",
                  overflow: "auto",
                  padding: "10px",
                },
              }}
            >
              <LabelPicker
                board={board}
                task={task}
                handlePopoverClick={handlePopoverClick}
                setTaskSelectedLabels={setTaskSelectedLabels}
                setBoardSelectedLabels={setBoardSelectedLabels}
                setIsPopoverOpen={setIsPopoverOpen}
                onUpdated={onUpdated}
                taskSelectedLabels={taskSelectedLabels}
              />
            </Popover>
          )}
        </div>

        {/* Attachments Action */}
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

        {/* Cover Action */}
        <div
          role="button"
          data-name="cover"
          className={`cover action-btn ${
            currCover?.color ? "cover-selected" : ""
          }`}
          aria-describedby="6"
          onClick={handleClick}
          style={{
            position: currCover?.color ? "absolute" : "relative",
            top: currCover?.color ? "50px" : "auto",
            right: currCover?.color ? "0" : "auto",
            zIndex: currCover?.color ? 1001 : "auto",
            width: currCover?.color ? "max-content" : "100%",
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
                vertical: "top",
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
                setNewCover={setNewCover}
                task={task}
              />
            </Popover>
          )}
        </div>
      </>

      {/* Action Section */}
      <>
        {taskParams && <h5>Action</h5>}

        {taskParams &&
          (!isArchiveClicked ? (
            <div
              role="button"
              data-name="archive"
              className="archive action-btn"
              aria-describedby="7"
              onClick={handleArchiveClick}
            >
              <span className="icon">
                <BsArchive />
              </span>
              <p>Archive</p>
            </div>
          ) : (
            <div>
              {/* Send to Board Action */}
              <div
                role="send-back"
                data-name="send-back"
                className="send-back action-btn"
                aria-describedby="8"
                onClick={handleArchiveClick}
              >
                <span className="icon">
                  <FaUndo style={{ color: "#44546F" }} />
                </span>
                <p>Send to board</p>
              </div>

              {/* Delete Task Action */}
              <div>
                {isDeleteConfirmed ? (
                  <>
                    {/* Confirmation message */}
                    <h3>Delete card?</h3>
                    <p>
                      All actions will be removed from the activity feed and you
                      won’t be able to re-open the card. There is no undo.
                    </p>
                    <div className="delete-confirmation-buttons">
                      <button
                        className="confirm-delete-btn"
                        style={{
                          backgroundColor: "#C9372C",
                          color: "#fff",
                          marginRight: "10px",
                        }}
                        onClick={deleteTask} // Final delete action
                      >
                        Yes, Delete
                      </button>
                      <button
                        className="cancel-btn"
                        style={{ backgroundColor: "#6c757d", color: "#fff" }}
                        onClick={() => setIsDeleteConfirmed(false)} // Cancel the delete
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <div
                    role="button"
                    data-name="delete"
                    className="delet action-btn"
                    aria-describedby="9"
                    onClick={() => setIsDeleteConfirmed(true)} // Show confirmation
                    style={{ backgroundColor: "#C9372C", color: "#fff" }}
                  >
                    <span className="icon">
                      <IoRemoveOutline
                        style={{ fontWeight: "bold", color: "#fff" }}
                      />
                    </span>
                    <p>Delete</p>
                  </div>
                )}
              </div>
            </div>
          ))}
      </>

      {/* Open Card Link */}
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

// import { Popover } from "@mui/material";
// import { CgCreditCard } from "react-icons/cg";
// import { IoMdCheckboxOutline } from "react-icons/io";
// import { TiTag } from "react-icons/ti";
// import { Link, useParams } from "react-router-dom";
// import { LabelPicker } from "./LabelPicker";
// import { EditChecklist } from "./EditChecklist";
// import { LuClock5 } from "react-icons/lu";
// import { DueDatePicker } from "./DueDatePicker";
// import { AttachmentUploader } from "./AttachmentUploader";
// import { FiPaperclip } from "react-icons/fi";
// import { BsArchive, BsPersonPlus } from "react-icons/bs";
// import { CoverPicker } from "./CoverPicker";
// import { BsCardImage } from "react-icons/bs";

// import { useState } from "react";
// import { MemberPicker } from "./MemberPicker";
// import { FaUndo } from "react-icons/fa";
// import { IoRemoveOutline } from "react-icons/io5";

// export function TaskDetailsActions({
//   board,
//   group,
//   task,
//   boardId,
//   groupId,
//   taskId,
//   taskPrevActionsModalData,
//   setIsTaskPrevModalOpen,
//   setTaskSelectedLabels,
//   setBoardSelectedLabels,
//   onUpdated = () => {},
//   setNewDueDate,
//   setNewCheckLists,
//   setNewFiles,
//   newFiles,
//   anchorEl,
//   setCurrCover,
//   setIsPopoverOpen,
//   modalOpenByName,
//   currCover,
//   handleClick,
//   isPopoverOpen,
//   setTaskMembers,
//   taskMembers,
//   taskSelectedLabels,
//   deleteTask,
//   setNewCover,
// }) {
//   const { taskId: taskParams } = useParams();
//   const [isArchiveClicked, setIsArchiveClicked] = useState(false);

//   function handlePopoverClick(ev) {
//     ev.stopPropagation();
//   }

//   function handleArchiveClick(ev) {
//     ev.stopPropagation();
//     const updateArchiveClick = !isArchiveClicked;

//     setIsArchiveClicked(updateArchiveClick);
//   }

//   return (
//     <section className="actions" style={{ ...taskPrevActionsModalData }}>
//       <>
//         {taskParams && <h5>Add to card</h5>}

//         <div
//           role="button"
//           data-name="members"
//           className="members action-btn"
//           aria-describedby="1"
//           onClick={handleClick}
//         >
//           <span className="icon">
//             <BsPersonPlus />
//           </span>
//           <p>Members</p>

//           {modalOpenByName === "members" && isPopoverOpen && (
//             <Popover
//               id={isPopoverOpen ? "members-popover" : undefined}
//               open={isPopoverOpen}
//               anchorEl={anchorEl}
//               anchorOrigin={{
//                 vertical: "bottom",
//                 horizontal: "left",
//               }}
//               transformOrigin={{
//                 vertical: "top",
//                 horizontal: "left", // אפשר גם לנסות 'center' או 'right' לפי המקרה
//               }}
//               disablePortal
//               PaperProps={{
//                 sx: {
//                   width: "304px",
//                   height: "max-content",
//                   padding: "20px",
//                 },
//               }}
//             >
//               <MemberPicker
//                 board={board}
//                 task={task}
//                 handlePopoverClick={handlePopoverClick}
//                 setIsPopoverOpen={setIsPopoverOpen}
//                 onUpdated={onUpdated}
//                 setTaskMembers={setTaskMembers}
//                 taskMembers={taskMembers}
//               />
//             </Popover>
//           )}
//         </div>

//         {taskParams && (
//           <div
//             role="button"
//             data-name="checklists"
//             className="checklist action-btn"
//             aria-describedby="2"
//             onClick={handleClick}
//           >
//             <span className="icon">
//               <IoMdCheckboxOutline />
//             </span>
//             <p>Checklist</p>

//             {modalOpenByName === "checklists" && (
//               <Popover
//                 id={isPopoverOpen ? "checklist-popover" : undefined}
//                 open={isPopoverOpen}
//                 anchorEl={anchorEl}
//                 anchorOrigin={{
//                   vertical: "bottom",
//                   horizontal: "left",
//                 }}
//                 disablePortal
//               >
//                 <EditChecklist
//                   groupId={groupId}
//                   taskId={taskId}
//                   task={task}
//                   onUpdated={onUpdated}
//                   setIsPopoverOpen={setIsPopoverOpen}
//                   handlePopoverClick={handlePopoverClick}
//                   setNewCheckLists={setNewCheckLists}
//                 />
//               </Popover>
//             )}
//           </div>
//         )}

//         <div
//           role="button"
//           data-name="due-date"
//           className="due-date action-btn"
//           aria-describedby="3"
//           onClick={handleClick}
//         >
//           <span className="icon">
//             <LuClock5 />
//           </span>
//           <p>Dates</p>

//           {modalOpenByName === "due-date" && isPopoverOpen && (
//             <Popover
//               id={isPopoverOpen ? "due-date-popover" : undefined}
//               open={isPopoverOpen}
//               anchorEl={anchorEl}
//               anchorOrigin={{
//                 vertical: "bottom",
//                 horizontal: "left",
//               }}
//               disablePortal
//               PaperProps={{
//                 sx: {
//                   width: "max-content",
//                   height: "max-content",
//                   padding: "20px",
//                 },
//               }}
//             >
//               <DueDatePicker
//                 board={board}
//                 task={task}
//                 group={group}
//                 onUpdated={onUpdated}
//                 setIsPopoverOpen={setIsPopoverOpen}
//                 handlePopoverClick={handlePopoverClick}
//                 setNewDueDate={setNewDueDate}
//               />
//             </Popover>
//           )}
//         </div>

//         <div
//           role="button"
//           data-name="labels"
//           className="labels action-btn"
//           aria-describedby="4"
//           onClick={handleClick}
//         >
//           <span className="icon">
//             <TiTag />
//           </span>
//           <p>Labels</p>

//           {modalOpenByName === "labels" && isPopoverOpen && (
//             <Popover
//               id={isPopoverOpen ? "labels-popover" : undefined}
//               open={isPopoverOpen}
//               anchorEl={anchorEl}
//               anchorOrigin={{
//                 vertical: "top",
//                 horizontal: "left",
//               }}
//               // transformOrigin={{
//               //   vertical: -100, // מספר שלילי ימקם את הפופ גבוה יותר
//               //   horizontal: "left",
//               // }}
//               disablePortal
//               PaperProps={{
//                 sx: {
//                   width: "auto",
//                   // maxWidth: "400px",
//                   // maxHeight: "90vh",
//                   overflow: "auto",
//                   padding: "10px",
//                 },
//               }}
//             >
//               <LabelPicker
//                 board={board}
//                 task={task}
//                 handlePopoverClick={handlePopoverClick}
//                 setTaskSelectedLabels={setTaskSelectedLabels}
//                 setBoardSelectedLabels={setBoardSelectedLabels}
//                 setIsPopoverOpen={setIsPopoverOpen}
//                 onUpdated={onUpdated}
//                 taskSelectedLabels={taskSelectedLabels}
//               />
//             </Popover>
//           )}
//         </div>

//         {taskParams && (
//           <div
//             role="button"
//             data-name="attach"
//             className="attach action-btn"
//             aria-describedby="5"
//             onClick={handleClick}
//           >
//             <span className="icon">
//               <FiPaperclip />
//             </span>
//             <p>Attachment</p>

//             {modalOpenByName === "attach" && isPopoverOpen && (
//               <Popover
//                 id={isPopoverOpen ? "attachment-popover" : undefined}
//                 open={isPopoverOpen}
//                 anchorEl={anchorEl}
//                 anchorOrigin={{
//                   vertical: "bottom",
//                   horizontal: "left",
//                 }}
//                 disablePortal
//               >
//                 <AttachmentUploader
//                   onUpdated={onUpdated}
//                   setIsPopoverOpen={setIsPopoverOpen}
//                   handlePopoverClick={handlePopoverClick}
//                   task={task}
//                   setNewFiles={setNewFiles}
//                   newFiles={newFiles}
//                 />
//               </Popover>
//             )}
//           </div>
//         )}

//         <div
//           role="button"
//           data-name="cover"
//           className={`cover action-btn ${
//             currCover?.color ? "cover-selected" : ""
//           }`}
//           aria-describedby="6"
//           onClick={handleClick}
//           style={{
//             position: currCover?.color ? "absolute" : "relative",
//             top: currCover?.color ? "50px" : "auto",
//             right: currCover?.color ? "0" : "auto",
//             zIndex: currCover?.color ? 1001 : "auto",
//             width: currCover?.color ? "max-content" : "100%",
//           }}
//         >
//           <span className="icon">
//             <BsCardImage />
//           </span>
//           <p>Cover</p>

//           {modalOpenByName === "cover" && isPopoverOpen && (
//             <Popover
//               id={isPopoverOpen ? "cover-popover" : undefined}
//               open={isPopoverOpen}
//               anchorEl={anchorEl}
//               anchorOrigin={{
//                 vertical: "top",
//                 horizontal: "left",
//               }}
//               disablePortal
//               PaperProps={{
//                 sx: {
//                   padding: "20px",
//                   boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
//                   borderRadius: "8px",
//                 },
//               }}
//             >
//               <CoverPicker
//                 onUpdated={onUpdated}
//                 setIsPopoverOpen={setIsPopoverOpen}
//                 handlePopoverClick={handlePopoverClick}
//                 setCurrCover={setCurrCover}
//                 currCover={currCover}
//                 setNewCover={setNewCover}
//               />
//             </Popover>
//           )}
//         </div>
//       </>

//       <>
//         {taskParams && <h5>Action</h5>}
//         {taskParams &&
//           (!isArchiveClicked ? (
//             <div
//               role="button"
//               data-name="archive"
//               className="archive action-btn"
//               aria-describedby="7"
//               onClick={handleArchiveClick}
//             >
//               <span className="icon">
//                 <BsArchive />
//               </span>
//               <p>Archive</p>
//             </div>
//           ) : (
//             <div>
//               <div
//                 role="send-back"
//                 data-name="send-back"
//                 className="send-back action-btn"
//                 aria-describedby="8"
//                 onClick={handleArchiveClick}
//               >
//                 <span className="icon">
//                   <FaUndo style={{ color: "#44546F" }} />
//                 </span>
//                 <p>Send to board</p>
//               </div>

//               <div
//                 role="button"
//                 data-name="delete"
//                 className="delet action-btn"
//                 aria-describedby="9"
//                 onClick={deleteTask}
//                 style={{ backgroundColor: "#C9372C", color: "#fff" }}
//               >
//                 <span className="icon">
//                   <IoRemoveOutline
//                     style={{ fontWeight: "bold", color: "#fff" }}
//                   />
//                 </span>
//                 <p>Delete</p>
//               </div>
//             </div>
//           ))}
//       </>
//       {!taskParams && (
//         <Link
//           to={`/board/${boardId}/${groupId}/${taskId}`}
//           className="open-card action-btn"
//           onClick={() => setIsTaskPrevModalOpen(false)}
//         >
//           <span>
//             <CgCreditCard />
//           </span>
//           <p>Open Card</p>
//         </Link>
//       )}
//     </section>
//   );
// }
