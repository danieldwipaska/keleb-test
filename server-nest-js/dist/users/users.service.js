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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { username: data.username },
            });
            if (user)
                throw new common_1.BadRequestException('Username Already Exists');
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
            }
            catch (error) {
                throw error;
            }
        }
        catch (error) {
            throw error;
        }
    }
    async findAll() {
        try {
            const users = await this.prisma.user.findMany();
            if (!users.length)
                throw new common_1.NotFoundException('Users not found');
            users.forEach((user) => {
                delete user.password;
            });
            return {
                statusCode: 200,
                message: 'OK',
                data: users,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async findOne(id) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    id,
                },
            });
            if (!user)
                throw new common_1.NotFoundException('User not found');
            return {
                statusCode: 200,
                message: 'OK',
                data: user,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async findOneByUsername(username) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { username },
            });
            return {
                statusCode: 200,
                message: 'OK',
                data: user,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async update(id, data) {
        try {
            const user = await this.prisma.user.update({
                where: {
                    id,
                },
                data,
            });
            if (!user)
                throw new common_1.NotFoundException('User not found');
            return {
                statusCode: 200,
                message: 'OK',
                data: user,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async remove(id) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    id,
                },
            });
            if (!user)
                throw new common_1.NotFoundException('User not found');
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
            }
            catch (error) {
                throw error;
            }
        }
        catch (error) {
            throw error;
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map