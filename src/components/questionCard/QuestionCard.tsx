import EditMcqQuestion from 'components/mcqQuestion/edit';
import React, { useRef, useState } from 'react';

import { QuestComponentProps } from 'interfaces/components/common';
import {
  Button,
  ButtonGroup,
  Card,
  ClickAwayListener,
  Grid,
  Grow,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Typography,
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import DeleteIcon from '@material-ui/icons/Delete';

import { QuestionData } from 'interfaces/models/questionnaires';
import EditShortAnswerQuestion from 'components/shortAnswerQuestion/edit';
import EditLongAnswerQuestion from 'components/longAnswerQuestion/edit';
import EditMoodQuestion from 'components/moodQuestion/edit';
import { useStyles } from './questionCard.styles';

interface QuestionCardProps extends QuestComponentProps {
  question: QuestionData;
  questionIndex: number;
  mode: string;
  handleDelete: () => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  question,
  questionIndex,
  mode,
  handleDelete,
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
        <Grid item xs={7}>
          <Typography
            className={classes.order}
          >{`Question ${questionIndex}:`}</Typography>
        </Grid>
        <Grid item xs={4} alignItems="flex-end">
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
        <Grid item xs={1} className={classes.bin}>
          <IconButton
            aria-label="delete"
            onClick={handleDelete}
            style={{ color: 'red' }}
          >
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>

      {renderQuestion()}
    </Card>
  );
};

export default QuestionCard;
