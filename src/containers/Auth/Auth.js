import React from 'react'
import classes from './Auth.module.scss'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import {connect} from 'react-redux'
import {validateControl} from '../../utils/validation'
import {auth} from '../../store/actions/auth'
import {changeAuthFormControls, setIsFormValid} from '../../store/actions/auth'

const Auth = props => {
  const authHandler = val => {
    props.auth(
      props.formControls.email.value,
      props.formControls.password.value,
      val
    )
  } 

  const submitHandler = event => {
    event.preventDefault()
  }

  const onChangeHandler = (event, controlName) => {
    const formControls = {...props.formControls}
    const control = {...formControls[controlName]}

    control.value = event.target.value
    control.touched = true
    control.valid = validateControl(control.value, control.validation)

    formControls[controlName] = control

    let isFormValid = true
    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid
    })
    props.changeAuthFormControls(formControls)
    props.setIsFormValid(isFormValid)
  }

  const renderInputs = () => {
    return Object.keys(props.formControls).map((controlName, index) => {
      const control = props.formControls[controlName]
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
          onChange={event => onChangeHandler(event, controlName)}
        />
      )
    })
  }

  return (
    <div className={classes.Auth}>
      <h1>Authorization</h1>
      <form onSubmit={submitHandler} className={classes.AuthForm}>
        {renderInputs()}
        {props.error ? <span>{props.error}</span> : null}

        <Button 
          type="success" 
          onClick={() => authHandler(true)}
          disabled={!props.isFormValid}
        >
          LogIn
        </Button>

        <Button 
          type="primary" 
          onClick={() => authHandler(false)}
          disabled={!props.isFormValid}
        >
          Sing up
        </Button>
      </form>
    </div>
  )
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)