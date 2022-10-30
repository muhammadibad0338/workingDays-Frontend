import axios from "axios";
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
            data:data
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