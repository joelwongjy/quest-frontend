import { PersonListData } from 'interfaces/models/persons';
import { QuestionData, QuestionPostData } from 'interfaces/models/questions';

export const sortByOrder = <T extends QuestionData | QuestionPostData>(
  a: T,
  b: T
): number => {
  return a.order - b.order;
};

export const sortByName = <T extends PersonListData>(a: T, b: T): number => {
  return a.name.localeCompare(b.name);
};
