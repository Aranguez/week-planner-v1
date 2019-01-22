let initialState = {
    weekDays: {
        en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        es: ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado"],
        jp: ["日曜", "月曜", "火曜", "水曜", "木曜", "金曜", "土曜"]
    },
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