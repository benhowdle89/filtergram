import * as types from "./types";
import fetch from "./../etc/fetch";

export const initialState = {
  favourites: [],
  fetching: false,
  error: null
};

export default function favourites(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_FAVOURITES_REQUEST:
      return {
        ...state,
        fetching: true
      };
    case types.FETCH_FAVOURITES_FAILURE:
      const { error: fetchFavouritesError } = action;
      return {
        ...state,
        fetching: false,
        error: fetchFavouritesError
      };
    case types.FETCH_FAVOURITES_SUCCESS:
      const { data: fetchFavouritesData } = action;
      return {
        ...state,
        favourites: fetchFavouritesData,
        fetching: false,
        error: null
      };
    case types.ADD_FAVOURITES_REQUEST:
      return {
        ...state,
        fetching: true
      };
    case types.ADD_FAVOURITES_FAILURE:
      const { error: addFavouritesError } = action;
      return {
        ...state,
        fetching: false,
        error: addFavouritesError
      };
    case types.ADD_FAVOURITES_SUCCESS:
      const { data: addFavouritesData } = action;
      return {
        ...state,
        favourites: [...state.favourites, ...addFavouritesData],
        fetching: false,
        error: null
      };
    case types.REMOVE_FAVOURITES_REQUEST:
      return {
        ...state,
        fetching: true
      };
    case types.REMOVE_FAVOURITES_FAILURE:
      const { error: removeFavouritesError } = action;
      return {
        ...state,
        fetching: false,
        error: removeFavouritesError
      };
    case types.REMOVE_FAVOURITES_SUCCESS:
      const { data: removeFavouritesData } = action;
      return {
        ...state,
        favourites: [
          ...state.favourites.filter(
            f => f.instagram_url_id !== removeFavouritesData.instagram_url_id
          )
        ],
        fetching: false,
        error: null
      };
    case types.LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export function fetchFavourites() {
  return async (dispatch, getState) => {
    dispatch(fetchFavouritesRequest());
    const {
      user: { id }
    } = getState().auth;
    try {
      const { data } = await api.fetchFavourites(id);
      dispatch(fetchFavouritesSuccess(data));
    } catch (error) {
      const message = "Error fetching favourites";
      dispatch(fetchFavouritesFailure(message));
    }
  };
}

export function fetchFavouritesRequest() {
  return {
    type: types.FETCH_FAVOURITES_REQUEST
  };
}

export function fetchFavouritesSuccess(data) {
  return {
    type: types.FETCH_FAVOURITES_SUCCESS,
    data
  };
}

export function fetchFavouritesFailure(error) {
  return {
    type: types.FETCH_FAVOURITES_FAILURE,
    error
  };
}

export function addFavourites(item) {
  return async (dispatch, getState) => {
    dispatch(addFavouritesRequest());
    const {
      user: { id }
    } = getState().auth;
    try {
      const { data } = await api.addFavourites(id, item);
      dispatch(addFavouritesSuccess(data));
    } catch (error) {
      const message = "Error adding favourite";
      dispatch(addFavouritesFailure(message));
    }
  };
}

export function addFavouritesRequest() {
  return {
    type: types.ADD_FAVOURITES_REQUEST
  };
}

export function addFavouritesSuccess(data) {
  return {
    type: types.ADD_FAVOURITES_SUCCESS,
    data
  };
}

export function addFavouritesFailure(error) {
  return {
    type: types.ADD_FAVOURITES_FAILURE,
    error
  };
}

export function removeFavourites(instagram_url_id) {
  return async (dispatch, getState) => {
    dispatch(removeFavouritesRequest());
    const {
      user: { id }
    } = getState().auth;
    try {
      const { data } = await api.removeFavourites(id, instagram_url_id);
      dispatch(removeFavouritesSuccess(data));
    } catch (error) {
      const message = "Error removing favourite";
      dispatch(removeFavouritesFailure(message));
    }
  };
}

export function removeFavouritesRequest() {
  return {
    type: types.REMOVE_FAVOURITES_REQUEST
  };
}

export function removeFavouritesSuccess(data) {
  return {
    type: types.REMOVE_FAVOURITES_SUCCESS,
    data
  };
}

export function removeFavouritesFailure(error) {
  return {
    type: types.REMOVE_FAVOURITES_FAILURE,
    error
  };
}

const api = {
  async fetchFavourites(userId) {
    return fetch.get(`/favourites/${userId}`);
  },
  async addFavourites(userId, item) {
    return fetch.post(`/favourites/${userId}`, {
      item
    });
  },
  async removeFavourites(userId, instagram_url_id) {
    return fetch.delete(`/favourites/${userId}/${instagram_url_id}`);
  }
};
