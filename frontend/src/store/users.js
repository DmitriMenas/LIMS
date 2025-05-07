const SET_USERS = "users/setUsers"

const setUsers = (users) => {
    return {
        type: SET_USERS,
        payload: users
    }
}

export const fetchUsers = () => async (dispatch) => {
    const response = await fetch('/api/users')
    const data = await response.json()
    dispatch(setUsers(data.Users))
    return response
}

const initialState = {
    users: []
}

const userReducer = (state = initialState, action) => {
    switch (action.type){
        case SET_USERS:
            return {...state, users: action.payload}
        default:
            return state
    }
}

export default userReducer