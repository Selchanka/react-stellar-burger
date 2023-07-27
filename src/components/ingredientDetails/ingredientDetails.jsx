import React from "react";
import styles from "./ingredientDetails.module.css";
import PropTypes from 'prop-types';

function ingredientDetails(data) {
  const element = data.data;
  return (
    <div className={`${styles.modalConstructor}`}>
      <h1 className={`${styles.modalTitle} text text_type_main-large mt-10`}>Детали ингредиента</h1>
      <img src={element.image_large} alt="Ингредиент" />
      <p className={`text text_type_main-medium mb-8 mt-4`}>{element.name}</p>
      <ul className={`${styles.structure} mb-15`}>
        <li className={styles.item}>
          <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
          <p className="text text_type_digits-default text_color_inactive">{element.calories}</p>
        </li>
        <li className={styles.item}>
          <p className="text text_type_main-default text_color_inactive">Белки, г</p>
          <p className="text text_type_digits-default text_color_inactive">{element.proteins}</p>
        </li>
        <li className={styles.item}>
          <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
          <p className="text text_type_digits-default text_color_inactive">{element.fat}</p>
        </li>
        <li className={styles.item}>
          <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
          <p className="text text_type_digits-default text_color_inactive">{element.carbohydrates}</p>
        </li>
      </ul>
    </div>
  );
}

export default ingredientDetails;

ingredientDetails.propTypes = {data: PropTypes.object.isRequired};