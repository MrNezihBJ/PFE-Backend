import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketResolver } from './ticket.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { TicketServiceSchema } from './entities/ticket.entity';

@Module({
  
  imports : [MongooseModule.forFeature([{ name : 'Ticket' , schema : TicketServiceSchema }])],

  providers: [TicketResolver, TicketService]
  
})
export class TicketModule {}
