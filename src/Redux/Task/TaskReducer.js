import {
    SET_ERROR,
    SET_LOADING,
    GET_ALL_TASKS,
    GET_PROJECT_TASKS_TREE,
    GET_PROJECT_TASKS_REPORT
} from "./TaskTypes";


const initialState = {
    tasks: [],
    loading: false,
    updating: false,
    error: null,
    projectTaskTree: {},
    projectTaskReports: []
};


const taskReducer = (state = initialState, action) => {
    const { payload, type } = action;
    switch (type) {
        case GET_ALL_TASKS:
            return {
                ...state,
                loading: false,
                tasks: payload
            };
        case GET_PROJECT_TASKS_REPORT:
            return {
                ...state,
                projectTaskReports: payload
            }
        case GET_PROJECT_TASKS_TREE:
            return {
                ...state,
                projectTaskTree: payload
            };
        case SET_ERROR:
            return {
                ...state,
                error: payload,
            };
        case SET_LOADING:
            return {
                ...state,
                loading: payload,
                error: null,
            };
        default:
            return state;
    }
};

export default taskReducer;