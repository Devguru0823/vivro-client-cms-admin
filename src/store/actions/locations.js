import axios from "axios";
import * as actionTypes from "./actionTypes";
import { openSuccess, openError, openInfo } from "./notification"

export const getLocationList = list => ({
  type: actionTypes.GET_LOCATIONS,
  list
})

export const getSubLocationList = list => ({
  type: actionTypes.GET_SUBLOCATIONS,
  list
})

export const getLocations = () =>
  dispatch => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}api/location/`, {
    })
      .then(res => {
        dispatch(getLocationList(res.data.results));
      })
      .catch(() => {
      });
  };

export const getSubLocations = () =>
  dispatch => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}api/sublocation/`, {
    })
      .then(res => {
        dispatch(getSubLocationList(res.data.results));
      })
      .catch(() => {
      });
  };

export const createLocation = (name, description) =>
  dispatch => {
    const token = localStorage.getItem("admin-token");
    const headers = { Authorization: `Token ${token}` };
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}api/location/create`, {
        name,
        description
      }, { headers })
      .then(res => {
        if (res)
          dispatch(getLocations());
        setTimeout(() => {
          dispatch(openSuccess(true, "Create Success!", "New Location has been created.", "Just now"));
        }, 300);
      })
      .catch(() => {
        setTimeout(() => {
          dispatch(openError(true, "Create Failed!", "There was an error to create.", "Just now"));
        }, 300);
      });

  };

export const updateLocation = (pk, name, description) =>
  dispatch => {
    const token = localStorage.getItem("admin-token");
    const headers = { Authorization: `Token ${token}` };
    axios
      .put(`${process.env.REACT_APP_SERVER_URL}api/location/update/${pk}/`, {
        name,
        description
      }, { headers })
      .then(res => {
        if (res)
          dispatch(getLocations());
        setTimeout(() => {
          dispatch(openInfo(true, "Update Success!", "The Location has been updated.", "Just now"));
        }, 300);
      })
      .catch(() => {
        setTimeout(() => {
          dispatch(openError(true, "Update Failed!", "There was an error to update.", "Just now"));
        }, 300);
      });

  };

export const deleteLocation = (pk) =>
  dispatch => {
    const token = localStorage.getItem("admin-token");
    const headers = { Authorization: `Token ${token}` };
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}api/location/delete/${pk}/`, { headers })
      .then(res => {
        if (res){
          dispatch(getSubLocations());
          dispatch(getLocations());
        }
        setTimeout(() => {
          dispatch(openSuccess(true, "Delete Success!", "The Location has been deleted.", "Just now"));
        }, 300);
      })
      .catch(() => {
        setTimeout(() => {
          dispatch(openError(true, "Delete Failed!", "There was an error to delete.", "Just now"));
        }, 300);
      });
  };



export const createSubLocation = (name, description, location) =>
  dispatch => {
    const token = localStorage.getItem("admin-token");
    const headers = { Authorization: `Token ${token}` };
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}api/sublocation/create`, {
        name,
        description,
        location
      }, { headers })
      .then(res => {
        if (res)
          dispatch(getSubLocations());
        setTimeout(() => {
          dispatch(openSuccess(true, "Create Success!", "New Sub Location has been created.", "Just now"));
        }, 300);
      })
      .catch(() => {
        setTimeout(() => {
          dispatch(openError(true, "Create Failed!", "There was an error to create.", "Just now"));
        }, 300);
      });

  };

export const updateSubLocation = (pk, name, description, location) =>
  dispatch => {
    const token = localStorage.getItem("admin-token");
    const headers = { Authorization: `Token ${token}` };
    axios
      .put(`${process.env.REACT_APP_SERVER_URL}api/sublocation/update/${pk}/`, {
        name,
        description,
        location
      }, { headers })
      .then(res => {
        if (res)
          dispatch(getSubLocations());
        setTimeout(() => {
          dispatch(openInfo(true, "Update Success!", "The Sub Location has been updated.", "Just now"));
        }, 300);
      })
      .catch(() => {
        setTimeout(() => {
          dispatch(openError(true, "Update Failed!", "There was an error to update.", "Just now"));
        }, 300);
      });

  };

export const deleteSubLocation = (pk) =>
  dispatch => {
    const token = localStorage.getItem("admin-token");
    const headers = { Authorization: `Token ${token}` };
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}api/sublocation/delete/${pk}/`, { headers })
      .then(res => {
        if (res)
          dispatch(getSubLocations());
        setTimeout(() => {
          dispatch(openSuccess(true, "Delete Success!", "The Sub Location has been deleted.", "Just now"));
        }, 300);
      })
      .catch(() => {
        setTimeout(() => {
          dispatch(openError(true, "Delete Failed!", "There was an error to delete.", "Just now"));
        }, 300);
      });
  };




