import {Field,ObjectType} from '@nestjs/graphql';

@ObjectType()
export class ResponseRapport
{
    @Field()
    state: string;
}