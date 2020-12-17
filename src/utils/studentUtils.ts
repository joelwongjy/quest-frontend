import { StudentFormState } from 'components/studentForm/StudentForm';

export const validateStudentInfo = (student: StudentFormState): boolean => {
  const { name, gender, birthday, programmes } = student;
  if (name === '') {
    return false;
  }
  if (gender === '') {
    return false;
  }
  if (!birthday) {
    return false;
  }
  if (programmes.length === 0) {
    return false;
  }
  return true;
};

export const isEmptyStudent = (student: StudentFormState): boolean => {
  const { name, gender, birthday, programmes } = student;
  return name === '' && gender === '' && !birthday && programmes.length <= 0;
};

export const isValidEmail = (email: string): boolean => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const isValidMobileNumber = (number: string): boolean => {
  const re = /^(\+65)?\s?(6|8|9)\d{7}$/;
  return re.test(number);
};
