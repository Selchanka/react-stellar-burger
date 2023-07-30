import React from "react";
import styles from "./burgerConstructor.module.css";
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../orderDetails/orderDetails";

function BurgerConstructor() {

  const [isModal, setModal] = React.useState(false);
  const onClose = () => setModal(false);
 
  return (
    <section className={styles.section}>

      <ul className={`${styles.ingrediensList} mt-25 mb-10 ml-4`}>
        <li className={`${styles.ingrediens} ml-8`}>
          <ConstructorElement type="top" isLocked={true} text="Краторная булка N-200i (верх)" price={200}
            thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'} />
        </li>
        <ul className={`${styles.filling} custom-scroll`}>
          <li className={styles.ingrediens}>
            <div className={styles.drag}><DragIcon type="primary" /></div>
            <ConstructorElement text="Говяжий метеорит (отбивная)" price={50}
              thumbnail={'https://code.s3.yandex.net/react/code/meat-04.png'} />
          </li>
          <li className={styles.ingrediens}>
            <div className={styles.drag}><DragIcon type="primary" /></div>
            <ConstructorElement text="Плоды Фалленианского дерева" price={50}
              thumbnail={'https://code.s3.yandex.net/react/code/sp_1.png'} />
          </li>
          <li className={styles.ingrediens}>
            <div className={styles.drag}><DragIcon type="primary" /></div>
            <ConstructorElement text="Хрустящие минеральные кольца" price={50}
              thumbnail={'https://code.s3.yandex.net/react/code/mineral_rings.png'} />
          </li>
          <li className={styles.ingrediens}>
            <div className={styles.drag}><DragIcon type="primary" /></div>
            <ConstructorElement text="Говяжий метеорит (отбивная)" price={50}
              thumbnail={'https://code.s3.yandex.net/react/code/meat-04.png'} />
          </li>
          <li className={styles.ingrediens}>
            <div className={styles.drag}><DragIcon type="primary" /></div>
            <ConstructorElement text="Плоды Фалленианского дерева" price={50}
              thumbnail={'https://code.s3.yandex.net/react/code/sp_1.png'} />
          </li>
          <li className={styles.ingrediens}>
            <div className={styles.drag}><DragIcon type="primary" /></div>
            <ConstructorElement text="Хрустящие минеральные кольца" price={50}
              thumbnail={'https://code.s3.yandex.net/react/code/mineral_rings.png'} />
          </li>
          <li className={styles.ingrediens}>
            <div className={styles.drag}><DragIcon type="primary" /></div>
            <ConstructorElement text="Говяжий метеорит (отбивная)" price={50}
              thumbnail={'https://code.s3.yandex.net/react/code/meat-04.png'} />
          </li>
          <li className={styles.ingrediens}>
            <div className={styles.drag}><DragIcon type="primary" /></div>
            <ConstructorElement text="Плоды Фалленианского дерева" price={50}
              thumbnail={'https://code.s3.yandex.net/react/code/sp_1.png'} />
          </li>
          <li className={styles.ingrediens}>
            <div className={styles.drag}><DragIcon type="primary" /></div>
            <ConstructorElement text="Хрустящие минеральные кольца" price={50}
              thumbnail={'https://code.s3.yandex.net/react/code/mineral_rings.png'} />
          </li>
        </ul>
        <li className={`${styles.ingrediens} ml-8`}>
          <ConstructorElement type="bottom" isLocked={true} text="Краторная булка N-200i (низ)" price={200}
            thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'} />
        </li>
      </ul>

      <div className={`${styles.finish} mr-4 ml-4`} id="modal">
        <p className={`${styles.price} text text_type_main-large`}>668</p>
        <div className={`mr-10 ml-3`}> <CurrencyIcon type="primary" /></div>
        <Button htmlType="button" type="primary" size="large" onClick={() => setModal(true)}>Оформить заказ</Button>
      </div>

      {isModal && (<Modal onClose={onClose}><OrderDetails /></Modal>)}

    </section>
  );
}

export default BurgerConstructor;


