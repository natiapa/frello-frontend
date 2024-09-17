import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { boardService } from "../services/board";
import { updateBoard } from "../store/actions/board.actions";
import { useParams } from "react-router";

export function EditChecklist({
  board,
  group,
  groupId,
  taskId,
  task,
  onUpdated,
  setIsPopoverOpen,
  handlePopoverClick,
  setNewCheckLists,
}) {
  

  const [title, setTitle] = useState("checklist");

  const [localChecklists, setLocalChecklists] = useState(
  
    Array.isArray(task.checklists) ? task.checklists : []
  );


  // const checklists =
  //   board.groups
  //     .find((group) => group.id === groupId)
  //     .tasks.find((task) => task.id === taskId).checklists || [];

  // useEffect(() => {
  //   console.log("checklists:", checklists);
  //   setNewCheckLists(checklists);
  // }, [checklists?.length]);

  function handleChange(ev) {
    setTitle(ev.target.value);
  }

  async function onAddChecklist() {


    // console.log('before add checklists',checklists)
    console.log(localChecklists)
    localChecklists.push({ ...boardService.getEmptyChecklist(), title });
    const updatedChecklists = localChecklists;
    setLocalChecklists(updatedChecklists)
    setNewCheckLists(updatedChecklists)
    console.log(updatedChecklists)
    
    onUpdated("checklists", updatedChecklists);


    // setNewCheckLists(checklists);

    // const group = board?.groups?.find((group) => group.id === groupId);

    // console.log('after add checklists',checklists)

    await boardService.updateActivities(
      board,
      "",
      "addChecklist",
      group,
      task,
      localChecklists[localChecklists.length - 1]
    );

    setIsPopoverOpen(false);
  }

  function handleKeyDown(ev) {
    if (ev.key === "Enter") {
      ev.preventDefault(); // מונע מהטופס להישלח אם יש אחד
      onAddChecklist();
    }
  }

  return (
    <div className="edit-checklist" onClick={handlePopoverClick}>
      <h2>Checklist</h2>
      <label>
        <span className="title-pop">title</span>
        <input type="text" value={title} onChange={handleChange} onKeyDown={handleKeyDown} autoFocus/>
      </label>
      <div className="edit-checklist-btn" onClick={onAddChecklist}>
        Add
      </div>
    </div>
  );
}


// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { boardService } from "../services/board";
// import { updateBoard } from "../store/actions/board.actions";
// import { useParams } from "react-router";

// export function EditChecklist({
//   groupId,
//   taskId,
//   task,
//   onUpdated,
//   setIsPopoverOpen,
//   handlePopoverClick,
//   setNewCheckLists,
// }) {
//   const board = useSelector((state) => state.boardModule.board);

//   const [title, setTitle] = useState("checklist");
//   const checklists =
//     board.groups
//       .find((group) => group.id === groupId)
//       .tasks.find((task) => task.id === taskId).checklists || [];

//   useEffect(() => {
//     console.log("checklists:", checklists);
//     setNewCheckLists(checklists);
//   }, [checklists?.length]);

//   function handleChange(ev) {
//     setTitle(ev.target.value);
//   }

//   async function onAddChecklist() {
//     console.log('before add checklists',checklists)
//     checklists.push({ ...boardService.getEmptyChecklist(), title });
//     setNewCheckLists(checklists);

//     const group = board?.groups?.find((group) => group.id === groupId);

//     onUpdated("checklists", checklists);
//     console.log('after add checklists',checklists)

//     await boardService.updateActivities(
//       board,
//       "",
//       "addChecklist",
//       group,
//       task,
//       checklists[checklists.length - 1]
//     );

//     setIsPopoverOpen(false);
//   }

//   function handleKeyDown(ev) {
//     if (ev.key === "Enter") {
//       ev.preventDefault(); // מונע מהטופס להישלח אם יש אחד
//       onAddChecklist();
//     }
//   }

//   return (
//     <div className="edit-checklist" onClick={handlePopoverClick}>
//       <h2>Checklist</h2>
//       <label>
//         <span className="title-pop">title</span>
//         <input type="text" value={title} onChange={handleChange} onKeyDown={handleKeyDown} autoFocus/>
//       </label>
//       <div className="edit-checklist-btn" onClick={onAddChecklist}>
//         Add
//       </div>
//     </div>
//   );
// }
