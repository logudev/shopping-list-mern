import axios from "axios";
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CLEAR_ERRORS,
} from "../constants";
import { returnErrors } from "./errorActions";

export const registerUser = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ name, email, password });
  try {
    const response = await axios.post("/api/users", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: {
        token: response.data.token,
        user: response.data.data,
      },
    });
    dispatch({ type: CLEAR_ERRORS });
  } catch (err) {
    dispatch({ type: REGISTER_FAIL });
    dispatch(
      returnErrors(
        err.response.data.message,
        err.response.status,
        "REGISTER_FAIL"
      )
    );
  }
};

export const loginUser = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const response = await axios.post("/api/auth", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        token: response.data.token,
        user: response.data.data,
      },
    });
    dispatch({ type: CLEAR_ERRORS });
  } catch (err) {
    dispatch({ type: LOGIN_FAIL });
    dispatch(
      returnErrors(err.response.data.message, err.response.status, "LOGIN_FAIL")
    );
  }
};

export const logoutUser = () => ({ type: LOGOUT_SUCCESS });

export const loadingUser = () => ({ type: USER_LOADING });

// Check token and load user
export const loadUser = () => async (dispatch, getState) => {
  // User loading
  dispatch(loadingUser());

  try {
    const response = await axios.get(
      "/api/auth/user",
      getTokenConfig(getState)
    );
    dispatch({
      type: USER_LOADED,
      payload: response.data.data,
    });
  } catch (err) {
    dispatch(returnErrors(err.response.data.message, err.response.status));
    dispatch({ type: AUTH_ERROR });
  }
};

// Setup config / headers and token
export const getTokenConfig = (getState) => {
  // Get token from state(which got it from localStorage)
  const token = getState().auth.token;

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};
