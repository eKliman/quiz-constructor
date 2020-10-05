import React from 'react' 
import classes from './Input.module.scss' 

class Input extends React.Component {
  inputType = this.props.type || 'text' 
  cls = ''
  htmlFor = `${this.inputType}-${Math.round(Math.random() * 1e8).toString(
    16
  )}` 

  isInvalid({ valid, touched, shouldValidate }) {
    return !valid && shouldValidate && touched 
  }
  
  componentDidMount() {
    if (this.inputRef) 
      this.inputRef.focus()
  }
  
  render() {
    if (this.isInvalid(this.props)) {
      this.cls = `${classes.Input} ${classes.invalid}` 
    } else {
      this.cls = classes.Input
    }
    
    if (this.props.isRight) {
      this.cls = `${classes.Input} ${classes.right}`
    } 

    return (
      <div className={this.cls}>
        <label htmlFor={this.htmlFor}>{this.props.label}</label>
        <input
          type={this.inputType}
          id={this.htmlFor}
          value={this.props.value}
          onChange={this.props.onChange}
          onBlur={this.props.onBlur || null}
          ref={this.props.focus ? inputRef => this.inputRef = inputRef : null}
        />
        {this.isInvalid(this.props) ? (
          <span>{this.props.errorMessage || 'Enter correct value'}</span>
        ) : null}
      </div>
    ) 
  }
} 

export default Input 
