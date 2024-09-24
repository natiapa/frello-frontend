import { useEffect, useState } from 'react'
import { makeId } from '../services/util.service'
import { ProgressBar } from './ProgressBar'
import { boardService } from '../services/board'
import { IoMdCheckboxOutline } from 'react-icons/io'
import { ChecklistItems } from './ChecklistItems'

export function TaskChecklist({ checklists, onUpdated = () => {}, task, group, board }) {
    const [updatedCl, setUpdatedCl] = useState([...checklists])
    const [isAddingItem, setIsAddingItem] = useState(false)
    const [itemText, setItemText] = useState('')
    const [textItemToEdit, setTextItemToEdit] = useState('')
    const [hideCheckedItems, setHideCheckedItems] = useState(false)

    useEffect(() => {
        setUpdatedCl(checklists)
    }, [checklists?.length])

    async function onRemoveChecklist(ev, checklistId) {
        ev.preventDefault()
        const deletedChecklist = checklists.find(
            checklist => checklist.id === checklistId
        )

        const checklistsToSave = updatedCl.filter(
            checklist => checklist.id !== checklistId
        )

        setUpdatedCl(checklistsToSave)
        onUpdated('checklists', checklistsToSave)
        await boardService.updateActivities(
            board,
            '',
            'deleteChecklist',
            group,
            task,
            deletedChecklist
        )
    }

    async function handleChangeCheckbox({ target }, item, checklistId) {
        const { name, checked } = target

        const checklistToUpdate = updatedCl.find(
            checklist => checklist.id === checklistId
        )
        const updatedItems = checklistToUpdate.items.map(currItem =>
            currItem.id === item.id ? { ...currItem, [name]: checked } : currItem
        )

        const updatedItem = updatedItems.find(currItem => currItem.id === item.id)
        boardService.updateActivities(
            board,
            '',
            'completeChecklistItem',
            group,
            task,
            '',
            '',
            updatedItem
        )

        const updatedChecklist = { ...checklistToUpdate, items: updatedItems }

        const updatedChecklists = updatedCl.map(cl =>
            cl.id === checklistId ? updatedChecklist : cl
        )

        setUpdatedCl(updatedChecklists)
        onUpdated('checklists', updatedChecklists)
    }

    function handleHideItems() {
        setHideCheckedItems(!hideCheckedItems)
    }

    function onSaveItem(ev, checklistId) {
        ev.preventDefault()

        const updatedChecklist = updatedCl.map(checklist => {
            if (checklist.id === checklistId) {
                checklist.isAddingItem = false
                const updatedItems = [
                    ...checklist.items,
                    { id: makeId(), text: itemText, isChecked: false },
                ]
                return { ...checklist, items: updatedItems }
            }
            return checklist
        })

        setUpdatedCl(updatedChecklist)
        onUpdated('checklists', updatedChecklist)
        setIsAddingItem(false)
    }

    function handleChangeTextItem(ev) {
        setItemText(ev.target.value)
    }

    function handleEditTextItem(ev) {
        ev.preventDefault()
        setTextItemToEdit(ev.target.value)
    }

    function onEditingTextItem(ev, item) {
        ev.preventDefault()
        const updatedChecklist = updatedCl.map(checklist => {
            const updatedItems = checklist.items.map(currItem => {
                currItem.edit = false
                if (currItem.id === item.id) {
                    currItem.edit = true
                    setTextItemToEdit(item.text)
                    return { ...currItem, text: textItemToEdit }
                }
                return currItem
            })
            return { ...checklist, items: updatedItems }
        })
        setUpdatedCl(updatedChecklist)
    }

    function saveEditingItem(ev, item) {
        ev.preventDefault()
        const newText = textItemToEdit
        const updatedChecklist = updatedCl.map(checklist => {
            const updatedItems = checklist.items.map(currItem => {
                currItem.edit = false
                if (currItem.id === item.id) {
                    setTextItemToEdit(ev.target.value)
                    return { ...currItem, text: newText }
                }
                return currItem
            })
            return { ...checklist, items: updatedItems }
        })
        setUpdatedCl(updatedChecklist)
        onUpdated('checklists', updatedChecklist)
    }
    function closeForm(ev, item) {
        ev.preventDefault()
        const updatedChecklist = updatedCl.map(checklist => {
            const updatedItems = checklist.items.map(currItem => {
                if (currItem.id === item.id) {
                    item.edit = false
                    return { ...currItem, text: textItemToEdit }
                }
                return currItem
            })
            return { ...checklist, items: updatedItems }
        })
        setUpdatedCl(updatedChecklist)
    }

    function onAddItem(ev, checklist) {
        ev.preventDefault()
        checklist.isAddingItem = true
        setIsAddingItem(true)
    }

    function oncancel(ev, checklist) {
        ev.preventDefault()
        checklist.isAddingItem = false
        setIsAddingItem(false)
    }

    function handleKeyDown(ev, checklistId) {
        if (ev.key === 'Enter') {
            ev.preventDefault()
            onSaveItem(ev, checklistId)
        }
    }

    function handleEditingSaveKeyDown(ev, item) {
        if (ev.key === 'Enter') {
            ev.preventDefault()
            saveEditingItem(ev, item)
        }
    }

    return (
        <div className="task-checklist">
            <ul className="checklists">
                {updatedCl &&
                    updatedCl.map(checklist => (
                        <li className="checklist" key={checklist.id}>
                            <div className="header-and-btns">
                                <IoMdCheckboxOutline />
                                <h3>
                                    <span>{checklist.title}</span>
                                </h3>
                                {checklist.items.some(item => item.isChecked) && (
                                    <button
                                        className="hide-btn"
                                        type="button"
                                        onClick={handleHideItems}>
                                        {hideCheckedItems
                                            ? 'Show checked items'
                                            : 'Hide checked items'}
                                    </button>
                                )}
                                <button
                                    className="delete-checklist-btn"
                                    style={{ gridColumn: '4' }}
                                    onClick={ev => onRemoveChecklist(ev, checklist.id)}>
                                    Delete
                                </button>
                            </div>
                            <ProgressBar items={checklist.items} />
                            {!isAddingItem && (
                                <button
                                    className="add-item"
                                    onClick={ev => onAddItem(ev, checklist)}>
                                    Add an item
                                </button>
                            )}
                            {isAddingItem && checklist.isAddingItem && (
                                <div className="add-an-item-form">
                                    <input
                                        type="text"
                                        onChange={handleChangeTextItem}
                                        placeholder="Add an item"
                                        onKeyDown={ev => handleKeyDown(ev, checklist.id)}
                                        autoFocus
                                    />
                                    <div className="btns">
                                        <button
                                            className="save-item-btn"
                                            onClick={ev => onSaveItem(ev, checklist.id)}>
                                            Add
                                        </button>
                                        <button onClick={ev => oncancel(ev, checklist)}>
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )}
                            <ChecklistItems
                                checklist={checklist}
                                handleChangeCheckbox={handleChangeCheckbox}
                                onEditingTextItem={onEditingTextItem}
                                handleEditTextItem={handleEditTextItem}
                                textItemToEdit={textItemToEdit}
                                saveEditingItem={saveEditingItem}
                                handleEditingSaveKeyDown={handleEditingSaveKeyDown}
                                closeForm={closeForm}
                            />
                        </li>
                    ))}
            </ul>
        </div>
    )
}
