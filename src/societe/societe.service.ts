import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { CreateSocieteInput } from './dto/create-societe.input';
import { UpdateSocieteInput } from './dto/update-societe.input';
import { SocieteServiceDocument } from './entities/societe.entity';

@Injectable()
export class SocieteService {
  constructor(
    @InjectModel ('societe')
    private readonly societeModel : PaginateModel <SocieteServiceDocument> 
  ) {}
  

  async getLastDocument() 
  {
    const entreprise = await this.societeModel.findOne().sort({ _id: -1 }).limit(1);
    
    if (entreprise != null)
      return entreprise._id;

    else 
      return 0;
  }

  async createSociete(createSocieteInput: CreateSocieteInput ) 
  {
      let countDocument = await this.getLastDocument();
      const createSociete = new this.societeModel(createSocieteInput);
      createSociete._id = countDocument + 1;
    return await createSociete.save() ;
  }
  
///////////////////////////find//////////////////////////////////

  async totalSocietes() {
    return await this.societeModel.countDocuments({status:true});
  }
  
  async findAllSocieteexistant() {
    return await this.societeModel.find(({status : true})).exec();
  }

  async findAllSocietenonexistant() {
    return await this.societeModel.find(({status : false})).exec();
  }

  async findSocieteById(FindOneSociete) {
    return await this.societeModel.findOne({_id:FindOneSociete._id});
  }

    async findSocieteByName(FindOneSocieteName){
      return await this.societeModel.findOne({nomSociete:FindOneSocieteName.nomSociete});
    }

    /*async findSocieteByIdMachine(FindOneMachine){return await this.societeModel.findOne({idMach:FindOneMachine})}*/
    /*find by machine id machine*/


 async update(updateSocieteInput:UpdateSocieteInput)
 {
    const Societe:any= await this.societeModel.findOne({_id: updateSocieteInput._id});
    
    Societe.nomSociete= updateSocieteInput.nomSociete;
    Societe.fix= updateSocieteInput.fix;
    Societe.Email= updateSocieteInput.Email;
    Societe.gouvernerat= updateSocieteInput.gouvernerat;
    Societe.region= updateSocieteInput.region;
    Societe.adresse= updateSocieteInput.adresse;

  return this.societeModel.findByIdAndUpdate(updateSocieteInput._id,Societe,{new:true})
 }




async delete_Societe(id:number):Promise<any> 
{  
  return await this.societeModel.updateOne({_id:id},{$set:{status:false, modified:[]}}); 
}



/*
async getMachineBySociety(nom:string){
  let join = await this.societeModel.aggregate(
[
  {
    $match:
    {
      nom_Societe: nom
    }
  },
    {
    $lookup:
      {
        from:'machines',
        foreignField:'nom_Societe',
        localField:'nomSociete',
        as:'machineBySociety'
      }
    },

  {
    $unwind:'$machineBySociety'
  },
  {
    $project:
    {
      _id:'$machineBySociety._id',
      nom:'$machineBySociety.nom_Societe',
      Serial_Number:'$machineBySociety.Serial_Number',
      Nom_Machine:'$machineBySociety.Nom_Machine',
      idMachine:'$machineBySociety.idMachine',
    }
  }
]
) 
console.log('machineBySociety', join); 
return join
}
*/




}

/**
 * {
  $unwind:"$machineByUser"},
 }
 {
      $lookup:
        {
          from:'users',
          foreignField:'machineBySociety.nom_Societe',
          localField:'societe',
          as:'machineByUser'
        }
      },
 */