import { httpService } from '../http.service'
import { makeId, sortColorsByHue } from '../util.service'

export const boardService = {
    query,
    getById,
    save,
    remove,
    addBoardMsg,
    updateBoard,
    updateActivities,
    getDefaultFilter,
    getEmptyBoard,
    getEmptyGroup,
    getEmptyTask,
    getEmptyChecklist,
    getEmptyItem,
    getEmptyDueDate,
    getEmptyAttach,
    getEmptyLabel,
    getColorsCover,
    getAllLabels,
    addActivity,
}

async function query(filterBy = {}) {
    return httpService.get(`board`, filterBy)
}

function getById(boardId) {
    return httpService.get(`board/${boardId}`)
}

async function remove(boardId) {
    return httpService.delete(`board/${boardId}`)
}
async function save(board) {
    var savedBoard
    if (board._id) {
        savedBoard = await httpService.put(`board/${board._id}`, board)
    } else {
        savedBoard = await httpService.post('board', board)
    }
    return savedBoard
}

async function addBoardMsg(boardId, txt) {
    const savedMsg = await httpService.post(`board/${boardId}/msg`, { txt })
    return savedMsg
}

function getDefaultFilter() {
    return {
        txt: '',
        noMembers: false,
        selectMember: [],
        noDueDate: false,
        noLabels: false,
        selectLabel: [],
        sortField: 'title',
        sortDir: 1,
    }
}

async function updateBoard(
    board,
    groupId,
    taskId,
    { key, value },
    activity = ''
) {
    const gIdx = board?.groups?.findIndex(group => group.id === groupId)
    const tIdx = board?.groups[gIdx]?.tasks.findIndex(
        task => task.id === taskId
    )

    if (tIdx >= 0) {
        if (key === 'deleteTask') {
            board.groups[gIdx].tasks.splice(tIdx, 1)
        } else {
            board.groups[gIdx].tasks[tIdx][key] = value
        }
    } else if (gIdx >= 0 && tIdx < 0) {
        if (key === 'group') {
            board.groups[gIdx] === value
        } else if (key === 'deleteGroup') {
            board.groups.splice(gIdx, 1)
        } else {
            board.groups[gIdx][key] = value
        }
    } else {
        board[key] = value
    }

    if (activity) {
        activity = addActivity(activity)
    }
    try {
        await save(board)
    } catch (err) {
        console.log('err:', err)
    }
    return board
}

function addActivity(
    title,
    type,
    group,
    task,
    checklist,
    taskNumber,
    item,
    dueDate
) {
    const activity = {
        id: makeId(),
        title,
        type,
        createdAt: Date.now(),
        byMember: {
            id: 'u101',
            fullname: 'Abi Abambi',
            imgUrl: 'http://some-img',
            color: '#000',
        },
        group: {
            id: group?.id,
            title: group?.title,
        },
        task: {
            id: task?.id,
            title: task?.title,
        },
        taskNumber,
        checklist: {
            id: checklist?.id,
            title: checklist?.title,
        },
        item,
        dueDate: {
            date: dueDate?.date,
            time: dueDate?.time,
        },
    }

    return activity
}

async function updateActivities(
    board,
    title,
    type,
    group,
    task,
    checklist,
    taskNumber,
    item,
    dueDate
) {
    const activityToAdd = addActivity(
        title,
        type,
        group,
        task,
        checklist,
        taskNumber,
        item,
        dueDate
    )
    console.log(activityToAdd)

    await board.activities.unshift(activityToAdd)
    await save(board)
}

function getEmptyGroup() {
    return {
        id: makeId(),
        title: '',
        tasks: [
            {
                id: makeId(),
                title: '',
                labels: [],
                members: [],
                attachments: [],
                comments: [],
                cover: '',
                dueDate: '',
            },
        ],
        style: {},
    }
}

function getEmptyTask() {
    return {
        id: makeId(),
        title: '',
        labels: [],
        members: [],
        attachments: [],
        comments: [],
        cover: '',
        dueDate: '',
    }
}

function getEmptyChecklist() {
    return {
        id: makeId(),
        title: '',
        items: [],
    }
}

async function getEmptyItem() {
    return {
        id: makeId(),
        text: '',
        isChecked: false,
    }
}

function getEmptyBoard() {
    return {
        title: '',
        isStarred: false,
        // archivedAt: 0,
        createdBy: {
            id: 'u102',
            fullname: '',
            imgUrl: '',
        },
        style: {
            backgroundImage: '',
            backgroundColor: '',
        },
        members: [],
        groups: [],
        activities: [],
    }
}

