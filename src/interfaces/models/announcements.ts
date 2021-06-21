import { DiscardableData } from './base';

export interface AnnouncementListData extends DiscardableData {
  title: string;
  date: Date;
  body?: string | null;
  programmeData: {
    id: number;
    name: string;
  };
  classData: {
    id: number;
    name: string;
  };
}

export type AnnouncementData = AnnouncementListData;

export interface AnnouncementPostData {
  title: string;
  date: Date | string;
  body?: string | null;
  classId?: number | null;
  programmeId?: number | null;
}

export interface AnnouncementDeleteData {
  announcementId: number;
}

export interface AnnouncementPatchData {
  title: string;
  date: Date;
  body?: string | null;
}
