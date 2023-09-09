import {
  OPEN_INGREDIENT, CLOSE_INGREDIENT
} from '../actions/ingredient-details-modal-actions';

export const initialState = {  
  ingredient: [],  
};

export const ingredientDetailsModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_INGREDIENT:      
        return { ...state, ingredient: action.payload }      
    case CLOSE_INGREDIENT:
      return { ...state, ingredient: [] }
    default:
      return state;
  }
};



