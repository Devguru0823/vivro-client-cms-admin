import * as actionTypes from "../actions/actionTypes";
import updateObject from "../utility";

const initialState = {
  permissions: [],
  user_roles: [],
  users: [],
  assets: [],
  vpns: [],
  groups: [],
  locations: [],
  sublocations: [],
  systems: [],
  error: null,
  loading: false
};

const getPermissions = (state, action) =>
  updateObject(state, {
    permissions: action.list,
    error: null,
    loading: false
  });

const getRoles = (state, action) =>
  updateObject(state, {
    user_roles: action.list,
    error: null,
    loading: false
  });

const getUsers = (state, action) =>
  updateObject(state, {
    users: action.list,
    error: null,
    loading: false
  });

const getGroups = (state, action) =>
  updateObject(state, {
    groups: action.list
  });

const getLocations = (state, action) =>
  updateObject(state, {
    locations: action.list
  });

const getSubLocations = (state, action) =>
  updateObject(state, {
    sublocations: action.list
  });

const getSystems = (state, action) =>
  updateObject(state, {
    systems: action.list
  });


const getAssets = (state, action) =>
  updateObject(state, {
    assets: action.list,
    error: null,
    loading: false
  });


const getVPNs = (state, action) =>
  updateObject(state, {
    vpns: action.list,
    error: null,
    loading: false
  });


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PERMISSIONS:
      return getPermissions(state, action);
    case actionTypes.GET_ROLES:
      return getRoles(state, action);
    case actionTypes.GET_USERS:
      return getUsers(state, action);
    case actionTypes.GET_GROUPS:
      return getGroups(state, action);
    case actionTypes.GET_ASSETS:
      return getAssets(state, action);
    case actionTypes.GET_VPNS:
      return getVPNs(state, action);
    case actionTypes.GET_LOCATIONS:
      return getLocations(state, action);
    case actionTypes.GET_SUBLOCATIONS:
      return getSubLocations(state, action);
    case actionTypes.GET_SYSTEMS:
      return getSystems(state, action);
    default:
      return state;
  }
};

export default reducer;
