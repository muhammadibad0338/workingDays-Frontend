import {
    SET_ERROR,
    SET_LOADING,
    GET_ALL_TASKS,
} from "./TaskTypes";


const initialState = {
    tasks: [],
    loading: false,
    updating: false,
    error: null,
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