import { reactive } from "@vue/reactivity";
import useValidators from '@/modules/Validators';

const errors = reactive({});


const { isEmpty, isEqual, minLength, accountExist, isNumber, isSpendable, onlyLetter, isDirEmpty, isHttpAddress } = useValidators();

export default function useFormValidation() {

    const validatePasswordField = (fieldName, fieldValue, repeat) => {
        let message = null;

        if(repeat){
          message = !fieldValue ? isEmpty(fieldName, fieldValue) : minLength(fieldName, fieldValue, 4) || isEqual(fieldName, fieldValue, repeat);
        }else{
          message = !fieldValue ? isEmpty(fieldName, fieldValue) : minLength(fieldName, fieldValue, 4);
        }

        if(message !== null){
          errors[fieldName] = message;
          return false;
        }
        return true;
    }

    const validateAccountField = (fieldName, fieldValue, configService, exist) => {
        let message = null;
        if(exist){
          message = !fieldValue ? isEmpty(fieldName, fieldValue) : onlyLetter(fieldName, fieldValue) || accountExist(fieldName, fieldValue, configService, exist);
        }else{
          message = onlyLetter(fieldName, fieldValue) || accountExist(fieldName, fieldValue, configService, exist);
        }

        if(message !== null){
          errors[fieldName] = message;
          return false;
        }
        return true;
    }

    const validateAmountField = (fieldName, fieldValue, spendable) => {

        let message = !fieldValue ? isEmpty(fieldName, fieldValue) : isNumber(fieldName, fieldValue) || isSpendable(fieldName, fieldValue, spendable);
        if(message !== null){
          errors[fieldName] = message;
          return false;
        }
        return true;
    }
    const validateTextField = (fieldName, fieldValue) => {

        let message = !fieldValue ? isEmpty(fieldName, fieldValue) : null;
        if(message !== null){
          errors[fieldName] = message;
          return false;
        }
        return true;
    }
    const validateProofAddressField = (fieldName, fieldValue) => {

        let message = minLength(fieldName, fieldValue, 64);
        if(message !== null){
          errors[fieldName] = message;
          return false;
        }
        return true;
    }

    const validateAddressField = (fieldName, fieldValue, forceHttp) => {

        let message = null;
        if(fieldValue.includes('http') || fieldValue.includes('https') || forceHttp){
          message = !fieldValue ? isEmpty(fieldName, fieldValue) : isHttpAddress(fieldName, fieldValue);
        }else{
          message = isEmpty(fieldName, fieldValue);
        }


        if(message !== null){
          errors[fieldName] = message;
          return false;
        }
        return true;
    }

    const validateDirField = (fieldName, fieldValue, configService) => {

        let message = isDirEmpty(fieldName, fieldValue);
        if(message !== null){
          errors[fieldName] = message;
          return false;
        }
        return true;
    }

    const validateNetworkField = (fieldName, fieldValue) => {

        let message = isEmpty(fieldName, fieldValue);
        if(message !== null){
          errors[fieldName] = message;
          return false;
        }
        return true;
    }

    const resetFormErrors = () => {
      for (const [key, value] of Object.entries(errors)) {
          errors[key] = null;
      }
    }

    return {
      errors,
      resetFormErrors,
      validatePasswordField,
      validateAccountField,
      validateAmountField,
      validateProofAddressField,
      validateAddressField,
      validateDirField,
      validateNetworkField,
      validateTextField
    }
}
