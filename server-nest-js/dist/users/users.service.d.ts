import { Prisma, User } from '@prisma/client';
import Response from 'src/interfaces/response.interface';
import { PrismaService } from 'src/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.UserCreateInput): Promise<Response<User>>;
    findAll(): Promise<Response<User[]>>;
    findOne(id: string): Promise<Response<User>>;
    findOneByUsername(username: string): Promise<Response<User>>;
    update(id: string, data: Prisma.UserUpdateInput): Promise<Response<User>>;
    remove(id: string): Promise<Response<User>>;
}
