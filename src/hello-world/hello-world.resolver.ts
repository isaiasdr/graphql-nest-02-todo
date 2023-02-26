import { Args, Float, Int, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {

    @Query( () => String, { name: 'hello', description: 'returns hello world' } )
    helloWorld(): string {
        return 'Hola Mundo'
    }

    @Query( () => Float, { name: 'randomNumber' } )
    getRandomNumber(): number {
        return Math.random() * 100;
    }

    @Query( () => Int, { name: 'randomFromZeroTo' } )
    getRandomFromZeroTo( @Args('limit', { nullable: true, type: () => Int }) limit: number = 10 ): number {
        return Math.floor( Math.random() * limit );
    }
}
