export function validate(value, validation = null) {
  if (!validation) {
    return true 
  }

  let isValid 

  if (validation.required) {
    isValid = value.trim() !== '' 
  }
  return isValid 
}
