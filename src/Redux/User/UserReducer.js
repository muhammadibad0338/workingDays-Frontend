import axios  from "axios";
import { baseUrl } from "../baseUrl";
import {
    SET_ERROR,
    SET_LOADING,
    SET_LOGOUT,
    SET_USER,
    SET_TOKEN
} from "./UserTypes";
import Swal from "sweetalert2";

export const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user,
    };
};

export const setLoading = (loading) => {
    return {
        type: SET_LOADING,
        payload: loading,
    };
};

export const setError = (error) => {
    return {
        type: SET_ERROR,
        payload: error,
    };
};

export const setLogout = () => {
    return {
        type: SET_LOGOUT,
    };
};

export const setToken = (token) => {
    return {
        type: SET_TOKEN,
        payload: token,
    };
};