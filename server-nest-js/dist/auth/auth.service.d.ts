import { JwtService } from '@nestjs/jwt';
import { Prisma, User } from '@prisma/client';
import Response from 'src/interfaces/response.interface';
import { UsersService } from 'src/users/users.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    register(data: Prisma.UserCreateInput): Promise<Response<User>>;
    validateUser(username: string, password: string): Promise<Response<User>>;
    verifyToken(name: string): {
        statusCode: number;
        message: string;
        data: {
            name: string;
        };
    };
}
