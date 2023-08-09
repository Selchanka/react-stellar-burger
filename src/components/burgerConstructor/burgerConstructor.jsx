import React, { useContext, useEffect, useReducer } from "react";
import styles from "./burgerConstructor.module.css";
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../orderDetails/orderDetails";
import { IngredientsConstructorContext, TotalPrice, OrderDetail } from "../../services/ingredientsConstructorContext";
import { generateUuid, uuidsEqual, extractUuid } from '@packageforge/uuid';
import { getOrderDetails } from "../../utils/burger-api";

function BurgerConstructor({ handleClickDeleteIngredient }) {
  const [order, setOrder] = React.useState([]);
  const [ingredientsContext, setIngredientsContext] = React.useContext(IngredientsConstructorContext);
  const [price, setPrice] = React.useContext(TotalPrice);

  const [isModal, setModal] = React.useState(false);
  const onClose = () => setModal(false);

  function OpenModalOrderDetails() {
    let newOrder = [];
    ingredientsContext.ingredients && (
      ingredientsContext.ingredients.map((ingredient) => { newOrder.push(ingredient._id); }));
    ingredientsContext.bun && (newOrder.push(ingredientsContext.bun._id));
    ingredientsContext.bun && (newOrder.unshift(ingredientsContext.bun._id));

    getOrderDetails({ ingredients: newOrder })
      .then((res) => {
        setOrder(res);
      })
      .then(() => {
        setModal(true);
      })
      .catch((e) => {
        console.error(e);
      });
  }


  function AddIngredientBurger(parameter) {
    const ingredient = parameter.parameter.ingredients;
    if (ingredient.length > 0) {
      return (ingredient.map((item) => {
        return (
          <li className={styles.ingrediens} key={generateUuid()}>
            <div className={styles.drag}><DragIcon type="primary" /></div>
            <ConstructorElement text={item.name} price={item.price}
              thumbnail={item.image_mobile} handleClose={(evt) => handleClickDeleteIngredient(evt, item)} />
          </li>
        )
      }))
    }
    else { return null; }
  }

  return (
    <section className={styles.section}>

      <ul className={`${styles.ingrediensList} mt-25 mb-10 ml-4`}>
        {ingredientsContext.bun &&
          (<li className={`${styles.ingrediens} ml-8`}>
            <ConstructorElement type="top" isLocked={true} text={`${ingredientsContext.bun.name} (вверх)`} price={ingredientsContext.bun.price}
              thumbnail={ingredientsContext.bun.image_mobile} />
          </li>)
        }
        <ul className={`${styles.filling} custom-scroll`}>
          <AddIngredientBurger parameter={ingredientsContext} />
        </ul>
        {ingredientsContext.bun &&
          (<li className={`${styles.ingrediens} ml-8`}>
            <ConstructorElement type="bottom" isLocked={true} text={`${ingredientsContext.bun.name} (низ)`} price={ingredientsContext.bun.price}
              thumbnail={ingredientsContext.bun.image_mobile} />
          </li>)
        }
      </ul>
      <div className={`${styles.finish} mr-4 ml-4`} id="modal">
        <p className={`${styles.price} text text_type_main-large`}>{price.sum}</p>
        <div className={`mr-10 ml-3`}> <CurrencyIcon type="primary" /></div>
        <Button htmlType="button" type="primary" size="large" onClick={OpenModalOrderDetails}>Оформить заказ</Button>
      </div>
      <OrderDetail.Provider value={[order, setOrder]}>
        {isModal && (<Modal onClose={onClose}><OrderDetails /></Modal>)}
      </OrderDetail.Provider>
    </section>
  );
}

export default BurgerConstructor;

