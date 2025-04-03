import {UserRole} from './role.enum';

export class User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public role: UserRole
  ) {}
}
