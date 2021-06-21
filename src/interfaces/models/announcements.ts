import { DiscardableData } from './base';

export interface AnnouncementListData extends DiscardableData {
  title: string;
  startDate: Date;
  endDate: Date;
  body?: string | null;
  programmesData: {
    id: number;
    name: string;
  }[];
  classesData: {
    id: number;
    name: string;
  }[];
}

export type AnnouncementData = AnnouncementListData;

export interface AnnouncementPostData {
  title: string;
  startDate: Date | string;
  endDate: Date | string;
  body?: string | null;
  programmeIds: number[];
  classIds: number[];
}

export interface AnnouncementDeleteData {
  id: number;
}

export interface AnnouncementPatchData {
  title?: string;
  startDate?: Date;
  endDate?: Date;
  body?: string | null;
}

export enum AnnouncementMode {
  EDIT = 'EDIT',
  NEW = 'NEW',
}
