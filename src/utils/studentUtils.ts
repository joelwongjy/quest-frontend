import { StudentPostData } from 'interfaces/api/students';

export const validateStudentInfo = (student: StudentPostData): boolean => {
  const { name, gender, age, activities } = student;
  if (name === '') {
    return false;
  }
  if (gender === '') {
    return false;
  }
  if (!age || age < 0) {
    return false;
  }
  if (activities.length === 0) {
    return false;
  }
  return true;
};

export const isEmptyStudent = (student: StudentPostData): boolean => {
  const { name, gender, age, activities } = student;
  return name === '' && gender === '' && !age && activities.length <= 0;
};
