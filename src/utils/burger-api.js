import {url} from "./constants";

function getResponseData(res) {
   if (res.ok) {
      return res.json();
   }
   return Promise.reject(`Ошибка: ${res.status} ${`${url}`}`);
}

export function getIngredients() {
   return fetch(`${url}/ingredients`)
      .then(res => getResponseData(res))
}

export const getOrderDetails = (order) => {   
   return fetch(`${url}/orders`, {
     method: 'POST',
     headers: {
       "Content-Type": "application/json"
     },     
     body: JSON.stringify(order)
   })
   .then(res => getResponseData(res))
 };
