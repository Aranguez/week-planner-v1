import { combineReducers } from 'redux';
import user from './userReducer';
import tasks from './taskReducer';
import app from './appReducer';

export default combineReducers({
    app,
    tasks,
    user
})