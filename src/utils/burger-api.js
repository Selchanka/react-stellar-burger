import {url} from "./constants";

function getResponseData(res) {
   if (res.ok) {
      return res.json();
   }
   return Promise.reject(`Ошибка: ${res.status} ${url}`);
}


export function getIngredients() {
   return fetch(url)
      .then(res => getResponseData(res))
}

