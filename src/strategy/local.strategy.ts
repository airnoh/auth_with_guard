import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import { loginDto } from 'src/dto/login.dto';
// import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor( private readonly authService: AuthService) {
    super({
        usernameField: 'email',
        passwordField: 'password',
      });
  }

  async validate(login:loginDto): Promise<any> {
    const {email, password}=login
    // const saltRounds = 10;
    //     const salt = bcrypt.genSaltSync(saltRounds);
    //     const hashPassword = await bcrypt.hash(password, 10);
    // const user = await this.userService.logUser({email, password:hashPassword});
    const user = await this.authService.validateUser(email, password)
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}