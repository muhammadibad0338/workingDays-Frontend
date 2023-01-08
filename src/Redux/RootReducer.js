import { combineReducers } from 'redux';
import userReducer from './User/UserReducer';
import projectReducer from './Project/ProjectReducer';
import taskReducer from './Task/TaskReducer';

const rootReducer = combineReducers({
    user: userReducer,
    project: projectReducer,
    task: taskReducer
})

export default rootReducer;