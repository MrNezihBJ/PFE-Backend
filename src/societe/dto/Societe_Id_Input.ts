import { Field, InputType, Int, PartialType } from "@nestjs/graphql";
import { CreateSocieteInput } from "./create-societe.input";

@InputType()
export class SocieteIdInput extends PartialType(CreateSocieteInput)
 {
  @Field(()=>Int)
  _id: number;
}
