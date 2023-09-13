import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { signUpDto } from 'src/dto/signup.dto';
import { User } from 'src/entity/userEntity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { loginDto } from 'src/dto/login.dto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly userRepository:Repository<User>, private jwtService:JwtService){}

    async signUp(payload:signUpDto){
        const {firstName, lastName, email, password}=payload;

        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashPassword = await bcrypt.hashSync(password, salt);

        const user = await this.userRepository.findOne({where:{email:email}});
        if(user){
            throw new HttpException('sorry email already exist', 400);
        }


        const registeredUser = await this.userRepository.save({firstName, lastName, email, password:hashPassword})

        delete registeredUser.password;

        return registeredUser;

    }

    async logUser(login: loginDto){

        const {email, password}=login

        const user =  await this.userRepository.findOne({where:{email:email}});
        if(!user){
            throw new HttpException('wrong email', 400)
        }

        if(!await bcrypt.compare(password, (await user).password)){
            throw new HttpException('Wrong password', 400)
        };

        delete (await user).password;

        const token = this.signToken({id:user.id, email:user.email})

        if(!token){
            throw new UnauthorizedException()
        }

        return token;
    }


    async getUserCredentials({email, password}):Promise<User | undefined>{
        return this.userRepository.findOneBy({email, password})
    }

    async signToken(args:{id:number, email:string}){
        const payload = args;
        return {
            accessToken: this.jwtService.sign(payload)
        }

       }

       async findUser(){
        return this.userRepository.find()
       }
}
