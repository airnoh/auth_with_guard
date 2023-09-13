import { Controller, Post, UseGuards, Request, Get, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local.auth.guard';
import { JwtAuthGuard } from './guard/jwt.guard';
import { UsersService } from 'src/users/users.service';
import { signUpDto } from 'src/dto/signup.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private readonly userService:UsersService) {}

    @Post()
    async signUsers(@Body()payload: signUpDto){
        return this.userService.signUp(payload)
    }

    // @UseGuards(LocalAuthGuard)
    // @Post('login')
    // async login(@Body()payload, @Request() req) {
    //   return this.userService.logUser(payload)
    // }

    @Post('login')
    async login(@Body()payload, @Request() req) {
      return this.authService.login(payload)
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    getProfile() {
      return this.userService.findUser()
    }
}
