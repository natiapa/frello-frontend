import { storageService } from '../async-storage.service'
import { makeId } from '../util.service'
import { userService } from '../user'

const STORAGE_KEY = 'board'

export const boardService = {
    query,
    getById,
    save,
    remove,
    addBoardMsg,
}
window.cs = boardService

async function query(filterBy = { txt: '' }) {
    var boards = await storageService.query(STORAGE_KEY)

    if (!boards || !boards.length) {
        boards = {
            _id: 'b101',
            title: 'Robot dev proj',
            isStarred: false,
            archivedAt: 1589983468418,
            createdBy: {
                id: 'u101',
                fullname: 'Abi Abambi',
                imgUrl: 'http://some-img',
            },
            style: {
                backgroundImage: 'https://cdn.pixabay.com/photo/2017/11/29/18/54/leaf-2986837_1280.jpg',
                backgroundColor: '#61bd4f',
            },
            labels: [
                {
                    id: 'l101',
                    title: 'Done',
                    color: '#61bd4f',
                },
                {
                    id: 'l102',
                    title: 'Progress',
                    color: '#61bd33',
                },
            ],
            members: [
                {
                    id: 'u101',
                    fullname: 'Tal Taltal',
                    imgUrl: 'https://www.google.com',
                },
                {
                    id: 'u102',
                    fullname: 'Josh Ga',
                    imgUrl: 'https://www.google.com',
                },
            ],
            groups: [
                {
                    id: 'g101',
                    title: 'Group 1',
                    archivedAt: 1589983468418,
                    tasks: [
                        {
                            id: 'c101',
                            title: 'Replace logo',
                            labels: [],
                            members: [],
                            attachments: [],
                            comments: [],
                            cover: '',
                            dueDate: '',
                        },
                        {
                            id: 'c102',
                            title: 'Add Samples',
                        },
                    ],
                    style: {},
                },
                {
                    id: 'g102',
                    title: 'Group 2',
                    tasks: [
                        {
                            id: 'c103',
                            title: 'Do that',
                            archivedAt: 1589983468418,
                        },
                        {
                            id: 'c104',
                            title: 'Help me',
                            status: 'inProgress',
                            priority: 'high',
                            dueDate: '2024-09-24',
                            description: 'description',
                            comments: [
                                {
                                    id: 'ZdPnm',
                                    title: 'also @yaronb please CR this',
                                    createdAt: 1590999817436,
                                    byMember: {
                                        id: 'u101',
                                        fullname: 'Tal Tarablus',
                                        imgUrl: '',
                                    },
                                },
                            ],
                            checklists: [
                                {
                                    id: 'YEhmF',
                                    title: 'Checklist',
                                    todos: [
                                        {
                                            id: '212jX',
                                            title: 'To Do 1',
                                            isDone: false,
                                        },
                                    ],
                                },
                            ],
                            memberIds: ['u101'],
                            labelIds: ['l101', 'l102'],
                            byMember: {
                                id: 'u101',
                                fullname: 'Tal Tarablus',
                                imgUrl: '',
                            },
                            style: {
                                backgroundColor: '#26de81',
                            },
                        },
                    ],
                    style: {},
                },
            ],
            activities: [
                {
                    id: 'a101',
                    title: 'Changed Color',
                    createdAt: 154514,
                    byMember: {
                        id: 'u101',
                        fullname: 'Abi Abambi',
                        imgUrl: 'http://some-img',
                    },
                    group: {
                        id: 'g101',
                        title: 'Urgent Stuff',
                    },
                    task: {
                        id: 'c101',
                        title: 'Replace Logo',
                    },
                },
            ],
        }

        await storageService.post(STORAGE_KEY, boards)
    }
    // const { txt, sortField, sortDir } = filterBy

    // if (txt) {
    //     const regex = new RegExp(filterBy.txt, 'i')
    //     boards = boards.filter(board => regex.test(board.title) || regex.test(board.description))
    // }

    // if (sortField === 'title' || sortField === 'owner') {
    //     boards.sort((board1, board2) => board1[sortField].localeCompare(board2[sortField]) * +sortDir)
    // }

    // boards = boards.map(({ _id, title, owner }) => ({ _id, title, owner }))
    console.log('boards:', boards)

    return boards
}

function getById(boardId) {
    return storageService.get(STORAGE_KEY, boardId)
}

async function remove(boardId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, boardId)
}

async function save(board) {
    var savedBoard
    if (board._id) {
        const boardToSave = {
            _id: board._id,
        }
        savedBoard = await storageService.put(STORAGE_KEY, boardToSave)
    } else {
        const boardToSave = {
            title: board.title,

            // Later, owner is set by the backend
            owner: userService.getLoggedinUser(),
            msgs: [],
        }
        savedBoard = await storageService.post(STORAGE_KEY, boardToSave)
    }
    return savedBoard
}

async function addBoardMsg(boardId, txt) {
    // Later, this is all done by the backend
    const board = await getById(boardId)

    const msg = {
        id: makeId(),
        by: userService.getLoggedinUser(),
        txt,
    }
    board.msgs.push(msg)
    await storageService.put(STORAGE_KEY, board)

    return msg
}
