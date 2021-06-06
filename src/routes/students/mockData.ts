import { DiscardableData } from 'interfaces/models/base';
import { ClassPersonRole } from 'interfaces/models/classUsers';
import { Gender, PersonData } from 'interfaces/models/persons';

const mockBaseData: DiscardableData = {
  id: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
  discardedAt: null,
};

export const students: PersonData[] = [
  {
    ...mockBaseData,
    id: 0,
    name: 'Nick Fury',
    gender: Gender.MALE,
    programmes: [],
    highestClassRole: ClassPersonRole.STUDENT,
    relatives: [],
  },
  {
    ...mockBaseData,
    id: 1,
    name: 'Steve Rogers',
    gender: Gender.MALE,
    programmes: [],
    highestClassRole: ClassPersonRole.STUDENT,
    relatives: [],
  },
  {
    ...mockBaseData,
    id: 2,
    name: 'Natasha Romanoff',
    gender: Gender.FEMALE,
    programmes: [],
    highestClassRole: ClassPersonRole.STUDENT,
    relatives: [],
  },
  {
    ...mockBaseData,
    id: 3,
    name: 'Stephen Strange',
    gender: Gender.MALE,
    programmes: [],
    highestClassRole: ClassPersonRole.STUDENT,
    relatives: [],
  },
  {
    ...mockBaseData,
    id: 4,
    name: 'Tony Stark',
    gender: Gender.MALE,
    programmes: [],
    highestClassRole: ClassPersonRole.STUDENT,
    relatives: [],
  },
];

export const teachers: PersonData[] = [
  {
    ...mockBaseData,
    id: 0,
    name: 'Rick Stoner',
    gender: Gender.MALE,
    programmes: [],
    highestClassRole: ClassPersonRole.TEACHER,
    relatives: [],
  },
  {
    ...mockBaseData,
    id: 1,
    name: 'Timothy Dugan',
    gender: Gender.MALE,
    programmes: [],
    highestClassRole: ClassPersonRole.TEACHER,
    relatives: [],
  },
];
