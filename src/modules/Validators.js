
import { i18n } from '../i18n';

export default function useValidators() {

  const isEmpty = (fieldName, fieldValue) => {
    return !fieldValue ? i18n.global.t("msg.validators.empty", [fieldName]) : null;
    //
  }

  const isEqual = (fieldName, fieldValue, equalValue) => {
    return fieldValue !==  equalValue ? i18n.global.t("msg.validators.equal", [fieldName]) : null;
  }

  const isDirEmpty = (fieldName, fieldValue) => {
    //todo check if dir is empty
    return null;
  }

  const isHttpAddress = (fieldName, fieldValue) => {


    return !/^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?$/.test(fieldValue) ? i18n.global.t("msg.validators.http_address") : null;

  }

  const minLength = (fieldName, fieldValue, min) => {
    return fieldValue.length < min ? i18n.global.t("msg.validators.min_length", [fieldName, min]) : null;
  }

  const onlyLetter = (fieldName, fieldValue) => {
    return /^[a-z]*$/.test(fieldValue) == false ? i18n.global.t("msg.validators.only_letters", [fieldName]) : null;
  }


  const isNumber = (fieldName, fieldValue) => {
    return isNaN(fieldValue) ? i18n.global.t("msg.validators.number", [fieldName]) : null;
  }

  const isSpendable = (fieldName, fieldValue, spendable) => {
    return spendable < parseFloat(fieldValue) + 0.01 ? i18n.global.t("msg.validators.spendable") : null;
  }

  const accountExist = (fieldName, fieldValue, configService, exist) => {

    if(exist){
      return configService.accountExist(fieldValue) ? i18n.global.t("msg.validators.exist", [fieldValue]) : null;
    }else{
      return !configService.accountExist(fieldValue) ? i18n.global.t("msg.validators.notexist", [fieldValue]) : null;
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
    isDirEmpty,
    isHttpAddress
  }
}
