import React from 'react'
import classes from './Select.module.scss'

const Select = (props) => {
  const htmlFor = `select-${Math.round(Math.random() * 1e8).toString(16)}`
  return (
    <div className={classes.Select}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <select 
        id={htmlFor} 
        value={props.value} 
        onChange={props.onChange}
      >
        {props.options.map((option, index) => {
          return (
            <option 
              value={option.value} 
              key={index} 
              disabled={option.disabled}
            >
              {option.text}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default Select
