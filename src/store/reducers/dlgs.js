import * as actionTypes from "../actions/actionTypes";
import  updateObject  from "../utility";

const initialState = {
  assignDlg: false,
  filterDlg: false,
  accessDlg: false
};

const assignDlgOpen = (state) => updateObject(state, {
  assignDlg: true
});

const assignDlgClose = (state) => updateObject(state, {
  assignDlg: false
});


const filterDlgOpen = (state) => updateObject(state, {
  filterDlg: true
});

const filterDlgClose = (state) => updateObject(state, {
  filterDlg: false
});


const accessDlgOpen = (state) => updateObject(state, {
  accessDlg: true
});

const accessDlgClose = (state) => updateObject(state, {
  accessDlg: false
});


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ASSIGNDLG_OPEN:
      return assignDlgOpen(state);
    case actionTypes.ASSIGNDLG_CLOSE:
      return assignDlgClose(state);

    case actionTypes.FILTERDLG_CLOSE:
      return filterDlgClose(state);
    case actionTypes.FILTERDLG_OPEN:
      return filterDlgOpen(state);

    case actionTypes.ACCESSDLG_CLOSE:
      return accessDlgClose(state);
    case actionTypes.ACCESSDLG_OPEN:
      return accessDlgOpen(state);

    default:
      return state;
  }
};

export default reducer;
