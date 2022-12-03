import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { LoginUserInput } from './dto/login-user-input';
import {LoginResponse} from './dto/login-response'

@Resolver(() => Auth)
export class AuthResolver {

  constructor(private readonly authService: AuthService) {}
  @Mutation(() => LoginResponse)
  login(@Args('LoginUserInput') loginUserInput: LoginUserInput) {
    return this.authService.login(loginUserInput);
  }
}
