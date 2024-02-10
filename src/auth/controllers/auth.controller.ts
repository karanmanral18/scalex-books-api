import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { LocalAuthGuard } from '@/auth/guards/local-auth.guard';
import { AuthService } from '@/auth/auth.service';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { LoginDto } from '@/dtos/loginDto';

@ApiHeader({
  name: 'accept',
  allowEmptyValue: false,
  required: true,
  schema: {
    type: 'string',
    enum: ['application/json'],
  },
})
@ApiTags('Authorization Management')
@Controller('')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Request() req) {
    return this.authService.login(req.user);
  }
}
