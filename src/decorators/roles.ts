import { SetMetadata } from '@nestjs/common/decorators';

// Decorator to set roles for routes/controllers
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
