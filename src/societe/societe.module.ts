import { Module } from '@nestjs/common';
import { SocieteService } from './societe.service';
import { SocieteResolver } from './societe.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { SocieteServiceSchema } from './entities/societe.entity';

@Module({
  imports : [MongooseModule.forFeature([{ name : 'societe' , schema : SocieteServiceSchema }])],

  providers: [SocieteResolver, SocieteService]
})
export class SocieteModule {}
