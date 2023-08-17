import {
  ADD_INGREDIENTS, DELETE_INGREDIENTS, CLEAR_INGREDIENTS, ADD_PRICE
} from '../actions/list-ingredients-constructor-actions';
import { PriceFinish } from '../../components/price/price';

export const initialState = {
  bun: null,
  ingredients: [],
  price: 0,
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
      return { ...state, bun: null, ingredients: [] }
    case ADD_PRICE:
      return { ...state, price: PriceFinish(state) }
    default:
      return state;
  }
};

{/*


  function priceReducer(state, action) {
    switch (action.type) {
      case "change":
        {
          let newSum = 0;
          ingredientsContext.bun && (newSum = ingredientsContext.bun.price)
          ingredientsContext.ingredients && (
            ingredientsContext.ingredients.map((ingredient) => { newSum = newSum + ingredient.price })
          )
          return { ...state, sum: newSum }
        }
      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    };
  };

*/}