import React, { useCallback, useState, useRef } from "react";
import styles from "./burger-filling.module.css";

import update from 'immutability-helper'

import  Card  from "../card/card"

function BurgerFilling({ingredients}) {
  const [cards, setCards] = useState([ingredients]);
  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setCards((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      }),
    )
  }, [])
  const renderCard = useCallback((item, index) => { 
    return ( 
      <Card
        key={item.uuid}
        index={index}
        id={item.id}
        item={item}
        moveCard={moveCard}
      />
    )
  }, [])   
 

return (<>
  {ingredients.map((item, i) => {renderCard(item, i)})}
  </>
)
}

export default BurgerFilling;






{/*

function BurgerFilling() {

  const IngredientsConstructor = (store) => {
    return {
      bun: store.listIngredientsConstructor.bun,
      ingredients: store.listIngredientsConstructor.ingredients,
      price: store.listIngredientsConstructor.price,
    }
  }
  const setIngredientsList = useSelector(IngredientsConstructor);
  const dispatch = useDispatch();
  const handleClickDeleteIngredient = (evt, ingredient) => {
    dispatch({ type: DELETE_INGREDIENTS, payload: ingredient });
    dispatch({ type: ADD_PRICE, payload: { ...ingredient } });
    dispatch({ type: COUNT_INGREDIENTS });
  };


  function AddIngredientBurger(parameter) {
    const ingredient = parameter.parameter.ingredients;
    if (ingredient.length > 0) {
      return (ingredient.map((item) => {
        return (
          <li className={styles.ingrediens} key={item.uuid}>
            <div className={styles.drag}><DragIcon type="primary" /></div>
            <ConstructorElement text={item.name}
              price={item.price}
              thumbnail={item.image_mobile}
              handleClose={(evt) => handleClickDeleteIngredient(evt, item)}
            />
          </li>
        )
      }))
    }
    else { return null; }
  }


  return (
    <>
      <ul className={`${styles.filling} custom-scroll`}>
        <AddIngredientBurger parameter={setIngredientsList} />
      </ul>
    </>
  );
}


export default BurgerFilling;

*/}