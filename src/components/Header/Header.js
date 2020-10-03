import React from 'react' 
import classes from './Header.module.scss' 
import logo from '../../logo.svg' 
import NavMenu from '../navigation/NavMenu/NavMenu' 
import { NavLink } from 'react-router-dom' 
import AuthIcons from '../AuthIcons/AuthIcons'
import MenuToggle from '../navigation/MenuToggle/MenuToggle'

const Header = () => {
  return (
    <header className={classes.Header}>
      <div className="container">
        <div className={classes.wrapper}>
          <div className={classes.navBlock}>
            <NavLink to="/" exact>
              <img src={logo} className={classes.logo} alt="logo" />
            </NavLink>
            <MenuToggle />
            <NavMenu />
          </div>
          <AuthIcons />
        </div>
      </div>
    </header>
  ) 
} 

export default Header 
