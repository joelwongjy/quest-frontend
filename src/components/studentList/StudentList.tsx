import React from 'react';
import {
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';

import { QuestComponentProps } from 'interfaces/components/common';
import { PersonListData } from 'interfaces/models/persons';

import { useStyles } from './studentList.styles';

interface StudentListProps extends QuestComponentProps {
  students: PersonListData[];
  editCallback: (student: PersonListData) => void;
  deleteCallback: (student: PersonListData) => void;
}

const StudentList: React.FunctionComponent<StudentListProps> = ({
  students,
  editCallback,
  deleteCallback,
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
          {students.map((s) => {
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
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => editCallback(s)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => deleteCallback(s)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      </Paper>
    </div>
  );
};

export default StudentList;
