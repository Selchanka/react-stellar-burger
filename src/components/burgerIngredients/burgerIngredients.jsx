import React from "react";
import styles from "./burgerIngredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";


function BurgerIngredients(data) {

  function BlockTab() {
    const [current, setCurrent] = React.useState('one')
    return (
      <div className={`${styles.blocktab} mb-10`}>
        <Tab value="one" active={current === 'one'} onClick={setCurrent}>Булки</Tab>
        <Tab value="two" active={current === 'two'} onClick={setCurrent}>Соусы</Tab>
        <Tab value="three" active={current === 'three'} onClick={setCurrent}>Начинки</Tab>
      </div>
    )
  }

  function BlockMenu({ title, type, paramemt }) {
    
    return (
      <div className={`mb-10`}>
        <h2 className={`mb-6 text text_type_main-medium`} >{title}</h2>
        <div className={styles.elements}>

          <div className={styles.element}>
            <img className={styles.image} src={paramemt.parameter[0].image} alt="Фото ингредиента" />
            <p className={`text text_type_main-medium`}>{paramemt.parameter[0].name}</p>
          </div>

        </div>
      </div>
    )
  }

  return (
    <section className={styles.section}>
      <h1 className={`mt-10 mb-5 text text_type_main-large`}>Соберите бургер</h1>
      <BlockTab />
      <div className={styles.menu}>
        <BlockMenu title="Булки" type="bun" paramemt={data} />
        <BlockMenu title="Соусы" type="sauce" paramemt={data} />
        <BlockMenu title="Начинки" type="main" paramemt={data} />
      </div>
    </section>
  );
}

export default BurgerIngredients;


{/*
 console.log({ state });
console.log({title}, {type}, {data});

*/}