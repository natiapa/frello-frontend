export function EditTaskTitle({ title, setTitle, setIsEditing }) {

    function handleBlur() {
        setIsEditing(false)
    }
    function handleChange(ev) {
        setTitle(ev.target.value)
    }

    // function handleKeyDown (ev){
    //     if(ev.key === 'Enter')
    //         handleSave()
    // }
    return (
        <div>
            <input
                type="text"
                value={title}
                onChange={handleChange}
                onBlur={handleBlur}
                // onKeyDown={handleKeyDown}
                autoFocus
            />
        </div>
    )
}