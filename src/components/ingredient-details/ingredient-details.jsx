import React from "react";
import styles from "./ingredient-details.module.css";
import { ingredientPropType } from '../../utils/prop-types';

function IngredientDetails({data}) { 
  
  return (
    <div className={`${styles.modalConstructor}`}>
      <h1 className={`${styles.modalTitle} text text_type_main-large mt-10`}>Детали ингредиента</h1>
      <img src={data.image_large} alt="Ингредиент" />
      <p className={`text text_type_main-medium mb-8 mt-4`}>{data.name}</p>
      <ul className={`${styles.structure} mb-15`}>
        <li className={styles.item}>
          <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
          <p className="text text_type_digits-default text_color_inactive">{data.calories}</p>
        </li>
        <li className={styles.item}>
          <p className="text text_type_main-default text_color_inactive">Белки, г</p>
          <p className="text text_type_digits-default text_color_inactive">{data.proteins}</p>
        </li>
        <li className={styles.item}>
          <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
          <p className="text text_type_digits-default text_color_inactive">{data.fat}</p>
        </li>
        <li className={styles.item}>
          <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
          <p className="text text_type_digits-default text_color_inactive">{data.carbohydrates}</p>
        </li>
      </ul>
    </div>
  );
}

export default IngredientDetails;

IngredientDetails.propTypes = {data: ingredientPropType.isRequired,};


