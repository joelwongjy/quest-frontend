import { isAfter, isBefore } from 'date-fns';
import { History } from 'history';
import store from 'app/store';
import { DUPLICATE, EDIT, QUESTIONNAIRES } from 'constants/routes';
import { QuestionnaireListData } from 'interfaces/models/questionnaires';
import { setMode } from 'reducers/questionnaireDux';
import { MenuOption } from 'interfaces/components/questionnaireCard';
import { QuestionnairePostData } from 'interfaces/api/questionnaires';
import { RouteState } from 'interfaces/routes/common';

export const tabs = ['Current', 'Upcoming', 'Past'];
export const breadcrumbs = [{ text: 'Questionnaires', href: QUESTIONNAIRES }];
export interface QuestionnairesState extends RouteState {
  questionnaires: QuestionnaireListData[];
}

export const getQuestionnairesToRender = (
  questionnaires: QuestionnaireListData[],
  tabValue: number
): QuestionnaireListData[] => {
  const now = new Date();
  let renderedQuestionnaires;
  switch (tabValue) {
    case 1:
      renderedQuestionnaires = questionnaires.filter((q) =>
        isAfter(q.startAt, now)
      );
      break;
    case 2:
      renderedQuestionnaires = questionnaires.filter((q) =>
        isBefore(q.endAt, now)
      );
      break;
    case 0:
    default:
      renderedQuestionnaires = questionnaires.filter(
        (q) => isBefore(q.startAt, now) && isAfter(q.endAt, now)
      );
      break;
  }
  renderedQuestionnaires = renderedQuestionnaires.sort(
    (a, b) => a.startAt.getTime() - b.startAt.getTime()
  );
  return renderedQuestionnaires;
};

export const getMenuOptions = (
  id: number,
  questionnaire: QuestionnairePostData,
  setState: (state: Partial<QuestionnairesState>) => void,
  hasIncompleteQuestionnaire: boolean,
  history: History
): MenuOption[] => {
  return [
    {
      text: 'Edit',
      callback:
        hasIncompleteQuestionnaire && id !== questionnaire.questionnaireId
          ? () =>
              setState({
                isAlertOpen: true,
                hasConfirm: true,
                alertHeader: 'Are you sure?',
                alertMessage:
                  'You have an unsaved questionnaire, your changes will be discarded if you edit a different questionnaire',
                confirmHandler: () => {
                  store.dispatch(setMode('EDIT'));
                  history.push(`${QUESTIONNAIRES}/${id}${EDIT}`);
                },
              })
          : () => {
              store.dispatch(setMode('EDIT'));
              history.push(`${QUESTIONNAIRES}/${id}${EDIT}`);
            },
    },
    {
      text: 'Make a copy',
      callback: hasIncompleteQuestionnaire
        ? () =>
            setState({
              isAlertOpen: true,
              hasConfirm: true,
              alertHeader: 'Are you sure?',
              alertMessage:
                'You have an unsaved questionnaire, your changes will be discarded if you start a new questionnaire',
              confirmHandler: () => {
                store.dispatch(setMode('DUPLICATE'));
                history.push(`${QUESTIONNAIRES}/${id}${DUPLICATE}`);
              },
            })
        : () => {
            store.dispatch(setMode('DUPLICATE'));
            history.push(`${QUESTIONNAIRES}/${id}${DUPLICATE}`);
          },
    },
  ];
};
