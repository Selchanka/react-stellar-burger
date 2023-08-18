import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
} from '../actions/order-actions';

export const initialState = {
  number: [],
  isLoading: false,
  hasError: false,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST:
      return { ...state, isLoading: true, hasError: false };
    case GET_ORDER_SUCCESS:
      return { ...state, number: action.items, isLoading: false, hasError: false };
    case GET_ORDER_FAILED:
      return { ...state, isLoading: false, hasError: true };
    default:
      return state;
  }
};


