import React, { useEffect } from 'react';
import styles from "./app.module.css";
import AppHeader from "../appHeader/appHeader";
import BurgerIngredients from "../burgerIngredients/burgerIngredients";
import BurgerConstructor from "../burgerConstructor/burgerConstructor";
import { getIngredients } from "../../utils/burger-api";
import { IngredientsConstructorContext, TotalPrice } from "../../services/ingredientsConstructorContext";


function App() {
  const [ingredientsContext, setIngredientsContext] = React.useState({ bun: null, ingredients: [] });
  
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

  const totalPrice = { sum: 0 };
  const reducerPrice = (price, ingredientsContext) => {
    console.log(ingredientsContext);
    };
  const [price, setPrice] = React.useReducer(reducerPrice, totalPrice);
  



  function Main({ data }) {
    if (data !== undefined) {
      return (<main className={styles.appMain}>
        <IngredientsConstructorContext.Provider value={[ingredientsContext, setIngredientsContext]}>
          <TotalPrice.Provider value={[price, setPrice]}>
            <BurgerIngredients parameter={data} />
            <BurgerConstructor />
          </TotalPrice.Provider>
        </IngredientsConstructorContext.Provider>
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

