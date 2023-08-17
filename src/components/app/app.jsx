import {React, useEffect} from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

import { IngredientsConstructorContext, TotalPrice } from "../../services/ingredients-constructor-context";
import { generateUuid } from '@packageforge/uuid';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredientsData } from '../../services/actions/list-ingredients-actions';

import { getIngredients } from "../../utils/burger-api";

function App() {

  const dispatch = useDispatch();
  useEffect(() => { dispatch(getIngredientsData()); }, []);
  const data = useSelector((store) => store.listIngredients);
  
  function Main() {
    if (data !== undefined) {
      return (<main className={styles.appMain}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>);
    }
    else { return null; }
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <Main />
    </div>
  );
}

export default App;

{/*
  function handleClickIngredientMenu(evt, ingredient) {
    const key = generateUuid();
    setIngredientsDispatcher({ type: 'add', payload: { ...ingredient, uuid: key } });
    setPriceDispatcher({ type: 'change', payload: { ...ingredient, uuid: key } });
  };

  function handleClickDeleteIngredient(evt, ingredient) {
    setIngredientsDispatcher({ type: 'delete', payload: ingredient });
    setPriceDispatcher({ type: 'change', payload: ingredient });
  };

  function handleClickClearConstructor() {
    setIngredientsDispatcher({ type: 'clear' });
    setPriceDispatcher({ type: 'change' });
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
      case "clear":
        return { ...state, bun: null, ingredients: [] }
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
            <BurgerConstructor handleClickDeleteIngredient={handleClickDeleteIngredient} handleClickClearConstructor={handleClickClearConstructor}/>
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
*/}
