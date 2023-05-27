import axios from "axios";
import { baseUrl } from "../baseUrl";
import {
  SET_ERROR,
  SET_LOADING,
  GET_ALL_PROJECTS,
  GET_PROJECT_DETAILS,
} from "./ProjectTypes";
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

export const setProjects = (projects) => {
  return {
    type: GET_ALL_PROJECTS,
    payload: projects
  }
}

export const setProjectDetails = (projectDetails) => {
  return {
    type: GET_PROJECT_DETAILS,
    payload: projectDetails
  }
}



export const getUserProjects = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    let res = await axios({
      method: "GET",
      url: `${baseUrl}/project/userProjects/${id}`,
    });
    await dispatch(setProjects(res?.data?.projects))
    dispatch(setLoading(false));
  } catch (err) {
    Swal.fire({
      customClass: {
        container: `my-swal`,
      },
      icon: "error",
      title: "Working Days",
      html: `<strong><font color="black">Something went wrong while getting your Projects</font></strong>`,
    });
    dispatch(setLoading(false));
    dispatch(setError(err));
    //   console.log(err,"getCurrentUser")
  }
};


export const createProject = (data, userId) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    let res = await axios({
      url: `${baseUrl}/project`,
      method: "POST",
      data: data
    });
    await Swal.fire({
      customClass: {
        container: `my-swal`,
      },
      icon: "success",
      title: "Working Days",
      html: `<strong><font color="black">Project Created Sucessfully</font></strong>`
    });
    dispatch(setLoading(false))
    await dispatch(getUserProjects(userId))
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

export const getProjectDetails = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    let res = await axios({
      method: "GET",
      url: `${baseUrl}/project/projectDetails/${id}`,
    });
    await dispatch(setProjectDetails(res?.data?.project))
    // console.log(res?.data, "getUserTeam")
    dispatch(setLoading(false));
  } catch (err) {
    Swal.fire({
      customClass: {
        container: `my-swal`,
      },
      icon: "error",
      title: "Working Days",
      html: `<strong><font color="black">Something went wrong while Getting your Project </font></strong>`,
    });
    dispatch(setLoading(false));
    dispatch(setError(err));
    //   console.log(err,"getCurrentUser")
  }
};


export const addEmployeeToproject = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    let res = await axios({
      url: `${baseUrl}/project/addEmployeeToProject`,
      method: "PUT",
      data: data
    });
    await Swal.fire({
      customClass: {
        container: `my-swal`,
      },
      icon: "success",
      title: "Working Days",
      html: `<strong><font color="black">EMPLOYEE Addedd To Project Sucessfully</font></strong>`
    });
    dispatch(setLoading(false))
    await dispatch(getProjectDetails(data.projectId))
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

