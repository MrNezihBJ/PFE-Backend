import {Field,ObjectType} from '@nestjs/graphql';

@ObjectType()
export class ReponseMachine
{
    @Field()
    state: string;
}