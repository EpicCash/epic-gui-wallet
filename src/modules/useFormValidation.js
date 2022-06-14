import { reactive } from "@vue/reactivity";
import useValidators from '@/modules/Validators';

const errors = reactive({});
const { isEmpty, minLength, accountExist } = useValidators();

export default function useFormValidation() {

    const validatePasswordField = (fieldName, fieldValue) => {
        let message = !fieldValue ? isEmpty(fieldName, fieldValue) : minLength(fieldName, fieldValue, 4);
        if(message !== null){
          errors[fieldName] = message;
          return false;
        }
        return true;
    }

    const validateAccountField = (fieldName, fieldValue, configService) => {

        let message = accountExist(fieldName, fieldValue, configService);
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
      validateAccountField
    }
}
