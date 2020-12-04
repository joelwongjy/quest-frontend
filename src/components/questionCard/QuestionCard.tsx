import React, { useState } from 'react';
import {
  Button,
  ButtonGroup,
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
  QuestionAssessibility,
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
  assessibility: QuestionAssessibility;
  updateAssessibility: (newAssessibility: QuestionAssessibility) => void;
}

const InputMuiTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#044682',
    },
  },
});

const assessibilityOptions = ['Shared', 'Pre-Program', 'Post-Program'];
const mapAssessibilityToIndex = (assessibility: QuestionAssessibility) => {
  switch (assessibility) {
    case QuestionAssessibility.PRE:
      return 1;
    case QuestionAssessibility.POST:
      return 2;
    case QuestionAssessibility.SHARED:
    default:
      return 0;
  }
};

const QuestionCard: React.FC<QuestionCardProps> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  question,
  mode,
  handleDelete,
  updateQuestion,
  assessibility,
  updateAssessibility,
  className,
}) => {
  const classes = useStyles();

  const [open, setOpen] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(
    mapAssessibilityToIndex(assessibility)
  );
  const handleUpdateAssessibility = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSelectedIndex(event.target.value as number);
    switch (event.target.value as number) {
      case 0:
        updateAssessibility(QuestionAssessibility.SHARED);
        break;
      case 1:
        updateAssessibility(QuestionAssessibility.PRE);
        break;
      case 2:
        updateAssessibility(QuestionAssessibility.POST);
        break;
      default:
    }
  };

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

  const renderAssessibilityButton = () => {
    if (assessibility === QuestionAssessibility.PRE) {
      return 'Pre';
    }
    if (assessibility === QuestionAssessibility.POST) {
      return 'Post';
    }
    return 'Shared';
  };

  return (
    <Card className={className}>
      <MuiThemeProvider theme={InputMuiTheme}>
        {renderQuestion()}
      </MuiThemeProvider>
      <Grid item xs={12} className={classes.actions} alignItems="flex-end">
        <IconButton
          aria-label="delete"
          onClick={handleDelete}
          style={{ color: 'red' }}
          disabled={mode !== QuestionMode.EDIT && mode !== QuestionMode.NEW}
        >
          <DeleteIcon />
        </IconButton>
        <FormControl variant="outlined" size="small">
          <Select
            id={`assessibility-select-${assessibility}`}
            value={selectedIndex}
            onChange={handleUpdateAssessibility}
          >
            <MenuItem value={0}>{assessibilityOptions[0]}</MenuItem>
            <MenuItem value={1}>{assessibilityOptions[1]}</MenuItem>
            <MenuItem value={2}>{assessibilityOptions[2]}</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Card>
  );
};

export default QuestionCard;
