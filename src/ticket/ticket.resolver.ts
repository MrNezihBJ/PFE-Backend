import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TicketService } from './ticket.service';
import { Ticket } from './entities/ticket.entity';
import { CreateTicketInput } from './dto/create-ticket.input';
import { FindOneTicketID, TicketIdInput, UpdateTicketInput } from './dto/update-ticket.input';
import { ReponseTicket } from './dto/ReponseTicket';



@Resolver(() => Ticket)
export class TicketResolver 
{
  
  constructor(private readonly ticketService: TicketService) {}

  @Mutation(() => Ticket)
  createTicket(@Args('CreateTicketInput') CreateTicketInput: CreateTicketInput)
  {
    return this.ticketService.createTicket(CreateTicketInput);
  }

  @Mutation(()=>ReponseTicket)
  async delete_Ticket(@Args('TicketIdInput') TicketIdInput: TicketIdInput){

    let SupprimetTicket = await this.ticketService.delete_Ticket(TicketIdInput._id);
    if (SupprimetTicket)
      return {state:"ok"}
    else 
      return {state:"not ok "}
  }


  @Mutation(() => Ticket )
  async updateTicket(@Args('UpdateTicketInput') UpdateTicketInput: UpdateTicketInput) {
    let ticket = await this.ticketService.update(UpdateTicketInput);
    if (ticket)
      return ticket 
    else
      return null
  }

  
  @Query(() => [Ticket])
    findAllTicketexistant() 
      {return this.ticketService.findAllTicketexistant();}
    
    @Query(() => [Ticket])
      findAllTicketforIntervenant() 
        {return this.ticketService.findAllTicketforIntervenant();}


    @Query(()=>[Ticket])
      findAllTicketTraiter()
        {return this.ticketService.findAllTicketTraiter();}

  @Query(() => [Ticket])
  findAllTicketSupprimer()
  {return this.ticketService.findAllTicketSupprimer();}

    @Query(() => Ticket)
    async findOneTicketID(@Args('IDTicket') findOneTicketID: FindOneTicketID) 
    {
    return await this.ticketService.findOneTicketID({_id:findOneTicketID._id});
    }

    @Query(() => [Int])
    CountAllTicket() {
   let ArrCount=this.ticketService.CountAllTicket()
      return  (ArrCount) 
    }

    @Query(() => [Int])
    CountAllTicketByNameMachine() {
   let ArrCount=this.ticketService.CountAllTicketByNameMachine()
      return  (ArrCount) 
    }





    @Mutation(()=>ReponseTicket)
  async Valider_Ticket(@Args('TicketIdInput') TicketIdInput: TicketIdInput){

    let ValiderTicket = await this.ticketService.Valider_Ticket(TicketIdInput._id);
    if (ValiderTicket)
      return {state:"ok"}
    else 
      return {state:"not ok "}
  }

}

















    
/*
    @UseGuards(JwtAuthGuard)                                        
    @Query(() => [getTicketByUser])
    async getTicketByUser(@CurrentUser() user:User)
    {
      return await this.ticketService.getTicketByUser(user.nom)
    }*/



 /*   @Mutation(() => UploadFileimage )
    async uploadFileResolver(@Args('uploadFile' uploadFile:UploadFile)){
      let file = await this.ticketService.uploadFile(uploadFile.)
      console.log(file,'File image');
      
     return file
    }
*/







/*@Mutation()
@UseInterceptors(
    FileInterceptor('file', 
    {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => 
        {
          const uniqueSuffix = 
          file.originalname + '-' + "MSTechSoft"+ "-"+ Math.round(Math.random() * 1e4);

          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  handleUpload(@UploadedFile() file: Express.Multer.File) 
  {
    console.log('file', file);
    console.log("Nom Original==>",file.originalname);
  return 'File upload API';
  }*/







/*
  @Mutation(() => Ticket)
  removeTicket(@Args('id', { type: () => Int }) id: number) {
    return this.ticketService.remove(id);

      @Mutation(() => Ticket)
  createTicket(@Args('createTicketInput') createTicketInput: CreateTicketInput) {
    return this.ticketService.create(createTicketInput);
  }

  @Query(() => [Ticket], { name: 'ticket' })
  findAll() {
    return this.ticketService.findAll();
  }

  @Query(() => Ticket, { name: 'ticket' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.ticketService.findOne(id);
  }

  /*@Mutation(() => Ticket)
  updateTicket(@Args('updateTicketInput') updateTicketInput: UpdateTicketInput) {
    return this.ticketService.update(updateTicketInput.id, updateTicketInput);*/

  

