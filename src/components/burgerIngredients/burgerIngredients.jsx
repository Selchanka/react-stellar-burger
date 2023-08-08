import React, { useContext, useEffect, useReducer } from "react";
import styles from "./burgerIngredients.module.css";
import { Tab, Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredientDetails/ingredientDetails";
import { ingredientPropType } from "../../utils/prop-types.js";
import PropTypes from "prop-types";
import { IngredientsConstructorContext } from "../../services/ingredientsConstructorContext";

function BurgerIngredients({parameter,handleClickIngredientMenu}) {  
  
  const [element, setDataModal] = React.useState([]);
  const [isModal, setModal] = React.useState(false);
  const onClose = () => setModal(false);
 
  function BlockTab() {
    const [current, setCurrent] = React.useState('bun')
    return (
      <div className={`${styles.blocktab} mb-10`}>
        <Tab value="bun" active={current === "bun"} onClick={setCurrent}>Булки</Tab>
        <Tab value="sauce" active={current === "sauce"} onClick={setCurrent}>Соусы</Tab>
        <Tab value="main" active={current === "main"} onClick={setCurrent}>Начинки</Tab>
      </div>
    )
  }

  function BlockMenu({ title, type, parament }) {
    return (
      <div className={`mb-10`}>
        <h2 className={`mb-6 text text_type_main-medium`} >{title}</h2>
        <ul className={`${styles.elements} ml-4 mr-4`}>
          {parament.map((ingredient) => {
            if (ingredient.type === type) {
              return (
                <li className={styles.element} key={ingredient['_id']} data={ingredient}
                onClick={(evt) =>  handleClickIngredientMenu(evt, ingredient)}>
                  <img className={styles.image} src={ingredient.image} alt="Фото ингредиента" />
                  <div className={styles.counter} style={{ display: "none" }}>
                    <Counter count={1} size="default" extraClass={`m-1`} /></div>
                  <p className={`${styles.names} text text_type_main-small`}>{ingredient.name}</p>
                  <div className={styles.blockPrice}>
                    <p className={`${styles.prices} text text_type_main-medium`}>{ingredient.price}</p>
                    <div className={styles.currencyIcon}> <CurrencyIcon type="primary" /></div>
                  </div>
                </li>
              );
            }
          })}
        </ul>
      </div>
    )
  }

  return (
    <section className={styles.section}>
      <h1 className={`mt-10 mb-5 text text_type_main-large`}>Соберите бургер</h1>
      <BlockTab />
      <div className={`${styles.menu} custom-scroll `} >
        <BlockMenu title="Булки" type="bun" parament={parameter} />
        <BlockMenu title="Соусы" type="sauce" parament={parameter} />
        <BlockMenu title="Начинки" type="main" parament={parameter} />
      </div>

      {isModal && (<Modal onClose={onClose}><IngredientDetails data={element} /></Modal>)}

    </section>
  );

}

export default BurgerIngredients;

BurgerIngredients.propTypes = { parameter: PropTypes.arrayOf(ingredientPropType.isRequired,) };


{/* 
function BurgerIngredients(data, handleClickIngredientMenu) {

  

  const [element, setDataModal] = React.useState([]);
  const [isModal, setModal] = React.useState(false);
  const onClose = () => setModal(false);

  function BlockTab() {
    const [current, setCurrent] = React.useState('bun')
    return (
      <div className={`${styles.blocktab} mb-10`}>
        <Tab value="bun" active={current === "bun"} onClick={setCurrent}>Булки</Tab>
        <Tab value="sauce" active={current === "sauce"} onClick={setCurrent}>Соусы</Tab>
        <Tab value="main" active={current === "main"} onClick={setCurrent}>Начинки</Tab>
      </div>
    )
  }

  function BlockMenu({ title, type, parament }) {
    return (
      <div className={`mb-10`}>
        <h2 className={`mb-6 text text_type_main-medium`} >{title}</h2>
        <ul className={`${styles.elements} ml-4 mr-4`}>
          {parament.map((ingredient) => {
            if (ingredient.type === type) {
              return (
                <li className={styles.element} key={ingredient['_id']}                 

               onClick={(e) =>  handleMenuClick(e, ingredient['name'], ingredient['image_large'], ingredient['calories'],
              ingredient['proteins'], ingredient['fat'], ingredient['carbohydrates'])}                
                
                >
                  <img className={styles.image} src={ingredient.image} alt="Фото ингредиента" />
                  <div className={styles.counter}  style={{ display: "none" }}>
                  <Counter count={1} size="default" extraClass={`m-1`} /></div>
                  <p className={`${styles.names} text text_type_main-small`}>{ingredient.name}</p>
                  <div className={styles.blockPrice}>
                    <p className={`${styles.prices} text text_type_main-medium`}>{ingredient.price}</p>
                    <div className={styles.currencyIcon}> <CurrencyIcon type="primary" /></div>
                  </div>
                </li>
              );
            }
          })}
        </ul>
      </div>
    )
  }  

  const handleMenuClick = (e, name, image_large, calories, proteins, fat, carbohydrates) => {       
    setDataModal({ ...element, name, image_large, calories, proteins, fat, carbohydrates });   
    setModal(true);    
  }; 

  return (
    <section className={styles.section}>
      <h1 className={`mt-10 mb-5 text text_type_main-large`}>Соберите бургер</h1>
      <BlockTab />
      <div className={`${styles.menu} custom-scroll `} >
        <BlockMenu title="Булки" type="bun" parament={data.parameter} />
        <BlockMenu title="Соусы" type="sauce" parament={data.parameter} />
        <BlockMenu title="Начинки" type="main" parament={data.parameter} />
      </div>

      {isModal && (<Modal onClose={onClose}><IngredientDetails data={element} /></Modal>)}

    </section>
  );
 
}

export default BurgerIngredients;

BurgerIngredients.propTypes = {data: PropTypes.arrayOf(ingredientPropType.isRequired,)};
*/}

