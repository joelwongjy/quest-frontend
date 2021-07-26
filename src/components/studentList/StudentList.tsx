import React from 'react';
import { List, ListItem, ListItemText, Paper } from '@material-ui/core';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';

import { QuestComponentProps } from 'interfaces/components/common';
import { PersonListData } from 'interfaces/models/persons';
import { sortByName } from 'utils/sortingUtils';

import { useStyles } from './studentList.styles';

interface StudentListProps extends QuestComponentProps {
  students: PersonListData[];
}

const StudentList: React.FunctionComponent<StudentListProps> = ({
  students,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.paperContainer}>
      <Paper
        className={classes.paper}
        elevation={0}
        style={{ background: 'white' }}
      >
        <List className={classes.list}>
          {students
            .slice()
            .sort(sortByName)
            .map((s) => {
              return (
                <ListItem key={s.name} className={classes.item}>
                  <EmojiPeopleIcon
                    style={{
                      fontSize: 28,
                      // marginTop: '0.25rem',
                      // marginLeft: '0.25rem',
                    }}
                  />
                  <ListItemText
                    primary={s.name}
                    primaryTypographyProps={{
                      style: { paddingLeft: '1rem', fontSize: 16 },
                    }}
                    // secondary={
                    //   <List dense>
                    //     {s.activities?.map((a) => {
                    //       return (
                    //         <ListItem key={`${a[0].id}-${a[1].id}`}>
                    //           <Typography>{`${a[0].name} - ${a[1].name}`}</Typography>
                    //         </ListItem>
                    //       );
                    //     })}
                    //   </List>
                    // }
                  />
                </ListItem>
              );
            })}
        </List>
      </Paper>
    </div>
  );
};

export default StudentList;
