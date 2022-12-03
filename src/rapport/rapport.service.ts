import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { CreateRapportInput } from './dto/create-rapport.input';
import { UpdateRapportInput } from './dto/update-rapport.input';
import { RapportServiceDocument } from './entities/rapport.entity';

@Injectable()
export class RapportService 
{
constructor(
@InjectModel ('Rapport')
    private readonly RapportModel : PaginateModel <RapportServiceDocument> 
){}
async getLastDocument() 
{
  const rapport = await this.RapportModel.findOne().sort({ _id: -1 }).limit(1);
  
  if (rapport != null)
    return rapport._id;
  else 
    return 0;
}

async createRapport(createRapportInput: CreateRapportInput ) 
  {
      let countDocument = await this.getLastDocument();
      const CreateRapport = new this.RapportModel(createRapportInput);
      CreateRapport._id = countDocument + 1;

    return await CreateRapport.save() ;
  }
  
async update(updateRapportInput: UpdateRapportInput) 
  {
    const Rapport  = await this.RapportModel.findOne({_id:updateRapportInput._id});
    
    Rapport.NomIntervenant = updateRapportInput.NomIntervenant;
    Rapport.NomContenuRapport = updateRapportInput.ContenuRapport;
   
    return Rapport.save();
  }

async findAllRapportExistant() 
  {
    return await this.RapportModel.find(({Exist : true})).exec(); 
  }
  
  async findAllRapportSupprimer() 
  {
    return await this.RapportModel.find(({Exist : false})).exec(); 
  }

  async findOneRapport(findOneRapport) 
  {
    return await this.RapportModel.findOne({_id:findOneRapport._id});
  }
  


  async delete_rapport (id:number):Promise<any> 
  {
  return await this.RapportModel.updateOne({_id:id},{$set:{Exist:false, modified:[]}}); 
  } 
  




}
