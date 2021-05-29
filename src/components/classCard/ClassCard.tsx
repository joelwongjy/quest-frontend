import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Link as MuiLink,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import QuestCard from 'componentWrappers/questCard';
import {
  CLASSES,
  PROGRAMMES,
  QUESTIONNAIRES,
  STUDENTS,
} from 'constants/routes';
import { QuestComponentProps } from 'interfaces/components/common';
import { MenuOption } from 'interfaces/components/programmeCard';
import { ClassListData } from 'interfaces/models/classes';

import { useStyles } from './classCard.styles';

interface ClassCardProps extends QuestComponentProps {
  questClass: ClassListData;
  menuOptions?: MenuOption[];
  programmeId: number;
}

const ClassCard: React.FunctionComponent<ClassCardProps> = ({
  questClass,
  programmeId,
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

  return (
    <>
      <QuestCard hover>
        <CardHeader
          title={
            <Button
              size="small"
              className={classes.button}
              component={Link}
              to={`${PROGRAMMES}/${programmeId}${CLASSES}/${questClass.id}${STUDENTS}`}
            >
              {`${questClass.studentCount} ${
                questClass.studentCount !== 1 ? 'Students' : 'Student'
              }`}
            </Button>
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
                  id={`programme-menu-${questClass.id}`}
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
                      key={`${m.text}-${questClass.id}`}
                    >
                      {m.text}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )
          }
        />
        <MuiLink
          underline="none"
          component={Link}
          to={`${PROGRAMMES}/${programmeId}${CLASSES}/${questClass.id}${STUDENTS}`}
        >
          <CardContent>
            <Typography
              className={classes.title}
              variant="h5"
              component="h2"
              noWrap
            >
              {questClass.name}
            </Typography>
            <Typography
              className={classes.description}
              variant="body2"
              component="p"
              color="textSecondary"
            >
              {questClass.description === '' ||
              questClass.description === undefined
                ? 'No description'
                : questClass.description}
            </Typography>
          </CardContent>
          <CardActions className={classes.actions}>
            <Button
              size="small"
              className={classes.button}
              component={Link}
              to={`${PROGRAMMES}/${programmeId}${CLASSES}/${questClass.id}${QUESTIONNAIRES}`}
            >
              Questionnaires
            </Button>
          </CardActions>
        </MuiLink>
      </QuestCard>
    </>
  );
};

export default ClassCard;
