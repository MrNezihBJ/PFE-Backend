import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'hide-me',
    });
  }
  async validate(payload: any) {
    // Decode JWT
    console.log(payload,'payload');
    
    return { 
      userId: payload.sub, 
      email: payload.email, 
      role: payload.role,
      societeNom:payload.societe,
      nom:payload.nom 
    };
  }
}
// to change societeNom