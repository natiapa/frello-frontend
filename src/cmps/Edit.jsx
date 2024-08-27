import { useState } from "react";

export function Edit({
  task,
  currElToEdit,
  onUpdated,
  setCurrElToEdit,
}) {
  const [value, setValue] = useState(task[currElToEdit]);

  function handleSave() {
    if (currElToEdit === "description") {
      onUpdated(currElToEdit, value);
      setCurrElToEdit("");
    }
  }

  function handleBlur() {
    if (currElToEdit === "title") {
      onUpdated(currElToEdit, value);
      setCurrElToEdit("");
    }
  }

  return (
    <div>
      {currElToEdit === "title" && (
        <input
          type="text"
          name={currElToEdit}
          value={value}
          onChange={(ev) => setValue(ev.target.value)}
          onBlur={handleBlur}
          autoFocus
        />
      )}

      {currElToEdit === "description" && (
        <div className="edit-task-description">
          <textarea
            name={currElToEdit}
            value={value}
            placeholder="Add a more detailed description..."
            onChange={(ev) => setValue(ev.target.value)}
            autoFocus
            rows={5}
            cols={40}
          />
          <div className="description-buttons">
            <button onClick={handleSave} className="save-description">
              Save
            </button>
            <button
              onClick={() => setCurrElToEdit("")}
              className="cancel-description"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
