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
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Link } from 'react-router-dom';

import QuestCard from 'componentWrappers/questCard';
import { QuestComponentProps } from 'interfaces/components/common';
import { MenuOption } from 'interfaces/components/programmeCard';
import {
  QUESTIONNAIRES,
  PROGRAMMES,
  CLASSES,
  STUDENTS,
} from 'constants/routes';
import { ClassListData } from 'interfaces/models/classes';

import { useStyles } from './classCard.styles';

interface ClassCardProps extends QuestComponentProps {
  questClass: ClassListData;
  menuOptions?: MenuOption[];
}

const ClassCard: React.FunctionComponent<ClassCardProps> = ({
  questClass,
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
      <QuestCard>
        <CardHeader
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
        <CardContent>
          <Typography
            className={classes.title}
            variant="h5"
            component="h2"
            noWrap
          >
            {questClass.name}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions}>
          <Button
            size="small"
            className={classes.button}
            component={Link}
            to={`${PROGRAMMES}/${questClass.id}/${CLASSES}/${STUDENTS}`}
          >
            Students
          </Button>
          <Button
            size="small"
            className={classes.button}
            component={Link}
            to={`${PROGRAMMES}/${questClass.id}/${QUESTIONNAIRES}`}
          >
            Questionnaires
          </Button>
        </CardActions>
      </QuestCard>
    </>
  );
};

export default ClassCard;
