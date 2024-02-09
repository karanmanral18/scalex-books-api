import { RoleEnum } from '@/enum/role.enum';

export interface UserInterface {
  id: number;
  email: string;
  password: string;
  role: RoleEnum;
}
