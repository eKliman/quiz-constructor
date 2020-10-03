export const validate = (value, validation = null) => {
  if (!validation) {
    return true 
  }

  let isValid 

  if (validation.required) {
    isValid = value.trim() !== '' 
  }
  return isValid 
}

const validateEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export const validateControl = (value, validation) => {
  if (!validation) {
    return true
  }

  let isValid = true
  if (validation.required) {
    isValid = value.trim() !== '' && isValid
  }

  if (validation.email) {
    isValid = validateEmail(value) && isValid
  }

  if (validation.minLength) {
    isValid = value.trim().length >= validation.minLength && isValid
  }

  return isValid
}
