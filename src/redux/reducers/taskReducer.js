const initialState = {
    tasksList: []
}

const taskReducer = (state = initialState , action) => {
    switch (action.type) {
        case 'GET_TASKS':
            return {
                ...state,
                tasksList: action.payload
            }
        case 'ADD_TASK':
            return {
                ...state,
                tasksList: [...state.tasksList, action.payload]
            }
        case 'CHECK_TASK':
            action.payload.done = !action.payload.done
            const checkedTask = action.payload;
            let newList = state.tasksList.map(task => { 
                return task.id === action.payload.id ?
                checkedTask :
                task
            })
            return {
                ...state,
                tasksList: newList
            }
        case 'EDIT_TASK':
            const editedTask = action.payload
            return {
                ...state,
                tasksList: state.tasksList.map(task => {
                    return task.id === editedTask.id ?
                           {...task, ...editedTask} : 
                           task
                })
            }
        case 'DELETE_TASK':
        //console.log('remove reducer')
            return {
                ...state,
                tasksList: state.tasksList.filter(task => {
                    return task.id !== action.payload
                })
            }
        default:
            return state;
    }
}

export default taskReducer