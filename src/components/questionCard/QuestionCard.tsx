import EditMcqQuestion from 'components/mcqQuestion/edit';
import McqQuestion from 'components/mcqQuestion/view';
import React, { useRef, useState } from 'react';

import { QuestComponentProps } from 'interfaces/components/common';
import {
  Button,
  ButtonGroup,
  Card,
  ClickAwayListener,
  Grid,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Typography,
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import { Question } from 'interfaces/models/admin';
import EditShortAnswerQuestion from 'components/shortAnswerQuestion/edit';
import EditLongAnswerQuestion from 'components/longAnswerQuestion/edit';
import EditMoodQuestion from 'components/moodQuestion/edit';
import { useStyles } from './questionCard.styles';

interface QuestionCardProps extends QuestComponentProps {
  question: Question;
  questionIndex: number;
  mode: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionIndex,
  mode,
}) => {
  const classes = useStyles();

  const questionTypeOptions = [
    'Multiple Choice Question',
    'Short Answer Question',
    'Long Answer Question',
    'Mood Question',
  ];

  const questionTypes = ['MCQ', 'SA', 'LA', 'MQ'];

  const [open, setOpen] = useState<boolean>(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [type, setType] = useState<string>('MCQ');

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
    setOpen(false);
    setType(questionTypes[index]);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<Document, MouseEvent>) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  const renderQuestion = () => {
    if (mode === 'edit' || mode === 'new') {
      if (type === 'MCQ') {
        return <EditMcqQuestion />;
      }
      if (type === 'SA') {
        return <EditShortAnswerQuestion />;
      }
      if (type === 'LA') {
        return <EditLongAnswerQuestion />;
      }
      return <EditMoodQuestion />;
    }
    return <></>;
  };

  return (
    <Card>
      <Grid container justify="space-around">
        <Grid item xs={8}>
          <Typography
            className={classes.order}
          >{`Question ${questionIndex}:`}</Typography>
        </Grid>
        <Grid item xs alignItems="flex-end">
          <ButtonGroup
            variant="contained"
            color="primary"
            ref={anchorRef}
            aria-label="split button"
            className={classes.card}
          >
            <Button>{questionTypeOptions[selectedIndex]}</Button>
            <Button
              color="primary"
              size="small"
              aria-controls={open ? 'split-button-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-label="select merge strategy"
              aria-haspopup="menu"
              onClick={handleToggle}
            >
              <ArrowDropDownIcon />
            </Button>
          </ButtonGroup>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === 'bottom' ? 'center top' : 'center bottom',
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList id="split-button-menu">
                      {questionTypeOptions.map(
                        (
                          option: string | number | null | undefined,
                          index: number
                        ) => (
                          <MenuItem
                            key={option}
                            selected={index === selectedIndex}
                            onClick={(
                              event: React.MouseEvent<HTMLLIElement, MouseEvent>
                            ) => handleMenuItemClick(event, index)}
                          >
                            {option}
                          </MenuItem>
                        )
                      )}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </Grid>
      </Grid>

      {renderQuestion()}
    </Card>
  );
};

export default QuestionCard;
