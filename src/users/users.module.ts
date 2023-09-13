import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/userEntity';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from 'src/auth/constant/jwt.constant';
import { LocalStrategy } from 'src/strategy/local.strategy';
import { JwtStrategy } from 'src/auth/jwt/jwt.strategy';

@Module({
  imports:[
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
    TypeOrmModule.forFeature([User])
  ],
  providers: [UsersService],
  exports:[UsersService]
})
export class UsersModule {}
