import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User, UserDocument } from './entities/user.entity';
import mongoose from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<UserDocument>,
    private mailerService: MailerService
  ) {}

  async create(createUserInput: CreateUserInput) {
    createUserInput._id=new mongoose.Types.ObjectId().toHexString();
    let create = await this.userModel
      .create(createUserInput)
      .then((res) => {
       
        console.log(res);
        return res;
      })
      .catch((err) => console.log(err));
    console.log('CREATE DONE', create);

    return create;
  }

 

  async SupprimerUser(_id: string): Promise<any> {
    return await this.userModel.updateOne(
      { _id: _id },
      { $set: { status: false, modified: [] } },
    );
  }


  async update(updateUserInput: UpdateUserInput) {
    const user = await this.userModel.findOne({ _id: updateUserInput._id });

    user.nom = updateUserInput.nom;
    user.prenom = updateUserInput.prenom;
    user.password = updateUserInput.password;
    user.mail = updateUserInput.mail;
    user.societe = updateUserInput.societe;
    user.Numero_Telephone = updateUserInput.Numero_Telephone;
    user.role = updateUserInput.role;

    return user.save();
  }

  async findAllUSERexistant() {
    return await this.userModel.find({ status: true }).exec();
  }

  async findAllUSERnonexistant() {
    return await this.userModel.find({ status: false }).exec();
  }

  async findAllUser() {
    return await this.userModel.find().exec();
  }

  async findOneuser(findOneUser): Promise<User | undefined> {
    return await this.userModel.findOne({ _id: findOneUser._id });
  }

  async findOneName(findOneName): Promise<User> {
    return await this.userModel.findOne({ nom: findOneName.nom });
  }

  async findOne(mail: string): Promise<User> {
    let user = await this.userModel.findOne({ mail: mail });

    return user;
  }

  async getMachineByUser(nom: string) {
    let join = await this.userModel.aggregate([
      {
        $match: 
        {
          nom_Societe: nom,
          //societe: 'Carrefour'
        },
      },
      {
        $lookup: {
          from: 'machines',
          foreignField: 'nom_Societe',
          localField: 'societe',
          as: 'machineByUser',
        },
      },

      {
        $unwind: '$machineByUser',
      },
      {
        $project: {
          societe: '$societe',
          prenom: '$prenom',
          Numero_Telephone: '$Numero_Telephone',
          _id: '$machineByUser._id',
          Serial_Number: '$machineByUser.Serial_Number',
          Nom_Machine: '$machineByUser.Nom_Machine',
        },
      },
    ]);
    console.log('machineByUser', join);
    return join;
  }
  
  async getTicketByUser(nom: string) {
    let join = await this.userModel.aggregate([
      {
        $match: {
          NomUser: nom,
        },
      },
      {
        $lookup: {
          from: 'tickets',
          foreignField: 'NomUser',
          localField: 'nom',
          as: 'TicketByUser',
        },
      },

      {
        $unwind: '$TicketByUser',
      },
      {
        $project: {
          NomUser: '$TicketByUser.NomUser',
          NomMachine: '$TicketByUser.NomMachine',
          TextProbleme: '$TicketByUser.TextProbleme',
          Id_Machine: '$TicketByUser.Id_Machine',
          TitreTicket: '$TicketByUser.TitreTicket',
        },
      },
    ]);
    console.log('TicketByUser', join);
    return join;
  }

 

  /*
  async getMachineByUser(nom:string){
    let join = await this.userModel.aggregate(
  [
    {
      $match:
      {
        societe: nom
      }
    },
      {
      $lookup:
        {
          from:'machines',
          foreignField:'_id',
          localField:'idMachine',
          as:'machineByUser'
        }
      },
      {
        $lookup:
          {
            from:'users',
            foreignField:'machineBySociety.nom_Societe',
            localField:'societe',
            as:'machineBuUser'
          }
        },
  
    {
      $unwind:'$machineByUser'
    },
    /*{
    $unwind:"$machineBuUser"},*/
  /* {
      $project:
      {      
        _id:'$machineBuUser._id',
        nom:'$machineBuUser.nom_Societe',
        Serial_Number:'$machineBuUser.Serial_Number',
        Nom_Machine:'$machineBuUser.Nom_Machine',
        idMachine:'$machineBuUser.idMachine',
      }
    }
  ]
  ) 
  console.log('machineBuUser', join); 
  return join
  }}
*/

  //nom:'$machineByUser.nom_Societe',
}
