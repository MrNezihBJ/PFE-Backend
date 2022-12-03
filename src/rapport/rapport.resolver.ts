import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RapportService } from './rapport.service';
import { Rapport } from './entities/rapport.entity';
import { CreateRapportInput } from './dto/create-rapport.input';
import { FindOneRapport, UpdateRapportInput } from './dto/update-rapport.input';
import { ResponseRapport } from './dto/Response_Rapport';
import {RapportIdInput} from './dto/Rapport_Id_Input'

@Resolver(() => Rapport)
export class RapportResolver 
{
  constructor(private readonly rapportService: RapportService) {}

  @Mutation(() => Rapport)
  createRapport(@Args('CreateRapportInput') CreateRapportInput: CreateRapportInput) {
    return this.rapportService.createRapport(CreateRapportInput);
  }

 @Mutation(() => Rapport)
  updateUser(@Args('updateRapportInput') updateRapportInput: UpdateRapportInput) 
  {
    return this.rapportService.update(updateRapportInput);
  }

  @Mutation(()=>ResponseRapport)
  async delete_Rapport(@Args('RapportIdInput') RapportIdInput: RapportIdInput)
  {
    let removeRapport = await this.rapportService.delete_rapport(RapportIdInput._id);

    if (removeRapport)
      return {state:"Rapport Supprimer"}
    else 
      return {state:"Rapport Non Supprimer"}
  }
  
  @Query(() => [Rapport])
  findAllRapportExistant() 
  {
    return this.rapportService.findAllRapportExistant();
  }

  @Query(() => [Rapport])
  findAllRapportSupprimer()
  {
    return this.rapportService.findAllRapportSupprimer();
  }

  @Query(() => Rapport)
  async findOneRapport(@Args('IDRapport') findOneRapport: FindOneRapport) {
     return await this.rapportService.findOneRapport({_id:findOneRapport._id});
   }
}
