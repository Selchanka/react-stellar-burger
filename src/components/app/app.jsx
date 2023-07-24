import React, { useEffect } from 'react';
import styles from "./app.module.css";
import AppHeader from "../appHeader/AppHeader";
import BurgerIngredients from "../burgerIngredients/burgerIngredients";

const url = "https://norma.nomoreparties.space/api/ingredients";

{/* 
Способ запроса данных с сервера, как делала в прошлом проекте
function getResponseData(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status} ${url}`);
}
function getInitialData() {
  return fetch(url)
    .then(res => {
      return getResponseData(res)
    });
}
const [summaryData, setData] = React.useState([]);
  useEffect(() => {
    getInitialData()
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);





    const [state, setState] = React.useState([]);

  useEffect(() => {
    const getProductData = async () => {
      const res = await fetch(url);
      const fin = await res.json();
      setState(fin.data);
    }
    getProductData();                                    console.log(state.data)
  }, []);
*/}

function App() {
{/* вариант сергея
  const [state, setState] = React.useState([]);

  function getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status} ${url}`);
  }

  useEffect(() => {

    const getProductData = () => {
      setState({ ...state, isLoading: true });
      fetch(url)
        .then(res => getResponseData(res))
        .then(data => setState({ data: data.data, isLoading: false, hasError: false }))
        .catch(error => setState({ ...state, hasError: true }))
    }
    getProductData()
  }, [])

*/}

const [state, setState] = React.useState([]);

function getResponseData(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status} ${url}`);
}

React.useEffect(() => {

  const getProductData = () => {
    setState({ ...state, isLoading: true, hasError: false  });
    fetch(url)
      .then(res => getResponseData(res))
      .then(data => setState({ data: data.data, isLoading: false, hasError: false }))
      .catch(e => setState({ ...state, isLoading: false, hasError: true }))
  };

  getProductData()
}, [])



  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.appMain}>
         <BurgerIngredients parameter={state.data} />
         {/*<BurgerConstructor />*/}
      </main>
    </div>
  );
}

export default App;

{/* <Cc parameter={state.data} />
function Cc(a) { console.log(a); return null};
*/}