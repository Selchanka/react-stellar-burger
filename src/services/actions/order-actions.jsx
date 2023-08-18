import { getOrderDetails } from "../../utils/burger-api";

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export function addDataOrder(order) {
  return function (dispatch) {   
    dispatch({ type: GET_ORDER_REQUEST, });
    getOrderDetails(order)
      .then((res) => { 
        res.success && dispatch({ type: GET_ORDER_SUCCESS, items: res.order, })        
      })
      .catch(() => { dispatch({ type: GET_ORDER_FAILED, }); });  
  };
}


