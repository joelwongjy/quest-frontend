import React, { useState } from 'react';
import {
  ButtonGroup,
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
import DuplicateIcon from '@material-ui/icons/AddToPhotos';
import UpIcon from '@material-ui/icons/ArrowUpward';
import DownIcon from '@material-ui/icons/ArrowDownward';

import QuestCard from 'componentWrappers/questCard';
import EditMcqQuestion from 'components/mcqQuestion/edit';
import { QuestComponentProps } from 'interfaces/components/common';
import {
  QuestionMode,
  QuestionAccessibility,
} from 'interfaces/models/questionnaires';
import EditShortAnswerQuestion from 'components/shortAnswerQuestion/edit';
import EditLongAnswerQuestion from 'components/longAnswerQuestion/edit';
import EditMoodQuestion from 'components/moodQuestion/edit';
import EditScaleQuestion from 'components/scaleQuestion/edit';
import { QuestionnaireDuxQuestion } from 'reducers/questionnaireDux';
import { QuestionType } from 'interfaces/models/questions';

import { useStyles } from './questionCard.styles';

interface QuestionCardProps extends QuestComponentProps {
  question: QuestionnaireDuxQuestion;
  mode: QuestionMode;
  handleDelete: () => void;
  handleDuplicate: () => void;
  handleMoveUp: () => void;
  handleMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
  updateQuestion: (newQuestion: QuestionnaireDuxQuestion) => void;
  accessibility: QuestionAccessibility;
  updateAccessibility: (newAccessibility: QuestionAccessibility) => void;
  accessibilityEnabled: boolean;
  alertCallback: (
    isAlertOpen: boolean,
    hasConfirm: boolean,
    alertHeader: string,
    alertMessage: string,
    confirmHandler: undefined | (() => void),
    cancelHandler: undefined | (() => void)
  ) => void;
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
  handleDuplicate,
  handleMoveUp,
  handleMoveDown,
  isFirst,
  isLast,
  updateQuestion,
  accessibility,
  updateAccessibility,
  accessibilityEnabled,
  alertCallback,
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
        <MenuItem value={QuestionType.SCALE}>Scale Question</MenuItem>
      </Select>
    </FormControl>
  );

  const renderQuestion = () => {
    if (mode === QuestionMode.EDIT || mode === QuestionMode.NEW) {
      switch (question.questionType) {
        case QuestionType.SHORT_ANSWER:
          return (
            <EditShortAnswerQuestion
              mode={mode}
              dropdown={dropdown}
              question={question}
              updateQuestion={updateQuestion}
            />
          );
        case QuestionType.LONG_ANSWER:
          return (
            <EditLongAnswerQuestion
              mode={mode}
              dropdown={dropdown}
              question={question}
              updateQuestion={updateQuestion}
            />
          );
        case QuestionType.MOOD:
          return (
            <EditMoodQuestion
              mode={mode}
              dropdown={dropdown}
              question={question}
              updateQuestion={updateQuestion}
            />
          );
        case QuestionType.SCALE:
          return (
            <EditScaleQuestion
              mode={mode}
              dropdown={dropdown}
              question={question}
              updateQuestion={updateQuestion}
            />
          );
        case QuestionType.MULTIPLE_CHOICE:
        default:
          return (
            <EditMcqQuestion
              mode={mode}
              dropdown={dropdown}
              question={question}
              updateQuestion={updateQuestion}
              alertCallback={alertCallback}
            />
          );
      }
    }
    return <></>;
  };

  return (
    <QuestCard className={className} key={question.duxId}>
      <MuiThemeProvider theme={InputMuiTheme}>
        {renderQuestion()}
      </MuiThemeProvider>
      <Grid item xs={12} className={classes.actions}>
        <div>
          <IconButton
            aria-label="delete"
            onClick={handleDelete}
            style={{ color: 'red' }}
            disabled={mode !== QuestionMode.EDIT && mode !== QuestionMode.NEW}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            aria-label="duplicate"
            onClick={handleDuplicate}
            style={{ color: 'grey' }}
            disabled={mode !== QuestionMode.EDIT && mode !== QuestionMode.NEW}
          >
            <DuplicateIcon />
          </IconButton>
        </div>
        <ButtonGroup variant="outlined">
          {!isFirst && (
            <IconButton aria-label="up" onClick={handleMoveUp}>
              <UpIcon />
            </IconButton>
          )}
          {!isLast && (
            <IconButton aria-label="up" onClick={handleMoveDown}>
              <DownIcon />
            </IconButton>
          )}
        </ButtonGroup>
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
    </QuestCard>
  );
};

export default QuestionCard;
