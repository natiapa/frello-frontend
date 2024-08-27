import { useState } from "react";
import { useNavigate } from "react-router";
import { boardService } from "../services/board";
import { Checklist } from "./Checklist";

export function TaskChecklist({
  checklists,
  onUpdated,
  task,
  groupId,
  boardId,
}) {
  const [checklistsState, setChecklistsState] = useState(checklists || []);
  const [isAddingItem, setIsAddingItem] = useState(null)
  const [newItem, setNewItem] = useState("");
  const navigate = useNavigate();

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
    onUpdated("checklists", updatedChecklists);
  }

  function onAddItem(checklistId) {
    setIsAddingItem(checklistId);
  }

  function onCloseItem() {
    setIsAddingItem(null);
    setNewItem("")
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
        }
      }
      return checklist;
    });

    setChecklistsState(updatedChecklists);
    onUpdated("checklists", updatedChecklists);
    setIsAddingItem(null);
    setNewItem("");
  }

  function onRemoveChecklist(checklistId) {
    const updatedChecklists = task.checklists.filter(
      (checklist) => checklist.id !== checklistId
    );
    setChecklistsState(updatedChecklists);
    onUpdated("checklists", updatedChecklists);
    navigate(`/board/${boardId}/${groupId}/${task.id}`);
  }

  return (
    <div className="task-checklists">
      {checklistsState.map((checklist) => (
        <Checklist
          key={checklist.id}
          checklist={checklist}
          handleChecklistItem={handleChecklistItem}
          onRemoveChecklist={onRemoveChecklist}
          onAddItem={onAddItem}
          isAddingItem={isAddingItem}
          newItem={newItem}
          setNewItem={setNewItem}
          onSaveItem={onSaveItem}
          onCloseItem={onCloseItem}
        />
      ))}
    </div>
  );
}
