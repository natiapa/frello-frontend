import { useState } from 'react'

export function EditTask({ task, currElementToEdit, onUpdatedTask, setCurrElementToEdit }) {
    const [value, setValue] = useState(task[currElementToEdit])


    function handleSave() {
        if (currElementToEdit === 'description') {
            onUpdatedTask(currElementToEdit, value)
            setCurrElementToEdit('')
        }
    }

    function handleBlur() {
        if (currElementToEdit === 'title') {
            onUpdatedTask(currElementToEdit, value)
            setCurrElementToEdit('')
        }
    }

    return (

        <div>
            {currElementToEdit === 'title' ? (
                <input
                    type="text"
                    name={currElementToEdit}
                    value={value}
                    onChange={(ev) => setValue(ev.target.value)}
                    onBlur={handleBlur}
                    autoFocus
                />
            ) : currElementToEdit === 'description' ? (
                <div className="edit-task-description">
                    <textarea
                        name={currElementToEdit}
                        value={value}
                        placeholder='Add a more detailed description...'
                        onChange={(ev) => setValue(ev.target.value)}
                        autoFocus
                        rows={5}
                        cols={40}
                    />
                    <button onClick={handleSave} className="save-description-button">Save</button>
                </div>
            ) :
                null}
        </div>


    )
}
