import { Field, InputType, Int, PartialType } from "@nestjs/graphql";
import { CreateRapportInput } from "./create-rapport.input";

@InputType()
export class RapportIdInput extends PartialType(CreateRapportInput)
 {
  @Field(()=>Int)
  _id: number;
}
