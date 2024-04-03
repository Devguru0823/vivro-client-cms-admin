import axios from "axios";
import * as actionTypes from "./actionTypes";
import { openSuccess, openError, openInfo } from "./notification"

export const getList = list => ({
  type: actionTypes.GET_ASSETS,
  list
})

export const getAssets = () =>
  dispatch => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}api/asset/`, {
    })
      .then(res => {
        dispatch(getList(res.data.results));
      })
      .catch(() => {
      });
  }


export const createAsset = (name, location, subLocation, deviceLocation, deviceID, jsonData, appUrl, appUsername, appUserPwd, nameQuery, pwdQuery, loginQuery) =>
  dispatch => {
    const token = localStorage.getItem("admin-token");
    const headers = { Authorization: `Token ${token}` };
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}api/asset/create`, {
        name, location, sub_location: subLocation, device_location: deviceLocation, device_id: deviceID, json_data: JSON.stringify(jsonData), app_url: appUrl,
        app_username: appUsername, app_userpwd: appUserPwd, username_query: nameQuery, userpwd_query: pwdQuery, login_query: loginQuery
      }, { headers })
      .then((res) => {
        if (res)
          dispatch(getAssets());
        setTimeout(() => {
          dispatch(openSuccess(true, "Create Success!", "New Asset has been created.", "Just now"));
        }, 300);
      })
      .catch(() => {
        setTimeout(() => {
          dispatch(openError(true, "Create Failed!", "There was an error to create.", "Just now"));
        }, 300);
      });

  };





export const updateAsset = (id, name, location, subLocation, deviceLocation, deviceID, jsonData, appUrl, appUsername, appUserPwd, nameQuery, pwdQuery, loginQuery) =>
  dispatch => {
    const token = localStorage.getItem("admin-token");
    const headers = { Authorization: `Token ${token}` };
    axios
      .put(`${process.env.REACT_APP_SERVER_URL}api/asset/update/${id}/`, {
        name, location, sub_location: subLocation, device_location: deviceLocation, device_id: deviceID, json_data: JSON.stringify(jsonData), app_url: appUrl,
        app_username: appUsername, app_userpwd: appUserPwd, username_query: nameQuery, userpwd_query: pwdQuery, login_query: loginQuery
      }, { headers })
      .then(res => {
        if (res)
          dispatch(getAssets());
        setTimeout(() => {
          dispatch(openInfo(true, "Update Success!", "The Asset has been updated.", "Just now"));
        }, 300);
      })
      .catch(() => {
        setTimeout(() => {
          dispatch(openError(true, "Update Failed!", "There was an error to update.", "Just now"));
        }, 300);
      });

  };


export const deleteAsset = (id) =>
  dispatch => {
    const token = localStorage.getItem("admin-token");
    const headers = { Authorization: `Token ${token}` };
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}api/asset/delete/${id}/`, { headers })
      .then(res => {
        if (res)
          dispatch(getAssets());
        setTimeout(() => {
          dispatch(openSuccess(true, "Delete Success!", "The Asset has been deleted.", "Just now"));
        }, 300);
      })
      .catch(() => {
        setTimeout(() => {
          dispatch(openError(true, "Delete Failed!", "There was an error to delete.", "Just now"));
        }, 300);
      });

  };




