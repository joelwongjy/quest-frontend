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
  Link as MuiLink,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Link } from 'react-router-dom';

import QuestCard from 'componentWrappers/questCard';
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

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEle(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEle(null);
  };

  return (
    <QuestCard>
      <CardHeader
        title={
          <Typography className={classes.status} color="textSecondary">
            {`${programme.classCount} Classes`}
          </Typography>
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

      <MuiLink
        underline="none"
        component={Link}
        to={`${PROGRAMMES}/${programme.id}${CLASSES}`}
      >
        <CardContent>
          <Typography
            className={classes.title}
            variant="h5"
            component="h2"
            noWrap
          >
            {programme.name}
          </Typography>
          <Typography
            className={classes.description}
            variant="body2"
            component="p"
            color="textSecondary"
          >
            {programme.description ?? 'No description'}
          </Typography>
        </CardContent>

        <CardActions className={classes.actions}>
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
      </MuiLink>
    </QuestCard>
  );
};

export default ProgrammeCard;
