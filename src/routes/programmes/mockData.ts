import { DiscardableData } from 'interfaces/models/base';
import { ClassData, ClassListData } from 'interfaces/models/classes';
import { ProgrammeData, ProgrammeListData } from 'interfaces/models/programmes';
import { students, teachers } from 'routes/students/mockData';

const mockBaseData: DiscardableData = {
  id: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
  discardedAt: null,
};

export const programmes: ProgrammeListData[] = [
  {
    ...mockBaseData,
    id: 1,
    name: 'Synchronization',
    classCount: 2,
  },
  {
    ...mockBaseData,
    id: 2,
    name: 'Memory Management',
    classCount: 2,
  },
  {
    ...mockBaseData,
    id: 3,
    name: 'Process Management',
    classCount: 2,
  },
];

export const questClasses: ClassListData[] = [
  {
    ...mockBaseData,
    id: 1,
    name: 'Semaphores',
    studentCount: 2,
    teacherCount: 2,
  },
  {
    ...mockBaseData,
    id: 2,
    name: 'Pipes',
    studentCount: 2,
    teacherCount: 2,
  },
  {
    ...mockBaseData,
    id: 3,
    name: 'Signals',
    studentCount: 2,
    teacherCount: 2,
  },
];

export const questClasses2: ClassListData[] = [
  {
    ...mockBaseData,
    id: 4,
    name: 'Buddy System',
    studentCount: 2,
    teacherCount: 2,
  },
  {
    ...mockBaseData,
    id: 5,
    name: 'Fixed Size Partitioning',
    studentCount: 2,
    teacherCount: 2,
  },
  {
    ...mockBaseData,
    id: 6,
    name: 'Dynamic Partitioning',
    studentCount: 2,
    teacherCount: 2,
  },
];

export const sampleProgramme: ProgrammeData = {
  ...programmes[0],
  classes: questClasses,
  studentCount: 6,
  teacherCount: 2,
};

export const sampleClass: ClassData = {
  ...questClasses[0],
  programmeName: programmes[0].name,
  programmeId: programmes[0].id,
  students: [students[0], students[1]],
  teachers,
};
