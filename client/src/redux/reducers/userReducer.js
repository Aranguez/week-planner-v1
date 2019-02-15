const initialState = {
    userId: '',
    userName: '',
    logged: false
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_USER':
            return {
                ...state,
                userId: action.payload.userId,
                userName: action.payload.userName,
                logged: true
            }
        case 'LOGOUT':
            return initialState
        default:
            return state;
    }
}

export default userReducer