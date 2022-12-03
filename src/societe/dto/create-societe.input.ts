import { InputType, Field } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class CreateSocieteInput {

  @Field({nullable:true})
  _id:Number;
  
  @Field()
  nomSociete: string;
  
  @Field()
  fix: string;
  
  @Field()
  @IsEmail()
  Email:string;
  
  @Field()
  gouvernerat:string;
  
  @Field()
  region: string;
  
  @Field()
  adresse: string;
  
  @Field({nullable:true, defaultValue:true})
  status?: boolean;

   /*@Field(() => [Int]) 
   idMachines: [];*/
}
