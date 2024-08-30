import { ChecklistItem } from "./ChecklistItem";
import { ProgressBar } from "./ProgressBar";

export function Checklist({
  checklist,
  handleChecklistItem,
  handleHideItems,
  onRemoveChecklist,
  onAddItem,
  isAddingItem,
  hideCheckedItems,
  newItem,
  setNewItem,
  onSaveItem,
  onCloseItem,
  onUpdated,
  checklists,

}) {
  return (
    <div className="task-checklist">
      <h4>{checklist.title}</h4>
      <button type="button" onClick={() => onRemoveChecklist(checklist.id)}>
        Delete
      </button>
      {checklist.items.some((item) => item.isChecked) && (
        <button type="button" onClick={handleHideItems}>
          {hideCheckedItems ? "Show checked items" : "Hide checked items"}
        </button>
      )}
      <ProgressBar items={checklist.items} />
      <ul>
        {checklist.items
          .filter((item) => !hideCheckedItems || !item.isChecked)
          .map((item) => (
            <ChecklistItem
              key={item.id}
              item={item}
              checklist={checklist}
              onUpdated={onUpdated}
              checklists={checklists}
             
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
          <button onClick={() => onAddItem(checklist.id)}>Add an item</button>
        )}
      </div>
    </div>
  );
}
