import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateRapportInput
{

  @Field({nullable:true})
  _id:Number;

  @Field()
  NomIntervenant:String;

  @Field()
  ContenuRapport:String;

  @Field()
  TitreRapport:String;
///////////////////////////////////////////////////////
  @Field()
  Client:String;

  @Field()
  SocieteClient:String;

  @Field(()=>Int)
  IdTicket:Number;

  @Field()
  NomMachine:String;

  @Field()
  IDMachine:String;
////////////////////////////////////////////////////
  @Field({nullable:true})
  createdAt?:Date;

  @Field({nullable:true})
  updatedAt?:Date;

  @Field({nullable:false, defaultValue:true})
  Exist?:boolean;
}
