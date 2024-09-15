import { httpService } from '../http.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getUsers,
    getById,
    remove,
    update,
    getLoggedinUser,
    saveLoggedinUser,
}

function getUsers() {
    return httpService.get(`user`)
}

async function getById(userId) {
    const user = await httpService.get(`user/${userId}`)
    return user
}

function remove(userId) {
    return httpService.delete(`user/${userId}`)
}

async function update({ _id, score }) {
    const user = await httpService.put(`user/${_id}`, { _id, score })

    // When admin updates other user's details, do not update loggedinUser
    const loggedinUser = getLoggedinUser() // Might not work because its defined in the main service???
    if (loggedinUser._id === user._id) saveLoggedinUser(user)

    return user
}

async function login(userCred) {
    // if (userCred.fullname === "yana") userCred.imgUrl = "https://res.cloudinary.com/dmdgdpxtu/image/upload/v1726413924/WhatsApp_Image_2024-08-28_at_23.31.20_dwuw0l.jpg"
    // if (userCred.fullname === "avi") userCred.imgUrl = "https://res.cloudinary.com/dmdgdpxtu/image/upload/v1726415721/WhatsApp_Image_2024-09-15_at_18.54.43_jkgmah.jpg"
    // if (userCred.fullname === "natia") userCred.imgUrl = "https://res.cloudinary.com/dmdgdpxtu/image/upload/v1726415931/WhatsApp_Image_2024-09-15_at_18.55.20_atp7ne.jpg"

    const user = await httpService.post('auth/login', userCred)
    if (user) return saveLoggedinUser(user)
}

async function signup(userCred) {
    console.log('userCred:', userCred)
    if (!userCred.imgUrl)
        userCred.imgUrl =
            'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    // if (userCred.username === 'natia') userCred.imgUrl = '../../assets/imgs/natia.png'
    userCred.score = 10000
    userCred.isAdmin = true

    const user = await httpService.post('auth/signup', userCred)
    return saveLoggedinUser(user)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    return await httpService.post('auth/logout')
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function saveLoggedinUser(user) {
    user = {
        _id: user._id,
        fullname: user.fullname,
        imgUrl: user.imgUrl,
        score: user.score,
        isAdmin: user.isAdmin,
    }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}
