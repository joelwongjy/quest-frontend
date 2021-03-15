import { PersonData } from 'interfaces/models/persons';

type UserContextInterface = {
  user: PersonData | null;
  isStaff: boolean;
};

export default UserContextInterface;
