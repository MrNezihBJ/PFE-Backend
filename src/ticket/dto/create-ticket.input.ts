import { InputType, Field, Int } from '@nestjs/graphql';


@InputType()
export class CreateTicketInput {

  @Field({nullable:true})
  _id:Number;

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

  @Field({nullable:true})
  createdAt?:Date;

  @Field({nullable:true})
  updatedAt?:Date;

  
}

/*
@InputType()
export class UploadFile {

  @Field(() => String)
  name: string;

  @Field(() => GraphQLUpload)
  image: Promise<FileUpload>;
}*/