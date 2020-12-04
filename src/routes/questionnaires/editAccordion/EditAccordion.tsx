import React, { useState } from 'react';
import { Grid, Tab, Tabs, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import Accordion from 'components/accordion';
import { QuestionnairePostData } from 'interfaces/api/questionnaires';
import Input from 'components/input';
import { QuestionnaireType } from 'interfaces/models/questionnaires';

import { setTitle, setType } from 'reducers/questionnaireDux';
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
  const [tabValue, setTabValue] = useState<number>(
    type === QuestionnaireType.ONE_TIME ? 0 : 1
  );
  const [isPre, setIsPre] = useState<boolean>(true);

  const updateTitle = (newTitle: string) => {
    dispatch(setTitle(newTitle));
  };

  return (
    <Accordion heading="Step 3: Create the questionnaire">
      <Grid container>
        <div className={classes.tab}>
          <Tabs
            value={tabValue}
            onChange={(
              // eslint-disable-next-line @typescript-eslint/ban-types
              event: React.ChangeEvent<{}>,
              newTabValue: number
            ) => {
              setTabValue(newTabValue);
              dispatch(
                setType(
                  newTabValue === 0
                    ? QuestionnaireType.ONE_TIME
                    : QuestionnaireType.PRE_POST
                )
              );
            }}
          >
            <Tab label="One Time" />
            <Tab label="Before After" />
          </Tabs>
        </div>
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
          <SingleEdit questionSet={sharedQuestions.questions} />
        ) : (
          <>
            <Typography variant="h6" className={classes.typography}>
              Shared Questions
            </Typography>
            <Grid item xs={12}>
              <SharedEdit questionSet={sharedQuestions.questions} />
            </Grid>
            <Typography variant="h6" className={classes.typography}>
              Pre-Program Questions
            </Typography>

            <Grid item xs={12}>
              <PreEdit preQuestionSet={questionWindows[0].questions} />
            </Grid>
            <Typography variant="h6" className={classes.typography}>
              Post-Program Questions
            </Typography>
            <Grid item xs={12}>
              <PostEdit postQuestionSet={questionWindows[1].questions} />
            </Grid>
          </>
        )}
      </Grid>
    </Accordion>
  );
};

export default EditAccordion;
