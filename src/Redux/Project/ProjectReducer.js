import axios from "axios";
import { baseUrl } from "../baseUrl";
import {
    SET_ERROR,
    SET_LOADING,
    GET_ALL_PROJECTS,
    GET_PROJECT_DETAILS,
} from "./ProjectTypes";

const initialState = {
    projects: [],
    loading: false,
    updating: false,
    error: null,
    projectDetails: {},
   
};


const projectReducer = (state = initialState, action) => {
    const { payload, type } = action;
    switch (type) {
        case GET_ALL_PROJECTS:
            return {
                ...state,
                loading: false,
                projects: payload
            };
        case GET_PROJECT_DETAILS: {
            return {
                ...state,
                projectDetails: payload
            }
        }
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

export default projectReducer;