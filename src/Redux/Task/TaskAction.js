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
