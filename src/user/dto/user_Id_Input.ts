import { Field, InputType, PartialType } from "@nestjs/graphql";
import { CreateUserInput } from "./create-user.input";

@InputType()
export class UserIdInput extends PartialType(CreateUserInput)
 {
  @Field()
  _id: string;
}
