import React, { useCallback, useState, useRef } from "react";
import styles from "./card.module.css";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from 'react-dnd'
import { DELETE_INGREDIENTS, CLEAR_INGREDIENTS, ADD_PRICE, ADD_INGREDIENTS, COUNT_INGREDIENTS } from '../../../services/actions/list-ingredients-constructor-actions';
import { useDrop } from "react-dnd";
import update from 'immutability-helper'
import { generateUuid } from '@packageforge/uuid';


function Card({ id, index, moveCard, item }) {                                 {console.log(item)}


  const ItemTypes = {CARD: 'card', }
  const ref = useRef(null)
  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
   
      if (dragIndex === hoverIndex) {
        return
      }
     
      const hoverBoundingRect = ref.current?.getBoundingClientRect()      
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      
      const clientOffset = monitor.getClientOffset()      
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
 
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }      
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
     
      moveCard(dragIndex, hoverIndex)  
      item.index = hoverIndex
    },
  })
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0 : 1
  drag(drop(ref))





  return ( 
    <li className={styles.ingrediens} key={item.uuid} 
    ref={ref} style={{ opacity }}  >
      <div className={styles.drag}><DragIcon type="primary" /></div>                  { console.log("kyky")}
      <ConstructorElement text={item.name}
        price={item.price}
        thumbnail={item.image_mobile}
        
      /> 
    </li>
  );
}


export default Card;





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