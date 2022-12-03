import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserInput } from './dto/login-user-input';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email);

    if (user) {      
      const matchpassword = await bcrypt.compare(password, user.password);
      if (matchpassword) {
        const { password, ...result } = user;
        console.log("pass of validateUser ",password)
        return result;
      }
    }
    return null;
  }
  async login(loginUserInput: LoginUserInput) {
    const user = await this.userService.findOne(loginUserInput.mail);
    const { password, ...result } = user;
    const matchpassword = await bcrypt.compare(loginUserInput.password, password);
      
    ///user._id=user._id.valueOf()
    console.log("user from auth service",user._id);
    const id=user._id.valueOf();
     user["_id"]=id
    console.log("user from auth service",user._id,id);

    console.log('%cauth.service.ts line:37 user', 'color: #007acc;', user);
    if(matchpassword)
    return {
      access_token: this.jwtService.sign({
        email: user.mail,
        sub: user.id,
        role: user.role,
        societeNom:user.societe,
        nom:user.nom
      }),
      user:{
        mail: user.mail,
        prenom: user.prenom,
        role: user.role,
        societeNom:user.societe,
        nom:user.nom,
        _id:user._id,    
        landingpage:user.landingpage
       }
      ,
    };
 

  }
}