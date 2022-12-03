import { CreateRapportInput } from './create-rapport.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateRapportInput extends PartialType(CreateRapportInput) 
{
  @Field(()=>Int)
  _id:number;

  @Field()
  NomIntervenant:String;

  @Field()
  ContenuRapport:String;

  @Field({nullable:false, defaultValue:true})
  Exist?:boolean
}

@InputType()
export class FindOneRapport extends PartialType(CreateRapportInput)
 {
  @Field(()=>Int)
  _id: number;
}