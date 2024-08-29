import { useState } from 'react'
import { useNavigate } from 'react-router'
import { boardService } from '../services/board'
import { Checklist } from './Checklist'

export function TaskChecklist({ checklists, onUpdated, task, groupId, boardId }) {
    const [checklistsState, setChecklistsState] = useState(checklists || [])
    const [isAddingItem, setIsAddingItem] = useState(null)
    const [hideCheckedItems, setHideCheckedItems] = useState(false)
    const [newItem, setNewItem] = useState('')
    const navigate = useNavigate()
    console.log('checklistsState:', checklistsState)

    function handleChecklistItem({ target }, checklist, itemId, editedText) {
        console.log('checklist:', checklist)
        //   console.log('1:',checklistId,'2:', itemId, '3:',editedText);

        //   const isChecked = target.checked;
        // console.log('isChecked:', isChecked)
        const selectedChecklist = checklistsState.filter(currChecklist => currChecklist.id === checklist.id)
        console.log('selectedChecklist:', selectedChecklist)
        const selectedItem = selectedChecklist[0].items.find(currItem => currItem.id === itemId)
        const updateIsChecked = !selectedItem.isChecked
        const itemToUpdate = { ...selectedItem, isChecked: updateIsChecked }
        console.log('itemToUpdate:', itemToUpdate)
        onUpdated('checklist',itemToUpdate)
        setChecklistsState(selectedChecklist)
        // currChecklist.id === checklist.id
        //   ? {
        //       ...currChecklist,
        //       items: checklist.items.map((item) =>
        //         item.id === itemId
        //           ? { ...item, isChecked, text: editedText?.trim() ? editedText : item.text }
        //           : item
        //       ),
        //     }
        //   : checklist

        // onUpdated('checklists', updatedChecklists)
        // console.log('updatedChecklists:', updatedChecklists)
    }

    function handleHideItems() {
        setHideCheckedItems(!hideCheckedItems)
    }

    function onAddItem(checklistId) {
        setIsAddingItem(checklistId)
    }

    function onCloseItem() {
        setIsAddingItem(null)
        setNewItem('')
    }

    function onSaveItem() {
        const updatedChecklists = checklistsState.map(checklist => {
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
            console.log('checklist:', checklist)
            return checklist
        })

        setChecklistsState(updatedChecklists)
        onUpdated('checklists', updatedChecklists)
        setIsAddingItem(null)
        setNewItem('')
    }

    function onRemoveChecklist(checklistId) {
        const updatedChecklists = task.checklists.filter(checklist => checklist.id !== checklistId)
        setChecklistsState(updatedChecklists)
        onUpdated('checklists', updatedChecklists)
        navigate(`/board/${boardId}/${groupId}/${task.id}`)
    }

    return (
        <div className="task-checklists">
            {checklistsState.map(checklist => (
                <Checklist
                    key={checklist.id}
                    checklist={checklist}
                    handleHideItems={handleHideItems}
                    handleChecklistItem={handleChecklistItem}
                    onRemoveChecklist={onRemoveChecklist}
                    onAddItem={onAddItem}
                    isAddingItem={isAddingItem}
                    hideCheckedItems={hideCheckedItems}
                    newItem={newItem}
                    setNewItem={setNewItem}
                    onSaveItem={onSaveItem}
                    onCloseItem={onCloseItem}
                    onUpdated={onUpdated}
                    checklists={checklists}
                />
            ))}
        </div>
    )
}
