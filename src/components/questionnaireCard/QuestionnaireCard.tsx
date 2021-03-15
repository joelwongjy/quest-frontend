import React, { useState } from 'react';
import {
  Button,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
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
import { CardMode, MenuOption } from 'interfaces/components/questionnaireCard';
import { QUESTIONNAIRES, QUESTS, RESPONSES } from 'constants/routes';
import {
  QuestionnaireListData,
  QuestionnaireListDataType,
  QuestionnaireStatus,
} from 'interfaces/models/questionnaires';

import { getQuestStyle } from 'utils/questUtils';
import { useStyles } from './questionnaireCard.styles';

interface QuestionnaireCardProps extends QuestComponentProps {
  questionnaire: QuestionnaireListData;
  menuOptions?: MenuOption[];
  mode?: CardMode;
  programmeName?: string;
  isAttempted?: boolean;
  className?: string;
}

const QuestionnaireCard: React.FunctionComponent<QuestionnaireCardProps> = ({
  questionnaire,
  menuOptions = null,
  mode = CardMode.STAFF,
  programmeName = '',
  isAttempted = false,
  className = '',
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

  const renderProgramme = () => {
    return (
      <Typography
        className={classes.statusPublished}
        variant="body2"
        component="p"
      >
        {programmeName}
      </Typography>
    );
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

  if (mode === CardMode.STUDENT) {
    const questCardStyle = getQuestStyle();
    return (
      <QuestCard className={className}>
        <CardHeader
          title={
            <Grid container justify="center">
              <Typography variant="h4">{questionnaire.name}</Typography>
            </Grid>
          }
          style={{
            backgroundColor: questCardStyle[1],
          }}
        />
        <CardContent>
          <Grid container justify="center" style={{ marginBottom: '0.5rem' }}>
            <img src={questCardStyle[0]} alt="icon" />
          </Grid>
          {renderProgramme()}
          <Grid container justify="center">
            <Typography
              className={classes.dates}
              color="textSecondary"
              gutterBottom
            >
              {isAttempted
                ? 'Completed'
                : `Closes At: ${format(
                    questionnaire.endAt as Date,
                    'd MMM y'
                  )}`}
            </Typography>
          </Grid>
        </CardContent>
        <CardActions className={classes.actions}>
          {isAttempted ? (
            <Button
              size="small"
              component={Link}
              to={`${QUESTS}/${questionnaire.id}/window/${questionnaire.windowId}`}
            >
              View Attempt
            </Button>
          ) : (
            <Button
              size="small"
              component={Link}
              to={`${QUESTS}/${questionnaire.id}/window/${questionnaire.windowId}`}
            >
              Do Quest
            </Button>
          )}
        </CardActions>
      </QuestCard>
    );
  }

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
          <Button
            size="small"
            className={classes.button}
            component={Link}
            to={`${QUESTIONNAIRES}/${questionnaire.id}${RESPONSES}`}
          >
            View Responses
          </Button>
        </CardActions>
      </QuestCard>
    </>
  );
};

export default QuestionnaireCard;
