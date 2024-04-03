import axios from "axios";
import * as actionTypes from "./actionTypes";
import { openError } from "./notification";


export const authStart = () =>
({
  type: actionTypes.AUTH_START
})


export const authSuccess = token => ({
  type: actionTypes.AUTH_SUCCESS,
  token
})

export const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  error
})

export const logout = () => {
  localStorage.removeItem("admin-token");
  localStorage.removeItem("expirationDate");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = expirationTime =>
  dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };

export const authLogin = (username, password, callback) =>
  dispatch => {

    dispatch(authStart());
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}api/user/admin-token-auth/`, {
        username,
        password
      })
      .then(res => {
        if(res.data.token){

          const token = `${res.data.token}`;
          const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
          localStorage.setItem("admin-token", token);
          localStorage.setItem("expirationDate", expirationDate);
          dispatch(authSuccess(token));
          dispatch(checkAuthTimeout(3600));
          callback(res);

        }else{

          dispatch(authFail(res.data.message));
          dispatch(openError(true, "Login Failed!", "Invalid User Name or Password.", ""));

        }

      })
      .catch(err => {
        dispatch(authFail(err));
        dispatch(openError(true, "Login Failed!", "Invalid User Name or Password.", ""));
      });
  }


export const authSignup = (username, email, password1, password2, userrole, callback) =>
  dispatch => {

    dispatch(authStart());
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}api/user/create`, {
        username,
        email,
        password: password1,
        password2,
        role_position: userrole
      })
      .then(res => {
        callback({ res, success: "success" });
      })
      .catch(err => {
        dispatch(authFail(err));
        callback(err);
      });

  };


export const authCheckState = () => dispatch => {

  const token = localStorage.getItem("admin-token");
  if (token === undefined) {
    dispatch(logout());
  } else {
    const expirationDate = new Date(localStorage.getItem("expirationDate"));
    if (expirationDate <= new Date()) {
      dispatch(logout());
    } else {
      dispatch(authSuccess(token));
      dispatch(
        checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      );
    }
  }
  
};



