import React from 'react'
import classes from './Auth.module.scss'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import {connect} from 'react-redux'
import {validateControl} from '../../utils/validation'
import {auth, clearAuthState} from '../../store/actions/auth'
import {changeAuthFormControls, setIsFormValid} from '../../store/actions/auth'

class Auth extends React.Component {
  authHandler = val => {
    this.props.setIsFormValid(false)
    this.props.auth(
      this.props.formControls.email.value,
      this.props.formControls.password.value,
      val
    )
  } 

  submitHandler = event => {
    event.preventDefault()
  }

  onChangeHandler = (event, controlName, isBlur = false) => {
    const formControls = {...this.props.formControls}
    const control = {...formControls[controlName]}

    control.value = event.target.value
    if (isBlur) {
      control.touched = true
    }
    control.valid = validateControl(control.value, control.validation)

    formControls[controlName] = control

    let isFormValid = true
    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid
    })
    this.props.changeAuthFormControls(formControls)
    this.props.setIsFormValid(isFormValid)
  }

  componentWillUnmount() {
    this.props.clearAuthState()
  }

  renderInputs = () => {
    return Object.keys(this.props.formControls).map((controlName, index) => {
      const control = this.props.formControls[controlName]
      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={event => this.onChangeHandler(event, controlName)}
          onBlur={event => this.onChangeHandler(event, controlName, true)}
        />
      )
    })
  }

  render() {
    return (
      <div className={classes.Auth}>
        <h1>Authorization</h1>
        <form onSubmit={this.submitHandler} className={classes.AuthForm}>
          {this.renderInputs()}
          {this.props.error ? <span>{this.props.error}</span> : null}

          <Button 
            type="success" 
            onClick={() => this.authHandler(true)}
            disabled={!this.props.isFormValid}
          >
            LogIn
          </Button>

          <Button 
            type="primary" 
            onClick={() => this.authHandler(false)}
            disabled={!this.props.isFormValid}
          >
            Sing up
          </Button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    email: state.auth.formControls.email.value,
    password: state.auth.formControls.password.value,
    formControls: state.auth.formControls,
    isFormValid: state.auth.isFormValid,
    error: state.auth.error,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeAuthFormControls: formControls => dispatch(changeAuthFormControls(formControls)),
    setIsFormValid: isFormValid => dispatch(setIsFormValid(isFormValid)),
    auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin)),
    clearAuthState: () => dispatch(clearAuthState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)