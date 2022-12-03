import { ConsoleLogger, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { CreateMachineInput } from './dto/create-machine.input';
import { UpdateMachineInput } from './dto/update-machine.input';
import { MachineDocument } from './entities/machine.entity';

@Injectable()
export class MachineService {
  constructor(
    @InjectModel('Machine')
    private readonly MachineModel: PaginateModel<MachineDocument>, ){}

  async getLastDocument() {
    const Machine = await this.MachineModel.findOne().sort({ _id: -1 }).limit(1);

    if (Machine != null) return Machine._id;
    else return 0;
  }
  async createMachine(createMachineInput: CreateMachineInput) {
    let countDocument = await this.getLastDocument();
    const CreateMachine = new this.MachineModel(createMachineInput);
    CreateMachine._id = countDocument + 1;
    return await CreateMachine.save();
  }

  async findOne(id: number) {
    return await this.MachineModel.findOne({ _id: id });
  }

  async findAllMachine()
  {
    let machine = await this.MachineModel.find(({Status : true})).exec();
    
    return machine
  }

  async delete_Machine (id:number):Promise<any> 
{
return await this.MachineModel.updateOne({_id:id},{$set:{Status:false, modified:[]}}); 
}

}

