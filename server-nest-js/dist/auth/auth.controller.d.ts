import { AuthService } from './auth.service';
import { Prisma } from '@prisma/client';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(data: Prisma.UserCreateInput): Promise<import("../interfaces/response.interface").default<{
        id: string;
        username: string;
        password: string;
        name: string;
        created_at: Date;
        updated_at: Date;
    }>>;
    login(data: Prisma.UserCreateInput): Promise<import("../interfaces/response.interface").default<{
        id: string;
        username: string;
        password: string;
        name: string;
        created_at: Date;
        updated_at: Date;
    }>>;
    verify(req: any): {
        statusCode: number;
        message: string;
        data: {
            name: string;
        };
    };
}
