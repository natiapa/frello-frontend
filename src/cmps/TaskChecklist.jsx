import { useState } from "react"

export function TaskChecklist({ checklists, onUpdatedTask }) {
    const [checklistsState, setChecklists] = useState(checklists)

    function handleChecklistItem({ target }, checklistId, itemId) {

        const isChecked = target.checked

        const updatedChecklists = checklistsState.map(checklist =>
            checklist.id === checklistId ? {
                ...checklist,
                items: checklist.items.map(item =>
                    item.id === itemId ? { ...item, isChecked } : item
                ),
            } : checklist
        );

        setChecklists(updatedChecklists)
        onUpdatedTask('checklists', updatedChecklists)
    }

    return (
        <div className="task-checklists">
            {checklistsState.map(checklist => (
                <div key={checklist.id} className="task-checklist">
                    <h4>{checklist.title}</h4>
                    <ul>
                        {checklist.items.map(item => (
                            <li key={item.id}>
                                <input
                                    type="checkbox"
                                    checked={item.isChecked}
                                    onChange={(ev) => handleChecklistItem(ev, checklist.id, item.id)}
                                />
                                {item.text}
                            </li>
                        )

                        )}
                    </ul>
                </div>
            ))
            }
        </div>
    )
}