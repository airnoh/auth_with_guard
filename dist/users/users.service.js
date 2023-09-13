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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const userEntity_1 = require("../entity/userEntity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let UsersService = class UsersService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async signUp(payload) {
        const { firstName, lastName, email, password } = payload;
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashPassword = await bcrypt.hashSync(password, salt);
        const user = await this.userRepository.findOne({ where: { email: email } });
        if (user) {
            throw new common_1.HttpException('sorry email already exist', 400);
        }
        const registeredUser = await this.userRepository.save({ firstName, lastName, email, password: hashPassword });
        delete registeredUser.password;
        return registeredUser;
    }
    async logUser(login) {
        const { email, password } = login;
        const user = await this.userRepository.findOne({ where: { email: email } });
        if (!user) {
            throw new common_1.HttpException('wrong email', 400);
        }
        if (!await bcrypt.compare(password, (await user).password)) {
            throw new common_1.HttpException('Wrong password', 400);
        }
        ;
        delete (await user).password;
        const token = this.signToken({ id: user.id, email: user.email });
        if (!token) {
            throw new common_1.UnauthorizedException();
        }
        return token;
    }
    async getUserCredentials({ email, password }) {
        return this.userRepository.findOneBy({ email, password });
    }
    async signToken(args) {
        const payload = args;
        return {
            accessToken: this.jwtService.sign(payload)
        };
    }
    async findUser() {
        return this.userRepository.find();
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(userEntity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository, jwt_1.JwtService])
], UsersService);
//# sourceMappingURL=users.service.js.map