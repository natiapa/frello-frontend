import { httpService } from '../http.service'

export const boardService = {
    query,
    getById,
    save,
    remove,
    addBoardMsg,
    updateBoard
}

async function query(filterBy = { txt: '', price: 0 }) {
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




function updateBoard(board, groupId, taskId, { key, value }, activity) {

    const gIdx = board.groups?.findIndex(group => group.id === groupId)
    const tIdx = board.groups[gIdx]?.tasks.findIndex(task => task.id === taskId)

    if (tIdx) {
        board.groups[gIdx].tasks[tIdx][key] = value;

    }
    else if (gIdx && !tIdx) {
        board.groups[gIdx][key] = value;
    } else {

        board[key] = value;
    }

    if (activity) {
        activity = addActivity(activity);
    }

    save(board);
    return board;
    // Code to update the board
}

function addActivity(txt) {
    return activity = {
        id: utilService.makeId(),
        txt,
        createdAt: Date.now(),
        byMember: {
            _id: 'u101',
            fullname: 'Abi Abambi',
            imgUrl: 'http://some-img'
        },
        type: 'add-task'
    }

}