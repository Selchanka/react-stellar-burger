import { getIngredients } from "../../utils/burger-api";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export function getIngredientsData() {
  return function (dispatch) {   
    dispatch({ type: GET_INGREDIENTS_REQUEST, });
    getIngredients()
      .then((res) => { 
        res.success && dispatch({ type: GET_INGREDIENTS_SUCCESS, items: res.data, })        
      })
      .catch(() => { dispatch({ type: GET_INGREDIENTS_FAILED, }); });  
  };
}

