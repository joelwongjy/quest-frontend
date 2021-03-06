/* eslint-disable no-case-declarations */
import { AnnouncementFormState } from 'components/announcementForm/AnnouncementForm';
import { AnnouncementPostData } from 'interfaces/models/announcements';
import {
  QuestionnairePostData,
  QuestionnaireType,
} from 'interfaces/models/questionnaires';

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

export const getAnnouncementsFromQuestionnaire = (
  questionnaireData: QuestionnairePostData
): AnnouncementPostData[] => {
  const announcements: AnnouncementPostData[] = [];
  // eslint-disable-next-line default-case
  switch (questionnaireData.type) {
    case QuestionnaireType.ONE_TIME:
      const announcementData = {
        title: `New Quest - ${questionnaireData.title}`,
        body: 'Calling all knights! You have a new quest to complete. Earn yourself a medal by completing it now!',
        startDate: questionnaireData.questionWindows[0].startAt,
        endDate: questionnaireData.questionWindows[0].endAt,
        programmeIds: questionnaireData.programmes,
        classIds: questionnaireData.classes,
      };
      announcements.push(announcementData);
      break;
    case QuestionnaireType.PRE_POST:
      const preAnnouncementData = {
        title: `New Quest - ${questionnaireData.title}`,
        body: `Calling all knights! You have a quest to complete before your adventure. Check it out!`,
        startDate: questionnaireData.questionWindows[0].startAt,
        endDate: questionnaireData.questionWindows[0].endAt,
        programmeIds: questionnaireData.programmes,
        classIds: questionnaireData.classes,
      };
      const postAnnouncementData = {
        title: `New Quest - ${questionnaireData.title}`,
        body: `Calling all knights! Congratulations for conquering your adventure, complete your last quest to win a medal!`,
        startDate: questionnaireData.questionWindows[1].startAt,
        endDate: questionnaireData.questionWindows[1].endAt,
        programmeIds: questionnaireData.programmes,
        classIds: questionnaireData.classes,
      };
      announcements.push(preAnnouncementData);
      announcements.push(postAnnouncementData);
      break;
  }

  return announcements;
};
