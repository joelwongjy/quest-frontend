import { QuestionData, QuestionPostData } from 'interfaces/models/questions';

export const sortByOrder = <T extends QuestionData | QuestionPostData>(
  a: T,
  b: T
): number => {
  return a.order - b.order;
};
