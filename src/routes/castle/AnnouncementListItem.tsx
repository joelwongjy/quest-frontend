import React from 'react';
import { Chip } from '@material-ui/core';
import { format } from 'date-fns';

import { useUser } from 'contexts/UserContext';
import { QuestComponentProps } from 'interfaces/components/common';
import { AnnouncementListData } from 'interfaces/models/announcements';

import { useStyles } from './castle.styles';

interface AnnouncementListItemProps extends QuestComponentProps {
  announcement: AnnouncementListData;
}

const AnnouncementListItem: React.FC<AnnouncementListItemProps> = ({
  announcement,
}: AnnouncementListItemProps) => {
  const { user } = useUser();
  const classes = useStyles();
  return (
    <li className={classes.listItem}>
      <div className={classes.listItemTopLeftCorner}>
        <div className={classes.listItemSquare}>&nbsp;</div>
        <div className={classes.listItemSquare}>
          <div className={classes.listItemDot}>&nbsp;</div>
        </div>
        <div className={classes.listItemSquare}>
          <div className={classes.listItemDot}>&nbsp;</div>
        </div>
        <div className={classes.listItemBlankSquare}>&nbsp;</div>
      </div>
      <div className={classes.listItemTopRightCorner}>
        <div className={classes.listItemSquare}>
          <div className={classes.listItemDot}>&nbsp;</div>
        </div>
        <div className={classes.listItemSquare}>&nbsp;</div>
        <div className={classes.listItemBlankSquare}>&nbsp;</div>
        <div className={classes.listItemSquare}>
          <div className={classes.listItemDot}>&nbsp;</div>
        </div>
      </div>
      <div className={classes.listItemBottomLeftCorner}>
        <div className={classes.listItemSquare}>
          <div className={classes.listItemDot}>&nbsp;</div>
        </div>
        <div className={classes.listItemBlankSquare}>&nbsp;</div>
        <div className={classes.listItemSquare}>&nbsp;</div>
        <div className={classes.listItemSquare}>
          <div className={classes.listItemDot}>&nbsp;</div>
        </div>
      </div>
      <div className={classes.listItemBottomRightCorner}>
        <div className={classes.listItemBlankSquare}>&nbsp;</div>
        <div className={classes.listItemSquare}>
          <div className={classes.listItemDot}>&nbsp;</div>
        </div>
        <div className={classes.listItemSquare}>
          <div className={classes.listItemDot}>&nbsp;</div>
        </div>
        <div className={classes.listItemSquare}>&nbsp;</div>
      </div>
      <div className={classes.listItemTop}>
        <div>{format(new Date(announcement.startDate), 'dd MMM yyyy')}</div>
      </div>
      <div className={classes.listItemTitle}>{announcement.title}</div>
      <div className={classes.listItemBody}>{announcement.body}</div>
      <div className={classes.chipContainer}>
        {user?.programmes.map((p) =>
          p.classes
            .filter(
              (y) =>
                announcement.classesData.map((z) => z.id).indexOf(y.id) !== -1
            )
            .map((c) => (
              <Chip
                label={`${p.name} - ${c.name}`}
                key={`${p.id}-${c.id}`}
                style={{
                  margin: '4px',
                  backgroundColor: '#d3b488',
                  fontSize: '10px',
                }}
              />
            ))
        )}
      </div>
    </li>
  );
};

export default AnnouncementListItem;
