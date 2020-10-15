import React from 'react';
import { Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import Accordion from 'components/accordion';
import { QuestionnairePostData } from 'interfaces/api/questionnaires';
import Input from 'components/input';
import { QuestionnaireType } from 'interfaces/models/questionnaires';

import { setTitle } from 'reducers/questionnaireDux';
import SingleEdit from './SingleEdit';
import SharedEdit from './SharedEdit';
import UniqueEdit from './UniqueEdit';
import { useStyles } from './editAccordion.styles';

interface EditAccordion {
  questionnaire: QuestionnairePostData;
}

const EditAccordion: React.FC<EditAccordion> = ({ questionnaire }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { type, questionWindows, sharedQuestions } = questionnaire;

  const updateTitle = (newTitle: string) => {
    dispatch(setTitle(newTitle));
  };

  return (
    <Accordion heading="Step 3: Create the questionnaire">
      <Grid container>
        <div className={classes.inputContainer}>
          <Input
            className={classes.input}
            placeholder="Enter Title of Questionnaire"
            variant="outlined"
            value={questionnaire.title}
            onChange={(e) => updateTitle(e.target.value)}
          />
        </div>
        {type === QuestionnaireType.ONE_TIME ? (
          <SingleEdit questionSet={questionWindows[0].questions} />
        ) : (
          <>
            <SharedEdit questionSet={sharedQuestions.questions} />
            <UniqueEdit
              preQuestionSet={questionWindows[0].questions}
              postQuestionSet={questionWindows[1].questions}
            />
          </>
        )}
      </Grid>
    </Accordion>
  );
};

export default EditAccordion;
