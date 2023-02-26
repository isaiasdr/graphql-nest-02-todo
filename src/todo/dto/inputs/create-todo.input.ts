import { Field, InputType, Int } from "@nestjs/graphql";
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

@InputType()
export class CreateTodoInput {

    @Field( () => String, { description: 'What needs to be solved'} )
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    description: string;

    @Field( () => Boolean, { description: 'is done?', nullable: true } )
    @IsBoolean()
    @IsOptional()
    done?: boolean;
}