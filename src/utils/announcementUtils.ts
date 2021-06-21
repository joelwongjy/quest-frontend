import { AnnouncementFormState } from 'components/announcementForm/AnnouncementForm';

export const validateAnnouncementInfo = (
  announcement: AnnouncementFormState
): boolean => {
  const { title, startDate, endDate, body, programmeIds, classIds } =
    announcement;
  if (title === '') {
    return false;
  }
  if (body === '') {
    return false;
  }
  if (!startDate) {
    return false;
  }
  if (!endDate) {
    return false;
  }
  if (startDate > endDate) {
    return false;
  }
  if (programmeIds.length === 0) {
    return false;
  }
  if (classIds.length === 0) {
    return false;
  }
  return true;
};
