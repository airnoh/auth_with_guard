import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { signUpDto } from 'src/dto/signup.dto';
export declare class AuthController {
    private authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UsersService);
    signUsers(payload: signUpDto): Promise<{
        firstName: string;
        lastName: string;
        email: string;
        password: string;
    } & import("../entity/userEntity").User>;
    login(payload: any, req: any): Promise<{
        accessToken: string;
    }>;
    getProfile(): Promise<import("../entity/userEntity").User[]>;
}
