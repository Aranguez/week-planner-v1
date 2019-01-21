let initialState = {
    //config
    config: false,
    language: 'en',
    darkTheme: false,
    //modals
    loginModal: false,
    slideMenu: false,
    editModal: {
        show: false,
        taskToEdit: {
            task: '',
            reminder: false,
            priority: false
        }
    },
    //loader
    loading: false,
}

const appReducer = (state = initialState, action) => {
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
        case 'CONFIGURE':
            return {
                ...state,
                language: action.payload.lang,
                darkTheme: action.payload.dark,
            }
        default:
            return state;
    }
}

export default appReducer