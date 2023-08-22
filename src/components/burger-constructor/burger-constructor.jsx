import React from "react";
import styles from "./burger-constructor.module.css";
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useDispatch, useSelector } from 'react-redux';
import {  CLEAR_INGREDIENTS, ADD_PRICE, ADD_INGREDIENTS, COUNT_INGREDIENTS, MOVE_INGREDIENTS } from '../../services/actions/list-ingredients-constructor-actions';
import { addDataOrder } from '../../services/actions/order-actions';
import { useDrop } from "react-dnd";
import { generateUuid } from '@packageforge/uuid';
import ElementFilling from "./element-filling/element-filling";

function BurgerConstructor() {
  const { bun, ingredients, price } = useSelector(store => store.listIngredientsConstructor)

  const dispatch = useDispatch();

  const handleClickClearConstructor = () => {
    dispatch({ type: CLEAR_INGREDIENTS });
  };

  const addIngredient = (ingredient) => {
    const key = generateUuid();
    dispatch({ type: ADD_INGREDIENTS, payload: { ...ingredient, uuid: key } });
    dispatch({ type: ADD_PRICE, payload: { ...ingredient } });
    dispatch({ type: COUNT_INGREDIENTS });
  };

  const [{ isHover }, dropTarget] = useDrop({
    accept: "animal",
    drop(data) {
      addIngredient(data);
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    }),
  });
  const borderColor = isHover ? 'lightgreen' : 'transparent';

  const [isModal, setModal] = React.useState(false);

  function onClose() {
    handleClickClearConstructor();
    setModal(false);
  }

  const addOrder = (order) => {
    dispatch(addDataOrder(order));
    setModal(true);
  };

  function openModalOrderDetails() {
    let newOrder = [];
    ingredients && (
      ingredients.map((ingredient) => { newOrder.push(ingredient._id); }));
    bun && (newOrder.push(bun._id));
    bun && (newOrder.unshift(bun._id));
    addOrder({ ingredients: newOrder });
  }

  function StateButton() {
    if (bun !== null) {
      return (<Button htmlType="button" type="primary" size="large" onClick={openModalOrderDetails}>Оформить заказ</Button>)
    }
    else {
      return (<Button htmlType="button" type="primary" size="large" disabled={true} >Оформить заказ</Button>)
    }
  }
  
  const moveIngredients =(dragIndex, hoverIndex) => { 
    const dragCard = ingredients[dragIndex]; 
    const newCards = [...ingredients]; 
    newCards.splice(dragIndex, 1 ); 
    newCards.splice(hoverIndex, 0, dragCard); 
    dispatch({ type: MOVE_INGREDIENTS, payload:newCards }); 
  }


  return (
    <section className={styles.section}>
      <ul className={`${styles.ingrediensList} mt-25 mb-10 ml-4`} ref={dropTarget} style={{ borderColor }}>
        {bun &&
          (<li className={`${styles.ingrediens} ml-8`}>
            <ConstructorElement type="top" isLocked={true} text={`${bun.name} (вверх)`} price={bun.price}
              thumbnail={bun.image_mobile} />
          </li>)
        }

        <ul className={`${styles.filling} custom-scroll`}>
         {(ingredients.length > 0) && 
         ingredients.map((item, index) => (<ElementFilling key={item.uuid} index={index} id={item.id} item={item} moveIngredients={moveIngredients} />))
         }
        </ul>
       
        {bun &&
          (<li className={`${styles.ingrediens} ml-8`}>
            <ConstructorElement type="bottom" isLocked={true} text={`${bun.name} (низ)`} price={bun.price}
              thumbnail={bun.image_mobile} />
          </li>)
        }
      </ul>
      <div className={`${styles.finish} mr-4 ml-4`} id="modal">
        <p className={`${styles.price} text text_type_main-large`}>{price}</p>
        <div className={`mr-10 ml-3`}> <CurrencyIcon type="primary" /></div>
        <StateButton />
      </div>
      {isModal && (<Modal onClose={onClose}>
        <OrderDetails />
      </Modal>)}
    </section>
  );
}

export default BurgerConstructor;


