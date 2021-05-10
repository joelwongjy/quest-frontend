import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import QuestAlert from 'componentWrappers/questAlert';
import QuestCard from 'componentWrappers/questCard';
import { CLASSES, PROGRAMMES, QUESTIONNAIRES } from 'constants/routes';
import { QuestComponentProps } from 'interfaces/components/common';
import { MenuOption } from 'interfaces/components/programmeCard';
import { ProgrammeListData } from 'interfaces/models/programmes';

import { useStyles } from './programmeCard.styles';

interface ProgrammeCardProps extends QuestComponentProps {
  programme: ProgrammeListData;
  menuOptions?: MenuOption[];
}

const ProgrammeCard: React.FunctionComponent<ProgrammeCardProps> = ({
  programme,
  menuOptions = null,
}) => {
  const classes = useStyles();
  const [anchorEle, setAnchorEle] = useState<null | HTMLElement>(null);
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);

  const toggleAlert = () => setIsAlertOpen((state: boolean) => !state);

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
                  id={`programme-menu-${programme.id}`}
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
                      key={`${m.text}-${programme.id}`}
                    >
                      {m.text}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )
          }
        />
        <CardActionArea onClick={toggleAlert}>
          <CardContent>
            <Typography
              className={classes.title}
              variant="h5"
              component="h2"
              noWrap
            >
              {programme.name}
            </Typography>
          </CardContent>
        </CardActionArea>
        <QuestAlert
          isAlertOpen={isAlertOpen}
          alertHeader={programme.name}
          alertMessage={programme.description ?? 'No description'}
          hasConfirm={false}
          closeHandler={toggleAlert}
        />

        <CardActions className={classes.actions}>
          <Button
            size="small"
            className={classes.button}
            component={Link}
            to={`${PROGRAMMES}/${programme.id}${CLASSES}`}
          >
            Classes
          </Button>
          <Button
            size="small"
            className={classes.button}
            component={Link}
            to={{
              pathname: `${PROGRAMMES}/${programme.id}${QUESTIONNAIRES}`,
            }}
          >
            Questionnaires
          </Button>
        </CardActions>
      </QuestCard>
    </>
  );
};

export default ProgrammeCard;