function getEmptyDueDate() {
    return {
        date: '',
        time: '',
        isComplete: false,
        reminder: '',
        createdAt: '',
        completedAt: null,
        isOverdue: false,
    }
}

function getEmptyAttach() {
    return {
        id: makeId(),
        name: '',
        url: '',
        type: '',
        createdAt: new Date(),
    }
}
function getEmptyLabel() {
    return {
        id: makeId(),
        title: '',
        color: '',
        colorName: '',
        isEditable: false,
    }
}
const colors = [
    { id: 'A1B2C', title: '', color: '#61BD4F', colorName: 'Green' },
    { id: 'D3E4F', title: '', color: '#F2D600', colorName: 'Yellow' },
    { id: 'G5H6I', title: '', color: '#FFAB4A', colorName: 'Orange' },
    { id: 'J7K8L', title: '', color: '#EB5A46', colorName: 'Red' },
    { id: 'M9N0O', title: '', color: '#C377E0', colorName: 'Purple' },
    { id: 'P1Q2R', title: '', color: '#0079BF', colorName: 'Blue' },
    { id: 'S3T4U', title: '', color: '#00C2E0', colorName: 'Sky Blue' }, // Changed from "Light Blue"
    { id: 'V5W6X', title: '', color: '#51E898', colorName: 'Light Green' },
    { id: 'Y7Z8A', title: '', color: '#FF80CE', colorName: 'Pink' },
    { id: 'B9C0D', title: '', color: '#344563', colorName: 'Dark Navy Blue' },
    { id: 'E1F2G', title: '', color: '#B6BBBF', colorName: 'Gray' }, // Changed from "Light Gray"
    { id: 'H3I4J', title: '', color: '#E6C84F', colorName: 'Mustard Yellow' },
    { id: 'K5L6M', title: '', color: '#CF513D', colorName: 'Dark Red' },
    { id: 'N7O8P', title: '', color: '#E39E23', colorName: 'Dark Orange' },
    { id: 'Q9R0S', title: '', color: '#B04632', colorName: 'Brick Red' },
    { id: 'T1U2V', title: '', color: '#89609E', colorName: 'Dark Purple' },
    { id: 'W3X4Y', title: '', color: '#055A8C', colorName: 'Dark Blue' },
    { id: 'Z5A6B', title: '', color: '#1F8A9D', colorName: 'Teal' },
    { id: 'C7D8E', title: '', color: '#519839', colorName: 'Forest Green' },
    { id: 'F9G0H', title: '', color: '#D29034', colorName: 'Light Orange' },
    { id: 'I1J2K', title: '', color: '#C4C9CC', colorName: 'Light Gray' }, // Changed from "Light Grayish Blue"
    { id: 'L3M4N', title: '', color: '#E4F0F6', colorName: 'Pale Blue' },
    { id: 'O5P6Q', title: '', color: '#F5DDC0', colorName: 'Light Peach' },
    { id: 'R7S8T', title: '', color: '#F5C4B1', colorName: 'Pale Pink' },
    { id: 'U9V0W', title: '', color: '#F3E0AE', colorName: 'Soft Yellow' },
    { id: 'X1Y2Z', title: '', color: '#ECD7E7', colorName: 'Light Lavender' },
    { id: 'Z1X2C', title: '', color: '#B7E3E4', colorName: 'Light Turquoise' },
    { id: 'C2A3B', title: '', color: '#D5F0EC', colorName: 'Light Aqua' },
    { id: 'D6E7F', title: '', color: '#F6D6D1', colorName: 'Soft Red' },
    { id: 'G7H8I', title: '', color: '#A4A4A4', colorName: 'Gray' },
]

function getColorsCover() {
    return [
        { id: 'Z5A6B', color: '#9F8FEF' },
        { id: 'C7D8E', color: '#F87168' },
        { id: 'F9G0H', color: '#FEA362' },
        { id: 'I1J2K', color: '#F5CD47' },
        { id: 'L3M4N', color: '#4BCE97' },
        { id: 'O5P6Q', color: '#8590A2' },
        { id: 'R7S8T', color: '#E774BB' },
        { id: 'U9V0W', color: '#94C748' },
        { id: 'X1Y2Z', color: '#6CC3E0' },
        { id: 'Z1X2C', color: '#579DFF' },
    ]
}
function getAllLabels() {
    const allLabels = colors
    return sortColorsByHue(allLabels)
}
