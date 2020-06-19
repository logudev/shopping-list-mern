import axios from "axios";
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, LOADING_ITEMS } from "../constants";

export const getItems = () => async (dispatch) => {
  dispatch(loadingItems(true));
  const response = await axios.get("/api/items");
  dispatch({
    type: GET_ITEMS,
    payload: response.data.data,
  });
  dispatch(loadingItems(false));
};

export const deleteItem = (id) => async (dispatch) => {
  dispatch(loadingItems(true));
  await axios.delete(`/api/items/${id}`);
  dispatch({
    type: DELETE_ITEM,
    payload: id,
  });
  dispatch(loadingItems(false));
};

export const addItem = (item) => async (dispatch) => {
  dispatch(loadingItems(true));
  const response = await axios.post(`/api/items`, item, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  item._id = response.data.data._id;
  dispatch({
    type: ADD_ITEM,
    payload: item,
  });
  dispatch(loadingItems(false));
};

export const loadingItems = (loading) => {
  return {
    type: LOADING_ITEMS,
    payload: loading,
  };
};
