import { useState, useEffect } from "react";
import { boardService } from "../services/board";
import { MdClose } from "react-icons/md";
import { IoArrowBackOutline } from "react-icons/io5";

export function EditLabel({
  label,
  onSave,
  onDelete,
  onAdd,
  handleClose,
  setEditLabel,
}) {
  const [labelToEdit, setLabelToEdit] = useState(
    label || { title: "", color: "" }
  );
  const staticLabels = boardService.getAllLabels();
  const [deleteLabel, setDeleteLabel] = useState(false);

  console.log(labelToEdit);

  useEffect(() => {
    setLabelToEdit(label );
  }, [label]);

  function handelInputChange({ target }) {
    const { name, value } = target;
    setLabelToEdit((prevLabel) => ({
      ...prevLabel,
      [name]: value,
    }));
  }

  function handleColorChange(color) {
    setLabelToEdit((prevLabel) => ({
      ...prevLabel,
      color: color,
    }));
  }

  function handleRemoveColor() {
    setLabelToEdit((prevLabel) => ({
      ...prevLabel,
      color: "",
    }));
  }

  function handleAddLabel() {
    onAdd(labelToEdit);
  }

  function handleBack() {
    setEditLabel("");
  }

  return (
    <>
      {deleteLabel ? (
 
        <section className="label-delete-container">
              <h5>Delete lable</h5>
          <p>This will remove this label from all cards.There is no undo.</p>
          <button
            className="confirm-delete-btn"
            onClick={() => onDelete(labelToEdit)}
          >
            Yes, delete
          </button>
          <button className="cancel-btn" onClick={() => setDeleteLabel(false)}>
            Cancel
          </button>
        </section>
      ) : (
        <section className="label-edit-container">
          <div className="header">
            <button className="back-btn" onClick={handleBack}>
              <IoArrowBackOutline />
            </button>
            <h5 className="labels-heading">
              {labelToEdit.isEditable === true
                ? "Edit Label"
                : "Create New Label"}
            </h5>
            <button className="close-btn" onClick={handleClose}>
              <MdClose />
            </button>
          </div>

          <div
            className="label-preview"
            style={{ backgroundColor: labelToEdit.color || "#f0f0f0" }}
          >
            {labelToEdit.title}
          </div>

          <label>Title</label>
          <input
            type="text"
            name="title"
            value={labelToEdit.title || ""}
            onChange={handelInputChange}
          />

          <label>Select a color</label>
          <div className="color-grid">
            {staticLabels.map((label, idx) => (
              <div
                key={label.id}
                className={`color-item ${
                  labelToEdit.color === label.color ? "selected" : ""
                }`}
                style={{ backgroundColor: label.color }}
                onClick={() => handleColorChange(label.color)}
              ></div>
            ))}
          </div>

          <button className="remove-color-button" onClick={handleRemoveColor}>
            × Remove color
          </button>

          <div className="action-buttons">
            {labelToEdit.isEditable === true ? (
              <>
                <button
                  className="save-btn"
                  onClick={() => onSave(labelToEdit)}
                >
                  Save
                </button>
                <button
                  className="delete-btn"
                  onClick={() => setDeleteLabel(true)}
                >
                  Delete
                </button>
              </>
            ) : (
              <button className="create-btn" onClick={handleAddLabel}>
                Create
              </button>
            )}
          </div>
        </section>
      )}
    </>
  );
}
