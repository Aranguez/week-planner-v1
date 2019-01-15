let initialState = {
    editModal: false,
    loginModal: false,
    slideMenu: false,
    loading: false
}

const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'OPEN_CLOSE':
            console.log(action.payload.thingToShow)
            return {
                ...state,
                [action.payload.thingToShow]: !state[action.payload.thingToShow]
            }
        default:
            return state;
    }
}

export default modalReducer