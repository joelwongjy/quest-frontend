import { PersonPostData } from 'interfaces/models/persons';

export const validatePersonInfo = (
  person: Omit<PersonPostData, 'birthday'>
): boolean => {
  const { name, gender } = person;
  if (name === '') {
    return false;
  }
  if (gender === '') {
    return false;
  }
  return true;
};

export const isValidEmail = (email: string): boolean => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const isValidMobileNumber = (number: string): boolean => {
  const re = /^(\+65)?\s?(6|8|9)\d{7}$/;
  return re.test(number);
};
