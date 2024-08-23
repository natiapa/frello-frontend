export function Edit({ task,elementToEdit, setIsEditing }) {

    function handleBlur() {
        setIsEditing(false)
    }
    function handleChange({target}) {
        const { value,name } = target
        task[name] = value
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
                
                onChange={handleChange}
                onBlur={handleBlur}
                // onKeyDown={handleKeyDown}
                autoFocus
            />
        </div>
    )
}