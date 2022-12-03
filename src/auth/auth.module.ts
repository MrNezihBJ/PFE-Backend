/*
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
//import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { AuthResolver } from './auth.resolver';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [ 
    UserModule,
    PassportModule,
    JwtModule.register({
      signOptions: {expiresIn:'365d'},
      secret:'this-is-a-secret',
    })
  ],
 // providers: [AuthResolver, AuthService ,LocalStrategy,JwtModule]
})
export class AuthModule {}*/


import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      signOptions: { expiresIn: '365d' },
      secret: 'hide-me',
    }),
  ],
  providers: [LocalStrategy, AuthService, AuthResolver, JwtStrategy],
})
export class AuthModule {}









