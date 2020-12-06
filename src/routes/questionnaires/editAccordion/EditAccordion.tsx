import React, { useState } from 'react';
import { Grid, Switch, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import QuestAccordion from 'componentWrappers/questAccordion';
import { QuestionnairePostData } from 'interfaces/api/questionnaires';
import QuestTextField from 'componentWrappers/questTextField';
import { QuestionnaireType } from 'interfaces/models/questionnaires';

import { setTitle } from 'reducers/questionnaireDux';
import SingleEdit from './SingleEdit';
import SharedEdit from './SharedEdit';
import PreEdit from './PreEdit';
import { useStyles } from './editAccordion.styles';
import PostEdit from './PostEdit';

interface EditAccordionProps {
  questionnaire: QuestionnairePostData;
}

const EditAccordion: React.FC<EditAccordionProps> = ({ questionnaire }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { type, questionWindows, sharedQuestions } = questionnaire;
  const [isPre, setIsPre] = useState<boolean>(true);

  const updateTitle = (newTitle: string) => {
    dispatch(setTitle(newTitle));
  };

  return (
    <QuestAccordion heading="Step 3: Create the questionnaire">
      <Grid container>
        <div className={classes.inputContainer}>
          <QuestTextField
            className={classes.input}
            placeholder="Enter Title of Questionnaire"
            variant="outlined"
            value={questionnaire.title}
            margin="normal"
            onChange={(e) => updateTitle(e.target.value)}
          />
        </div>
        {type === QuestionnaireType.ONE_TIME && (
          <SingleEdit questionSet={sharedQuestions.questions} />
        )}
        {type === QuestionnaireType.PRE_POST && isPre ? (
          <>
            <Typography variant="h6" className={classes.typography}>
              Shared Questions
            </Typography>
            <Grid item xs={12}>
              <SharedEdit questionSet={sharedQuestions.questions} />
            </Grid>

            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Typography variant="h6">Pre-Program Questions</Typography>
              <div className={classes.modeSwitch}>
                Pre
                <Switch onChange={() => setIsPre(!isPre)} />
                Post
              </div>
            </Grid>

            <Grid item xs={12}>
              <PreEdit preQuestionSet={questionWindows[0].questions} />
            </Grid>
          </>
        ) : (
          type === QuestionnaireType.PRE_POST &&
          !isPre && (
            <>
              <Typography variant="h6" className={classes.typography}>
                Shared Questions
              </Typography>
              <Grid item xs={12}>
                <SharedEdit questionSet={sharedQuestions.questions} />
              </Grid>

              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Typography variant="h6">Post-Program Questions</Typography>
                <div className={classes.modeSwitch}>
                  Pre
                  <Switch onChange={() => setIsPre(!isPre)} />
                  Post
                </div>
              </Grid>

              <Grid item xs={12}>
                <PostEdit postQuestionSet={questionWindows[1].questions} />
              </Grid>
            </>
          )
        )}
      </Grid>
    </QuestAccordion>
  );
};

export default EditAccordion;
