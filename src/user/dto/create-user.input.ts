import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {

  @Field({nullable:true})
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
  
  @Field({nullable:true, defaultValue:"client"})
  role: string;
  
  @Field({nullable:true, defaultValue:true})                                                                  
  status: boolean;

  @Field({nullable:true, defaultValue:false})
  landingpage :boolean;
}
