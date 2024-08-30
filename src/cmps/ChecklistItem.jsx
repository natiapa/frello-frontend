import { useState } from 'react'

export function ChecklistItem({ item, checklist, onUpdated, checklists }) {
    console.log('item:', item)
    const [isEditing, setIsEditing] = useState(false)
    const [editedText, setEditedText] = useState(item.text)
    const [currItemIsChecked, setCurrItemIsChecked] = useState(item.isChecked)

    function handleCheckboxClick({ target }) {
        const { type, value, name, checked } = target
        console.log('checked:', checked)
        console.log('value:', value)
        setCurrItemIsChecked(checked)
        const itemToUpdate = { ...item, [name]: currItemIsChecked }
       
        const itemIdx = checklist.items.findIndex(item => item.id === itemToUpdate.id)
        checklist.items.splice(itemIdx, itemToUpdate)
        const checklistIdx = checklists.findIndex(currChecklist => currChecklist.id === checklist.id)
        checklists.splice(checklistIdx, checklist)
        console.log('100:', checklist.items)
        onUpdated('checklists', checklists)
    }

    return (
        <li>
            <input type="checkbox" name="isChecked" checked={currItemIsChecked} onChange={handleCheckboxClick} />
            {!isEditing ? (
                <span
                    style={{
                        textDecoration: item.isChecked ? 'line-through' : 'none',
                    }}
                    onClick={() => setIsEditing(true)}>
                    {item.text}
                </span>
            ) : (
                <span>
                    <input type="text" value={editedText} onChange={ev => setEditedText(ev.target.value)} />
                    <button
                        onClick={ev => {
                            handleChecklistItem({ ev, target: { checked: item.isChecked } }, checklist, item.id, editedText)
                            setIsEditing(false)
                        }}>
                        Save
                    </button>

                    <button onClick={() => setIsEditing(false)}>X</button>
                </span>
            )}
        </li>
    )
}
