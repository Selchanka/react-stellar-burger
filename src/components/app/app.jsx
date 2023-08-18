import {React, useEffect} from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { useDispatch, useSelector } from 'react-redux';
import { getIngredientsData } from '../../services/actions/list-ingredients-actions';

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

