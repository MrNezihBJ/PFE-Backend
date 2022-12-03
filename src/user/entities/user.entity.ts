import { ObjectType, Field, Int } from '@nestjs/graphql';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { IsEmail } from 'class-validator';

export type UserDocument =  User & Document;
export const UserSchema = new mongoose.Schema
({
  _id:  mongoose.Schema.Types.ObjectId,
  nom : String,
  prenom : String,
  password : String,
  mail : String,
  societe : String,
  Numero_Telephone:String,
  status : {type: Boolean, default: true},
  role : String,
  landingpage : {type:Boolean,nullable:true,defaultValue:false},
},{timestamps: true,_id: false });


UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  } else {
    this['password'] = await bcrypt.hash(this['password'], 10);
    return next();
  }
});



@ObjectType()
export class User extends Document {

  @Field({nullable:true})
  _id:string;

  @Field()
  nom: string;

  @Field()
  prenom: string;
  
  @Field()
  password: string;
  
  @Field()
  @IsEmail()
  mail: string;
  
  @Field()
  societe: string;

  @Field()
  Numero_Telephone:string;
  
  @Field({defaultValue:true}) 
  status: boolean;
  
  @Field()
  role: string;
  
  @Field({nullable:true,defaultValue:false})
  landingpage: boolean
  
}

@ObjectType ()
export class UserTokenInput
{
  @Field()
  role:string;
}



@ObjectType()
export class getMachineByUser
{
  @Field()
  societe:string;

  @Field()
  prenom:string;

  @Field()
  Numero_Telephone:string;

  @Field(()=>Int)
  _id:number;
  
  @Field()
  Nom_Machine:string;

  @Field()
  idMachine: string;

  @Field()
  Serial_Number:string;
}




@ObjectType()
export class getTicketByUser
{
  @Field ()
  NomUser: string;

  @Field()
  NomMachine:string;
  
  @Field()
  TextProbleme:string;

  @Field({nullable:true})
  TitreTicket:string;

  @Field({nullable:true})        
  Id_Machine:string;
}