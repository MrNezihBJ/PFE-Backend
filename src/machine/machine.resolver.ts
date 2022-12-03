import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CreateMachineInput } from './dto/create-machine.input';
import { MachineIdInput } from './dto/MachineIdInput';
import { ReponseMachine } from './dto/response_machine';
import { Machine } from './entities/machine.entity';
import { MachineService } from './machine.service';

@Resolver(() => Machine)
export class MachineResolver {
  constructor(private readonly machineService: MachineService) {}

  @Mutation(() => Machine)
  createMachine(
    @Args('CreateMachineInput') CreateMachineInput: CreateMachineInput) 
  {
    return this.machineService.createMachine(CreateMachineInput);
  }

  @Query(() => Machine, { name: 'machine' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.machineService.findOne(id);
  }

  @Query(()=>[Machine])
  findAllMachine()
  {
    return this.machineService.findAllMachine();
  }
 
  @Mutation(()=>ReponseMachine)
  async delete_Machine(@Args('MachineIdInput') MachineIdInput:MachineIdInput )
  {
    let removeMachine = await this.machineService.delete_Machine(MachineIdInput._id);

    if (removeMachine)
      return {state:"Machine Supprimer"}
    else 
      return {state:"Machine non Supprimer"}
  }
  

}
