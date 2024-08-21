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
                            labels: ['Urgent', 'Low Priority'],
                            members: ['John Doe', 'Jane Smith'],
                            attachments: ['logo_v1.png', 'logo_v2.png'],
                            comments: ['Please update the logo with the latest version', 'Make sure to use the correct color scheme'],
                            cover: 'cover_logo.png',
                            dueDate: '2024-09-01',
                        },
                        {
                            id: 'c102',
                            title: 'Update website content',
                            labels: ['On Hold', 'In Progress'],
                            members: ['Alice Johnson', 'Bob Brown'],
                            attachments: ['homepage_draft.docx', 'about_us_update.docx'],
                            comments: ['Content needs to be SEO optimized', 'Check for grammatical errors before finalizing'],
                            cover: 'cover_content.png',
                            dueDate: '2024-08-25',
                        },
                        {
                            id: 'c103',
                            title: 'Bug fix in checkout process',
                            labels: ['Important', 'Urgent'],
                            members: ['Michael Green', 'Sarah Lee'],
                            attachments: ['bug_report_checkout.pdf'],
                            comments: ['Checkout process fails under certain conditions', 'Issue reported by multiple users'],
                            cover: 'cover_bug.png',
                            dueDate: '2024-08-22',
                        },
                        {
                            id: 'c104',
                            title: 'Create marketing campaign',
                            labels: ['Completed', 'Low Priority'],
                            members: ['Emily White', 'David Black'],
                            attachments: ['campaign_brief.pdf', 'ad_samples.png'],
                            comments: ['Focus on social media platforms', 'Consider influencer partnerships'],
                            cover: 'cover_marketing.png',
                            dueDate: '2024-09-10',
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
        savedBoard = await storageService.put(STORAGE_KEY, board)
    } else {
        savedBoard = await storageService.post(STORAGE_KEY, board)
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
