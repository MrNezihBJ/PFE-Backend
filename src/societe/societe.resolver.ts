import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SocieteService } from './societe.service';
import { Societe } from './entities/societe.entity';
import { CreateSocieteInput } from './dto/create-societe.input';
import { FindOneSociete,FindOneSocieteName,UpdateSocieteInput } from './dto/update-societe.input';
import { SocieteIdInput } from './dto/Societe_Id_Input';
import { ReponseSociete } from './dto/response_Societe';



@Resolver(() => Societe)
export class SocieteResolver {
  constructor(private readonly societeService: SocieteService) {}

  @Mutation(() => Societe)
  createSociete(
    @Args('CreateSocieteInput') CreateSocieteInput: CreateSocieteInput,
  ) {
    return this.societeService.createSociete(CreateSocieteInput);
  }

  ////////////////////////////////FIND/////////////////////////////////////////////

  @Query(() => Int)
  totalSocietes() {
    return this.societeService.totalSocietes();
  }
  
  @Query(() => [Societe])
  findAllSocieteexistant() 
  {
    return this.societeService.findAllSocieteexistant();
  }
  
  @Query(() => [Societe])
  findAllSocietenonexistant() {
    return this.societeService.findAllSocietenonexistant();
  }
  @Query(() => Societe)
  async findSocieteById(@Args('idSociete') findOneSociete: FindOneSociete) {
    return await this.societeService.findSocieteById({
      _id: findOneSociete._id,
    });
  }
  @Query(() => Societe)
  async findSocieteByName(@Args('nomSociete') findOneSocieteName: FindOneSocieteName,) 
  {
    return await this.societeService.findSocieteByName({
      nomSociete: findOneSocieteName.nomSociete,
    });
  }

  @Mutation(() => Societe)
  updateSociete(@Args('updateSocieteInput') updateSocieteInput: UpdateSocieteInput) 
  {return this.societeService.update(updateSocieteInput)}

  @Mutation(() => ReponseSociete)
  async delete_Societe(@Args('SocieteIdInput') SocieteIdInput: SocieteIdInput) {
    let removeSociete = await this.societeService.delete_Societe(SocieteIdInput._id);

    if (removeSociete) 
      return {state:"Societe Supprimer"};
    else 
      return {state:"Societe Non Supprimer"};
  }
/*
@UseGuards(JwtAuthGuard)
@Query(() => [getMachineBySociety])
async getMachineBySociety(@CurrentUser() user: User)
{
  return await this.societeService.getMachineBySociety(user.nom)
}
*/


}


 /*
 @Query()
 async findSocieteByIdMachine(@Args('IDMachine') FindSocieteByIdMachine:FindSocieteByIdMachine){
 return await this.societeService.findSocieteByIdMachine({idMach:FindSocieteByIdMachine.idMachines});}
  */