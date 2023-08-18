import { React, useEffect } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { useDispatch, useSelector } from 'react-redux';
import { getIngredientsData } from '../../services/actions/list-ingredients-actions';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

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
      <DndProvider backend={HTML5Backend}>
        <Main />
      </DndProvider>
    </div>
  );
}

export default App;

