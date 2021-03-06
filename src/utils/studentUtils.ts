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
