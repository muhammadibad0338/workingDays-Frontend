import axios from "axios";
import { baseUrl } from "../baseUrl";
import {
  SET_ERROR,
  SET_LOADING,
  GET_ALL_TASKS,
} from "./TaskTypes";
import Swal from "sweetalert2";

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

export const setTasks = (tasks) => {
  return {
    type: GET_ALL_TASKS,
    payload: tasks
  }
}


export const getProjectsTasks = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    let res = await axios({
      method: "GET",
      url: `${baseUrl}/task/currentProjectTaks/${id}`,
    });
    await dispatch(setTasks(res?.data?.tasks))
    dispatch(setLoading(false));
  } catch (err) {
    Swal.fire({
      customClass: {
        container: `my-swal`,
      },
      icon: "error",
      title: "Working Days",
      html: `<strong><font color="black">Something went wrong while getting your Tasks</font></strong>`,
    });
    dispatch(setLoading(false));
    dispatch(setError(err));
  }
};

export const createTask = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    let res = await axios({
      url: `${baseUrl}/task/createTask`,
      method: "POST",
      data: data
    });
    await Swal.fire({
      customClass: {
        container: `my-swal`,
      },
      icon: "success",
      title: "Working Days",
      html: `<strong><font color="black">Task Created Sucessfully</font></strong>`
    });
    dispatch(setLoading(false))
    await dispatch(getProjectsTasks(data.project))
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