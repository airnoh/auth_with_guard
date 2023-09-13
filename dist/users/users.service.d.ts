import { signUpDto } from 'src/dto/signup.dto';
import { User } from 'src/entity/userEntity';
import { Repository } from 'typeorm';
import { loginDto } from 'src/dto/login.dto';
import { JwtService } from '@nestjs/jwt';
export declare class UsersService {
    private readonly userRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    signUp(payload: signUpDto): Promise<{
        firstName: string;
        lastName: string;
        email: string;
        password: string;
    } & User>;
    logUser(login: loginDto): Promise<{
        accessToken: string;
    }>;
    getUserCredentials({ email, password }: {
        email: any;
        password: any;
    }): Promise<User | undefined>;
    signToken(args: {
        id: number;
        email: string;
    }): Promise<{
        accessToken: string;
    }>;
    findUser(): Promise<User[]>;
}
