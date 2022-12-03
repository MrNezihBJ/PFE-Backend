import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateMachineInput
{ 

  @Field({nullable:true})
  _id:Number;

  @Field()
  Serial_Number:String;
  
  @Field()
  nom_Societe:String;

  @Field()
  Nom_Machine:String;

  @Field()
  idMachine: String;

  @Field({nullable:false, defaultValue:true})
  Status?:boolean;

}
