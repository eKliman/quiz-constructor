import React from 'react';
import classes from './Header.module.scss';
import logo from '../../logo.svg';
import NavMenu from '../navigation/NavMenu/NavMenu';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className={classes.Header}>
      <div className="container">
        <div className={classes.wrapper}>
          <NavLink to="/" exact>
            <img src={logo} className={classes.logo} alt="logo" />
          </NavLink>
          <NavMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
