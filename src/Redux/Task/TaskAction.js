import axios from "axios";
import { baseUrl } from "../baseUrl";
import {
  SET_ERROR,
  SET_LOADING,
  GET_ALL_TASKS,
  GET_PROJECT_TASKS_TREE,
  GET_PROJECT_TASKS_REPORT
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

export const setProjectTaskTree = (taskTree) => {
  return {
    type: GET_PROJECT_TASKS_TREE,
    payload: taskTree
  }
}



export const setProjectTaskReports = (taskReports) => {
  return {
    type: GET_PROJECT_TASKS_REPORT,
    payload: taskReports
  }
}


export const getProjectsTasks = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    let res = await axios({
      method: "GET",
      url: `${baseUrl}/task/currentProjectTask/${id}`,
    });
    await dispatch(setTasks(res?.data))
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

export const getProjectsTaskTree = (id) => async (dispatch) => {
  try {
    // dispatch(setLoading(true));
    let res = await axios({
      method: "GET",
      url: `${baseUrl}/task/projectTaskTree/${id}`,
    });
    await dispatch(setProjectTaskTree(res?.data))
    // dispatch(setLoading(false));
    return res
  } catch (err) {
    Swal.fire({
      customClass: {
        container: `my-swal`,
      },
      icon: "error",
      title: "Working Days",
      html: `<strong><font color="black">Something went wrong while getting your Tasks</font></strong>`,
    });
    // dispatch(setLoading(false));
    dispatch(setError(err));
    return false
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
    Swal.fire({
      customClass: {
        container: `my-swal`,
      },
      icon: "success",
      title: "Working Days",
      html: `<strong><font color="black">Task Created Sucessfully</font></strong>`
    }).then(() => {

      dispatch(setLoading(false))
      dispatch(getProjectsTasks(data.project))
    })
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


export const setTaskDelete = (taskId, projectId) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    let res = await axios({
      method: "DELETE",
      baseURL: `${baseUrl}/task/deleteTask/${taskId}`,
    })
    Swal.fire({
      customClass: {
        container: `my-swal`,
      },
      icon: "success",
      title: "Working Days",
      html: `<strong><font color="black">Task Deleted Sucessfully</font></strong>`
    }).then(() => {

      dispatch(setLoading(false))
      dispatch(getProjectsTasks(projectId))
    })
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



export const updateTaskAgileCycle = (data, taskId, projectId) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    let res = await axios({
      url: `${baseUrl}/task/updateTaskAgileCycle/${taskId}`,
      method: "PUT",
      data: data
    });
    Swal.fire({
      customClass: {
        container: `my-swal`,
      },
      icon: "success",
      title: "Working Days",
      html: `<strong><font color="black">Task move to ${data.agileCycle} Sucessfully</font></strong>`
    }).then(() => {

      dispatch(setLoading(false))
      dispatch(getProjectsTasks(projectId))
    })
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


export const updateTaskDescription = (data, taskId, projectId) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    let res = await axios({
      url: `${baseUrl}/task/updateTaskDetails/${taskId}`,
      method: "PUT",
      data: data
    });
    Swal.fire({
      customClass: {
        container: `my-swal`,
      },
      icon: "success",
      title: "Working Days",
      html: `<strong><font color="black">Task updated Sucessfully</font></strong>`
    }).then(() => {

      dispatch(setLoading(false))
      dispatch(getProjectsTasks(projectId))
    })
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


export const addTaskDependency = (taskId, taskRefs) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    let res = await axios({
      url: `${baseUrl}/task/addTaskDependency/${taskId}`,
      method: "PUT",
      data: {
        taskRefs: taskRefs
      }
    });
    if (res?.data?.success) {
      Swal.fire({
        customClass: {
          container: `my-swal`,
        },
        icon: "success",
        title: "Working Days",
        html: `<strong><font color="black">${res?.data?.message}</font></strong>`
      }).then(() => {

        dispatch(setLoading(false))
      })
      return true
    }
    else {
      Swal.fire({
        customClass: {
          container: `my-swal`,
        },
        icon: "warning",
        title: "Working Days",
        html: `<strong><font color="black">${res?.data?.message}</font></strong>`
      }).then(() => {

        dispatch(setLoading(false))
      })
      return false
    }
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
    return false
  }
}

export const editTaskDependency = (taskId, replaceFromTaskRefs, replaceToTaskRefs) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    let res = await axios({
      url: `${baseUrl}/task/replaceTaskDependency/${taskId}`,
      method: "PUT",
      data: {
        replaceFromTaskRefs,
        replaceToTaskRefs,
      }
    });
    if (res?.data?.success) {
      Swal.fire({
        customClass: {
          container: `my-swal`,
        },
        icon: "success",
        title: "Working Days",
        html: `<strong><font color="black">${res?.data?.message}</font></strong>`
      }).then(() => {

        dispatch(setLoading(false))
      })
      return true
    }
    else {
      Swal.fire({
        customClass: {
          container: `my-swal`,
        },
        icon: "warning",
        title: "Working Days",
        html: `<strong><font color="black">${res?.data?.message}</font></strong>`
      }).then(() => {

        dispatch(setLoading(false))
      })
      return false
    }
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
    return false
  }
}


export const deleteTaskDependency = (taskId, deleteTaskRefs) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    let res = await axios({
      url: `${baseUrl}/task/deleteTaskDependency/${taskId}`,
      method: "DELETE",
      data: {
        deleteTaskRefs
      }
    });
    if (res?.data?.success) {
      Swal.fire({
        customClass: {
          container: `my-swal`,
        },
        icon: "success",
        title: "Working Days",
        html: `<strong><font color="black">${res?.data?.message}</font></strong>`
      }).then(() => {

        dispatch(setLoading(false))
      })
      return true
    }
    else {
      Swal.fire({
        customClass: {
          container: `my-swal`,
        },
        icon: "warning",
        title: "Working Days",
        html: `<strong><font color="black">${res?.data?.message}</font></strong>`
      }).then(() => {

        dispatch(setLoading(false))
      })
      return false
    }
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
    return false
  }
}

export const updateTaskDeadLine = (data, taskId, projectId) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    let res = await axios({
      url: `${baseUrl}/task/extedDeadline/${taskId}`,
      method: "PUT",
      data: data
    });
    Swal.fire({
      customClass: {
        container: `my-swal`,
      },
      icon: "success",
      title: "Working Days",
      html: `<strong><font color="black">Task DeadLine Extended Sucessfully</font></strong>`
    }).then(() => {

      dispatch(setLoading(false))
      dispatch(getProjectsTasks(projectId))
    })
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

export const getProjectsTaskReports = (id, employeeId) => async (dispatch) => {
  try {
    // dispatch(setLoading(true));
    let res = await axios({
      method: "GET",
      url: `${baseUrl}/task/projectTasksReports/${id}`,
      params: { employeeId },
    });
    await dispatch(setProjectTaskReports(res?.data))
    // dispatch(setLoading(false));
    return res
  } catch (err) {
    Swal.fire({
      customClass: {
        container: `my-swal`,
      },
      icon: "error",
      title: "Working Days",
      html: `<strong><font color="black">Something went wrong while getting your Tasks</font></strong>`,
    });
    // dispatch(setLoading(false));
    dispatch(setError(err));
    return false
  }
};