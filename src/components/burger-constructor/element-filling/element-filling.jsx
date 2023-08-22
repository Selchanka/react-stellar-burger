import React, { useRef } from "react";
import styles from "./element-filling.module.css";
import PropTypes from "prop-types";
import { ingredientPropType } from '../../../utils/prop-types';
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from 'react-dnd'
import { DELETE_INGREDIENTS, ADD_PRICE, COUNT_INGREDIENTS } from '../../../services/actions/list-ingredients-constructor-actions';
import { useDrop } from "react-dnd";


function ElementFilling({ id, index, moveIngredients, item }) {

  const dispatch = useDispatch();
  const handleClickDeleteIngredient = (evt, ingredient) => {
    dispatch({ type: DELETE_INGREDIENTS, payload: ingredient });
    dispatch({ type: ADD_PRICE, payload: { ...ingredient } });
    dispatch({ type: COUNT_INGREDIENTS });
  };

  const ref = useRef(null)
  const [, drop] = useDrop({
    accept: "filling",
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

      moveIngredients(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })
  const [{ isDragging }, drag] = useDrag({
    type: "filling",
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
      <div className={styles.drag}><DragIcon type="primary" /></div>
      <ConstructorElement text={item.name}
        price={item.price} thumbnail={item.image_mobile}
        handleClose={(evt) => handleClickDeleteIngredient(evt, item)} />
    </li>
  );
}


export default ElementFilling;

ElementFilling.propTypes = {  
  index: PropTypes.number.isRequired,
  moveIngredients: PropTypes.func.isRequired,
  item: ingredientPropType.isRequired
};

