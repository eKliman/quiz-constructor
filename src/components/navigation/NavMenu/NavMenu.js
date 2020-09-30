import React from 'react' 
import { NavLink } from 'react-router-dom' 
import classes from './NavMenu.module.scss' 

const renderLinks = (links) => {
  return links.map((link, index) => {
    return (
      <li className={classes.item} key={index}>
        <NavLink
          className={classes.link}
          to={link.to}
          exact={link.exact}
          activeClassName={classes.active}
          onClick={() => {}}
        >
          {link.label}
        </NavLink>
      </li>
    ) 
  }) 
} 

const links = [
  { to: '/', label: 'Quiz list', exact: true },
  { to: '/quiz-creator', label: 'Create a quiz' },
] 

const NavMenu = () => {
  return <ul className={classes.NavMenu}>{renderLinks(links)}</ul> 
} 

export default NavMenu 
