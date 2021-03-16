import React from 'react';
import { format } from 'date-fns';

import { QuestComponentProps } from 'interfaces/components/common';

import { useStyles } from './castle.styles';

interface AnnouncementListItemProps extends QuestComponentProps {
  programmeName: string;
  studentClassName: string;
  date: Date;
  title: string;
  body: string;
}

const AnnouncementListItem: React.FC<AnnouncementListItemProps> = ({
  programmeName,
  studentClassName,
  date,
  title,
  body,
}: AnnouncementListItemProps) => {
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
        <div>
          {programmeName} - {studentClassName}
        </div>
        <div>{format(date, 'dd MMM yyyy')}</div>
      </div>
      <div className={classes.listItemTitle}>{title}</div>
      <div className={classes.listItemBody}>{body}</div>
    </li>
  );
};

export default AnnouncementListItem;
