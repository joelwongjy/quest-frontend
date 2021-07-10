import { AdminFormState } from 'components/adminForm/AdminForm';

export const validateAdminInfo = (admin: AdminFormState): boolean => {
  const { name, gender, birthday, programmes } = admin;
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

export const isEmptyAdmin = (admin: AdminFormState): boolean => {
  const { name, gender, birthday, programmes } = admin;
  return name === '' && gender === '' && !birthday && programmes.length <= 0;
};
