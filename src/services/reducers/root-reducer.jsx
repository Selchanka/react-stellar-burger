import { combineReducers } from "redux";
import { listIngredientsReducer } from "./list-ingredients-reducer";
import { listIngredientsConstructorReducer } from "./list-ingredients-constructor-reducer";
import { ingredientDetailsModalReducer } from "./ingredient-details-modal-reducer";
import { orderReducer } from "./order-reducer";

export const rootReducer = combineReducers({
  listIngredients: listIngredientsReducer,
  listIngredientsConstructor: listIngredientsConstructorReducer,
  ingredientDetailsModal: ingredientDetailsModalReducer,
  order: orderReducer,
});


