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
