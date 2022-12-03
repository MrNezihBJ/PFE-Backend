import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class LoginUserInput
{
  @Field()
  mail:string
  
  @Field()
  password:string;
}
