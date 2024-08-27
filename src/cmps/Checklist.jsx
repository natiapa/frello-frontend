
import { ChecklistItem } from "./ChecklistItem";
import { ProgressBar } from "./ProgressBar"

export function Checklist({
    checklist,
    handleChecklistItem,
    onRemoveChecklist,
    onAddItem,
    isAddingItem,
    newItem,
    setNewItem,
    onSaveItem,
    onCloseItem
  }) {
    return (
      <div className="task-checklist">
        <h4>{checklist.title}</h4>
        <button type="button" onClick={() => onRemoveChecklist(checklist.id)}>
          Delete
        </button>
        <ProgressBar items={checklist.items} />
        <ul>
          {checklist.items.map((item) => (
            <ChecklistItem
              key={item.id}
              item={item}
              checklistId={checklist.id}
              handleChecklistItem={handleChecklistItem}
            />
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
              <button onClick={onCloseItem}>Cancel</button>
            </div>
          ) : (
            <button onClick={() => onAddItem(checklist.id)}>
              Add an item
            </button>
          )}
        </div>
      </div>
    );
  }
  