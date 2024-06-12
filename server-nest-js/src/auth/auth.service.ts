import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma, User } from '@prisma/client';
import Response from 'src/interfaces/response.interface';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(data: Prisma.UserCreateInput): Promise<Response<User>> {
    try {
      const registerUser = await this.usersService.create(data);
      if (!registerUser) throw new BadRequestException('Bad Request');

      return registerUser;
    } catch (error) {
      throw error;
    }
  }

  async validateUser(
    username: string,
    password: string,
  ): Promise<Response<User>> {
    try {
      const user = await this.usersService.findOneByUsername(username);
      if (!user.data) throw new UnauthorizedException('Wrong Credentials!');

      const isMatch = await bcrypt.compare(password, user.data.password);
      if (!isMatch) throw new UnauthorizedException('Wrong Credentials!');

      const payload = {
        sub: user.data.id,
        username: user.data.username,
        name: user.data.name,
      };
      const accessToken = await this.jwtService.signAsync(payload);

      delete user.data.password;

      return {
        ...user,
        accessToken,
      };
    } catch (error) {
      throw error;
    }
  }

  verifyToken(name: string) {
    return {
      statusCode: 200,
      message: 'OK',
      data: {
        name,
      },
    };
  }
}
