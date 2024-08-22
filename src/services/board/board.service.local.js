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
                {
                    id: 'g102',
                    title: 'Group 2',
                    archivedAt: null,
                    tasks: [
                        {
                            id: 'c105',
                            title: 'Design new feature UI',
                            labels: ['High Priority', 'UI/UX'],
                            members: ['Nina Brown', 'Oliver Smith'],
                            attachments: ['feature_ui_sketch.png'],
                            comments: ['Make the UI intuitive and user-friendly', 'Consider colorblind accessibility'],
                            cover: 'cover_ui.png',
                            dueDate: '2024-09-15',
                        },
                        {
                            id: 'c106',
                            title: 'Conduct user testing',
                            labels: ['Testing', 'Feedback'],
                            members: ['Lucas Miller', 'Ava Green'],
                            attachments: ['user_test_report.docx'],
                            comments: ['Gather feedback from diverse user groups', 'Analyze test results'],
                            cover: 'cover_testing.png',
                            dueDate: '2024-09-18',
                        },
                    ],
                    style: {},
                },
                {
                    id: 'g103',
                    title: 'Group 3',
                    archivedAt: null,
                    tasks: [
                        {
                            id: 'c107',
                            title: 'Prepare project presentation',
                            labels: ['Presentation', 'Deadline Approaching'],
                            members: ['Sophia Lee', 'William Turner'],
                            attachments: ['presentation.pptx'],
                            comments: ['Highlight key milestones', 'Keep it concise'],
                            cover: 'cover_presentation.png',
                            dueDate: '2024-08-29',
                        },
                        {
                            id: 'c108',
                            title: 'Review codebase',
                            labels: ['Code Review', 'Important'],
                            members: ['Ethan White', 'Olivia Blue'],
                            attachments: ['code_review_notes.pdf'],
                            comments: ['Ensure code quality', 'Check for security vulnerabilities'],
                            cover: 'cover_code_review.png',
                            dueDate: '2024-09-02',
                        },
                    ],
                    style: {},
                },
                {
                    id: 'g104',
                    title: 'Group 4',
                    archivedAt: null,
                    tasks: [
                        {
                            id: 'c109',
                            title: 'Set up CI/CD pipeline',
                            labels: ['DevOps', 'Automation'],
                            members: ['Grace Brown', 'Henry Gold'],
                            attachments: ['ci_cd_pipeline_diagram.png'],
                            comments: ['Automate testing and deployment', 'Ensure smooth integration'],
                            cover: 'cover_ci_cd.png',
                            dueDate: '2024-09-12',
                        },
                        {
                            id: 'c110',
                            title: 'Optimize database queries',
                            labels: ['Database', 'Performance'],
                            members: ['Mason Grey', 'Lily Orange'],
                            attachments: ['query_optimization_report.pdf'],
                            comments: ['Improve query performance', 'Reduce database load times'],
                            cover: 'cover_database.png',
                            dueDate: '2024-09-20',
                        },
                    ],
                    style: {},
                },
                {
                    id: 'g105',
                    title: 'Group 5',
                    archivedAt: null,
                    tasks: [
                        {
                            id: 'c111',
                            title: 'Create API documentation',
                            labels: ['Documentation', 'API'],
                            members: ['Jackson Brown', 'Amelia Silver'],
                            attachments: ['api_docs_v1.pdf'],
                            comments: ['Document all endpoints', 'Include example requests and responses'],
                            cover: 'cover_api_docs.png',
                            dueDate: '2024-09-05',
                        },
                        {
                            id: 'c112',
                            title: 'Refactor legacy code',
                            labels: ['Refactor', 'Legacy Code'],
                            members: ['James Purple', 'Charlotte Red'],
                            attachments: ['legacy_code_refactor_notes.docx'],
                            comments: ['Improve code readability', 'Reduce technical debt'],
                            cover: 'cover_refactor.png',
                            dueDate: '2024-09-22',
                        },
                    ],
                    style: {},
                },
                {
                    id: 'g106',
                    title: 'Group 6',
                    archivedAt: null,
                    tasks: [
                        {
                            id: 'c113',
                            title: 'Plan product launch',
                            labels: ['Marketing', 'Launch'],
                            members: ['Alexander Blue', 'Mia Brown'],
                            attachments: ['launch_plan.pdf'],
                            comments: ['Coordinate with sales and marketing teams', 'Set clear launch goals'],
                            cover: 'cover_launch.png',
                            dueDate: '2024-09-30',
                        },
                        {
                            id: 'c114',
                            title: 'Conduct market research',
                            labels: ['Research', 'Analysis'],
                            members: ['Sebastian Green', 'Emma White'],
                            attachments: ['market_research_report.docx'],
                            comments: ['Identify target audience', 'Analyze competitors'],
                            cover: 'cover_research.png',
                            dueDate: '2024-10-05',
                        },
                    ],
                    style: {},
                },
                {
                    id: 'g107',
                    title: 'Group 7',
                    archivedAt: null,
                    tasks: [
                        {
                            id: 'c115',
                            title: 'Train new hires',
                            labels: ['Training', 'Onboarding'],
                            members: ['Daniel Black', 'Chloe Yellow'],
                            attachments: ['training_materials.pdf'],
                            comments: ['Provide comprehensive onboarding', 'Ensure new hires are comfortable with the tools'],
                            cover: 'cover_training.png',
                            dueDate: '2024-09-08',
                        },
                        {
                            id: 'c116',
                            title: 'Review quarterly goals',
                            labels: ['Goals', 'Review'],
                            members: ['Matthew Red', 'Sophie Blue'],
                            attachments: ['q3_goals_review.pdf'],
                            comments: ['Assess progress towards goals', 'Adjust strategies if needed'],
                            cover: 'cover_goals.png',
                            dueDate: '2024-09-15',
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