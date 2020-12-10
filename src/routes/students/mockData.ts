import { Student } from 'interfaces/models/students';
import { classes1, classes2, programmes } from 'routes/questionnaires/mockData';

export const students: Student[] = [
  {
    id: 0,
    name: 'Nick Fury',
    gender: 'M',
    birthday: new Date(1979, 12, 12),
    email: 'nick.fury@gmail.com',
    activities: [
      [programmes[0], classes1[0]],
      [programmes[1], classes2[0]],
      [programmes[1], classes2[1]],
    ],
  },
  {
    id: 1,
    name: 'Steve Rogers',
    gender: 'M',
    birthday: new Date(1928, 12, 6),
    email: 'steve.rogers@gmail.com',
    activities: [
      [programmes[0], classes1[1]],
      [programmes[1], classes2[1]],
    ],
  },
  {
    id: 2,
    name: 'Natasha Romanoff',
    gender: 'F',
    birthday: new Date(1988, 5, 12),
    email: 'nat.romanoff@gmail.com',
    activities: [
      [programmes[0], classes1[2]],
      [programmes[1], classes2[2]],
    ],
  },
  {
    id: 3,
    name: 'Stephen Strange',
    gender: 'M',
    birthday: new Date(1982, 5, 12),
    email: 'dr.strange@gmail.com',
    activities: [
      [programmes[0], classes1[0]],
      [programmes[1], classes2[0]],
    ],
  },
  {
    id: 4,
    name: 'Tony Stark',
    gender: 'M',
    birthday: new Date(1983, 5, 12),
    email: 'tony.stark@gmail.com',
    activities: [
      [programmes[0], classes1[0]],
      [programmes[1], classes2[0]],
    ],
  },
];
