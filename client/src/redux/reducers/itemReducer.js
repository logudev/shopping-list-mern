import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, LOADING_ITEMS } from "../constants";

const initialState = {
  items: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS: {
      return { ...state, items: action.payload };
    }
    case ADD_ITEM: {
      return {
        ...state,
        items: [action.payload, ...state.items],
      };
    }
    case DELETE_ITEM: {
      return {
        ...state,
        items: state.items.filter((it) => it._id !== action.payload),
      };
    }
    case LOADING_ITEMS: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    default:
      return state;
  }
}
