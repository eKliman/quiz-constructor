import React from 'react'
import { connect } from 'react-redux'
import classes from './Backdrop.module.scss'
import {closeMenu} from '../../../store/actions/header'


const Backdrop = props => {
  const cls = [
    classes.Backdrop,
    props.menu ? classes.visible : null
  ]
  
  return (<div className={cls.join(' ')} onClick={props.closeMenu}></div>)
}

const mapStateToProps = state => {
  return {
    menu: state.header.menu,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeMenu: () => dispatch(closeMenu())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Backdrop)