export default function useValidators() {

  const isEmpty = (fieldName, fieldValue) => {
    return !fieldValue ? "The " + fieldName + " field is required" : null;
  }

  const isEqual = (fieldName, fieldValue, equalValue) => {
    return fieldValue !==  equalValue ? "The " + fieldName + " must be equal" : null;
  }

  const isDirEmpty = (fieldName, fieldValue) => {
    //todo check if dir is empty
    return null;
  }


  const minLength = (fieldName, fieldValue, min) => {
    return fieldValue.length < min ? `The ${fieldName} field must be at least ${min} characters long` : null;
  }

  const onlyLetter = (fieldName, fieldValue) => {
    return /^[a-z]*$/.test(fieldValue) == false ? `The ${fieldName} can have only lower letters from a-z with no spaces` : null;
  }


  const isNumber = (fieldName, fieldValue) => {
    return isNaN(fieldValue) ? `The ${fieldName} field must be a number` : null;
  }

  const isSpendable = (fieldName, fieldValue, spendable) => {
    return spendable < parseFloat(fieldValue) + 0.01 ? 'Not enough balance' : null;
  }

  const accountExist = (fieldName, fieldValue, configService, exist) => {

    if(exist){
      return configService.accountExist(fieldValue) ? `The account "${fieldValue}" already exists` : null;
    }else{
      return !configService.accountExist(fieldValue) ? `The account "${fieldValue}" does not exist` : null;
    }

  }

  return {
    isEmpty,
    isEqual,
    minLength,
    accountExist,
    isNumber,
    isSpendable,
    onlyLetter,
    isDirEmpty
  }
}
