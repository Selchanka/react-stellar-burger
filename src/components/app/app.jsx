import React, { useEffect } from 'react';
import styles from "./app.module.css";
import AppHeader from "../appHeader/appHeader";
import BurgerIngredients from "../burgerIngredients/burgerIngredients";
import BurgerConstructor from "../burgerConstructor/burgerConstructor";
import {getIngredients} from "../../utils/burger-api";


function App() {

  const [state, setState] = React.useState([]);
   
  useEffect(() => {
    const getProductData = () => {
      setState({ ...state, isLoading: true, hasError: false });
      getIngredients()
        .then(data => setState({ ...state, data: data.data, isLoading: false, hasError: false }))
        .catch(evt => setState({ ...state, isLoading: false, hasError: true }))
    };
    getProductData()
  }, [])

  function Main({ data }) {
    if (data !== undefined) {      
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

