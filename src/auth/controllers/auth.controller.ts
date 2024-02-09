import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from '@/auth/guards/local-auth.guard';
import { AuthService } from '@/auth/auth.service';
import { RoleGuard } from '../guards/role/role.guard';
import { Roles } from '@/decorators/roles';
import { RoleEnum } from '@/enum/role.enum';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Roles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
