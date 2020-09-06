export default interface User {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  discardedAt: Date | null;
  username: string;
  name: string;
}
