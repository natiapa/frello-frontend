
import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { boardService } from "../services/board";
import { useSelector } from "react-redux";
import { updateBoard } from "../store/actions/board.actions";
import SvgIcon from "./SvgIcon";
import { MdEdit } from "react-icons/md";
// import { loadBoard, addBoardMsg } from "../store/actions/board.actions";

export function LabelPicker({
  task,
  groupId,
  handlePopoverClick,
  selectedLabels,
  setSelectedLabels,
  setIsPopoverOpen,
}) {

  
  const board = useSelector((storeState) => storeState.boardModule.board);
  const labelsList = board.labels
  console.log(labelsList)

  // useEffect(() => {
  //   setSelectedLabels(task.labels);
  // }, [board]);

  // useEffect(() => {
  //   if (!selectedLabels) return;
  //   onUpdateBoard();
  // }, [selectedLabels, board]);

  function handleLabelChange(label) {
    setSelectedLabels((prevSelected) =>
      prevSelected.includes(label)
        ? prevSelected.filter((l) => l !== label)
        : [...prevSelected, label]
    );
  }

  function onUpdateBoard() {
    const updatedBoard = boardService.updateBoard(board, groupId, task.id, {
      key: "labels",
      value: selectedLabels,
    });
    updateBoard(updatedBoard);
  }

  return (
    <div className="edit-task-modal-content" onClick={handlePopoverClick}>
 
      <button
        className="close-labels-btn"
        onClick={() => setIsPopoverOpen(false)}
      >
        <SvgIcon iconName="close" />
      </button>

      <h2>Labels</h2>

      <p className="labels-title">Lables</p>
      <div className="labels-container">
        <ul>
          {labelsList.map((label, idx) => (
            <li key={idx}>
              <input
                data-name={label.color}
                type="checkbox"
                // checked={selectedLabels.includes(label.color)}
                // onChange={() => handleLabelChange(label.color)}
              />
              <div
                className="label-color"
                style={{
                  backgroundColor: label.color,
                }}
              ></div>

              <span className="edit-icon">
                <MdEdit/>
              </span>

            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// <ul>
// {labelsList.map((label, idx) => (
//  <li key={idx}>
//    <input
//      data-name={label.label}
//      type="checkbox"
//      checked={selectedLabels.includes(label.label)}
//      onChange={() => handleLabelChange(label.label)}
//    />
//    <div
//      className="label-color"
//      style={{
//        backgroundColor: label.color,
//      }}
//    ></div>
//    {/* <span className="icon">
//      <FiEdit2 />
//    </span> */}
//  </li>
// ))}
// </ul>
