import { useEffect, useState } from "react";
import { makeId } from "../services/util.service";
import { ProgressBar } from "./ProgressBar";
import { boardReducer } from "../store/reducers/board.reducer";
import { boardService } from "../services/board";
import { FaRegCheckSquare } from "react-icons/fa";
import { IoMdCheckboxOutline } from "react-icons/io";

export function TaskChecklist({
  checklists,
  onUpdated = () => {},
  task,
  group,
  board,
}) {
  const [updatedChecklists, setUpdatedChecklists] = useState([...checklists]);
  const [isAddingItem, setIsAddingItem] = useState(false);
  // const [currItemIsEditing, setCurrItemIsEditing] = useState(false);
  const [itemText, setItemText] = useState("");
  const [textItemToEdit, setTextItemToEdit] = useState("");

  useEffect(() => {
    console.log("render!");
    setUpdatedChecklists(task.checklists);
  }, [updatedChecklists]);

  async function onRemoveChecklist(ev, checklistId) {
    ev.preventDefault();
    const deletedChecklist = checklists.find(
      (checklist) => checklist.id === checklistId
    );

    const checklistsToSave = updatedChecklists.filter(
      (checklist) => checklist.id !== checklistId
    );

    setUpdatedChecklists(checklistsToSave);
    onUpdated("checklists", checklistsToSave);
    await boardService.updateActivities(
      board,
      "",
      "deleteChecklist",
      group,
      task,
      deletedChecklist
    );
  }

  async function handleChangeCheckbox({ target }, item, checklistId) {
    // console.log(item);
    const { name, checked } = target;

    const checklistToUpdate = updatedChecklists.find(
      (checklist) => checklist.id === checklistId
    );
    const updatedItems = checklistToUpdate.items.map((currItem) =>
      currItem.id === item.id ? { ...currItem, [name]: checked } : currItem
    );

    const updatedItem = updatedItems.find(
      (currItem) => currItem.id === item.id
    );
    boardService.updateActivities(
      board,
      "",
      "completeChecklistItem",
      group,
      task,
      "",
      "",
      updatedItem
    );

    const updatedChecklist = { ...checklistToUpdate, items: updatedItems };

    const updatedChecklistsList = updatedChecklists.map((cl) =>
      cl.id === checklistId ? updatedChecklist : cl
    );

    setUpdatedChecklists(updatedChecklistsList);
    onUpdated("checklists", updatedChecklistsList);
  }

  function onSaveItem(ev, checklistId) {
    ev.preventDefault();

    const updatedChecklistsList = updatedChecklists.map((checklist) => {
      if (checklist.id === checklistId) {
        checklist.isAddingItem = false;
        const updatedItems = [
          ...checklist.items,
          { id: makeId(), text: itemText, isChecked: false },
        ];
        return { ...checklist, items: updatedItems };
      }
      return checklist;
    });

    setUpdatedChecklists(updatedChecklistsList);
    onUpdated("checklists", updatedChecklistsList);
    setIsAddingItem(false);
  }

  function handleChangeTextItem(ev) {
    setItemText(ev.target.value);
  }

  function handleEditTextItem(ev) {
    ev.preventDefault();
    setTextItemToEdit(ev.target.value);
  }

  function onEditingTextItem(ev, item) {
    ev.preventDefault();
    const updatedChecklistsList = updatedChecklists.map((checklist) => {
      const updatedItems = checklist.items.map((currItem) => {
        currItem.edit = false;
        if (currItem.id === item.id) {
          // setCurrItemIsEditing(true);
          // item.edit = true;
          currItem.edit = true;
          setTextItemToEdit(item.text);
          return { ...currItem, text: textItemToEdit };
        }
        return currItem;
      });
      return { ...checklist, items: updatedItems };
    });
    setUpdatedChecklists(updatedChecklistsList);
  }
  function saveEditingItem(ev, item) {
    ev.preventDefault();

    const updatedChecklistsList = updatedChecklists.map((checklist) => {
      const updatedItems = checklist.items.map((currItem) => {
        currItem.edit = false;
        if (currItem.id === item.id) {
          // item.edit = false;
          setTextItemToEdit(ev.target.value);
          console.log("textItemToEdit:", textItemToEdit);
          return { ...currItem, text: textItemToEdit };
        }
        return currItem;
      });
      return { ...checklist, items: updatedItems };
    });
    setUpdatedChecklists(updatedChecklistsList);
    // setCurrItemIsEditing(false);
    onUpdated("checklists", updatedChecklistsList);
  }
  function closeForm(ev, item) {
    ev.preventDefault();
    const updatedChecklistsList = updatedChecklists.map((checklist) => {
      const updatedItems = checklist.items.map((currItem) => {
        if (currItem.id === item.id) {
          item.edit = false;
          return { ...currItem, text: textItemToEdit };
        }
        return currItem;
      });
      return { ...checklist, items: updatedItems };
    });
    setUpdatedChecklists(updatedChecklistsList);
    // setCurrItemIsEditing(false);
  }

  function onAddItem(ev, checklist) {
    ev.preventDefault();
    checklist.isAddingItem = true;
    setIsAddingItem(true);
  }

  function oncancel(ev, checklist) {
    ev.preventDefault();
    checklist.isAddingItem = false;
    setIsAddingItem(false);
  }

  function handleKeyDown(ev, checklistId) {
    if (ev.key === "Enter") {
      ev.preventDefault(); // מונע שליחה של טופס ברירת מחדל אם יש אחד
      onSaveItem(ev, checklistId); // שמירת הפריט עם לחיצת Enter
    }
  }

  return (
    <div className="task-checklist">
      <ul className="checklists">
        {updatedChecklists &&
          updatedChecklists.map((checklist) => (
            <li className="checklist" key={checklist.id}>
              <div className="header-and-btns">
                <IoMdCheckboxOutline />
                <h3>
                  <span>{checklist.title}</span>
                </h3>
                <button
                  className="delete-checklist-btn"
                  onClick={(ev) => onRemoveChecklist(ev, checklist.id)}
                >
                  Delete
                </button>
              </div>
              <ProgressBar items={checklist.items} />
              {!isAddingItem && (
                <button
                  className="add-item"
                  onClick={(ev) => onAddItem(ev, checklist)}
                >
                  Add an item
                </button>
              )}
              {isAddingItem && checklist.isAddingItem && (
                <div className="add-an-item-form">
                  <input
                    type="text"
                    onChange={handleChangeTextItem}
                    placeholder="Add an item"
                    onKeyDown={(ev) => handleKeyDown(ev, checklist.id)} // מאזין ללחיצת Enter
                    autoFocus
                  />
                  <div className="btns">
                  <button className="save-item-btn" onClick={(ev) => onSaveItem(ev, checklist.id)}>
                    Add
                  </button>
                  <button onClick={(ev) => oncancel(ev, checklist)}>
                    Cancel
                  </button>

                  </div>
                </div>
              )}
              <ul className="items">
                {checklist.items.map((item) => (
                  <li className="item" key={item.id}>
                    <input
                      name="isChecked"
                      checked={item.isChecked}
                      type="checkbox"
                      onChange={(ev) =>
                        handleChangeCheckbox(ev, item, checklist.id)
                      }
                    />
                    {!item.edit && (
                      <p onClick={(ev) => onEditingTextItem(ev, item)}>
                        {item.text}
                      </p>
                    )}
                    {item.edit && (
                      <div className="edit-item">
                        <input
                          type="text"
                          onChange={handleEditTextItem}
                          value={textItemToEdit}
                        />
                        <div className="btns">

                        <button className="save-edit-btn" onClick={(ev) => saveEditingItem(ev, item)}>
                          Save
                        </button>
                        <button onClick={(ev) => closeForm(ev, item)}>X</button>
                      </div>
                        </div>
                    )}
                  </li>
                ))}
              </ul>
            </li>
          ))}
      </ul>
    </div>
  );
}
