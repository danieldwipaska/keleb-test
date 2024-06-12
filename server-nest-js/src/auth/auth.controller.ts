import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Prisma } from '@prisma/client';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() data: Prisma.UserCreateInput) {
    return this.authService.register(data);
  }

  @Post('login')
  login(@Body() data: Prisma.UserCreateInput) {
    return this.authService.validateUser(data.username, data.password);
  }

  @UseGuards(AuthGuard)
  @Get('/verify')
  verify(@Request() req) {
    return this.authService.verifyToken(req.user.name);
  }
}
