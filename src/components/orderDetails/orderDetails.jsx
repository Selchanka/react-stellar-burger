import React from "react";
import styles from "./orderDetails.module.css";
import ImgCheck from "../../image/graphics.svg";

function OrderDetails() {
  return (
    <div className={`${styles.modalconstructor}`}>
      <h1 className={`${styles.modaltitle} text text_type_digits-large mt-30 mb-8`}>034536</h1>
      <p className={`text text_type_main-medium mb-15`}>идентификатор заказа</p>
      <img src={ImgCheck} alt="Check" />
      <p className={`text text_type_main-small mt-15 mb-2`}>Ваш заказ начали готовить</p>
      <p className={`text text_type_main-default text_color_inactive mb-30`}>Дождитесь готовности на орбитальной станции</p>
    </div>

  );
}
export default OrderDetails;


