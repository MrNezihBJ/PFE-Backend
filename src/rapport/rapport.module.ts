import { Module } from '@nestjs/common';
import { RapportService } from './rapport.service';
import { RapportResolver } from './rapport.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { RapportServiceSchema } from './entities/rapport.entity';

@Module({
  imports : [MongooseModule.forFeature([{ name : 'Rapport' , schema : RapportServiceSchema }])],

  providers: [RapportResolver, RapportService]
})
export class RapportModule {}
