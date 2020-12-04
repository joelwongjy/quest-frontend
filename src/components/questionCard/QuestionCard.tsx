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
  QuestionAccessibility,
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
  accessibility: QuestionAccessibility;
  updateAccessibility: (newAccessibility: QuestionAccessibility) => void;
  accessibilityEnabled: boolean;
}

const InputMuiTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#044682',
    },
  },
});

const accessibilityOptions = ['Shared', 'Pre-Program', 'Post-Program'];
const mapAccessibilityToIndex = (accessibility: QuestionAccessibility) => {
  switch (accessibility) {
    case QuestionAccessibility.PRE:
      return 1;
    case QuestionAccessibility.POST:
      return 2;
    case QuestionAccessibility.SHARED:
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
  accessibility,
  updateAccessibility,
  accessibilityEnabled,
  className,
}) => {
  const classes = useStyles();

  const [open, setOpen] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(
    mapAccessibilityToIndex(accessibility)
  );
  const handleUpdateAccessibility = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSelectedIndex(event.target.value as number);
    switch (event.target.value as number) {
      case 0:
        updateAccessibility(QuestionAccessibility.SHARED);
        break;
      case 1:
        updateAccessibility(QuestionAccessibility.PRE);
        break;
      case 2:
        updateAccessibility(QuestionAccessibility.POST);
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
        {accessibilityEnabled && (
          <FormControl variant="outlined" size="small">
            <Select
              id={`accessibility-select-${accessibility}`}
              value={selectedIndex}
              onChange={handleUpdateAccessibility}
            >
              <MenuItem value={0}>{accessibilityOptions[0]}</MenuItem>
              <MenuItem value={1}>{accessibilityOptions[1]}</MenuItem>
              <MenuItem value={2}>{accessibilityOptions[2]}</MenuItem>
            </Select>
          </FormControl>
        )}
      </Grid>
    </Card>
  );
};

export default QuestionCard;
