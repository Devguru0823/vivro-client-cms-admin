/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Peter Y (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { MaterialUIControllerProvider } from "context";

import authReducer from "./store/reducers/auth";
import dlgReducer from "./store/reducers/dlgs";
import dashboardReducer from "./store/reducers/dashboard";
import notificationReducer from './store/reducers/notifications';


const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// Material Dashboard 2 React Context Provider
// require('dotenv').config();
const rootReducer = combineReducers({
  auth: authReducer,
  dlgs: dlgReducer,
  dashboard: dashboardReducer,
  notification: notificationReducer
});

const store = createStore(rootReducer, composeEnhances(applyMiddleware(thunk)));

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <MaterialUIControllerProvider>
        <App />
      </MaterialUIControllerProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
