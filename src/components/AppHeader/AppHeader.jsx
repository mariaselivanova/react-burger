import AppHeaderStyle from './AppHeader.module.css';
// eslint-disable-next-line no-unused-vars
import { BurgerIcon, ListIcon, ProfileIcon, Typography, Logo, Box } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, Link } from 'react-router-dom';
import { getUser } from '../../services/slices/userSlice';
import { useSelector } from 'react-redux';

function AppHeader() {
  const activeLinkStyle = "text text_type_main-default pl-2";
  const inactiveLinkStyle = "text text_type_main-default pl-2 text_color_inactive";
  const user = useSelector(getUser);

  return (
    <header className={AppHeaderStyle.header}>
      <nav className={`${AppHeaderStyle.nav} pt-4 pb-4`}>
        <ul className={AppHeaderStyle.navlist}>
          <li>
            <ul className={AppHeaderStyle.navsection}>
              <li className="pt-4 pb-4 pr-5 pl-5">
                <NavLink to="/" className={AppHeaderStyle.listitem}>
                  {({ isActive }) => (
                    <>
                      <BurgerIcon type={isActive ? "primary" : "secondary"} />
                      <p className={isActive ? activeLinkStyle : inactiveLinkStyle}>
                        Конструктор
                      </p>
                    </>
                  )}
                </NavLink>
              </li>
              <li className="pt-4 pb-4 pr-5 pl-5">
                <NavLink to="/feed" className={AppHeaderStyle.listitem}>
                  {({ isActive }) => (
                    <>
                      <ListIcon type={isActive ? "primary" : "secondary"} />
                      <p className={isActive ? activeLinkStyle : inactiveLinkStyle}>
                        Лента заказов
                      </p>
                    </>
                  )}
                </NavLink>
              </li>
            </ul>
          </li>
          <li className={AppHeaderStyle.logo}><Link to="/"><Logo /></Link></li>
          <li className="pt-4 pb-4 pr-5 pl-5">
            <NavLink to="/profile" className={AppHeaderStyle.listitem}>
              {({ isActive }) => (
                <>
                  <ProfileIcon type={isActive ? "primary" : "secondary"} />
                  <p className={isActive ? activeLinkStyle : inactiveLinkStyle}>
                    {user ? user.name : "Личный кабинет"}
                  </p>
                </>
              )}
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default AppHeader
