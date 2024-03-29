import axios from "axios";
import { baseUrl } from "../baseUrl";
import {
    SET_ERROR,
    SET_LOADING,
    SET_LOGOUT,
    SET_USER,
    SET_TOKEN,
    SEARCH_USER,
    USER_TEAM,
    SET_USER_REQUEST,
    SEARCH_USER_IN_TEAM
} from "./UserTypes";

const initialState = {
    user: {},
    loading: false,
    updating: false,
    logged: false,
    error: null,
    authToken: "",
    passwordOtp: "",
    users: [],
    searchUser: [],
    userTeam: {},
    userRequest: [],
    searchUserInTeam: []
};

const userReducer = (state = initialState, action) => {
    const { payload, type } = action;
    switch (type) {
        case SET_USER:
            return {
                ...state,
                user: payload,
                authToken: payload.token,
                updating: false,
                logged: true,
                loading: false,
            };
        case USER_TEAM: {
            return {
                ...state,
                userTeam: payload
            }
        }
        case SEARCH_USER_IN_TEAM: {
            return {
                ...state,
                searchUserInTeam: payload
            }
        }
        case SET_USER_REQUEST: {
            return {
                ...state,
                userRequest: payload
            }
        }
        case SEARCH_USER:
            return {
                ...state,
                searchUser: payload
            }
        case SET_LOGOUT:
            return {
                ...state,
                user: {},
                updating: false,
                logged: false,
                loading: false,
            };
        case SET_ERROR:
            return {
                ...state,
                error: payload,
            };
        case SET_TOKEN:
            return {
                ...state,
                authToken: payload,
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

export default userReducer;