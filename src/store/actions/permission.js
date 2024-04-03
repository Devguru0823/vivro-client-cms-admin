import axios from "axios";
import * as actionTypes from "./actionTypes";
import { openSuccess, openError, openInfo } from "./notification"

export const getList = list => ({
  type: actionTypes.GET_PERMISSIONS,
  list
})

export const getPermissions = () =>
  dispatch => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}api/permission/`, {
    })
      .then(res => {
        dispatch(getList(res.data.results));
      })
      .catch(() => {
      });
  }


export const createPermission = (name, description) =>
  dispatch => {
    const token = localStorage.getItem("admin-token");
    const headers = { Authorization: `Token ${token}` };
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}api/permission/create`, {
        name,
        description
      }, { headers })
      .then((res) => {
        if (res)
          dispatch(getPermissions());
        setTimeout(() => {
          dispatch(openSuccess(true, "Create Success!", "New Permission has been created.", "Just now"));
        }, 300);
      })
      .catch(() => {
        setTimeout(() => {
          dispatch(openError(true, "Create Failed!", "There was an error to create.", "Just now"));
        }, 300);
      });

  };


export const updatePermission = (id, name, description) =>
  dispatch => {
    const token = localStorage.getItem("admin-token");
    const headers = { Authorization: `Token ${token}` };
    axios
      .put(`${process.env.REACT_APP_SERVER_URL}api/permission/update/${id}/`, {
        name,
        description
      }, { headers })
      .then(res => {
        if (res)
          dispatch(getPermissions());
        setTimeout(() => {
          dispatch(openInfo(true, "Update Success!", "The Permission has been updated.", "Just now"));
        }, 300);
      })
      .catch(() => {
        setTimeout(() => {
          dispatch(openError(true, "Update Failed!", "There was an error to update.", "Just now"));
        }, 300);
      });

  };


export const deletePermission = (id) =>
  dispatch => {
    const token = localStorage.getItem("admin-token");
    const headers = { Authorization: `Token ${token}` };
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}api/permission/delete/${id}/`, { headers })
      .then(res => {
        if (res)
          dispatch(getPermissions());
        setTimeout(() => {
          dispatch(openSuccess(true, "Delete Success!", "The Permission has been deleted.", "Just now"));
        }, 300);
      })
      .catch(() => {
        setTimeout(() => {
          dispatch(openError(true, "Delete Failed!", "There was an error to delete.", "Just now"));
        }, 300);
      });

  };




