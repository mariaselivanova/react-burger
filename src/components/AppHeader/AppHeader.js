import React from "react";
import AppHeaderStyle from './AppHeader.module.css';
import { BurgerIcon, ListIcon, ProfileIcon, Typography, Logo, Box } from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
  return (
    <header className={AppHeaderStyle.header}>
      <nav className={`${AppHeaderStyle.nav} pt-4 pb-4`}>
        <ul className={AppHeaderStyle.navlist}>
          <li>
            <ul className={AppHeaderStyle.navsection}>
              <li className={`${AppHeaderStyle.listitem} pt-4 pb-4 pr-5 pl-5`}>
                <BurgerIcon type="primary" />
                <p className="text text_type_main-default pl-2">Конструктор</p>
              </li>
              <li className={`${AppHeaderStyle.listitem} pt-4 pb-4 pr-5 pl-5`}>
                <ListIcon type="secondary" />
                <p className="text text_type_main-default text_color_inactive pl-2">Лента заказов</p>
              </li>
            </ul>
          </li>
          <li className={AppHeaderStyle.logo}><Logo /></li>
          <li className={`${AppHeaderStyle.listitem} pt-4 pb-4 pr-5 pl-5`}>
            <ProfileIcon type="secondary" />
            <p className="text text_type_main-default text_color_inactive pl-2">Личный кабинет</p>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default AppHeader
