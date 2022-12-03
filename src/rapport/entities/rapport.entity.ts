import { ObjectType, Field, Int } from '@nestjs/graphql';
import mongoose from 'mongoose';
import { RapportService } from '../rapport.service';
import { Document } from 'mongoose';


export type RapportServiceDocument =  RapportService & Document;
export const RapportServiceSchema = new mongoose.Schema
({
  _id : Number,
  NomIntervenant : String,
  ContenuRapport:String,
  TitreRapport:String,
  IDMachine:String,
  NomMachine:String,
  IdTicket:Number,
  SocieteClient:String,
  Client:String,
  Exist:{type:Boolean,default:false},
},{timestamps: true});


@ObjectType()
export class Rapport 
{
  @Field(()=>Int)
  _id:number;

  @Field()
  NomIntervenant:String;

  @Field()
  ContenuRapport:String;

  @Field()
  TitreRapport:String;

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

  @Field({nullable:false, defaultValue:true})
  Exist?:boolean; 

  @Field({nullable:true})
  createdAt?:Date;

  @Field({nullable:true})
  updatedAt?:Date;
}
 