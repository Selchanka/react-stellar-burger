import React from "react";
import stylesHeader from "./appHeader.module.css";
import {
  Logo, ListIcon, ProfileIcon, BurgerIcon, Button
} from "@ya.praktikum/react-developer-burger-ui-components";

function AppHeader() {

  function ButtonBurgerIcon() {
    return (<div className={stylesHeader.btncontain}>
      <BurgerIcon type="primary" />
      <p className={stylesHeader.btntext}>Конструктор</p>
    </div>);
  }
  function ButtonListIcon() {
    return (<div className={stylesHeader.btncontain}>
      <ListIcon type="secondary" />
      <p>Лента заказов</p>
    </div>);
  }
  function ButtonProfileIcon(props) {
    return (<div className={stylesHeader.btncontain}>
      <ProfileIcon type="secondary" />
      <p>Личный кабинет</p>
    </div>);
  }

  return (
    <header className={`${stylesHeader.header} pt-4 pb-4`}>
      <nav className={stylesHeader.headerNav}>
        <div className={stylesHeader.btncontain .btnposition}>
          <Button extraClass={stylesHeader.btnsize} htmlType="button" type="secondary" size="large"><ButtonBurgerIcon /></Button>
          <Button extraClass={stylesHeader.btnsize} htmlType="button" type="secondary" size="large" disabled="undefined"><ButtonListIcon /></Button> </div>
        <Logo />
        <Button extraClass={stylesHeader.btnsize} htmlType="button" type="secondary" size="large" disabled="undefined" ><ButtonProfileIcon /></Button>
      </nav>
    </header>
  );
}

export default AppHeader;

