import { DiscardableData } from './base';
import { ClassData } from './classes';
import { ProgrammeData } from './programmes';
import {
  QuestionPostData,
  QuestionSetData,
  QuestionSetPatchData,
  QuestionSetPostData,
} from './questions';

export enum QuestionnaireType {
  ONE_TIME = 'ONE TIME',
  PRE_POST = 'PRE POST',
}

export enum QuestionnaireListDataType {
  PRE = 'PRE',
  POST = 'POST',
  ONE_TIME = 'ONE TIME',
}

export enum QuestionnaireStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
}

export interface QuestionnairePostData {
  title: string;
  type: QuestionnaireType;
  questionWindows: QuestionnaireWindowPostData[];
  sharedQuestions: QuestionSetPostData;
  classes: number[];
  programmes: number[];
}

export interface QuestionnaireWindowPostData {
  startAt: Date | string;
  endAt: Date | string;
  questions: QuestionPostData[];
}

export interface QuestionnairePatchData
  extends Omit<QuestionnairePostData, 'questionWindows' | 'sharedQuestions'> {
  status: QuestionnaireStatus;
  questionnaireId: number; // do we need this?
  questionWindows: QuestionnaireWindowPatchData[];
  sharedQuestions?: QuestionSetPatchData;
}

export interface QuestionnaireListData extends DiscardableData {
  windowId: number;
  name: string;
  startAt: Date | string;
  endAt: Date | string;
  status: QuestionnaireStatus;
  type: QuestionnaireListDataType;
  programmes: { id: number; name: string }[];
  classes: { id: number; name: string }[];
}

export interface QuestionnaireId {
  id: number;
}

export interface QuestionnaireWindowId extends QuestionnaireId {
  windowId: string;
}

export interface QuestionnaireWindowData extends QuestionSetData {
  windowId: number;
  startAt: Date | string;
  endAt: Date | string;
}

export interface QuestionnaireWindowPatchData extends QuestionSetPatchData {
  windowId: number;
  startAt: Date | string;
  endAt: Date | string;
}

export interface QuestionnaireFullData extends QuestionnaireProgramClassData {
  title: string;
  type: QuestionnaireType;
  status: QuestionnaireStatus;
  questionnaireId: number;
  questionWindows: QuestionnaireWindowData[];
  sharedQuestions?: QuestionSetData;
}

export interface QuestionnaireOneWindowData
  extends Omit<QuestionnaireFullData, 'questionWindows'>,
    QuestionnaireWindowData {}

export interface QuestionnaireProgramClassData {
  programmes: ProgrammeData[];
  classes: ClassData[];
}

/* ================
 CUSTOM INTERFACES
================= */
export enum QuestionAccessibility {
  SHARED = 'SHARED',
  PRE = 'PRE',
  POST = 'POST',
}

export enum QuestionMode {
  EDIT = 'EDIT',
  VIEW = 'VIEW',
  NEW = 'NEW',
}

export enum QuestionnaireMode {
  EDIT = 'EDIT',
  CREATE = 'CREATE',
  DUPLICATE = 'DUPLICATE',
}
