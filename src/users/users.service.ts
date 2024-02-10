import { Injectable } from '@nestjs/common';
import { RoleEnum } from '@/enum/role.enum';
import { UserInterface } from '@/interfaces/user.interface';

@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: 1,
      email: 'admin@scalex.club',
      password: 'admin@123#',
      role: RoleEnum.ADMIN,
    },
    {
      id: 2,
      email: 'harry@scalex.club',
      password: 'harry@123#',
      role: RoleEnum.CUSTOMER,
    },
    {
      id: 3,
      email: 'keith@scalex.club',
      password: 'keith@123#',
      role: RoleEnum.CUSTOMER,
    },
    {
      id: 4,
      email: 'lucas@scalex.club',
      password: 'lucas@123#',
      role: RoleEnum.CUSTOMER,
    },
  ];

  async findOne(email: string): Promise<UserInterface | undefined> {
    return this.users.find((user) => user.email === email);
  }
}
