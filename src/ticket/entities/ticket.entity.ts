import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import mongoose, { Schema } from 'mongoose';
import { TicketService } from '../ticket.service';
import { Document } from 'mongoose';


export type TicketServiceDocument =  TicketService & Document;
export const TicketServiceSchema = new mongoose.Schema
({
  _id : Number,
  NomUser: String,
  NomSociete: String,
  NomMachine:String,
  Id_Machine:String,
  TextProbleme:String,
  TitreTicket:String,
  status1:{type: Boolean, default: true},
  statusChef:{type: Boolean, default:false},
  statusIntervenant:{type: Boolean, default:false},
  IDClient: {type: String, nullable:true},
  DateFin:  {type: Date, nullable:true},
  Niveau: {type: String, nullable:true},
  
},{timestamps: true});


@ObjectType()
export class Ticket {
  
  @Field(()=>Int) 
  _id: number;

  @Field({nullable:true})
  IDClient: string;

  @Field ()
  NomUser: string;

  @Field () 
  NomSociete: string;
  
  @Field()        
  NomMachine:string;
  
  @Field()        
  Id_Machine:string;
  
  @Field()
  TextProbleme:string;

  @Field()
  TitreTicket:string;

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

  @Field({nullable:true})
  createdAt?:Date;

  @Field({nullable:true})
  updatedAt?:Date;
}

@ObjectType()
export class UploadFileimage{
  @Field()
  name:string;
  @Field()
  image:string

}
