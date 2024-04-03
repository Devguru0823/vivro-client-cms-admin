import axios from "axios";
import * as actionTypes from "./actionTypes";
import { openSuccess, openError, openInfo } from "./notification"

export const getList = list => ({
  type: actionTypes.GET_VPNS,
  list
})

export const getVPNs = () =>
  dispatch => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}api/vpn/`, {
    })
      .then(res => {
        dispatch(getList(res.data.results));
      })
      .catch(() => {
      });
  }


export const createVPN = (ipAddr, port, description, assignTo, location, isVPN) =>
  dispatch => {
    const token = localStorage.getItem("admin-token");
    const headers = { Authorization: `Token ${token}` };
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}api/vpn/create`, {
        port,
        description,
        ip_addr: ipAddr,
        assign_to: assignTo,
        location,
        is_vpn: isVPN
      }, { headers })
      .then((res) => {
        if (res)
          dispatch(getVPNs());
        setTimeout(() => {
          dispatch(openSuccess(true, "Create Success!", "New VPN has been created.", "Just now"));
        }, 300);
      })
      .catch(() => {
        setTimeout(() => {
          dispatch(openError(true, "Create Failed!", "There was an error to create.", "Just now"));
        }, 300);
      });

  };


export const updateVPN = (id, ipAddr, port, description, assignTo, location, isVPN) =>
  dispatch => {
    const token = localStorage.getItem("admin-token");
    const headers = { Authorization: `Token ${token}` };
    axios
      .put(`${process.env.REACT_APP_SERVER_URL}api/vpn/update/${id}/`, {
        port,
        description,
        ip_addr: ipAddr,
        assign_to: assignTo,
        location,
        is_vpn: isVPN
      }, { headers })
      .then(res => {
        if (res)
          dispatch(getVPNs());
        setTimeout(() => {
          dispatch(openInfo(true, "Update Success!", "The VPN has been updated.", "Just now"));
        }, 300);
      })
      .catch(() => {
        setTimeout(() => {
          dispatch(openError(true, "Update Failed!", "There was an error to update.", "Just now"));
        }, 300);
      });
  };


export const deleteVPN = (id) =>
  dispatch => {
    
    const token = localStorage.getItem("admin-token");
    const headers = { Authorization: `Token ${token}` };

    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}api/vpn/delete/${id}/`, { headers })
      .then(res => {
        if (res)
          dispatch(getVPNs());
        setTimeout(() => {
          dispatch(openSuccess(true, "Delete Success!", "The VPN has been deleted.", "Just now"));
        }, 300);
      })
      .catch(() => {
        setTimeout(() => {
          dispatch(openError(true, "Delete Failed!", "There was an error to delete.", "Just now"));
        }, 300);
      });
  };




