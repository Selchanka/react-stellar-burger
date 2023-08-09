import React, { useContext, useEffect, useReducer } from 'react';
import styles from "./app.module.css";
import AppHeader from "../appHeader/appHeader";
import BurgerIngredients from "../burgerIngredients/burgerIngredients";
import BurgerConstructor from "../burgerConstructor/burgerConstructor";
import { getIngredients } from "../../utils/burger-api";
import { IngredientsConstructorContext, TotalPrice } from "../../services/ingredientsConstructorContext";
import { generateUuid, uuidsEqual, extractUuid } from '@packageforge/uuid';


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


  function handleClickIngredientMenu(evt, ingredient) {   
    const key = generateUuid();
    setIngredientsDispatcher({ type: 'add', payload: {...ingredient, uuid: key} });
    setPriceDispatcher({ type: 'change', payload: {...ingredient, uuid: key} });
  };

  function handleClickDeleteIngredient(evt, ingredient) {
    setIngredientsDispatcher({ type: 'delete', payload: ingredient });
    setPriceDispatcher({ type: 'change', payload: ingredient });
  };

  function constructorReducer(state, action) {
    switch (action.type) {
      case "add":
        if (action.payload.type === "bun") { return { ...state, bun: action.payload } }
        else {
          return { ...state, ingredients: [...state.ingredients, action.payload] }
        };
      case "delete":
        const newSpisokIngredients = state.ingredients.filter(item => item.uuid !== action.payload.uuid);
        return { ...state, ingredients: newSpisokIngredients }
      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    };
  };

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

  const [ingredientsContext, setIngredientsDispatcher] = React.useReducer(constructorReducer, { bun: null, ingredients: [] });
  const [priceContext, setPriceDispatcher] = React.useReducer(priceReducer, { sum: 0 });

  

  function Main({ data }) {
    if (data !== undefined) {
      return (<main className={styles.appMain}>
        <IngredientsConstructorContext.Provider value={[ingredientsContext, setIngredientsDispatcher]}>
          <TotalPrice.Provider value={[priceContext, setPriceDispatcher]}>
            <BurgerIngredients parameter={data} handleClickIngredientMenu={handleClickIngredientMenu} />
            <BurgerConstructor handleClickDeleteIngredient={handleClickDeleteIngredient} />
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

