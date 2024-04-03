import axios from "axios";
import * as actionTypes from "./actionTypes";
import { openSuccess, openError, openInfo } from "./notification"

export const getList = list => ({
  type: actionTypes.GET_SYSTEMS,
  list
})

export const getSystems = () =>
  dispatch => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}api/system/`, {
    })
      .then(res => {
        dispatch(getList(res.data.results));
      })
      .catch(() => {
      });
  }


export const createSystem = (name, description, uploadFile) =>
  dispatch => {
    const token = localStorage.getItem("admin-token");
    const headers = { Authorization: `Token ${token}`, "Content-Type": "multipart/form-data" };
    const bodyFormData = new FormData();
    bodyFormData.append('name', name);
    bodyFormData.append('description', description);

    // bodyFormData.append('app_url', appUrl);
    // bodyFormData.append('app_username', appUsername);
    // bodyFormData.append('app_userpwd', appUserPwd);
    // bodyFormData.append('username_query', nameQuery);
    // bodyFormData.append('userpwd_query', pwdQuery);
    // bodyFormData.append('login_query', loginQuery);
    
    if (uploadFile)
      bodyFormData.append('logo_img', uploadFile);

    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_URL}api/system/create`,
      data: bodyFormData,
      headers
    })
      .then((res) => {
        if (res)
          dispatch(getSystems());
        setTimeout(() => {
          dispatch(openSuccess(true, "Create Success!", "New System has been created.", "Just now"));
        }, 300);
      })
      .catch(() => {
        setTimeout(() => {
          dispatch(openError(true, "Create Failed!", "There was an error to create.", "Just now"));
        }, 300);
      });

  };


export const updateSystem = (id, name, description, uploadFile) =>
  dispatch => {

    const token = localStorage.getItem("admin-token");
    const headers = { Authorization: `Token ${token}`, "Content-Type": "multipart/form-data" };
    const bodyFormData = new FormData();
    bodyFormData.append('name', name);
    bodyFormData.append('description', description);
    // bodyFormData.append('app_url', appUrl);
    // bodyFormData.append('app_username', appUsername);
    // bodyFormData.append('app_userpwd', appUserPwd);
    
    // bodyFormData.append('username_query', nameQuery);
    // bodyFormData.append('userpwd_query', pwdQuery);
    // bodyFormData.append('login_query', loginQuery);

    if (uploadFile)
      bodyFormData.append('logo_img', uploadFile);

    axios({
      method: "put",
      url: `${process.env.REACT_APP_SERVER_URL}api/system/update/${id}/`,
      data: bodyFormData,
      headers
    })
      .then(res => {
        if (res)
          dispatch(getSystems());
        setTimeout(() => {
          dispatch(openInfo(true, "Update Success!", "The System has been updated.", "Just now"));
        }, 300);
      })
      .catch(() => {
        setTimeout(() => {
          dispatch(openError(true, "Update Failed!", "There was an error to update.", "Just now"));
        }, 300);
      });

  };


export const deleteSystem = (id) =>
  dispatch => {
    const token = localStorage.getItem("admin-token");
    const headers = { Authorization: `Token ${token}` };
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}api/system/delete/${id}/`, { headers })
      .then(res => {
        if (res)
          dispatch(getSystems());
        setTimeout(() => {
          dispatch(openSuccess(true, "Delete Success!", "The System has been deleted.", "Just now"));
        }, 300);
      })
      .catch(() => {
        setTimeout(() => {
          dispatch(openError(true, "Delete Failed!", "There was an error to delete.", "Just now"));
        }, 300);
      });

  };




