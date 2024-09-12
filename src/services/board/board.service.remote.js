import { httpService } from '../http.service'
import { userService } from '../user'
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
    getImgs,
}

async function query(filterBy = {}) {
    return httpService.get(`board`, filterBy)
}

function getById(boardId, filterBy = {}) {
    console.log('filterBy:', filterBy)
    return httpService.get(`board/${boardId}`, filterBy)
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


async function updateActivities(
    board,
    title,
    type,
    group,
    task,
    checklist,
    taskNumber,
    item,
    dueDate,
    copiedBoard
) {
    const activityToAdd = addActivity(
        title,
        type,
        group,
        task,
        checklist,
        taskNumber,
        item,
        dueDate,
        copiedBoard
    )


    await board.activities.unshift(activityToAdd)
    // await save(board)
}

function addActivity(
    title,
    type,
    group,
    task,
    checklist,
    taskNumber,
    item,
    dueDate,
    originalBoard,

) {
    var activity = {
        id: makeId(),
        title,
        type,
        createdAt: Date.now(),
        byMember: userService.getLoggedinUser(),
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
        originalBoard: {
            _id: originalBoard?._id,
            title: originalBoard?.title
        }
    };

    return activity;
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

function getImgs() {
    const urlImgs = [
        {
            src: 'https://cdn.pixabay.com/photo/2024/08/01/10/18/bird-8936789_1280.jpg',
            color: '#ffedcc', // pastel peach
            alt: 'bird',
        },
        {
            src: 'https://cdn.pixabay.com/photo/2024/07/31/15/13/green-8935080_1280.jpg',
            color: '#d4f5dc', // pastel mint green
            alt: 'green-swirl',
        },
        {
            src: 'https://cdn.pixabay.com/photo/2024/02/17/17/20/chess-8579843_1280.jpg',
            color: '#f4e3ff', // pastel lavender
            alt: 'chess',
        },
        {
            src: 'https://cdn.pixabay.com/photo/2013/02/17/07/19/flower-82437_1280.jpg',
            color: '#ffe6e6', // pastel pink
            alt: 'orange-flower',
        },
        {
            src: 'https://cdn.pixabay.com/photo/2024/08/11/18/15/leaves-8962041_1280.jpg',
            color: '#d6f5d6', // pastel light green
            alt: 'leafs',
        },
        {
            src: 'https://cdn.pixabay.com/photo/2022/06/23/09/58/the-season-of-ripe-rice-7279448_1280.jpg',
            color: '#f2e6cc', // pastel cream
            alt: 'the-season-of-ripe-rice',
        },
        // {
        //   src: "https://cdn.pixabay.com/photo/2024/07/05/22/30/penguin-8875750_1280.jpg",
        //   color: "#e6f2ff", // pastel light blue
        //   alt: "penguin",
        // },
        // {
        //   src: "https://cdn.pixabay.com/photo/2024/03/04/14/56/pagoda-8612554_1280.jpg",
        //   color: "#ffebd6", // pastel peach
        //   alt: "pagoda",
        // },
        // {
        //   src: "https://cdn.pixabay.com/photo/2018/01/31/12/16/architecture-3121009_1280.jpg",
        //   color: "#e6e6ff", // pastel lavender
        //   alt: "architecture",
        // },
        // {
        //   src: "https://cdn.pixabay.com/photo/2016/05/10/12/21/animal-1383616_960_720.jpg",
        //   color: "#f9e6e6", // pastel coral
        //   alt: "lemur",
        // },
        // {
        //   src: "https://cdn.pixabay.com/photo/2017/04/28/15/20/mount-rushmore-2268636_1280.jpg",
        //   color: "#e6f7ff", // pastel sky blue
        //   alt: "mount-rushmore",
        // },
        // {
        //   src: "https://cdn.pixabay.com/photo/2020/05/23/04/11/transport-5207942_1280.jpg",
        //   color: "#ffe6cc", // pastel peach
        //   alt: "transport",
        // },
        // {
        //   src: "https://cdn.pixabay.com/photo/2022/10/06/10/29/witch-hazel-7502409_960_720.jpg",
        //   color: "#fff0e6", // pastel light coral
        //   alt: "witch-hazel",
        // },
        // {
        //   src: "https://cdn.pixabay.com/photo/2023/09/21/01/20/sugar-blader-8265868_1280.jpg",
        //   color: "#e6ffe6", // pastel light green
        //   alt: "sugar-blader",
        // },
        // {
        //   src: "https://cdn.pixabay.com/photo/2016/11/29/06/06/coast-1867704_960_720.jpg",
        //   color: "#e0f7fa", // pastel aqua
        //   alt: "coast",
        // },
        // {
        //   src: "https://cdn.pixabay.com/photo/2017/03/17/21/32/shell-2152731_960_720.jpg",
        //   color: "#fff5e6", // pastel apricot
        //   alt: "shell",
        // },
    ]
    const imgs = urlImgs
    return imgs
}
