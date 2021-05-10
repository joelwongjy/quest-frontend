import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  FormControl,
  FormHelperText,
  Grid,
  Switch,
  Typography,
} from '@material-ui/core';

import QuestAccordion from 'componentWrappers/questAccordion';
import QuestTextField from 'componentWrappers/questTextField';
import { useError } from 'contexts/ErrorContext';
import { QuestionnaireType } from 'interfaces/models/questionnaires';
import { QuestionnaireDux, setTitle } from 'reducers/questionnaireDux';

import PostEdit from './PostEdit';
import PreEdit from './PreEdit';
import SharedEdit from './SharedEdit';
import SingleEdit from './SingleEdit';

import { useStyles } from './editAccordion.styles';

interface EditAccordionProps {
  questionnaire: QuestionnaireDux;
  alertCallback: (
    isAlertOpen: boolean,
    hasConfirm: boolean,
    alertHeader: string,
    alertMessage: string,
    confirmHandler: undefined | (() => void),
    cancelHandler: undefined | (() => void)
  ) => void;
}

const EditAccordion: React.FC<EditAccordionProps> = ({
  questionnaire,
  alertCallback,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { hasError } = useError();
  const { type, questionWindows, sharedQuestions } = questionnaire;
  const [isPre, setIsPre] = useState<boolean>(true);

  const updateTitle = (newTitle: string) => {
    dispatch(setTitle(newTitle));
  };

  const hasTitleError = hasError && questionnaire.title === '';

  return (
    <QuestAccordion heading="Step 3: Create the questionnaire">
      <Grid container>
        <FormControl error={hasTitleError} className={classes.inputContainer}>
          <QuestTextField
            className={classes.input}
            placeholder="Enter Title of Questionnaire"
            variant="outlined"
            value={questionnaire.title}
            margin="normal"
            onChange={(e) => updateTitle(e.target.value)}
            error={hasError && questionnaire.title === ''}
          />
          {hasTitleError && (
            <FormHelperText>The title cannot be empty!</FormHelperText>
          )}
        </FormControl>
        {type === QuestionnaireType.ONE_TIME && (
          <SingleEdit
            questionSet={questionWindows[0].questions}
            alertCallback={alertCallback}
          />
        )}
        {type === QuestionnaireType.PRE_POST && (
          <>
            <Typography className={classes.subheading}>
              Shared Questions
            </Typography>
            <Grid item xs={12}>
              <SharedEdit
                questionSet={sharedQuestions.questions}
                alertCallback={alertCallback}
              />
            </Grid>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Typography className={classes.subheading}>
                {isPre ? 'Pre-Programme Questions' : 'Post-Programme Questions'}
              </Typography>
              <div className={classes.modeSwitch}>
                Pre
                <Switch onChange={() => setIsPre((state) => !state)} />
                Post
              </div>
            </Grid>

            <Grid item xs={12}>
              {isPre ? (
                <PreEdit
                  preQuestionSet={questionWindows[0].questions}
                  alertCallback={alertCallback}
                />
              ) : (
                <PostEdit
                  postQuestionSet={questionWindows[1].questions}
                  alertCallback={alertCallback}
                />
              )}
            </Grid>
          </>
        )}
      </Grid>
    </QuestAccordion>
  );
};

export default EditAccordion;
