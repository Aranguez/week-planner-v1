const taskReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_TASKS':
            return action.payload
        case 'ADD_TASK':
            return [...state, action.payload]
        case 'CHECK_TASK':

            let newList = state.map(task => 
                task.id === action.payload.id ?
                action.payload :
                task
            )

            return newList
        case 'EDIT_TASK ':
            return state //por ahora
        case 'REMOVE_TASK':
            return state.filter(task => task.id !== action.payload.id)
        default:
            return state;
    }
}

export default taskReducer