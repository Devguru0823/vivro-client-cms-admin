import * as actionTypes from "../actions/actionTypes";
import updateObject from "../utility";

const initialState = {
  success: {
    open: false,
    title: "Alert",
    content: "Messages",
    dateTime: "Just now"
  },
  error: {
    open: false,
    title: "Alert",
    content: "Messages",
    dateTime: "Just now"
  },
  info: {
    open: false,
    title: "Alert",
    content: "Messages",
    dateTime: "Just now"
  }
};


const openSuccess = (state, action) =>
  updateObject(state, {
    success: action.data
  });

const closeSuccess = (state) =>
  updateObject(state, {
    success: { open: false, title: "", content: "", dateTime: "" }
  });


const openError = (state, action) =>
  updateObject(state, {
    error: action.data
  });

const closeError = (state) =>
  updateObject(state, {
    error: { open: false, title: "", content: "", dateTime: "" }
  });

const openInfo = (state, action) =>
  updateObject(state, {
    info: action.data
  });

const closeInfo = (state) =>
  updateObject(state, {
    info: { open: false, title: "", content: "", dateTime: "" }
  });


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.OPEN_SUCCESS_NOTIFICATION:
      return openSuccess(state, action);
    case actionTypes.CLOSE_SUCCESS_NOTIFICATION:
      return closeSuccess(state);

    case actionTypes.OPEN_ERROR_NOTIFICATION:
      return openError(state, action);
    case actionTypes.CLOSE_ERROR_NOTIFICATION:
      return closeError(state);


    case actionTypes.OPEN_INFO_NOTIFICATION:
      return openInfo(state, action);
    case actionTypes.CLOSE_INFO_NOTIFICATION:
      return closeInfo(state);

    default:
      return state;
  }
};

export default reducer;
