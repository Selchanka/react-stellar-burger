import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
} from '../actions/list-ingredients-actions';

export const initialState = {
  data: [],
  isLoading: false,
  hasError: false,
};

export const listIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST:
      return { ...state, isLoading: true, hasError: false };
    case GET_INGREDIENTS_SUCCESS:
      return { ...state, data: action.items, isLoading: false, hasError: false };
    case GET_INGREDIENTS_FAILED:
      return { ...state, isLoading: false, hasError: true };
    default:
      return state;
  }
};



