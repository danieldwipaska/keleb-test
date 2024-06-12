"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async register(data) {
        try {
            const registerUser = await this.usersService.create(data);
            if (!registerUser)
                throw new common_1.BadRequestException('Bad Request');
            return registerUser;
        }
        catch (error) {
            throw error;
        }
    }
    async validateUser(username, password) {
        try {
            const user = await this.usersService.findOneByUsername(username);
            if (!user.data)
                throw new common_1.UnauthorizedException('Wrong Credentials!');
            const isMatch = await bcrypt.compare(password, user.data.password);
            if (!isMatch)
                throw new common_1.UnauthorizedException('Wrong Credentials!');
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
        }
        catch (error) {
            throw error;
        }
    }
    verifyToken(name) {
        return {
            statusCode: 200,
            message: 'OK',
            data: {
                name,
            },
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map