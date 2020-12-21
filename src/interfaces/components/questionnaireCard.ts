export interface MenuOption {
  text: string;
  callback: () => void;
}

export enum CardMode {
  STUDENT,
  STAFF,
}
