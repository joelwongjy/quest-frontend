import React, { useState } from 'react';
import {
  CardContent,
  CardHeader,
  Chip,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { format } from 'date-fns';

import QuestCard from 'componentWrappers/questCard';
import { useUser } from 'contexts/UserContext';
import { QuestComponentProps } from 'interfaces/components/common';
import { AnnouncementData } from 'interfaces/models/announcements';

import { useStyles } from './announcementCard.styles';

interface AnnouncementCardProps extends QuestComponentProps {
  announcement: AnnouncementData;
  deleteCallback: () => void;
  editCallback: () => void;
}

const AnnouncementCard: React.FunctionComponent<AnnouncementCardProps> = ({
  announcement,
  deleteCallback,
  editCallback,
}) => {
  const classes = useStyles();
  const { user } = useUser();
  const [anchorEle, setAnchorEle] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEle(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEle(null);
  };

  return (
    <>
      <QuestCard
        key={announcement.id}
        style={{ marginBottom: '2rem' }}
        id={`announcement-${announcement.id}`}
      >
        <CardHeader
          title={
            <>
              <Typography className={classes.dates} color="textSecondary">
                {`Start: ${format(
                  new Date(announcement.startDate),
                  'd MMM y, h:mm a'
                )}`}
              </Typography>
              <Typography
                className={classes.dates}
                color="textSecondary"
                gutterBottom
              >
                {`End: ${format(
                  new Date(announcement.endDate),
                  "d MMM y, h:mm a'"
                )}`}
              </Typography>
            </>
          }
          action={
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
                anchorEl={anchorEle}
                keepMounted
                open={Boolean(anchorEle)}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={() => {
                    handleClose();
                    editCallback();
                  }}
                >
                  Edit
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    deleteCallback();
                  }}
                >
                  Delete
                </MenuItem>
              </Menu>
            </>
          }
        />
        <CardContent>
          <Grid container justify="center">
            <Typography
              className="This is an announcement"
              variant="h5"
              component="h2"
              style={{ fontWeight: 'bold' }}
            >
              {announcement.title}
            </Typography>
          </Grid>
          <Grid
            container
            justify="center"
            style={{ padding: '1rem', textAlign: 'center' }}
          >
            <Typography className="This is an announcement">
              {announcement.body}
            </Typography>
          </Grid>
          <div className={classes.chipContainer}>
            {user?.programmes.map((p) =>
              p.classes
                .filter(
                  (y) =>
                    announcement.classesData.map((z) => z.id).indexOf(y.id) !==
                    -1
                )
                .map((c) => (
                  <Chip
                    label={`${p.name} - ${c.name}`}
                    key={`${p.id}-${c.id}`}
                    style={{
                      margin: '5px',
                    }}
                    color="secondary"
                  />
                ))
            )}
          </div>
        </CardContent>
      </QuestCard>
    </>
  );
};

export default AnnouncementCard;
