import { useState } from "react";
import { boardService } from "../services/board/board.service.local";
import { ProgressBar } from "./ProgressBar";

export function TaskChecklist({ checklists, onUpdatedTask }) {
  const [checklistsState, setChecklistsState] = useState(checklists);
  const [isAddingItem, setIsAddingItem] = useState(null);
  const [newItem, setNewItem] = useState("");

  function handleChecklistItem({ target }, checklistId, itemId) {
    const isChecked = target.checked;

    const updatedChecklists = checklistsState.map((checklist) =>
      checklist.id === checklistId
        ? {
            ...checklist,
            items: checklist.items.map((item) =>
              item.id === itemId ? { ...item, isChecked } : item
            ),
          }
        : checklist
    );

    setChecklistsState(updatedChecklists);
    onUpdatedTask("checklists", updatedChecklists);
  }

  function onAddItem(checklistId) {
    setIsAddingItem(checklistId);
  }
  function onCloseItem() {
    setIsAddingItem(null);
    setNewItem("");
  }

  function onSaveItem() {
    const updatedChecklists = checklistsState.map((checklist) => {
      if (checklist.id === isAddingItem) {
        return {
          ...checklist,
          items: [
            ...checklist.items,
            {
              ...boardService.getEmptyItem(),
              text: newItem,
            },
          ],
        };
      }
      return checklist;
    });

    setChecklistsState(updatedChecklists);
    onUpdatedTask("checklists", updatedChecklists);
    setIsAddingItem(null);
    setNewItem("");
  }

  return (
    <div className="task-checklists">
      {checklistsState.map((checklist) => (
        <div key={checklist.id} className="task-checklist">
          <h4>{checklist.title}</h4>
          <ProgressBar items={checklist.items} />
          <ul>
            {checklist.items.map((item) => (
              <li key={item.id}>
                <input
                  type="checkbox"
                  checked={item.isChecked}
                  onChange={(ev) =>
                    handleChecklistItem(ev, checklist.id, item.id)
                  }
                />
                <span
                  style={{
                    textDecoration: item.isChecked ? "line-through" : "none",
                  }}
                >
                  {item.text}
                </span>
              </li>
            ))}
          </ul>
          <div>
            {isAddingItem === checklist.id ? (
              <div>
                <input
                  type="text"
                  placeholder="Enter new item"
                  value={newItem}
                  onChange={(ev) => setNewItem(ev.target.value)}
                />
                <button onClick={onSaveItem}>Save</button>
                <button onClick={onCloseItem}>cancel</button>
              </div>
            ) : (
              <button onClick={() => onAddItem(checklist.id)}>
                Add an item
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
