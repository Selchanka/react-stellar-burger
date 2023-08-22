import React, { useRef, useEffect } from "react";
import styles from "./burger-ingredients.module.css";
import { Tab, Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { useInView } from 'react-intersection-observer';
import { useDispatch, useSelector } from 'react-redux';
import { OPEN_INGREDIENT, CLOSE_INGREDIENT } from '../../services/actions/ingredient-details-modal-actions';
import { useDrag } from 'react-dnd';


function BurgerIngredients() {

  const dispatch = useDispatch();
  const parameter = useSelector((store) => store.listIngredients.data);

  const [isModal, setModal] = React.useState(false);

  const handleOpenIngredient = (ingredient) => {
    dispatch({ type: OPEN_INGREDIENT, payload: { ...ingredient } });
    setModal(true);
  };

  const handleCloseIngredient = () => {
    dispatch({ type: CLOSE_INGREDIENT });
    setModal(false);
  };

  const [current, setCurrent] = React.useState('bun')
  const [bunRef, inView1, tab1] = useInView({ threshold: 0.3 });
  const [sauceRef, inView2, tab2] = useInView({ threshold: 0.3 });
  const [mainRef, inView3, tab3] = useInView({ threshold: 0.3 });

  const onClickTab = (type, tab) => {
    setCurrent(type);
    tab.target.scrollIntoView({ behavior: "smooth" });
  };

  function BlockTab() {
    return (
      <div className={`${styles.blocktab} mb-10`}>
        <Tab value="bun" active={current === "bun"} onClick={() => onClickTab("bun", tab1)}>Булки</Tab>
        <Tab value="sauce" active={current === "sauce"} onClick={() => onClickTab("sauce", tab2)}>Соусы</Tab>
        <Tab value="main" active={current === "main"} onClick={() => onClickTab("main", tab3)}>Начинки</Tab>
      </div>
    )
  }

  useEffect(() => {
    inView3 && setCurrent('main');
    inView2 && setCurrent('sauce');
    inView1 && setCurrent('bun');
  }, [inView1, inView2, inView3]);

  function Ingredient(parament) {
    const data = parament.parament;
    const [{ isDrag }, dragRef] = useDrag({
      type: "animal",
      item: data,
      collect: monitor => ({
        isDrag: monitor.isDragging()
      })
    });
    return (!isDrag &&
      <div className={styles.element} ref={dragRef}>
        <img className={styles.image} src={data.image} alt="Фото ингредиента" />
        <div className={styles.counter} style={{ display: "none" }}>
          <Counter count={1} size="default" extraClass={`m-1`} /></div>
        <p className={`${styles.names} text text_type_main-small`}>{data.name}</p>
        <div className={styles.blockPrice} >
          <p className={`${styles.prices} text text_type_main-medium`}>{data.price}</p>
          <div className={styles.currencyIcon}> <CurrencyIcon type="primary" /></div>
        </div>
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
                <li key={ingredient['_id']} onClick={() => handleOpenIngredient(ingredient)}>
                  <Ingredient parament={ingredient} />
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
      <div className={`${styles.menu} custom-scroll`} >
        <div ref={bunRef}>
          <BlockMenu title="Булки" type="bun" parament={parameter} /></div>
        <div ref={sauceRef}>
          <BlockMenu title="Соусы" type="sauce" parament={parameter} /></div>
        <div ref={mainRef}>
          <BlockMenu title="Начинки" type="main" parament={parameter} /></div>
      </div>

      {isModal && (<Modal onClose={handleCloseIngredient}><IngredientDetails /></Modal>)}

    </section>
  );
}

export default BurgerIngredients;


