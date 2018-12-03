import * as types from "./types";
import fetch from "./../etc/fetch";

export const initialState = {
  usernamesById: [],
  usernames: {},
  usernameFilters: {},
  fetching: false,
  error: null
};

export default function profiles(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_PROFILES_REQUEST:
      return {
        ...state,
        fetching: true
      };
    case types.FETCH_PROFILES_FAILURE:
      const { error: fetchProfilesError } = action;
      return {
        ...state,
        fetching: false,
        error: fetchProfilesError
      };
    case types.FETCH_PROFILES_SUCCESS:
      const { data: fetchProfilesData } = action;
      let usernames = {};
      let usernameFilters = {};
      fetchProfilesData.forEach(p => {
        usernames[p.username] = [...p.media];
        usernameFilters[p.username] = p.filters || [];
      });
      return {
        ...state,
        usernames,
        usernamesById: [...Object.keys(usernames)],
        usernameFilters,
        fetching: false,
        error: null
      };
    case types.LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export function fetchProfiles() {
  return async (dispatch, getState) => {
    dispatch(fetchProfilesRequest());
    const user = getState().auth.user;
    if (!user) {
      return dispatch({
        type: types.UNAUTHORIZED,
        status: 401
      });
    }
    const { id } = user;
    try {
      const { data } = await api.fetchProfiles(id);
      dispatch(fetchProfilesSuccess(data));
    } catch (error) {
      const message = "Error fetching feed";
      dispatch(fetchProfilesFailure(message));
    }
  };
}

export function fetchProfilesRequest() {
  return {
    type: types.FETCH_PROFILES_REQUEST
  };
}

export function fetchProfilesSuccess(data) {
  return {
    type: types.FETCH_PROFILES_SUCCESS,
    data
  };
}

export function fetchProfilesFailure(error) {
  return {
    type: types.FETCH_PROFILES_FAILURE,
    error
  };
}

export function editProfiles(profiles) {
  return async (dispatch, getState) => {
    dispatch(editProfilesRequest());
    const user = getState().auth.user;
    if (!user) {
      return dispatch({
        type: types.UNAUTHORIZED,
        status: 401
      });
    }
    const { id } = user;
    try {
      const { data } = await api.editProfiles(id, profiles);
      dispatch(editProfilesSuccess(data));
    } catch (error) {
      const message = "Wrong information";
      dispatch(editProfilesFailure(message));
    }
  };
}

export function editProfilesRequest() {
  return {
    type: types.FETCH_PROFILES_REQUEST
  };
}

export function editProfilesSuccess(data) {
  return {
    type: types.FETCH_PROFILES_SUCCESS,
    data
  };
}

export function editProfilesFailure(error) {
  return {
    type: types.FETCH_PROFILES_FAILURE,
    error
  };
}

const api = {
  async fetchProfiles(userId) {
    return fetch.get(`/profiles/${userId}`);
  },
  async editProfiles(userId, profiles) {
    return fetch.post(`/profiles/${userId}`, {
      usernames: profiles
    });
  }
};
