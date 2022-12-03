import {Field,ObjectType} from '@nestjs/graphql';

@ObjectType()
export class ReponseSociete
{
    @Field()
    state: string;
}