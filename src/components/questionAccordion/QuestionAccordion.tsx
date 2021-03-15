import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { adminTheme } from 'styles/theme';
import { QuestionAccessibility } from 'interfaces/models/questionnaires';

import { useStyles } from './questionAccordion.styles';

const Accordion = withStyles({
  root: {
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,
    },
    [adminTheme.breakpoints.down('md')]: {
      paddingLeft: 8,
      paddingRight: 8,
    },
  },
  content: {
    [adminTheme.breakpoints.down('md')]: {
      flexDirection: 'column-reverse',
    },
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 24,
    paddingRight: 24,
    [theme.breakpoints.down('md')]: {
      paddingLeft: 16,
      paddingRight: 16,
    },
  },
}))(MuiAccordionDetails);

const getBackgroundColor = (accessibility: QuestionAccessibility) => {
  switch (accessibility) {
    case QuestionAccessibility.PRE:
      return adminTheme.custom.questionBackground.pre;
    case QuestionAccessibility.POST:
      return adminTheme.custom.questionBackground.post;
    case QuestionAccessibility.SHARED:
    default:
      return adminTheme.custom.questionBackground.shared;
  }
};

interface QuestionAccordionProps {
  questionInput: React.ReactNode;
  dropdown: React.ReactNode;
  questionBody: React.ReactNode;
  buttons: React.ReactNode;
  accessibility: QuestionAccessibility;
  forceExpand?: boolean;
}

const QuestionAccordion: React.FC<QuestionAccordionProps> = ({
  questionInput,
  dropdown,
  questionBody,
  buttons,
  accessibility,
  forceExpand = false,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const classes = useStyles();

  const backgroundColor = getBackgroundColor(accessibility);

  const handleChange = (event: React.ChangeEvent<unknown>) => {
    if (event.target instanceof HTMLInputElement || event.defaultPrevented) {
      return;
    }
    setIsExpanded((state) => !state);
  };

  return (
    <div className={classes.container}>
      <Accordion expanded={forceExpand || isExpanded} onChange={handleChange}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="question-panel-summary"
          style={{ backgroundColor }}
        >
          {questionInput}
          {dropdown}
        </AccordionSummary>
        <AccordionDetails>
          <div>{questionBody}</div>
          <div>{buttons}</div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default QuestionAccordion;
