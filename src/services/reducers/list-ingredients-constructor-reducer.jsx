import {
  ADD_INGREDIENTS, DELETE_INGREDIENTS, CLEAR_INGREDIENTS, ADD_PRICE, COUNT_INGREDIENTS, MOVE_INGREDIENTS
} from '../actions/list-ingredients-constructor-actions';
import { priceFinish } from '../../components/price/price';
import { countIngredients } from '../../components/count-ingredients/count-ingredients';

export const initialState = {
  bun: null,
  ingredients: [],
  price: 0,
  count: 0,
};

export const listIngredientsConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENTS:
      if (action.payload.type === "bun") {
        return { ...state, bun: action.payload }
      }
      else {
        return { ...state, ingredients: [...state.ingredients, action.payload] }
      };
    case DELETE_INGREDIENTS:
      const newSpisokIngredients = state.ingredients.filter(item => item.uuid !== action.payload.uuid);
      return { ...state, ingredients: newSpisokIngredients }
    case CLEAR_INGREDIENTS:
      return { ...state, bun: null, ingredients: [], price: 0, count: 0}
    case ADD_PRICE:
      return { ...state, price: priceFinish(state) }
    case COUNT_INGREDIENTS:
      return { ...state, count: countIngredients(state) }
      case MOVE_INGREDIENTS:       
        return { ...state, ingredients: action.payload }
    default:
      return state;
  }
};

