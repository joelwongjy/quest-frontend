import React, { useState } from 'react';
import {
  Button,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core';
import { format, formatDistanceToNow } from 'date-fns';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Link } from 'react-router-dom';

import { QuestComponentProps } from 'interfaces/components/common';
import QuestCard from 'componentWrappers/questCard';
import { MenuOption } from 'interfaces/components/questionnaireCard';
import { QUESTIONNAIRES, RESPONSES } from 'constants/routes';
import {
  QuestionnaireListData,
  QuestionnaireListDataType,
  QuestionnaireStatus,
} from 'interfaces/models/questionnaires';

import { useStyles } from './questionnaireCard.styles';

interface QuestionnaireCardProps extends QuestComponentProps {
  questionnaire: QuestionnaireListData;
  menuOptions?: MenuOption[];
}

const QuestionnaireCard: React.FunctionComponent<QuestionnaireCardProps> = ({
  questionnaire,
  menuOptions = null,
}) => {
  const classes = useStyles();
  const [anchorEle, setAnchorEle] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEle(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEle(null);
  };

  const renderStatus = (status: QuestionnaireStatus) => {
    switch (status) {
      case QuestionnaireStatus.DRAFT:
        return (
          <Typography
            className={classes.statusDraft}
            variant="body2"
            component="p"
          >
            Saved As Draft
          </Typography>
        );
      case QuestionnaireStatus.PUBLISHED:
        return (
          <Typography
            className={classes.statusPublished}
            variant="body2"
            component="p"
          >
            Published
          </Typography>
        );
      default:
        return null;
    }
  };

  const renderType = (type: QuestionnaireListDataType) => {
    return (
      <Typography
        className={classes.type}
        color="textSecondary"
        variant="body2"
        component="p"
      >
        {/* eslint-disable-next-line no-nested-ternary */}
        {type === QuestionnaireListDataType.ONE_TIME
          ? 'One-Time'
          : type === QuestionnaireListDataType.PRE
          ? 'Pre-Programme'
          : 'Post-Programme'}
      </Typography>
    );
  };

  return (
    <>
      <Typography className={classes.dates} color="textSecondary" gutterBottom>
        Last edited:{' '}
        {formatDistanceToNow(questionnaire.updatedAt, { addSuffix: true })}
      </Typography>
      <QuestCard>
        <CardHeader
          title={
            <>
              <Typography className={classes.dates} color="textSecondary">
                Start: {format(questionnaire.startAt as Date, 'd MMM y')}
              </Typography>
              <Typography
                className={classes.dates}
                color="textSecondary"
                gutterBottom
              >
                End: {format(questionnaire.endAt as Date, 'd MMM y')}
              </Typography>
            </>
          }
          action={
            menuOptions && (
              <>
                <IconButton
                  aria-label="more options"
                  aria-controls="more options"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id={`questionnaire-menu-${questionnaire.id}`}
                  anchorEl={anchorEle}
                  keepMounted
                  open={Boolean(anchorEle)}
                  onClose={handleClose}
                >
                  {menuOptions.map((m) => (
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        m.callback();
                      }}
                      key={`${m.text}-${questionnaire.id}`}
                    >
                      {m.text}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )
          }
        />
        <CardContent>
          <Typography
            className={classes.title}
            variant="h5"
            component="h2"
            noWrap
          >
            {questionnaire.name}
          </Typography>
          {renderStatus(questionnaire.status)}
          <Typography>{renderType(questionnaire.type)}</Typography>
        </CardContent>
        <CardActions className={classes.actions}>
          {questionnaire.status !== QuestionnaireStatus.PUBLISHED ? (
            <Button
              size="small"
              className={classes.button}
              component={Link}
              to={`${QUESTIONNAIRES}/${questionnaire.id}${RESPONSES}`}
            >
              View Responses
            </Button>
          ) : (
            <Button size="small" className={classes.button} disabled>
              View Responses
            </Button>
          )}
        </CardActions>
      </QuestCard>
    </>
  );
};

export default QuestionnaireCard;
