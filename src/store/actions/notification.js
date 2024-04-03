
import * as actionTypes from "./actionTypes";

export const openSuccess = (open, title, content, dateTime) =>
({
  type: actionTypes.OPEN_SUCCESS_NOTIFICATION,
  data: {
    open, title, content, dateTime
  }
})
export const closeSuccess = () => ({
  type: actionTypes.CLOSE_SUCCESS_NOTIFICATION
})


export const openError = (open, title, content, dateTime) =>
({
  type: actionTypes.OPEN_ERROR_NOTIFICATION,
  data: {
    open, title, content, dateTime
  }
})
export const closeError = () => ({
  type: actionTypes.CLOSE_ERROR_NOTIFICATION
})


export const openInfo = (open, title, content, dateTime) =>
({
  type: actionTypes.OPEN_INFO_NOTIFICATION,
  data: {
    open, title, content, dateTime
  }
})
export const closeInfo = () => ({
  type: actionTypes.CLOSE_INFO_NOTIFICATION
})
