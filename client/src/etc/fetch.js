import axios from "axios";
import store from "./configure-store";
import * as types from "./../modules/types";

const API_URL = process.env.REACT_APP_API_URL;

const instance = axios.create({
  baseURL: `${API_URL}/api`,
  headers: { "Content-Type": "application/json" }
});

instance.interceptors.request.use(config => {
  const headers = {
    ...config.headers
  };
  const { token } = store.getState().auth;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return {
    ...config,
    headers
  };
});

instance.interceptors.response.use(
  response => response,
  error => {
    if (!error.response) return Promise.reject(error);
    const { status, data } = error.response;
    if (status === 401) {
      store.dispatch({
        type: types.UNAUTHORIZED,
        status,
        data
      });
    }
    if (status === 500) {
      return Promise.reject(error.response.data.error);
    }
    return Promise.reject(error.response);
  }
);

export default instance;
