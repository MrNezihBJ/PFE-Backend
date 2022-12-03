import { Module } from '@nestjs/common';
import { MachineService } from './machine.service';
import { MachineResolver } from './machine.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { MachineSchema } from './entities/machine.entity';

@Module({
  imports : [MongooseModule.forFeature([{ name : 'Machine' , schema : MachineSchema }])],
  providers: [MachineResolver, MachineService]
})
export class MachineModule {}
