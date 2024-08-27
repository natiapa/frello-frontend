export function ChecklistItem({ item, checklistId, handleChecklistItem }) {
    return (
      <li>
        <input
          type="checkbox"
          checked={item.isChecked}
          onChange={(ev) => handleChecklistItem(ev, checklistId, item.id)}
        />
        <span
          style={{
            textDecoration: item.isChecked ? "line-through" : "none",
          }}
        >
          {item.text}
        </span>
      </li>
    );
  }
  