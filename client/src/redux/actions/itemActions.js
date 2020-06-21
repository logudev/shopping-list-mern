import axios from "axios";
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, LOADING_ITEMS } from "../constants";
import { getTokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getItems = () => async (dispatch) => {
  dispatch(loadingItems(true));
  try {
    const response = await axios.get("/api/items");
    dispatch({
      type: GET_ITEMS,
      payload: response.data.data,
    });
  } catch (err) {
    dispatch(returnErrors(err.response.data.message, err.response.status));
  }
  dispatch(loadingItems(false));
};

export const deleteItem = (id) => async (dispatch, getState) => {
  dispatch(loadingItems(true));
  try {
    await axios.delete(`/api/items/${id}`, getTokenConfig(getState));
    dispatch({
      type: DELETE_ITEM,
      payload: id,
    });
  } catch (err) {
    dispatch(returnErrors(err.response.data.message, err.response.status));
  }

  dispatch(loadingItems(false));
};

// This returns a promise to the caller, so that caller can handle post actions
export const addItem = (item) => (dispatch, getState) => {
  return new Promise(function (resolve, reject) {
    dispatch(loadingItems(true));
    axios
      .post(`/api/items`, item, getTokenConfig(getState))
      .then((response) => {
        item._id = response.data.data._id;
        dispatch({
          type: ADD_ITEM,
          payload: item,
        });
        resolve();
      })
      .catch((err) => {
        dispatch(
          returnErrors(
            err.response.data.message,
            err.response.status,
            "ITEM_ADD_FAIL"
          )
        );
        reject();
      });
    dispatch(loadingItems(false));
  });
};

export const loadingItems = (loading) => {
  return {
    type: LOADING_ITEMS,
    payload: loading,
  };
};
