import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateMachineInput } from './create-machine.input';

@InputType()
export class UpdateMachineInput extends PartialType(CreateMachineInput) 
{
  @Field(()=>Int)
  _id:number;

  @Field()
  Serial_Number:String;

  @Field()
  nom_Societe:String;

  @Field()
  Nom_Machine:String;

  @Field()
  idMachine:String;

  @Field({nullable:false, defaultValue:true})
  Status?:boolean;
} 

