import { useEffect, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { boardService } from "../services/board";
import { useSelector } from "react-redux";
import { updateBoard } from "../store/actions/board.actions";
import SvgIcon from "./SvgIcon";
// import { loadBoard, addBoardMsg } from "../store/actions/board.actions";

export function EditLabels({
  task,
  groupId,
  handlePopoverClick,
  selectedLabels,
  setSelectedLabels,
  setIsPopoverOpen,
}) {
  // const [selectedLabels, setSelectedLabels] = useState([]);
  const board = useSelector((storeState) => storeState.boardModule.board);

  const labelsList = [
    { label: "Completed", color: "#4BCE97" },
    { label: "On Hold", color: "#F5CD47" },
    { label: "In Progress", color: "#FEA362" },
    { label: "Urgent", color: "#F87168" },
    { label: "Important", color: "#9F8FEF" },
    { label: "Review", color: "#579DFF" },
    { label: "Low Priority", color: "#8590A2" },
  ];

  useEffect(() => {
    setSelectedLabels(task.labels);
  }, [board]);

  useEffect(() => {
    if (!selectedLabels) return;
    onUpdateBoard();
  }, [selectedLabels, board]);

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
      {/* <div className="icon"> */}
      <button
        className="close-labels-btn"
        onClick={() => setIsPopoverOpen(false)}
      >
        <SvgIcon iconName="close" />
      </button>

      <h2>Labels</h2>
      {/* </div> */}
      {/* <span>X</span> */}

      <p className="labels-title">Lables</p>
      <div className="labels-container">
        <ul>
          {labelsList.map((label, idx) => (
            <li key={idx}>
              <input
                data-name={label.label}
                type="checkbox"
                checked={selectedLabels.includes(label.label)}
                onChange={() => handleLabelChange(label.label)}
              />
              <div
                className="label-color"
                style={{
                  backgroundColor: label.color,
                }}
              ></div>
              {/* <span className="icon">
                <FiEdit2 />
              </span> */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
