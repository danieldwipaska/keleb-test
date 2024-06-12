import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import Response from 'src/interfaces/response.interface';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput): Promise<Response<User>> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { username: data.username },
      });
      if (user) throw new BadRequestException('Username Already Exists');

      const salt = await bcrypt.genSalt();
      data.password = await bcrypt.hash(data.password, salt);

      try {
        const newUser = await this.prisma.user.create({
          data,
        });

        delete newUser.password;

        return {
          statusCode: 201,
          message: 'CREATED',
          data: newUser,
        };
      } catch (error) {
        throw error;
      }
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<Response<User[]>> {
    try {
      const users = await this.prisma.user.findMany();
      if (!users.length) throw new NotFoundException('Users not found');

      users.forEach((user) => {
        delete user.password;
      });

      return {
        statusCode: 200,
        message: 'OK',
        data: users,
      };
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string): Promise<Response<User>> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id,
        },
      });
      if (!user) throw new NotFoundException('User not found');

      return {
        statusCode: 200,
        message: 'OK',
        data: user,
      };
    } catch (error) {
      throw error;
    }
  }

  async findOneByUsername(username: string): Promise<Response<User>> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { username },
      });

      return {
        statusCode: 200,
        message: 'OK',
        data: user,
      };
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: string,
    data: Prisma.UserUpdateInput,
  ): Promise<Response<User>> {
    try {
      const user = await this.prisma.user.update({
        where: {
          id,
        },
        data,
      });
      if (!user) throw new NotFoundException('User not found');

      return {
        statusCode: 200,
        message: 'OK',
        data: user,
      };
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string): Promise<Response<User>> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id,
        },
      });
      if (!user) throw new NotFoundException('User not found');

      try {
        const deletedUser = await this.prisma.user.delete({
          where: {
            id,
          },
        });

        return {
          statusCode: 200,
          message: 'OK',
          data: deletedUser,
        };
      } catch (error) {
        throw error;
      }
    } catch (error) {
      throw error;
    }
  }
}
