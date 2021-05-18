import { combineReducers } from 'redux';

import attempt, { AttemptDux } from 'reducers/attemptDux';
import misc, { MiscDux } from 'reducers/miscDux';
import questionnaire, { QuestionnaireDux } from 'reducers/questionnaireDux';

export interface RootState {
  misc: MiscDux;
  questionnaire: QuestionnaireDux;
  attempt: AttemptDux;
}

const rootReducer = combineReducers({ misc, questionnaire, attempt });

export default rootReducer;
