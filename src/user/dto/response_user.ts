import {Field,ObjectType} from '@nestjs/graphql';

@ObjectType()
export class ReponseUser
{
    @Field()
    state: string;
}