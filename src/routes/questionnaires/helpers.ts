import { isAfter, isBefore } from 'date-fns';
import { History } from 'history';

import store from 'app/store';
import { DUPLICATE, EDIT, QUESTIONNAIRES } from 'constants/routes';
import { MenuOption } from 'interfaces/components/questionnaireCard';
import {
  QuestionnaireListData,
  QuestionnaireMode,
} from 'interfaces/models/questionnaires';
import { RouteState } from 'interfaces/routes/common';
import { QuestionnaireDux, setMode } from 'reducers/questionnaireDux';

export const tabs = ['Current', 'Upcoming', 'Past'];
export const breadcrumbs = [{ text: 'Questionnaires', href: QUESTIONNAIRES }];
export interface QuestionnairesState extends RouteState {
  questionnaires: QuestionnaireListData[];
}

export const getQuestionnairesToRender = (
  questionnaires: QuestionnaireListData[],
  tabValue: number,
  selectedProgrammes: { id: number; name: string }[],
  selectedClasses: { id: number; name: string }[]
): QuestionnaireListData[] => {
  const now = new Date();
  let renderedQuestionnaires;
  switch (tabValue) {
    case 1:
      renderedQuestionnaires = questionnaires.filter((q) =>
        isAfter(new Date(q.startAt), now)
      );
      break;
    case 2:
      renderedQuestionnaires = questionnaires.filter((q) =>
        isBefore(new Date(q.endAt), now)
      );
      break;
    case 0:
    default:
      renderedQuestionnaires = questionnaires.filter(
        (q) =>
          isBefore(new Date(q.startAt), now) && isAfter(new Date(q.endAt), now)
      );
      break;
  }
  renderedQuestionnaires = renderedQuestionnaires.sort(
    (a, b) => (a.startAt as Date).getTime() - (b.startAt as Date).getTime()
  );
  if (
    (selectedClasses !== undefined && selectedClasses.length > 0) ||
    (selectedProgrammes !== undefined && selectedProgrammes.length > 0)
  ) {
    renderedQuestionnaires = renderedQuestionnaires.filter((q) => {
      return (
        q.classes.find(
          (c) => selectedClasses.filter((x) => x.id === c.id).length > 0
        ) !== undefined ||
        q.programmes.find(
          (p) => selectedProgrammes.filter((y) => y.id === p.id).length > 0
        ) !== undefined
      );
    });
  }
  return renderedQuestionnaires;
};

export const getMenuOptions = (
  id: number,
  questionnaire: QuestionnaireDux,
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
                  store.dispatch(setMode(QuestionnaireMode.EDIT));
                  history.push(`${QUESTIONNAIRES}/${id}${EDIT}`);
                },
              })
          : () => {
              store.dispatch(setMode(QuestionnaireMode.EDIT));
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
                store.dispatch(setMode(QuestionnaireMode.DUPLICATE));
                history.push(`${QUESTIONNAIRES}/${id}${DUPLICATE}`);
              },
            })
        : () => {
            store.dispatch(setMode(QuestionnaireMode.DUPLICATE));
            history.push(`${QUESTIONNAIRES}/${id}${DUPLICATE}`);
          },
    },
  ];
};
