import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import {logout} from '../../store/actions/auth'
import classes from './AuthIcons.module.scss'

const AuthIcons = props => {
  const logoutHandler = () => {
    props.logout()
    props.history.push('/')
  }
  
  return (
      props.token
        ? <i className={`fas fa-sign-out-alt ${classes.AuthIcons}`} onClick={logoutHandler}></i>
        : <Link to="/auth"><i className={`fas fa-sign-in-alt ${classes.AuthIcons}`}></i></Link>
  )
}

const mapStateToProps = state => {
  return {
    token: state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthIcons))