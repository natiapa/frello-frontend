export const SET_BOARDS = 'SET_BOARDS'
export const SET_BOARD = 'SET_BOARD'
export const REMOVE_BOARD = 'REMOVE_BOARD'
export const ADD_BOARD = 'ADD_BOARD'
export const UPDATE_BOARD = 'UPDATE_BOARD'
export const ADD_BOARD_MSG = 'ADD_BOARD_MSG'
export const SET_FILTER = 'SET_FILTER'
export const SET_FILTER_BOARDS = 'SET_FILTER_BOARDS'
export const SET_LOADING = 'SET_LOADING'

const initialState = {
    boards: [],
    board: null,
    filterBoards: null,
    filterBoard: {},
    isLoading: false,
}

export function boardReducer(state = initialState, action) {
    // console.log('action:', action)
    var newState = state
    var boards
    switch (action.type) {
        case SET_BOARDS:
            newState = { ...state, boards: action.boards }
            break
        case SET_BOARD:
            newState = { ...state, board: action.board }
            break
        case REMOVE_BOARD:
            const lastRemovedBoard = state.boards.find(
                board => board._id === action.boardId
            )
            boards = state.boards.filter(board => board._id !== action.boardId)
            newState = { ...state, boards, lastRemovedBoard }
            break
        case ADD_BOARD:
            newState = { ...state, boards: [...state.boards, action.board] }
            break
        case UPDATE_BOARD:
            boards = state.boards.map(board =>
                board._id === action.board._id ? action.board : board
            )
            newState = { ...state, boards }
            break
        case ADD_BOARD_MSG:
            newState = {
                ...state,
                board: {
                    ...state.board,
                    msgs: [...(state.board.msgs || []), action.msg],
                },
            }
            break
        case SET_FILTER_BOARDS:
            newState = { ...state, filterBoards: action.filterBy }
            break
        case SET_FILTER:
            newState = { ...state, filterBoard: action.filterBy }
            break
        case SET_LOADING:
            newState = { ...state, isLoading: action.isLoading }
            break
        default:
            state
    }
    return newState
}

// unitTestReducer()

function unitTestReducer() {
    var state = initialState
    const board1 = {
        _id: 'b101',
        title: 'Board ' + parseInt(Math.random() * 10),
        msgs: [],
    }
    const board2 = {
        _id: 'b102',
        title: 'Board ' + parseInt(Math.random() * 10),
        msgs: [],
    }

    state = boardReducer(state, { type: SET_BOARDS, boards: [board1] })
    console.log('After SET_BOARDS:', state)

    state = boardReducer(state, { type: ADD_BOARD, board: board2 })
    console.log('After ADD_BOARD:', state)

    state = boardReducer(state, {
        type: UPDATE_BOARD,
        board: { ...board2, title: 'Good' },
    })
    console.log('After UPDATE_BOARD:', state)

    state = boardReducer(state, { type: REMOVE_BOARD, boardId: board2._id })
    console.log('After REMOVE_BOARD:', state)

    const msg = { id: 'm' + parseInt(Math.random() * 100), txt: 'Some msg' }
    state = boardReducer(state, { type: ADD_BOARD_MSG, boardId: board1._id, msg })
    console.log('After ADD_BOARD_MSG:', state)

    state = boardReducer(state, { type: REMOVE_BOARD, boardId: board1._id })
    console.log('After REMOVE_BOARD:', state)
}
