import { useState } from "react";

export function ChecklistItem({ item, checklistId, handleChecklistItem }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedText, setEditedText] = useState(item.text)

  return (
    <li>
      <input
        type="checkbox"
        checked={item.isChecked}
        onChange={(ev) =>
          handleChecklistItem(ev, checklistId, item.id, editedText)
        }
      />
      {!isEditing ? (
        <span
          style={{
            textDecoration: item.isChecked ? "line-through" : "none",
          }}
          onClick={() => setIsEditing(true)}
        >
          {item.text}
        </span>
      ) : (
        <span>
          <input
            type="text"
            value={editedText}
            onChange={(ev) => setEditedText(ev.target.value)}
          />
          <button
            onClick={() => {
              handleChecklistItem(
                { target: { checked: item.isChecked } },
                checklistId,
                item.id,
                editedText
              );
              setIsEditing(false);
            }}
          >
            Save
          </button>

          <button onClick={() => setIsEditing(false)}>X</button>
        </span>
      )}
    </li>
  );
}
