import axios from "axios";
import * as actionTypes from "./actionTypes";
import { openSuccess, openError, openInfo } from "./notification"

export const getList = list => ({
  type: actionTypes.GET_ROLES,
  list
})

export const getRoles = () =>
  dispatch => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}api/role/`, {
    })
      .then(res => {
        dispatch(getList(res.data.results));
      })
      .catch(() => {
      });
  }


export const createRole = (name, description, permissions) =>
  dispatch => {
    const token = localStorage.getItem("admin-token");
    const headers = { Authorization: `Token ${token}` };
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}api/role/create`, {
        name,
        description,
        permissions
      }, { headers })
      .then(() => {
        dispatch(getRoles());
        setTimeout(() => {
          dispatch(openSuccess(true, "Create Success!", "New Role has been created.", "Just now"));
        }, 300);
      })
      .catch(() => {
        setTimeout(() => {
          dispatch(openError(true, "Create Failed!", "There was an error to create.", "Just now"));
        }, 300);
      });

  };


export const updateRole = (id, name, description, permissions) =>
  dispatch => {
    const token = localStorage.getItem("admin-token");
    const headers = { Authorization: `Token ${token}` };
    axios
      .put(`${process.env.REACT_APP_SERVER_URL}api/role/update/${id}/`, {
        name,
        description,
        permissions
      }, { headers })
      .then(() => {
        dispatch(getRoles());
        setTimeout(() => {
          dispatch(openInfo(true, "Update Success!", "The Role has been updated.", "Just now"));
        }, 300);
      })
      .catch(() => {
        setTimeout(() => {
          dispatch(openError(true, "Update Failed!", "There was an error to update.", "Just now"));
        }, 300);
      });

  };


export const deleteRole = (id) =>
  dispatch => {
    const token = localStorage.getItem("admin-token");
    const headers = { Authorization: `Token ${token}` };
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}api/role/delete/${id}/`, { headers })
      .then(res => {
        if (res)
          dispatch(getRoles());
        // console.log(res);
        setTimeout(() => {
          dispatch(openSuccess(true, "Delete Success!", "The Role has been deleted.", "Just now"));
        }, 300);
      })
      .catch(() => {
        setTimeout(() => {
          dispatch(openError(true, "Delete Failed!", "There was an error to delete.", "Just now"));
        }, 300);
      });

  };




