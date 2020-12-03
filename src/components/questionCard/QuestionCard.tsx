import React, { useState } from 'react';
import {
  Card,
  createMuiTheme,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  MuiThemeProvider,
  Select,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import McqQuestion from 'components/mcqQuestion';
import { QuestComponentProps } from 'interfaces/components/common';
import {
  QuestionOrder,
  QuestionType,
  QuestionMode,
} from 'interfaces/models/questionnaires';
import ShortAnswerQuestion from 'components/shortAnswerQuestion';
import LongAnswerQuestion from 'components/longAnswerQuestion';
import MoodQuestion from 'components/moodQuestion';

import { useStyles } from './questionCard.styles';

interface QuestionCardProps extends QuestComponentProps {
  question: QuestionOrder;
  mode: QuestionMode;
  handleDelete: () => void;
  updateQuestion: (newQuestion: QuestionOrder) => void;
}

const InputMuiTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#044682',
    },
  },
});

const QuestionCard: React.FC<QuestionCardProps> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  question,
  mode,
  handleDelete,
  updateQuestion,
  className,
}) => {
  const classes = useStyles();

  const [open, setOpen] = useState<boolean>(false);

  const dropdown = (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-controlled-open-select-label">
        Question Type
      </InputLabel>
      <Select
        labelId="demo-controlled-open-select-label"
        id="demo-controlled-open-select"
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        value={question.questionType}
        onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
          updateQuestion({
            ...question,
            questionType: event.target.value as QuestionType,
          });
        }}
      >
        <MenuItem value={QuestionType.MULTIPLE_CHOICE}>
          Multiple Choice Question
        </MenuItem>
        <MenuItem value={QuestionType.SHORT_ANSWER}>
          Short Answer Question
        </MenuItem>
        <MenuItem value={QuestionType.LONG_ANSWER}>
          Long Answer Question
        </MenuItem>
        <MenuItem value={QuestionType.MOOD}>Mood Question</MenuItem>
      </Select>
    </FormControl>
  );

  const renderQuestion = () => {
    if (mode === QuestionMode.EDIT || mode === QuestionMode.NEW) {
      switch (question.questionType) {
        case QuestionType.SHORT_ANSWER:
          return (
            <ShortAnswerQuestion
              mode={mode}
              dropdown={dropdown}
              question={question}
              updateQuestion={updateQuestion}
            />
          );
        case QuestionType.LONG_ANSWER:
          return (
            <LongAnswerQuestion
              mode={mode}
              dropdown={dropdown}
              question={question}
              updateQuestion={updateQuestion}
            />
          );
        case QuestionType.MOOD:
          return (
            <MoodQuestion
              mode={mode}
              dropdown={dropdown}
              question={question}
              updateQuestion={updateQuestion}
            />
          );
        case QuestionType.MULTIPLE_CHOICE:
        default:
          return (
            <McqQuestion
              mode={mode}
              dropdown={dropdown}
              question={question}
              updateQuestion={updateQuestion}
            />
          );
      }
    }
    return <></>;
  };

  return (
    <Card className={className}>
      <MuiThemeProvider theme={InputMuiTheme}>
        {renderQuestion()}
      </MuiThemeProvider>
      <Grid item xs={1} className={classes.bin} alignItems="flex-end">
        <IconButton
          aria-label="delete"
          onClick={handleDelete}
          style={{ color: 'red' }}
        >
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Card>
  );
};

export default QuestionCard;
