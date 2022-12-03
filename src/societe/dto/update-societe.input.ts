import { CreateSocieteInput } from './create-societe.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsEmail, IsNumber } from 'class-validator';

@InputType()
export class UpdateSocieteInput extends PartialType(CreateSocieteInput) 
{
  @Field(()=>Int)
  _id: number;

  @Field({nullable:true})
  nomSociete: string;
  
  @Field({nullable:true})

  fix: string;
  
  @Field({nullable:true})
  @IsEmail()
  Email:string;
  
  
  @Field({nullable:true})
  gouvernerat:string;
  
  @Field({nullable:true})
  region: string;
  
  @Field({nullable:true})
  adresse: string;
  
  @Field({nullable:true, defaultValue:true})
  status?: boolean;
}

@InputType()
export class FindOneSociete extends PartialType(CreateSocieteInput)
 {
  @Field(()=>Int)
  _id: number;
}


@InputType()
export class FindOneSocieteName extends PartialType(CreateSocieteInput)
 {
  @Field()
  nomSociete:string;
}



