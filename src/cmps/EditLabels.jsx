import { useEffect, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { boardService } from "../services/board";
import { useSelector } from "react-redux";
import { updateBoard } from "../store/actions/board.actions";
// import { loadBoard, addBoardMsg } from "../store/actions/board.actions";

export function EditLables({
  task,
  groupId,
  handlePopoverClick,
  selectedLabels,
  setSelectedLabels,
}) {
  // const [selectedLabels, setSelectedLabels] = useState([]);
  const board = useSelector((storeState) => storeState.boardModule.board);

  const labelsList = [
    { label: "Urgent", color: "red" },
    { label: "In Progress", color: "orange" },
    { label: "Completed", color: "green" },
    { label: "On Hold", color: "yellow" },
    { label: "Review", color: "blue" },
    { label: "Low Priority", color: "gray" },
    { label: "Important", color: "purple" },
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
      <h2>Labels</h2>
      <span>X</span>

      <p>Lables</p>
      <div>
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
              <span className="icon">
                <FiEdit2 />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
