import { Field, InputType, Int, PartialType } from "@nestjs/graphql";
import { CreateMachineInput } from "./create-machine.input";

@InputType()
export class MachineIdInput extends PartialType(CreateMachineInput)
 {
  @Field(()=>Int)
  _id: number;
}
