import { StudentPostData } from 'interfaces/api/students';

export const validateStudentInfo = (student: StudentPostData): boolean => {
  const { name, gender, birthday, activities } = student;
  if (name === '') {
    return false;
  }
  if (gender === '') {
    return false;
  }
  if (!birthday) {
    return false;
  }
  if (activities.length === 0) {
    return false;
  }
  return true;
};

export const isEmptyStudent = (student: StudentPostData): boolean => {
  const { name, gender, birthday, activities } = student;
  return name === '' && gender === '' && !birthday && activities.length <= 0;
};

export const isValidEmail = (email: string): boolean => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const isValidMobileNumber = (number: string): boolean => {
  const re = /^(\+65)?\s?(6|8|9)\d{7}$/;
  return re.test(number);
};
