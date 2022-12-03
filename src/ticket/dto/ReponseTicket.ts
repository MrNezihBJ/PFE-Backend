import {Field,ObjectType} from '@nestjs/graphql';

@ObjectType()
export class ReponseTicket
{
    @Field()
    state: string;
}