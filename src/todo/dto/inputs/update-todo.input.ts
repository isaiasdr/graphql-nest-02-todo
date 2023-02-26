import { Field, InputType, Int, PartialType } from "@nestjs/graphql";
import { IsInt, Min } from "class-validator";

import { CreateTodoInput } from "./create-todo.input";

@InputType()
export class UpdateTodoInput extends PartialType( CreateTodoInput ) {

    @Field( () => Int )
    @IsInt()
    @Min(1)
    id: number;
}