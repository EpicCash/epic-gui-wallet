export default function useValidators() {

  const isEmpty = (fieldName, fieldValue) => {
    return !fieldValue ? "The " + fieldName + " field is required" : null;
  }

  const minLength = (fieldName, fieldValue, min) => {
    return fieldValue.length < min ? `The ${fieldName} field must be atleast ${min} characters long` : null;
  }

  const accountExist = (fieldName, fieldValue, configService) => {

    return !configService.accountExist(fieldValue) ? `The account ${fieldValue} does not exist` : null;
  }

  return {
    isEmpty,
    minLength,
    accountExist
  }
}
