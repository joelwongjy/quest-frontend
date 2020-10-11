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
import Card from 'components/card';
import {
  MenuOption,
  QuestionnaireCardInfo,
} from 'interfaces/components/questionnaireCard';
import { QUESTIONNAIRES, RESPONSES } from 'constants/routes';

import { useStyles } from './questionnaireCard.styles';

interface QuestionnaireCardProps extends QuestComponentProps {
  questionnaire: QuestionnaireCardInfo;
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

  const renderStatus = (status: 'DRAFT' | 'PUBLISHED'): string => {
    switch (status) {
      case 'DRAFT':
        return 'Saved As Draft';
      case 'PUBLISHED':
        return 'Published';
      default:
        return 'Recently Created';
    }
  };

  return (
    <>
      <Typography className={classes.dates} color="textSecondary" gutterBottom>
        Last edited:{' '}
        {formatDistanceToNow(questionnaire.lastEdited, { addSuffix: true })}
      </Typography>
      <Card>
        <CardHeader
          title={
            <>
              <Typography className={classes.dates} color="textSecondary">
                Start: {format(questionnaire.startDate, 'd MMM y')}
              </Typography>
              <Typography
                className={classes.dates}
                color="textSecondary"
                gutterBottom
              >
                End: {format(questionnaire.endDate, 'd MMM y')}
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
          <Typography
            className={classes.status}
            color="textSecondary"
            variant="body2"
            component="p"
          >
            {renderStatus(questionnaire.status)}
          </Typography>
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
      </Card>
    </>
  );
};

export default QuestionnaireCard;
