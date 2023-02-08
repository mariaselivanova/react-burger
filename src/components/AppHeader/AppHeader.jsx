/* eslint-disable jsx-a11y/anchor-is-valid */
// TODO: Добавить валидные ссылки

import React from "react";
import AppHeaderStyle from './AppHeader.module.css';
// eslint-disable-next-line no-unused-vars
import { BurgerIcon, ListIcon, ProfileIcon, Typography, Logo, Box } from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
  return (
    <header className={AppHeaderStyle.header}>
      <nav className={`${AppHeaderStyle.nav} pt-4 pb-4`}>
        <ul className={AppHeaderStyle.navlist}>
          <li>
            <ul className={AppHeaderStyle.navsection}>
              <li className="pt-4 pb-4 pr-5 pl-5">
                <a href="#" className={AppHeaderStyle.listitem}>
                  <BurgerIcon type="primary" />
                  <p className="text text_type_main-default pl-2">
                    Конструктор
                  </p>
                </a>
              </li>
              <li className="pt-4 pb-4 pr-5 pl-5">
                <a href="#" className={AppHeaderStyle.listitem}>
                  <ListIcon type="secondary" />
                  <p className="text text_type_main-default text_color_inactive pl-2">
                    Лента заказов
                  </p>
                </a>
              </li>
            </ul>
          </li>
          <li className={AppHeaderStyle.logo}><a href="#"><Logo /></a></li>
          <li className="pt-4 pb-4 pr-5 pl-5">
            <a href="#" className={AppHeaderStyle.listitem}>
              <ProfileIcon type="secondary" />
              <p className="text text_type_main-default text_color_inactive pl-2">
                Личный кабинет
              </p>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default AppHeader
