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
*/}

function App() {

  const [state, setState] = React.useState(null);

  useEffect(() => {
    const getProductData = async () => {
      const res = await fetch(url);
      const fin = await res.json();
      setState(fin.data);
    }
    getProductData();
  }, []);

  function Cc() { console.log(state); return null };


  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.appMain}>
         <BurgerIngredients />
  {/*<BurgerConstructor />*/}
      </main>
      <Cc />
    </div>

  );
}

export default App;

