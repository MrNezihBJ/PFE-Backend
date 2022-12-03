import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReturnDocument } from 'mongodb';
import { PaginateModel } from 'mongoose';
import { join } from 'path';
import { CreateTicketInput } from './dto/create-ticket.input';
import {  FindOneTicketID, NiveauTempsInput, UpdateTicketInput } from './dto/update-ticket.input';
import { TicketServiceDocument } from './entities/ticket.entity';

@Injectable()
export class TicketService{

  constructor(
   
    @InjectModel ('Ticket')
    private readonly TicketModel : PaginateModel <TicketServiceDocument> 
  ) {}

  async getLastDocument() 
  {
    const ticket = await this.TicketModel.findOne().sort({_id:-1}).limit(1);
    
    if (ticket != null)
      return ticket._id;
    else 
      return 0;
  }
  //////////////////////////Creat///////////////////////////////////////

  async createTicket(createTicketInput: CreateTicketInput ) 
  {
        let countDocument = await this.getLastDocument();
        const CreateTicket = new this.TicketModel(createTicketInput);
        CreateTicket._id = countDocument + 1;

      
    return await CreateTicket.save() ;
  }

  

async delete_Ticket (id:number):Promise<any> 
{
  return await this.TicketModel.updateOne({_id:id},{$set:{status1:false, modified:[]}});
}


                                                                                                               
async update (UpdateTicketInput:UpdateTicketInput)

{
  const Ticket  = await this.TicketModel.findOne({_id:UpdateTicketInput._id});                               
                                                                                                               
  Ticket.NomUser = UpdateTicketInput.NomUser;                                                                
  Ticket.NomSociete = UpdateTicketInput.NomSociete;                                                          
  Ticket.NomMachine = UpdateTicketInput.NomMachine;                                                      
  Ticket.Id_Machine = UpdateTicketInput.Id_Machine;                                                         
  Ticket.TextProbleme= UpdateTicketInput.TextProbleme;   
  Ticket.TitreTicket=UpdateTicketInput.TitreTicket; 
  Ticket.Niveau=UpdateTicketInput.Niveau; 
  Ticket.DateFin=UpdateTicketInput.DateFin; 
  Ticket.status1=UpdateTicketInput.status1;                                                                  
  Ticket.statusChef=UpdateTicketInput.statusChef;
  Ticket.statusIntervenant=UpdateTicketInput.statusIntervenant;
  return Ticket.save()
}




/*async updateNiveauTemps (niveauTempsInput:NiveauTempsInput)
{
  const Ticket  = await this.TicketModel.findOne({_id:niveauTempsInput._id});                               

  Ticket.Niveau=niveauTempsInput.Niveau; 
  Ticket.Temps=niveauTempsInput.Temps; 
  Ticket.statusChef=niveauTempsInput.statusChef; 


  return Ticket.save()
}*/

                                                                                  
                                                                                                              
                                                                                            




  async findAllTicketexistant() 
  {return await this.TicketModel.find(({status1:true})).exec();}

  async findAllTicketforIntervenant()
  { return await this.TicketModel.find(({status1:true,statusChef:true})).exec();}

  async findAllTicketTraiter()
  {return await this.TicketModel.find(({status1:true,statusChef:true,statusIntervenant:true})).exec()}

  async findAllTicketSupprimer() 
  {
    return await this.TicketModel.find(({status1 : false})).exec(); 
  }


  async Valider_Ticket (id:number):Promise<any> 
  {
    return await this.TicketModel.updateOne({_id:id},{$set:{statusIntervenant:true, modified:[]}});
  }
  
 
 

  async findOneTicketID(findOneTicketID:FindOneTicketID) 
  {
    return await this.TicketModel.findOne({_id:findOneTicketID._id});
  }


//DASH SERVICES

  async CountAllTicket() 
  {
    const TicketCreer = this.TicketModel.find({status1:true,statusChef:false,statusIntervenant:false}).countDocuments()
    const TicketEnCours = this.TicketModel.find({statusChef:true,status1:true}).countDocuments()
    const TicketTraiter = this.TicketModel.find({statusIntervenant:true,status1:true}).countDocuments()
    const TicketSupprimer = this.TicketModel.find({status1:false}).countDocuments()

    const arr=[TicketCreer,TicketSupprimer,TicketEnCours,TicketTraiter]
    return (arr)
  }

  async CountAllTicketByNameMachine() 
  {
    const TicketDAB = this.TicketModel.find({NomMachine:"DAB"}).countDocuments()
    const TicketTPE = this.TicketModel.find({NomMachine:"TPE"}).countDocuments()
    const TicketNEWTON3 = this.TicketModel.find({NomMachine:"NEWTON3"}).countDocuments()
    const TicketAutre = this.TicketModel.find({NomMachine:{$nin:["DAB","TPE","NEWTON3"]}}).countDocuments()

    const arr=[TicketDAB,TicketTPE,TicketNEWTON3,TicketAutre]
    return (arr)
  }

}





/*
async getTicketByUser(NomUserX:string)
{
  let join = await this.TicketModel.aggregate
  (
[
  {
    $match:
    {
      prenom: NomUserX,
      // NomUser: 'Khalid',

   }
  },
    {
    $lookup:
      {
        from:'users',
        foreignField:'prenom',
        localField:'NomUser',
        as:'TicketByUser'
      }
    },

  {
    $unwind:'$TicketByUser'
  },
  {
    $project:
    {
      NAME:'$TicketByUser.NomUser',
      NAMEMACHINE:'$TicketByUser.NomMachine',
      PROB:'$TicketByUser.TextProbleme',
      LES_ID:'$TicketByUser.Id_Machine',
    }
  }
 ]
) 
console.log('TicketByUser', join); 
return join
}
*/






//FIND A FAIRE
/* ticket de chaque user*/
/* ticket de chaque societe*/
/* ticket de chaque machine*/



//---------------------------------------------


/*
async uploadFile({ name, image }: UploadFile) {
  const { createReadStream, filename } = await image;
  return new Promise(async (resolve) => {
  createReadStream()
   .pipe(createWriteStream(join(process.cwd(), `./src/upload/${filename}`)))
   .on('finish', () =>
     resolve({
   
      name,
      image: filename,
     }),
   )
   .on('error',() => {
      throw new BadRequestException('Fail to upload file')
    });
  });
}*/



