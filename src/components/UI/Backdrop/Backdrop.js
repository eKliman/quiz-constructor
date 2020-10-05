import React from 'react'
import classes from './Backdrop.module.scss'

const Backdrop = props => {
  const cls = [
    classes.Backdrop,
    props.class ? classes[props.class] : ''
  ]
  
  return (<div className={cls.join(' ')} onClick={props.onClick}></div>)
}

export default Backdrop