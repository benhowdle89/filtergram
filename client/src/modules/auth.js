import * as types from "./types";
import fetch from "./../etc/fetch";

export const initialState = {
  token: null,
  user: null,
  forms: {
    usernamePassword: {
      fetching: false,
      error: null
    },
    signUp: {
      fetching: false,
      error: null
    }
  }
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_USERNAME_PASSWORD_REQUEST:
      return {
        ...state,
        forms: {
          ...state.forms,
          usernamePassword: {
            ...state.forms.usernamePassword,
            fetching: true
          }
        }
      };
    case types.LOGIN_USERNAME_PASSWORD_FAILURE:
      const { error: loginUsernamePasswordError } = action;
      return {
        ...state,
        forms: {
          ...state.forms,
          usernamePassword: {
            ...state.forms.usernamePassword,
            fetching: false,
            error: loginUsernamePasswordError
          }
        }
      };
    case types.LOGIN_USERNAME_PASSWORD_SUCCESS:
      const { data: loginUsernamePasswordData } = action;
      return {
        ...state,
        user: loginUsernamePasswordData.user,
        token: loginUsernamePasswordData.token,
        forms: {
          ...state.forms,
          usernamePassword: {
            ...state.forms.usernamePassword,
            fetching: false,
            error: null
          }
        }
      };
    case types.SIGN_UP_REQUEST:
      return {
        ...state,
        forms: {
          ...state.forms,
          signUp: {
            ...state.forms.signUp,
            fetching: true
          }
        }
      };
    case types.SIGN_UP_FAILURE:
      const { error: signUpError } = action;
      return {
        ...state,
        forms: {
          ...state.forms,
          signUp: {
            ...state.forms.signUp,
            fetching: false,
            error: signUpError
          }
        }
      };
    case types.SIGN_UP_SUCCESS:
      const { data: signUpData } = action;
      return {
        ...state,
        user: signUpData.user,
        token: signUpData.token,
        forms: {
          ...state.forms,
          signUp: {
            ...state.forms.signUp,
            fetching: false,
            error: null
          }
        }
      };
    case types.LOGOUT:
    case types.UNAUTHORIZED:
      return initialState;
    default:
      return state;
  }
}

export function logout() {
  return {
    type: types.LOGOUT
  };
}

export function loginUsernamePassword(email, password) {
  return async dispatch => {
    dispatch(loginUsernamePasswordRequest());
    try {
      const { data } = await api.loginUsernamePassword(email, password);
      dispatch(loginUsernamePasswordSuccess(data));
    } catch (error) {
      const message = "User not found";
      dispatch(loginUsernamePasswordFailure(message));
    }
  };
}

export function loginUsernamePasswordRequest() {
  return {
    type: types.LOGIN_USERNAME_PASSWORD_REQUEST
  };
}

export function loginUsernamePasswordSuccess(data) {
  return {
    type: types.LOGIN_USERNAME_PASSWORD_SUCCESS,
    data
  };
}

export function loginUsernamePasswordFailure(error) {
  return {
    type: types.LOGIN_USERNAME_PASSWORD_FAILURE,
    error
  };
}

export function signUp(email, password) {
  return async dispatch => {
    dispatch(signUpRequest());
    try {
      const { data } = await api.signUp(email, password);
      dispatch(signUpSuccess(data));
    } catch (error) {
      const message = "User already exists";
      dispatch(signUpFailure(message));
    }
  };
}

export function signUpRequest() {
  return {
    type: types.SIGN_UP_REQUEST
  };
}

export function signUpSuccess(data) {
  return {
    type: types.SIGN_UP_SUCCESS,
    data
  };
}

export function signUpFailure(error) {
  return {
    type: types.SIGN_UP_FAILURE,
    error
  };
}

export const api = {
  async loginUsernamePassword(email, password) {
    return fetch.post("/users/login", {
      email,
      password
    });
  },
  async signUp(email, password) {
    return fetch.post("/users", {
      email,
      password
    });
  }
};
