import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './constant/jwt.constant';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from 'src/strategy/local.strategy';
import { JwtStrategy } from './jwt/jwt.strategy';




@Module({
  imports: [UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
    // TypeOrmModule.forFeature([User])
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
