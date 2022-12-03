import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) 
{
  @Field()
  _id:string;

  @Field()
  nom: string;

  @Field()
  prenom: string;
  
  @Field()
  password: string;
  
  @Field()
  mail: string;
  
  @Field()
  societe: string;

  @Field()
  Numero_Telephone:string;
  
  @Field() // Active ou non active 
  status?: boolean;
  
  @Field()
  role?: string;
}


@InputType()
export class FindOneUser extends PartialType(CreateUserInput)
 {
  @Field()
  _id: string;
 }


@InputType()
export class FindOneName extends PartialType(CreateUserInput)
 {
  @Field()
  nom: string;
 }