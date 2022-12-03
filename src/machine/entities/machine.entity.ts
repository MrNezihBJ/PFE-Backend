import { ObjectType, Field, Int } from '@nestjs/graphql';
import   mongoose from 'mongoose';
import { Document } from 'mongoose';


export type MachineDocument =  Machine & Document;
export const MachineSchema = new mongoose.Schema
({
  _id:Number,
  Serial_Number:String,
  Nom_Machine:String,
  idMachine:String,
  nom_Societe:String,
  Status:Boolean,
},{timestamps: true});


@ObjectType()
export class Machine 
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