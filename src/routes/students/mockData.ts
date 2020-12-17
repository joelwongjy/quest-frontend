import { DiscardableData } from 'interfaces/models/base';
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
    // gender: 'M',
    // birthday: new Date(1979, 12, 12),
    // email: 'nick.fury@gmail.com',
  },
  {
    ...mockBaseData,
    id: 1,
    name: 'Steve Rogers',
    // gender: 'M',
    // birthday: new Date(1928, 12, 6),
    // email: 'steve.rogers@gmail.com',
  },
  {
    ...mockBaseData,
    id: 2,
    name: 'Natasha Romanoff',
    // gender: 'F',
    // birthday: new Date(1988, 5, 12),
    // email: 'nat.romanoff@gmail.com',
  },
  {
    ...mockBaseData,
    id: 3,
    name: 'Stephen Strange',
    // gender: 'M',
    // birthday: new Date(1982, 5, 12),
    // email: 'dr.strange@gmail.com',
  },
  {
    ...mockBaseData,
    id: 4,
    name: 'Tony Stark',
    // gender: 'M',
    // birthday: new Date(1983, 5, 12),
    // email: 'tony.stark@gmail.com',
  },
];
