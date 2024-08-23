import { useState } from 'react'

export function Edit({ task, elementToEdit, setIsEditing, onUpdatedTask }) {
    const [value, setValue] = useState(task[elementToEdit])
    function handleBlur() {
        setIsEditing(false)
    }
    function handleChange({ target }) {
        const { value, name } = target
        const taskToEdit = { ...task, [name]: value }
        console.log(taskToEdit)
        setValue(value)
        onUpdatedTask(name, value)
        console.log('value:', value)
    }

    // function handleKeyDown (ev){
    //     if(ev.key === 'Enter')
    //         handleSave()
    // }
    return (
        <div>
            <input
                type="text"
                name={elementToEdit}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                // onKeyDown={handleKeyDown}
                autoFocus
            />
        </div>
    )
}
