import { useState } from 'react'

export function EditTask({ task, currElementToEdit, setIsEditing, onUpdatedTask }) {
    const [value, setValue] = useState(task[currElementToEdit])

    function handleChange({ target }) {
        const { value, name } = target
        setValue(value)
        onUpdatedTask(name, value)
    }

    return (
        <div>
            <input
                type="text"
                name={currElementToEdit}
                value={value}
                onChange={handleChange}
                onBlur={() => setIsEditing(false)}
                autoFocus
            />
        </div>
    )
}
