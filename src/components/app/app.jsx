import React, { useEffect } from 'react';
import styles from "./app.module.css";
import AppHeader from "../appHeader/appHeader";
import BurgerIngredients from "../burgerIngredients/burgerIngredients";
import BurgerConstructor from "../burgerConstructor/burgerConstructor";
const url = "https://norma.nomoreparties.space/api/ingredients";


function App() {

  const [state, setState] = React.useState([]);

  function getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status} ${url}`);
  }
  
  useEffect(() => {
    const getProductData = () => {
      setState({ ...state, isLoading: true, hasError: false });
      fetch(url)
        .then(res => getResponseData(res))
        .then(data => setState({ ...state, data: data.data, isLoading: false, hasError: false }))
        .catch(evt => setState({ ...state, isLoading: false, hasError: true }))
    };
    getProductData()
  }, [])

  function Main({ data }) {
    if (data !== undefined) {
      { console.log(data) }
      return (<main className={styles.appMain}>
        <BurgerIngredients parameter={data} />
        <BurgerConstructor />
      </main>);
    }
    else { return null; }
  }

  return (
    <div className={styles.app}>
      <AppHeader /> 
      <Main data={state.data} />
    </div>
  );
}

export default App;


