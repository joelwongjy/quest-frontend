import React, { useState } from 'react';
import {
  ButtonGroup,
  createMuiTheme,
  FormControl,
  FormHelperText,
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

import EditMcqQuestion from 'components/mcqQuestion/edit';
import { QuestComponentProps } from 'interfaces/components/common';
import { QuestionAccessibility } from 'interfaces/models/questionnaires';
import EditMoodQuestion from 'components/moodQuestion/edit';
import EditScaleQuestion from 'components/scaleQuestion/edit';
import { QuestionnaireDuxQuestion } from 'reducers/questionnaireDux';
import { QuestionType } from 'interfaces/models/questions';
import QuestionAccordion from 'components/questionAccordion';
import QuestTextField from 'componentWrappers/questTextField';
import { useError } from 'contexts/ErrorContext';

import { useStyles } from './editQuestionCard.styles';

interface EditQuestionCardProps extends QuestComponentProps {
  question: QuestionnaireDuxQuestion;
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

const EditQuestionCard: React.FC<EditQuestionCardProps> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  question,
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
}) => {
  const classes = useStyles();
  const { hasError } = useError();

  const [open, setOpen] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(
    mapAccessibilityToIndex(accessibility)
  );

  const hasQuestionTextError = hasError && question.questionText === '';
  const hasMcqOptionError =
    hasError &&
    question.questionType === QuestionType.MULTIPLE_CHOICE &&
    question.options.filter((q) => q.optionText !== '').length === 0;

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

  const updateText = (newText: string) => {
    const newQuestion = { ...question, questionText: newText };
    updateQuestion(newQuestion);
  };

  const dropdown = (
    <MuiThemeProvider theme={InputMuiTheme}>
      <FormControl
        className={classes.formControl}
        variant="outlined"
        size="small"
      >
        <InputLabel id={`dropdown-${question.duxId}`}>Type</InputLabel>
        <Select
          labelId={`dropdown-${question.duxId}`}
          id="dropdown-select"
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          value={question.questionType}
          onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
            event.preventDefault();
            updateQuestion({
              ...question,
              questionType: event.target.value as QuestionType,
            });
          }}
        >
          <MenuItem value={QuestionType.MULTIPLE_CHOICE}>MCQ</MenuItem>
          <MenuItem value={QuestionType.SHORT_ANSWER}>Short Ans</MenuItem>
          <MenuItem value={QuestionType.LONG_ANSWER}>Long Ans</MenuItem>
          <MenuItem value={QuestionType.MOOD}>Mood</MenuItem>
          <MenuItem value={QuestionType.SCALE}>Scale</MenuItem>
        </Select>
      </FormControl>
    </MuiThemeProvider>
  );

  const questionInput = (
    <FormControl
      style={{ width: '100%', marginRight: '1rem' }}
      error={hasQuestionTextError}
    >
      <QuestTextField
        required
        size="small"
        className={classes.textfield}
        label="Question"
        variant="outlined"
        value={question.questionText}
        onChange={(e) => updateText(e.target.value)}
      />
      {hasQuestionTextError && (
        <FormHelperText style={{ marginLeft: '0.5rem' }}>
          The question cannot be blank!
        </FormHelperText>
      )}
    </FormControl>
  );

  const questionBody = (() => {
    switch (question.questionType) {
      case QuestionType.SHORT_ANSWER:
        return (
          <QuestTextField
            disabled
            id={`disabled-${question.duxId}`}
            defaultValue="Short Answer"
          />
        );
      case QuestionType.LONG_ANSWER:
        return (
          <QuestTextField
            disabled
            id={`disabled-${question.duxId}`}
            defaultValue="Long Answer"
            rows={3}
          />
        );
      case QuestionType.MOOD:
        return <EditMoodQuestion />;
      case QuestionType.SCALE:
        return <EditScaleQuestion />;
      case QuestionType.MULTIPLE_CHOICE:
      default:
        return (
          <EditMcqQuestion
            question={question}
            updateQuestion={updateQuestion}
            alertCallback={alertCallback}
          />
        );
    }
  })();

  const buttons = (
    <Grid item xs={12} className={classes.actions}>
      <div>
        <IconButton
          aria-label="delete"
          onClick={handleDelete}
          style={{ color: 'red' }}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton
          aria-label="duplicate"
          onClick={handleDuplicate}
          style={{ color: 'grey' }}
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
  );

  return (
    <QuestionAccordion
      questionInput={questionInput}
      accessibility={accessibility}
      questionBody={questionBody}
      dropdown={dropdown}
      buttons={buttons}
      forceExpand={hasMcqOptionError}
    />
  );
};

export default EditQuestionCard;
