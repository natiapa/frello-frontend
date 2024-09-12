import { useState, useEffect } from 'react'
import { boardService } from '../services/board'
import { filterBoard } from '../store/actions/board.actions'
import { useSelector } from 'react-redux'
import { Checkbox, MenuItem, Select } from '@mui/material'
import { HiMiniUserCircle } from 'react-icons/hi2'
import { makeId } from '../services/util.service'

export function BoardFilter() {
    const [filterToEdit, setFilterToEdit] = useState(
        boardService.getDefaultFilter()
    )
    const labels = useSelector(store => store.boardModule.board.labels)
    const { members } = useSelector(store => store.boardModule.board)
    const { groups } = useSelector(store => store.boardModule.board)
    console.log('groups:', groups)

    console.log('members:', members)
    useEffect(() => {
        filterBoard(filterToEdit)
        setFilterToEdit(filterToEdit)
    }, [filterToEdit])

    function handleChange(ev) {
        const type = ev.target.type
        const field = ev.target.name
        let value

        switch (type) {
            case 'text':
            case 'radio':
            case 'select-one':
                value = field === 'sortDir' ? +ev.target.value : ev.target.value
                if (!filterToEdit.sortDir) filterToEdit.sortDir = 1
                break
            case 'number':
                value = +ev.target.value || ''
                break
            case 'checkbox':
                value = ev.target.checked
                break
        }

        console.log('field:', field)
        console.log('value:', value)
        setFilterToEdit({
            ...filterToEdit,
            [field]: value,
        })
    }

    function clearFilter() {
        setFilterToEdit({
            ...filterToEdit,
            txt: '',
        })
    }

    function clearSort() {
        setFilterToEdit({
            ...filterToEdit,
            sortField: '',
            sortDir: '',
        })
    }

    function handlePopoverClick(ev) {
        ev.stopPropagation()
    }

    function handleChangeSelectMember(ev) {
        const selectedMembers = ev.target.value
        setFilterToEdit({
            ...filterToEdit,
            selectMember: selectedMembers,
        })
    }

    function handleChangeSelectLabel(ev) {
        const name = ev.target.name
        const value = ev.target.checked
        console.log('name:', name)
        console.log('value:', value)
        if (value) {
            setFilterToEdit({
                ...filterToEdit,
                selectLabel: [...filterToEdit.selectLabel, name],
            })
        } else {
            const idx = filterToEdit.selectLabel.findIndex(
                label => label === name
            )
            filterToEdit.selectLabel.splice(idx, 1)
            setFilterToEdit({
                ...filterToEdit,
                selectLabel: filterToEdit.selectLabel,
            })
        }
    }

    const countMembers = filterToEdit.selectMember.length || 0
    return (
        <section className="board-filter" onClick={handlePopoverClick}>
            <h3 className="header">Filter</h3>
            <h3>Keyword</h3>
            <input
                type="text"
                name="txt"
                value={filterToEdit.txt}
                placeholder="Enter a keyword"
                onChange={handleChange}
                required
            />
            <div className="actions-members">
                <h3>Members</h3>
                <label>
                    <input
                        type="checkbox"
                        name="noMembers"
                        value={filterToEdit.noMembers}
                        onChange={handleChange}
                    />
                    <span>
                        <HiMiniUserCircle
                            style={{
                                height: '24px',
                                width: '24px',
                                marginTop: '5px',
                            }}
                        />
                    </span>{' '}
                    No members
                </label>

                {/* <input type="checkbox" name="allMembers" value={filterToEdit.allMembers} onChange={handleChange} checked={!!filterToEdit.allMembers} /> */}

                <Select
                    className="select-input"
                    name="selectMember"
                    onChange={handleChangeSelectMember}
                    value={filterToEdit.selectMember}
                    renderValue={() => `${countMembers} members select`}
                    multiple>
                    {members.map(member => (
                        <MenuItem key={member.id} value={member.id}>
                            <Checkbox
                                checked={filterToEdit.selectMember?.includes(
                                    member.id
                                )}
                            />
                            {member.fullname}
                        </MenuItem>
                    ))}
                </Select>
            </div>
            <div className="actions">
                <h3>Due date</h3>
                <label>
                    <input
                        type="checkbox"
                        name="noDueDate"
                        value={filterToEdit.noDueDate}
                        onChange={handleChange}
                    />
                    No due date
                </label>

                {/* <label>
                    <input
                        type="checkbox"
                        name="overdue"
                        value={filterToEdit.overdue}
                        onChange={handleChange}
                    />
                </label> */}
            </div>

            <div className="actions">
                <h3 style={{gridRow:1,gridColumn:1}}>Labels</h3>
                <label>
                    <input
                        type="checkbox"
                        name="noLabels"
                        value={filterToEdit.noLabels}
                        onChange={handleChange}
                    />
                    No labels
                </label>

                <div className="select-labels">
                    {labels.map(label => (
                        <div className="label-filter">
                            <input
                                type="checkbox"
                                name={label.color}
                                onChange={handleChangeSelectLabel}
                            />

                            <label
                                key={label.id}
                                style={{
                                    backgroundColor: label.color,
                                }}></label>
                       </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
{
    /* <h3>Sort:</h3>
<div className="sort-field">
   
    <label>
        <span>Title</span>
        <input
            type="radio"
            name="sortField"
            value="title"
            checked={filterToEdit.sortField === 'title'}            
            onChange={handleChange}
        />
    </label>
    <label>
        <span>Owner</span>
        <input
            type="radio"
            name="sortField"
            value="owner"
            checked={filterToEdit.sortField === 'owner'}                        
            onChange={handleChange}
        />
    </label>
</div>
<div className="sort-dir">
    <label>
        <span>Asce</span>
        <input
            type="radio"
            name="sortDir"
            value="1"
            checked={filterToEdit.sortDir === 1}                        
            onChange={handleChange}
        />
    </label>
    <label>
        <span>Desc</span>
        <input
            type="radio"
            name="sortDir"
            value="-1"
            onChange={handleChange}
            checked={filterToEdit.sortDir === -1}                        
        />
    </label>
</div>
<button 
    className="btn-clear" 
    onClick={clearSort}>Clear</button> */
}
