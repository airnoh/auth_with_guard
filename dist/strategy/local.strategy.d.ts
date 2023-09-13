import { Strategy } from 'passport-local';
import { AuthService } from 'src/auth/auth.service';
import { loginDto } from 'src/dto/login.dto';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
    validate(login: loginDto): Promise<any>;
}
export {};
