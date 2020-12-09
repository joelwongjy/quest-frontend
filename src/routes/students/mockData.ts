import { Student } from 'interfaces/models/students';

export const students: Student[] = [
  {
    id: 0,
    name: 'Nick Fury',
    gender: 'M',
    birthday: new Date(1979, 12, 12),
  },
  {
    id: 1,
    name: 'Steve Rogers',
    gender: 'M',
    birthday: new Date(1928, 12, 6),
  },
  {
    id: 2,
    name: 'Natasha Romanoff',
    gender: 'F',
    birthday: new Date(1988, 5, 12),
  },
  {
    id: 3,
    name: 'Stephen Strange',
    gender: 'M',
    birthday: new Date(1982, 5, 12),
  },
  {
    id: 4,
    name: 'Tony Stark',
    gender: 'M',
    birthday: new Date(1983, 5, 12),
  },
];
