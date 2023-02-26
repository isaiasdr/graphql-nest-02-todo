import { Injectable, NotFoundException } from '@nestjs/common';

import { Todo } from './entity/todo.entity';
import { CreateTodoInput, UpdateTodoInput, StatusArgs } from './dto';

@Injectable()
export class TodoService {

    private todos: Todo[] = [
        { id: 1, description: 'piedra del alma', done: false },
        { id: 2, description: 'piedra del espacio', done: true },
        { id: 3, description: 'piedra del poder', done: false },
    ];

    get totalTodos() {
        return this.todos.length;
    }

    get completedTodos() {
        return this.todos.filter( todo => todo.done === true ).length;
    }

    get pendingTodos() {
        return this.todos.filter( todo => todo.done === false ).length;
    }

    findAll( args: StatusArgs ): Todo[] {
        
        const { status } = args;

        if ( status !== undefined )
            return this.todos.filter( todo => todo.done === status );

        return this.todos;
    };

    findOne(id: number): Todo {

        const todo = this.todos.find( todo => todo.id === id );

        if ( !todo ) throw new NotFoundException(`Not found todo with id ${ id }`);

        return todo;
    };

    create( createTodoInput: CreateTodoInput ): Todo {
        
        const todo = new Todo();
        todo.description = createTodoInput.description;

        if ( createTodoInput.done !== undefined )
            todo.done = createTodoInput.done;

        todo.id = Math.max( ...this.todos.map( todo => todo.id ), 0 ) + 1;

        this.todos.push( todo );

        return todo;
    }

    update( updateTodoInput: UpdateTodoInput ): Todo {

        const { description, done, id } = updateTodoInput;
        const todoToUpdate = this.findOne( updateTodoInput.id );

        if ( description )
            todoToUpdate.description = description;

        if ( done !== undefined )
            todoToUpdate.done = done;

        this.todos = this.todos.map( todo => {
            return ( todo.id === id ) ? todoToUpdate : todo
        });

        return todoToUpdate;
    }

    delete( id: number ): boolean {

        const todoToDelete = this.findOne( id );
        this.todos = this.todos.filter( todo => todo.id !== todoToDelete.id );

        return true;
    }
}
