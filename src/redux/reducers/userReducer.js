export default (state = [], action) => {
    switch (action.type) {
        case 'GET_USER':
            return action.userId
        case 'GET_USER_DATA':
            return action.data
        default:
            return state;
    }
}