import React from 'react'
import { connect } from 'react-redux'
import { toggleMenu } from '../../../store/actions/header'
import classes from './MenuToggle.module.scss'

const MenuToggle = props => {
  const cls = [
    'fas'
  ]

  if (props.menu) {
    cls.push('fa-times')
    cls.push(classes.open)
  } else {
    cls.push('fa-bars')
  }
  return (
    <button
      className={classes.MenuToggle}
      onClick={props.toggleMenu}
    >
      <i className={cls.join(' ')}/>
    </button>
    
  )
}

const mapStateToProps = state => {
  return {
    menu: state.header.menu
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleMenu: () => dispatch(toggleMenu())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuToggle)