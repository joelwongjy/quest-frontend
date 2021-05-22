import { TeacherFormState } from 'components/teacherForm/TeacherForm';

export const validateTeacherInfo = (student: TeacherFormState): boolean => {
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

export const isEmptyTeacher = (student: TeacherFormState): boolean => {
  const { name, gender, birthday, programmes } = student;
  return name === '' && gender === '' && !birthday && programmes.length <= 0;
};
