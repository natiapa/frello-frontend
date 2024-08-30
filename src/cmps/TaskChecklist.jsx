import { useEffect, useState } from 'react'
import { makeId } from '../services/util.service'
import { ProgressBar } from './ProgressBar'

export function TaskChecklist({ checklists, onUpdated, task, groupId, boardId }) {
    const [updatedChecklists, setUpdatedChecklists] = useState([...checklists])
    const [isAddingItem, setIsAddingItem] = useState(false)
    const [currItemIsEditing, setCurrItemIsEditing] = useState(false)
    const [itemText, setItemText] = useState('')
    const [textItemToEdit, setTextItemToEdit] = useState('')

    useEffect(() => {
        console.log('render!')
    }, [updatedChecklists])

    function onRemoveChecklist(ev, checklistId) {
        ev.preventDefault()
        const checklistsToSave = updatedChecklists.filter(checklist => checklist.id !== checklistId)
        setUpdatedChecklists(checklistsToSave)
        onUpdated('checklists', checklistsToSave)
    }

    function handleChangeCheckbox({ target }, item, checklistId) {
        const { name, checked } = target

        const checklistToUpdate = updatedChecklists.find(checklist => checklist.id === checklistId)
        const updatedItems = checklistToUpdate.items.map(currItem => (currItem.id === item.id ? { ...currItem, [name]: checked } : currItem))

        const updatedChecklist = { ...checklistToUpdate, items: updatedItems }
        const updatedChecklistsList = updatedChecklists.map(cl => (cl.id === checklistId ? updatedChecklist : cl))

        setUpdatedChecklists(updatedChecklistsList)
        onUpdated('checklists', updatedChecklistsList)
    }

    function onAddItem(ev, checklistId) {
        ev.preventDefault()

        const updatedChecklistsList = updatedChecklists.map(checklist => {
            if (checklist.id === checklistId) {
                const updatedItems = [...checklist.items, { id: makeId(), text: itemText, isChecked: false }]
                return { ...checklist, items: updatedItems }
            }
            return checklist
        })

        setUpdatedChecklists(updatedChecklistsList)
        onUpdated('checklists', updatedChecklistsList)
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
        const updatedChecklistsList = updatedChecklists.map(checklist => {
            const updatedItems = checklist.items.map(currItem => {
                if (currItem.id === item.id) {
                    setCurrItemIsEditing(true)
                    item.edit = true
                    setTextItemToEdit(item.text)
                    return { ...currItem, text: textItemToEdit }
                }
                return currItem
            })
            return { ...checklist, items: updatedItems }
        })
        setUpdatedChecklists(updatedChecklistsList)
    }
    function saveEditingItem(ev, item) {
        ev.preventDefault()

        const updatedChecklistsList = updatedChecklists.map(checklist => {
            const updatedItems = checklist.items.map(currItem => {
                if (currItem.id === item.id) {
                    item.edit = false
                    setTextItemToEdit(ev.target.value)
                    console.log('textItemToEdit:', textItemToEdit)
                    return { ...currItem, text: textItemToEdit }
                }
                return currItem
            })
            return { ...checklist, items: updatedItems }
        })
        setUpdatedChecklists(updatedChecklistsList)
        setCurrItemIsEditing(false)
        onUpdated('checklists', updatedChecklistsList)
    }
    function closeForm(ev, item) {
        ev.preventDefault()
        const updatedChecklistsList = updatedChecklists.map(checklist => {
            const updatedItems = checklist.items.map(currItem => {
                if (currItem.id === item.id) {
                    item.edit = false
                    return { ...currItem, text: textItemToEdit }
                }
                return currItem
            })
            return { ...checklist, items: updatedItems }
        })
        setUpdatedChecklists(updatedChecklistsList)
        setCurrItemIsEditing(false)
    }

    return (
        <div className="task-checklist">
            <ul className="checklists">
                {updatedChecklists &&
                    updatedChecklists.map(checklist => (
                        <li className="checklist" key={checklist.id}>
                            <div className="header-and-btns">
                                <h1>{checklist.title}</h1>
                                <button onClick={ev => onRemoveChecklist(ev, checklist.id)}>Delete</button>
                            </div>
                            <ProgressBar items={checklist.items} />
                            {!isAddingItem && <button onClick={() => setIsAddingItem(true)}>Add an item</button>}
                            {isAddingItem && (
                                <div>
                                    <input type="text" onChange={handleChangeTextItem} placeholder="Add an item" />
                                    <button onClick={ev => onAddItem(ev, checklist.id)}>Add</button>
                                    <button onClick={() => setIsAddingItem(false)}>Cancel</button>
                                </div>
                            )}
                            <ul className="items">
                                {checklist.items.map(item => (
                                    <li className="item" key={item.id}>
                                        <input name="isChecked" checked={item.isChecked} type="checkbox" onChange={ev => handleChangeCheckbox(ev, item, checklist.id)} />
                                        {!item.edit && <p onClick={ev => onEditingTextItem(ev, item)}>{item.text}</p>}
                                        {item.edit && (
                                            <div className="edit-item">
                                                <input type="text" onChange={handleEditTextItem} value={textItemToEdit} />
                                                <button onClick={ev => saveEditingItem(ev, item)}>Save</button>
                                                <button onClick={ev => closeForm(ev, item)}>X</button>
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
            </ul>
        </div>
    )
}
