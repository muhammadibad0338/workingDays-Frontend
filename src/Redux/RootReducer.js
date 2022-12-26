import { combineReducers } from 'redux';
import userReducer from './User/UserReducer';
import projectReducer from './Project/ProjectReducer';

const rootReducer = combineReducers({
    user: userReducer,
    project: projectReducer
})

export default rootReducer;