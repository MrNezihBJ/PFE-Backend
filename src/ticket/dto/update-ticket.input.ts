import { CreateTicketInput } from './create-ticket.input';
import { InputType, Field, Int, PartialType, ObjectType } from '@nestjs/graphql';
import { Stream } from 'stream';

@InputType()
export class UpdateTicketInput extends PartialType(CreateTicketInput) {

  @Field(()=>Int)
  _id:number;
  @Field ()
  NomUser: string;
  @Field({nullable:true})
  IDClient: string;
  @Field () 
  NomSociete: String;
  @Field()        
  NomMachine:string;
  @Field()        
  Id_Machine:string;
  @Field()
  TextProbleme:String;
  @Field()
  TitreTicket:String;
  @Field({nullable:true})
  DateFin:Date;
  @Field({nullable:true})
  Niveau:string;
  @Field({nullable:true, defaultValue:true}) 
  status1?: boolean;
  @Field({nullable:true, defaultValue:false}) 
  statusChef?: boolean;
  @Field({nullable:true, defaultValue:false})
  statusIntervenant?: boolean;
}

@InputType()
export class NiveauTempsInput extends PartialType(CreateTicketInput) 
{
  @Field(()=>Int)
  _id: number;
  @Field({nullable:true})
  Niveau:string;
  @Field({nullable:true})
  DateFin:Date;
  @Field({nullable:true, defaultValue:false}) 
  statusChef?: boolean;
}


@InputType()
export class FindOneTicketID extends PartialType(CreateTicketInput)
 {
  @Field(()=>Int)
  _id: number;
}


@InputType()
export class TicketIdInput extends PartialType(CreateTicketInput)
 {
  @Field(()=>Int)
  _id: number;
}


export interface FileUpload 
{
filename: string;
mimetype: string;
encoding: string;
createReadStream: () => Stream;
}

