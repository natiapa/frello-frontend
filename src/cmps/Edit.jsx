import { useState } from "react";

export function Edit({ task, currElToEdit, onUpdated, setCurrElToEdit }) {
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
          style={{
            border: "1px solid #0C66E4",
            outline: "#0C66E4",
            color: "#172b4d",
            backgroundColor: "",
            fontSize: "14px",
            fontWeight: "600",
            borderRadius: "3px",
            margin: "0px 4px 1px",
            padding: "2px 3px",
            fontFamily:
              "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
          }}
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
