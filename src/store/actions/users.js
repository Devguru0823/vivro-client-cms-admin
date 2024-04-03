import axios from "axios";
import * as actionTypes from "./actionTypes";
import { openSuccess, openError, openInfo } from "./notification"

export const getList = list => ({
  type: actionTypes.GET_USERS,
  list
})


export const getGroupList = list => ({
  type: actionTypes.GET_GROUPS,
  list
})



export const getUsers = () =>
  dispatch => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}api/user/`, {
    })
      .then(res => {
        dispatch(getList(res.data.results));
      })
      .catch(() => {
      });
  };

export const getGroups = () =>
  dispatch => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}api/group/`, {
    })
      .then(res => {
        dispatch(getGroupList(res.data.results));
      })
      .catch(() => {
      });
  };

export const createUser = (role, email, username, company, customerID, password, userJson) =>
  dispatch => {
    const token = localStorage.getItem("admin-token");
    const headers = { Authorization: `Token ${token}` };
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}api/user/create`, {
        user_role: role,
        email,
        username,
        company,
        customer_id: customerID,
        role_position: "Customer",
        password,
        user_data: JSON.stringify(userJson)
      }, { headers })
      .then(res => {
        if (res)
          dispatch(getUsers());
        setTimeout(() => {
          dispatch(openSuccess(true, "Create Success!", "New User has been created.", "Just now"));
        }, 300);
      })
      .catch(() => {
        setTimeout(() => {
          dispatch(openError(true, "Create Failed!", "There was an error to create.", "Just now"));
        }, 300);
      });

  };

export const updateUser = (pk, role, email, username, company, customerID, password, rolePosition, userJson) =>
  dispatch => {
    const token = localStorage.getItem("admin-token");
    const headers = { Authorization: `Token ${token}` };
    axios
      .put(`${process.env.REACT_APP_SERVER_URL}api/user/update/${pk}/`, {
        user_role: role,
        email,
        username,
        company,
        customer_id: customerID,
        password,
        role_position: rolePosition,
        user_data: JSON.stringify(userJson)
      }, { headers })
      .then(res => {
        if (res)
          dispatch(getUsers());
        setTimeout(() => {
          dispatch(openInfo(true, "Update Success!", "The User has been updated.", "Just now"));
        }, 300);
      })
      .catch(() => {
        setTimeout(() => {
          dispatch(openError(true, "Update Failed!", "There was an error to update.", "Just now"));
        }, 300);
      });

  };

export const activateUser = (pk, value) =>
  dispatch => {
    const token = localStorage.getItem("admin-token");
    const headers = { Authorization: `Token ${token}` };
    axios
      .put(`${process.env.REACT_APP_SERVER_URL}api/user/activate/${pk}/`, {
        value
      }, { headers })
      .then(res => {
        if (res)
          dispatch(getUsers());
        setTimeout(() => {
          dispatch(openInfo(true, "Update Success!", "The User has been updated.", "Just now"));
        }, 300);
      })
      .catch(() => {
        setTimeout(() => {
          dispatch(openError(true, "Update Failed!", "There was an error to update.", "Just now"));
        }, 300);
      });

  };

export const deleteUser = (pk) =>
  dispatch => {
    const token = localStorage.getItem("admin-token");
    const headers = { Authorization: `Token ${token}` };
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}api/user/delete/${pk}/`, { headers })
      .then(res => {
        if (res)
          dispatch(getUsers());
        setTimeout(() => {
          dispatch(openSuccess(true, "Delete Success!", "The User has been deleted.", "Just now"));
        }, 300);
      })
      .catch(() => {
        setTimeout(() => {
          dispatch(openError(true, "Delete Failed!", "There was an error to delete.", "Just now"));
        }, 300);
      });
  };



export const createGroup = (name, description, tagName) =>
  dispatch => {
    const token = localStorage.getItem("admin-token");
    const headers = { Authorization: `Token ${token}` };
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}api/group/create`, {
        name,
        description,
        tag_name: tagName
      }, { headers })
      .then(res => {
        if (res)
          dispatch(getGroups());
        setTimeout(() => {
          dispatch(openSuccess(true, "Create Success!", "New Group has been created.", "Just now"));
        }, 300);
      })
      .catch(() => {
        setTimeout(() => {
          dispatch(openError(true, "Create Failed!", "There was an error to create.", "Just now"));
        }, 300);
      });

  };

export const updateGroup = (pk, name, description, tagName) =>
  dispatch => {
    const token = localStorage.getItem("admin-token");
    const headers = { Authorization: `Token ${token}` };
    axios
      .put(`${process.env.REACT_APP_SERVER_URL}api/group/update/${pk}/`, {
        name,
        description,
        tag_name: tagName
      }, { headers })
      .then(res => {
        if (res)
          dispatch(getGroups());
        setTimeout(() => {
          dispatch(openInfo(true, "Update Success!", "The Group has been updated.", "Just now"));
        }, 300);
      })
      .catch(() => {
        setTimeout(() => {
          dispatch(openError(true, "Update Failed!", "There was an error to update.", "Just now"));
        }, 300);
      });

  };

export const deleteGroup = (pk) =>
  dispatch => {
    const token = localStorage.getItem("admin-token");
    const headers = { Authorization: `Token ${token}` };
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}api/group/delete/${pk}/`, { headers })
      .then(res => {
        if (res)
          dispatch(getGroups());
        setTimeout(() => {
          dispatch(openSuccess(true, "Delete Success!", "The Group has been deleted.", "Just now"));
        }, 300);
      })
      .catch(() => {
        setTimeout(() => {
          dispatch(openError(true, "Delete Failed!", "There was an error to delete.", "Just now"));
        }, 300);
      });
  };




