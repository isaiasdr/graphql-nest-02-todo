import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';


import { CreateTodoInput, UpdateTodoInput, StatusArgs } from './dto';
import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';
import { AggregationType } from './types/aggregations.type';

@Resolver( () => Todo )
export class TodoResolver {

    constructor(
        private readonly todoService: TodoService
    ) {}

    @Query( () => [Todo], { name: 'todos' } )
    findAll(
        @Args() args: StatusArgs
    ): Todo[] {
        return this.todoService.findAll( args );
    }

    @Query( () => Todo, { name: 'todo' } )
    findOne( 
        @Args('id', { type: () => Int }) id: number 
    ): Todo {
        return this.todoService.findOne( id );
    }

    @Mutation( () => Todo, { name: 'createTodo' } )
    createTodo(
        @Args('createTodoInput') todo: CreateTodoInput
    ) {
        return this.todoService.create( todo );
    }

    @Mutation( () => Todo, { name: 'updateTodo' } )
    updateTodo(
        @Args('updateTodoInput') todo: UpdateTodoInput,
    ): Todo {
        return this.todoService.update( todo );
    }

    @Mutation( () => Boolean )
    removeTodo(
        @Args('id', { type: () => Int }) id: number
    ) {
        return this.todoService.delete( id );
    }

    //Agregations
    @Query( () => Int, { name: 'totalTodos' } )
    totalTodos() {
        return this.todoService.totalTodos;
    }

    @Query( () => Int, { name: 'completedTodos' } )
    completedTodos() {
        return this.todoService.completedTodos;
    }

    @Query( () => Int, { name: 'pendingTodos' } )
    pendingTodos() {
        return this.todoService.pendingTodos;
    }

    @Query( () => AggregationType )
    aggregations(): AggregationType {
        return {
            completed: this.todoService.completedTodos,
            pending: this.todoService.pendingTodos,
            total: this.todoService.totalTodos
        }
    }
}
