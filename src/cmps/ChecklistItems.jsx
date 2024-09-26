export function ChecklistItems({
  checklist,
  handleChangeCheckbox,
  onEditingTextItem,
  handleEditTextItem,
  textItemToEdit,
  saveEditingItem,
  handleEditingSaveKeyDown,
  closeForm,
}) {
  return (
    <ul className='items'>
      {checklist.items.map(item => (
        <li className='item' key={item.id}>
          <input
            name='isChecked'
            checked={item.isChecked}
            type='checkbox'
            onChange={ev => handleChangeCheckbox(ev, item, checklist.id)}
          />
          {!item.edit && (
            <p
              onClick={ev => onEditingTextItem(ev, item)}
              style={{
                textDecoration: item.isChecked ? 'line-through' : 'none',
                color: item.isChecked ? '#aaa' : 'inherit',
              }}>
              {item.text}
            </p>
          )}
          {item.edit && (
            <div className='edit-item' onBlur={ev => saveEditingItem(ev, item)}>
              <input
                type='text'
                onChange={handleEditTextItem}
                value={textItemToEdit}
                onKeyDown={ev => handleEditingSaveKeyDown(ev, item)}
                autoFocus
              />
              <div className='btns'>
                <button
                  className='save-edit-btn'
                  onClick={ev => saveEditingItem(ev, item)}>
                  Save
                </button>
                <button onClick={ev => closeForm(ev, item)}>X</button>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}
