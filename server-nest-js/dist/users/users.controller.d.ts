import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(data: Prisma.UserCreateInput): Promise<import("../interfaces/response.interface").default<{
        id: string;
        username: string;
        password: string;
        name: string;
        created_at: Date;
        updated_at: Date;
    }>>;
    findAll(): Promise<import("../interfaces/response.interface").default<{
        id: string;
        username: string;
        password: string;
        name: string;
        created_at: Date;
        updated_at: Date;
    }[]>>;
    findOne(id: string): Promise<import("../interfaces/response.interface").default<{
        id: string;
        username: string;
        password: string;
        name: string;
        created_at: Date;
        updated_at: Date;
    }>>;
    update(id: string, data: Prisma.UserUpdateInput): Promise<import("../interfaces/response.interface").default<{
        id: string;
        username: string;
        password: string;
        name: string;
        created_at: Date;
        updated_at: Date;
    }>>;
    remove(id: string): Promise<import("../interfaces/response.interface").default<{
        id: string;
        username: string;
        password: string;
        name: string;
        created_at: Date;
        updated_at: Date;
    }>>;
}
