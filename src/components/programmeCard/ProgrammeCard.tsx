import React, { useState } from 'react';
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
import { format } from 'date-fns';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Link } from 'react-router-dom';

import QuestCard from 'componentWrappers/questCard';
import QuestModal from 'componentWrappers/questModal';
import { QuestComponentProps } from 'interfaces/components/common';
import { MenuOption } from 'interfaces/components/programmeCard';
import { QUESTIONNAIRES, PROGRAMMES, CLASSES } from 'constants/routes';
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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toggleModal = () => setIsModalOpen((state: boolean) => !state);

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
          title={
            <>
              <Typography className={classes.dates} color="textSecondary">
                Start: {format(programme.startAt, 'd MMM y')}
              </Typography>
              <Typography
                className={classes.dates}
                color="textSecondary"
                gutterBottom
              >
                End: {format(programme.endAt, 'd MMM y')}
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
        <CardActionArea onClick={toggleModal}>
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
        <QuestModal
          name={programme.name}
          description={programme.description}
          isModalOpen={isModalOpen}
          toggleModal={toggleModal}
        />

        <CardActions className={classes.actions}>
          <Button
            size="small"
            className={classes.button}
            component={Link}
            to={`${PROGRAMMES}/${programme.id}/${CLASSES}`}
          >
            Classes
          </Button>
          <Button
            size="small"
            className={classes.button}
            component={Link}
            to={`${PROGRAMMES}/${programme.id}/${QUESTIONNAIRES}`}
          >
            Questionnaires
          </Button>
        </CardActions>
      </QuestCard>
    </>
  );
};

export default ProgrammeCard;
