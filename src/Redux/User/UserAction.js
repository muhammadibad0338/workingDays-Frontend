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
    SENT_REQUEST,
    SET_USER_REQUEST
} from "./UserTypes";
import Swal from "sweetalert2";

export const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user,
    };
};

export const setUserTeam = (team) => {
    return {
        type: USER_TEAM,
        payload: team
    }
}

export const setUserRequest = (requests) => {
    return {
        type: SET_USER_REQUEST,
        payload: requests
    }
}

export const setLoading = (loading) => {
    return {
        type: SET_LOADING,
        payload: loading,
    };
};

export const setSearchUser = (user) => {
    return {
        type: SEARCH_USER,
        payload: user
    }
}

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


export const registerUser = (data) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        let res = await axios({
            url: `${baseUrl}/auth/signup`,
            method: "POST",
            data: data
        });
        await Swal.fire({
            customClass: {
                container: `my-swal`,
            },
            icon: "success",
            title: "Working Days",
            html: `<strong><font color="black">User Created Sucessfully</font></strong>`
        });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("uid", res.data?.user?._id);
        dispatch(setLoading(false));
        dispatch(setUser(res?.data?.user))
        console.log(res, "Signup response")
        return res
    } catch (err) {
        Swal.fire({
            customClass: {
                container: `my-swal`,
            },
            icon: "error",
            title: "Working Days",
            html: `<strong><font color="black">${err?.response?.data?.message || err?.response?.data}</font></strong>`,
        });
        console.log("signup error", err)
        dispatch(setError(err));
        dispatch(setLoading(false));
        return null
    }
};


export const loginUser = (data) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        let res = await axios({
            url: `${baseUrl}/auth/login`,
            method: "POST",
            data: data
        });
        await Swal.fire({
            customClass: {
                container: `my-swal`,
            },
            icon: "success",
            title: "Working Days",
            html: `<strong><font color="black">User LoggedIn Sucessfully</font></strong>`
        });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("uid", res.data?.user?._id);
        dispatch(setUser(res?.data?.user))
        console.log("login res", res)
        dispatch(setLoading(false));
        return res
    } catch (err) {
        Swal.fire({
            customClass: {
                container: `my-swal`,
            },
            icon: "error",
            title: "Working Days",
            html: `<strong><font color="black">${err?.response?.data?.message || err?.response?.data}</font></strong>`,
        });
        dispatch(setError(err?.message));
        dispatch(setLoading(false));
        console.log("user login err", err)
        return null
    }
};

export const getCurrentUser = (id) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        let res = await axios({
            method: "GET",
            url: `${baseUrl}/auth/currentUserDetails/${id}`,
        });
        await dispatch(setUser(res?.data?.user))
        dispatch(setLoading(false));
    } catch (err) {
        Swal.fire({
            customClass: {
                container: `my-swal`,
            },
            icon: "error",
            title: "Working Days",
            html: `<strong><font color="black">Something went wrong while getting your Profile</font></strong>`,
        });
        dispatch(setLoading(false));
        dispatch(setError(err));
        //   console.log(err,"getCurrentUser")
    }
};

export const getSearchUsers = (key) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        let res = await axios({
            method: "GET",
            url: `${baseUrl}/auth/searchUser/${key}`,
        });
        await dispatch(setSearchUser(res?.data))
        dispatch(setLoading(false));
    } catch (err) {
        Swal.fire({
            customClass: {
                container: `my-swal`,
            },
            icon: "error",
            title: "Working Days",
            html: `<strong><font color="black">Something went wrong while Searching for Users </font></strong>`,
        });
        dispatch(setLoading(false));
        dispatch(setError(err));
        //   console.log(err,"getCurrentUser")
    }
};

export const getUserTeam = (id) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        let res = await axios({
            method: "GET",
            url: `${baseUrl}/team/currentUserTeam/${id}`,
        });
        await dispatch(setUserTeam(res?.data))
        console.log(res?.data, "getUserTeam")
        dispatch(setLoading(false));
    } catch (err) {
        Swal.fire({
            customClass: {
                container: `my-swal`,
            },
            icon: "error",
            title: "Working Days",
            html: `<strong><font color="black">Something went wrong while Getting your Teams </font></strong>`,
        });
        dispatch(setLoading(false));
        dispatch(setError(err));
        //   console.log(err,"getCurrentUser")
    }
};


export const sentRequest = (data) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        let res = await axios({
            url: `${baseUrl}/request/sendRequest`,
            method: "POST",
            data: data
        });
        await Swal.fire({
            customClass: {
                container: `my-swal`,
            },
            icon: "success",
            title: "Working Days",
            html: `<strong><font color="black">Request send Sucessfully</font></strong>`
        });
        dispatch(setLoading(false))
        return res
    }
    catch (err) {
        Swal.fire({
            customClass: {
                container: `my-swal`,
            },
            icon: "error",
            title: "Working Days",
            html: `<strong><font color="black">${err?.response?.data?.message || err?.response?.data}</font></strong>`,
        });
        dispatch(setError(err?.message));
        dispatch(setLoading(false));
        return null
    }
}


export const getUserRequest = (id) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        let res = await axios({
            method: "GET",
            url: `${baseUrl}/request/userRequest/${id}`,
        });
        await dispatch(setUserRequest(res?.data?.requests))
        // console.log(res?.data, "getUserTeam")
        dispatch(setLoading(false));
    } catch (err) {
        Swal.fire({
            customClass: {
                container: `my-swal`,
            },
            icon: "error",
            title: "Working Days",
            html: `<strong><font color="black">Something went wrong while Getting your Request </font></strong>`,
        });
        dispatch(setLoading(false));
        dispatch(setError(err));
        //   console.log(err,"getCurrentUser")
    }
};


export const updateRequestStatus = (id,data) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        let res = await axios({
            url: `${baseUrl}/request/changeRequestStatus/${id}`,
            method: "PUT",
            data: data
        });
        await Swal.fire({
            customClass: {
                container: `my-swal`,
            },
            icon: "success",
            title: "Working Days",
            html: `<strong><font color="black">Request ${data.status} Sucessfully</font></strong>`
        });
        dispatch(setLoading(false))
    }
    catch (err) {
        Swal.fire({
            customClass: {
                container: `my-swal`,
            },
            icon: "error",
            title: "Working Days",
            html: `<strong><font color="black">${err?.response?.data?.message || err?.response?.data}</font></strong>`,
        });
        dispatch(setError(err?.message));
        dispatch(setLoading(false));
    }
}