import { combineReducers } from 'redux';

import misc, { MiscDux } from 'reducers/miscDux';
import questionnaire, { QuestionnaireDux } from 'reducers/questionnaireDux';

export interface RootState {
  misc: MiscDux;
  questionnaire: QuestionnaireDux;
}

const rootReducer = combineReducers({ misc, questionnaire });

export default rootReducer;
