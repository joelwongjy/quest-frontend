import { DiscardableData } from 'interfaces/models/base';
import { ClassUserRole } from 'interfaces/models/classUsers';
import { PersonListData } from 'interfaces/models/persons';

const mockBaseData: DiscardableData = {
  id: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
  discardedAt: null,
};

export const students: PersonListData[] = [
  {
    ...mockBaseData,
    id: 0,
    name: 'Nick Fury',
    gender: 'M',
    programmes: [],
    highestClassRole: ClassUserRole.STUDENT,
  },
  {
    ...mockBaseData,
    id: 1,
    name: 'Steve Rogers',
    gender: 'M',
    programmes: [],
    highestClassRole: ClassUserRole.STUDENT,
  },
  {
    ...mockBaseData,
    id: 2,
    name: 'Natasha Romanoff',
    gender: 'F',
    programmes: [],
    highestClassRole: ClassUserRole.STUDENT,
  },
  {
    ...mockBaseData,
    id: 3,
    name: 'Stephen Strange',
    gender: 'M',
    programmes: [],
    highestClassRole: ClassUserRole.STUDENT,
  },
  {
    ...mockBaseData,
    id: 4,
    name: 'Tony Stark',
    gender: 'M',
    programmes: [],
    highestClassRole: ClassUserRole.STUDENT,
  },
];

export const teachers: PersonListData[] = [
  {
    ...mockBaseData,
    id: 0,
    name: 'Rick Stoner',
    gender: 'M',
    programmes: [],
    highestClassRole: ClassUserRole.TEACHER,
  },
  {
    ...mockBaseData,
    id: 1,
    name: 'Timothy Dugan',
    gender: 'M',
    programmes: [],
    highestClassRole: ClassUserRole.TEACHER,
  },
];
