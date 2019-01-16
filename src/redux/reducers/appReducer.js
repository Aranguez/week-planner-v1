let initialState = {
    editModal: {
        show: false,
        taskToEdit: {
            task: '',
            reminder: false,
            priority: false
        }
    },
    loginModal: false,
    slideMenu: false,
    loading: false
}

const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'OPEN_CLOSE':
            return {
                ...state,
                [action.payload.thingToShow]: !state[action.payload.thingToShow]
            }
        case 'EDIT_MODAL':
            return {
                ...state,
                editModal: {
                    show: !state[action.payload.thingToShow].show,
                    taskToEdit: action.payload.taskToEdit
                }
            }
        default:
            return state;
    }
}

export default modalReducer