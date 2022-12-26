import axios from "axios";
import { baseUrl } from "../baseUrl";
import {
    SET_ERROR,
    SET_LOADING,
    GET_ALL_PROJECTS
} from "./ProjectTypes";

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

export const setProjects = (projects) =>{
    return{
        type:GET_ALL_PROJECTS,
        payload:projects
    }
}


export const getUserProjects = (id) => async (dispatch) => {
    try {
      dispatch(setLoading(true));
      let res = await axios({
        method: "GET",
        url: `${baseUrl}/project/userProject/${id}`,
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