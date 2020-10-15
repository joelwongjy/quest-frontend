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

import EditMcqQuestion from 'components/mcqQuestion/edit';
import { QuestComponentProps } from 'interfaces/components/common';
import { QuestionOrder, QuestionType } from 'interfaces/models/questionnaires';
import EditShortAnswerQuestion from 'components/shortAnswerQuestion/edit';
import EditLongAnswerQuestion from 'components/longAnswerQuestion/edit';
import EditMoodQuestion from 'components/moodQuestion/edit';

import { useStyles } from './questionCard.styles';

interface QuestionCardProps extends QuestComponentProps {
  question: QuestionOrder;
  mode: string;
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
      <InputLabel id="demo-controlled-open-select-label">Age</InputLabel>
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
    if (mode === 'edit' || mode === 'new') {
      switch (question.questionType) {
        case QuestionType.SHORT_ANSWER:
          return (
            <EditShortAnswerQuestion
              dropdown={dropdown}
              question={question}
              updateQuestion={updateQuestion}
            />
          );
        case QuestionType.LONG_ANSWER:
          return (
            <EditLongAnswerQuestion
              dropdown={dropdown}
              question={question}
              updateQuestion={updateQuestion}
            />
          );
        case QuestionType.MOOD:
          return (
            <EditMoodQuestion
              dropdown={dropdown}
              question={question}
              updateQuestion={updateQuestion}
            />
          );
        case QuestionType.MULTIPLE_CHOICE:
        default:
          return (
            <EditMcqQuestion
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
