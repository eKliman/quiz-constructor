import React from 'react' 
import { NavLink } from 'react-router-dom' 
import classes from './NavMenu.module.scss' 
import Backdrop from '../../UI/Backdrop/Backdrop'
import { closeMenu } from '../../../store/actions/header'
import { connect } from 'react-redux' 

const links = [
  { to: '/', label: 'Quiz list', exact: true },
  { to: '/quiz-creator', label: 'Create a quiz' },
] 

const NavMenu = props => {
  const cls = [
    classes.NavMenu,
    props.menu ? null : classes.closed
  ]

  const renderLinks = (links) => {
    return links.map((link, index) => {
      return (
        <li className={classes.item} key={index}>
          <NavLink
            className={classes.link}
            to={link.to}
            exact={link.exact}
            activeClassName={classes.active}
            onClick={() => props.closeMenu()}
          >
            {link.label}
          </NavLink>
        </li>
      ) 
    }) 
  }
  
  return (
    <>
      <ul className={cls.join(' ')}>{renderLinks(links)}</ul> 
      <Backdrop 
        onClick={props.closeMenu}
        class={props.menu ? 'menu' : ''}
      />
    </>
  )
} 

const mapStateToProps = state => {
  return {
    menu: state.header.menu
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeMenu: () => dispatch(closeMenu())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavMenu) 
