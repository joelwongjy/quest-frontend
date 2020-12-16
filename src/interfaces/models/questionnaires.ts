import { DiscardableData } from './base';

export enum QuestionnaireStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
}

export enum QuestionType {
  MULTIPLE_CHOICE = 'MULTIPLE CHOICE',
  MOOD = 'MOOD',
  SHORT_ANSWER = 'SHORT ANSWER',
  LONG_ANSWER = 'LONG ANSWER',
  SCALE = 'SCALE',
}

export enum QuestionAccessibility {
  SHARED = 'SHARED',
  PRE = 'PRE',
  POST = 'POST',
}

export enum QuestionnaireType {
  ONE_TIME = 'ONE TIME',
  PRE_POST = 'PRE POST',
}

export enum QuestionnaireListDataType {
  PRE = 'PRE',
  POST = 'POST',
  ONE_TIME = 'ONE TIME',
}

export enum QuestionMode {
  EDIT = 'EDIT',
  VIEW = 'VIEW',
  NEW = 'NEW',
}

export interface QuestionnaireListData extends DiscardableData {
  name: string;
  startAt: Date;
  endAt: Date;
  status: QuestionnaireStatus;
  type: QuestionnaireListDataType;
}

export interface OptionData {
  optionText: string;
}

export interface QuestionData extends DiscardableData {
  questionText: string;
  questionType: QuestionType;
  options: OptionData[];
}

export interface QuestionOrder extends QuestionData {
  qnOrderId?: number;
  order: number;
}

export interface QuestionSet {
  questions: QuestionOrder[];
}

export interface QuestionWindow extends QuestionSet {
  startAt: Date;
  endAt: Date;
}
