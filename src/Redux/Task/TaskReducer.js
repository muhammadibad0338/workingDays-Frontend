import {
    SET_ERROR,
    SET_LOADING,
    GET_ALL_TASKS,
    GET_PROJECT_TASKS_TREE
} from "./TaskTypes";


const initialState = {
    tasks: [],
    loading: false,
    updating: false,
    error: null,
    projectTaskTree: {}
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