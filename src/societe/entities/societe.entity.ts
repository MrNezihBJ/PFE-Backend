import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsEmail, IsNumber } from 'class-validator';
import mongoose from 'mongoose';
import { SocieteService } from '../societe.service';
import { Document } from 'mongoose';

export type SocieteServiceDocument =  SocieteService & Document;
export const SocieteServiceSchema = new mongoose.Schema
({
  _id: Number,
  nomSociete: String,
  fix: String,
  Email:String,
  gouvernerat:String,
  region: String,
  adresse: String,
  status: Boolean,
},{timestamps: true});


@ObjectType()
export class Societe 
{  
  @Field(()=>Int)
  _id: number;

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
}


@ObjectType()
export class getMachineBySociety
{
  @Field(()=>Int)
  _id:number;
  
  @Field()
  Nom_Machine:string;

  @Field()
  idMachine: string;

  @Field()
  Serial_Number:string;
}

