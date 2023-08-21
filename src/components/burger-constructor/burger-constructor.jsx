import React from "react";
import styles from "./burger-constructor.module.css";
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import Fillings from "./fillings/fillings"
import { useDispatch, useSelector } from 'react-redux';
import { DELETE_INGREDIENTS, CLEAR_INGREDIENTS, ADD_PRICE, ADD_INGREDIENTS, COUNT_INGREDIENTS } from '../../services/actions/list-ingredients-constructor-actions';
import { addDataOrder } from '../../services/actions/order-actions';
import { useDrop } from "react-dnd";
import { generateUuid } from '@packageforge/uuid';

//import Fillings from "./fillings/fillings"
import BurgerFilling from "./burger-filling/burger-filling"


function BurgerConstructor() {
  const IngredientsConstructor = (store) => {
    return {
      bun: store.listIngredientsConstructor.bun,
      ingredients: store.listIngredientsConstructor.ingredients,
      price: store.listIngredientsConstructor.price,
    }
  }
  const setIngredientsList = useSelector(IngredientsConstructor);

  const dispatch = useDispatch();

  const handleClickClearConstructor = () => {
    dispatch({ type: CLEAR_INGREDIENTS });
  };

  const AddIngredient = (ingredient) => {
    const key = generateUuid();
    dispatch({ type: ADD_INGREDIENTS, payload: { ...ingredient, uuid: key } });
    dispatch({ type: ADD_PRICE, payload: { ...ingredient } });
    dispatch({ type: COUNT_INGREDIENTS });
  };

  const [{ isHover }, dropTarget] = useDrop({
    accept: "animal",
    drop(data) {
      AddIngredient(data);
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

  const AddOrder = (order) => {
    dispatch(addDataOrder(order));
    setModal(true);
  };

  function OpenModalOrderDetails() {
    let newOrder = [];
    setIngredientsList.ingredients && (
      setIngredientsList.ingredients.map((ingredient) => { newOrder.push(ingredient._id); }));
    setIngredientsList.bun && (newOrder.push(setIngredientsList.bun._id));
    setIngredientsList.bun && (newOrder.unshift(setIngredientsList.bun._id));
    AddOrder({ ingredients: newOrder });
  }

  function StateButton() {
    if (setIngredientsList.bun !== null) {
      return (<Button htmlType="button" type="primary" size="large" onClick={OpenModalOrderDetails}>Оформить заказ</Button>)
    }
    else {
      return (<Button htmlType="button" type="primary" size="large" disabled={true} >Оформить заказ</Button>)
    }
  }
  

  return (
    <section className={styles.section}>
      <ul className={`${styles.ingrediensList} mt-25 mb-10 ml-4`} ref={dropTarget} style={{ borderColor }}>
        {setIngredientsList.bun &&
          (<li className={`${styles.ingrediens} ml-8`}>
            <ConstructorElement type="top" isLocked={true} text={`${setIngredientsList.bun.name} (вверх)`} price={setIngredientsList.bun.price}
              thumbnail={setIngredientsList.bun.image_mobile} />
          </li>)
        }
        <ul className={`${styles.filling} custom-scroll`}>
         {(setIngredientsList.ingredients.length > 0) && <BurgerFilling  ingredients={setIngredientsList.ingredients}/>}
        </ul>
        {setIngredientsList.bun &&
          (<li className={`${styles.ingrediens} ml-8`}>
            <ConstructorElement type="bottom" isLocked={true} text={`${setIngredientsList.bun.name} (низ)`} price={setIngredientsList.bun.price}
              thumbnail={setIngredientsList.bun.image_mobile} />
          </li>)
        }
      </ul>
      <div className={`${styles.finish} mr-4 ml-4`} id="modal">
        <p className={`${styles.price} text text_type_main-large`}>{setIngredientsList.price}</p>
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


